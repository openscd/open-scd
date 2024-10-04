import { newEditEvent } from '@openscd/core';
import { css, html, LitElement, property, TemplateResult } from 'lit-element';


export default class EditTest extends LitElement {
    /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
    @property()
    doc!: XMLDocument;
    @property({ type: Number })
    editCount = -1;

    create(): void {
      console.log('Create');

      const substation = this.doc.querySelector('Substation');

      const element = this.doc.createElement('VoltageLevel');
      element.setAttribute('name', 'Test_1');

      const event = newEditEvent({
        parent: substation,
        node: element
      })
      this.dispatchEvent(event)
    }

    remove(): void {
      console.log('Remove');

      const testVL = this.doc.querySelector('VoltageLevel[name="Test_1"]');

      if (testVL) {
        const event = newEditEvent({
          node: testVL
        });
        this.dispatchEvent(event);
      }
    }

    edit(): void {
      const testVL = this.doc.querySelector('VoltageLevel[name="Test_1"]');

      if (testVL) {
        const event = newEditEvent({
          element: testVL,
          attributes: {
            test: 'new attribute created'
          }
        });
        this.dispatchEvent(event);
      }
    }

    multiedit(): void {
      const testVL = this.doc.querySelector('VoltageLevel[name="Test_1"]');

      if (testVL) {

        const event = newEditEvent([
            {
              element: testVL,
              attributes: {
                event1: 'new data 1'
              }
            },
            {
              element: testVL,
              attributes: {
                event2: 'new data 2'
              }
            }
        ]);
        this.dispatchEvent(event);
      }
    }
  
    render(): TemplateResult {
      return html`
        <div class="edit">
          <h2>Edittest</h2>
          <div>
            <mwc-button label="Create" @click=${() => this.create()}></mwc-button>
            <mwc-button label="Remove" @click=${() => this.remove()}></mwc-button>
            <mwc-button label="Edit" @click=${() => this.edit()}></mwc-button>
            <mwc-button label="Multiedit" @click=${() => this.multiedit()}></mwc-button>
          </div>
        </div>
      `;
    }

    static styles = css`
    :host {
      width: 100vw;
    }

    .edit {
        padding: 48px;
    }
  }`;
}