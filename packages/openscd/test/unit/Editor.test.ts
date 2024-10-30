import { html, fixture, expect } from '@open-wc/testing';

import '../../src/addons/Editor.js';
import { OscdEditor } from '../../src/addons/Editor.js';
import { Insert, newEditEvent, Remove, Update } from '@openscd/core';


describe('OSCD-Editor', () => {
  let element: OscdEditor;
  let host: HTMLElement;
  let scd: XMLDocument;

  let voltageLevel1: Element;
  let voltageLevel2: Element;
  let bay1: Element;
  let bay2: Element;
  let lnode1: Element;
  let lnode2: Element;

  beforeEach(async () => {
    scd = new DOMParser().parseFromString(
      `<Substation name="s1">
        <VoltageLevel name="v1">
          <Bay name="b1" kind="bay">
            <LNode name="l1" />
          </Bay>
        </VoltageLevel>
        <VoltageLevel name="v2">
          <Bay name="b2" kind="bay">
            <LNode name="l2" />
          </Bay>
        </VoltageLevel>
      </Substation>`,
      'application/xml',
    );

    host = document.createElement('div');

    element = <OscdEditor>await fixture(html`<oscd-editor .host=${host} .doc=${scd}></oscd-editor>`, { parentNode: host });

    voltageLevel1 = scd.querySelector('VoltageLevel[name="v1"]')!;
    voltageLevel2 = scd.querySelector('VoltageLevel[name="v2"]')!;
    bay1 = scd.querySelector('Bay[name="b1"]')!;
    bay2 = scd.querySelector('Bay[name="b2"]')!;
    lnode1 = scd.querySelector('LNode[name="l1"]')!;
    lnode2 = scd.querySelector('LNode[name="l2"]')!;
  });

  describe('Editing', () => {
    it('should insert new node', () => {
      const newNode = scd.createElement('Bay');
      newNode.setAttribute('name', 'b3');

      const insert: Insert = {
        parent: voltageLevel1,
        node: newNode,
        reference: null
      };

      host.dispatchEvent(newEditEvent(insert));

      const newNodeFromScd = scd.querySelector('VoltageLevel[name="v1"] > Bay[name="b3"]');

      expect(newNodeFromScd).to.deep.equal(newNode);
    });

    it('should insert new node before reference', () => {
      const newNode = scd.createElement('Bay');
      newNode.setAttribute('name', 'b3');

      const insert: Insert = {
        parent: voltageLevel1,
        node: newNode,
        reference: bay1
      };

      host.dispatchEvent(newEditEvent(insert));

      const newNodeFromScd = scd.querySelector('VoltageLevel[name="v1"] > Bay[name="b3"]');

      expect(newNodeFromScd?.nextSibling).to.deep.equal(bay1);
    });

    it('should move node when inserting existing node', () => {
      const insertMove: Insert = {
        parent: voltageLevel1,
        node: bay2,
        reference: null
      };

      host.dispatchEvent(newEditEvent(insertMove));

      expect(scd.querySelector('VoltageLevel[name="v2"] > Bay[name="b2"]')).to.be.null; 
      expect(scd.querySelector('VoltageLevel[name="v1"] > Bay[name="b2"]')).to.deep.equal(bay2);
    });

    it('should remove node', () => {
      const remove: Remove = {
        node: bay1
      };

      host.dispatchEvent(newEditEvent(remove));

      expect(scd.querySelector('VoltageLevel[name="v1"] > Bay[name="b1"]')).to.be.null;
    });

    describe('Update', () => {
      it('should add new attributes and leave old attributes', () => {
        const bay1NewAttributes = {
          desc: 'new description',
          type: 'Superbay'
        };

        const oldAttributes = elementAttributesToMap(bay1);

        const update: Update = {
          element: bay1,
          attributes: bay1NewAttributes
        };

        host.dispatchEvent(newEditEvent(update));

        const updatedElement = scd.querySelector('Bay[name="b1"]')!;

        const expectedAttributes = {
          ...oldAttributes,
          ...bay1NewAttributes
        };

        expect(elementAttributesToMap(updatedElement)).to.deep.equal(expectedAttributes);
      });

      it('should remove attribute with null value', () => {
        const bay1NewAttributes = {
          kind: null
        };

        const update: Update = {
          element: bay1,
          attributes: bay1NewAttributes
        };

        host.dispatchEvent(newEditEvent(update));

        const updatedElement = scd.querySelector('Bay[name="b1"]')!;

        expect(updatedElement.getAttribute('kind')).to.be.null;
      });

      it('should change, add and remove attributes in one update', () => {
        const bay1NewAttributes = {
          name: 'b5',
          kind: null,
          desc: 'new description'
        };

        const oldAttributes = elementAttributesToMap(bay1);

        const update: Update = {
          element: bay1,
          attributes: bay1NewAttributes
        };

        host.dispatchEvent(newEditEvent(update));

        const updatedElement = scd.querySelector(`Bay[name="${bay1NewAttributes.name}"]`)!;

        const { kind, ...expectedAttributes } = {
          ...oldAttributes,
          ...bay1NewAttributes
        };

        expect(elementAttributesToMap(updatedElement)).to.deep.equal(expectedAttributes);
      });

      describe('namespaced attributes', () => {
        // TODO
      });
    });
  });

  describe('Undo/Redo', () => {
    // TODO
  });
});

function elementAttributesToMap(element: Element): Record<string, string> {
  const attributes: Record<string, string> = {};
  Array.from(element.attributes).forEach(attr => {
    attributes[attr.name] = attr.value;
  });

  return attributes;
}

