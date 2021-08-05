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
    CompasSettings().setCompasSetting('cimMappingServiceUrl', 'http://localhost:9091/compas-cim-mapping');
    CompasSettings().setCompasSetting('keycloakAuthUrl', 'http://localhost:8089/auth/');
    expect(localStorage.getItem('sclDataServiceUrl')).to.equal('http://localhost:9090/compas-scl-data-service');
    expect(localStorage.getItem('cimMappingServiceUrl')).to.equal('http://localhost:9091/compas-cim-mapping');
    expect(localStorage.getItem('keycloakAuthUrl')).to.equal('http://localhost:8089/auth/');
  });

  it('retrieves settings from localStorage', () => {
    localStorage.setItem('sclDataServiceUrl', 'http://localhost:9090/compas-scl-data-service');
    localStorage.setItem('cimMappingServiceUrl', 'http://localhost:9091/compas-cim-mapping');
    localStorage.setItem('keycloakAuthUrl', 'http://localhost:8089/auth/');
    expect(CompasSettings().compasSettings).to.have.property('sclDataServiceUrl', 'http://localhost:9090/compas-scl-data-service');
    expect(CompasSettings().compasSettings).to.have.property('cimMappingServiceUrl', 'http://localhost:9091/compas-cim-mapping');
    expect(CompasSettings().compasSettings).to.have.property('keycloakAuthUrl', 'http://localhost:8089/auth/');
  });

  it('saves chosen settings on save button click', async () => {
    await element.updateComplete;

    element.getSclDataServiceUrlField().value = 'http://localhost:9091/compas-scl-data-service';
    element.getCimMappingServiceUrlField().value = 'http://localhost:9092/compas-cim-mapping';
    element.getKeycloakAuthUrlField().value = 'http://localhost:9089/auth/';
    await element.getSclDataServiceUrlField().updateComplete;
    await element.getCimMappingServiceUrlField().updateComplete;
    await element.getKeycloakAuthUrlField().updateComplete;

    expect(element.save()).to.be.true;
    expect(element.compasSettings).to.have.property('sclDataServiceUrl', 'http://localhost:9091/compas-scl-data-service');
    expect(element.compasSettings).to.have.property('cimMappingServiceUrl', 'http://localhost:9092/compas-cim-mapping');
    expect(element.compasSettings).to.have.property('keycloakAuthUrl', 'http://localhost:9089/auth/');
  });

  it('save will not be done when invalid value (Scl Data Service)', async () => {
    await element.updateComplete;
    element.getSclDataServiceUrlField().value = '';
    await element.getSclDataServiceUrlField().updateComplete;

    expect(element.save()).to.be.false;
    expect(element).to.have.deep.property('compasSettings', defaults);
  });

  it('save will not be done when invalid value (CIM Mapping Service)', async () => {
    await element.updateComplete;
    element.getCimMappingServiceUrlField().value = '';
    await element.getCimMappingServiceUrlField().updateComplete;

    expect(element.save()).to.be.false;
    expect(element).to.have.deep.property('compasSettings', defaults);
  });

  it('save will not be done when invalid value (Keycloak Auth URL)', async () => {
    await element.updateComplete;
    element.getKeycloakAuthUrlField().value = '';
    await element.getKeycloakAuthUrlField().updateComplete;

    expect(element.save()).to.be.false;
    expect(element).to.have.deep.property('compasSettings', defaults);
  });

  it('resets settings to default on reset button click', async () => {
    await element.updateComplete;
    CompasSettings().setCompasSetting('sclDataServiceUrl', 'http://localhost:9091/compas-scl-data-service');
    CompasSettings().setCompasSetting('cimMappingServiceUrl', 'http://localhost:9092/compas-cim-mapping');
    CompasSettings().setCompasSetting('keycloakAuthUrl', 'http://localhost:9089/auth/');

    expect(element).to.not.have.deep.property('compasSettings', defaults);
    expect(element.reset()).to.be.true;
    expect(element).to.have.deep.property('compasSettings', defaults);
  });

  it('looks like the latest snapshot', async () => {
    expect(element).shadowDom
      .to.equalSnapshot();
  });
});
