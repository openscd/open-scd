import {
  LitElement,
  TemplateResult,
  customElement,
  html,
  property,
  css,
} from 'lit-element';
import { translate, get } from 'lit-translate';

import {
  CloseableElement,
  EditorAction,
  newWizardEvent,
  Wizard,
  WizardAction,
  WizardInput,
  newActionEvent,
  getValue,
  getMultiplier,
  restrictions,
} from '../../foundation.js';

import {
  selectors,
  styles,
  WizardOptions,
  isCreateOptions,
} from './foundation.js';

/** Initial attribute values suggested for `SubNetwork` creation */
const initial = {
  type: '8-MMS',
  bitrate: '100',
  multiplier: 'M',
};

function getBitRateAction(
  oldBitRate: Element | null,
  BitRate: string | null,
  multiplier: string | null,
  SubNetwork: Element
): EditorAction {
  if (oldBitRate === null)
    return {
      new: {
        parent: SubNetwork,
        element: new DOMParser().parseFromString(
          `<BitRate unit="b/s" ${
            multiplier === null ? '' : `multiplier="${multiplier}"`
          }>${BitRate === null ? '' : BitRate}</BitRate>`,
          'application/xml'
        ).documentElement,
        reference: SubNetwork.firstElementChild,
      },
    };

  if (BitRate === null)
    return {
      old: {
        parent: SubNetwork,
        element: oldBitRate,
        reference: oldBitRate.nextElementSibling,
      },
    };

  const newBitRate = <Element>oldBitRate.cloneNode(false);
  newBitRate.textContent = BitRate;
  if (multiplier === null) newBitRate.removeAttribute('multiplier');
  else newBitRate.setAttribute('multiplier', multiplier);
  return {
    old: { element: oldBitRate },
    new: { element: newBitRate },
  };
}

/** [[`Communication`]] subeditor for a `ConnectedAP` element. */
@customElement('connectedap-editor')
export class ConnectedAP extends LitElement {
  @property()
  element!: Element;

  @property()
  get iedName(): string {
    return this.element.getAttribute('iedName') ?? '';
  }
  @property()
  get apName(): string | null {
    return this.element.getAttribute('apName') ?? null;
  }
  @property()
  get redProt(): string | null {
    return this.element.getAttribute('redProt') ?? null;
  }

  /* openEditWizard(): void {
      this.dispatchEvent(
        newWizardEvent(SubNetworkEditor.wizard({ element: this.element }))
      );
    } */

  /* remove(): void {
      if (this.element)
        this.dispatchEvent(
          newActionEvent({
            old: {
              parent: this.element.parentElement!,
              element: this.element,
              reference: this.element.nextElementSibling,
            },
          })
        );
    } */

  /* renderSubNetworkSpecs(): TemplateResult {
      if (!this.type && !this.bitrate) return html``;
  
      return html`(${this.type}${this.type && this.bitrate
        ? html`&mdash;`
        : html``}${this.bitrate})`;
    } */

  render(): TemplateResult {
    return html`
      <div id="container" tabindex="0">
        <mwc-icon class="fancy">settings_input_hdmi</mwc-icon>
        <mwc-icon-button
          class="menu-item left"
          icon="account_tree"
        ></mwc-icon-button>
        <mwc-icon-button class="menu-item up" icon="edit"></mwc-icon-button>
        <mwc-icon-button
          class="menu-item right"
          icon="forward"
        ></mwc-icon-button>
        <mwc-icon-button class="menu-item down" icon="delete"></mwc-icon-button>
      </div>
      <h4>${this.apName}</h4>
    `;
  }

  /* static updateAction(element: Element): WizardAction {
      return (
        inputs: WizardInput[],
        wizard: CloseableElement
      ): EditorAction[] => {
        const name = inputs.find(i => i.label === 'name')!.value;
        const desc = getValue(inputs.find(i => i.label === 'desc')!);
        const type = getValue(inputs.find(i => i.label === 'type')!);
        const BitRate = getValue(inputs.find(i => i.label === 'BitRate')!);
        const multiplier = getMultiplier(
          inputs.find(i => i.label === 'BitRate')!
        );
  
        let SubNetworkAction: EditorAction | null;
        let BitRateAction: EditorAction | null;
  
        if (
          name === element.getAttribute('name') &&
          desc === element.getAttribute('desc') &&
          type === element.getAttribute('type')
        ) {
          SubNetworkAction = null;
        } else {
          const newElement = <Element>element.cloneNode(false);
          newElement.setAttribute('name', name);
          if (desc === null) newElement.removeAttribute('desc');
          else newElement.setAttribute('desc', desc);
          if (type === null) newElement.removeAttribute('type');
          else newElement.setAttribute('type', type);
          SubNetworkAction = { old: { element }, new: { element: newElement } };
        }
  
        if (
          BitRate ===
            (element.querySelector('SubNetwork > BitRate')?.textContent?.trim() ??
              null) &&
          multiplier ===
            (element
              .querySelector('SubNetwork > BitRate')
              ?.getAttribute('multiplier') ?? null)
        ) {
          BitRateAction = null;
        } else {
          BitRateAction = getBitRateAction(
            element.querySelector('SubNetwork > BitRate'),
            BitRate,
            multiplier,
            SubNetworkAction?.new.element ?? element
          );
        }
  
        if (SubNetworkAction || BitRateAction) wizard.close();
        const actions: EditorAction[] = [];
        if (SubNetworkAction) actions.push(SubNetworkAction);
        if (BitRateAction) actions.push(BitRateAction);
        return actions;
      };
    } */

