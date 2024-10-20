import {html, LitElement} from "../../../_snowpack/pkg/lit-element.js";
import {unsafeHTML} from "../../../_snowpack/pkg/lit-html/directives/unsafe-html.js";
import * as marked from "../../../_snowpack/pkg/marked.js";
import "../../../_snowpack/pkg/@material/mwc-icon.js";
import "../../../openscd/src/finder-list.js";
import {newWizardEvent} from "../../../openscd/src/foundation.js";
import {openSCDIcon} from "../../../openscd/src/icons/icons.js";
function aboutBox(version) {
  return html`<div>
      <div style="display:flex">
        <mwc-icon slot="graphic" style="--mdc-icon-size:25px"
          >${openSCDIcon}</mwc-icon
        >
        <div style="padding:10px">
          <h2 style="margin-bottom:2px">OpenSCD</h2>
          V${version}
        </div>
      </div>
    </div>
    <div>
      <h3>Licences</h3>
      <p style="padding-bottom:5px">
        The IEC&thinsp;61850 XSD and NSD code components used are distributed
        under their
        <a href="/CC-EULA.pdf">end user licence agreement</a>. <br />This
        project's source code is licensed under the
        <a href="/LICENSE.md">Apache&thinsp;2.0 license</a> and available on
        <a href="https://github.com/openscd">GitHub</a>.
      </p>
      <p>&copy; 2020-2021 OMICRON electronics GmbH</p>
      <h3>Help</h3>
    </div>`;
}
async function getLinkedPages(path) {
  const edition = await (await fetch("/manifest.json")).json();
  if (path.length === 0) {
    return {path, header: aboutBox(edition.version), entries: ["Home"]};
  }
  const page = path[path.length - 1].replace(/ /g, "-");
  const res = await fetch(`/public/md/${page}.md`);
  const md = await res.text();
  const unlinkedMd = md.replace(/\[([^\]]*)\]\(https:..github.com.openscd.open-scd.wiki.([^)]*)\)/g, `<a style="cursor: help;" onclick="Array.from(event.target.closest('section').lastElementChild.children).find(child => child.text === '$2'.replace(/-/g, ' ')).click()">$1</a>`);
  const header = html`<div style="padding: 8px;">
    ${page === "Home" ? aboutBox(edition.version) : html``}
    ${unsafeHTML(marked.parse(unlinkedMd))}
  </div>`;
  const entries = Array.from(md.matchAll(/\(https:..github.com.openscd.open-scd.wiki.([^)]*)\)/g)).map(([_, child]) => child.replace(/-/g, " "));
  return {path, header, entries};
}
export function aboutBoxWizard() {
  return [
    {
      title: "Help",
      content: [
        html`<finder-list
          .path=${["Home"]}
          .read=${getLinkedPages}
        ></finder-list>`
      ]
    }
  ];
}
export default class HelpPlugin extends LitElement {
  async run() {
    this.dispatchEvent(newWizardEvent(aboutBoxWizard()));
  }
}
