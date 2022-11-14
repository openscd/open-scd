import { LitElement } from 'lit';
export default class OscdOpen extends LitElement {
    input: HTMLInputElement;
    run(): Promise<void>;
    openDoc(event: Event): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
