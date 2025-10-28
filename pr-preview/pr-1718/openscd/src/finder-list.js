var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorate = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
import {
  css,
  customElement,
  html,
  LitElement,
  property,
  query
} from "../../_snowpack/pkg/lit-element.js";
import {until} from "../../_snowpack/pkg/lit-html/directives/until.js";
import {get} from "../../_snowpack/pkg/lit-translate.js";
import "../../_snowpack/pkg/@material/mwc-icon.js";
import "../../_snowpack/pkg/@material/mwc-list.js";
import "../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js";
import "./filtered-list.js";
import {depth} from "./foundation.js";
import {ifDefined} from "../../_snowpack/pkg/lit-html/directives/if-defined.js";
const waitingList = html`<div class="column">
  <mwc-list
    ><mwc-list-item noninteractive hasMeta
      >${get("loading")}<mwc-icon slot="meta">pending</mwc-icon></mwc-list-item
    ></mwc-list
  >
</div>`;
export let FinderList = class extends LitElement {
  constructor() {
    super(...arguments);
    this.selection = {};
    this.multi = false;
    this.read = async (path) => {
      return {
        path,
        header: html`<h2>${"/" + path.join("/")}</h2>`,
        entries: []
      };
    };
    this.loaded = Promise.resolve();
  }
  get depth() {
    return depth(this.selection);
  }
  get paths() {
    return this.getPaths();
  }
  set paths(paths) {
    const selection = {};
    for (const path of paths) {
      let i = selection;
      for (const name of path) {
        if (!Object.prototype.hasOwnProperty.call(i, name))
          i[name] = {};
        i = i[name];
      }
    }
    this.selection = selection;
  }
  get path() {
    return this.paths[0] ?? [];
  }
  set path(path) {
    this.paths = [path];
  }
  getTitle(path) {
    return path.join("/");
  }
  getDisplayString(entry, path) {
    return entry;
  }
  getPaths(depth2) {
    let paths = Object.keys(this.selection).map((key) => [key]);
    let i = depth2 ?? this.depth - 1;
    while (i-- > 0) {
      paths = paths.flatMap((path) => {
        let dir = this.selection;
        for (const entry of path)
          dir = dir[entry];
        const newPaths = Object.keys(dir).map((entry) => path.concat(entry));
        return newPaths.length === 0 ? [path] : newPaths;
      });
    }
    return depth2 === void 0 ? paths : paths.filter((path) => path.length > depth2);
  }
  multiSelect(event, path, clicked) {
    let dir = this.selection;
    for (const entry of path)
      dir = dir[entry];
    if (dir && dir[clicked])
      delete dir[clicked];
    else
      dir[clicked] = {};
  }
  singleSelect(event, path, clicked) {
    if (this.path[path.length] === clicked)
      this.path = path;
    else
      this.path = path.concat(clicked);
  }
  async select(event, path) {
    const clicked = event.target.selected.value;
    if (this.multi)
      this.multiSelect(event, path, clicked);
    else
      this.singleSelect(event, path, clicked);
    this.requestUpdate();
    await this.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 250));
    this.container.scrollLeft = 1e3 * this.depth;
  }
  renderDirectory(path, entries) {
    return html`<filtered-list
      @selected=${(e) => this.select(e, path)}
      searchFieldLabel="${this.getTitle(path)}"
    >
      ${entries.map((entry) => html`<mwc-list-item
            value="${entry}"
            ?activated=${this.getPaths(path.length).map((p) => JSON.stringify(p)).includes(JSON.stringify(path.concat(entry)))}
            >${this.getDisplayString(entry, path)}</mwc-list-item
          >`)}
    </filtered-list>`;
  }
  async renderColumn(column) {
    const paths = this.getPaths(column);
    const dirs = paths.map((path) => this.read(path));
    const lists = [];
    for await (const {header, entries, path} of dirs) {
      if (header || entries.length > 0)
        lists.push(html`${ifDefined(header)} ${this.renderDirectory(path, entries)}`);
    }
    if (lists.length === 0)
      return html``;
    return html`<div class="column">${lists}</div>`;
  }
  render() {
    const columns = new Array(this.depth).fill(0).map((_, index) => this.renderColumn(index));
    this.loaded = Promise.allSettled(columns).then();
    return html`<div class="pane">
      ${columns.map((column) => until(column, waitingList))}
    </div>`;
  }
};
FinderList.styles = css`
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
__decorate([
  property({type: Object})
], FinderList.prototype, "selection", 2);
__decorate([
  property({type: Boolean})
], FinderList.prototype, "multi", 2);
__decorate([
  property({type: Number})
], FinderList.prototype, "depth", 1);
__decorate([
  property({type: Array})
], FinderList.prototype, "paths", 1);
__decorate([
  property({type: Array})
], FinderList.prototype, "path", 1);
__decorate([
  property({attribute: false})
], FinderList.prototype, "read", 2);
__decorate([
  property({attribute: false})
], FinderList.prototype, "loaded", 2);
__decorate([
  query("div")
], FinderList.prototype, "container", 2);
FinderList = __decorate([
  customElement("finder-list")
], FinderList);
