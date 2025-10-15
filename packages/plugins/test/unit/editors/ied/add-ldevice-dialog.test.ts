import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';
import { AddLDeviceDialog } from '../../../../src/editors/ied/add-ldevice-dialog';
import '../../../../src/editors/ied/add-ldevice-dialog.js';

describe('add-ldevice-dialog', () => {
  let element: AddLDeviceDialog;
  let doc: XMLDocument;
  let server: Element;
  let onConfirmSpy: SinonSpy;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/editors/minimalVirtualIED.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    server = doc.querySelector('IED > AccessPoint > Server')!;
    onConfirmSpy = spy();
    element = await fixture(
      html`<add-ldevice-dialog
        .server=${server}
        .onConfirm=${onConfirmSpy}
      ></add-ldevice-dialog>`
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

  describe('LDevice inst validation', () => {
    it('should reject empty names', () => {
      expect(element['getInstError']('')).to.equal('');
      expect(element['getInstError']('   ')).to.equal('');
    });

    it('should reject names with wrong pattern', () => {
      expect(element['getInstError']('invalid name')).to.equal(
        '[iededitor.addLDeviceDialog.instFormatError]'
      );
    });

    it('should reject existing names', () => {
      expect(element['getInstError']('LD1')).to.equal(
        '[iededitor.addLDeviceDialog.instUniqueError]'
      );
    });
  });
});
