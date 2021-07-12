import {expect, fixture, html} from '@open-wc/testing';

import "../../../src/compas/CompasSettingsElement.js";
import {CompasSettings, CompasSettingsElement, defaults} from "../../../src/compas/CompasSettingsElement.js";

describe('compas-settings', () => {
  let element: CompasSettingsElement;

  beforeEach(async () => {
    localStorage.clear();

    element = <CompasSettingsElement>(
      await fixture(
        html`<compas-settings></compas-settings>`
      )
    );
  });

  it('initially has default settings', () => {
    expect(element).to.have.deep.property('compasSettings', defaults);
  });

  it('stores settings to localStorage', () => {
    CompasSettings().setCompasSetting('sclDataServiceUrl', 'http://localhost:9090/compas-scl-data-service');
    expect(localStorage.getItem('sclDataServiceUrl')).to.equal('http://localhost:9090/compas-scl-data-service');
  });

  it('retrieves settings from localStorage', () => {
    localStorage.setItem('sclDataServiceUrl', 'http://localhost:9090/compas-scl-data-service');
    expect(CompasSettings().compasSettings).to.have.property('sclDataServiceUrl', 'http://localhost:9090/compas-scl-data-service');
  });

  it('saves chosen settings on save button click', async () => {
    await element.updateComplete;
    element.getSclDataServiceUrlField().value = 'http://localhost:9091/compas-scl-data-service';
    await element.getSclDataServiceUrlField().updateComplete;
    expect(element.save()).to.be.true;
    expect(element.compasSettings).to.have.property('sclDataServiceUrl', 'http://localhost:9091/compas-scl-data-service');
  });

  it('save will not be done when invalid value', async () => {
    await element.updateComplete;
    element.getSclDataServiceUrlField().value = '';
    await element.getSclDataServiceUrlField().updateComplete;
    expect(element.save()).to.be.false;
    expect(element).to.have.deep.property('compasSettings', defaults);
  });

  it('resets settings to default on reset button click', async () => {
    await element.updateComplete;
    CompasSettings().setCompasSetting('sclDataServiceUrl', 'http://localhost:9091/compas-scl-data-service');
    expect(element).to.not.have.deep.property('compasSettings', defaults);
    expect(element.reset()).to.be.true;
    expect(element).to.have.deep.property('compasSettings', defaults);
  });

  it('looks like the latest snapshot', async () => {
    expect(element).shadowDom
      .to.equalSnapshot();
  });
});
