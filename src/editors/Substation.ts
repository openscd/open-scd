import {
  LitElement,
  html,
  TemplateResult,
  property,
  css,
  query,
} from 'lit-element';
import { translate, get } from 'lit-translate';

import '@material/mwc-fab';

import { newWizardEvent } from '../foundation.js';

import { selectors, styles } from './substation/foundation.js';

import './substation/substation-editor.js';
import { SubstationEditor } from './substation/substation-editor.js';
import { guessSubstation } from './substation/guess-wizard.js';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import { List } from '@material/mwc-list';
import { Dialog } from '@material/mwc-dialog';

/** An editor [[`plugin`]] for editing the `Substation` section. */
export default class SubstationPlugin extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;

  @query('#startDialog') startDialog!: Dialog;

  /** Opens a [[`WizardDialog`]] for creating a new `Substation` element. */
  openCreateSubstationWizard(): void {
    this.dispatchEvent(
      newWizardEvent(
        SubstationEditor.wizard({ parent: this.doc.documentElement })
      )
    );
  }

  private openGuessWizard(): void {
    this.dispatchEvent(newWizardEvent(guessSubstation(this.doc)));
  }

  private onClosing(ae: CustomEvent<{ action: string } | null>): void {
    if (ae.detail?.action === 'proceed') {
      const value: string = (<ListItemBase>(
        (<List>this.startDialog.querySelector('mwc-list')).selected
      )).value;

      if (value === 'new') {
        this.openCreateSubstationWizard();
      } else if (value === 'guess') {
        this.openGuessWizard();
      }
    }
  }

  renderDialog(): TemplateResult {
    return html`<mwc-dialog
      id="startDialog"
      heading="${translate('substation.name')}"
      @closing=${this.onClosing}
      ><form>
        <mwc-list activatable>
          <mwc-radio-list-item selected left value="new"
            >${translate('substation.startdialog.add')}
          </mwc-radio-list-item>
          <mwc-radio-list-item left value="guess">
            ${translate('substation.startdialog.guess')}
          </mwc-radio-list-item>
        </mwc-list>
      </form>
      <mwc-button
        slot="secondaryAction"
        style="--mdc-theme-primary: var(--mdc-theme-error)"
        outlined
        dialogAction="close"
      >
        ${translate('cancel')}
      </mwc-button>
      <mwc-button unelevated slot="primaryAction" dialogAction="proceed">
        ${translate('proceed')}
      </mwc-button>
    </mwc-dialog>`;
  }

  render(): TemplateResult {
    if (!this.doc?.querySelector(selectors.Substation))
      return html`<h1>
        <span style="color: var(--base1)"
          >${translate('substation.missing')}</span
        >
        ${this.renderDialog()}
        <mwc-fab
          extended
          icon="add"
          label="${get('substation.wizard.title.add')}"
          @click=${() => this.startDialog.show()}
        ></mwc-fab>
      </h1>`;
    return html`
      ${Array.from(this.doc.querySelectorAll(selectors.Substation) ?? []).map(
        substation =>
          html`<substation-editor .element=${substation}></substation-editor>`
      )}
    `;
  }

  static styles = css`
    ${styles}

    mwc-fab {
      position: fixed;
      bottom: 32px;
      right: 32px;
    }

    :host {
      width: 100vw;
    }
  `;
}
