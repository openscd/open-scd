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
import { Edit, Insert, Remove, Update as UpdateV2 } from '@openscd/core';

import { convertEditActiontoV1 } from '../../src/addons/editor/edit-action-to-v1-converter.js';


describe('edit-v1-to-v2-converter', () => {
  const doc = new DOMParser().parseFromString(
    `
    <Substation name="sub">
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

  it('should convert delete to remove', () => {
    const deleteAction: Delete = {
      old: {
        parent: substation,
        element: bay
      }
    };

    const remove = convertEditActiontoV1(deleteAction);

    const expectedRemove: Remove = {
      node: bay
    };

    expect(remove).to.deep.equal(expectedRemove);
  });

  it('should convert create to insert', () => {
    const newBay = doc.createElement('Bay');
    newBay.setAttribute('name', 'bay2');

    const createAction: Create = {
      new: {
        parent: substation,
        element: newBay
      }
    };

    const insert = convertEditActiontoV1(createAction);

    const expectedInsert: Insert = {
      parent: substation,
      node: newBay,
      reference: null
    };

    expect(insert).to.deep.equal(expectedInsert);
  });

  it('should convert update to updateV2', () => {
    const newAttributes = {
      name: 'newBayName',
    };
    const updateAction = createUpdateAction(bay, newAttributes);

    const updateV2 = convertEditActiontoV1(updateAction);

    const expectedUpdateV2: UpdateV2 = {
      element: bay,
      attributes: {
        ...newAttributes,
        desc: null
      }
    };

    expect(updateV2).to.deep.equal(expectedUpdateV2);
  });

  it('should convert move to insert', () => {
    const moveAction: Move = {
      old: {
        parent: substation,
        element: bay,
        reference: null
      },
      new: {
        parent: substation2,
        reference: null
      }
    };

    const insert = convertEditActiontoV1(moveAction);

    const expectedInsert: Insert = {
      parent: substation2,
      node: bay,
      reference: null
    };

    expect(insert).to.deep.equal(expectedInsert);
  });

  it('should convert replace to complex action with remove and insert', () => {
    const ied = doc.createElement('IED');
    ied.setAttribute('name', 'ied');

    const replace: Replace = {
      old: {
        element: bay
      },
      new: {
        element: ied
      }
    };

    const [ remove, insert ] = convertEditActiontoV1(replace) as Edit[];

    const expectedRemove: Remove = {
      node: bay
    };
    const expectedInsert: Insert = {
      parent: substation,
      node: ied,
      reference: bay.nextSibling
    };

    expect(remove).to.deep.equal(expectedRemove);
    expect(insert).to.deep.equal(expectedInsert);
  });
});
