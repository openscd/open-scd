import { registerTranslateConfig, use } from 'lit-translate';

import { html, fixture, expect } from '@open-wc/testing';

import './mock-setter.js';
import { MockSetter } from './mock-setter.js';

import { Button } from '@material/mwc-button';
import { defaults } from '../../src/Setting.js';

describe('SettingElement', () => {
  let element: MockSetter;
  beforeEach(async () => {
    localStorage.clear();
    element = <MockSetter>await fixture(html`<mock-setter></mock-setter>`);
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

  it('saves chosen .nsdoc file and looks like latest snapshot', async () => {
    element.settingsUI.show();
    await element.settingsUI.updateComplete;
  
    const nsdocFile = await fetch('/test/testfiles/settingTest.nsdoc')
      .then(response => response.text())

    element.setSetting('IEC 61850-7-2', nsdocFile);
    
    await element.requestUpdate();
    await element.updateComplete;

    expect(localStorage.getItem('IEC 61850-7-2')).to.eql(nsdocFile);
    expect(element).shadowDom.to.equalSnapshot();
  });

  it('deletes a chosen .nsdoc file and looks like latest snapshot', async () => {
    element.settingsUI.show();
    await element.settingsUI.updateComplete;
  
    const nsdocFile = await fetch('/test/testfiles/settingTest.nsdoc')
      .then(response => response.text())

    element.setSetting('IEC 61850-7-2', nsdocFile);
    
    await element.requestUpdate();
    await element.updateComplete;

    (<Button>(
      element.settingsUI.querySelector('mwc-icon[id="deleteNsdocItem"]')
    )).click();
    
    await element.requestUpdate();
    await element.updateComplete;

    expect(localStorage.getItem('IEC 61850-7-2')).to.equal(null);
    expect(element).shadowDom.to.equalSnapshot();
  });
}).afterAll(() => {
  registerTranslateConfig({ empty: key => `[${key}]` });
  // dirty hack to let other tests pass which rely on untranslated text
  use('test');
});
