import { get } from 'lit-translate';

import { identity, LogDetailBase } from '../../foundation.js';
import { getTypeChild, isTypeMissing } from './foundation.js';

export async function dAValidator(element: Element): Promise<LogDetailBase[]> {
  if (isTypeMissing(element))
    return [
      {
        title: get('validator.templates.missingAttribute', {
          attr: 'type',
          element: element.tagName,
        }),
        message: '',
      },
    ];

  const child = getTypeChild(element);
  if (child === null)
    return [
      {
        title: get('validator.templates.missingReference', {
          tag: 'DO',
          name: element.getAttribute('name')!,
        }),
        message: `${identity(element)}`,
      },
    ];

  return [];
}
