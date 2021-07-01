import { html, LitElement } from 'lit-element';

import { newWizardEvent, Wizard } from '../foundation.js';
import { openSCDIcon } from '../icons.js';

import additionInfo from '../../package.json';

export function aboutBoxWizard(): Wizard {
  return [
    {
      title: 'Help',
      content: [
        html`<div>
            <div style="display:flex">
              <mwc-icon slot="graphic" style="--mdc-icon-size:25px"
                >${openSCDIcon}</mwc-icon
              >
              <div style="padding:10px">
                <h2 style="margin-bottom:2px">OpenSCD</h2>
                V${additionInfo.version}
              </div>
            </div>
          </div>
          <div>
            <h4>Licences</h4>
            <p style="padding-bottom:5px">
              The IEC&thinsp;61850 XSD and NSD code components used are
              distributed under their
              <a href="/CC-EULA.pdf">end user licence agreement</a>. <br />This
              project is licensed under the
              <a href="/LICENSE.md">Apache&thinsp;2.0</a>.
            </p>
            <h4>Help</h4>
            <p>
              <a href="https://github.com/openscd/open-scd/wiki/"
                >OpenSCD wiki</a
              >
            </p>
            <p>&copy; 2020-2021 OMICRON electronics GmbH</p>
          </div>`,
      ],
    },
  ];
}

export default class HelpPlugin extends LitElement {
  async run(): Promise<void> {
    this.dispatchEvent(newWizardEvent(aboutBoxWizard()));
  }
}
