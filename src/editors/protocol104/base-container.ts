import { LitElement, property } from 'lit-element';

export class Base104Container extends LitElement {
  @property()
  doc!: XMLDocument;
  @property({ type: Number })
  editCount = -1;
}
