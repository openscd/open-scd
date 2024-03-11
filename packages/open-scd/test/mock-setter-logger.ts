import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { Editing } from '../src/Editing.js';
import { Historing } from '../src/Historing.js';

@customElement('mock-setter-logger')
export class MockSetterLogger extends Editing(Historing(LitElement)) {}
