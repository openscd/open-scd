import { expect } from '@open-wc/testing';

import {
  tagValidator,
  validateChildren,
} from '../../../../src/validators/templates/foundation.js';

describe('validator foundation', () => {
  describe('tagValidator', () => {
    it('tagValidator returns undefined with missing tagName', () => {
      expect(tagValidator['noTag']).to.be.undefined;
    });
  });
  describe('validateChildren', () => {
    let element: Element;
    beforeEach(() => {
      element = new DOMParser().parseFromString(
        '<Element name="name"><NoTag></NoTag></Element>',
        'application/xml'
      ).documentElement;
    });
    it('does not throw Issues for unknown childTags', async () => {
      const issues = await validateChildren(element);
      expect(issues.length).to.equal(0);
    });
  });
});
