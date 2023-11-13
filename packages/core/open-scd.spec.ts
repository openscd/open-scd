import { elementUpdated, expect } from '@open-wc/testing';

import './open-scd.js';
import type { OpenSCD } from './open-scd.js';

import { newEditEvent, newOpenEvent } from './foundation.js';

function isOscdPlugin(tag: string): boolean {
  return tag.toLocaleLowerCase().startsWith('oscd-p');
}

const doc = new DOMParser().parseFromString(
  `<testdoc></testdoc>`,
  'application/xml'
);

let editor: OpenSCD;
beforeEach(() => {
  editor = document.createElement('open-scd');
  document.body.prepend(editor);
});

afterEach(() => {
  editor.remove();
});

describe('with editor plugins loaded', () => {
  beforeEach(async () => {
    editor.plugins = {
      menu: [],
      editor: [
        {
          name: 'Test Editor Plugin',
          translations: { de: 'Test Editor Erweiterung' },
          src: 'data:text/javascript;charset=utf-8,export%20default%20class%20TestEditorPlugin%20extends%20HTMLElement%20%7B%0D%0A%20%20constructor%20%28%29%20%7B%20super%28%29%3B%20this.innerHTML%20%3D%20%60%3Cp%3ETest%20Editor%20Plugin%3C%2Fp%3E%60%3B%20%7D%0D%0A%7D',
          icon: 'edit',
          active: true,
          requireDoc: false,
        },
      ],
    };
    await editor.updateComplete;
  });

  it('passes attribute locale', async () => {
    const plugin: Element = Array.from(
      editor.shadowRoot?.querySelectorAll('*') || []
    ).find(e => isOscdPlugin(e.tagName))!;

    await elementUpdated(plugin);
    expect(plugin?.tagName).to.exist.and.to.satisfy(isOscdPlugin);
  });

  it('passes attribute docName', async () => {
    editor.dispatchEvent(newOpenEvent(doc, 'test.xml'));
    await editor.updateComplete;

    const plugin: Element = Array.from(
      editor.shadowRoot?.querySelectorAll('*') || []
    ).find(e => isOscdPlugin(e.tagName))!;

    await elementUpdated(plugin);
    expect(plugin?.tagName).to.exist.and.to.satisfy(isOscdPlugin);
    expect(plugin).to.have.property('docName', 'test.xml');
  });

  it('passes property doc', async () => {
    editor.dispatchEvent(newOpenEvent(doc, 'test.xml'));
    await editor.updateComplete;

    const plugin: Element = Array.from(
      editor.shadowRoot?.querySelectorAll('*') || []
    ).find(e => isOscdPlugin(e.tagName))!;

    await elementUpdated(plugin);
    expect(plugin).to.have.property('docs');
  });

  it('passes property editCount', async () => {
    editor.dispatchEvent(newOpenEvent(doc, 'test.xml'));
    await editor.updateComplete;

    const plugin: Element = Array.from(
      editor.shadowRoot?.querySelectorAll('*') || []
    ).find(e => isOscdPlugin(e.tagName))!;

    await elementUpdated(plugin);
    expect(plugin).to.have.property('editCount', 0);
  });

  it('updated passed editCount property on edit events', async () => {
    editor.dispatchEvent(newOpenEvent(doc, 'test.xml'));
    await editor.updateComplete;

    editor.dispatchEvent(
      newEditEvent({
        element: doc.querySelector('testdoc')!,
        attributes: { name: 'someName' },
      })
    );
    await editor.updateComplete;

    const plugin: Element = Array.from(
      editor.shadowRoot?.querySelectorAll('*') || []
    ).find(e => isOscdPlugin(e.tagName))!;

    await elementUpdated(plugin);
    expect(plugin).to.have.property('editCount', 1);
  });
});

describe('with menu plugins loaded', () => {
  beforeEach(async () => {
    editor.plugins = {
      menu: [
        {
          name: 'Test Menu Plugin',
          translations: { de: 'Test Menü Erweiterung' },
          src: 'data:text/javascript;charset=utf-8,export%20default%20class%20TestPlugin%20extends%20HTMLElement%20%7B%0D%0A%20%20async%20run%28%29%20%7B%0D%0A%20%20%20%20return%20false%3B%0D%0A%20%20%7D%0D%0A%7D',
          icon: 'android',
          active: true,
          requireDoc: true,
        },
      ],
    };
    await editor.updateComplete;
  });

  it('passes attribute locale', async () => {
    await editor.updateComplete;

    const plugin: Element = Array.from(
      editor.shadowRoot?.querySelectorAll('*') || []
    ).find(e => isOscdPlugin(e.tagName))!;

    await elementUpdated(plugin);

    expect(plugin?.tagName).to.exist.and.to.satisfy(isOscdPlugin);

    expect(plugin).to.have.property('locale', 'en');
  });

  it('passes attribute docName', async () => {
    editor.dispatchEvent(newOpenEvent(doc, 'test.xml'));
    await editor.updateComplete;

    const plugin: Element = Array.from(
      editor.shadowRoot?.querySelectorAll('*') || []
    ).find(e => isOscdPlugin(e.tagName))!;

    await elementUpdated(plugin);
    expect(plugin?.tagName).to.exist.and.to.satisfy(isOscdPlugin);
    expect(plugin).to.have.property('docName', 'test.xml');
  });

  it('passes property doc', async () => {
    editor.dispatchEvent(newOpenEvent(doc, 'test.xml'));
    await editor.updateComplete;

    const plugin: Element = Array.from(
      editor.shadowRoot?.querySelectorAll('*') || []
    ).find(e => isOscdPlugin(e.tagName))!;

    await elementUpdated(plugin);
    expect(plugin).to.have.property('docs');
  });

  it('passes property editCount', async () => {
    editor.dispatchEvent(newOpenEvent(doc, 'test.xml'));
    await editor.updateComplete;

    const plugin: Element = Array.from(
      editor.shadowRoot?.querySelectorAll('*') || []
    ).find(e => isOscdPlugin(e.tagName))!;

    await elementUpdated(plugin);
    expect(plugin).to.have.property('editCount', 0);
  });

  it('updated passed editCount property on edit events', async () => {
    editor.dispatchEvent(newOpenEvent(doc, 'test.xml'));
    await editor.updateComplete;

    editor.dispatchEvent(
      newEditEvent({
        element: doc.querySelector('testdoc')!,
        attributes: { name: 'someName' },
      })
    );
    await editor.updateComplete;

    const plugin: Element = Array.from(
      editor.shadowRoot?.querySelectorAll('*') || []
    ).find(e => isOscdPlugin(e.tagName))!;

    await elementUpdated(plugin);

    expect(plugin).to.have.property('editCount', 1);
  });
});
