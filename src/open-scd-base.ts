import { html, property, internalProperty } from 'lit-element';
import { TemplateResult } from 'lit-html';

import '@material/mwc-button';
import '@material/mwc-circular-progress-four-color';
import '@material/mwc-dialog';
import '@material/mwc-drawer';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-snackbar';
import '@material/mwc-tab';
import '@material/mwc-tab-bar';
import '@material/mwc-top-app-bar-fixed';
import { DialogBase } from '@material/mwc-dialog/mwc-dialog-base';
import { DrawerBase } from '@material/mwc-drawer/mwc-drawer-base';
import { SnackbarBase } from '@material/mwc-snackbar/mwc-snackbar-base';

import { WaitingElement } from './WaitingElement.js';
import { validateSCL } from './validate.js';
import { plugin } from './plugin.js';

export class OpenSCDBase extends WaitingElement {
  plugins = {
    editors: [
      {
        label: 'Substation',
        id: 'substation',
        icon: 'border_outer',
        content: plugin(
          './substation-editor.js',
          html`<substation-editor></substation-editor>`
        ),
      },
      {
        label: 'Test',
        id: 'test',
        icon: 'self_improvement',
        content: html`<p>Testing...</p>`,
      },
      {
        label: 'Visual Filler',
        id: 'filler',
        icon: 'science',
        content: html`<p>Filling space...</p>`,
      },
    ],
  };

  render(): TemplateResult {
    return html`
      <mwc-drawer hasheader type="modal">
        <span slot="title">Menu</span>
        <span slot="subtitle">${this.srcName}</span>
        <mwc-top-app-bar-fixed slot="appContent">
          <mwc-icon-button
            icon="menu"
            slot="navigationIcon"
            @click=${() => (this.menuUI.open = true)}
          ></mwc-icon-button>
          <div slot="title" id="title">
            ${this.srcName}
          </div>
          <mwc-icon-button
            icon="folder_open"
            slot="actionItems"
            @click="${() => this.fileUI.click()}"
          ></mwc-icon-button>
          <mwc-icon-button
            icon="toc"
            slot="actionItems"
            @click="${() => this.logUI.show()}"
          ></mwc-icon-button>
          <mwc-tab-bar
            @MDCTabBar:activated=${(e: CustomEvent) =>
              (this.activeEditor = e.detail.index)}
          >
            ${this.plugins.editors.map(
              editor =>
                html`<mwc-tab
                  label=${editor.label}
                  icon=${editor.icon}
                  id=${editor.id}
                ></mwc-tab>`
            )}
          </mwc-tab-bar>
          ${this.plugins.editors[this.activeEditor].content}
        </mwc-top-app-bar-fixed>
      </mwc-drawer>
      <mwc-circular-progress-four-color .closed=${!this.waiting} indeterminate>
      </mwc-circular-progress-four-color>
      <mwc-snackbar
        id="errorSnackbar"
        timeoutMs="-1"
        labelText="${this.history.find(le => le.icon == 'error_outline')
          ?.title ?? 'No errors'}"
      >
        <mwc-button slot="action" icon="toc" @click=${() => this.logUI.show()}
          >Show</mwc-button
        >
        <mwc-icon-button icon="close" slot="dismiss"></mwc-icon-button>
      </mwc-snackbar>
      <mwc-dialog id="log" heading="Log">
        <mwc-list id="content" activatable>
          ${this.history.length < 1
            ? html`<mwc-list-item disabled hasmeta>
                <span
                  >Errors, warnings, and notifications will show up here.</span
                >
                <mwc-icon slot="meta">info</mwc-icon>
              </mwc-list-item>`
            : this.history.map(
                item => html`<mwc-list-item
                  ?twoline=${item.message}
                  ?hasmeta=${item.icon}
                >
                  <span>
                    <!-- FIXME: replace tt by mwc-chip asap -->
                    <tt>${item.time.toLocaleTimeString()}</tt>
                    ${item.title}</span
                  >
                  <span slot="secondary">${item.message}</span>
                  <mwc-icon slot="meta">${item.icon}</mwc-icon>
                </mwc-list-item>`
              )}
        </mwc-list>
        <mwc-button slot="primaryAction" dialogaction="close">Close</mwc-button>
      </mwc-dialog>
      <input id="file-input" type="file" @change="${this.loadFile}" />
    `;
  }

  static emptySCD = document.implementation.createDocument(
    'http://www.iec.ch/61850/2003/SCL',
    'SCL',
    null
  );

  @property({ type: Number })
  activeEditor = 0;
  /** The `XMLDocument` representation of the current file. */
  @internalProperty() // does not generate an attribute binding
  doc: XMLDocument = OpenSCDBase.emptySCD;
  /** The name of the current file. */
  @property({ type: String }) srcName = 'untitled.scd';
  private currentSrc = '';
  /** The current file's URL. `blob:` URLs are *revoked after parsing*! */
  @property({ type: String })
  get src(): string {
    return this.currentSrc;
  }
  set src(value: string) {
    this.currentSrc = value;
    this.dispatchEvent(
      new CustomEvent<Promise<string>>('pending-state', {
        composed: true,
        bubbles: true,
        detail: this.loadDoc(value),
      })
    );
  }

  get menuUI(): DrawerBase {
    return this.shadowRoot!.querySelector('mwc-drawer')!;
  }
  get logUI(): DialogBase {
    return this.shadowRoot!.querySelector('mwc-dialog')!;
  }
  get messageUI(): SnackbarBase {
    return this.shadowRoot!.querySelector('mwc-snackbar')!;
  }
  get fileUI(): HTMLInputElement {
    return <HTMLInputElement>this.shadowRoot!.querySelector('#file-input')!;
  }

  error(title: string, ...detail: string[]): void {
    super.error(title, ...detail);
    this.messageUI.show();
  }

  private loadDoc(src: string): Promise<string> {
    return new Promise<string>(
      (resolve: (msg: string) => void, reject: (msg: string) => void) => {
        this.info(`Loading project ${this.srcName}.`);
        const reader: FileReader = new FileReader();
        reader.addEventListener('load', () => {
          this.doc = reader.result
            ? new DOMParser().parseFromString(
                <string>reader.result,
                'application/xml'
              )
            : OpenSCDBase.emptySCD;
          // free blob memory after parsing
          if (src.startsWith('blob:')) URL.revokeObjectURL(src);
          this.info(`${this.srcName} loaded.`);
          validateSCL(this.doc, this.srcName).then(errors => {
            errors
              ?.map(e => e.split(': ').map(s => s.trim()))
              .map(a => {
                if (a[4]) [a[0], a[4]] = [a[4], a[0]];
                this.error(a[0], ...a.slice(1).reverse());
              }) ?? this.info(`${this.srcName} validated successfully.`);
            if (errors === null)
              resolve(`${this.srcName} validation succesful.`);
            else reject(`${this.srcName} validation failed.`);
          });
        });
        reader.addEventListener('error', () =>
          reject(`${this.srcName} read error.`)
        );
        reader.addEventListener('abort', () =>
          reject(`${this.srcName} read aborted.`)
        );
        fetch(src ?? '').then(res =>
          res.blob().then(b => reader.readAsText(b))
        );
      }
    );
  }

  /** Loads the file selected by input `event.target.files[0]`. */
  private loadFile(event: Event): void {
    const file =
      (<HTMLInputElement | null>event.target)?.files?.item(0) ?? false;
    if (file) {
      this.srcName = file.name;
      this.setAttribute('src', URL.createObjectURL(file));
    }
  }
}
