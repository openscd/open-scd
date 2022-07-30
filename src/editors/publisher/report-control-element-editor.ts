import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { translate } from 'lit-translate';

import '../../wizard-textfield.js';
import '../../wizard-checkbox.js';

import { identity } from '../../foundation.js';
import { maxLength, patterns } from '../../wizards/foundation/limits.js';

@customElement('report-control-element-editor')
export class ReportControlElementEditor extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property({ attribute: false })
  element!: Element;
  @property({ type: Boolean, reflect: true })
  filtered = true;

  private renderOptFieldsContent(): TemplateResult {
    const [
      seqNum,
      timeStamp,
      dataSet,
      reasonCode,
      dataRef,
      entryID,
      configRef,
      bufOvfl,
    ] = [
      'seqNum',
      'timeStamp',
      'dataSet',
      'reasonCode',
      'dataRef',
      'entryID',
      'configRef',
      'bufOvfl',
    ].map(
      attr =>
        this.element.querySelector('OptFields')?.getAttribute(attr) ?? null
    );

    return html`<h3>Optional Fields</h3>
      ${Object.entries({
        seqNum,
        timeStamp,
        dataSet,
        reasonCode,
        dataRef,
        entryID,
        configRef,
        bufOvfl,
      }).map(
        ([key, value]) =>
          html`<wizard-checkbox
            label="${key}"
            .maybeValue=${value}
            nullable
            helper="${translate(`scl.${key}`)}"
          ></wizard-checkbox>`
      )}`;
  }

  private renderTrgOpsContent(): TemplateResult {
    const [dchg, qchg, dupd, period, gi] = [
      'dchg',
      'qchg',
      'dupd',
      'period',
      'gi',
    ].map(
      attr => this.element.querySelector('TrgOps')?.getAttribute(attr) ?? null
    );

    return html` <h3>Trigger Options</h3>
      ${Object.entries({ dchg, qchg, dupd, period, gi }).map(
        ([key, value]) =>
          html`<wizard-checkbox
            label="${key}"
            .maybeValue=${value}
            nullable
            helper="${translate(`scl.${key}`)}"
          ></wizard-checkbox>`
      )}`;
  }

  private renderChildElements(): TemplateResult {
    if (this.filtered) return html``;

    return html`<div class="content">
      ${this.renderTrgOpsContent()}${this.renderOptFieldsContent()}
    </div>`;
  }

  private renderReportControlContent(): TemplateResult {
    if (this.filtered) return html``;

    const [name, desc, buffered, rptID, indexed, bufTime, intgPd] = [
      'name',
      'desc',
      'buffered',
      'rptID',
      'indexed',
      'bufTime',
      'intgPd',
    ].map(attr => this.element?.getAttribute(attr));
    const max =
      this.element.querySelector('RptEnabled')?.getAttribute('max') ?? null;

    return html`<div class="content">
      <wizard-textfield
        label="name"
        .maybeValue=${name}
        helper="${translate('scl.name')}"
        required
        validationMessage="${translate('textfield.required')}"
        pattern="${patterns.asciName}"
        maxLength="${maxLength.cbName}"
        dialogInitialFocus
      ></wizard-textfield
      ><wizard-textfield
        label="desc"
        .maybeValue=${desc}
        nullable
        helper="${translate('scl.desc')}"
      ></wizard-textfield
      ><wizard-checkbox
        label="buffered"
        .maybeValue=${buffered}
        helper="${translate('scl.buffered')}"
      ></wizard-checkbox
      ><wizard-textfield
        label="rptID"
        .maybeValue=${rptID}
        nullable
        required
        helper="${translate('report.rptID')}"
      ></wizard-textfield
      ><wizard-checkbox
        label="indexed"
        .maybeValue=${indexed}
        nullable
        helper="${translate('scl.indexed')}"
      ></wizard-checkbox
      ><wizard-textfield
        label="max Clients"
        .maybeValue=${max}
        helper="${translate('scl.maxReport')}"
        nullable
        type="number"
        suffix="#"
      ></wizard-textfield
      ><wizard-textfield
        label="bufTime"
        .maybeValue=${bufTime}
        helper="${translate('scl.bufTime')}"
        nullable
        required
        type="number"
        min="0"
        suffix="ms"
      ></wizard-textfield
      ><wizard-textfield
        label="intgPd"
        .maybeValue=${intgPd}
        helper="${translate('scl.intgPd')}"
        nullable
        required
        type="number"
        min="0"
        suffix="ms"
      ></wizard-textfield>
    </div>`;
  }

  render(): TemplateResult {
    if (this.element)
      return html`<h2 style="display: flex;">
          <div style="flex:auto">
            <div>ReportControl</div>
            <div class="headersubtitle">${identity(this.element)}</div>
          </div>
          <mwc-icon-button-toggle
            id="toggleButton"
            onIcon="keyboard_arrow_up"
            offIcon="keyboard_arrow_down"
            @click=${() => (this.filtered = !this.filtered)}
          ></mwc-icon-button-toggle>
        </h2>
        <div class="parentcontent">
          ${this.renderReportControlContent()}${this.renderChildElements()}
        </div>`;

    return html`<div class="content">
      <h2>${translate('publisher.nodataset')}</h2>
    </div>`;
  }

  static styles = css`
    .parentcontent {
      display: grid;
      grid-gap: 12px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(316px, auto));
    }

    .content > * {
      display: block;
      margin: 4px 8px 16px;
    }

    mwc-icon-button-toggle {
      position: relative;
    }

    h2,
    h3 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      margin: 4px 8px 16px;
      padding-left: 0.3em;
    }

    .headersubtitle {
      font-size: 16px;
      font-weight: 200;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    *[iconTrailing='search'] {
      --mdc-shape-small: 28px;
    }
  `;
}
