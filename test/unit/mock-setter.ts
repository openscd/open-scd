import {customElement, LitElement} from 'lit-element';
import {Setting} from '../../src/Setting.js';
import {CompasSettingUI} from "../../src/compas/CompasSetting.js";

@customElement('mock-setter')
export class MockSetter extends CompasSettingUI(Setting(LitElement)) {}
