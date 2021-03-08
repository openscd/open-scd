import { List } from '@material/mwc-list';
import { TextField } from '@material/mwc-textfield';
import {
  css,
  customElement,
  html,
  property,
  query,
  TemplateResult,
} from 'lit-element';

@customElement('filtered-list')
export class Filterlist extends List {
  @property()
  searchFieldLabel!: string;

  @query('mwc-textfield') textField!: TextField;

  onFilterInput(): void {
    this.items.forEach(item => {
      const value: string =
        item.innerText +
        '\n' +
        Array.from(item.children)
          .map(child => child.innerHTML)
          .join('\n');

      if (value)
        value.toUpperCase().includes(this.textField.value.toUpperCase())
          ? item.removeAttribute('style')
          : item.setAttribute('style', 'display:none;');
    });
  }

  render(): TemplateResult {
    return html`<mwc-textfield
        label="${this.searchFieldLabel ?? ''}"
        iconTrailing="search"
        outlined
        @input=${() => this.onFilterInput()}
      ></mwc-textfield
      >${super.render()}`;
  }

  static styles = css`
    mwc-textfield {
      margin: 10px;
      --mdc-shape-small: 28px;
    }
    .mdc-list {
      padding-left: 16px;
    }
  `;
}
