import { html, fixture, expect } from '@open-wc/testing';

import '../../src/addons/Editor.js';
import { OscdEditor } from '../../src/addons/Editor.js';
import {
  Insert,
  InsertV2,
  newEditEvent,
  newEditEventV2,
  Remove,
  Update,
  SetAttributesV2,
  SetTextContentV2,
  RemoveV2,
  XMLEditor
} from '@openscd/core';
import { CommitDetail, LogDetail } from '@openscd/core/foundation/deprecated/history.js';


describe('OSCD-Editor', () => {
  let element: OscdEditor;
  let host: HTMLElement;
  let scd: XMLDocument;
  let editor: XMLEditor;

  let voltageLevel1: Element;
  let voltageLevel2: Element;
  let bay1: Element;
  let bay2: Element;
  let bay4: Element;
  let bay5: Element;
  let bayWithoutTextContent: Element;
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
          <Bay name="bWithoutTextContent"></Bay>
        </VoltageLevel>
      </Substation>`,
      'application/xml',
    );

    host = document.createElement('div');
    editor = new XMLEditor();

    element = <OscdEditor>await fixture(html`<oscd-editor .host=${host} .doc=${scd} .editor=${editor}></oscd-editor>`, { parentNode: host });

    voltageLevel1 = scd.querySelector('VoltageLevel[name="v1"]')!;
    voltageLevel2 = scd.querySelector('VoltageLevel[name="v2"]')!;
    bay1 = scd.querySelector('Bay[name="b1"]')!;
    bay2 = scd.querySelector('Bay[name="b2"]')!;
    bay4 = scd.querySelector('Bay[name="b4"]')!;
    bay5 = scd.querySelector('Bay[name="b5"]')!;
    bayWithoutTextContent = scd.querySelector('Bay[name="bWithoutTextContent"]')!;
    lnode1 = scd.querySelector('LNode[name="l1"]')!;
    lnode2 = scd.querySelector('LNode[name="l2"]')!;
  });

  describe('Editing', () => {
    it('should insert new node', () => {
      const newNode = scd.createElement('Bay');
      newNode.setAttribute('name', 'b3');

      const insert: InsertV2 = {
        parent: voltageLevel1,
        node: newNode,
        reference: null
      };

      host.dispatchEvent(newEditEventV2(insert));

      const newNodeFromScd = scd.querySelector('VoltageLevel[name="v1"] > Bay[name="b3"]');

      expect(newNodeFromScd).to.deep.equal(newNode);
    });

    it('should insert new node before reference', () => {
      const newNode = scd.createElement('Bay');
      newNode.setAttribute('name', 'b3');

      const insert: InsertV2 = {
        parent: voltageLevel1,
        node: newNode,
        reference: bay1
      };

      host.dispatchEvent(newEditEventV2(insert));

      const newNodeFromScd = scd.querySelector('VoltageLevel[name="v1"] > Bay[name="b3"]');

      expect(newNodeFromScd?.nextSibling).to.deep.equal(bay1);
    });

    it('should move node when inserting existing node', () => {
      const insertMove: InsertV2 = {
        parent: voltageLevel1,
        node: bay2,
        reference: null
      };

      host.dispatchEvent(newEditEventV2(insertMove));

      expect(scd.querySelector('VoltageLevel[name="v2"] > Bay[name="b2"]')).to.be.null; 
      expect(scd.querySelector('VoltageLevel[name="v1"] > Bay[name="b2"]')).to.deep.equal(bay2);
    });

    it('should remove node', () => {
      const remove: Remove = {
        node: bay1
      };

      host.dispatchEvent(newEditEventV2(remove));

      expect(scd.querySelector('VoltageLevel[name="v1"] > Bay[name="b1"]')).to.be.null;
    });

    describe('SetAttributes', () => {
      it('should add new attributes and leave old attributes', () => {
        const bay1NewAttributes = {
          desc: 'new description',
          type: 'Superbay'
        };

        const oldAttributes = elementAttributesToMap(bay1);

        const update: SetAttributesV2 = {
          element: bay1,
          attributes: bay1NewAttributes,
          attributesNS: {}
        };

        host.dispatchEvent(newEditEventV2(update));

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

        const update: SetAttributesV2 = {
          element: bay1,
          attributes: bay1NewAttributes,
          attributesNS: {}
        };

        host.dispatchEvent(newEditEventV2(update));

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

        const update: SetAttributesV2 = {
          element: bay1,
          attributes: bay1NewAttributes,
          attributesNS: {}
        };

        host.dispatchEvent(newEditEventV2(update));

        const updatedElement = scd.querySelector(`Bay[name="${bay1NewAttributes.name}"]`)!;

        const { kind, ...expectedAttributes } = {
          ...oldAttributes,
          ...bay1NewAttributes
        };

        expect(elementAttributesToMap(updatedElement)).to.deep.equal(expectedAttributes);
      });

      describe('namespaced attributes', () => {
        it('should update attribute with namespace', () => {
          const update: SetAttributesV2 = {
            element: lnode1,
            attributes: { },
            attributesNS: {
              [nsXsi]: { type: 'newType' }
            }
          };

          host.dispatchEvent(newEditEventV2(update));

          expect(lnode1.getAttributeNS(nsXsi, 'type')).to.equal('newType');
        });

        it('should handle multiple namespaces', () => {
          const update: SetAttributesV2 = {
            element: lnode1,
            attributes: { },
            attributesNS: {
              [nsXsi]: { type: 'newTypeXSI' }
            }
          };

          host.dispatchEvent(newEditEventV2(update));

          const update2: SetAttributesV2 = {
            element: lnode1,
            attributes: { },
            attributesNS: {
              [nsTd]: { type: 'newTypeTD' }
            }
          };

          host.dispatchEvent(newEditEventV2(update2));

          expect(lnode1.getAttributeNS(nsXsi, 'type')).to.equal('newTypeXSI');
          expect(lnode1.getAttributeNS(nsTd, 'type')).to.equal('newTypeTD');
        });

        it('should remove namespaced attribute', () => {
          const update: SetAttributesV2 = {
            element: lnode2,
            attributes: { },
            attributesNS: {
              [nsXsi]: { type: null }
            }
          };

          host.dispatchEvent(newEditEventV2(update));

          expect(lnode2.getAttributeNS(nsXsi, 'type')).to.be.null;
          expect(lnode2.getAttributeNS(nsTd, 'type')).to.equal('typeTD');
        });

        it('should add and remove multiple normal and namespaced attributes', () => {
          const update: SetAttributesV2 = {
            element: lnode2,
            attributes: {
              normalAttribute: 'normalValue',
              lnClass: null
            },
            attributesNS: {
              [nsXsi]: {
                type: null
              },
              [nsTd]: {
                kind: 'td-kind'
              }
            }
          };

          host.dispatchEvent(newEditEventV2(update));

          expect(lnode2.getAttributeNS(nsXsi, 'type')).to.be.null;
          expect(lnode2.getAttributeNS(nsTd, 'kind')).to.equal('td-kind');
          expect(lnode2.getAttribute('normalAttribute')).to.equal('normalValue');
          expect(lnode2.getAttribute('lnClass')).to.be.null;
        });
      });

      describe('SetTextContent', () => {
        it('should set text content', () => {
          const update: SetTextContentV2 = {
            element: bay1,
            textContent: 'new text'
          };

          host.dispatchEvent(newEditEventV2(update));

          expect(bay1.textContent).to.equal('new text');
        });
      });

      describe('Complex action', () => {
        it('should apply each edit from a complex edit', () => {
          const newNode = scd.createElement('Bay');
          newNode.setAttribute('name', 'b3');
    
          const insert: InsertV2 = {
            parent: voltageLevel1,
            node: newNode,
            reference: bay1
          };

          const remove: RemoveV2 = {
            node: bay2
          };

          const update: SetAttributesV2 = {
            element: bay1,
            attributes: {
              desc: 'new description'
            },
            attributesNS: {}
          };

          host.dispatchEvent(newEditEventV2([insert, remove, update]));

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

        describe('validate after edit', () => {
          let hasTriggeredValidate = false;
          beforeEach(() => {
            hasTriggeredValidate = false;
  
            element.addEventListener('validate', () => {
              hasTriggeredValidate = true;
            });
          });

          it('should dispatch validate event after edit', async () => {
            const remove: RemoveV2 = {
              node: bay2,
            };
  
            host.dispatchEvent(newEditEventV2(remove));

            await element.updateComplete;

            expect(hasTriggeredValidate).to.be.true;
          });
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

      const insert: InsertV2 = {
        parent: voltageLevel1,
        node: newNode,
        reference: null
      };

      host.dispatchEvent(newEditEventV2(insert));

      editor.undo();

      expect(scd.querySelector('VoltageLevel[name="v1"] > Bay[name="b3"]')).to.be.null;
    });

    it('should undo remove', () => {
      const remove: RemoveV2 = {
        node: bay4
      };

      host.dispatchEvent(newEditEventV2(remove));

      editor.undo();

      const bay4FromScd = scd.querySelector('VoltageLevel[name="v2"] > Bay[name="b4"]');
      expect(bay4FromScd).to.deep.equal(bay4);
    });

    it('should undo set attributes', () => {
      const update: SetAttributesV2 = {
        element: bay1,
        attributes: {
          desc: 'new description',
          kind: 'superbay'
        },
        attributesNS: {}
      };

      host.dispatchEvent(newEditEventV2(update));

      editor.undo();

      expect(bay1.getAttribute('desc')).to.be.null;
      expect(bay1.getAttribute('kind')).to.equal('bay');
    });

    it('should undo set textcontent', () => {
      const update: SetTextContentV2 = {
        element: bayWithoutTextContent,
        textContent: 'new text'
      };

      host.dispatchEvent(newEditEventV2(update));

      editor.undo();

      expect(bayWithoutTextContent.textContent).to.be.empty;
    });

    it('should restore children when undoing set textcontent', () => {
      const update: SetTextContentV2 = {
        element: bay2,
        textContent: 'new text'
      };

      host.dispatchEvent(newEditEventV2(update));

      expect(bay2.children).to.be.empty;

      editor.undo();

      expect(bay2.children[0]).to.deep.equal(lnode2);
    });

    it('should redo previously undone action', () => {
      const newNode = scd.createElement('Bay');
      newNode.setAttribute('name', 'b3');

      const insert: InsertV2 = {
        parent: voltageLevel1,
        node: newNode,
        reference: null
      };

      host.dispatchEvent(newEditEventV2(insert));

      editor.undo();

      expect(scd.querySelector('VoltageLevel[name="v1"] > Bay[name="b3"]')).to.be.null;

      editor.redo();

      expect(scd.querySelector('VoltageLevel[name="v1"] > Bay[name="b3"]')).to.deep.equal(newNode);
    });

    it('should undo and redo complex edit', () => {
      const newNode = scd.createElement('Bay');
      newNode.setAttribute('name', 'b3');

      const insert: InsertV2 = {
        parent: voltageLevel1,
        node: newNode,
        reference: bay1
      };

      const remove: RemoveV2 = {
        node: bay2
      };

      const update: SetAttributesV2 = {
        element: bay1,
        attributes: {
          desc: 'new description'
        },
        attributesNS: {}
      };

      host.dispatchEvent(newEditEventV2([insert, remove, update]));

      editor.undo();

      expect(scd.querySelector('VoltageLevel[name="v1"] > Bay[name="b3"]')).to.be.null;
      expect(scd.querySelector('VoltageLevel[name="v2"] > Bay[name="b2"]')).to.deep.equal(bay2);
      expect(bay1.getAttribute('desc')).to.be.null;

      editor.redo();

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

