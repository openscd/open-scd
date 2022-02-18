import { LitElement, customElement } from 'lit-element';
import { Editing } from '../../src/Editing.js';
import { Logging } from '../../src/Logging.js';

@customElement('mock-editor')
export class MockEditor extends Editing(Logging(LitElement)) {}
