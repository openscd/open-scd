import { expect, fixture, html } from '@open-wc/testing';

import '../../../src/compas/CompasSettings.js';
import {
  CompasSettings,
  CompasSettingsElement,
} from '../../../src/compas/CompasSettings.js';

describe('compas-settings', () => {
  let element: CompasSettingsElement;

  beforeEach(async () => {
    localStorage.clear();

    element = <CompasSettingsElement>(
      await fixture(html`<compas-settings></compas-settings>`)
    );
  });

  it('initially has default settings', () => {
    expect(element).to.have.deep.property(
      'compasSettings',
      CompasSettings().defaultSettings
    );
  });

  it('stores settings to localStorage', () => {
    CompasSettings().setCompasSetting(
      'sclDataServiceUrl',
      'http://localhost:9090/compas-scl-data-service'
    );
    CompasSettings().setCompasSetting(
      'cimMappingServiceUrl',
      'http://localhost:9091/compas-cim-mapping'
    );
    CompasSettings().setCompasSetting(
      'sclAutoAlignmentServiceUrl',
      'http://localhost:9092/compas-scl-auto-alignment'
    );
    CompasSettings().setCompasSetting('useWebsockets', 'off');
    CompasSettings().setCompasSetting(
      'sitipeServiceUrl',
      'http://localhost:9090/compas-sitipe-service'
    );
    expect(localStorage.getItem('sclDataServiceUrl')).to.equal(
      'http://localhost:9090/compas-scl-data-service'
    );
    expect(localStorage.getItem('cimMappingServiceUrl')).to.equal(
      'http://localhost:9091/compas-cim-mapping'
    );
    expect(localStorage.getItem('sclAutoAlignmentServiceUrl')).to.equal(
      'http://localhost:9092/compas-scl-auto-alignment'
    );
    expect(localStorage.getItem('useWebsockets')).to.equal('off');
    expect(localStorage.getItem('sitipeServiceUrl')).to.equal(
      'http://localhost:9090/compas-sitipe-service'
    );
  });

  it('retrieves settings from localStorage', () => {
    localStorage.setItem(
      'sclDataServiceUrl',
      'http://localhost:9090/compas-scl-data-service'
    );
    localStorage.setItem(
      'cimMappingServiceUrl',
      'http://localhost:9091/compas-cim-mapping'
    );
    localStorage.setItem(
      'sclAutoAlignmentServiceUrl',
      'http://localhost:9092/compas-scl-auto-alignment'
    );
    localStorage.setItem('useWebsockets', 'off');

    localStorage.setItem(
      'sitipeServiceUrl',
      'http://localhost:9090/compas-sitipe-service'
    );

    expect(CompasSettings().compasSettings).to.have.property(
      'sclDataServiceUrl',
      'http://localhost:9090/compas-scl-data-service'
    );
    expect(CompasSettings().compasSettings).to.have.property(
      'cimMappingServiceUrl',
      'http://localhost:9091/compas-cim-mapping'
    );
    expect(CompasSettings().compasSettings).to.have.property(
      'sclAutoAlignmentServiceUrl',
      'http://localhost:9092/compas-scl-auto-alignment'
    );
    expect(CompasSettings().compasSettings).to.have.property(
      'useWebsockets',
      'off'
    );
    expect(CompasSettings().compasSettings).to.have.property(
      'sitipeServiceUrl',
      'http://localhost:9090/compas-sitipe-service'
    );
  });

  it('saves chosen settings on save button click', async () => {
    await element.updateComplete;

    element.getSclDataServiceUrlField().value =
      'http://localhost:9091/compas-scl-data-service';
    element.getCimMappingServiceUrlField().value =
      'http://localhost:9092/compas-cim-mapping';
    element.getSclAutoAlignmentServiceUrlField().value =
      'http://localhost:9093/compas-scl-auto-alignment';
    element.getUseWebsockets().checked = false;
    element.getSitipeServiceUrlField().value =
      'http://localhost:9090/compas-sitipe-service';

    await element.getSclDataServiceUrlField().updateComplete;
    await element.getCimMappingServiceUrlField().updateComplete;
    await element.getSclAutoAlignmentServiceUrlField().updateComplete;
    await element.getUseWebsockets().updateComplete;
    await element.getSitipeServiceUrlField().updateComplete;

    expect(element.save()).to.be.true;
    expect(element.compasSettings).to.have.property(
      'sclDataServiceUrl',
      'http://localhost:9091/compas-scl-data-service'
    );
    expect(element.compasSettings).to.have.property(
      'cimMappingServiceUrl',
      'http://localhost:9092/compas-cim-mapping'
    );
    expect(element.compasSettings).to.have.property(
      'sclAutoAlignmentServiceUrl',
      'http://localhost:9093/compas-scl-auto-alignment'
    );
    expect(element.compasSettings).to.have.property('useWebsockets', 'off');
    expect(element.compasSettings).to.have.property(
      'sitipeServiceUrl',
      'http://localhost:9090/compas-sitipe-service'
    );
  });

  it('save will not be done when invalid value (Scl Data Service)', async () => {
    await element.updateComplete;
    element.getSclDataServiceUrlField().value = '';
    await element.getSclDataServiceUrlField().updateComplete;

    expect(element.save()).to.be.false;
    expect(element).to.have.deep.property(
      'compasSettings',
      CompasSettings().defaultSettings
    );
  });

  it('save will not be done when invalid value (CIM Mapping Service)', async () => {
    await element.updateComplete;
    element.getCimMappingServiceUrlField().value = '';
    await element.getCimMappingServiceUrlField().updateComplete;

    expect(element.save()).to.be.false;
    expect(element).to.have.deep.property(
      'compasSettings',
      CompasSettings().defaultSettings
    );
  });

  it('save will not be done when invalid value (SCL Auto Alignment Service)', async () => {
    await element.updateComplete;
    element.getSclAutoAlignmentServiceUrlField().value = '';
    await element.getSclAutoAlignmentServiceUrlField().updateComplete;

    expect(element.save()).to.be.false;
    expect(element).to.have.deep.property(
      'compasSettings',
      CompasSettings().defaultSettings
    );
  });

  it('resets settings to default on reset button click', async () => {
    await element.updateComplete;
    CompasSettings().setCompasSetting(
      'sclDataServiceUrl',
      'http://localhost:9091/compas-scl-data-service'
    );
    CompasSettings().setCompasSetting(
      'cimMappingServiceUrl',
      'http://localhost:9092/compas-cim-mapping'
    );
    CompasSettings().setCompasSetting(
      'sclAutoAlignmentServiceUrl',
      'http://localhost:9093/compas-scl-auto-alignment'
    );
    CompasSettings().setCompasSetting('useWebsockets', 'off');

    expect(element).to.not.have.deep.property(
      'compasSettings',
      CompasSettings().defaultSettings
    );
    expect(element.reset()).to.be.true;
    expect(element).to.have.deep.property(
      'compasSettings',
      CompasSettings().defaultSettings
    );
  });

  it('looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });
});
