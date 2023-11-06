import { LitElement, customElement } from 'lit-element';
import { Setting } from '../src/Setting.js';
import { Editing } from '../src/Editing.js';
import { Logging } from '../src/Logging.js';

@customElement('mock-setter-logger')
export class MockSetterLogger extends Setting(Editing(Logging(LitElement))) {}
