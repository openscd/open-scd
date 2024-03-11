import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { Editing } from '../src/Editing.js';
import { Historing } from '../src/Historing.js';

@customElement('mock-editor-logger')
export class MockEditorLogger extends Editing(Historing(LitElement)) {}
