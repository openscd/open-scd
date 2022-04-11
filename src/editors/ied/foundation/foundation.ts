import { html, TemplateResult } from "lit-html";

import './inline-edit-textfield.js'

export interface CustomField {
  render(id: string, value: string): TemplateResult;
}

const daiValidationTypes = ['INT8', 'INT16', 'INT24', 'INT32', 'INT64', 'INT128', 'INT8U', 'INT16U', 'INT24U', 'INT32U'] as const;
export type DaiValidationTypes = typeof daiValidationTypes[number];

export function getCustomField(): Record<DaiValidationTypes, CustomField> {
  return {
    INT8: Int8Field(),
    INT16: Int16Field(),
    INT24: Int24Field(),
    INT32: Int32Field(),
    INT64: Int64Field(),
    INT128: Int128Field(),
    INT8U: Int8UField(),
    INT16U: Int16UField(),
    INT24U: Int24UField(),
    INT32U: Int32UField()
  }

  function Int8Field(): CustomField {
    return {
      render: (id: string, value: string) => {
        return html`<inline-edit-textfield
          type="number"
          min=-${2**8}
          max=${2**8-1}
          id=${id}
          value=${value}
        ></inline-edit-textfield>`;
      }
    }
  }

  function Int16Field(): CustomField {
    return {
      render: (id: string, value: string) => {
        return html`<inline-edit-textfield
          type="number"
          min=-${2**16}
          max=${2**16-1}
          id=${id}
          value=${value}
        ></inline-edit-textfield>`;
      }
    }
  }

  function Int24Field(): CustomField {
    return {
      render: (id: string, value: string) => {
        return html`<inline-edit-textfield
          type="number"
          min=-${2**24}
          max=${2**24-1}
          id=${id}
          value=${value}
        ></inline-edit-textfield>`;
      }
    }
  }

  function Int32Field(): CustomField {
    return {
      render: (id: string, value: string) => {
        return html`<inline-edit-textfield
          type="number"
          min=-${2**32}
          max=${2**32-1}
          id=${id}
          value=${value}
        ></inline-edit-textfield>`;
      }
    }
  }

  function Int64Field(): CustomField {
    return {
      render: (id: string, value: string) => {
        return html`<inline-edit-textfield
          type="number"
          min=-${2**64}
          max=${2**64-1}
          id=${id}
          value=${value}
        ></inline-edit-textfield>`;
      }
    }
  }

  function Int128Field(): CustomField {
    return {
      render: (id: string, value: string) => {
        return html`<inline-edit-textfield
          type="number"
          min=-${2**128}
          max=${2**128-1}
          id=${id}
          value=${value}
        ></inline-edit-textfield>`;
      }
    }
  }

  function Int8UField(): CustomField {
    return {
      render: (id: string, value: string) => {
        return html`<inline-edit-textfield
          type="number"
          min=0
          max=${2**8-1}
          id=${id}
          value=${value}
        ></inline-edit-textfield>`;
      }
    }
  }

  function Int16UField(): CustomField {
    return {
      render: (id: string, value: string) => {
        return html`<inline-edit-textfield
          type="number"
          min=0
          max=${2**16-1}
          id=${id}
          value=${value}
        ></inline-edit-textfield>`;
      }
    }
  }

  function Int24UField(): CustomField {
    return {
      render: (id: string, value: string) => {
        return html`<inline-edit-textfield
          type="number"
          min=0
          max=${2**24-1}
          id=${id}
          value=${value}
        ></inline-edit-textfield>`;
      }
    }
  }

  function Int32UField(): CustomField {
    return {
      render: (id: string, value: string) => {
        return html`<inline-edit-textfield
          type="number"
          min=0
          max=${2**32-1}
          id=${id}
          value=${value}
        ></inline-edit-textfield>`;
      }
    }
  }
}