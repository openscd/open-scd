import { visualDiff } from '@web/test-runner-visual-regression';

import type { IconButton } from '@material/mwc-icon-button';
import type { ListItem } from '@material/mwc-list/mwc-list-item.js';

import './open-scd.js';
import { expect } from '@open-wc/testing';
import type { OpenSCD } from './open-scd.js';

import { Edit, newEditEvent, newOpenEvent } from './foundation.js';
import { allLocales } from './locales.js';

const factor = process.env.CI ? 2 : 1;

function timeout(ms: number) {
  return new Promise(res => setTimeout(res, ms * factor));
}

mocha.timeout(2000 * factor);

it(`changes locales on attribute change`, async () => {
  const editor = document.createElement('open-scd') as OpenSCD;
  document.body.prepend(editor);

  editor.setAttribute('locale', 'invalid');

  await timeout(80);
  await editor.updateComplete;
  expect(editor).to.have.property('locale', 'en');

  editor.setAttribute('locale', 'de');

  await timeout(120);
  await editor.updateComplete;
  expect(editor).to.have.property('locale', 'de');

  editor.remove();
});

allLocales.forEach(lang =>
  describe(`translated to ${lang}`, () => {
    let editor: OpenSCD;
    beforeEach(() => {
      editor = document.createElement('open-scd') as OpenSCD;
      document.body.prepend(editor);
      editor.setAttribute('locale', lang);
    });

    afterEach(() => {
      editor.remove();
    });

    it(`displays a top app bar`, async () => {
      await editor.updateComplete;
      await timeout(20);
      await visualDiff(editor, `app-bar-${lang}`);
    });

    it(`displays a menu on button click`, async () => {
      await editor.updateComplete;
      editor.shadowRoot
        ?.querySelector<IconButton>('mwc-icon-button[icon="menu"]')
        ?.click();

      await editor.updateComplete;
      await timeout(200);
      await visualDiff(editor, `menu-drawer-${lang}`);
    });

    it(`displays a current document title`, async () => {
      const doc = new DOMParser().parseFromString(
        `<testdoc></testdoc>`,
        'application/xml'
      );

      await editor.updateComplete;

      editor.dispatchEvent(newOpenEvent(doc, 'test.xml'));
      await editor.updateComplete;
      await timeout(20);
      await visualDiff(editor, `document-name-${lang}`);
    });

    it(`shows a log screen`, async () => {
      await editor.updateComplete;
      editor.shadowRoot
        ?.querySelector<IconButton>('mwc-icon-button[icon="menu"]')
        ?.click();
      editor.shadowRoot
        ?.querySelector<ListItem>('mwc-list-item:last-child')
        ?.click();

      await editor.updateComplete;
      await timeout(200);
      await visualDiff(editor, `log-screen-${lang}`);
    });

    it(`shows log entries`, async () => {
      const doc = new DOMParser().parseFromString(
        `<testdoc desc="testattr"><testchild /></testdoc>`,
        'application/xml'
      );

      const parent = doc.documentElement;
      const node = doc.createElement('test');
      const reference = doc.querySelector('testchild');
      editor.dispatchEvent(newEditEvent({ parent, node, reference }));
      editor.dispatchEvent(newEditEvent({ parent, node, reference: null }));

      const element = doc.querySelector('testdoc')!;
      editor.dispatchEvent(
        newEditEvent({
          element,
          attributes: {
            name: 'A2',
            desc: null,
            'myns:attr': {
              value: 'namespaced value',
              namespaceURI: 'http://example.org/myns',
            },
          },
        })
      );

      editor.dispatchEvent(newEditEvent({ node }));
      editor.dispatchEvent(
        newEditEvent([
          { parent, node, reference },
          { parent, node, reference: null },
          'invalid edit' as unknown as Edit,
        ])
      );

      await editor.updateComplete;
      editor.shadowRoot
        ?.querySelector<IconButton>('mwc-icon-button[icon="history"]')
        ?.click();

      await editor.updateComplete;
      await timeout(200);
      await visualDiff(editor, `log-entries-${lang}`);

      editor.shadowRoot
        ?.querySelector<IconButton>('mwc-icon-button[icon="undo"]')
        ?.click();
      await editor.updateComplete;
      editor.shadowRoot
        ?.querySelector<IconButton>('mwc-icon-button[icon="undo"]')
        ?.click();
      await editor.updateComplete;
      editor.shadowRoot
        ?.querySelector<IconButton>('mwc-icon-button[icon="undo"]')
        ?.click();
      await editor.updateComplete;
      editor.shadowRoot
        ?.querySelector<IconButton>('mwc-icon-button[icon="undo"]')
        ?.click();
      await editor.updateComplete;
      editor.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'z',
          ctrlKey: true,
          bubbles: true,
          composed: true,
        })
      );
      editor.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'y',
          ctrlKey: false,
          bubbles: true,
          composed: true,
        })
      );
      editor.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'X',
          ctrlKey: true,
          bubbles: true,
          composed: true,
        })
      );
      await editor.updateComplete;

      await timeout(20);
      await visualDiff(editor, `log-entries-undone-${lang}`);

      editor.shadowRoot
        ?.querySelector<IconButton>('mwc-icon-button[icon="redo"]')
        ?.click();
      await editor.updateComplete;
      editor.shadowRoot
        ?.querySelector<IconButton>('mwc-icon-button[icon="redo"]')
        ?.click();
      await editor.updateComplete;

      await timeout(20);
      await visualDiff(editor, `log-entries-redone-${lang}`);
    });
  })
);
