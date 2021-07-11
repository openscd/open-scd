import { html, LitElement } from 'lit-element';

import LightningFS from '@isomorphic-git/lightning-fs';
import { newWizardEvent, Wizard } from '../foundation.js';

import { Directory } from '../finder-pane.js';

export async function readPath(
  fs: LightningFS,
  path: string[]
): Promise<Directory> {
  const pwd = path.join('/') || '/';
  const stat = await fs.promises.stat(pwd);
  const content = html`<h2>${pwd}</h2>
    <pre>${JSON.stringify(stat, undefined, 2)}</pre>`;
  const children = stat.isDirectory() ? await fs.promises.readdir(pwd) : [];
  return { content, children };
}

async function finderWizard(fs: LightningFS, path = '/'): Promise<Wizard> {
  const breadcrumbs = path.split('/').filter(s => s);
  breadcrumbs.unshift('');

  return [
    {
      title: 'File System',
      content: [
        html`<finder-pane
          .path=${breadcrumbs}
          .getChildren=${async (path: string[]) => readPath(fs, path)}
        ></finder-pane>`,
      ],
    },
  ];
}

export default class FSPlugin extends LitElement {
  fs = new LightningFS('fs');

  async run(): Promise<void> {
    const wizard = await finderWizard(this.fs);
    document.querySelector('open-scd')!.dispatchEvent(newWizardEvent(wizard));
  }
}
