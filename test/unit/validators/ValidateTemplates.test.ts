import { expect, fixture, html } from '@open-wc/testing';
import sinon, { SinonSpy } from 'sinon';

import { OpenSCD } from '../../../src/open-scd.js';

import ValidateTemplates, {
  dispatch,
} from '../../../src/validators/ValidateTemplates.js';

describe('ValidateTemplates', () => {
  let logEvent: SinonSpy;
  let issueEvent: SinonSpy;

  beforeEach(async () => {
    logEvent = sinon.spy();
    issueEvent = sinon.spy();

    window.addEventListener('log', logEvent);
    window.addEventListener('issue', issueEvent);
  });
  describe('dispatch', () => {
    beforeEach(async () => {
      const doc = await fetch('/base/test/testfiles/validators/zeroissues.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      await fixture(html`
        <open-scd .doc=${doc}
          ><validate-templates .doc=${doc}></validate-templates
        ></open-scd>
      `);
    });
    it('triggers as newIssuesEvent for detail not containing kind', () => {
      const pluginId = '/src/validators/ValidateTemplates.js';
      const detail = {
        title: 'title',
        message: 'message',
      };
      dispatch(detail, pluginId);
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
      const pluginId = '/src/validators/ValidateTemplates.js';
      const detail = {
        kind: 'info',
        title: 'title',
        message: 'message',
      };
      dispatch(detail, pluginId);
      expect(logEvent).to.have.been.called;
      expect(issueEvent).to.not.have.been.called;
      expect(logEvent.args[0][0].type).to.equal('log');
      expect(logEvent.args[0][0].detail.kind).to.equal('info');
      expect(logEvent.args[0][0].detail.message).to.equal('message');
      expect(logEvent.args[0][0].detail.title).to.equal('title');
    });

    it('triggers as newLogEvent for detail containing kind warning', () => {
      const pluginId = '/src/validators/ValidateTemplates.js';
      const detail = {
        kind: 'warning',
        title: 'title',
        message: 'message',
      };
      dispatch(detail, pluginId);
      expect(logEvent).to.have.been.called;
      expect(issueEvent).to.not.have.been.called;
      expect(logEvent.args[0][0].type).to.equal('log');
      expect(logEvent.args[0][0].detail.kind).to.equal('warning');
    });

    it('triggers as newLogEvent for detail containing kind error', () => {
      const pluginId = '/src/validators/ValidateTemplates.js';
      const detail = {
        kind: 'error',
        title: 'title',
        message: 'message',
      };
      dispatch(detail, pluginId);
      expect(logEvent).to.have.been.called;
      expect(issueEvent).to.not.have.been.called;
      expect(logEvent.args[0][0].type).to.equal('log');
      expect(logEvent.args[0][0].detail.kind).to.equal('error');
    });
  });

  describe('validate', () => {
    let element: ValidateTemplates;
    beforeEach(async () => {
      const doc = await fetch('/base/test/testfiles/validators/zeroissues.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      const parent: OpenSCD = await fixture(html`
        <open-scd .doc=${doc}
          ><validate-templates .doc=${doc}></validate-templates
        ></open-scd>
      `);

      element = <ValidateTemplates>parent.querySelector('validate-templates')!;
    });

    it('pushes only diag.zeroissues issue to diagnostics when no issues found', async () => {
      await element.validate();
      expect(issueEvent).to.have.been.calledOnce;
      expect(issueEvent.args[0][0].detail.title).to.contain('No errors');
    });

    it('pushes only diag.missingnsd issue to diagnostics pane for SCL version < 2007B3', async () => {
      element.doc.querySelector('SCL')?.setAttribute('version', '2003');
      await element.validate();
      expect(issueEvent).to.have.been.calledOnce;
      expect(issueEvent.args[0][0].detail.title).to.contain('Cannot validate');
    });

    it('pushes only diag.missingnsd issue to diagnostics pane for SCL not having version information', async () => {
      element.doc.querySelector('SCL')?.removeAttribute('version');
      element.doc.querySelector('SCL')?.removeAttribute('revision');
      await element.validate();
      expect(issueEvent).to.have.been.calledOnce;
      expect(issueEvent.args[0][0].detail.title).to.contain('Cannot validate');
    });

    it('does not trigger anything for SCL missing DataTypeTemplates', async () => {
      const data = element.doc.querySelector('DataTypeTemplates')!;
      element.doc.querySelector('SCL')?.removeChild(data);
      await element.validate();
      expect(issueEvent).to.not.have.been.calledOnce;
    });
  });
});
