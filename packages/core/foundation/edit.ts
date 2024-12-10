/** Intent to `parent.insertBefore(node, reference)` */
export type InsertV2 = {
  parent: Node;
  node: Node;
  reference: Node | null;
};

/** Intent to remove a `node` from its `ownerDocument` */
export type RemoveV2 = {
  node: Node;
};

/** Intent to set the `textContent` of `element` */
export type SetTextContentV2 = {
  element: Element;
  textContent: string;
};

/** Intent to set or remove (if `null`) `attributes`(-`NS`) on `element` */
export type SetAttributesV2 = {
  element: Element;
  attributes: Partial<Record<string, string | null>>;
  attributesNS: Partial<Record<string, Partial<Record<string, string | null>>>>;
};

/** Intent to change some XMLDocuments */
export type EditV2 =
  | InsertV2
  | SetAttributesV2
  | SetTextContentV2
  | RemoveV2
  | EditV2[];

export function isComplex(edit: EditV2): edit is EditV2[] {
  return edit instanceof Array;
}

export function isSetTextContent(edit: EditV2): edit is SetTextContentV2 {
  return (
    (edit as SetTextContentV2).element !== undefined &&
    (edit as SetTextContentV2).textContent !== undefined
  );
}

export function isRemove(edit: EditV2): edit is RemoveV2 {
  return (
    (edit as InsertV2).parent === undefined && (edit as RemoveV2).node !== undefined
  );
}

export function isSetAttributes(edit: EditV2): edit is SetAttributesV2 {
  return (
    (edit as SetAttributesV2).element !== undefined &&
    (edit as SetAttributesV2).attributes !== undefined &&
    (edit as SetAttributesV2).attributesNS !== undefined
  );
}

export function isInsert(edit: EditV2): edit is InsertV2 {
  return (
    (edit as InsertV2).parent !== undefined &&
    (edit as InsertV2).node !== undefined &&
    (edit as InsertV2).reference !== undefined
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isEditV2(edit: any): edit is EditV2 {
  if (isComplex(edit)) {
    return !edit.some((e) => !isEditV2(e));
  }
  
  return (
    isSetAttributes(edit) ||
    isSetTextContent(edit) ||
    isInsert(edit) ||
    isRemove(edit)
  );
}
