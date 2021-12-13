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
import { translate } from 'lit-translate';

import '@material/mwc-icon';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import { List } from '@material/mwc-list';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';
import { ListItem } from '@material/mwc-list/mwc-list-item';

import './filtered-list.js';
import { depth } from './foundation.js';
import { ifDefined } from 'lit-html/directives/if-defined';

export type Selection = { [name: string]: Selection };

export type Path = string[];
export interface Directory {
  path: Path;
  header?: TemplateResult;
  entries: string[];
}

const waitingList = html`<div class="column">
  <mwc-list
    ><mwc-list-item noninteractive hasMeta
      >${translate('loading')}<mwc-icon slot="meta"
        >pending</mwc-icon
      ></mwc-list-item
    ></mwc-list
  >
</div>`;

@customElement('finder-list')
export class FinderList extends LitElement {
  @property({ type: Object })
  selection: Selection = {};

  @property({ type: Boolean })
  multi = false;

  @property({ type: Number })
  get depth(): number {
    return depth(this.selection);
  }

  @property({ type: Array })
  get paths(): Path[] {
    return this.getPaths();
  }
  set paths(paths: Path[]) {
    const selection: Selection = {};
    for (const path of paths) {
      let i = selection;
      for (const name of path) {
        if (!Object.prototype.hasOwnProperty.call(i, name)) i[name] = {};
        i = i[name];
      }
    }
    this.selection = selection;
  }

  @property({ type: Array })
  get path(): Path {
    return this.paths[0] ?? [];
  }
  set path(path: Path) {
    this.paths = [path];
  }

  @property({ attribute: false })
  read: (path: Path) => Promise<Directory> = async path => {
    return {
      path,
      header: html`<h2>${'/' + path.join('/')}</h2>`,
      entries: [],
    };
  };

  @property({ attribute: false })
  loaded: Promise<void> = Promise.resolve();

  getTitle(path: string[]): string {
    return path.join('/');
  }

  getDisplayString(entry: string, path: string[]): string {
    return entry;
  }

  @query('div')
  container!: Element;

  private getPaths(depth?: number): Path[] {
    let paths: Path[] = Object.keys(this.selection).map(key => [key]);

    let i = depth ?? this.depth - 1;
    while (i-- > 0) {
      paths = paths.flatMap(path => {
        let dir = this.selection;
        for (const entry of path) dir = dir[entry]; // recursive descent
        const newPaths = Object.keys(dir).map(entry => path.concat(entry));
        return newPaths.length === 0 ? [path] : newPaths;
      });
    }

    return depth === undefined
      ? paths
      : paths.filter(path => path.length > depth);
  }

  multiSelect(event: SingleSelectedEvent, path: Path, clicked: string): void {
    let dir = this.selection;
    for (const entry of path) dir = dir[entry]; // recursive descent

    if (dir && dir[clicked]) delete dir[clicked];
    // deselect if selected
    else dir[clicked] = {}; // select otherwise
  }

  singleSelect(event: SingleSelectedEvent, path: Path, clicked: string): void {
    if (this.path[path.length] === clicked) this.path = path;
    // deselect if selected
    else this.path = path.concat(clicked); // select otherwise
  }

  async select(event: SingleSelectedEvent, path: Path): Promise<void> {
    const clicked = (<ListItem>(<List>event.target).selected).value;

    if (this.multi) this.multiSelect(event, path, clicked);
    else this.singleSelect(event, path, clicked);

    this.requestUpdate();
    await this.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 250));
    this.container.scrollLeft = 1000 * this.depth;
  }

  renderDirectory(path: Path, entries: string[]): TemplateResult {
    return html`<filtered-list
      @selected=${(e: SingleSelectedEvent) => this.select(e, path)}
      searchFieldLabel="${this.getTitle(path)}"
    >
      ${entries.map(
        entry =>
          html`<mwc-list-item
            value="${entry}"
            ?activated=${this.getPaths(path.length)
              .map(p => JSON.stringify(p))
              .includes(JSON.stringify(path.concat(entry)))}
            >${this.getDisplayString(entry, path)}</mwc-list-item
          >`
      )}
    </filtered-list>`;
  }

  async renderColumn(column: number): Promise<TemplateResult> {
    const paths = this.getPaths(column);

    const dirs = paths.map(path => this.read(path));
    const lists: TemplateResult[] = [];

    for await (const { header, entries, path } of dirs) {
      if (header || entries.length > 0)
        lists.push(
          html`${ifDefined(header)} ${this.renderDirectory(path, entries)}`
        );
    }

    if (lists.length === 0) return html``;
    return html`<div class="column">${lists}</div>`;
  }

  render(): TemplateResult {
    const columns = new Array(this.depth)
      .fill(0)
      .map((_, index) => this.renderColumn(index));
    this.loaded = Promise.allSettled(columns).then();
    return html`<div class="pane">
      ${columns.map(column => until(column, waitingList))}
    </div>`;
  }

  static styles = css`
    div.pane {
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

    a {
      font-weight: 600;
      font-variant: small-caps;
      text-transform: lowercase;
      text-decoration: none;
      color: var(--mdc-theme-primary);
    }

    a:link {
      color: var(--mdc-theme-error);
    }

    a:visited {
      color: var(--mdc-theme-secondary);
    }
  `;
}
