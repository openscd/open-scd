import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '@openscd/open-scd/test/mock-open-scd.js';
import { MockOpenSCD } from '@openscd/open-scd/test/mock-open-scd.js';

import ValidateTemplates from '../../../src/validators/ValidateTemplates.js';

describe('ValidateTemplates', () => {
  if (customElements.get('validate-templates') === undefined)
    customElements.define('validate-templates', ValidateTemplates);

  let logEvent: SinonSpy;
  let issueEvent: SinonSpy;

  beforeEach(async () => {
    logEvent = spy();
    issueEvent = spy();

    window.addEventListener('log', logEvent);
    window.addEventListener('issue', issueEvent);
  });

  describe('dispatch', () => {
    let element: ValidateTemplates;

    beforeEach(async () => {
      const doc = await fetch('/test/testfiles/validators/zeroissues.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      const parent: MockOpenSCD = await fixture(html`
        <mock-open-scd
          ><validate-templates
            .doc=${doc}
            .pluginId="${'/src/validators/ValidateTemplates.js'}"
          ></validate-templates
        ></mock-open-scd>
      `);

      element = parent.getActivePlugin();

      await parent.updateComplete;
    });

    it('triggers as newIssuesEvent for detail not containing kind', () => {
      const detail = {
        title: 'title',
        message: 'message',
      };
      element.dispatch(detail);
      expect(issueEvent).to.have.been.called;
      expect(logEvent).to.not.have.been.called;
      expect(issueEvent.args[0][0].type).to.equal('issue');
      expect(issueEvent.args[0][0].detail.validatorId).to.equal(
        '/src/validators/ValidateTemplates.js'
      );
      expect(issueEvent.args[0][0].detail.message).to.equal('message');
      expect(issueEvent.args[0][0].detail.title).to.equal('title');
    });

    it('triggers as newLogEvent for detail containing kind info', () => {
      const detail = {
        kind: 'info',
        title: 'title',
        message: 'message',
      };
      element.dispatch(detail);
      expect(logEvent).to.have.been.called;
      expect(issueEvent).to.not.have.been.called;
      expect(logEvent.args[0][0].type).to.equal('log');
      expect(logEvent.args[0][0].detail.kind).to.equal('info');
      expect(logEvent.args[0][0].detail.message).to.equal('message');
      expect(logEvent.args[0][0].detail.title).to.equal('title');
    });

    it('triggers as newLogEvent for detail containing kind warning', () => {
      const detail = {
        kind: 'warning',
        title: 'title',
        message: 'message',
      };
      element.dispatch(detail);
      expect(logEvent).to.have.been.called;
      expect(issueEvent).to.not.have.been.called;
      expect(logEvent.args[0][0].type).to.equal('log');
      expect(logEvent.args[0][0].detail.kind).to.equal('warning');
    });

    it('triggers as newLogEvent for detail containing kind error', () => {
      const detail = {
        kind: 'error',
        title: 'title',
        message: 'message',
      };
      element.dispatch(detail);
      expect(logEvent).to.have.been.called;
      expect(issueEvent).to.not.have.been.called;
      expect(logEvent.args[0][0].type).to.equal('log');
      expect(logEvent.args[0][0].detail.kind).to.equal('error');
    });
  });

  describe('validate', () => {
    let element: ValidateTemplates;
    beforeEach(async () => {
      const doc = await fetch('/test/testfiles/validators/zeroissues.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      const parent: MockOpenSCD = await fixture(html`
        <mock-open-scd
          ><validate-templates .doc=${doc}></validate-templates
        ></mock-open-scd>
      `);

      element = parent.getActivePlugin();

      await parent.updateComplete;
    });

    it('pushes only diag.zeroissues issue to diagnostics when no issues found', async () => {
      await element.validate();
      expect(issueEvent).to.have.been.calledOnce;
      expect(issueEvent.args[0][0].detail.title).to.contain(
        'No errors found in the project'
      );
    });

    it('pushes only diag.missingnsd issue to diagnostics pane for SCL version < 2007B5', async () => {
      element.doc.querySelector('SCL')?.setAttribute('version', '2003');
      await element.validate();
      expect(issueEvent).to.have.been.calledOnce;
      expect(issueEvent.args[0][0].detail.title).to.contain(
        'Cannot validate DataTypeTemplates. The version of the project must be higher than or equal to 2007B5'
      );
    });

    it('pushes only diag.missingnsd issue to diagnostics pane for SCL not having version information', async () => {
      element.doc.querySelector('SCL')?.removeAttribute('version');
      element.doc.querySelector('SCL')?.removeAttribute('revision');
      await element.validate();
      expect(issueEvent).to.have.been.calledOnce;
      expect(issueEvent.args[0][0].detail.title).to.contain(
        'Cannot validate DataTypeTemplates. The version of the project must be higher than or equal to 2007B5'
      );
    });

    it('does not trigger anything for SCL missing DataTypeTemplates', async () => {
      const data = element.doc.querySelector('DataTypeTemplates')!;
      element.doc.querySelector('SCL')?.removeChild(data);
      await element.validate();
      expect(issueEvent).to.not.have.been.calledOnce;
    });
  });
});
