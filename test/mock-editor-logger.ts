import { LitElement, customElement } from 'lit-element';

import { Editing } from '../src/Editing.js';
import { Logging } from '../src/Logging.js';

@customElement('mock-editor-logger')
export class MockEditorLogger extends Editing(Logging(LitElement)) {}
