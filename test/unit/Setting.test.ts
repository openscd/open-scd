import { html, fixture, expect } from '@open-wc/testing';

import { registerTranslateConfig, use } from 'lit-translate';

import { Button } from '@material/mwc-button';

import { SettingElement, defaults } from '../../src/Setting.js';
import './mock-setter.js';

describe('SettingElement', () => {
  let element: SettingElement;
  beforeEach(async () => {
    localStorage.clear();
    element = <SettingElement>await fixture(html`<mock-setter></mock-setter>`);
  });

  it('initially has default settings', () =>
    expect(element).to.have.deep.property('settings', defaults));

  it('stores settings to localStorage', () => {
    element.setSetting('theme', 'dark');
    expect(localStorage.getItem('theme')).to.equal('dark');
  });

  it('retrieves settings from localStorage', () => {
    localStorage.setItem('language', 'de');
    expect(element.settings).to.have.property('language', 'de');
  });

  it('saves chosen settings on save button click', async () => {
    element.settingsUI.show();
    element.darkThemeUI.checked = true;
    await element.darkThemeUI.updateComplete;
    await (<Button>(
      element.settingsUI.querySelector('mwc-button[dialogAction="save"]')
    )).click();
    expect(element.settings).to.have.property('theme', 'dark');
  });

  it('resets settings to default on reset button click', async () => {
    element.settingsUI.show();
    await element.settingsUI.updateComplete;
    element.setSetting('language', 'de');
    expect(element).to.not.have.deep.property('settings', defaults);
    (<Button>(
      element.settingsUI.querySelector('mwc-button[dialogAction="reset"]')
    )).click();
    expect(element).to.have.deep.property('settings', defaults);
  });
}).afterAll(() => {
  registerTranslateConfig({ empty: key => `[${key}]` });
  // dirty hack to let other tests pass which rely on untranslated text
  use('test');
});
