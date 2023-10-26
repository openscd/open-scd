import { LitElement, TemplateResult } from 'lit';
import { Plugin } from './Plugging.js';
import '@material/mwc-dialog';
import '../components/card.js';
declare const TAG_NAME = "oscd-wizard-host";
export declare class WizardHost extends LitElement {
    wizards?: Plugin[];
    private activeWizard?;
    private activeWizardProps;
    private activeWizards;
    private activeWizardPropsList;
    private dialogRef;
    render(): TemplateResult<1>;
    private renderActiveWizards;
    private static renderActiveWizard2;
    private renderActiveWizard;
    private handleBackdropClick;
    private handleWizardCreationRequest;
    private handleWizardInspectionRequest;
    private handleWizardFinished;
    private static doesWizardSupportInspection;
    private static doesWizardSupportCreation;
    private static extractWizardClass;
    name?: string;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        [TAG_NAME]: WizardHost;
    }
}
export {};
