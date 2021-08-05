import { ListItem } from '@material/mwc-list/mwc-list-item';
import { expect, fixture, html } from '@open-wc/testing';
import { Directory, FinderPane } from '../../src/finder-pane.js';

const path = ['e2', 'e1', 'e4'];

const entries: Record<string, string[]> = {
  e1: ['e2', 'e3', 'e4'],
  e2: ['e3', 'e1'],
  e3: [],
  e4: ['e2', 'e3'],
};

async function getChildren(path: string[]): Promise<Directory> {
  return {
    content: html`<p>${path[path.length - 1]}</p>`,
    children: entries[path[path.length - 1]],
  };
}

describe('finder-pane', () => {
  let element: FinderPane;

  beforeEach(async () => {
    element = await fixture(html`<finder-pane></finder-pane>`);
  });

  it('displays nothing with default properties', () =>
    expect(element).shadowDom.to.equalSnapshot());

  describe('given a path and a getChildren method', () => {
    let items: ListItem[];

    beforeEach(async () => {
      element = await fixture(
        html`<finder-pane
          .path=${path}
          .getChildren=${getChildren}
        ></finder-pane>`
      );
      items = Array.from(
        element.shadowRoot?.querySelectorAll('mwc-list-item') ?? []
      );
    });

    it('displays one list of children per path entry', () =>
      expect(element).shadowDom.to.equalSnapshot());

    describe('when an entry in the last column is selected', () => {
      beforeEach(async () => {
        items[items.length - 1].click();
        await element.updateComplete;
      });

      it("appends a new column with the chosen entry's children", () =>
        expect(element).shadowDom.to.equalSnapshot());
    });

    describe('when an entry in the first column is selected', () => {
      beforeEach(async () => {
        items[0].click();
        await element.updateComplete;
      });

      it('replaces all but the first column with a new column', () =>
        expect(element).shadowDom.to.equalSnapshot());
    });
  });
});
