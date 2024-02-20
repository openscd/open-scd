import { LitElement, customElement } from 'lit-element';
import { Setting } from '@openscd/open-scd/src/Setting.js';
import { Editing } from '@openscd/open-scd/src/Editing.js';
import { Historing } from '@openscd/open-scd/src/Historing.js';

@customElement('mock-setter-logger')
export class MockSetterLogger extends Setting(Editing(Historing(LitElement))) {}
