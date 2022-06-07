import { registerTranslateConfig, use } from 'lit-translate';

import { expect, fixture, html } from '@open-wc/testing';
import { spy, SinonSpy } from 'sinon';

import '../../../src/open-scd.js';
import { OpenSCD } from '../../../src/open-scd.js';

import ValidateTemplates from '../../../src/validators/ValidateTemplates.js';

import { officialPlugins } from '../../../public/js/plugins.js';

const plugins = officialPlugins
  .map(plugin => ({
    ...plugin,
    default: false,
    installed: false,
    official: true,
  }))
  .concat([
    {
      name: 'Substation',
      src: '/src/editors/Substation.ts',
      icon: 'margin',
      default: true,
      kind: 'editor',
      installed: true,
      official: false,
    },
    {
      name: 'Validate Templates',
      src: '/src/validators/ValidateTemplates.ts',
      icon: 'rule_folder',
      default: true,
      kind: 'validator',
      installed: true,
      official: false,
    },
  ]);

describe('ValidateTemplates', () => {
  let logEvent: SinonSpy;
  let issueEvent: SinonSpy;

  beforeEach(async () => {
    logEvent = spy();
    issueEvent = spy();

    window.addEventListener('log', logEvent);
    window.addEventListener('issue', issueEvent);
  });

  describe('validate', () => {
    let element: ValidateTemplates;
    beforeEach(async () => {
      const doc = await fetch('/test/testfiles/validators/zeroissues.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      localStorage.setItem('plugins', JSON.stringify(plugins));

      const parent: OpenSCD = await fixture(html`
        <open-scd .doc=${doc}></open-scd>
      `);

      await parent.updateComplete;

      element = <ValidateTemplates>(
        parent.shadowRoot!.querySelector('mwc-list-item[class="validator"]')!
          .lastElementChild
      );

      // wait for the component to actually be instantiated
      while (!element.updateComplete) await new Promise(r => setTimeout(r, 1));

      await element.updateComplete;
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
}).afterAll(async () => {
  registerTranslateConfig({
    loader: () => Promise.resolve({}),
    empty: key => `[${key}]`,
    translationCache: {},
  });
  use('none');
});
