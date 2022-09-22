import { expect, fixture, html } from '@open-wc/testing';

import {
  Arbitrary,
  array,
  assert,
  constant,
  constantFrom,
  oneof,
  property,
  record,
  tuple,
} from 'fast-check';

import { LitElement } from 'lit';

import { customElement } from 'lit/decorators.js';

import {
  EditorAction,
  Insert,
  newActionEvent,
  newOpenDocEvent,
  Remove,
} from '../foundation.js';
import { Editing } from './Editing.js';

namespace util {
  export function descendants(parent: Element | XMLDocument): Node[] {
    return (Array.from(parent.childNodes) as Node[]).concat(
      ...Array.from(parent.children).map(child => descendants(child))
    );
  }

  export const sclDocString = `<?xml version="1.0" encoding="UTF-8"?>
<SCL version="2007" revision="B" xmlns="http://www.iec.ch/61850/2003/SCL">
  <Substation name="A1" desc="test substation"></Substation>
</SCL>`;
  const testDocStrings = [
    sclDocString,
    `<?xml version="1.0" encoding="UTF-8"?>
  <testDoc1>
<element1 property1="value1" property2="value2">SomeText</element1>
<element2 property2="value2" property3="value3"><!--AComment--></element2>
<element3 property3="value3" property1="value1">
  <subelement1 property1="value1" property2="value2">SomeMoreText</subelement1>
  <subelement2 property2="value2" property3="value3"><!----></subelement2>
  <subelement3 property3="value3" property1="value1"></subelement3>
</element3>
</testDoc1>`,
    `<?xml version="1.0" encoding="UTF-8"?>
  <testDoc2>
<element1 property1="value1" property2="value2">SomeText</element1>
<element2 property2="value2" property3="value3"><!--AComment--></element2>
<element3 property3="value3" property1="value1">
  <subelement1 property1="value1" property2="value2">SomeMoreText</subelement1>
  <subelement2 property2="value2" property3="value3"><!----></subelement2>
  <subelement3 property3="value3" property1="value1"></subelement3>
</element3>
</testDoc2>`,
  ];

  export type TestDoc = { doc: XMLDocument; nodes: Node[] };
  export const testDocs = tuple(
    constantFrom(...testDocStrings),
    constantFrom(...testDocStrings)
  )
    .map(strs =>
      strs.map(str => new DOMParser().parseFromString(str, 'application/xml'))
    )
    .map(docs =>
      docs.map(doc => ({ doc, nodes: descendants(doc).concat([doc]) }))
    ) as Arbitrary<[TestDoc, TestDoc]>;

  export function remove(nodes: Node[]): Arbitrary<Remove> {
    const node = oneof(
      { arbitrary: constantFrom(...nodes), weight: nodes.length },
      testDocs.chain(docs => constantFrom(...docs.map(d => d.doc)))
    );
    return record({ node });
  }

  export function insert(nodes: Node[]): Arbitrary<Insert> {
    const references = (nodes as (Node | null)[]).concat([null]);
    const parent = constantFrom(...nodes);
    const node = constantFrom(...nodes);
    const reference = constantFrom(...references);
    return record({ parent, node, reference });
  }

  export function simpleAction(nodes: Node[]): Arbitrary<Insert | Remove> {
    return oneof(remove(nodes), insert(nodes));
  }

  export function complexAction(nodes: Node[]): Arbitrary<EditorAction[]> {
    return array(simpleAction(nodes));
  }

  export function editorAction(nodes: Node[]): Arbitrary<EditorAction> {
    return oneof(
      { arbitrary: simpleAction(nodes), weight: 2 },
      complexAction(nodes)
    );
  }

  /** A series of arbitrary actions that allow us to test undo and redo */
  export type UndoRedoTestCase = {
    doc1: XMLDocument;
    doc2: XMLDocument;
    actions: EditorAction[];
  };
  export function undoRedoTestCases(
    testDoc1: TestDoc,
    testDoc2: TestDoc
  ): Arbitrary<UndoRedoTestCase> {
    const nodes = testDoc1.nodes.concat(testDoc2.nodes);
    return record({
      doc1: constant(testDoc1.doc),
      doc2: constant(testDoc2.doc),
      actions: array(editorAction(nodes)),
    });
  }

  export function isParentNode(node: Node): node is ParentNode {
    return (
      node instanceof Element ||
      node instanceof Document ||
      node instanceof DocumentFragment
    );
  }

  export function isParentOf(parent: Node, node: Node | null) {
    return (
      isParentNode(parent) &&
      (node === null ||
        Array.from(parent.childNodes).includes(node as ChildNode))
    );
  }

  export function isValidInsert({ parent, node, reference }: Insert) {
    return (
      node !== reference &&
      isParentOf(parent, reference) &&
      !node.contains(parent) &&
      ![Node.DOCUMENT_NODE, Node.DOCUMENT_TYPE_NODE].some(
        nodeType => node.nodeType === nodeType
      ) &&
      !(
        parent instanceof Document &&
        (parent.documentElement || !(node instanceof Element))
      )
    );
  }

