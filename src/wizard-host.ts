import { createRef, Ref, ref } from 'lit/directives/ref.js';
import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state, eventOptions } from 'lit/decorators.js';
import { html as staticHtml, unsafeStatic } from 'lit/static-html.js';
import { spread } from '@open-wc/lit-helpers';

import { Plugin, pluginTag } from './Plugging.js';

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
  private activeWizards: Plugin[] = [];

  @state()
  private activeWizardPropsList: WizardAllProps[] = [];

  private dialogRef: Ref<HTMLElement> = createRef();

  render(): TemplateResult {
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

    const hasWizardsToRender =
      this.activeWizards.length === 0 ||
      this.activeWizardPropsList.length === 0 ||
      this.activeWizards.length !== this.activeWizardPropsList.length

    if (!hasWizardsToRender) {
      return html``;
    }

    const renderedWizards = this.activeWizards.map((wizard, i) => {
      const stackLevel = this.activeWizards.length - i - 1;
      return WizardHost.renderWizard(
        wizard,
        this.activeWizardPropsList[i],
        stackLevel
      );
    })

    return html`
      <dialog
        open
        @click=${this.handleBackdropClick}
        @keypress=${() => {return;}}
        @oscd-wizard-finished=${this.handleWizardFinished}
      >
        ${renderedWizards}
      </dialog>
    `;
  }

  private static renderWizard(
    wizard?: Plugin,
    wizardProps?: WizardAllProps,
    stackLevel = 0
  ): TemplateResult {
    const isWizardRenderable = wizard && wizardProps
    if (!isWizardRenderable) {
      return html``;
    }

    const tagName = pluginTag(wizard.src);

    const props = {
      '.element': wizardProps.element,
      '.tagName': wizardProps.tagName,
      '.parent': wizardProps.parent,
    };

    const renderedWizard = staticHtml`
      <${unsafeStatic(tagName)} ${spread(props)}>
      </${unsafeStatic(tagName)}>
    `;

    return html`
      <oscd-card stackLevel=${stackLevel}>
        ${renderedWizard}
      </oscd-card>
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
    const tagName = e.detail.tagName as string;

    const availableWizards = this.wizards?.filter(w =>
      WizardHost.doesWizardSupportCreation(tagName, w)
    );

    const wizardsAvailable = availableWizards && availableWizards.length > 0

    if (!wizardsAvailable) {
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

    this.activeWizards.push(newActiveWizard);
    this.activeWizardPropsList.push(e.detail);
  }

  private handleWizardInspectionRequest(
    e: CustomEvent<WizardInspectionRequest>
  ) {
    const el = e.detail.element;

    const { tagName } = el;
    const availableWizards = this.wizards?.filter(w =>
      WizardHost.doesWizardSupportInspection(tagName, w)
    );

    const wizardsAvailable = availableWizards && availableWizards.length > 0
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

    this.activeWizards.push(newActiveWizard);
    this.activeWizardPropsList.push(e.detail);

  }

  private handleWizardFinished() {
    this.activeWizards.pop();
    this.activeWizardPropsList.pop();
    this.requestUpdate();
  }

  private static doesWizardSupportInspection(
    tagName: string,
    wizard: Plugin
  ): boolean {
    const wizardClass = WizardHost.extractWizardClass(wizard);
    if (!wizardClass) {
      console.warn({level: "warn", msg:"could not find wizard class of plugin", wizard})
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
        msg: 'wizard class not found, stoping',
        wizardTag,
        src: wizard.src,
      });
      return undefined;
    }

    if (!isWizardingClass(wizardClass)) {
      console.log({
        level: 'warn',
        msg: 'wizard is not a wizarding class, stoping',
        wizardClass,
        wizardTag,
        src: wizard.src,
      });
      return undefined;
    }

    return wizardClass;
  }

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
