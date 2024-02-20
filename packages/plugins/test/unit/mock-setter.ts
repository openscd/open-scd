import { LitElement, customElement } from 'lit-element';
import { Setting } from '@openscd/open-scd/src/Setting.js';

@customElement('mock-setter')
export class MockSetter extends Setting(LitElement) {}
