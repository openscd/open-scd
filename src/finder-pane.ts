import {
  css,
  customElement,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';
import { until } from 'lit-html/directives/until';
import { get, translate } from 'lit-translate';

import { List } from '@material/mwc-list';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';
import { ListItem } from '@material/mwc-list/mwc-list-item';

export interface Directory {
  content: TemplateResult;
  children: string[];
}

const waitingList = html`<mwc-list
  ><mwc-list-item noninteractive hasMeta
    >${translate('loading')}<mwc-icon slot="meta"
      >pending</mwc-icon
    ></mwc-list-item
  ></mwc-list
>`;

@customElement('finder-pane')
export class FinderPane extends LitElement {
  @property({ type: Array })
  path: string[] = [];

  @property({ attribute: false })
  getChildren: (path: string[]) => Promise<Directory> = async () => {
    return { content: html``, children: [] };
  };

  @property({ type: String })
  searchFieldLabel: string = get('filter');

  @property({ type: Boolean })
  multi = false;

  @property({ attribute: false })
  loaded: Promise<void> = Promise.resolve();

  @query('div')
  container!: Element;

  async select(event: SingleSelectedEvent, index: number): Promise<void> {
    this.path.splice(index + 1);
    const item = <ListItem>(<List>event.target).selected;
    if (!item.selected) {
      return;
    }
    this.path.push(item.text);
    this.requestUpdate();
    await this.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 250));
    this.container.scrollLeft = 1000 * this.path.length;
  }

  async renderDirectory(
    parent: string,
    index: number
  ): Promise<TemplateResult> {
    const progeny = await this.getChildren(this.path.slice(0, index + 1));
    const children = progeny.children.map(
      child =>
        html`<mwc-list-item ?activated=${this.path[index + 1] === child}
          >${child}</mwc-list-item
        >`
    );
    if (this.path.length > index + 1) {
      return html`<section>
        ${progeny.content}
        <mwc-list @selected=${(e: SingleSelectedEvent) => this.select(e, index)}
          >${children}</mwc-list
        >
      </section>`;
    } else {
      return html`<section>
        ${progeny.content}
        ${children.length
          ? html`<filtered-list
              @selected=${(e: SingleSelectedEvent) => this.select(e, index)}
              searchFieldLabel="${parent || '/'}"
              >${children}</filtered-list
            >`
          : html``}
      </section>`;
    }
  }

  render(): TemplateResult {
    const lists = this.path.map((parent, index) =>
      this.renderDirectory(parent, index)
    );
    this.loaded = Promise.allSettled(lists).then();
    return html`<div>${lists.map(list => until(list, waitingList))}</div>`;
  }

  static styles = css`
    div {
      display: flex;
      flex-direction: row;
      overflow: auto;
    }

    h2 {
      color: var(--mdc-theme-primary);
    }

    section {
      display: flex;
      flex-direction: column;
      width: max-content;
    }

    section > mwc-list {
      margin-top: 76px;
    }
  `;
}
