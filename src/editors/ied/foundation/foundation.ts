import { html, TemplateResult } from "lit-html";
import { translate } from "lit-translate";

import '../../../../src/wizard-textfield.js';
import '../../../../src/wizard-select.js';

export interface CustomField {
  render(value: string): TemplateResult;
}

const daiValidationTypes = ['BOOLEAN', 'INT8', 'INT16', 'INT24', 'INT32', 'INT64',
  'INT128', 'INT8U', 'INT16U', 'INT24U', 'INT32U', 'FLOAT32', 'FLOAT64', 'VisString32', 'VisString64',
  'VisString65', 'VisString129', 'VisString255'] as const;
export type DaiValidationTypes = typeof daiValidationTypes[number];

export function getCustomField(): Record<DaiValidationTypes, CustomField> {
  return {
    BOOLEAN: booleanField(),
    INT8: integerField('INT8', -(2**8), 2**8-1),
    INT16: integerField('INT16', -(2**16), 2**16-1),
    INT24: integerField('INT24', -(2**24), 2**24-1),
    INT32: integerField('INT32', -(2**32), 2**32-1),
    INT64: integerField('INT64', -(2**64), 2**64-1),
    INT128: integerField('INT128', -(2**128), 2**128-1),
    INT8U: integerField('INT8U', 0, 2**8-1),
    INT16U: integerField('INT16U', 0, 2**16-1),
    INT24U: integerField('INT24U', 0, 2**24-1),
    INT32U: integerField('INT32U', 0, 2**32-1),
    FLOAT32: floatField('FLOAT32', -(2**32), 2**32-1),
    FLOAT64: floatField('FLOAT64', -(2**64), 2**64-1),
    VisString32: stringField('VisString32', 32),
    VisString64: stringField('VisString64', 64),
    VisString65: stringField('VisString65', 65),
    VisString129: stringField('VisString129', 129),
    VisString255: stringField('VisString255', 255)
  }

  function booleanField(): CustomField {
    return {
      render: (value: string) => {
        return html`<wizard-select
          label="Value"
          .maybeValue=${value}
          fixedMenuPosition
        >
          <mwc-list-item value="true">true</mwc-list-item>
          <mwc-list-item value="false">false</mwc-list-item>
        </wizard-select>`;
      }
    }
  }

  function integerField(type: string, min: number, max: number): CustomField {
    return {
      render: (value: string) => {
        return html`<wizard-textfield
          label="Value"
          .maybeValue=${value}
          helper="${translate('dai.wizard.valueHelper', { type })}"
          type="number"
          min=${min}
          max=${max}
        ></wizard-textfield>`;
      }
    }
  }

  function floatField(type: string, min: number, max: number): CustomField {
    return {
      render: (value: string) => {
        return html`<wizard-textfield
          label="Value"
          .maybeValue=${value}
          helper="${translate('dai.wizard.valueHelper', { type })}"
          type="number"
          min=${min}
          max=${max}
          step="0.1"
        ></wizard-textfield>`;
      }
    }
  }

  function stringField(type: string, maxNrOfCharacters: number): CustomField {
    return {
      render: (value: string) => {
        return html`<wizard-textfield
          label="Value"
          .maybeValue=${value}
          helper="${translate('dai.wizard.valueHelper', { type })}"
          maxLength=${maxNrOfCharacters}
          type="text"
        ></wizard-textfield>`;
      }
    }
  }
}