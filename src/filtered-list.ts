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

  @query('mwc-textfield') searchField!: TextField;

  onFilterInput(): void {
    this.items.forEach(item => {
      const value: string =
        item.innerText +
        '\n' +
        Array.from(item.children)
          .map(child => child.innerHTML)
          .join('\n');

      if (!value) return;

      const terms: string[] = this.searchField.value.split(' ');
      terms
        .map(term => value.toUpperCase().includes(term.toUpperCase()))
        .some(item => item === false)
        ? item.setAttribute('style', 'display:none;')
        : item.removeAttribute('style');
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
      width: 100%;
      --mdc-shape-small: 28px;
    }
  `;
}
