import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '@material/mwc-dialog';
import '../../../../src/editors/ied/create-ied-dialog.js';
import { CreateIedDialog } from '../../../../src/editors/ied/create-ied-dialog.js';

describe('create-ied-dialog', async () => {
  let element: CreateIedDialog;
  let doc: XMLDocument;
  let onConfirmSpy: SinonSpy;

  beforeEach(async () => {
    doc = new DOMParser().parseFromString(
      `<SCL xmlns="http://www.iec.ch/61850/2003/SCL">
        <IED name="ExistingIED" manufacturer="TestManufacturer"/>
      </SCL>`,
      'application/xml'
    );

    onConfirmSpy = spy();

    element = await fixture(html`
      <create-ied-dialog .doc=${doc} .onConfirm=${onConfirmSpy}>
      </create-ied-dialog>
    `);
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

  describe('name validation', () => {
    it('should reject empty names', () => {
      expect(element['isIedNameValid']('')).to.be.false;
      expect(element['isIedNameValid']('   ')).to.be.false;
    });

    it('should reject names with spaces', () => {
      expect(element['isIedNameValid']('IED Name')).to.be.false;
    });

    it('should reject existing names', () => {
      expect(element['isIedNameValid']('ExistingIED')).to.be.false;
    });

    it('should accept valid unique names', () => {
      expect(element['isIedNameValid']('NewIED')).to.be.true;
      expect(element['isIedNameValid']('IED_123')).to.be.true;
    });
  });

  it('should call onConfirm with valid name', async () => {
    element['newIedName'] = 'ValidNewIED';
    await element.updateComplete;

    element['handleCreate']();

    expect(onConfirmSpy).to.have.been.calledOnceWith('ValidNewIED');
    expect(element['newIedName']).to.equal('');
  });

  it('should not call onConfirm with invalid name', async () => {
    element['newIedName'] = 'Invalid Name';
    await element.updateComplete;

    element['handleCreate']();

    expect(onConfirmSpy).to.not.have.been.called;
  });
});
