import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { translate } from 'lit-translate';
import { GOOSEDataSetEvent } from '../../foundation.js';

interface IED {
  element: Element;
  partial?: boolean;
}

@customElement('subscriber-ied-list')
export class SubscriberIEDList extends LitElement {
  @property()
  doc!: XMLDocument;

  subscribedIeds: IED[] = [];

  availableIeds: IED[] = [];

  constructor() {
    super();
    this.onGOOSEDataSetEvent = this.onGOOSEDataSetEvent.bind(this);
    document.querySelector('open-scd')!.addEventListener('goose-dataset', this.onGOOSEDataSetEvent);
  }

  private async onGOOSEDataSetEvent(event: GOOSEDataSetEvent) {
    const dataSet = event.detail.dataset;

    this.clearIedLists();

    Array.from(this.doc.querySelectorAll(':root > IED')).forEach(ied => {
      const extRefs = Array.from(ied.querySelectorAll(`LN0[lnClass="LLN0"] > Inputs > ExtRef[iedName=${event.detail.iedName}]`));
      if (extRefs.length == 0) {
        this.availableIeds.push({element: ied});
        return;
      }

      let linkedExtRefCount = 0;

      dataSet.querySelectorAll('FCDA').forEach(fcda => {
        if (extRefs.filter(extRef =>
          extRef.parentElement!.querySelector(`
            ExtRef[ldInst="${fcda.getAttribute('ldInst')}"]
            [lnClass="${fcda.getAttribute('lnClass')}"]
            [lnInst="${fcda.getAttribute('lnInst')}"]
            [doName="${fcda.getAttribute('doName')}"]
            [daName="${fcda.getAttribute('daName')}"]
            [serviceType="GOOSE"]`) != null)) {
              linkedExtRefCount++;
            }
      })

      linkedExtRefCount == dataSet.childElementCount ?
        this.subscribedIeds.push({element: ied}) : this.availableIeds.push({element: ied, partial: true})
    })

    this.requestUpdate();
  }

  private clearIedLists() {
    this.subscribedIeds, this.availableIeds = [];
  }

  render(): TemplateResult {
    return html`
      <h1>${translate('subscription.subscriberIed.title')}</h1>
      <mwc-list>
        <mwc-list-item noninteractive>
          <span>${translate('subscription.subscriberIed.subscribed')}</span>
        </mwc-list-item>
        <li divider role="separator"></li>
        ${this.subscribedIeds.map(ied => html`
          <mwc-list-item graphic="avatar">
            <span>${ied.element.getAttribute('name')}</span>
            <mwc-icon slot="graphic">clear</mwc-icon>
          </mwc-list-item>
        `)}
      </mwc-list>
      <mwc-list>
        <mwc-list-item noninteractive>
          <span>${translate('subscription.subscriberIed.availableToSubscribe')}</span>
        </mwc-list-item>
        <li divider role="separator"></li>
        ${this.availableIeds.map(ied => html`
          <mwc-list-item graphic="avatar" hasMeta>
            <span>${ied.element.getAttribute('name')}</span>
            <mwc-icon slot="graphic">add</mwc-icon>
            ${ied.partial
              ? html`<mwc-icon title="${translate('subscription.subscriberIed.notFullySubscribed')}" slot="meta">info</mwc-icon>`
              : ''}
          </mwc-list-item>
        `)}
      </mwc-list>`;
  }

  static styles = css`
    h1 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0px;
      line-height: 48px;
      padding-left: 0.3em;
      transition: background-color 150ms linear;
    }
  `;
}
