import { html, TemplateResult } from "lit-html";

import './inline-edit-textfield.js'

export interface CustomField {
  render(element: Element): TemplateResult;
}

const daiValidationTypes = ['INT8', 'INT16', 'INT24', 'INT32', 'INT64', 'INT128', 'INT8U', 'INT16U', 'INT24U', 'INT32U'] as const;
export type DaiValidationTypes = typeof daiValidationTypes[number];

export function getCustomField(): Record<DaiValidationTypes, CustomField> {
  return {
    INT8: integerField((-2)**8, 2**8-1),
    INT16: integerField((-2)**16, 2**16-1),
    INT24: integerField((-2)**24, 2**24-1),
    INT32: integerField((-2)**32, 2**32-1),
    INT64: integerField((-2)**64, 2**64-1),
    INT128: integerField((-2)**128, 2**128-1),
    INT8U: integerField(0, 2**8-1),
    INT16U: integerField(0, 2**16-1),
    INT24U: integerField(0, 2**24-1),
    INT32U: integerField(0, 2**32-1)
  }

  function integerField(min: number, max: number): CustomField {
    return {
      render: (element: Element) => {
        return html`<inline-edit-textfield
          .element=${element}
          type="number"
          min=${min}
          max=${max}
        ></inline-edit-textfield>`;
      }
    }
  }
}