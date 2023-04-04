import {
  customElement,
  html,
  LitElement,
  property,
  query,
  state,
  TemplateResult,
} from 'lit-element';

import { Menu } from '@material/mwc-menu';

import '@material/mwc-menu';
import '@material/mwc-list';
import '@material/mwc-icon';
import '@material/mwc-icon-button';

import { IconButton } from '@material/mwc-icon-button';

import { Create, createElement, newActionEvent } from '../../foundation.js';

import '../../action-pane.js';
import '../../action-icon.js';

import {
  SIEMENS_SITIPE_IED_REF,
  SIEMENS_SITIPE_BAY_TEMPLATE,
} from './foundation.js';

import {
  BayTypical,
  getBayTypicalComponents,
  getImportedBTComponentData,
  getImportedBTComponents,
} from './sitipe-service.js';

/** [[`Sitipe`]] plugin subeditor for editing `Sitipe` configuration. */
@customElement('sitipe-bay')
export class SitipeBay extends LitElement {
  /** The document being edited as provided to editor by [[`Sitipe`]]. */
  @property({ attribute: false })
  doc!: XMLDocument;
  /** The edited `Element`, a common property of all Sitipe subeditors. */
  @property({ attribute: false })
  bay!: Element;

  @property()
  bayTypicals: BayTypical[] = [];

  @state()
  loading: boolean = false;

  @state()
  bayHeader(): string {
    const name = this.bay.getAttribute('name') ?? '';
    const desc = this.bay.getAttribute('desc');

    return `${name} ${desc ? `(${desc})` : ''}`;
  }

  @query('mwc-menu')
  menu?: Menu;

  @query('mwc-icon-button[icon="playlist_add"]')
  iconButton?: IconButton;

  updated(): void {
    if (this.menu && this.iconButton) {
      this.menu!.anchor = <HTMLElement>this.iconButton!;
    }
  }

  get bayTypicalTemplate(): string {
    return (
      this.bay.querySelector(`Private[type="${SIEMENS_SITIPE_BAY_TEMPLATE}"]`)
        ?.textContent ?? ''
    );
  }

  private renderIEDs(): TemplateResult {
    return html`
      <div>
        ${Array.from(
          this.bay.querySelectorAll(
            `Private[type="${SIEMENS_SITIPE_IED_REF}"]` ?? []
          )
        ).map(
          iedTemplate =>
            html`<action-icon
              .label=${iedTemplate.textContent
                ? `${iedTemplate.textContent} (${this.bayTypicalTemplate})`
                : ''}
              icon="developer_board"
            ></action-icon>`
        )}
      </div>
    `;
  }

  protected renderMenu(): TemplateResult {
    return html`<mwc-menu
      class="actions-menu"
      corner="BOTTOM_RIGHT"
      menuCorner="END"
    >
      ${this.bayTypicals.map(bayTypical => {
        return html`<mwc-list-item
          @click=${() => this.handleSelected(bayTypical)}
          .disabled=${this.isDisabled(bayTypical)}
          >${bayTypical.name}</mwc-list-item
        >`;
      })}
    </mwc-menu>`;
  }

  render(): TemplateResult {
    return html`<action-pane label="${this.bayHeader()}">
      <abbr slot="action" title="Add" style="position:relative;">
        <mwc-icon-button
          icon="playlist_add"
          @click="${() => {
            this.menu!.open = true;
          }}"
        ></mwc-icon-button>
        ${this.renderMenu()}
      </abbr>
      ${this.renderIEDs()}</action-pane
    >`;
  }

  private isDisabled(bayTypical: BayTypical): boolean {
    return bayTypical.name === this.bayTypicalTemplate;
  }

  private handleSelected(bayTypical: BayTypical) {
    const bayTypicalElement: Element = createElement(this.doc, 'Private', {
      type: SIEMENS_SITIPE_BAY_TEMPLATE,
    });

    bayTypicalElement.textContent = bayTypical.name;

    const action: Create = {
      new: {
        parent: this.bay,
        element: bayTypicalElement,
      },
    };

    this.dispatchEvent(newActionEvent(action));

    getBayTypicalComponents(bayTypical.accessId).then(btComponents => {
      btComponents.forEach(btComponent => {
        getImportedBTComponents(btComponent.accessId).then(
          importedBtComponents => {
            importedBtComponents.forEach(imported => {
              getImportedBTComponentData(imported.id).then(data => {
                console.log('data');
                console.log(data);
              });
            });
          }
        );
      });
    });
  }
}
