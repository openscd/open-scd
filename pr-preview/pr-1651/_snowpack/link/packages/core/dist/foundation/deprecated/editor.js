export function isCreate(action) {
    var _a, _b;
    return (action.old === undefined &&
        ((_a = action.new) === null || _a === void 0 ? void 0 : _a.parent) !== undefined &&
        ((_b = action.new) === null || _b === void 0 ? void 0 : _b.element) !== undefined);
}
export function isDelete(action) {
    var _a, _b;
    return (((_a = action.old) === null || _a === void 0 ? void 0 : _a.parent) !== undefined &&
        ((_b = action.old) === null || _b === void 0 ? void 0 : _b.element) !== undefined &&
        action.new === undefined);
}
export function isMove(action) {
    var _a, _b, _c, _d;
    return (((_a = action.old) === null || _a === void 0 ? void 0 : _a.parent) !== undefined &&
        ((_b = action.old) === null || _b === void 0 ? void 0 : _b.element) !== undefined &&
        ((_c = action.new) === null || _c === void 0 ? void 0 : _c.parent) !== undefined &&
        ((_d = action.new) === null || _d === void 0 ? void 0 : _d.element) == undefined);
}
export function isReplace(action) {
    var _a, _b, _c, _d;
    return (((_a = action.old) === null || _a === void 0 ? void 0 : _a.parent) === undefined &&
        ((_b = action.old) === null || _b === void 0 ? void 0 : _b.element) !== undefined &&
        ((_c = action.new) === null || _c === void 0 ? void 0 : _c.parent) === undefined &&
        ((_d = action.new) === null || _d === void 0 ? void 0 : _d.element) !== undefined);
}
export function isUpdate(action) {
    return (action.old === undefined &&
        action.new === undefined &&
        action.element !== undefined &&
        action.newAttributes !== undefined &&
        action.oldAttributes !== undefined);
}
export function isSimple(action) {
    return !(action.actions instanceof Array);
}
//** return `Update` action for `element` adding `oldAttributes` */
export function createUpdateAction(element, newAttributes) {
    const oldAttributes = {};
    Array.from(element.attributes).forEach(attr => {
        oldAttributes[attr.name] = attr.value;
    });
    return { element, oldAttributes, newAttributes };
}
/** Throws an error bearing `message`, never returning. */
export function unreachable(message) {
    throw new Error(message);
}
/** @returns an [[`EditorAction`]] with opposite effect of `action`. */
export function invert(action) {
    if (!isSimple(action)) {
        const inverse = {
            title: action.title,
            derived: action.derived,
            actions: [],
        };
        action.actions.forEach(element => inverse.actions.unshift(invert(element)));
        return inverse;
    }
    const metaData = {
        derived: action.derived,
        checkValidity: action.checkValidity,
    };
    if (isCreate(action))
        return { old: action.new, ...metaData };
    else if (isDelete(action))
        return { new: action.old, ...metaData };
    else if (isMove(action))
        return {
            old: {
                parent: action.new.parent,
                element: action.old.element,
                reference: action.new.reference,
            },
            new: { parent: action.old.parent, reference: action.old.reference },
            ...metaData,
        };
    else if (isReplace(action))
        return { new: action.old, old: action.new, ...metaData };
    else if (isUpdate(action))
        return {
            element: action.element,
            oldAttributes: action.newAttributes,
            newAttributes: action.oldAttributes,
            ...metaData,
        };
    else
        return unreachable('Unknown EditorAction type in invert.');
}
export function newActionEvent(action, initiator = 'user', eventInitDict) {
    return new CustomEvent('editor-action', {
        bubbles: true,
        composed: true,
        ...eventInitDict,
        detail: { action, initiator, ...eventInitDict === null || eventInitDict === void 0 ? void 0 : eventInitDict.detail },
    });
}
//# sourceMappingURL=editor.js.map