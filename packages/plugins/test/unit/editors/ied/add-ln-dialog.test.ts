import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';
import { AddLnDialog } from '../../../../src/editors/ied/add-ln-dialog';
import '../../../../src/editors/ied/add-ln-dialog.js';

describe('add-ln-dialog', () => {
  let element: AddLnDialog;
  let doc: XMLDocument;
  let onConfirmSpy: SinonSpy;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/editors/minimalVirtualIED.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    onConfirmSpy = spy();
    element = await fixture(
      html`<add-ln-dialog
        .doc=${doc}
        .onConfirm=${onConfirmSpy}
      ></add-ln-dialog>`
    );
  });

  it('looks like the latest snapshot', async () => {
    element.show();
    await element.updateComplete;
    expect(element).shadowDom.to.equalSnapshot();
  });

  it('should show and hide dialog', async () => {
    element.show();
    await element.updateComplete;
    expect(element.dialog.open).to.be.true;

    element['close']();
    await element.updateComplete;
    expect(element.dialog.open).to.be.false;
  });

  it('displays filtered LN types', async () => {
    element.show();
    await element.updateComplete;
    expect(element.filterText).to.equal('');
    expect(element['filteredLNodeTypes'].length).to.equal(1);

    element.filterText = 'NonExistingFilter';
    await element.updateComplete;
    expect(element['filteredLNodeTypes'].length).to.equal(0);
  });

  it('should create LN data on confirm', async () => {
    element.show();
    await element.updateComplete;
    const listItems = element.shadowRoot?.querySelectorAll('mwc-list-item');
    const targetItem = listItems
      ? Array.from(listItems).find(item => item.value === 'PlaceholderLLN0')
      : undefined;
    if (targetItem) {
      targetItem.click();
      await element.updateComplete;
    }

    const prefixInput = element.shadowRoot?.querySelector(
      '[data-testid="prefix"]'
    );
    (prefixInput as HTMLInputElement).value = 'MyPrefix';
    (prefixInput as HTMLInputElement).dispatchEvent(
      new Event('input', { bubbles: true, composed: true })
    );

    const amountInput = element.shadowRoot?.querySelector(
      '[data-testid="amount"]'
    );
    (amountInput as HTMLInputElement).value = '3';
    (amountInput as HTMLInputElement).dispatchEvent(
      new Event('input', { bubbles: true, composed: true })
    );

    await element.updateComplete;
    const addButton = element.shadowRoot?.querySelector(
      '[data-testid="add-ln-button"]'
    );
    (addButton as HTMLElement)?.click();
    await element.updateComplete;

    expect(onConfirmSpy.calledOnce).to.be.true;
    expect(onConfirmSpy.firstCall.args[0]).to.deep.include({
      lnType: 'PlaceholderLLN0',
      lnClass: 'LLN0',
      prefix: 'MyPrefix',
      amount: 3,
    });
  });
});
