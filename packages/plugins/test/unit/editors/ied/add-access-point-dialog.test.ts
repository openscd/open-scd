import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';
import { AddAccessPointDialog } from '../../../../src/editors/ied/add-access-point-dialog';
import '../../../../src/editors/ied/add-access-point-dialog.js';

describe('add-access-point-dialog', () => {
  let element: AddAccessPointDialog;
  let doc: XMLDocument;
  let ied: Element;
  let onConfirmSpy: SinonSpy;

  beforeEach(async () => {
    doc = new DOMParser().parseFromString(
      `<SCL xmlns="http://www.iec.ch/61850/2003/SCL">
        <IED name="ExistingIED" manufacturer="TestManufacturer"/>
      </SCL>`,
      'application/xml'
    );
    ied = doc.querySelector('IED')!;
    onConfirmSpy = spy();

    element = await fixture(
      html`<add-access-point-dialog
        .doc=${doc}
        .ied=${ied}
        .onConfirm=${onConfirmSpy}
      ></add-access-point-dialog>`
    );
  });

  it('should show and hide dialog', async () => {
    await element.updateComplete;
    element.show();
    await element.updateComplete;
    expect(element.dialog.open).to.be.true;

    element['close']();
    await element.updateComplete;
    expect(element.dialog.open).to.be.false;
  });

  describe('access point name validation', () => {
    it('should reject names with invalid format', () => {
      expect(element['getApNameError']('1 invalid')).to.equal(
        '[iededitor.addAccessPointDialog.nameFormatError]'
      );
      expect(element['getApNameError']('!bad')).to.equal(
        '[iededitor.addAccessPointDialog.nameFormatError]'
      );
    });

    it('should reject names that are too long', () => {
      const longName = 'a'.repeat(33);
      expect(element['getApNameError'](longName)).to.equal(
        '[iededitor.addAccessPointDialog.nameTooLongError]'
      );
    });

    it('should accept valid names', () => {
      expect(element['getApNameError']('ValidName1')).to.equal('');
    });
  });

  describe('creating access point', () => {
    it('should call onConfirm with correct name', async () => {
      element.show();
      await element.updateComplete;

      element.apNameField.value = 'ValidName1';
      element.apNameField.dispatchEvent(new Event('input'));

      const addButton = element.shadowRoot?.querySelector(
        '[data-testid="add-access-point-button"]'
      );
      (addButton as HTMLElement)?.click();
      await element.updateComplete;

      expect(onConfirmSpy.calledOnce).to.be.true;
      expect(onConfirmSpy.firstCall.args[0]).to.deep.include({
        name: 'ValidName1',
        createServerAt: false,
      });
    });

    it('should call onConfirm with serverAt data', async () => {
      element.show();
      await element.updateComplete;
      element.apNameField.value = 'ValidName2';
      element.apNameField.dispatchEvent(new Event('input'));
      element['createServerAt'] = true;
      element['serverAtApName'] = 'AP1';
      element['serverAtDesc'] = 'Description for AP1';
      await element.updateComplete;

      const addButton = element.shadowRoot?.querySelector(
        '[data-testid="add-access-point-button"]'
      );
      (addButton as HTMLElement)?.click();
      await element.updateComplete;

      expect(onConfirmSpy.calledOnce).to.be.true;
      expect(onConfirmSpy.firstCall.args[0]).to.deep.include({
        name: 'ValidName2',
        createServerAt: true,
        serverAtApName: 'AP1',
        serverAtDesc: 'Description for AP1',
      });
    });
  });
});
