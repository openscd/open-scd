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
      const text: string = (
        item.innerText +
        '\n' +
        Array.from(item.children)
          .map(child => (<HTMLElement>child).innerText)
          .join('\n')
      ).toUpperCase();
      const terms: string[] = this.searchField.value.toUpperCase().split(' ');

      terms.some(term => !text.includes(term))
        ? item.classList.add('hidden')
        : item.classList.remove('hidden');
    });
  }

  render(): TemplateResult {
    return html`<div id="tfcontainer">
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
    ${List.styles}

    #tfcontainer {
      display: flex;
      flex: auto;
    }

    ::slotted(.hidden) {
      display: none;
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