  /* static createAction(parent: Element): WizardAction {
      return (
        inputs: WizardInput[],
        wizard: CloseableElement
      ): EditorAction[] => {
        const name = getValue(inputs.find(i => i.label === 'name')!);
        const desc = getValue(inputs.find(i => i.label === 'desc')!);
        const type = getValue(inputs.find(i => i.label === 'type')!);
        const BitRate = getValue(inputs.find(i => i.label === 'BitRate')!);
        const multiplier = getMultiplier(
          inputs.find(i => i.label === 'BitRate')!
        );
  
        const action = {
          new: {
            parent,
            element: new DOMParser().parseFromString(
              `<SubNetwork
                name="${name}"
                ${desc === null ? '' : `desc="${desc}"`}
                ${type === null ? '' : `type="${type}"`}
              >${
                BitRate === null
                  ? ''
                  : `<BitRate unit="b/s" ${
                      multiplier === null ? '' : `multiplier="${multiplier}"`
                    }
              >${BitRate}</BitRate>`
              }</SubNetwork>`,
              'application/xml'
            ).documentElement,
            reference: null,
          },
        };
  
        wizard.close();
        return [action];
      };
    } */

  /* static wizard(options: WizardOptions): Wizard {
      const [
        heading,
        actionName,
        actionIcon,
        action,
        name,
        desc,
        type,
        BitRate,
        multiplier,
      ] = isCreateOptions(options)
        ? [
            get('subnetwork.wizard.title.add'),
            get('add'),
            'add',
            SubNetworkEditor.createAction(options.parent),
            '',
            '',
            initial.type,
            initial.bitrate,
            initial.multiplier,
          ]
        : [
            get('subnetwork.wizard.title.edit'),
            get('save'),
            'edit',
            SubNetworkEditor.updateAction(options.element),
            options.element.getAttribute('name'),
            options.element.getAttribute('desc'),
            options.element.getAttribute('type'),
            options.element
              .querySelector('SubNetwork > BitRate')
              ?.textContent?.trim() ?? null,
            options.element
              .querySelector('SubNetwork > BitRate')
              ?.getAttribute('multiplier') ?? null,
          ];
  
      return [
        {
          title: heading,
          primary: {
            icon: actionIcon,
            label: actionName,
            action: action,
          },
          content: [
            html`<wizard-textfield
              label="name"
              .maybeValue=${name}
              helper="${translate('subnetwork.wizard.nameHelper')}"
              required
              validationMessage="${translate('textfield.required')}"
              dialogInitialFocus
            ></wizard-textfield>`,
            html`<wizard-textfield
              label="desc"
              .maybeValue=${desc}
              nullable="true"
              helper="${translate('subnetwork.wizard.descHelper')}"
            ></wizard-textfield>`,
            html`<wizard-textfield
              label="type"
              .maybeValue=${type}
              nullable="true"
              helper="${translate('subnetwork.wizard.typeHelper')}"
              pattern="${restrictions.normalizedString}"
            ></wizard-textfield>`,
            html`<wizard-textfield
              label="BitRate"
              .maybeValue=${BitRate}
              nullable
              unit="b/s"
              .multipliers=${[null, 'M']}
              .multiplier=${multiplier}
              helper="${translate('subnetwork.wizard.bitrateHelper')}"
              required
              validationMessage="${translate('textfield.nonempty')}"
              pattern="${restrictions.decimal}"
            ></wizard-textfield>`,
          ],
        },
      ];
    } */

  static styles = css`
    #container {
      color: var(--mdc-theme-on-surface);
      width: 64px;
      height: 64px;
      margin: auto;
      position: relative;
      transition: all 200ms linear;
    }

    #container:focus {
      outline: none;
    }

    .fancy {
      color: var(--mdc-theme-on-surface);
      --mdc-icon-size: 64px;
      transition: transform 150ms linear, box-shadow 200ms linear;
      outline-color: var(--mdc-theme-primary);
      outline-style: solid;
      outline-width: 0px;
    }

    #container:focus > .fancy {
      box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
        0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
    }

    #container:hover > .fancy {
      outline: 2px dashed var(--mdc-theme-primary);
      transition: transform 200ms linear, box-shadow 250ms linear;
    }

    #container:focus-within > .fancy {
      outline: 2px solid var(--mdc-theme-primary);
      background: var(--mdc-theme-on-primary);
      transform: scale(0.8);
      transition: transform 200ms linear, box-shadow 250ms linear;
    }

    .menu-item {
      color: var(--mdc-theme-on-surface);
      transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1),
        opacity 200ms linear;
      position: absolute;
      top: 8px;
      left: 8px;
      pointer-events: none;
      z-index: 1;
      opacity: 0;
    }

    #container:focus-within > .menu-item {
      transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1),
        opacity 250ms linear;
      pointer-events: auto;
      opacity: 1;
    }

    #container:focus-within > .menu-item.up {
      transform: translate(0px, -52px);
    }

    #container:focus-within > .menu-item.down {
      transform: translate(0px, 52px);
    }

    #container:focus-within > .menu-item.right {
      transform: translate(52px, 0px);
    }

    #container:focus-within > .menu-item.left {
      transform: translate(-52px, 0px);
    }

    h4 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0px;
      opacity: 1;
      transition: opacity 200ms linear;
      text-align: center;
    }

    :host(.moving) #container,
    :host(.moving) h4 {
      opacity: 0.3;
    }
  `;
}
