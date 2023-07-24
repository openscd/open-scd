import { createRef, Ref, ref } from 'lit/directives/ref.js';
import { css, html, LitElement, TemplateResult, customElement, property, state, eventOptions } from 'lit-element';
import { html as staticHtml, unsafeStatic } from 'lit/static-html.js';
import { spread } from '@open-wc/lit-helpers';

import { Plugin, pluginTag, staticTagHtml } from './Plugging.js';

import '@material/mwc-dialog';
import './components/oscd-card.js'

type WizardClass = CustomElementConstructor & {
  canInspect: (tagName: string) => boolean;
  canCreate: (tagName: string) => boolean;
};

type WizardInspectionRequest = {
  element: Element;
};

type WizardCreationRequest = {
  parent: Element;
  tagName?: string;
};

type WizardAllProps = Partial<WizardInspectionRequest & WizardCreationRequest>;

function isWizardingClass(c?: CustomElementConstructor): c is WizardClass {
  if (!c) {
    return false;
  }
  return Boolean((c as WizardClass).canInspect && (c as WizardClass).canCreate);
}

const TAG_NAME = 'oscd-wizard-host';

@customElement(TAG_NAME)
export class WizardHost extends LitElement {
  @property({ type: Array })
  public wizards?: Plugin[] = [];

  @state()
  private activeWizard?: Plugin;

  @state()
  private activeWizardProps: WizardAllProps = {};

  @state()
  private activeWizards: Plugin[] = [];

  @state()
  private activeWizardPropsList: WizardAllProps[] = [];

  private dialogRef: Ref<HTMLElement> = createRef();

  render() {
    return html`
      <div class="content-container">
      <slot
        @oscd-wizard-creation-request=${this.handleWizardCreationRequest}
        @oscd-wizard-inspection-request=${this.handleWizardInspectionRequest}
      ></slot>
      </div>

      ${this.renderActiveWizards()}
    `;
  }

  private renderActiveWizards(): TemplateResult {
    if (
      this.activeWizards.length === 0 ||
      this.activeWizardPropsList.length === 0 ||
      this.activeWizards.length !== this.activeWizardPropsList.length
    ) {
      return html``;
    }

    return html`
      <dialog
        open
        @click=${this.handleBackdropClick}
        @keypress=${() => {return;}}
        @oscd-wizard-finished=${this.handleWizardFinished}
      >
        ${this.activeWizards.map((wizard, i) => {
          const stackLevel = this.activeWizards.length - i - 1;
          return WizardHost.renderActiveWizard2(
            wizard,
            this.activeWizardPropsList[i],
            stackLevel
          );
        })}
      </dialog>
    `;
  }

  private static renderActiveWizard2(
    wizard?: Plugin,
    wizardProps?: WizardAllProps,
    stackLevel = 0
  ): TemplateResult {
    if (!wizard || !wizardProps) {
      return html``;
    }

    const tagName = pluginTag(wizard.src);
    console.log({level:"dev", msg:"rendering active wizard", detail: {tagName, wizardProps}})

    const props = {
      '.element': wizardProps.element,
      '.tagName': wizardProps.tagName,
      '.parent': wizardProps.parent,
    };

    const tag = "x-component"
    const renderedWizard = staticHtml`< ${unsafeStatic(tag)} ></ ${unsafeStatic(tag)} >`

    // const renderedWizard = staticTagHtml`
    //   <${tagName}
    //     .element=${wizardProps.element},
    //     .tagName=${wizardProps.tagName},
    //     .parent=${wizardProps.parent},
    //   >
    //   </${tagName}>
    // `;

    return html`
      <oscd-card stackLevel=${stackLevel}>
        ${staticTagHtml`<${tag}></${tag}>`}
      </oscd-card>
      `;
  }

  private renderActiveWizard(
    wizard?: Plugin,
    wizardProps?: WizardAllProps
  ): TemplateResult {
    if (!wizard || !wizardProps) {
      return html``;
    }

    const tagName = pluginTag(wizard.src);

    const props = {
      '.element': wizardProps.element,
      '.tagName': wizardProps.tagName,
      '.parent': wizardProps.parent,
    };

    const renderedWizard = staticHtml`<${unsafeStatic(tagName)} ${spread(
      props
    )}></${unsafeStatic(tagName)}>`;

    // we use mwc-dialog to get the "card" visual,
    // because there is no component for it
    return html`
      <dialog
        open
        @click=${this.handleBackdropClick}
        @keypress=${() => {return;}}
        @oscd-wizard-finished=${this.handleWizardFinished}
      >
        <mwc-dialog
          ${ref(this.dialogRef)}
          open
          scrimClickAction=""
          hideActions
          class="no-bg"
        >
          <div>${renderedWizard}</div>
        </mwc-dialog>
      </dialog>
    `;
  }

