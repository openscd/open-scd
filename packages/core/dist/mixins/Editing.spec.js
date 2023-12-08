import { __decorate } from "tslib";
import { expect, fixture, html } from '@open-wc/testing';
import { array, assert, constant, constantFrom, dictionary, oneof, property, record, string as stringArbitrary, stringOf, tuple, unicode, webUrl, } from 'fast-check';
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { isNamespaced, newEditEvent, newOpenEvent, } from '../foundation.js';
import { Editing } from './Editing.js';
export var util;
(function (util) {
    util.xmlAttributeName = /^(?!xml|Xml|xMl|xmL|XMl|xML|XmL|XML)[A-Za-z_][A-Za-z0-9-_.]*(:[A-Za-z_][A-Za-z0-9-_.]*)?$/;
    function descendants(parent) {
        return Array.from(parent.childNodes).concat(...Array.from(parent.children).map(child => descendants(child)));
    }
    util.descendants = descendants;
    util.sclDocString = `<?xml version="1.0" encoding="UTF-8"?>
<SCL version="2007" revision="B" xmlns="http://www.iec.ch/61850/2003/SCL">
  <Substation name="A1" desc="test substation"></Substation>
</SCL>`;
    const testDocStrings = [
        util.sclDocString,
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
    util.testDocs = tuple(constantFrom(...testDocStrings), constantFrom(...testDocStrings))
        .map(strs => strs.map(str => new DOMParser().parseFromString(str, 'application/xml')))
        .map(docs => docs.map(doc => ({ doc, nodes: descendants(doc).concat([doc]) })));
    function remove(nodes) {
        const node = oneof({ arbitrary: constantFrom(...nodes), weight: nodes.length }, util.testDocs.chain(docs => constantFrom(...docs.map(d => d.doc))));
        return record({ node });
    }
    util.remove = remove;
    function insert(nodes) {
        const references = nodes.concat([null]);
        const parent = constantFrom(...nodes);
        const node = constantFrom(...nodes);
        const reference = constantFrom(...references);
        return record({ parent, node, reference });
    }
    util.insert = insert;
    const namespacedValue = record({
        value: oneof(stringOf(oneof({ arbitrary: unicode(), weight: 10 }, constant(':'))), constant(null)),
        namespaceURI: oneof({ arbitrary: webUrl(), weight: 10 }, constant(null)),
    });
    function update(nodes) {
        const element = (constantFrom(...nodes.filter(nd => nd.nodeType === Node.ELEMENT_NODE)));
        const attributes = dictionary(oneof(stringArbitrary(), constant('colliding-attribute-name')), oneof(stringArbitrary(), constant(null), namespacedValue));
        return record({ element, attributes });
    }
    util.update = update;
    function simpleEdit(nodes) {
        return oneof(remove(nodes), insert(nodes), update(nodes));
    }
    util.simpleEdit = simpleEdit;
    function complexEdit(nodes) {
        return array(simpleEdit(nodes));
    }
    util.complexEdit = complexEdit;
    function edit(nodes) {
        return oneof({ arbitrary: simpleEdit(nodes), weight: 2 }, complexEdit(nodes));
    }
    util.edit = edit;
    function undoRedoTestCases(testDoc1, testDoc2) {
        const nodes = testDoc1.nodes.concat(testDoc2.nodes);
        return record({
            doc1: constant(testDoc1.doc),
            doc2: constant(testDoc2.doc),
            edits: array(edit(nodes)),
        });
    }
    util.undoRedoTestCases = undoRedoTestCases;
    function isParentNode(node) {
        return (node instanceof Element ||
            node instanceof Document ||
            node instanceof DocumentFragment);
    }
    util.isParentNode = isParentNode;
    function isParentOf(parent, node) {
        return (isParentNode(parent) &&
            (node === null ||
                Array.from(parent.childNodes).includes(node)));
    }
    util.isParentOf = isParentOf;
    function isValidInsert({ parent, node, reference }) {
        return (node !== reference &&
            isParentOf(parent, reference) &&
            !node.contains(parent) &&
            ![Node.DOCUMENT_NODE, Node.DOCUMENT_TYPE_NODE].some(nodeType => node.nodeType === nodeType) &&
            !(parent instanceof Document &&
                (parent.documentElement || !(node instanceof Element))));
    }
    util.isValidInsert = isValidInsert;
    let EditingElement = class EditingElement extends Editing(LitElement) {
    };
    EditingElement = __decorate([
        customElement('editing-element')
    ], EditingElement);
    util.EditingElement = EditingElement;
})(util || (util = {}));
describe('Editing Element', () => {
    let editor;
    let sclDoc;
    beforeEach(async () => {
        editor = (await fixture(html `<editing-element></editing-element>`));
        sclDoc = new DOMParser().parseFromString(util.sclDocString, 'application/xml');
    });
    it('loads a document on OpenDocEvent', async () => {
        editor.dispatchEvent(newOpenEvent(sclDoc, 'test.scd'));
        await editor.updateComplete;
        expect(editor.doc).to.equal(sclDoc);
        expect(editor.docName).to.equal('test.scd');
    });
    it('inserts an element on Insert', () => {
        const parent = sclDoc.documentElement;
        const node = sclDoc.createElement('test');
        const reference = sclDoc.querySelector('Substation');
        editor.dispatchEvent(newEditEvent({ parent, node, reference }));
        expect(sclDoc.documentElement.querySelector('test')).to.have.property('nextSibling', reference);
    });
    it('removes an element on Remove', () => {
        const node = sclDoc.querySelector('Substation');
        editor.dispatchEvent(newEditEvent({ node }));
        expect(sclDoc.querySelector('Substation')).to.not.exist;
    });
    it("updates an element's attributes on Update", () => {
        const element = sclDoc.querySelector('Substation');
        editor.dispatchEvent(newEditEvent({
            element,
            attributes: {
                name: 'A2',
                desc: null,
                ['__proto__']: 'a string',
                'myns:attr': {
                    value: 'namespaced value',
                    namespaceURI: 'http://example.org/myns',
                },
            },
        }));
        expect(element).to.have.attribute('name', 'A2');
        expect(element).to.not.have.attribute('desc');
        expect(element).to.have.attribute('__proto__', 'a string');
        expect(element).to.have.attribute('myns:attr', 'namespaced value');
    });
    it('processes complex edits in the given order', () => {
        const parent = sclDoc.documentElement;
        const reference = sclDoc.querySelector('Substation');
        const node1 = sclDoc.createElement('test1');
        const node2 = sclDoc.createElement('test2');
        editor.dispatchEvent(newEditEvent([
            { parent, node: node1, reference },
            { parent, node: node2, reference },
        ]));
        expect(sclDoc.documentElement.querySelector('test1')).to.have.property('nextSibling', node2);
        expect(sclDoc.documentElement.querySelector('test2')).to.have.property('nextSibling', reference);
    });
    it('undoes a committed edit on undo() call', () => {
        const node = sclDoc.querySelector('Substation');
        editor.dispatchEvent(newEditEvent({ node }));
        editor.undo();
        expect(sclDoc.querySelector('Substation')).to.exist;
    });
    it('redoes an undone edit on redo() call', () => {
        const node = sclDoc.querySelector('Substation');
        editor.dispatchEvent(newEditEvent({ node }));
        editor.undo();
        editor.redo();
        expect(sclDoc.querySelector('Substation')).to.not.exist;
    });
    describe('generally', () => {
        it('inserts elements on Insert edit events', () => assert(property(util.testDocs.chain(([doc1, doc2]) => {
            const nodes = doc1.nodes.concat(doc2.nodes);
            return util.insert(nodes);
        }), edit => {
            editor.dispatchEvent(newEditEvent(edit));
            if (util.isValidInsert(edit))
                return (edit.node.parentElement === edit.parent &&
                    edit.node.nextSibling === edit.reference);
            return true;
        })));
        it('updates default namespace attributes on Update edit events', () => assert(property(util.testDocs.chain(([{ nodes }]) => util.update(nodes)), edit => {
            editor.dispatchEvent(newEditEvent(edit));
            return Object.entries(edit.attributes)
                .filter(([name, value]) => util.xmlAttributeName.test(name) && !isNamespaced(value))
                .every(([name, value]) => edit.element.getAttribute(name) === value);
        })));
        it('updates namespaced attributes on Update edit events', () => assert(property(util.testDocs.chain(([{ nodes }]) => util.update(nodes)), edit => {
            editor.dispatchEvent(newEditEvent(edit));
            return Object.entries(edit.attributes)
                .filter(([name, value]) => util.xmlAttributeName.test(name) &&
                isNamespaced(value) &&
                value.namespaceURI)
                .map(entry => entry)
                .every(([name, { value, namespaceURI }]) => edit.element.getAttributeNS(namespaceURI, name.includes(':') ? name.split(':', 2)[1] : name) === value);
        })));
        it('removes elements on Remove edit events', () => assert(property(util.testDocs.chain(([{ nodes }]) => util.remove(nodes)), ({ node }) => {
            editor.dispatchEvent(newEditEvent({ node }));
            return !node.parentNode;
        })));
        it('undoes up to n edits on undo(n) call', () => assert(property(util.testDocs.chain(docs => util.undoRedoTestCases(...docs)), ({ doc1, doc2, edits }) => {
            const [oldDoc1, oldDoc2] = [doc1, doc2].map(doc => doc.cloneNode(true));
            edits.forEach((a) => {
                editor.dispatchEvent(newEditEvent(a));
            });
            if (edits.length)
                editor.undo(edits.length);
            expect(doc1).to.satisfy((doc) => doc.isEqualNode(oldDoc1));
            expect(doc2).to.satisfy((doc) => doc.isEqualNode(oldDoc2));
            return true;
        })));
        it('redoes up to n edits on redo(n) call', () => assert(property(util.testDocs.chain(docs => util.undoRedoTestCases(...docs)), ({ doc1, doc2, edits }) => {
            edits.forEach((a) => {
                editor.dispatchEvent(newEditEvent(a));
            });
            const [oldDoc1, oldDoc2] = [doc1, doc2].map(doc => new XMLSerializer().serializeToString(doc));
            if (edits.length) {
                editor.undo(edits.length + 1);
                editor.redo(edits.length + 1);
            }
            const [newDoc1, newDoc2] = [doc1, doc2].map(doc => new XMLSerializer().serializeToString(doc));
            return oldDoc1 === newDoc1 && oldDoc2 === newDoc2;
        })));
    });
});
//# sourceMappingURL=Editing.spec.js.map