import { get } from 'lit-translate';
import { identity, LogDetailBase } from '../../foundation.js';

function getTypeChild(element: Element): Element | null | undefined {
  const isStruct = element.getAttribute('bType') === 'Struct';
  const isEnum = element.getAttribute('bType') === 'Struct';
  const isDo = element.tagName === 'DO' || element.tagName === 'SDO';

  const referenceTag =
    isStruct || isEnum
      ? isStruct
        ? isDo
          ? 'DOType'
          : 'DAType'
        : 'EnumType'
      : '';

  return element
    .closest('DataTypeTemplates')
    ?.querySelector(`${referenceTag}[id="${element.getAttribute('type')}"]`);
}

function validateTypeAttribute(element: Element): LogDetailBase | null {
  const tagName = element.tagName;

  if ((tagName === 'DO' || tagName === 'SDO') && !element.getAttribute('type'))
    return {
      title: get('validator.templates.missingAttribute', {
        attr: 'type',
        element: tagName,
      }),
      message: '',
    };
  else if (
    tagName === 'DA' &&
    (element.getAttribute('bType') === 'Enum' ||
      element.getAttribute('bType') === 'Struct') &&
    !element.getAttribute('type')
  )
    return {
      title: get('validator.templates.missingAttribute', {
        attr: 'type',
        element: tagName,
      }),
      message: '',
    };

  return null;
}

export async function dOValidator(
  element: Element,
  reference?: Element
): Promise<LogDetailBase[]> {
  const missingType = validateTypeAttribute(element);
  if (missingType) return [missingType];

  const child = getTypeChild(element);
  if (!child)
    return [
      {
        title: get('validator.templates.missingReference', {
          tag: 'DO',
          name: element.getAttribute('name')!,
        }),
        message: `${identity(element)}`,
      },
    ];

  if (
    reference &&
    child!.getAttribute('cdc') !== reference.getAttribute('type')
  )
    return [
      {
        title: get('validator.templates.mandatoryChild', {
          tag: 'DOType',
          id: child.getAttribute('cdc') || 'UNCLASSIFIED',
          childTag: 'DO',
          childId: reference.getAttribute('type') || 'UNTYPED',
        }),
        message: `${identity(child)} > ${reference.getAttribute('name')}`,
      },
    ];

  return [];
}
