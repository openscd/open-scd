import { __decorate } from "../../../_snowpack/pkg/tslib.js";
import { LitElement, property } from '../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../_snowpack/pkg/lit-translate.js';
import { newIssueEvent, newLogEvent, } from '../../../_snowpack/link/packages/core/dist/foundation/deprecated/history.js';
import { validateChildren } from './templates/foundation.js';
export default class ValidateTemplates extends LitElement {
    dispatch(detail) {
        const kind = detail.kind;
        const title = detail.title;
        const message = detail.message;
        if (kind)
            this.dispatchEvent(newLogEvent(detail));
        else
            this.dispatchEvent(newIssueEvent({
                validatorId: this.pluginId,
                title,
                message,
            }));
    }
    async validate() {
        const promises = [];
        const [version, revision, release] = [
            this.doc.documentElement.getAttribute('version') ?? '',
            this.doc.documentElement.getAttribute('revision') ?? '',
            this.doc.documentElement.getAttribute('release') ?? '',
        ];
        if (!(version === '2007' && revision === 'B' && Number(release) > 3)) {
            this.dispatchEvent(newIssueEvent({
                validatorId: this.pluginId,
                title: get('diag.missingnsd'),
                message: '',
            }));
            return;
        }
        const data = this.doc.querySelector('DataTypeTemplates');
        if (!data)
            return;
        const templateIssues = await validateChildren(data);
        if (templateIssues.length === 0)
            templateIssues.push({
                title: get('diag.zeroissues'),
            });
        templateIssues.forEach(error => this.dispatchEvent(newIssueEvent({
            ...error,
            validatorId: this.pluginId,
        })));
    }
}
__decorate([
    property({ attribute: false })
], ValidateTemplates.prototype, "doc", void 0);
__decorate([
    property()
], ValidateTemplates.prototype, "docName", void 0);
__decorate([
    property()
], ValidateTemplates.prototype, "pluginId", void 0);
//# sourceMappingURL=ValidateTemplates.js.map