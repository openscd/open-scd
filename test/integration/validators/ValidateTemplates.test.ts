import { expect, fixture, html } from '@open-wc/testing';

import { OpenSCD } from '../../../src/open-scd.js';
import ValidateTemplates from '../../../src/validators/ValidateTemplates.js';

describe('ValidateTemplates plugin', () => {
  customElements.define('validate-templates', ValidateTemplates);
  let parent: OpenSCD;
  let element: ValidateTemplates;

  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch(
      '/base/test/testfiles/validators/datatypetemplateerrors.scd'
    )
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    parent = await fixture(html`
      <open-scd .doc=${doc}
        ><validate-templates .doc=${doc}></validate-templates
      ></open-scd>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&family=Roboto:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Material+Icons&display=block"
        rel="stylesheet"
      />
    `);
    element = <ValidateTemplates>parent.querySelector('validate-templates')!;
    element.pluginId = 'validatetemplates';

    await element.validate('', 1);
    await parent.workDone;
  });
  it('generates issues in the diagnistics pane', async () => {
    const issues = parent.diagnose.get('validatetemplates');
    expect(issues?.length).to.equal(20);
  }).timeout(1000);
  it('pushes issues to the diagnostics pane that look like the latest snapshot', async () => {
    await parent.requestUpdate();
    expect(parent.diagnosticUI).to.equalSnapshot();
  });
});
