import { css, html, LitElement } from "lit";
export class OSCDPaper extends LitElement {
    render() {
        return html `
        <div class="paper">
          <slot></slot>
        </div>
      `;
    }
}
OSCDPaper.styles = css `
    .paper {
      box-shadow: var(--mdc-dialog-box-shadow, 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12));
      position: relative;
      box-shadow: rgba(0, 0, 0, 0.2) 0px 11px 15px -7px, rgba(0, 0, 0, 0.14) 0px 24px 38px 3px, rgba(0, 0, 0, 0.12) 0px 9px 46px 8px;
      display: flex;
      flex-direction: column;
      flex-grow: 0;
      flex-shrink: 0;
      box-sizing: border-box;
      max-width: 100%;
      max-height: 100%;
      pointer-events: auto;
      overflow-y: auto;
    }
  `;
//# sourceMappingURL=oscd-paper.js.map