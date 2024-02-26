import { LitElement, customElement } from 'lit-element';
import { Setting } from '../../src/Setting.js';

@customElement('mock-setter')
export class MockSetter extends Setting(LitElement) {}
