import { html, LitElement } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

import marked from 'marked';

import { newWizardEvent, Wizard } from '../foundation.js';
import { openSCDIcon } from '../icons.js';

import { Directory } from '../finder-pane.js';

function aboutBox(version: string) {
  return html`<div>
      <div style="display:flex">
        <mwc-icon slot="graphic" style="--mdc-icon-size:25px"
          >${openSCDIcon}</mwc-icon
        >
        <div style="padding:10px">
          <h2 style="margin-bottom:2px">OpenSCD</h2>
          V${version}
        </div>
      </div>
    </div>
    <div>
      <h3>Licences</h3>
      <p style="padding-bottom:5px">
        The IEC&thinsp;61850 XSD and NSD code components used are distributed
        under their
        <a href="/CC-EULA.pdf">end user licence agreement</a>. <br />This
        project's source code is licensed under the
        <a href="/LICENSE.md">Apache&thinsp;2.0 license</a> and available on
        <a href="https://github.com/openscd">GitHub</a>.
      </p>
      <p>&copy; 2020-2021 OMICRON electronics GmbH</p>
      <h3>Help</h3>
    </div>`;
}

async function getLinkedPages(path: string[]): Promise<Directory> {
  const edition = await (await fetch('/manifest.json')).json();
  if (path.length === 0) {
    return { content: aboutBox(edition.version), children: ['Home'] };
  }

  const page = path[path.length - 1].replace(/ /g, '-');
  const res = await fetch(`/public/md/${page}.md`);
  const md = await res.text();
  const unlinkedMd = md.replace(
    /\[([^\]]*)\]\(https:..github.com.openscd.open-scd.wiki.([^)]*)\)/g,
    `<a style="cursor: help;" onclick="Array.from(event.target.closest('section').lastElementChild.children).find(child => child.text === '$2'.replace(/-/g, ' ')).click()">$1</a>`
  );
  const content = html`<div style="padding: 8px;">
    ${page === 'Home' ? aboutBox(edition.version) : html``}
    ${unsafeHTML(marked(unlinkedMd))}
  </div>`;
  const children = Array.from(
    md.matchAll(/\(https:..github.com.openscd.open-scd.wiki.([^)]*)\)/g)
  ).map(([_, child]) => child.replace(/-/g, ' '));

  return { content, children };
}

export function aboutBoxWizard(): Wizard {
  return [
    {
      title: 'Help',
      content: [
        html`<finder-pane
          .path=${['Home']}
          .getChildren=${getLinkedPages}
        ></finder-pane>`,
      ],
    },
  ];
}

export default class HelpPlugin extends LitElement {
  async run(): Promise<void> {
    this.dispatchEvent(newWizardEvent(aboutBoxWizard()));
  }
}
