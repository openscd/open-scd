import { get } from 'lit-translate';

import { identity } from '@openscd/open-scd/src/foundation.js';
import { LogDetailBase } from '@openscd/core/foundation/deprecated/history.js';
import { getTypeChild, isTypeMissing } from './foundation.js';

export async function dAValidator(element: Element): Promise<LogDetailBase[]> {
  if (isTypeMissing(element))
    return [
      {
        title: get('validator.templates.missingAttribute', {
          attr: 'type',
          element: element.tagName,
        }),
        message: `${identity(element)}`,
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
