import { LitElement } from 'lit';
declare const TAG_NAME = "oscd-card";
export declare class Card extends LitElement {
    stackLevel: number;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        [TAG_NAME]: Card;
    }
}
export {};
