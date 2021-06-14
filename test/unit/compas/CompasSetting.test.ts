import {expect, fixture, html} from '@open-wc/testing';
import {registerTranslateConfig, use} from 'lit-translate';

import {Button} from '@material/mwc-button';

import {CompasSetting, CompasSettingElement, defaults} from "../../../src/compas/CompasSetting.js";
import '../mock-setter.js';

describe('CompasSettingElement', () => {
  let element: CompasSettingElement;
  beforeEach(async () => {
    localStorage.clear();
    element = <CompasSettingElement>await fixture(html`<mock-setter></mock-setter>`);
  });

  it('initially has default settings', () => {
    expect(element).to.have.deep.property('compasSettings', defaults);
  });

  it('stores settings to localStorage', () => {
    CompasSetting().setCompasSetting('sclDataServiceUrl', 'http://localhost:9090/compas-scl-data-service');
    expect(localStorage.getItem('sclDataServiceUrl')).to.equal('http://localhost:9090/compas-scl-data-service');
  });

  it('retrieves settings from localStorage', () => {
    localStorage.setItem('sclDataServiceUrl', 'http://localhost:9090/compas-scl-data-service');
    expect(CompasSetting().compasSettings).to.have.property('sclDataServiceUrl', 'http://localhost:9090/compas-scl-data-service');
  });

  it('saves chosen settings on save button click', async () => {
    element.compasSettingsUI.show();
    element.sclDataServiceUrlUI.value = 'http://localhost:9091/compas-scl-data-service';
    await element.sclDataServiceUrlUI.updateComplete;
    await (<Button>(
      element.compasSettingsUI.querySelector('mwc-button[dialogAction="save"]')
    )).click();
    expect(element.compasSettings).to.have.property('sclDataServiceUrl', 'http://localhost:9091/compas-scl-data-service');
  });

  it('resets settings to default on reset button click', async () => {
    element.compasSettingsUI.show();
    await element.compasSettingsUI.updateComplete;
    CompasSetting().setCompasSetting('sclDataServiceUrl', 'http://localhost:9091/compas-scl-data-service');
    expect(element).to.not.have.deep.property('compasSettings', defaults);
    (<Button>(
      element.compasSettingsUI.querySelector('mwc-button[dialogAction="reset"]')
    )).click();
    expect(element).to.have.deep.property('compasSettings', defaults);
  });
}).afterAll(() => {
  registerTranslateConfig({ empty: key => `[${key}]` });
  // dirty hack to let other tests pass which rely on untranslated text
  use('test');
});

