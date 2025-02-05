import {
  Edit,
  EditEvent,
  EditEventDetail,
  isComplex,
  isInsert,
  isNamespaced,
  isRemove,
  isUpdate,
  NamespacedAttributeValue,
  newEditEvent,
} from './edit-event';

const doc: XMLDocument = new DOMParser().parseFromString(
  `<Document></Document>`,
  'application/xml'
);

describe('edit-event.ts', () => {
  const el: Element = doc.createElement('Parent');

  describe('isComplex', () => {
    it('should return true when `Edit` is complex', () => {
      const complexEdit: Edit = [
        {
          element: el,
          attributes: {
            firstname: 'John',
          },
        },
        {
          element: el,
          attributes: {
            lastname: 'Doe',
          },
        },
      ];

      expect(isComplex(complexEdit)).toBeTruthy();
    });

    it('Should return false when `Edit` is simple', () => {
      const simpleEdit: Edit = {
        element: el,
        attributes: {
          name: 'John Doe',
        },
      };

      expect(isComplex(simpleEdit)).toBeFalsy();
    });
  });

  describe('isInsert', () => {
    it('Should return true when `Edit` is Insert', () => {
      const edit: Edit = {
        parent: doc,
        node: el,
      };

      expect(isInsert(edit)).toBeTruthy();
    });

    it('Should return false when `Edit` is Update', () => {
      const edit: Edit = {
        element: el,
        attributes: {
          name: 'John Doe',
        },
      };

      expect(isInsert(edit)).toBeFalsy();
    });
  });

  describe('isNamespaced', () => {
    it('Should return true when `value` is Namespaced', () => {
      const value: NamespacedAttributeValue = {
        value: 'Name',
        namespaceURI: 'TEST',
      };

      expect(isNamespaced(value)).toBeTruthy();
    });

    it('Should return false when `value` is String', () => {
      expect(isNamespaced('TEST')).toBeFalsy();
    });

    it('Should return false when `value` is null', () => {
      expect(isNamespaced(null)).toBeFalsy();
    });
  });

  describe('isUpdate', () => {
    it('Should return true when Edit is Update', () => {
      const edit: Edit = {
        element: el,
        attributes: {},
      };

      expect(isUpdate(edit)).toBeTruthy();
    });

    it('Should return false when Edit is Insert', () => {
      const edit: Edit = {
        parent: doc,
        node: el,
      };

      expect(isUpdate(edit)).toBeFalsy();
    });
  });

  describe('isRemove', () => {
    it('Should return true when Edit is Remove', () => {
      const edit: Edit = {
        node: el,
      };

      expect(isRemove(edit)).toBeTruthy();
    });

    it('Should return false when Edit is Update', () => {
      const edit: Edit = {
        element: el,
        attributes: {},
      };

      expect(isRemove(edit)).toBeFalsy();
    });
  });

  describe('newEditEvent', () => {
    it('Should have name `oscd-edit`', () => {
      const edit: Edit = {
        element: el,
        attributes: {},
      };

      const res: EditEvent = newEditEvent(edit);

      expect(res.type).toEqual('oscd-edit');
    });

    it('Should be composed', () => {
      const edit: Edit = {
        element: el,
        attributes: {},
      };

      const res: EditEvent = newEditEvent(edit);

      expect(res.composed).toBeTruthy();
    });

    it('Should be bubble-able', () => {
      const edit: Edit = {
        element: el,
        attributes: {},
      };

      const res: EditEvent = newEditEvent(edit);

      expect(res.bubbles).toBeTruthy();
    });

    it('Should have Edit as Detail', () => {
      const edit: Edit = {
        element: el,
        attributes: {},
      };

      const res: EditEvent = newEditEvent(edit);

      const expectedEventDetail: EditEventDetail<Edit> = {
        edit: {
          element: el,
          attributes: {},
        },
        initiator: 'user',
      };

      expect(res.detail).toEqual(expectedEventDetail);
    });
  });
});
