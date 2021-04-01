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

  //HACK: tfContainer only for CSS width adjustment 100% does not work
  render(): TemplateResult {
    return html`<div id="tfContainer">
        <mwc-textfield
          label="${this.searchFieldLabel ?? ''}"
          iconTrailing="search"
          outlined
          @input=${() => this.onFilterInput()}
        ></mwc-textfield>
      </div>
      ${super.render()}`;
  }

  static styles = css`
    #tfContainer {
      display: flex;
      flex: auto;
    }

    mwc-textfield {
      margin: 10px;
      width: 100%;
      --mdc-shape-small: 28px;
    }
    .mdc-list {
      padding-inline-start: 0px;
    }
  `;
}
