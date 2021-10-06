import { ListItem } from '@material/mwc-list/mwc-list-item';
import { expect, fixture, html } from '@open-wc/testing';
import '../../src/finder-list.js';
import { Directory, FinderList, Path } from '../../src/finder-list.js';

const pathA = ['e2', 'e1', 'e4'];
const pathB = ['e1', 'e4'];
const pathC = ['e3'];
const selectionA = { e2: { e1: { e4: {} } } };

const paths = [pathA, pathB, pathC];
const selection = {
  e2: { e1: { e4: {} } },
  e1: { e4: {} },
  e3: {},
};

const entries: Record<string, string[]> = {
  e1: ['e2', 'e3', 'e4'],
  e2: ['e3', 'e1'],
  e3: [],
  e4: ['e2', 'e1'],
};

async function read(path: Path): Promise<Directory> {
  const dir = path[path.length - 1];
  return {
    path,
    header: html`<h2>${dir}</h2>`,
    entries: entries[dir] ?? [],
  };
}

describe('finder-list', () => {
  let element: FinderList;

  beforeEach(async () => {
    element = await fixture(html`<finder-list></finder-list>`);
  });

  it('displays nothing with default properties', () =>
    expect(element).property('container').to.be.empty);

  it('translates given .paths into a .selection tree', () => {
    element.paths = paths;
    console.log(paths, selection);
    console.warn(element.paths, element.selection);
    expect(element.selection).to.deep.equal(selection);
  });

  it('translates a given .selection tree into .paths', () => {
    element.selection = selection;
    expect(element.paths).to.deep.equal(paths);
  });

  it('lets you set a singleton .path directly', () => {
    element.path = pathA;
    expect(element.selection).to.deep.equal(selectionA);
    expect(element.paths).to.deep.equal([pathA]);
  });

  it('lets you access a singleton .path directly', () => {
    element.selection = selectionA;
    expect(element.path).to.deep.equal(pathA);
    expect(element.paths).to.deep.equal([pathA]);
  });

  it('shows an empty .path given empty .paths', () => {
    element.paths = [];
    expect(element.path).to.deep.equal([]);
  });

  describe('given a .path and a .read method', () => {
    let items: ListItem[];

    beforeEach(async () => {
      element = await fixture(
        html`<finder-list .path=${pathA} .read=${read}></finder-list>`
      );
      items = Array.from(
        element.shadowRoot?.querySelectorAll('mwc-list-item') ?? []
      );
    });

    it('displays one list per path element', () =>
      expect(element)
        .property('container')
        .property('children')
        .to.have.lengthOf(pathA.length));

    describe('when an item in the last column is selected', () => {
      const parent = pathA[pathA.length - 1];
      const parentEntries = entries[parent];
      const directory = parentEntries[parentEntries.length - 1];

      beforeEach(async () => {
        items[items.length - 1].click();
        await element.updateComplete;
      });

      it('appends a new column to the container', () =>
        expect(element)
          .property('container')
          .property('children')
          .to.have.lengthOf(pathA.length + 1));

      it("renders the selected directory's header at the top of the new column", () =>
        expect(element)
          .property('container')
          .property('lastElementChild')
          .property('firstElementChild')
          .to.have.text(directory)
          .and.to.have.property('tagName', 'H2'));

      it("renders the selected directory's children into a list below the header", () =>
        expect(element)
          .property('container')
          .property('lastElementChild')
          .property('lastElementChild')
          .property('children')
          .to.have.lengthOf(entries[directory].length));

      it('looks like its latest snapshot', () =>
        expect(element).shadowDom.to.equalSnapshot());
    });

    describe('when an item in the first column is selected', () => {
      const parent = pathA[0];
      const parentEntries = entries[parent];
      const directory = parentEntries[0];

      beforeEach(async () => {
        items[0].click();
        await element.updateComplete;
      });

      it('replaces all but the first column with a new column', () =>
        expect(element)
          .property('container')
          .property('children')
          .to.have.lengthOf(2));

      it("renders the selected directory's header at the top of the new column", () =>
        expect(element)
          .property('container')
          .property('lastElementChild')
          .property('firstElementChild')
          .to.have.text(directory)
          .and.to.have.property('tagName', 'H2'));

      it("renders the selected directory's children into a list below the header", () =>
        expect(element)
          .property('container')
          .property('lastElementChild')
          .property('lastElementChild')
          .property('children')
          .to.have.lengthOf(entries[directory].length));

      it('looks like its latest snapshot', () =>
        expect(element).shadowDom.to.equalSnapshot());
    });

    describe('when the selected item in the first column is deselected', () => {
      beforeEach(async () => {
        console.log(items[1]);
        items[1].click();
        await element.updateComplete;
      });

      it('renders only the first column', () =>
        expect(element)
          .property('container')
          .property('children')
          .to.have.lengthOf(1));

      it('looks like its latest snapshot', () =>
        expect(element).shadowDom.to.equalSnapshot());
    });
  });

  describe('given the "multi" attribute, some .paths, and a .read method', () => {
    let items: ListItem[];

    beforeEach(async () => {
      element = await fixture(
        html`<finder-list .paths=${paths} .read=${read} multi></finder-list>`
      );
      items = Array.from(
        element.shadowRoot?.querySelectorAll('mwc-list-item') ?? []
      );
    });

    it('displays one list of children per element of the longest path', () =>
      expect(element)
        .property('container')
        .property('children')
        .to.have.lengthOf(Math.max(...paths.map(p => p.length))));

    it('looks like its latest snapshot', () =>
      expect(element).shadowDom.to.equalSnapshot());

    describe('when an item in the first column is selected', () => {
      const parent = paths[0][0];
      const parentEntries = entries[parent];
      const directory = parentEntries[0];

      beforeEach(async () => {
        items[0].click();
        await element.updateComplete;
      });

      it("adds the selected directory's header to the second column", () =>
        expect(element)
          .property('container')
          .descendant('.column:nth-child(2)')
          .descendant('h2:nth-child(3)')
          .to.have.text(directory));

      it("adds the selected directory's entries to the second column", () =>
        expect(element)
          .property('container')
          .descendant('.column:nth-child(2)')
          .descendant('filtered-list:nth-child(4)')
          .property('children')
          .to.have.lengthOf(entries[directory].length));

      it('looks like its latest snapshot', () =>
        expect(element).shadowDom.to.equalSnapshot());
    });

    describe('when a selected item in the first column is deselected', () => {
      beforeEach(async () => {
        console.log(items[1]);
        items[1].click();
        await element.updateComplete;
        console.warn(element.container.querySelector('.column:nth-child(2)'));
      });

      it('removes the deselected directory from the second column', () =>
        expect(element)
          .property('container')
          .descendant('.column:nth-child(2)')
          .to.not.contain.html(
            `<h2><!---->${entries[paths[0][0]][1]}<!----></h2>`
          ));

      it('looks like its latest snapshot', () =>
        expect(element).shadowDom.to.equalSnapshot());
    });
  });
});
