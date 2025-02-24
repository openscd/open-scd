import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

function getChildElementsByTagName(
  parent: Element,
  tagName: string
): Element[] {
  return Array.from(parent.children).filter(
    el => el.tagName === tagName.toUpperCase()
  );
}

@customElement('test-scl-substation-component')
export class TestSclSubstationComponent extends LitElement {

  @property({ attribute: false })
  doc!: XMLDocument;

  @property({ type: Number })
  editCount = -1;

  @state()
  get substations(): Element[] {
    if (!this.doc?.documentElement) return [];
    return getChildElementsByTagName(this.doc.documentElement, 'Substation');
  }

  @state()
  get lines(): Element[] {
    if (!this.doc?.documentElement) return [];
    return getChildElementsByTagName(this.doc.documentElement, 'Line');
  }

  @state()
  get processes(): Element[] {
    if (!this.doc?.documentElement) return [];
    return getChildElementsByTagName(this.doc.documentElement, 'Process');
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      padding: 8px 12px 16px;
      box-sizing: border-box;
      background-color: #fafafa;
      border: 1px solid #ccc;
    }

    h1 {
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      margin: 0;
      padding: 0.3em;
      line-height: 1.4;
    }

    section {
      display: grid;
      gap: 12px;
    }

    .substation,
    .line,
    .process {
      border: 1px solid #bbb;
      padding: 8px;
      background: #fff;
    }

    .substation h2,
    .line h2,
    .process h2 {
      margin: 0;
      font-size: 1.1rem;
      color: #333;
    }

    .substation .vl,
    .substation .bay {
      margin-left: 1em;
      padding-left: 0.5em;
      border-left: 2px solid #ddd;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    console.log('[my-scl-substation-subeditor] connectedCallback called!');

    if (!this.doc) {
      const parser = new DOMParser();
      this.doc = parser.parseFromString(
        `
        <SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007">
          <Substation name="MySubstation">
            <VoltageLevel name="VL1" desc="110kV level">
              <Bay name="Bay1" desc="Example Bay">
                <ConductingEquipment name="CE1" type="CBR" desc="Breaker" />
              </Bay>
            </VoltageLevel>
          </Substation>
        </SCL>
        `,
        'application/xml'
      );
      console.log('SCL doc =>', this.doc.documentElement.outerHTML);
    }
  }

  render(): TemplateResult {
    if (!this.doc) return html` <h1>No SCL file loaded</h1> `;

    if (
      !this.substations.length &&
      !this.lines.length &&
      !this.processes.length
    ) {
      return html` <h1>No Substation section in the project</h1> `;
    }

    return html`
      <h1>SCL Substation Editor Demo</h1>
      <section>
        ${this.substations.map(sub => this.renderSubstation(sub))}

        ${this.lines.map(
          line =>
            html`
              <div class="line">
                <h2>Line: ${line.getAttribute('name') ?? 'Unnamed'}</h2>
                <p>${line.getAttribute('desc') ?? ''}</p>
              </div>
            `
        )}

        ${this.processes.map(
          proc =>
            html`
              <div class="process">
                <h2>Process: ${proc.getAttribute('name') ?? 'Unnamed'}</h2>
                <p>${proc.getAttribute('desc') ?? ''}</p>
              </div>
            `
        )}
      </section>
    `;
  }

  /**
   * A helper method to render a single <Substation> element,
   * enumerating VoltageLevel, Bay, and ConductingEquipment.
   */
  private renderSubstation(sub: Element): TemplateResult {
    const name = sub.getAttribute('name') ?? 'Substation?';
    const desc = sub.getAttribute('desc') ?? '';

    // All <VoltageLevel> children
    const voltageLevels = getChildElementsByTagName(sub, 'VoltageLevel');

    return html`
      <div class="substation">
        <h2>Substation: ${name}</h2>
        <p>${desc}</p>
        <!-- Render each VoltageLevel -->
        ${voltageLevels.map(vl => {
          const vlName = vl.getAttribute('name') ?? 'VL?';
          const vlDesc = vl.getAttribute('desc') ?? '';
          // All <Bay> children
          const bays = getChildElementsByTagName(vl, 'Bay');
          return html`
            <div class="vl">
              <strong>VoltageLevel: ${vlName}</strong>
              ${vlDesc ? html`<em> (${vlDesc})</em>` : ''}
              <!-- Render each Bay -->
              ${bays.map(bay => {
                const bayName = bay.getAttribute('name') ?? 'Bay?';
                const bayDesc = bay.getAttribute('desc') ?? '';
                // All ConductingEquipment
                const eqs = getChildElementsByTagName(
                  bay,
                  'ConductingEquipment'
                );
                return html`
                  <div class="bay">
                    <strong>Bay: ${bayName}</strong>
                    ${bayDesc ? html`<em> (${bayDesc})</em>` : ''}
                    <ul>
                      ${eqs.map(eq => {
                        const eqName = eq.getAttribute('name') ?? 'CE?';
                        const eqType = eq.getAttribute('type') ?? '???';
                        const eqDesc = eq.getAttribute('desc') ?? '';
                        return html`
                          <li>
                            CE: <strong>${eqName}</strong>
                            [type=${eqType}] ${eqDesc ? html` - ${eqDesc}` : ''}
                          </li>
                        `;
                      })}
                    </ul>
                  </div>
                `;
              })}
            </div>
          `;
        })}
      </div>
    `;
  }
}
