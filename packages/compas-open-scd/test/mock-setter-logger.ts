import { LitElement, customElement } from 'lit-element';
import { Setting } from '../src/Setting.js';
import { Editing } from 'open-scd/src/Editing.js';
import { Historing } from '../src/Historing.js';

@customElement('mock-setter-logger')
export class MockSetterLogger extends Setting(Editing(Historing(LitElement))) {}
