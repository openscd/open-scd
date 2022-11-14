import { LitElement } from 'lit';
export default class OscdSave extends LitElement {
    doc: XMLDocument;
    docName: string;
    run(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
