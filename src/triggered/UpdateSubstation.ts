import { css, html, LitElement, query, TemplateResult } from 'lit-element';
import { get } from 'lit-translate';

import { newWizardEvent } from '../foundation.js';
import { Diff, mergeWizard } from '../wizards.js';

function lNSelector(lNode: Element): string {
  const [iedName, ldInst, prefix, lnClass, lnInst] = [
    'iedName',
    'ldInst',
    'prefix',
    'lnClass',
    'lnInst',
  ].map(name => lNode.getAttribute(name));

  // FIXME: give the correct LN selector string!
  return lNode.getAttribute('ldInst')
    ? `:root > IED[name="${lNode.getAttribute('iedName')}"] > AccessPoint > LN`
    : `:root > IED[name="${lNode.getAttribute(
        'iedName'
      )}"] > AccessPoint > Server > LDevice[inst="${lNode.getAttribute(
        'ldInst'
      )}"] > LN` +
        `,:root > IED[name="${lNode.getAttribute(
          'iedName'
        )}"] > AccessPoint > Server > LDevice[inst="${lNode.getAttribute(
          'ldInst'
        )}"] > LN0`;
}

export default class UpdateSubstationPlugin extends LitElement {
  doc!: XMLDocument;

  @query('#update-substation-plugin-input') pluginFileUI!: HTMLInputElement;

  updateSubstation(event: Event): void {
    const file =
      (<HTMLInputElement | null>event.target)?.files?.item(0) ?? false;
    if (file)
      file.text().then(text => {
        const doc = new DOMParser().parseFromString(text, 'application/xml');
        // FIXME: Dirty hack should not be necessary!
        document.querySelector('open-scd')!.dispatchEvent(
          newWizardEvent(
            mergeWizard(
              // FIXME: doesn't work with multiple Substations!
              this.doc.querySelector('Substation')!,
              doc.querySelector('Substation')!,
              {
                title: get('updatesubstation.title'),
                selected: (diff: Diff<Element | string>): boolean =>
                  diff.theirs instanceof Element
                    ? diff.theirs.tagName === 'LNode'
                      ? this.doc.querySelector(lNSelector(diff.theirs)) !== null
                      : true
                    : diff.theirs !== null,
              }
            )
          )
        );
      });
    this.pluginFileUI.onchange = null;
  }

  async trigger(): Promise<void> {
    this.pluginFileUI.click();
  }

  render(): TemplateResult {
    return html`<input @click=${(event: MouseEvent) =>
      ((<HTMLInputElement>event.target).value = '')} @change=${
      this.updateSubstation
    } id="update-substation-plugin-input" accept=".sed,.scd,.ssd,.iid,.cid" type="file"></input>`;
  }

  static styles = css`
    input {
      width: 0;
      height: 0;
      opacity: 0;
    }
  `;
}