  @customElement('editing-element')
  export class EditingElement extends Editing(LitElement) {}
}

describe('Editing Element', () => {
  let editor: util.EditingElement;
  let sclDoc: XMLDocument;

  beforeEach(async () => {
    editor = <util.EditingElement>(
      await fixture(html`<editing-element></editing-element>`)
    );
    sclDoc = new DOMParser().parseFromString(
      util.sclDocString,
      'application/xml'
    );
  });

  it('loads a document on OpenDocEvent', async () => {
    editor.dispatchEvent(newOpenDocEvent(sclDoc, 'test.scd'));
    await editor.updateComplete;
    expect(editor.doc).to.equal(sclDoc);
    expect(editor.docName).to.equal('test.scd');
  });

  it('inserts an element on InsertActionEvent', () => {
    const parent = sclDoc.documentElement;
    const node = sclDoc.createElement('test');
    const reference = sclDoc.querySelector('Substation');
    editor.dispatchEvent(newActionEvent({ parent, node, reference }));
    expect(sclDoc.documentElement.querySelector('test')).to.have.property(
      'nextSibling',
      reference
    );
  });

  it('removes an element on Remove Action', () => {
    const node = sclDoc.querySelector('Substation')!;
    editor.dispatchEvent(newActionEvent({ node }));
    expect(sclDoc.querySelector('Substation')).to.not.exist;
  });

  it('processes complex actions in the given order', () => {
    const parent = sclDoc.documentElement;
    const reference = sclDoc.querySelector('Substation');
    const node1 = sclDoc.createElement('test1');
    const node2 = sclDoc.createElement('test2');
    editor.dispatchEvent(
      newActionEvent([
        { parent, node: node1, reference },
        { parent, node: node2, reference },
      ])
    );
    expect(sclDoc.documentElement.querySelector('test1')).to.have.property(
      'nextSibling',
      node2
    );
    expect(sclDoc.documentElement.querySelector('test2')).to.have.property(
      'nextSibling',
      reference
    );
  });

  it('undoes a committed action on undo() call', () => {
    const node = sclDoc.querySelector('Substation')!;
    editor.dispatchEvent(newActionEvent({ node }));
    editor.undo();
    expect(sclDoc.querySelector('Substation')).to.exist;
  });

  it('redoes an undone action on redo() call', () => {
    const node = sclDoc.querySelector('Substation')!;
    editor.dispatchEvent(newActionEvent({ node }));
    editor.undo();
    editor.redo();
    expect(sclDoc.querySelector('Substation')).to.not.exist;
  });

  describe('generally', () => {
    it('inserts elements on Insert action events', () =>
      assert(
        property(
          util.testDocs.chain(([doc1, doc2]) => {
            const nodes = doc1.nodes.concat(doc2.nodes);
            return util.insert(nodes);
          }),
          action => {
            editor.dispatchEvent(newActionEvent(action));
            if (util.isValidInsert(action))
              return (
                action.node.parentElement === action.parent &&
                action.node.nextSibling === action.reference
              );
            return true;
          }
        )
      ));

    it('removes elements on Remove action events', () =>
      assert(
        property(
          util.testDocs.chain(([{ nodes }]) => util.remove(nodes)),
          ({ node }) => {
            editor.dispatchEvent(newActionEvent({ node }));
            return !node.parentNode;
          }
        )
      ));

    it('undoes up to n actions on undo(n) call', () =>
      assert(
        property(
          util.testDocs.chain(docs => util.undoRedoTestCases(...docs)),
          ({ doc1, doc2, actions }: util.UndoRedoTestCase) => {
            const [oldDoc1, oldDoc2] = [doc1, doc2].map(doc =>
              new XMLSerializer().serializeToString(doc)
            );
            actions.forEach((a: EditorAction) => {
              editor.dispatchEvent(newActionEvent(a));
            });
            if (actions.length) editor.undo(actions.length);
            const [newDoc1, newDoc2] = [doc1, doc2].map(doc =>
              new XMLSerializer().serializeToString(doc)
            );
            return oldDoc1 === newDoc1 && oldDoc2 === newDoc2;
          }
        )
      ));

    it('redoes up to n actions on redo(n) call', () =>
      assert(
        property(
          util.testDocs.chain(docs => util.undoRedoTestCases(...docs)),
          ({ doc1, doc2, actions }: util.UndoRedoTestCase) => {
            actions.forEach((a: EditorAction) => {
              editor.dispatchEvent(newActionEvent(a));
            });
            const [oldDoc1, oldDoc2] = [doc1, doc2].map(doc =>
              new XMLSerializer().serializeToString(doc)
            );
            if (actions.length) {
              editor.undo(actions.length + 1);
              editor.redo(actions.length + 1);
            }
            const [newDoc1, newDoc2] = [doc1, doc2].map(doc =>
              new XMLSerializer().serializeToString(doc)
            );
            return oldDoc1 === newDoc1 && oldDoc2 === newDoc2;
          }
        )
      ));
  });
});
