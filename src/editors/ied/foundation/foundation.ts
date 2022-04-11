import { html, TemplateResult } from "lit-html";

import './inline-edit-textfield.js'

export interface CustomField {
  render(): TemplateResult;
}

const daiValidationTypes = ['VisString32', 'VisString64', 'VisString65', 'VisString129', 'VisString255'] as const;
export type DaiValidationTypes = typeof daiValidationTypes[number];

export const getCustomField: Record<DaiValidationTypes, CustomField> = {
  VisString32: {
    render: () => {
      return html`<inline-edit-textfield
      ></inline-edit-textfield>`;
    }
  },
  VisString64: {
    render: () => {
      return html`<inline-edit-textfield
      ></inline-edit-textfield>`;
    }
  },
  VisString65: {
    render: () => {
      return html`<inline-edit-textfield
      ></inline-edit-textfield>`;
    }
  },
  VisString129: {
    render: () => {
      return html`<inline-edit-textfield
      ></inline-edit-textfield>`;
    }
  },
  VisString255: {
    render: () => {
      return html`<inline-edit-textfield
      ></inline-edit-textfield>`;
    }
  }
};