  @eventOptions({ capture: true })
  private handleBackdropClick(e: PointerEvent) {
    const isTargetTheBackdrop = this.dialogRef.value === e.target;
    if (!isTargetTheBackdrop) {
      return;
    }

    this.handleWizardFinished();
  }

  private handleWizardCreationRequest(e: CustomEvent<WizardCreationRequest>) {
    console.log({level:"dev", msg:"handling wizard creation request", detail: e.detail})
    const tagName = e.detail.tagName as string;

    const availableWizards = this.wizards?.filter(w =>
      WizardHost.doesWizardSupportCreation(tagName, w)
    );

    if (availableWizards?.length === 0) {
      console.warn({
        level: 'warn',
        msg: 'no wizards available for creation, stopping',
        tagName,
      });
      return;
    }
    const newActiveWizard = availableWizards?.[availableWizards.length - 1];

    if (!newActiveWizard) {
      console.warn({
        level: 'warn',
        msg: 'could not retrieve last wizard, stopping',
        tagName,
      });
      return;
    }
    // might need to set them at the same time
    this.activeWizardProps = e.detail;
    this.activeWizard = newActiveWizard;

    this.activeWizards.push(newActiveWizard);
    this.activeWizardPropsList.push(e.detail);
  }

  private handleWizardInspectionRequest(
    e: CustomEvent<WizardInspectionRequest>
  ) {
    console.log({level:"dev", msg:"handling wizard inspection request", detail: e.detail})
    const el = e.detail.element;

    const { tagName } = el;
    const availableWizards = this.wizards?.filter(w =>
      WizardHost.doesWizardSupportInspection(tagName, w)
    );

    const wizardsAvailable = availableWizards?.length === 0
    if (!wizardsAvailable) {
      console.warn({
        level: 'warn',
        msg: 'no wizards available for inspection, stopping',
        tagName,
      });
      return;
    }

    const newActiveWizard = availableWizards?.[availableWizards.length - 1];

    if (!newActiveWizard) {
      console.warn({
        level: 'warn',
        msg: 'could not retrieve last wizard, stopping',
        tagName,
      });
      return;
    }

    // might need to set them at the same time
    this.activeWizardProps = e.detail;
    this.activeWizard = newActiveWizard;

    this.activeWizards.push(newActiveWizard);
    this.activeWizardPropsList.push(e.detail);

    console.log({level:"dev", msg: "active wizards", activeWizards: this.activeWizards, activeWizardPropsList: this.activeWizardPropsList})
  }

  private handleWizardFinished() {
    this.activeWizards.pop();
    this.activeWizardPropsList.pop();
    this.requestUpdate();
    // this.activeWizard = undefined;
  }

  private static doesWizardSupportInspection(
    tagName: string,
    wizard: Plugin
  ): boolean {
    const wizardClass = WizardHost.extractWizardClass(wizard);
    if (!wizardClass) {
      return false;
    }

    const supportsInspection = wizardClass?.canInspect!(tagName);

    return supportsInspection;
  }

  private static doesWizardSupportCreation(
    tagName: string,
    wizard: Plugin
  ): boolean {
    const wizardClass = WizardHost.extractWizardClass(wizard);
    if (!wizardClass) {
      return false;
    }

    const supportsCreation = wizardClass?.canCreate!(tagName);

    return supportsCreation;
  }

  private static extractWizardClass(wizard: Plugin): WizardClass | undefined {
    const wizardTag = pluginTag(wizard.src);
    const wizardClass = customElements.get(wizardTag);
    if (!wizardClass) {
      console.log({
        level: 'warn',
        msg: 'wizard not found',
        wizardTag,
        src: wizard.src,
      });
      return undefined;
    }

    if (!isWizardingClass(wizardClass)) {
      console.log({
        level: 'warn',
        msg: 'wizard is not a wizarding class',
        wizardClass,
        wizardTag,
        src: wizard.src,
      });
      return undefined;
    }

    return wizardClass;
  }

  // Declare reactive properties
  @property()
  public name?: string = 'World';

  static styles = css`
    :host {
      color: blue;
    }

    dialog {
      position: fixed;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      background: #0000004a;
      z-index: 1000;
      opacity: 1;
      backdrop-filter: blur(2px);
      outline: none;
      border: none;
    }

    .no-bg {
      --mdc-dialog-scrim-color: none;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [TAG_NAME]: WizardHost;
  }
}
