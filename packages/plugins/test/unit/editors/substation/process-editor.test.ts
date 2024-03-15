import { fixture, html, expect } from '@open-wc/testing';

import '../../../../src/editors/substation/process-editor.js';
import { ProcessEditor } from '../../../../src/editors/substation/process-editor.js';

describe('web component rendering Process element', () => {
  let element: ProcessEditor;
  let doc: XMLDocument;

  describe('rendering LNode, GeneralEquipment,Function and ConductingEquipment children', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/editors/substation/Process.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      element = <ProcessEditor>(
        await fixture(
          html`<process-editor
            .element=${doc.querySelector('Process[name="ProcessGenConduct"]')}
          ></process-editor>`
        )
      );
      element.showfunctions = true;
      await element.updateComplete;
    });
    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('hides LNode and Function children', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/editors/substation/Process.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      element = <ProcessEditor>(
        await fixture(
          html`<process-editor
            .element=${doc.querySelector('Process[name="ProcessGenConduct"]')}
          ></process-editor>`
        )
      );
      element.showfunctions = false;
      await element.updateComplete;
    });
    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('rendering Substation and Process children', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/editors/substation/Process.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      element = <ProcessEditor>(
        await fixture(
          html`<process-editor
            .element=${doc.querySelector('Process[name="ProcProcSubAA1"]')}
          ></process-editor>`
        )
      );
      element.showfunctions = true;
      await element.updateComplete;
    });
    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('rendering a Line child', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/editors/substation/Process.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      element = <ProcessEditor>(
        await fixture(
          html`<process-editor
            .element=${doc.querySelector('Process[name="ProcessLine"]')}
          ></process-editor>`
        )
      );
      element.showfunctions = true;
      await element.updateComplete;
    });
    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
