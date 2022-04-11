import { TextFieldType } from "@material/mwc-textfield";
import { html, TemplateResult } from "lit-html";

import './inline-edit-textfield.js'

export interface CustomField {
  type: TextFieldType;
  render(id: string, value: string): TemplateResult;
}

const daiValidationTypes = ['VisString32', 'VisString64', 'VisString65', 'VisString129', 'VisString255'] as const;
export type DaiValidationTypes = typeof daiValidationTypes[number];

export function getCustomField(): Record<DaiValidationTypes, CustomField> {
  return {
    VisString32: {
      type: 'text',
      render: (id: string, value: string) => {
        return html`<inline-edit-textfield
          id=${id}
          value=${value}
        ></inline-edit-textfield>`;
      }
    },
    VisString64: {
      type: 'text',
      render: (id: string, value: string) => {
        return html`<inline-edit-textfield
          id=${id}
          value=${value}
        ></inline-edit-textfield>`;
      }
    },
    VisString65: {
      type: 'text',
      render: (id: string, value: string) => {
        return html`<inline-edit-textfield
          id=${id}
          value=${value}
        ></inline-edit-textfield>`;
      }
    },
    VisString129: {
      type: 'text',
      render: (id: string, value: string) => {
        return html`<inline-edit-textfield
          id=${id}
          value=${value}
        ></inline-edit-textfield>`;
      }
    },
    VisString255: {
      type: 'text',
      render: (id: string, value: string) => {
        return html`<inline-edit-textfield
          id=${id}
          value=${value}
        ></inline-edit-textfield>`;
      }
    }
  }
}