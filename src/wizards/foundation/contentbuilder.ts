import { html, TemplateResult } from 'lit-element';

import {
  getAttributeDefinition,
  AttributeDefinition,
} from '../../foundation/schemapicker.js';
import { getSchemaVersionNumber } from '../../foundation/schemas.js';

function isEnumeration(attribute: AttributeDefinition): boolean {
  const patterns = attribute.restriction.pattern?.split('|');
  const enumeration = attribute.enumeration;

  return JSON.stringify(enumeration) === JSON.stringify(patterns) ?? false;
}

export function wizardDialogContent(
  element: Element,
  excludingAttrs?: string[]
): TemplateResult[] {
  const versionNumber = getSchemaVersionNumber(element);
  const attributes = getAttributeDefinition(element.tagName, versionNumber);

  return attributes
    .filter(attribute => !excludingAttrs?.includes(attribute.name))
    .map(attribute => {
      const maybeValue = element.getAttribute(attribute.name);

      if (attribute.type === 'xs:boolean')
        return html`<wizard-select
          label="${attribute.name}"
          ?nullable=${!attribute.required}
          .maybeValue=${maybeValue}
          >${['true', 'false'].map(
            value =>
              html`<mwc-list-item value="${value}">${value}</mwc-list-item>`
          )}</wizard-select
        >`;

      if (isEnumeration(attribute))
        return html`<wizard-select
          label="${attribute.name}"
          ?nullable=${!attribute.required}
          .maybeValue=${maybeValue}
          >${attribute.enumeration.map(
            value =>
              html`<mwc-list-item value="${value}">${value}</mwc-list-item>`
          )}</wizard-select
        >`;

      const emptyStringAllowed = true;

      return html`<wizard-textfield
        label="${attribute.name}"
        ?nullable=${!attribute.required}
        .maybeValue=${maybeValue}
        ?required=${!emptyStringAllowed}
        pattern="${attribute.restriction.pattern || ''}"
        maxLength="${attribute.restriction.maxLength || Infinity}"
        minlength="${attribute.restriction.minLength || 0}"
      ></wizard-textfield>`;
    });
}
