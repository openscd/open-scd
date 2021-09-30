import {expect, fixture, html} from '@open-wc/testing';

import "../../../src/compas/CompasSettings.js";
import {CompasSettings, CompasSettingsElement} from "../../../src/compas/CompasSettings.js";

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
    expect(element).to.have.deep.property('compasSettings', CompasSettings().defaultSettings);
  });

  it('stores settings to localStorage', () => {
    CompasSettings().setCompasSetting('sclDataServiceUrl', 'http://localhost:9090/compas-scl-data-service');
    CompasSettings().setCompasSetting('cimMappingServiceUrl', 'http://localhost:9091/compas-cim-mapping');
    expect(localStorage.getItem('sclDataServiceUrl')).to.equal('http://localhost:9090/compas-scl-data-service');
    expect(localStorage.getItem('cimMappingServiceUrl')).to.equal('http://localhost:9091/compas-cim-mapping');
  });

  it('retrieves settings from localStorage', () => {
    localStorage.setItem('sclDataServiceUrl', 'http://localhost:9090/compas-scl-data-service');
    localStorage.setItem('cimMappingServiceUrl', 'http://localhost:9091/compas-cim-mapping');
    expect(CompasSettings().compasSettings).to.have.property('sclDataServiceUrl', 'http://localhost:9090/compas-scl-data-service');
    expect(CompasSettings().compasSettings).to.have.property('cimMappingServiceUrl', 'http://localhost:9091/compas-cim-mapping');
  });

  it('saves chosen settings on save button click', async () => {
    await element.updateComplete;

    element.getSclDataServiceUrlField().value = 'http://localhost:9091/compas-scl-data-service';
    element.getCimMappingServiceUrlField().value = 'http://localhost:9092/compas-cim-mapping';
    await element.getSclDataServiceUrlField().updateComplete;
    await element.getCimMappingServiceUrlField().updateComplete;

    expect(element.save()).to.be.true;
    expect(element.compasSettings).to.have.property('sclDataServiceUrl', 'http://localhost:9091/compas-scl-data-service');
    expect(element.compasSettings).to.have.property('cimMappingServiceUrl', 'http://localhost:9092/compas-cim-mapping');
  });

  it('save will not be done when invalid value (Scl Data Service)', async () => {
    await element.updateComplete;
    element.getSclDataServiceUrlField().value = '';
    await element.getSclDataServiceUrlField().updateComplete;

    expect(element.save()).to.be.false;
    expect(element).to.have.deep.property('compasSettings', CompasSettings().defaultSettings);
  });

  it('save will not be done when invalid value (CIM Mapping Service)', async () => {
    await element.updateComplete;
    element.getCimMappingServiceUrlField().value = '';
    await element.getCimMappingServiceUrlField().updateComplete;

    expect(element.save()).to.be.false;
    expect(element).to.have.deep.property('compasSettings', CompasSettings().defaultSettings);
  });

  it('resets settings to default on reset button click', async () => {
    await element.updateComplete;
    CompasSettings().setCompasSetting('sclDataServiceUrl', 'http://localhost:9091/compas-scl-data-service');
    CompasSettings().setCompasSetting('cimMappingServiceUrl', 'http://localhost:9092/compas-cim-mapping');

    expect(element).to.not.have.deep.property('compasSettings', CompasSettings().defaultSettings);
    expect(element.reset()).to.be.true;
    expect(element).to.have.deep.property('compasSettings', CompasSettings().defaultSettings);
  });

  it('looks like the latest snapshot', async () => {
    expect(element).shadowDom
      .to.equalSnapshot();
  });
});
