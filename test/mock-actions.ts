const element = document.createElement('test-element');
const parent = document.createElement('test-parent');

export const cre = { new: { parent, element } };
export const del = { old: { parent, element } };
export const mov = { old: { parent, element }, new: { parent } };
export const upd = { old: { element }, new: { element } };
