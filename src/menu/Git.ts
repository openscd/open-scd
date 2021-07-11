import { html, LitElement, TemplateResult } from 'lit-element';

import { get, translate } from 'lit-translate';
import {
  newLogEvent,
  newWizardEvent,
  Wizard,
  WizardActor,
} from '../foundation.js';

import http from 'isomorphic-git/http/web';
import git from 'isomorphic-git';
import LightningFS from '@isomorphic-git/lightning-fs';

function cloneAction(fs: LightningFS, path: string): WizardActor {
  return (inputs, wizard) => {
    git
      .clone({
        fs,
        http,
        dir: path + (inputs[0]?.value?.replace(/(^\w+:|^)\/\//, '') ?? ''),
        corsProxy: 'https://cors.isomorphic-git.org',
        url: inputs[0].value ?? '',
      })
      .then(() =>
        wizard.dispatchEvent(
          newLogEvent({
            kind: 'info',
            title: get('git.cloned', { url: inputs[0].value ?? '' }),
          })
        )
      );
    wizard.dispatchEvent(newWizardEvent());
    return [];
  };
}

async function gitWizard(fs: LightningFS, path = '/'): Promise<Wizard> {
  const breadcrumbs = path.split('/').filter(s => s);
  breadcrumbs.unshift('');

  return [
    {
      title: 'Git',
      primary: {
        action: cloneAction(fs, path),
        icon: 'download_for_offline',
        label: 'git.clone',
      },
      content: [
        html`<mwc-textfield label="${translate('git.url')}"></mwc-textfield>`,
      ],
    },
  ];
}

export default class GitPlugin extends LitElement {
  fs = new LightningFS('fs');

  async run(): Promise<void> {
    const wizard = await gitWizard(this.fs);
    document.querySelector('open-scd')!.dispatchEvent(newWizardEvent(wizard));
  }
}
