import {html, LitElement} from "../../../_snowpack/pkg/lit-element.js";
import {get} from "../../../_snowpack/pkg/lit-translate.js";
import "../../../_snowpack/pkg/@material/mwc-list.js";
import "../../../_snowpack/pkg/@material/mwc-list/mwc-radio-list-item.js";
import "../../../openscd/src/wizard-textfield.js";
import {
  newWizardEvent
} from "../../../openscd/src/foundation.js";
import {newOpenDocEvent} from "../../../_snowpack/link/packages/core/dist/foundation/deprecated/open-event.js";
import {newLogEvent} from "../../../_snowpack/link/packages/core/dist/foundation/deprecated/history.js";
import {
  newEmptySCD
} from "../../../openscd/src/schemas.js";
export default class NewProjectPlugin extends LitElement {
  createNewProject(inputs, wizard) {
    const docName = inputs[0].value?.match(/\.s[sc]d$/i) ? inputs[0].value : inputs[0].value + ".scd";
    const version = wizard.shadowRoot.querySelector("mwc-list").selected.value;
    this.dispatchEvent(newLogEvent({kind: "reset"}));
    this.dispatchEvent(newOpenDocEvent(newEmptySCD(docName.slice(0, -4), version), docName));
    return [{actions: [], title: "", derived: true}];
  }
  newProjectWizard() {
    return [
      {
        title: get("menu.new"),
        primary: {
          icon: "create_new_folder",
          label: get("create"),
          action: (inputs, wizard) => this.createNewProject(inputs, wizard)
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
            </mwc-list>`
        ]
      }
    ];
  }
  async run() {
    this.dispatchEvent(newWizardEvent(this.newProjectWizard()));
  }
}
