import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

@customElement('nsd-item')
export class AccessPointContainer extends LitElement {
  @property({ attribute: false })
  nsdDocument!: Document;

  @property()
  nsdId!: string;

  private onDeleteClick(): void {
    console.log('check');
  }

  render(): TemplateResult {
    return html`<mwc-list-item graphic="avatar" hasMeta>
      <span>${this.nsdId}</span>
      ${this.nsdDocument ? html`<mwc-icon slot="graphic" style="color:green;">done</mwc-icon>` :
        html`<mwc-icon slot="graphic" style="color:red;">close</mwc-icon>`}
      ${this.nsdDocument ? html`<mwc-icon slot="meta" @click=${() => this.onDeleteClick()}>delete</mwc-icon>` :
        html``}
    </mwc-list-item>`;
  }

  static styles = css``;
}
