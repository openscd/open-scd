import { isInsertV2, isRemoveV2, isSetAttributesV2, isSetTextContentV2, isComplexV2 } from '../../../../_snowpack/link/packages/core/dist/foundation.js';
import { get } from '../../../../_snowpack/pkg/lit-translate.js';
export const getLogText = (edit) => {
    if (isInsertV2(edit)) {
        const name = edit.node instanceof Element ?
            edit.node.tagName :
            get('editing.node');
        return { title: get('editing.created', { name }) };
    }
    else if (isSetAttributesV2(edit) || isSetTextContentV2(edit)) {
        const name = edit.element.tagName;
        return { title: get('editing.updated', { name }) };
    }
    else if (isRemoveV2(edit)) {
        const name = edit.node instanceof Element ?
            edit.node.tagName :
            get('editing.node');
        return { title: get('editing.deleted', { name }) };
    }
    else if (isComplexV2(edit)) {
        const message = edit.map(e => getLogText(e)).map(({ title }) => title).join(', ');
        return { title: get('editing.complex'), message };
    }
    return { title: '' };
};
//# sourceMappingURL=get-log-text.js.map