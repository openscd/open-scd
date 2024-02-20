import { LitElement, customElement } from 'lit-element';

import { Editing } from '@openscd/open-scd/src/Editing.js';
import { Historing } from '@openscd/open-scd/src/Historing.js';

@customElement('mock-editor-logger')
export class MockEditorLogger extends Editing(Historing(LitElement)) {}
