import { TemplateResult } from "lit-html";
import { List } from "@material/mwc-list";
import { WizardInputElement, WizardAction, WizardInput, MenuAction } from "./dom.js";

/** Represents a page of a wizard dialog */
export interface WizardPage {
  title: string;
  content?: (TemplateResult | WizardInput)[];
  primary?: {
    icon: string;
    label: string;
    action: WizardActor;
    auto?: boolean;
  };
  secondary?: {
    icon: string;
    label: string;
    action: WizardActor;
  };
  initial?: boolean;
  element?: Element;
  menuActions?: MenuAction[];
}
export type Wizard = WizardPage[];
export type WizardFactory = () => Wizard;

/** @returns [[`EditorAction`]]s to dispatch on [[`WizardDialog`]] commit. */
export type WizardActor = (
  inputs: WizardInputElement[],
  wizard: Element,
  list?: List | null
) => WizardAction[];

export function isWizardFactory(
  maybeFactory: WizardAction | Wizard | null
): maybeFactory is WizardFactory {
  return typeof maybeFactory === 'function';
}
