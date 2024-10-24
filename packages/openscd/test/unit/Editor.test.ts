import { html, fixture, expect } from '@open-wc/testing';

import '../../src/addons/Editor.js';
import { OscdEditor } from '../../src/addons/Editor.js';


describe('OSCD-Editor', () => {
  let element: OscdEditor;
  let host: HTMLElement;
  let scd: XMLDocument;

  beforeEach(async () => {
    scd = new DOMParser().parseFromString(
      `<Substation>
        <Private></Private>
        <LNode></LNode>
      </Substation>`,
      'application/xml',
    );

    host = document.createElement('div');

    element = <OscdEditor>await fixture(html`<oscd-editor .host=${host} .doc=${scd}></oscd-editor>`, { parentNode: host });
  });

  it('is defined', () => {
    expect(element).property('doc').to.exist;
  });
});
