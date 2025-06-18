import { html, fixture, expect } from '@open-wc/testing';

import {
  Create,
  Delete,
  EditorAction,
  isCreate,
  isDelete,
  isMove,
  isReplace,
  isSimple,
  isUpdate,
  Move,
  Replace,
  SimpleAction,
  Update,
  createUpdateAction
} from '@openscd/core/foundation/deprecated/editor.js';
import { Edit, Insert, InsertV2, Remove, Update as UpdateV1, RemoveV2, SetAttributesV2 } from '@openscd/core';

import { convertEditV1toV2 } from '../../src/addons/editor/edit-v1-to-v2-converter';


describe('edit-v1-to-v2-converter', () => {
  const nsXsi = 'urn:example.com';

  const doc = new DOMParser().parseFromString(
    `
    <Substation name="sub" xmlns:xsi="${nsXsi}">
      <Bay name="bay" desc="desc"></Bay>
    </Substation>
    <Substation name="sub2">
    </Substation>
    `,
    'application/xml'
  );
  const substation = doc.querySelector('Substation')!;
  const substation2 = doc.querySelector('Substation[name="sub2"]')!;
  const bay = doc.querySelector('Bay')!;
  
  it('should keep remove as is', () => {
    const remove: Remove = {
      node: bay
    };
    
    const removeV2 = convertEditV1toV2(remove);
    
    const expectedRemoveV2: RemoveV2 = {
      node: bay
    };
    
    expect(removeV2).to.deep.equal(expectedRemoveV2);
  });

  it('should keep insert as is', () => {
    const newBay = doc.createElement('Bay');
    newBay.setAttribute('name', 'bay2');

    const insert: Insert = {
      node: newBay,
      parent: substation,
      reference: null
    };
    
    const insertV2 = convertEditV1toV2(insert);
    
    const expectedInsertV2: InsertV2 = {
      node: newBay,
      parent: substation,
      reference: null
    };
    
    expect(insertV2).to.deep.equal(expectedInsertV2);
  });
  
  it('should convert update to set attributes', () => {
    const newAttributes = {
      name: 'newBayName',
    };
    const update: UpdateV1 = {
      element: bay,
      attributes: newAttributes
    }
    
    const setAttributesV2 = convertEditV1toV2(update);
    
    const expectedSetAttributesV2: SetAttributesV2 = {
      element: bay,
      attributes: newAttributes,
      attributesNS: {}
    };
    
    expect(setAttributesV2).to.deep.equal(expectedSetAttributesV2);
  });

  it('shoudl convert update with namespaced attributes', () => {
    const newAttributes = {
      name: 'newBayName',
      type: {
        value: 'new value',
        namespaceURI: nsXsi
      }
    };

    const update: UpdateV1 = {
      element: bay,
      attributes: newAttributes
    }

    const setAttributesV2 = convertEditV1toV2(update);

    const expectedSetAttributesV2: SetAttributesV2 = {
      element: bay,
      attributes: {
        name: 'newBayName'
      },
      attributesNS: {
        [nsXsi]: {
          type: 'new value'
        }
      }
    };

    expect(setAttributesV2).to.deep.equal(expectedSetAttributesV2);
  });
});
