export interface AttributeDefinition {
  name: string;
  type: string;
  required: boolean;
  default: string | null;
  enumeration: string[];
  restriction: AttributeRestriction;
}

export interface AttributeRestriction {
  base?: string;
  pattern?: string;
  maxLength?: string;
  minLength?: string;
}

function getEnumeration(
  base: string | null | undefined,
  schema: XMLDocument
): string[] {
  if (!base) return [];

  const simpleType = schema.querySelector(`simpleType[name="${base}"]`);

  const union = simpleType?.querySelector('union');
  if (union) {
    const memberTypes = union.getAttribute('memberTypes')?.split(' ') ?? [];
    const enumeration = memberTypes.flatMap(base =>
      getEnumeration(base, schema)
    );

    return enumeration;
  }

  const enumerations = <string[]>Array.from(
    simpleType?.querySelectorAll('enumeration') ?? []
  )
    .map(enumeration => enumeration.getAttribute('value'))
    .filter(value => value);

  return enumerations;
}

function getAttributeRestriction(
  base: string | null | undefined,
  schema: XMLDocument
): AttributeRestriction {
  if (!base) return {};

  const simpleType = schema.querySelector(`simpleType[name="${base}"]`);

  const union = simpleType?.querySelector('union');
  if (union) {
    const memberTypes = union.getAttribute('memberTypes')?.split(' ') ?? [];
    const restrictions = memberTypes.map(base =>
      getAttributeRestriction(base, schema)
    );

    const pattern = restrictions
      .filter(restriction => restriction.pattern)
      .map(restriction => restriction.pattern)
      .join('|');

    const definedMinLengths = restrictions.filter(
      restriction => restriction.minLength
    );

    const minLength = definedMinLengths.length
      ? Math.min(
          ...definedMinLengths.map(restriction =>
            parseInt(restriction.minLength!)
          )
        ) + ''
      : undefined;

    const definedMaxLengths = restrictions.filter(
      restriction => restriction.maxLength
    );

    const maxLength = definedMaxLengths.length
      ? Math.max(
          ...definedMaxLengths.map(restriction =>
            parseInt(restriction.maxLength!)
          )
        ) + ''
      : undefined;

    const base = restrictions[0]?.base;

    return { base, pattern, maxLength, minLength };
  }

  const restrictionElement = simpleType?.querySelector('restriction');

  const maxLenght = restrictionElement
    ?.querySelector('restriction > maxLength')
    ?.getAttribute('value');
  const minLength = restrictionElement
    ?.querySelector('restriction > minLength')
    ?.getAttribute('value');
  const length = restrictionElement
    ?.querySelector('restriction > length')
    ?.getAttribute('value');
  const pattern = Array.from(
    restrictionElement?.querySelectorAll(
      'restriction > pattern,restriction > enumeration'
    ) ?? []
  )
    .map(pattern => pattern.getAttribute('value')!)
    .join('|');

  const restriction = getAttributeRestriction(
    restrictionElement?.getAttribute('base'),
    schema
  );

  if (base.startsWith('xs:')) restriction['base'] = base;
  if (maxLenght) restriction['maxLength'] = maxLenght;
  if (minLength) restriction['minLength'] = minLength;
  if (!minLength && !maxLenght && length) {
    restriction['maxLength'] = length;
    restriction['minLength'] = length;
  }
  if (pattern) restriction['pattern'] = pattern;

  return restriction;
}

function getSchemaElementsAttribute(
  base: string | null,
  schema: XMLDocument
): Element[] {
  if (!base) return [];

  const complexType = schema.querySelector(`complexType[name="${base}"]`);
  if (!complexType) return [];

  const extention = complexType.querySelector('complexContent > extension');
  if (!extention) return [];

  const referencedBase = extention.getAttribute('base');
  const attributes = Array.from(
    complexType.querySelectorAll('complexContent > extension > attribute')
  );

  const attributeGroups = Array.from(
    complexType.querySelectorAll('complexContent > extension > attributeGroup')
  );

  const attributesFromGroup = attributeGroups.flatMap(attributeGroup =>
    Array.from(
      schema.querySelectorAll<Element>(
        `attributeGroup[name="${attributeGroup.getAttribute(
          'ref'
        )}"] > attribute`
      )
    )
  );

  return [
    ...attributes,
    ...attributesFromGroup,
    ...getSchemaElementsAttribute(referencedBase, schema),
  ];
}

export function schemaAttributeDefinition(
  tagName: string,
  schema: XMLDocument
): AttributeDefinition[] {
  const base = 't' + tagName;

  return getSchemaElementsAttribute(base, schema).map(attribute => {
    const name = attribute.getAttribute('name')!;
    const required = attribute.getAttribute('use') === 'true';
    const inCaseMissing = attribute.getAttribute('default');
    const type = attribute.getAttribute('type')!;
    const enumeration = getEnumeration(type, schema);
    const restriction = getAttributeRestriction(type, schema);

    return {
      name,
      type,
      required,
      default: inCaseMissing,
      enumeration,
      restriction,
    };
  });
}
