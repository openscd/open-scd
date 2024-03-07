import { LitElement, customElement } from 'lit-element';
import { Editing } from '../src/Editing.js';
import { Historing } from '../src/Historing.js';

@customElement('mock-setter-logger')
export class MockSetterLogger extends Editing(Historing(LitElement)) {}
