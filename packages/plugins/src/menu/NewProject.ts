import { html, LitElement } from 'lit-element';
import { get } from 'lit-translate';

import '@material/mwc-list';
import '@material/mwc-list/mwc-radio-list-item';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import '@openscd/open-scd/src/wizard-textfield.js';
import {
  newWizardEvent,
  Wizard,
  WizardInputElement,
} from '@openscd/open-scd/src/foundation.js';
import { newOpenDocEvent } from '@openscd/core/foundation/deprecated/open-event.js';
import { EditorAction } from '@openscd/core/foundation/deprecated/editor.js';
import { newLogEvent } from '@openscd/core/foundation/deprecated/history.js';
import {
  newEmptySCD,
  SupportedVersion,
} from '@openscd/open-scd/src/schemas.js';

export default class NewProjectPlugin extends LitElement {

  private createNewProject(
    inputs: WizardInputElement[],
    wizard: Element
  ): EditorAction[] {

    let docName = inputs[0].value ?? ''

    const acceptedFileExtension = ['.ssd', '.scd','.fsd'];
    const isValidFileFormat = acceptedFileExtension.some((extension) => {
      return inputs[0].value?.endsWith(extension);
    })

    if(!isValidFileFormat) {
      docName = docName + '.scd';
    }

    const version = <SupportedVersion>(
      (<ListItemBase>wizard.shadowRoot!.querySelector('mwc-list')!.selected)
        .value
    );

    this.dispatchEvent(newLogEvent({ kind: 'reset' }));
    this.dispatchEvent(
      newOpenDocEvent(newEmptySCD(docName.slice(0, -4), version), docName)
    );

    return [{ actions: [], title: '', derived: true }];
  }
  private newProjectWizard(): Wizard {
    return [
      {
        title: get('menu.new'),
        primary: {
          icon: 'create_new_folder',
          label: get('create'),
          action: (inputs, wizard) => this.createNewProject(inputs, wizard),
        },
        content: [
          html`<wizard-textfield
              id="srcName"
              label="name"
              value="project.scd"
              required
              dialogInitialFocus
            ></wizard-textfield>
            <mwc-list activatable>
              <mwc-radio-list-item left value="2003"
                >Edition 1 (Schema 1.7)</mwc-radio-list-item
              >
              <mwc-radio-list-item left value="2007B"
                >Edition 2 (Schema 3.1)</mwc-radio-list-item
              >
              <mwc-radio-list-item left selected value="2007B4"
                >Edition 2.1 (2007B4)</mwc-radio-list-item
              >
            </mwc-list>`,
        ],
      },
    ];
  }

  async run(): Promise<void> {
    this.dispatchEvent(newWizardEvent(this.newProjectWizard()));
  }
}
