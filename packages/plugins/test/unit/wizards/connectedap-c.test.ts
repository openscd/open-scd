import { expect, fixture, html } from '@open-wc/testing';

import '../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../mock-wizard-editor.js';

import { ListItemBase } from '@material/mwc-list/mwc-list-item-base.js';

import { createConnectedApWizard } from '../../../src/wizards/connectedap.js';

function isAllMacUnique(parent: Element, serviceType: 'GSE' | 'SMV'): boolean {
  const allMacs = Array.from(
    parent.ownerDocument.querySelectorAll(
      `${serviceType} > Address > P[type="MAC-Address"]`
    )
  ).map(pType => pType.textContent!);

  const set = new Set(allMacs);

  return allMacs.length === set.size;
}

function isAllAppIdUnique(
  parent: Element,
  serviceType: 'GSE' | 'SMV'
): boolean {
  const allMacs = Array.from(
    parent.ownerDocument.querySelectorAll(
      `${serviceType} > Address > P[type="APPID"]`
    )
  ).map(pType => pType.textContent!);

  const set = new Set(allMacs);

  return allMacs.length === set.size;
}

async function clickListItem(
  element: MockWizardEditor,
  values: string[]
): Promise<void> {
  Array.from(values).forEach(value => {
    element.wizardUI
      .dialog!.querySelector<ListItemBase>(
        `mwc-check-list-item[value="${value}"]`
      )
      ?.click();
  });

  await element.updateComplete;

  (<HTMLElement>(
    element.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]')
  )).click();

  await element.updateComplete;
}

describe('create wizard for ConnectedAP element', () => {
  let doc: XMLDocument;
  let element: MockWizardEditor;
  let parent: Element;

  beforeEach(async () => {
    element = <MockWizardEditor>(
      await fixture(html`<mock-wizard-editor></mock-wizard-editor>`)
    );

    doc = await fetch('/test/testfiles/wizards/communication.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    parent = doc.querySelector('SubNetwork')!;
    const wizard = createConnectedApWizard(parent);
    element.workflow.push(() => wizard);
    await element.requestUpdate();

    /*
    inputs = Array.from(element.wizardUI.inputs);
    */
  });

  it('looks like the latest snapshot', async () =>
    await expect(element.wizardUI.dialog).dom.to.equalSnapshot());

  it('it does not allow to add already connected access points', () => {
    const disabledItems = Array.from(
      element.wizardUI.dialog!.querySelectorAll<ListItemBase>(
        'mwc-check-list-item'
      )
    ).filter(item => item.disabled);

    for (const item of disabledItems) {
      const [iedName, apName] = item.value.split('>');
      expect(
        doc.querySelector(
          `ConnectedAP[iedName="${iedName}"][apName="${apName}"]`
        )
      ).to.exist;
    }
  });

  describe('on connecting one new access point', () => {
    it('adds a new ConnectedAP element', async () => {
      await clickListItem(element, ['GOOSE_Publisher>AP2']);

      expect(
        parent.querySelector(
          'ConnectedAP[iedName="GOOSE_Publisher"][apName="AP2"]'
        )
      ).to.exist;
    });

    describe('with publishing GSEControl or SampledValueControl', () => {
      it('create unique GSE for each GSEControl', async () => {
        await clickListItem(element, ['GOOSE_Publisher>AP2']);
        expect(
          parent.querySelectorAll(
            'ConnectedAP[iedName="GOOSE_Publisher"][apName="AP2"] ' + '> GSE'
          )
        ).to.have.length(2);
      });

      it('adds uniques GSE MAC-Address and APPID', async () => {
        const value = 'GOOSE_Publisher>AP2';
        await clickListItem(element, [value]);

        expect(isAllMacUnique(parent, 'GSE')).to.be.true;
        expect(isAllAppIdUnique(parent, 'GSE')).to.be.true;
      });

      it('create unique SMV for each SampledValueControl', async () => {
        await clickListItem(element, ['SMV_Publisher>AP1']);

        expect(
          parent.querySelectorAll(
            'ConnectedAP[iedName="SMV_Publisher"][apName="AP1"] ' + '> SMV'
          )
        ).to.have.length(2);
      });

      it('adds uniques SMV MAC-Address and APPID', async () => {
        const value = 'SMV_Publisher>AP1';
        await clickListItem(element, [value]);

        expect(isAllMacUnique(parent, 'SMV')).to.be.true;
        expect(isAllAppIdUnique(parent, 'SMV')).to.be.true;
      });
    });
  });

  describe('on connecting multiple new access point', () => {
    it('adds new ConnectedAP element for each selected acc p', async () => {
      await clickListItem(element, [
        'GOOSE_Publisher>AP2',
        'GOOSE_Publisher>AP3',
      ]);

      expect(
        parent.querySelector(
          'ConnectedAP[iedName="GOOSE_Publisher"][apName="AP2"]'
        )
      ).to.exist;

      expect(
        parent.querySelector(
          'ConnectedAP[iedName="GOOSE_Publisher"][apName="AP3"]'
        )
      ).to.exist;
    });

    describe('with publishing GSEControl or SampledValueControl', () => {
      it('create unique GSE for each GSEControl', async () => {
        await clickListItem(element, [
          'GOOSE_Publisher>AP2',
          'GOOSE_Publisher>AP3',
        ]);
        expect(
          parent.ownerDocument.querySelectorAll(
            'ConnectedAP[iedName="GOOSE_Publisher"]' + '> GSE'
          )
        ).to.have.length(3);
      });

      it('adds uniques GSE MAC-Address and APPID', async () => {
        await clickListItem(element, [
          'GOOSE_Publisher>AP2',
          'GOOSE_Publisher2>AP1',
        ]);

        expect(isAllMacUnique(parent, 'GSE')).to.be.true;
        expect(isAllMacUnique(parent, 'GSE')).to.be.true;
      });

      it('create unique SMV for each SampledValueControl', async () => {
        await clickListItem(element, [
          'SMV_Publisher>AP1',
          'SMV_Publisher>AP4',
        ]);

        expect(
          parent.ownerDocument.querySelectorAll(
            'ConnectedAP[iedName="SMV_Publisher"] ' + '> SMV'
          )
        ).to.have.length(3);
      });

      it('adds uniques MAC-Address and APPID', async () => {
        await clickListItem(element, [
          'SMV_Publisher>AP1',
          'SMV_Publisher2>AP1',
        ]);

        expect(isAllMacUnique(parent, 'SMV')).to.be.true;
        expect(isAllAppIdUnique(parent, 'SMV')).to.be.true;
      });
    });
  });
});
