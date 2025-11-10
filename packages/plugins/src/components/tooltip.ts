import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

/** A tooltip element that follows the mouse cursor and displays a text box. */
@customElement('oscd-tooltip-4c6027dd')
export class OscdTooltip extends LitElement {
  @property({ type: String })
  text = '';

  @property({ type: Boolean, reflect: true })
  visible = false;

  @property({ type: Number })
  x = 0;

  @property({ type: Number })
  y = 0;

  @property({ type: Number })
  offset = 12;

  private pendingFrame = 0;

  show(text: string, clientX: number, clientY: number): void {
    this.text = text;
    this.visible = true;
    this.updatePosition(clientX, clientY);
  }

  hide(): void {
    this.visible = false;
    this.text = '';
    if (this.pendingFrame) {
      cancelAnimationFrame(this.pendingFrame);
      this.pendingFrame = 0;
    }
  }

  updatePosition(clientX: number, clientY: number): void {
    this.x = clientX + this.offset;
    this.y = clientY + this.offset;

    if (this.pendingFrame) return;

    this.pendingFrame = requestAnimationFrame(() => {
      this.pendingFrame = 0;
      if (!this.visible) return;

      const tipRect = this.getBoundingClientRect();
      let x = this.x;
      let y = this.y;

      const innerW = window.innerWidth;
      const innerH = window.innerHeight;

      if (x + tipRect.width + this.offset > innerW) {
        x = this.x - this.offset - tipRect.width - this.offset;
      }
      if (x < this.offset) x = this.offset;

      if (y + tipRect.height + this.offset > innerH) {
        y = this.y - this.offset - tipRect.height - this.offset;
      }
      if (y < this.offset) y = this.offset;

      this.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(
        y
      )}px, 0)`;
    });
  }

  render(): TemplateResult {
    return html`<slot>${this.text}</slot>`;
  }

  static styles = css`
    :host {
      position: fixed;
      pointer-events: none;
      background: rgba(20, 20, 20, 0.95);
      color: rgba(240, 240, 240, 0.98);
      padding: 6px 8px;
      border-radius: 4px;
      font-size: 0.85em;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
      z-index: 6000;
      max-width: 60vw;
      border: 1px solid rgba(255, 255, 255, 0.04);
      left: 0;
      top: 0;
      transform: translate3d(0, 0, 0);
      will-change: transform;
      opacity: 1;
      transition: opacity 0.15s ease-in-out;
    }

    :host(:not([visible])) {
      opacity: 0;
      pointer-events: none;
    }

    :host([hidden]) {
      display: none;
    }
  `;
}
