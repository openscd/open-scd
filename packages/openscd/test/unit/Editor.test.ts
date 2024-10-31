import { html, fixture, expect } from '@open-wc/testing';

import '../../src/addons/Editor.js';
import { OscdEditor } from '../../src/addons/Editor.js';
import { Insert, newEditEvent, Remove, Update } from '@openscd/core';
import { CommitDetail, LogDetail } from '@openscd/core/foundation/deprecated/history.js';


describe('OSCD-Editor', () => {
  let element: OscdEditor;
  let host: HTMLElement;
  let scd: XMLDocument;

  let voltageLevel1: Element;
  let voltageLevel2: Element;
  let bay1: Element;
  let bay2: Element;
  let bay4: Element;
  let bay5: Element;
  let lnode1: Element;
  let lnode2: Element;

  const nsXsi = 'urn:example.com';
  const nsTd = 'urn:typedesigner.com';

  beforeEach(async () => {
    scd = new DOMParser().parseFromString(
      `<Substation name="s1" xmlns:xsi="${nsXsi}" xmlns:td="${nsTd}">
        <VoltageLevel name="v1">
          <Bay name="b1" kind="bay">
            <LNode name="l1" />
          </Bay>
        </VoltageLevel>
        <VoltageLevel name="v2">
          <Bay name="b2" kind="bay">
            <LNode name="l2" lnClass="LLN0" xsi:type="typeXSI" td:type="typeTD" />
          </Bay>
          <Bay name="b4" kind="bay">
          </Bay>
          <Bay name="b5" kind="bay">
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
    bay4 = scd.querySelector('Bay[name="b4"]')!;
    bay5 = scd.querySelector('Bay[name="b5"]')!;
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
        it('should update attribute with namespace', () => {
          const update: Update = {
            element: lnode1,
            attributes: {
              type: { value: 'newType', namespaceURI: 'xsi' }
            }
          };

          host.dispatchEvent(newEditEvent(update));

          expect(lnode1.getAttributeNS('xsi', 'type')).to.equal('newType');
        });

        it('should handle multiple namespaces', () => {
          const update: Update = {
            element: lnode1,
            attributes: {
              type: { value: 'newTypeXSI', namespaceURI: nsXsi }
            }
          };

          host.dispatchEvent(newEditEvent(update));

          const update2: Update = {
            element: lnode1,
            attributes: {
              type: { value: 'newTypeTD', namespaceURI: nsTd }
            }
          };

          host.dispatchEvent(newEditEvent(update2));

          expect(lnode1.getAttributeNS(nsXsi, 'type')).to.equal('newTypeXSI');
          expect(lnode1.getAttributeNS(nsTd, 'type')).to.equal('newTypeTD');
        });

        it('should remove namespaced attribute', () => {
          const update: Update = {
            element: lnode2,
            attributes: {
              type: { value: null, namespaceURI: nsXsi }
            }
          };

          host.dispatchEvent(newEditEvent(update));

          expect(lnode2.getAttributeNS(nsXsi, 'type')).to.be.null;
          expect(lnode2.getAttributeNS(nsTd, 'type')).to.equal('typeTD');
        });

        it('should add and remove multiple normal and namespaced attributes', () => {
          const update: Update = {
            element: lnode2,
            attributes: {
              type: { value: null, namespaceURI: nsXsi },
              kind: { value: 'td-kind', namespaceURI: nsTd },
              normalAttribute: 'normalValue',
              lnClass: null
            }
          };

          host.dispatchEvent(newEditEvent(update));

          expect(lnode2.getAttributeNS(nsXsi, 'type')).to.be.null;
          expect(lnode2.getAttributeNS(nsTd, 'kind')).to.equal('td-kind');
          expect(lnode2.getAttribute('normalAttribute')).to.equal('normalValue');
          expect(lnode2.getAttribute('lnClass')).to.be.null;
        });
      });

      describe('Complex action', () => {
        it('should apply each edit from a complex edit', () => {
          const newNode = scd.createElement('Bay');
          newNode.setAttribute('name', 'b3');
    
          const insert: Insert = {
            parent: voltageLevel1,
            node: newNode,
            reference: bay1
          };

          const remove: Remove = {
            node: bay2
          };

          const update: Update = {
            element: bay1,
            attributes: {
              desc: 'new description'
            }
          };

          host.dispatchEvent(newEditEvent([insert, remove, update]));

          expect(scd.querySelector('VoltageLevel[name="v1"] > Bay[name="b3"]')).to.deep.equal(newNode);
          expect(scd.querySelector('VoltageLevel[name="v2"] > Bay[name="b2"]')).to.be.null;
          expect(scd.querySelector('Bay[name="b1"]')?.getAttribute('desc')).to.equal('new description');
        });
      });

      describe('log edits', () => {
        let log: LogDetail[] = [];
        beforeEach(() => {
          log = [];

          element.addEventListener('log', (e: CustomEvent<LogDetail>) => {
            log.push(e.detail);
          });
        });

        it('should log edit for user event', () => {
          const remove: Remove = {
            node: bay2,
          };

          host.dispatchEvent(newEditEvent(remove, 'user'));

          expect(log).to.have.lengthOf(1);
          const logEntry = log[0] as CommitDetail;
          expect(logEntry.kind).to.equal('action');
          expect(logEntry.title).to.equal('[editing.deleted]');
          expect(logEntry.redo).to.deep.equal(remove);
        });

        it('should not log edit for undo, redo or system event', () => {
          const remove: Remove = {
            node: bay2,
          };

          host.dispatchEvent(newEditEvent(remove, 'redo'));
          host.dispatchEvent(newEditEvent(remove, 'undo'));
          host.dispatchEvent(newEditEvent(remove, 'system'));

          expect(log).to.have.lengthOf(0);
        });
      });
    });
  });

  describe('Undo/Redo', () => {
    let log: CommitDetail[] = [];
    beforeEach(() => {
      log = [];

      element.addEventListener('log', (e: CustomEvent<LogDetail>) => {
        log.push(e.detail as CommitDetail);
      });
    });

    it('should undo insert', () => {
      const newNode = scd.createElement('Bay');
      newNode.setAttribute('name', 'b3');

      const insert: Insert = {
        parent: voltageLevel1,
        node: newNode,
        reference: null
      };

      host.dispatchEvent(newEditEvent(insert));

      const undoInsert = log[0].undo as Remove;

      host.dispatchEvent(newEditEvent(undoInsert));

      expect(scd.querySelector('VoltageLevel[name="v1"] > Bay[name="b3"]')).to.be.null;
    });

    it('should undo remove', () => {
      const remove: Remove = {
        node: bay4
      };

      host.dispatchEvent(newEditEvent(remove));

      const undoRemove = log[0].undo as Insert;

      host.dispatchEvent(newEditEvent(undoRemove));

      const bay4FromScd = scd.querySelector('VoltageLevel[name="v2"] > Bay[name="b4"]');
      expect(bay4FromScd).to.deep.equal(bay4);
    });

    it('should undo update', () => {
      const update: Update = {
        element: bay1,
        attributes: {
          desc: 'new description',
          kind: 'superbay'
        }
      };

      host.dispatchEvent(newEditEvent(update));

      const undoUpdate = log[0].undo as Update;

      host.dispatchEvent(newEditEvent(undoUpdate));

      expect(bay1.getAttribute('desc')).to.be.null;
      expect(bay1.getAttribute('kind')).to.equal('bay');
    });

    it('should redo previously undone action', () => {
      const newNode = scd.createElement('Bay');
      newNode.setAttribute('name', 'b3');

      const insert: Insert = {
        parent: voltageLevel1,
        node: newNode,
        reference: null
      };

      host.dispatchEvent(newEditEvent(insert));

      const undoIsert = log[0].undo;
      const redoInsert = log[0].redo;

      host.dispatchEvent(newEditEvent(undoIsert));

      expect(scd.querySelector('VoltageLevel[name="v1"] > Bay[name="b3"]')).to.be.null;

      host.dispatchEvent(newEditEvent(redoInsert));

      expect(scd.querySelector('VoltageLevel[name="v1"] > Bay[name="b3"]')).to.deep.equal(newNode);
    });

    it('should undo and redo complex edit', () => {
      const newNode = scd.createElement('Bay');
      newNode.setAttribute('name', 'b3');

      const insert: Insert = {
        parent: voltageLevel1,
        node: newNode,
        reference: bay1
      };

      const remove: Remove = {
        node: bay2
      };

      const update: Update = {
        element: bay1,
        attributes: {
          desc: 'new description'
        }
      };

      host.dispatchEvent(newEditEvent([insert, remove, update]));

      const undoComplex = log[0].undo;
      const redoComplex = log[0].redo;

      host.dispatchEvent(newEditEvent(undoComplex));

      expect(scd.querySelector('VoltageLevel[name="v1"] > Bay[name="b3"]')).to.be.null;
      expect(scd.querySelector('VoltageLevel[name="v2"] > Bay[name="b2"]')).to.deep.equal(bay2);
      expect(bay1.getAttribute('desc')).to.be.null;

      host.dispatchEvent(newEditEvent(redoComplex));

      expect(scd.querySelector('VoltageLevel[name="v1"] > Bay[name="b3"]')).to.deep.equal(newNode);
      expect(scd.querySelector('VoltageLevel[name="v2"] > Bay[name="b2"]')).to.be.null;
      expect(bay1.getAttribute('desc')).to.equal('new description');
    });
  });
});

function elementAttributesToMap(element: Element): Record<string, string> {
  const attributes: Record<string, string> = {};
  Array.from(element.attributes).forEach(attr => {
    attributes[attr.name] = attr.value;
  });

  return attributes;
}

