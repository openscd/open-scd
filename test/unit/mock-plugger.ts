import { LitElement, customElement } from 'lit-element';
import { Plugging } from '../../src/Plugging.js';
import { Editing } from '../../src/Editing.js';

@customElement('mock-plugger')
export class MockPlugger extends Plugging(Editing(LitElement)) {}
