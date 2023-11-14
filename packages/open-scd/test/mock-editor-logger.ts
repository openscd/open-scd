import { LitElement, customElement } from 'lit-element';

import { Editing } from '../src/Editing.js';
import { Historing } from '../src/Historing.js';

@customElement('mock-editor-logger')
export class MockEditorLogger extends Editing(Historing(LitElement)) {}
