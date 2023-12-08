"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.minAvailableLogicalNodeInstance = exports.formatXml = exports.newLnInstGenerator = exports.getChildElementsByTagName = exports.getVersion = exports.isPublic = exports.findControlBlocks = exports.findFCDAs = exports.getUniqueElementName = exports.depth = exports.crossProduct = exports.unreachable = exports.compareNames = exports.patterns = exports.ifImplemented = exports.cloneElement = exports.createElement = exports.isEqual = exports.isSame = exports.identity = exports.find = exports.getReference = exports.tags = exports.pathParts = exports.getInstanceAttribute = exports.getPathNameAttribute = exports.getDescriptionAttribute = exports.getNameAttribute = exports.getSclSchemaVersion = exports.referencePath = exports.newOpenDocEvent = exports.newValidateEvent = exports.newPendingStateEvent = exports.newIssueEvent = exports.newLogEvent = exports.newSubWizardEvent = exports.newWizardEvent = exports.getMultiplier = exports.getValue = exports.reportValidity = exports.checkValidity = exports.isWizardFactory = exports.wizardInputSelector = exports.newActionEvent = exports.createUpdateAction = exports.invert = exports.isSimple = exports.isUpdate = exports.isReplace = exports.isMove = exports.isDelete = exports.isCreate = void 0;
var lit_html_1 = require("lit-html");
var mwc_select_1 = require("@material/mwc-select");
var wizard_textfield_js_1 = require("./wizard-textfield.js");
var wizard_select_js_1 = require("./wizard-select.js");
var wizard_checkbox_js_1 = require("./wizard-checkbox.js");
function isCreate(action) {
    var _a, _b;
    return (action.old === undefined &&
        ((_a = action["new"]) === null || _a === void 0 ? void 0 : _a.parent) !== undefined &&
        ((_b = action["new"]) === null || _b === void 0 ? void 0 : _b.element) !== undefined);
}
exports.isCreate = isCreate;
function isDelete(action) {
    var _a, _b;
    return (((_a = action.old) === null || _a === void 0 ? void 0 : _a.parent) !== undefined &&
        ((_b = action.old) === null || _b === void 0 ? void 0 : _b.element) !== undefined &&
        action["new"] === undefined);
}
exports.isDelete = isDelete;
function isMove(action) {
    var _a, _b, _c, _d;
    return (((_a = action.old) === null || _a === void 0 ? void 0 : _a.parent) !== undefined &&
        ((_b = action.old) === null || _b === void 0 ? void 0 : _b.element) !== undefined &&
        ((_c = action["new"]) === null || _c === void 0 ? void 0 : _c.parent) !== undefined &&
        ((_d = action["new"]) === null || _d === void 0 ? void 0 : _d.element) == undefined);
}
exports.isMove = isMove;
function isReplace(action) {
    var _a, _b, _c, _d;
    return (((_a = action.old) === null || _a === void 0 ? void 0 : _a.parent) === undefined &&
        ((_b = action.old) === null || _b === void 0 ? void 0 : _b.element) !== undefined &&
        ((_c = action["new"]) === null || _c === void 0 ? void 0 : _c.parent) === undefined &&
        ((_d = action["new"]) === null || _d === void 0 ? void 0 : _d.element) !== undefined);
}
exports.isReplace = isReplace;
function isUpdate(action) {
    return (action.old === undefined &&
        action["new"] === undefined &&
        action.element !== undefined &&
        action.newAttributes !== undefined &&
        action.oldAttributes !== undefined);
}
exports.isUpdate = isUpdate;
function isSimple(action) {
    return !(action.actions instanceof Array);
}
exports.isSimple = isSimple;
/** @returns an [[`EditorAction`]] with opposite effect of `action`. */
function invert(action) {
    if (!isSimple(action)) {
        var inverse_1 = {
            title: action.title,
            derived: action.derived,
            actions: []
        };
        action.actions.forEach(function (element) {
            return inverse_1.actions.unshift(invert(element));
        });
        return inverse_1;
    }
    var metaData = {
        derived: action.derived,
        checkValidity: action.checkValidity
    };
    if (isCreate(action))
        return __assign({ old: action["new"] }, metaData);
    else if (isDelete(action))
        return __assign({ "new": action.old }, metaData);
    else if (isMove(action))
        return __assign({ old: {
                parent: action["new"].parent,
                element: action.old.element,
                reference: action["new"].reference
            }, "new": { parent: action.old.parent, reference: action.old.reference } }, metaData);
    else if (isReplace(action))
        return __assign({ "new": action.old, old: action["new"] }, metaData);
    else if (isUpdate(action))
        return __assign({ element: action.element, oldAttributes: action.newAttributes, newAttributes: action.oldAttributes }, metaData);
    else
        return unreachable('Unknown EditorAction type in invert.');
}
exports.invert = invert;
//** return `Update` action for `element` adding `oldAttributes` */
function createUpdateAction(element, newAttributes) {
    var oldAttributes = {};
    Array.from(element.attributes).forEach(function (attr) {
        oldAttributes[attr.name] = attr.value;
    });
    return { element: element, oldAttributes: oldAttributes, newAttributes: newAttributes };
}
exports.createUpdateAction = createUpdateAction;
function newActionEvent(action, eventInitDict) {
    return new CustomEvent('editor-action', __assign(__assign({ bubbles: true, composed: true }, eventInitDict), { detail: __assign({ action: action }, eventInitDict === null || eventInitDict === void 0 ? void 0 : eventInitDict.detail) }));
}
exports.newActionEvent = newActionEvent;
exports.wizardInputSelector = 'wizard-textfield, mwc-textfield, ace-editor, mwc-select, wizard-select, wizard-checkbox';
function isWizardFactory(maybeFactory) {
    return typeof maybeFactory === 'function';
}
exports.isWizardFactory = isWizardFactory;
/** @returns the validity of `input` depending on type. */
function checkValidity(input) {
    if (input instanceof wizard_textfield_js_1.WizardTextField || input instanceof mwc_select_1.Select)
        return input.checkValidity();
    else
        return true;
}
exports.checkValidity = checkValidity;
/** reports the validity of `input` depending on type. */
function reportValidity(input) {
    if (input instanceof wizard_textfield_js_1.WizardTextField || input instanceof mwc_select_1.Select)
        return input.reportValidity();
    else
        return true;
}
exports.reportValidity = reportValidity;
/** @returns the `value` or `maybeValue` of `input` depending on type. */
function getValue(input) {
    var _a;
    if (input instanceof wizard_textfield_js_1.WizardTextField ||
        input instanceof wizard_select_js_1.WizardSelect ||
        input instanceof wizard_checkbox_js_1.WizardCheckbox)
        return input.maybeValue;
    else
        return (_a = input.value) !== null && _a !== void 0 ? _a : null;
}
exports.getValue = getValue;
/** @returns the `multiplier` of `input` if available. */
function getMultiplier(input) {
    if (input instanceof wizard_textfield_js_1.WizardTextField)
        return input.multiplier;
    else
        return null;
}
exports.getMultiplier = getMultiplier;
function newWizardEvent(wizardOrFactory, eventInitDict) {
    if (!wizardOrFactory)
        return new CustomEvent('wizard', __assign(__assign({ bubbles: true, composed: true }, eventInitDict), { detail: __assign({ wizard: null }, eventInitDict === null || eventInitDict === void 0 ? void 0 : eventInitDict.detail) }));
    var wizard = isWizardFactory(wizardOrFactory)
        ? wizardOrFactory
        : function () { return wizardOrFactory; };
    return new CustomEvent('wizard', __assign(__assign({ bubbles: true, composed: true }, eventInitDict), { detail: __assign({ wizard: wizard }, eventInitDict === null || eventInitDict === void 0 ? void 0 : eventInitDict.detail) }));
}
exports.newWizardEvent = newWizardEvent;
function newSubWizardEvent(wizardOrFactory) {
    return newWizardEvent(wizardOrFactory, { detail: { subwizard: true } });
}
exports.newSubWizardEvent = newSubWizardEvent;
function newLogEvent(detail, eventInitDict) {
    return new CustomEvent('log', __assign(__assign({ bubbles: true, composed: true }, eventInitDict), { detail: __assign(__assign({}, detail), eventInitDict === null || eventInitDict === void 0 ? void 0 : eventInitDict.detail) }));
}
exports.newLogEvent = newLogEvent;
function newIssueEvent(detail, eventInitDict) {
    return new CustomEvent('issue', __assign(__assign({ bubbles: true, composed: true }, eventInitDict), { detail: __assign(__assign({}, detail), eventInitDict === null || eventInitDict === void 0 ? void 0 : eventInitDict.detail) }));
}
exports.newIssueEvent = newIssueEvent;
/**
 * @deprecated
 */
function newPendingStateEvent(promise, eventInitDict) {
    return new CustomEvent('pending-state', __assign(__assign({ bubbles: true, composed: true }, eventInitDict), { detail: __assign({ promise: promise }, eventInitDict === null || eventInitDict === void 0 ? void 0 : eventInitDict.detail) }));
}
exports.newPendingStateEvent = newPendingStateEvent;
function newValidateEvent(eventInitDict) {
    return new CustomEvent('validate', __assign({ bubbles: true, composed: true }, eventInitDict));
}
exports.newValidateEvent = newValidateEvent;
function newOpenDocEvent(doc, docName, eventInitDict) {
    return new CustomEvent('open-doc', __assign(__assign({ bubbles: true, composed: true }, eventInitDict), { detail: __assign({ doc: doc, docName: docName }, eventInitDict === null || eventInitDict === void 0 ? void 0 : eventInitDict.detail) }));
}
exports.newOpenDocEvent = newOpenDocEvent;
/** @returns a reference to `element` with segments delimited by '/'. */
// TODO(c-dinkel): replace with identity (FIXME)
function referencePath(element) {
    var path = '';
    var nextParent = element.parentElement;
    while (nextParent === null || nextParent === void 0 ? void 0 : nextParent.getAttribute('name')) {
        path = '/' + nextParent.getAttribute('name') + path;
        nextParent = nextParent.parentElement;
    }
    return path;
}
exports.referencePath = referencePath;
function getSclSchemaVersion(doc) {
    var _a, _b, _c;
    var scl = doc.documentElement;
    var edition = ((_a = scl.getAttribute('version')) !== null && _a !== void 0 ? _a : '2003') +
        ((_b = scl.getAttribute('revision')) !== null && _b !== void 0 ? _b : '') +
        ((_c = scl.getAttribute('release')) !== null && _c !== void 0 ? _c : '');
    return edition;
}
exports.getSclSchemaVersion = getSclSchemaVersion;
/**
 * Extract the 'name' attribute from the given XML element.
 * @param element - The element to extract name from.
 * @returns the name, or undefined if there is no name.
 */
function getNameAttribute(element) {
    var name = element.getAttribute('name');
    return name ? name : undefined;
}
exports.getNameAttribute = getNameAttribute;
/**
 * Extract the 'desc' attribute from the given XML element.
 * @param element - The element to extract description from.
 * @returns the name, or undefined if there is no description.
 */
function getDescriptionAttribute(element) {
    var name = element.getAttribute('desc');
    return name ? name : undefined;
}
exports.getDescriptionAttribute = getDescriptionAttribute;
/**
 * Extract the 'pathName' attribute from the given XML element.
 * @param element - The element to extract path name from.
 * @returns the name, or undefined if there is no path name.
 */
function getPathNameAttribute(element) {
    var name = element.getAttribute('pathName');
    return name ? name : undefined;
}
exports.getPathNameAttribute = getPathNameAttribute;
/**
 * Extract the 'inst' attribute from the given XML element.
 * @param element - The element to extract instance from.
 * @returns the instance, or undefined if there is no instance.
 */
function getInstanceAttribute(element) {
    var inst = element.getAttribute('inst');
    return inst ? inst : undefined;
}
exports.getInstanceAttribute = getInstanceAttribute;
function pathParts(identity) {
    var _a;
    var path = identity.split('>');
    var end = (_a = path.pop()) !== null && _a !== void 0 ? _a : '';
    var start = path.join('>');
    return [start, end];
}
exports.pathParts = pathParts;
var voidSelector = ':not(*)';
function hitemIdentity(e) {
    return e.getAttribute('version') + "\t" + e.getAttribute('revision');
}
function hitemSelector(tagName, identity) {
    var _a = identity.split('\t'), version = _a[0], revision = _a[1];
    if (!version || !revision)
        return voidSelector;
    return tagName + "[version=\"" + version + "\"][revision=\"" + revision + "\"]";
}
function terminalIdentity(e) {
    return identity(e.parentElement) + '>' + e.getAttribute('connectivityNode');
}
function terminalSelector(tagName, identity) {
    var _a = pathParts(identity), parentIdentity = _a[0], connectivityNode = _a[1];
    var parentSelectors = exports.tags[tagName].parents.flatMap(function (parentTag) {
        return selector(parentTag, parentIdentity).split(',');
    });
    return crossProduct(parentSelectors, ['>'], [tagName + "[connectivityNode=\"" + connectivityNode + "\"]"])
        .map(function (strings) { return strings.join(''); })
        .join(',');
}
function lNodeIdentity(e) {
    var _a = [
        'iedName',
        'ldInst',
        'prefix',
        'lnClass',
        'lnInst',
        'lnType',
    ].map(function (name) { return e.getAttribute(name); }), iedName = _a[0], ldInst = _a[1], prefix = _a[2], lnClass = _a[3], lnInst = _a[4], lnType = _a[5];
    if (iedName === 'None')
        return identity(e.parentElement) + ">(" + lnClass + " " + lnType + ")";
    return iedName + " " + (ldInst || '(Client)') + "/" + (prefix !== null && prefix !== void 0 ? prefix : '') + " " + lnClass + " " + (lnInst !== null && lnInst !== void 0 ? lnInst : '');
}
function lNodeSelector(tagName, identity) {
    if (identity.endsWith(')')) {
        var _a = pathParts(identity), parentIdentity_1 = _a[0], childIdentity = _a[1];
        var _b = childIdentity
            .substring(1, childIdentity.length - 1)
            .split(' '), lnClass_1 = _b[0], lnType = _b[1];
        if (!lnClass_1 || !lnType)
            return voidSelector;
        var parentSelectors = exports.tags[tagName].parents.flatMap(function (parentTag) {
            return selector(parentTag, parentIdentity_1).split(',');
        });
        return crossProduct(parentSelectors, ['>'], [tagName + "[iedName=\"None\"][lnClass=\"" + lnClass_1 + "\"][lnType=\"" + lnType + "\"]"])
            .map(function (strings) { return strings.join(''); })
            .join(',');
    }
    var _c = identity.split(/[ /]/), iedName = _c[0], ldInst = _c[1], prefix = _c[2], lnClass = _c[3], lnInst = _c[4];
    if (!iedName || !ldInst || !lnClass)
        return voidSelector;
    var _d = [
        ["[iedName=\"" + iedName + "\"]"],
        ldInst === '(Client)'
            ? [':not([ldInst])', '[ldInst=""]']
            : ["[ldInst=\"" + ldInst + "\"]"],
        prefix ? ["[prefix=\"" + prefix + "\"]"] : [':not([prefix])', '[prefix=""]'],
        ["[lnClass=\"" + lnClass + "\"]"],
        lnInst ? ["[lnInst=\"" + lnInst + "\"]"] : [':not([lnInst])', '[lnInst=""]'],
    ], iedNameSelectors = _d[0], ldInstSelectors = _d[1], prefixSelectors = _d[2], lnClassSelectors = _d[3], lnInstSelectors = _d[4];
    return crossProduct([tagName], iedNameSelectors, ldInstSelectors, prefixSelectors, lnClassSelectors, lnInstSelectors)
        .map(function (strings) { return strings.join(''); })
        .join(',');
}
function kDCIdentity(e) {
    return identity(e.parentElement) + ">" + e.getAttribute('iedName') + " " + e.getAttribute('apName');
}
function kDCSelector(tagName, identity) {
    var _a = pathParts(identity), parentIdentity = _a[0], childIdentity = _a[1];
    var _b = childIdentity.split(' '), iedName = _b[0], apName = _b[1];
    return selector('IED', parentIdentity) + ">" + tagName + "[iedName=\"" + iedName + "\"][apName=\"" + apName + "\"]";
}
function associationIdentity(e) {
    var _a;
    return identity(e.parentElement) + ">" + ((_a = e.getAttribute('associationID')) !== null && _a !== void 0 ? _a : '');
}
function associationSelector(tagName, identity) {
    var _a = pathParts(identity), parentIdentity = _a[0], associationID = _a[1];
    if (!associationID)
        return voidSelector;
    return selector('Server', parentIdentity) + ">" + tagName + "[associationID=\"" + associationID + "\"]";
}
function lDeviceIdentity(e) {
    return identity(e.closest('IED')) + ">>" + e.getAttribute('inst');
}
function lDeviceSelector(tagName, identity) {
    var _a = identity.split('>>'), iedName = _a[0], inst = _a[1];
    if (!inst)
        return voidSelector;
    return "IED[name=\"" + iedName + "\"] " + tagName + "[inst=\"" + inst + "\"]";
}
function iEDNameIdentity(e) {
    var iedName = e.textContent;
    var _a = [
        'apRef',
        'ldInst',
        'prefix',
        'lnClass',
        'lnInst',
    ].map(function (name) { return e.getAttribute(name); }), apRef = _a[0], ldInst = _a[1], prefix = _a[2], lnClass = _a[3], lnInst = _a[4];
    return identity(e.parentElement) + ">" + iedName + " " + (apRef ? apRef : '') + " " + (ldInst ? ldInst : '') + "/" + (prefix !== null && prefix !== void 0 ? prefix : '') + " " + (lnClass !== null && lnClass !== void 0 ? lnClass : '') + " " + (lnInst !== null && lnInst !== void 0 ? lnInst : '');
}
function iEDNameSelector(tagName, identity) {
    var _a = pathParts(identity), parentIdentity = _a[0], childIdentity = _a[1];
    var _b = childIdentity.split(/[ /]/), iedName = _b[0], apRef = _b[1], ldInst = _b[2], prefix = _b[3], lnClass = _b[4], lnInst = _b[5];
    var _c = [
        exports.tags[tagName].parents.flatMap(function (parentTag) {
            return selector(parentTag, parentIdentity).split(',');
        }),
        ["" + iedName],
        apRef ? ["[apRef=\"" + apRef + "\"]"] : [':not([apRef])', '[apRef=""]'],
        ldInst ? ["[ldInst=\"" + ldInst + "\"]"] : [':not([ldInst])', '[ldInst=""]'],
        prefix ? ["[prefix=\"" + prefix + "\"]"] : [':not([prefix])', '[prefix=""]'],
        ["[lnClass=\"" + lnClass + "\"]"],
        lnInst ? ["[lnInst=\"" + lnInst + "\"]"] : [':not([lnInst])', '[lnInst=""]'],
    ], parentSelectors = _c[0], apRefSelectors = _c[1], ldInstSelectors = _c[2], prefixSelectors = _c[3], lnClassSelectors = _c[4], lnInstSelectors = _c[5];
    return crossProduct(parentSelectors, ['>'], [tagName], apRefSelectors, ldInstSelectors, prefixSelectors, lnClassSelectors, lnInstSelectors)
        .map(function (strings) { return strings.join(''); })
        .join(',');
}
function fCDAIdentity(e) {
    var _a = [
        'ldInst',
        'prefix',
        'lnClass',
        'lnInst',
        'doName',
        'daName',
        'fc',
        'ix',
    ].map(function (name) { return e.getAttribute(name); }), ldInst = _a[0], prefix = _a[1], lnClass = _a[2], lnInst = _a[3], doName = _a[4], daName = _a[5], fc = _a[6], ix = _a[7];
    var dataPath = ldInst + "/" + (prefix !== null && prefix !== void 0 ? prefix : '') + " " + lnClass + " " + (lnInst !== null && lnInst !== void 0 ? lnInst : '') + "." + doName + " " + (daName ? daName : '');
    return identity(e.parentElement) + ">" + dataPath + " (" + fc + (ix ? ' [' + ix + ']' : '') + ")";
}
function fCDASelector(tagName, identity) {
    var _a = pathParts(identity), parentIdentity = _a[0], childIdentity = _a[1];
    var _b = childIdentity.split(/[ /.]/), ldInst = _b[0], prefix = _b[1], lnClass = _b[2], lnInst = _b[3];
    var matchDoDa = childIdentity.match(/.([A-Z][A-Za-z0-9.]*) ([A-Za-z0-9.]*) \(/);
    var doName = matchDoDa && matchDoDa[1] ? matchDoDa[1] : '';
    var daName = matchDoDa && matchDoDa[2] ? matchDoDa[2] : '';
    var matchFx = childIdentity.match(/\(([A-Z]{2})/);
    var matchIx = childIdentity.match(/ \[([0-9]{1,2})\]/);
    var fc = matchFx && matchFx[1] ? matchFx[1] : '';
    var ix = matchIx && matchIx[1] ? matchIx[1] : '';
    var _c = [
        exports.tags[tagName].parents.flatMap(function (parentTag) {
            return selector(parentTag, parentIdentity).split(',');
        }),
        ["[ldInst=\"" + ldInst + "\"]"],
        prefix ? ["[prefix=\"" + prefix + "\"]"] : [':not([prefix])', '[prefix=""]'],
        ["[lnClass=\"" + lnClass + "\"]"],
        lnInst ? ["[lnInst=\"" + lnInst + "\"]"] : [':not([lnInst])', '[lnInst=""]'],
        ["[doName=\"" + doName + "\"]"],
        daName ? ["[daName=\"" + daName + "\"]"] : [':not([daName])', '[daName=""]'],
        ["[fc=\"" + fc + "\"]"],
        ix ? ["[ix=\"" + ix + "\"]"] : [':not([ix])', '[ix=""]'],
    ], parentSelectors = _c[0], ldInstSelectors = _c[1], prefixSelectors = _c[2], lnClassSelectors = _c[3], lnInstSelectors = _c[4], doNameSelectors = _c[5], daNameSelectors = _c[6], fcSelectors = _c[7], ixSelectors = _c[8];
    return crossProduct(parentSelectors, ['>'], [tagName], ldInstSelectors, prefixSelectors, lnClassSelectors, lnInstSelectors, doNameSelectors, daNameSelectors, fcSelectors, ixSelectors)
        .map(function (strings) { return strings.join(''); })
        .join(',');
}
function extRefIdentity(e) {
    if (!e.parentElement)
        return NaN;
    var parentIdentity = identity(e.parentElement);
    var iedName = e.getAttribute('iedName');
    var intAddr = e.getAttribute('intAddr');
    var intAddrIndex = Array.from(e.parentElement.querySelectorAll("ExtRef[intAddr=\"" + intAddr + "\"]")).indexOf(e);
    if (intAddr)
        return parentIdentity + ">" + intAddr + "[" + intAddrIndex + "]";
    var _a = [
        'ldInst',
        'prefix',
        'lnClass',
        'lnInst',
        'doName',
        'daName',
        'serviceType',
        'srcLDInst',
        'srcPrefix',
        'srcLNClass',
        'srcLNInst',
        'srcCBName',
    ].map(function (name) { return e.getAttribute(name); }), ldInst = _a[0], prefix = _a[1], lnClass = _a[2], lnInst = _a[3], doName = _a[4], daName = _a[5], serviceType = _a[6], srcLDInst = _a[7], srcPrefix = _a[8], srcLNClass = _a[9], srcLNInst = _a[10], srcCBName = _a[11];
    var cbPath = srcCBName
        ? serviceType + ":" + srcCBName + " " + (srcLDInst !== null && srcLDInst !== void 0 ? srcLDInst : '') + "/" + (srcPrefix !== null && srcPrefix !== void 0 ? srcPrefix : '') + " " + (srcLNClass !== null && srcLNClass !== void 0 ? srcLNClass : '') + " " + (srcLNInst !== null && srcLNInst !== void 0 ? srcLNInst : '')
        : '';
    var dataPath = iedName + " " + ldInst + "/" + (prefix !== null && prefix !== void 0 ? prefix : '') + " " + lnClass + " " + (lnInst !== null && lnInst !== void 0 ? lnInst : '') + " " + doName + " " + (daName ? daName : '');
    return parentIdentity + ">" + (cbPath ? cbPath + ' ' : '') + dataPath + (intAddr ? '@' + ("" + intAddr) : '');
}
function extRefSelector(tagName, identity) {
    var _a, _b, _c, _d;
    var _e = pathParts(identity), parentIdentity = _e[0], childIdentity = _e[1];
    var parentSelectors = exports.tags[tagName].parents.flatMap(function (parentTag) {
        return selector(parentTag, parentIdentity).split(',');
    });
    if (childIdentity.endsWith(']')) {
        var intAddr_1 = childIdentity.split('[')[0];
        var intAddrSelectors_1 = ["[intAddr=\"" + intAddr_1 + "\"]"];
        return crossProduct(parentSelectors, ['>'], [tagName], intAddrSelectors_1)
            .map(function (strings) { return strings.join(''); })
            .join(',');
    }
    var iedName, ldInst, prefix, lnClass, lnInst, doName, daName, serviceType, srcCBName, srcLDInst, srcPrefix, srcLNClass, srcLNInst, intAddr;
    if (!childIdentity.includes(':') && !childIdentity.includes('@')) {
        _a = childIdentity.split(/[ /]/), iedName = _a[0], ldInst = _a[1], prefix = _a[2], lnClass = _a[3], lnInst = _a[4], doName = _a[5], daName = _a[6];
    }
    else if (childIdentity.includes(':') && !childIdentity.includes('@')) {
        _b = childIdentity.split(/[ /:]/), serviceType = _b[0], srcCBName = _b[1], srcLDInst = _b[2], srcPrefix = _b[3], srcLNClass = _b[4], srcLNInst = _b[5], iedName = _b[6], ldInst = _b[7], prefix = _b[8], lnClass = _b[9], lnInst = _b[10], doName = _b[11], daName = _b[12];
    }
    else if (!childIdentity.includes(':') && childIdentity.includes('@')) {
        _c = childIdentity.split(/[ /@]/), iedName = _c[0], ldInst = _c[1], prefix = _c[2], lnClass = _c[3], lnInst = _c[4], doName = _c[5], daName = _c[6], intAddr = _c[7];
    }
    else {
        _d = childIdentity.split(/[ /:@]/), serviceType = _d[0], srcCBName = _d[1], srcLDInst = _d[2], srcPrefix = _d[3], srcLNClass = _d[4], srcLNInst = _d[5], iedName = _d[6], ldInst = _d[7], prefix = _d[8], lnClass = _d[9], lnInst = _d[10], doName = _d[11], daName = _d[12], intAddr = _d[13];
    }
    var _f = [
        iedName ? ["[iedName=\"" + iedName + "\"]"] : [':not([iedName])'],
        ldInst ? ["[ldInst=\"" + ldInst + "\"]"] : [':not([ldInst])', '[ldInst=""]'],
        prefix ? ["[prefix=\"" + prefix + "\"]"] : [':not([prefix])', '[prefix=""]'],
        lnClass ? ["[lnClass=\"" + lnClass + "\"]"] : [':not([lnClass])'],
        lnInst ? ["[lnInst=\"" + lnInst + "\"]"] : [':not([lnInst])', '[lnInst=""]'],
        doName ? ["[doName=\"" + doName + "\"]"] : [':not([doName])'],
        daName ? ["[daName=\"" + daName + "\"]"] : [':not([daName])', '[daName=""]'],
        serviceType
            ? ["[serviceType=\"" + serviceType + "\"]"]
            : [':not([serviceType])', '[serviceType=""]'],
        srcCBName
            ? ["[srcCBName=\"" + srcCBName + "\"]"]
            : [':not([srcCBName])', '[srcCBName=""]'],
        srcLDInst
            ? ["[srcLDInst=\"" + srcLDInst + "\"]"]
            : [':not([srcLDInst])', '[srcLDInst=""]'],
        srcPrefix
            ? ["[srcPrefix=\"" + srcPrefix + "\"]"]
            : [':not([srcPrefix])', '[srcPrefix=""]'],
        srcLNClass
            ? ["[srcLNClass=\"" + srcLNClass + "\"]"]
            : [':not([srcLNClass])', '[srcLNClass=""]'],
        srcLNInst
            ? ["[srcLNInst=\"" + srcLNInst + "\"]"]
            : [':not([srcLNInst])', '[srcLNInst=""]'],
        intAddr ? ["[intAddr=\"" + intAddr + "\"]"] : [':not([intAddr])', '[intAddr=""]'],
    ], iedNameSelectors = _f[0], ldInstSelectors = _f[1], prefixSelectors = _f[2], lnClassSelectors = _f[3], lnInstSelectors = _f[4], doNameSelectors = _f[5], daNameSelectors = _f[6], serviceTypeSelectors = _f[7], srcCBNameSelectors = _f[8], srcLDInstSelectors = _f[9], srcPrefixSelectors = _f[10], srcLNClassSelectors = _f[11], srcLNInstSelectors = _f[12], intAddrSelectors = _f[13];
    return crossProduct(parentSelectors, ['>'], [tagName], iedNameSelectors, ldInstSelectors, prefixSelectors, lnClassSelectors, lnInstSelectors, doNameSelectors, daNameSelectors, serviceTypeSelectors, srcCBNameSelectors, srcLDInstSelectors, srcPrefixSelectors, srcLNClassSelectors, srcLNInstSelectors, intAddrSelectors)
        .map(function (strings) { return strings.join(''); })
        .join(',');
}
function lNIdentity(e) {
    var _a = ['prefix', 'lnClass', 'inst'].map(function (name) {
        return e.getAttribute(name);
    }), prefix = _a[0], lnClass = _a[1], inst = _a[2];
    return identity(e.parentElement) + ">" + (prefix !== null && prefix !== void 0 ? prefix : '') + " " + lnClass + " " + inst;
}
function lNSelector(tagName, identity) {
    var _a = pathParts(identity), parentIdentity = _a[0], childIdentity = _a[1];
    var parentSelectors = exports.tags[tagName].parents.flatMap(function (parentTag) {
        return selector(parentTag, parentIdentity).split(',');
    });
    var _b = childIdentity.split(' '), prefix = _b[0], lnClass = _b[1], inst = _b[2];
    if (!lnClass)
        return voidSelector;
    var _c = [
        prefix ? ["[prefix=\"" + prefix + "\"]"] : [':not([prefix])', '[prefix=""]'],
        ["[lnClass=\"" + lnClass + "\"]"],
        ["[inst=\"" + inst + "\"]"],
    ], prefixSelectors = _c[0], lnClassSelectors = _c[1], instSelectors = _c[2];
    return crossProduct(parentSelectors, ['>'], [tagName], prefixSelectors, lnClassSelectors, instSelectors)
        .map(function (strings) { return strings.join(''); })
        .join(',');
}
function clientLNIdentity(e) {
    var _a = [
        'apRef',
        'iedName',
        'ldInst',
        'prefix',
        'lnClass',
        'lnInst',
    ].map(function (name) { return e.getAttribute(name); }), apRef = _a[0], iedName = _a[1], ldInst = _a[2], prefix = _a[3], lnClass = _a[4], lnInst = _a[5];
    return identity(e.parentElement) + ">" + iedName + " " + (apRef ? apRef : '') + " " + ldInst + "/" + (prefix !== null && prefix !== void 0 ? prefix : '') + " " + lnClass + " " + lnInst;
}
function clientLNSelector(tagName, identity) {
    var _a = pathParts(identity), parentIdentity = _a[0], childIdentity = _a[1];
    var parentSelectors = exports.tags[tagName].parents.flatMap(function (parentTag) {
        return selector(parentTag, parentIdentity).split(',');
    });
    var _b = childIdentity.split(/[ /]/), iedName = _b[0], apRef = _b[1], ldInst = _b[2], prefix = _b[3], lnClass = _b[4], lnInst = _b[5];
    var _c = [
        iedName ? ["[iedName=\"" + iedName + "\"]"] : [':not([iedName])', '[iedName=""]'],
        apRef ? ["[apRef=\"" + apRef + "\"]"] : [':not([apRef])', '[apRef=""]'],
        ldInst ? ["[ldInst=\"" + ldInst + "\"]"] : [':not([ldInst])', '[ldInst=""]'],
        prefix ? ["[prefix=\"" + prefix + "\"]"] : [':not([prefix])', '[prefix=""]'],
        ["[lnClass=\"" + lnClass + "\"]"],
        lnInst ? ["[lnInst=\"" + lnInst + "\"]"] : [':not([lnInst])', '[lnInst=""]'],
    ], iedNameSelectors = _c[0], apRefSelectors = _c[1], ldInstSelectors = _c[2], prefixSelectors = _c[3], lnClassSelectors = _c[4], lnInstSelectors = _c[5];
    return crossProduct(parentSelectors, ['>'], [tagName], iedNameSelectors, apRefSelectors, ldInstSelectors, prefixSelectors, lnClassSelectors, lnInstSelectors)
        .map(function (strings) { return strings.join(''); })
        .join(',');
}
function ixNamingIdentity(e) {
    var _a = ['name', 'ix'].map(function (name) { return e.getAttribute(name); }), name = _a[0], ix = _a[1];
    return identity(e.parentElement) + ">" + name + (ix ? '[' + ix + ']' : '');
}
function ixNamingSelector(tagName, identity, depth) {
    var _a;
    if (depth === void 0) { depth = -1; }
    if (depth === -1)
        depth = identity.split('>').length;
    var _b = pathParts(identity), parentIdentity = _b[0], childIdentity = _b[1];
    var _c = (_a = childIdentity.match(/([^[]*)(\[([0-9]*)\])?/)) !== null && _a !== void 0 ? _a : [], _0 = _c[0], name = _c[1], _1 = _c[2], ix = _c[3];
    if (!name)
        return voidSelector;
    if (depth === 0)
        return tagName + "[name=\"" + name + "\"]";
    var parentSelectors = exports.tags[tagName].parents
        .flatMap(function (parentTag) {
        return parentTag === 'SDI'
            ? ixNamingSelector(parentTag, parentIdentity, depth - 1).split(',')
            : selector(parentTag, parentIdentity).split(',');
    })
        .filter(function (selector) { return !selector.startsWith(voidSelector); });
    if (parentSelectors.length === 0)
        return voidSelector;
    var _d = [
        ["[name=\"" + name + "\"]"],
        ix ? ["[ix=\"" + ix + "\"]"] : ['[ix=""]', ':not([ix])'],
    ], nameSelectors = _d[0], ixSelectors = _d[1];
    return crossProduct(parentSelectors, ['>'], [tagName], nameSelectors, ixSelectors)
        .map(function (strings) { return strings.join(''); })
        .join(',');
}
function valIdentity(e) {
    if (!e.parentElement)
        return NaN;
    var sGroup = e.getAttribute('sGroup');
    var index = Array.from(e.parentElement.children)
        .filter(function (child) { return child.getAttribute('sGroup') === sGroup; })
        .findIndex(function (child) { return child.isSameNode(e); });
    return identity(e.parentElement) + ">" + (sGroup ? sGroup + '.' : '') + " " + index;
}
function valSelector(tagName, identity) {
    var _a = pathParts(identity), parentIdentity = _a[0], childIdentity = _a[1];
    var _b = childIdentity.split(' '), sGroup = _b[0], indexText = _b[1];
    var index = parseFloat(indexText);
    var parentSelectors = exports.tags[tagName].parents.flatMap(function (parentTag) {
        return selector(parentTag, parentIdentity).split(',');
    });
    var _c = [
        sGroup ? ["[sGroup=\"" + sGroup + "\"]"] : [''],
        index ? [":nth-child(" + (index + 1) + ")"] : [''],
    ], nameSelectors = _c[0], ixSelectors = _c[1];
    return crossProduct(parentSelectors, ['>'], [tagName], nameSelectors, ixSelectors)
        .map(function (strings) { return strings.join(''); })
        .join(',');
}
function connectedAPIdentity(e) {
    var _a = ['iedName', 'apName'].map(function (name) {
        return e.getAttribute(name);
    }), iedName = _a[0], apName = _a[1];
    return iedName + " " + apName;
}
function connectedAPSelector(tagName, identity) {
    var _a = identity.split(' '), iedName = _a[0], apName = _a[1];
    if (!iedName || !apName)
        return voidSelector;
    return tagName + "[iedName=\"" + iedName + "\"][apName=\"" + apName + "\"]";
}
function controlBlockIdentity(e) {
    var _a = ['ldInst', 'cbName'].map(function (name) {
        return e.getAttribute(name);
    }), ldInst = _a[0], cbName = _a[1];
    return ldInst + " " + cbName;
}
function controlBlockSelector(tagName, identity) {
    var _a = identity.split(' '), ldInst = _a[0], cbName = _a[1];
    if (!ldInst || !cbName)
        return voidSelector;
    return tagName + "[ldInst=\"" + ldInst + "\"][cbName=\"" + cbName + "\"]";
}
function physConnIdentity(e) {
    if (!e.parentElement)
        return NaN;
    if (!e.parentElement.querySelector('PhysConn[type="RedConn"]'))
        return NaN;
    var pcType = e.getAttribute('type');
    if (e.parentElement.children.length > 1 &&
        pcType !== 'Connection' &&
        pcType !== 'RedConn')
        return NaN;
    return identity(e.parentElement) + ">" + pcType;
}
function physConnSelector(tagName, identity) {
    var _a = pathParts(identity), parentIdentity = _a[0], pcType = _a[1];
    var _b = [
        exports.tags[tagName].parents.flatMap(function (parentTag) {
            return selector(parentTag, parentIdentity).split(',');
        }),
        pcType ? ["[type=\"" + pcType + "\"]"] : [''],
    ], parentSelectors = _b[0], typeSelectors = _b[1];
    return crossProduct(parentSelectors, ['>'], [tagName], typeSelectors)
        .map(function (strings) { return strings.join(''); })
        .join(',');
}
function pIdentity(e) {
    if (!e.parentElement)
        return NaN;
    var eParent = e.parentElement;
    var eType = e.getAttribute('type');
    if (eParent.tagName === 'PhysConn')
        return identity(e.parentElement) + ">" + eType;
    var index = Array.from(e.parentElement.children)
        .filter(function (child) { return child.getAttribute('type') === eType; })
        .findIndex(function (child) { return child.isSameNode(e); });
    return identity(e.parentElement) + ">" + eType + " [" + index + "]";
}
function pSelector(tagName, identity) {
    var _a = pathParts(identity), parentIdentity = _a[0], childIdentity = _a[1];
    var type = childIdentity.split(' ')[0];
    var index = childIdentity &&
        childIdentity.match(/\[([0-9]+)\]/) &&
        childIdentity.match(/\[([0-9]+)\]/)[1]
        ? parseFloat(childIdentity.match(/\[([0-9]+)\]/)[1])
        : NaN;
    var _b = [
        exports.tags[tagName].parents.flatMap(function (parentTag) {
            return selector(parentTag, parentIdentity).split(',');
        }),
        ["[type=\"" + type + "\"]"],
        index ? [":nth-child(" + (index + 1) + ")"] : [''],
    ], parentSelectors = _b[0], typeSelectors = _b[1], ixSelectors = _b[2];
    return crossProduct(parentSelectors, ['>'], [tagName], typeSelectors, ixSelectors)
        .map(function (strings) { return strings.join(''); })
        .join(',');
}
function enumValIdentity(e) {
    return identity(e.parentElement) + ">" + e.getAttribute('ord');
}
function enumValSelector(tagName, identity) {
    var _a = pathParts(identity), parentIdentity = _a[0], ord = _a[1];
    return selector('EnumType', parentIdentity) + ">" + tagName + "[ord=\"" + ord + "\"]";
}
function protNsIdentity(e) {
    return identity(e.parentElement) + ">" + (e.getAttribute('type') || '8-MMS') + "\t" + e.textContent;
}
function protNsSelector(tagName, identity) {
    var _a = pathParts(identity), parentIdentity = _a[0], childIdentity = _a[1];
    var _b = childIdentity.split('\t'), type = _b[0], value = _b[1];
    var parentSelectors = [
        exports.tags[tagName].parents.flatMap(function (parentTag) {
            return selector(parentTag, parentIdentity).split(',');
        }),
    ][0];
    return crossProduct(parentSelectors, ['>'], [tagName], ["[type=\"" + type + "\"]"], ['>'], [value])
        .map(function (strings) { return strings.join(''); })
        .join(',');
}
function sCLIdentity() {
    return '';
}
function sCLSelector() {
    return ':root';
}
function namingIdentity(e) {
    return e.parentElement.tagName === 'SCL'
        ? e.getAttribute('name')
        : identity(e.parentElement) + ">" + e.getAttribute('name');
}
function namingSelector(tagName, identity, depth) {
    if (depth === void 0) { depth = -1; }
    if (depth === -1)
        depth = identity.split('>').length;
    var _a = pathParts(identity), parentIdentity = _a[0], name = _a[1];
    if (!name)
        return voidSelector;
    if (depth === 0)
        return tagName + "[name=\"" + name + "\"]";
    var parents = exports.tags[tagName].parents;
    if (!parents)
        return voidSelector;
    var parentSelectors = parents
        .flatMap(function (parentTag) {
        return exports.tags[parentTag].selector === exports.tags['Substation'].selector
            ? namingSelector(parentTag, parentIdentity, depth - 1).split(',')
            : selector(parentTag, parentIdentity).split(',');
    })
        .filter(function (selector) { return !selector.startsWith(voidSelector); });
    if (parentSelectors.length === 0)
        return voidSelector;
    return crossProduct(parentSelectors, ['>'], [tagName], ["[name=\"" + name + "\"]"])
        .map(function (strings) { return strings.join(''); })
        .join(',');
}
function singletonIdentity(e) {
    return identity(e.parentElement).toString();
}
function singletonSelector(tagName, identity) {
    var parents = exports.tags[tagName].parents;
    if (!parents)
        return voidSelector;
    var parentSelectors = parents
        .flatMap(function (parentTag) { return selector(parentTag, identity).split(','); })
        .filter(function (selector) { return !selector.startsWith(voidSelector); });
    if (parentSelectors.length === 0)
        return voidSelector;
    return crossProduct(parentSelectors, ['>'], [tagName])
        .map(function (strings) { return strings.join(''); })
        .join(',');
}
function idNamingIdentity(e) {
    return "#" + e.id;
}
function idNamingSelector(tagName, identity) {
    var id = identity.replace(/^#/, '');
    if (!id)
        return voidSelector;
    return tagName + "[id=\"" + id + "\"]";
}
var tAbstractConductingEquipment = [
    'TransformerWinding',
    'ConductingEquipment',
];
var tEquipment = __spreadArrays([
    'GeneralEquipment',
    'PowerTransformer'
], tAbstractConductingEquipment);
var tEquipmentContainer = ['Substation', 'VoltageLevel', 'Bay'];
var tGeneralEquipmentContainer = ['Process', 'Line'];
var tAbstractEqFuncSubFunc = ['EqSubFunction', 'EqFunction'];
var tPowerSystemResource = __spreadArrays([
    'SubFunction',
    'Function',
    'TapChanger',
    'SubEquipment'
], tEquipment, tEquipmentContainer, tGeneralEquipmentContainer, tAbstractEqFuncSubFunc);
var tLNodeContainer = __spreadArrays(['ConnectivityNode'], tPowerSystemResource);
var tCertificate = ['GOOSESecurity', 'SMVSecurity'];
var tNaming = __spreadArrays(['SubNetwork'], tCertificate, tLNodeContainer);
var tAbstractDataAttribute = ['BDA', 'DA'];
var tControlWithIEDName = ['SampledValueControl', 'GSEControl'];
var tControlWithTriggerOpt = ['LogControl', 'ReportControl'];
var tControl = __spreadArrays(tControlWithIEDName, tControlWithTriggerOpt);
var tControlBlock = ['GSE', 'SMV'];
var tUnNaming = __spreadArrays([
    'ConnectedAP',
    'PhysConn',
    'SDO',
    'DO',
    'DAI',
    'SDI',
    'DOI',
    'Inputs',
    'RptEnabled',
    'Server',
    'ServerAt',
    'SettingControl',
    'Communication',
    'Log',
    'LDevice',
    'DataSet',
    'AccessPoint',
    'IED',
    'NeutralPoint'
], tControl, tControlBlock, tAbstractDataAttribute);
var tAnyLN = ['LN0', 'LN'];
var tAnyContentFromOtherNamespace = [
    'Text',
    'Private',
    'Hitem',
    'AccessControl',
];
var tCert = ['Subject', 'IssuerName'];
var tDurationInMilliSec = ['MinTime', 'MaxTime'];
var tIDNaming = ['LNodeType', 'DOType', 'DAType', 'EnumType'];
var tServiceYesNo = [
    'FileHandling',
    'TimeSyncProt',
    'CommProt',
    'SGEdit',
    'ConfSG',
    'GetDirectory',
    'GetDataObjectDefinition',
    'DataObjectDirectory',
    'GetDataSetValue',
    'SetDataSetValue',
    'DataSetDirectory',
    'ReadWrite',
    'TimerActivatedControl',
    'GetCBValues',
    'GSEDir',
    'ConfLdName',
];
var tServiceWithMaxAndMaxAttributes = ['DynDataSet', 'ConfDataSet'];
var tServiceWithMax = __spreadArrays([
    'GSSE',
    'GOOSE',
    'ConfReportControl',
    'SMVsc'
], tServiceWithMaxAndMaxAttributes);
var tServiceWithMaxNonZero = ['ConfLogControl', 'ConfSigRef'];
var tServiceSettings = [
    'ReportSettings',
    'LogSettings',
    'GSESettings',
    'SMVSettings',
];
var tBaseElement = __spreadArrays(['SCL'], tNaming, tUnNaming, tIDNaming);
var sCLTags = __spreadArrays(tBaseElement, tAnyContentFromOtherNamespace, [
    'Header',
    'LNode',
    'Val',
    'Voltage',
    'Services'
], tCert, tDurationInMilliSec, [
    'Association',
    'FCDA',
    'ClientLN',
    'IEDName',
    'ExtRef',
    'Protocol'
], tAnyLN, tServiceYesNo, [
    'DynAssociation',
    'SettingGroups'
], tServiceWithMax, tServiceWithMaxNonZero, tServiceSettings, [
    'ConfLNs',
    'ClientServices',
    'SupSubscription',
    'ValueHandling',
    'RedProt',
    'McSecurity',
    'KDC',
    'Address',
    'P',
    'ProtNs',
    'EnumVal',
    'Terminal',
    'BitRate',
    'Authentication',
    'DataTypeTemplates',
    'History',
    'OptFields',
    'SmvOpts',
    'TrgOps',
    'SamplesPerSec',
    'SmpRate',
    'SecPerSamples',
]);
var tagSet = new Set(sCLTags);
function isSCLTag(tag) {
    return tagSet.has(tag);
}
var tBaseNameSequence = ['Text', 'Private'];
var tNamingSequence = __spreadArrays(tBaseNameSequence);
var tUnNamingSequence = __spreadArrays(tBaseNameSequence);
var tIDNamingSequence = __spreadArrays(tBaseNameSequence);
var tAbstractDataAttributeSequence = __spreadArrays(tUnNamingSequence, ['Val']);
var tLNodeContainerSequence = __spreadArrays(tNamingSequence, ['LNode']);
var tPowerSystemResourceSequence = __spreadArrays(tLNodeContainerSequence);
var tEquipmentSequence = __spreadArrays(tPowerSystemResourceSequence);
var tEquipmentContainerSequence = __spreadArrays(tPowerSystemResourceSequence, [
    'PowerTransformer',
    'GeneralEquipment',
]);
var tAbstractConductingEquipmentSequence = __spreadArrays(tEquipmentSequence, [
    'Terminal',
]);
var tControlBlockSequence = __spreadArrays(tUnNamingSequence, ['Address']);
var tControlSequence = __spreadArrays(tNamingSequence);
var tControlWithIEDNameSequence = __spreadArrays(tControlSequence, ['IEDName']);
var tAnyLNSequence = __spreadArrays(tUnNamingSequence, [
    'DataSet',
    'ReportControl',
    'LogControl',
    'DOI',
    'Inputs',
    'Log',
]);
var tGeneralEquipmentContainerSequence = __spreadArrays(tPowerSystemResourceSequence, [
    'GeneralEquipment',
    'Function',
]);
var tControlWithTriggerOptSequence = __spreadArrays(tControlSequence, ['TrgOps']);
var tAbstractEqFuncSubFuncSequence = __spreadArrays(tPowerSystemResourceSequence, [
    'GeneralEquipment',
    'EqSubFunction',
]);
exports.tags = {
    AccessControl: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['LDevice'],
        children: []
    },
    AccessPoint: {
        identity: namingIdentity,
        selector: namingSelector,
        parents: ['IED'],
        children: __spreadArrays(tNamingSequence, [
            'Server',
            'LN',
            'ServerAt',
            'Services',
            'GOOSESecurity',
            'SMVSecurity',
        ])
    },
    Address: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['ConnectedAP', 'GSE', 'SMV'],
        children: ['P']
    },
    Association: {
        identity: associationIdentity,
        selector: associationSelector,
        parents: ['Server'],
        children: []
    },
    Authentication: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Server'],
        children: []
    },
    BDA: {
        identity: namingIdentity,
        selector: namingSelector,
        parents: ['DAType'],
        children: __spreadArrays(tAbstractDataAttributeSequence)
    },
    BitRate: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['SubNetwork'],
        children: []
    },
    Bay: {
        identity: namingIdentity,
        selector: namingSelector,
        parents: ['VoltageLevel'],
        children: __spreadArrays(tEquipmentContainerSequence, [
            'ConductingEquipment',
            'ConnectivityNode',
            'Function',
        ])
    },
    ClientLN: {
        identity: clientLNIdentity,
        selector: clientLNSelector,
        parents: ['RptEnabled'],
        children: []
    },
    ClientServices: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Services'],
        children: ['TimeSyncProt', 'McSecurity']
    },
    CommProt: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Services'],
        children: []
    },
    Communication: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['SCL'],
        children: __spreadArrays(tUnNamingSequence, ['SubNetwork'])
    },
    ConductingEquipment: {
        identity: namingIdentity,
        selector: namingSelector,
        parents: ['Process', 'Line', 'SubFunction', 'Function', 'Bay'],
        children: __spreadArrays(tAbstractConductingEquipmentSequence, [
            'EqFunction',
            'SubEquipment',
        ])
    },
    ConfDataSet: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Services'],
        children: []
    },
    ConfLdName: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Services'],
        children: []
    },
    ConfLNs: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Services'],
        children: []
    },
    ConfLogControl: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Services'],
        children: []
    },
    ConfReportControl: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Services'],
        children: []
    },
    ConfSG: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['SettingGroups'],
        children: []
    },
    ConfSigRef: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Services'],
        children: []
    },
    ConnectedAP: {
        identity: connectedAPIdentity,
        selector: connectedAPSelector,
        parents: ['SubNetwork'],
        children: __spreadArrays(tUnNamingSequence, ['Address', 'GSE', 'SMV', 'PhysConn'])
    },
    ConnectivityNode: {
        identity: namingIdentity,
        selector: namingSelector,
        parents: ['Bay', 'Line'],
        children: __spreadArrays(tLNodeContainerSequence)
    },
    DA: {
        identity: namingIdentity,
        selector: namingSelector,
        parents: ['DOType'],
        children: __spreadArrays(tAbstractDataAttributeSequence)
    },
    DAI: {
        identity: ixNamingIdentity,
        selector: ixNamingSelector,
        parents: ['DOI', 'SDI'],
        children: __spreadArrays(tUnNamingSequence, ['Val'])
    },
    DAType: {
        identity: idNamingIdentity,
        selector: idNamingSelector,
        parents: ['DataTypeTemplates'],
        children: __spreadArrays(tIDNamingSequence, ['BDA', 'ProtNs'])
    },
    DO: {
        identity: namingIdentity,
        selector: namingSelector,
        parents: ['LNodeType'],
        children: __spreadArrays(tUnNamingSequence)
    },
    DOI: {
        identity: namingIdentity,
        selector: namingSelector,
        parents: __spreadArrays(tAnyLN),
        children: __spreadArrays(tUnNamingSequence, ['SDI', 'DAI'])
    },
    DOType: {
        identity: idNamingIdentity,
        selector: idNamingSelector,
        parents: ['DataTypeTemplates'],
        children: __spreadArrays(tIDNamingSequence, ['SDO', 'DA'])
    },
    DataObjectDirectory: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Services'],
        children: []
    },
    DataSet: {
        identity: namingIdentity,
        selector: namingSelector,
        parents: __spreadArrays(tAnyLN),
        children: __spreadArrays(tNamingSequence, ['FCDA'])
    },
    DataSetDirectory: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Services'],
        children: []
    },
    DataTypeTemplates: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['SCL'],
        children: ['LNodeType', 'DOType', 'DAType', 'EnumType']
    },
    DynAssociation: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Services'],
        children: []
    },
    DynDataSet: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Services'],
        children: []
    },
    EnumType: {
        identity: idNamingIdentity,
        selector: idNamingSelector,
        parents: ['DataTypeTemplates'],
        children: __spreadArrays(tIDNamingSequence, ['EnumVal'])
    },
    EnumVal: {
        identity: enumValIdentity,
        selector: enumValSelector,
        parents: ['EnumType'],
        children: []
    },
    EqFunction: {
        identity: namingIdentity,
        selector: namingSelector,
        parents: [
            'GeneralEquipment',
            'TapChanger',
            'TransformerWinding',
            'PowerTransformer',
            'SubEquipment',
            'ConductingEquipment',
        ],
        children: __spreadArrays(tAbstractEqFuncSubFuncSequence)
    },
    EqSubFunction: {
        identity: namingIdentity,
        selector: namingSelector,
        parents: ['EqSubFunction', 'EqFunction'],
        children: __spreadArrays(tAbstractEqFuncSubFuncSequence)
    },
    ExtRef: {
        identity: extRefIdentity,
        selector: extRefSelector,
        parents: ['Inputs'],
        children: []
    },
    FCDA: {
        identity: fCDAIdentity,
        selector: fCDASelector,
        parents: ['DataSet'],
        children: []
    },
    FileHandling: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Services'],
        children: []
    },
    Function: {
        identity: namingIdentity,
        selector: namingSelector,
        parents: ['Bay', 'VoltageLevel', 'Substation', 'Process', 'Line'],
        children: __spreadArrays(tPowerSystemResourceSequence, [
            'SubFunction',
            'GeneralEquipment',
            'ConductingEquipment',
        ])
    },
    GeneralEquipment: {
        identity: namingIdentity,
        selector: namingSelector,
        parents: __spreadArrays([
            'SubFunction',
            'Function'
        ], tGeneralEquipmentContainer, tAbstractEqFuncSubFunc, tEquipmentContainer),
        children: __spreadArrays(tEquipmentSequence, ['EqFunction'])
    },
    GetCBValues: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Services'],
        children: []
    },
    GetDataObjectDefinition: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Services'],
        children: []
    },
    GetDataSetValue: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Services'],
        children: []
    },
    GetDirectory: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Services'],
        children: []
    },
    GOOSE: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Services'],
        children: []
    },
    GOOSESecurity: {
        identity: namingIdentity,
        selector: namingSelector,
        parents: ['AccessPoint'],
        children: __spreadArrays(tNamingSequence, ['Subject', 'IssuerName'])
    },
    GSE: {
        identity: controlBlockIdentity,
        selector: controlBlockSelector,
        parents: ['ConnectedAP'],
        children: __spreadArrays(tControlBlockSequence, ['MinTime', 'MaxTime'])
    },
    GSEDir: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Services'],
        children: []
    },
    GSEControl: {
        identity: namingIdentity,
        selector: namingSelector,
        parents: ['LN0'],
        children: __spreadArrays(tControlWithIEDNameSequence, ['Protocol'])
    },
    GSESettings: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Services'],
        children: []
    },
    GSSE: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Services'],
        children: []
    },
    Header: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['SCL'],
        children: ['Text', 'History']
    },
    History: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Header'],
        children: ['Hitem']
    },
    Hitem: {
        identity: hitemIdentity,
        selector: hitemSelector,
        parents: ['History'],
        children: []
    },
    IED: {
        identity: namingIdentity,
        selector: namingSelector,
        parents: ['SCL'],
        children: __spreadArrays(tUnNamingSequence, ['Services', 'AccessPoint', 'KDC'])
    },
    IEDName: {
        identity: iEDNameIdentity,
        selector: iEDNameSelector,
        parents: ['GSEControl', 'SampledValueControl'],
        children: []
    },
    Inputs: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: __spreadArrays(tAnyLN),
        children: __spreadArrays(tUnNamingSequence, ['ExtRef'])
    },
    IssuerName: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['GOOSESecurity', 'SMVSecurity'],
        children: []
    },
    KDC: {
        identity: kDCIdentity,
        selector: kDCSelector,
        parents: ['IED'],
        children: []
    },
    LDevice: {
        identity: lDeviceIdentity,
        selector: lDeviceSelector,
        parents: ['Server'],
        children: __spreadArrays(tUnNamingSequence, ['LN0', 'LN', 'AccessControl'])
    },
    LN: {
        identity: lNIdentity,
        selector: lNSelector,
        parents: ['AccessPoint', 'LDevice'],
        children: __spreadArrays(tAnyLNSequence)
    },
    LN0: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['LDevice'],
        children: __spreadArrays(tAnyLNSequence, [
            'GSEControl',
            'SampledValueControl',
            'SettingControl',
        ])
    },
    LNode: {
        identity: lNodeIdentity,
        selector: lNodeSelector,
        parents: __spreadArrays(tLNodeContainer),
        children: __spreadArrays(tUnNamingSequence)
    },
    LNodeType: {
        identity: idNamingIdentity,
        selector: idNamingSelector,
        parents: ['DataTypeTemplates'],
        children: __spreadArrays(tIDNamingSequence, ['DO'])
    },
    Line: {
        identity: namingIdentity,
        selector: namingSelector,
        parents: ['Process', 'SCL'],
        children: __spreadArrays(tGeneralEquipmentContainerSequence, [
            'Voltage',
            'ConductingEquipment',
        ])
    },
    Log: {
        identity: namingIdentity,
        selector: namingSelector,
        parents: __spreadArrays(tAnyLN),
        children: __spreadArrays(tUnNamingSequence)
    },
    LogControl: {
        identity: namingIdentity,
        selector: namingSelector,
        parents: __spreadArrays(tAnyLN),
        children: __spreadArrays(tControlWithTriggerOptSequence)
    },
    LogSettings: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Services'],
        children: []
    },
    MaxTime: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['GSE'],
        children: []
    },
    McSecurity: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['GSESettings', 'SMVSettings', 'ClientServices'],
        children: []
    },
    MinTime: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['GSE'],
        children: []
    },
    NeutralPoint: {
        identity: terminalIdentity,
        selector: terminalSelector,
        parents: ['TransformerWinding'],
        children: __spreadArrays(tUnNamingSequence)
    },
    OptFields: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['ReportControl'],
        children: []
    },
    P: {
        identity: pIdentity,
        selector: pSelector,
        parents: ['Address', 'PhysConn'],
        children: []
    },
    PhysConn: {
        identity: physConnIdentity,
        selector: physConnSelector,
        parents: ['ConnectedAP'],
        children: __spreadArrays(tUnNamingSequence, ['P'])
    },
    PowerTransformer: {
        identity: namingIdentity,
        selector: namingSelector,
        parents: __spreadArrays(tEquipmentContainer),
        children: __spreadArrays(tEquipmentSequence, [
            'TransformerWinding',
            'SubEquipment',
            'EqFunction',
        ])
    },
    Private: {
        identity: function () { return NaN; },
        selector: function () { return voidSelector; },
        parents: [],
        children: []
    },
    Process: {
        identity: namingIdentity,
        selector: namingSelector,
        parents: ['Process', 'SCL'],
        children: __spreadArrays(tGeneralEquipmentContainerSequence, [
            'ConductingEquipment',
            'Substation',
            'Line',
            'Process',
        ])
    },
    ProtNs: {
        identity: protNsIdentity,
        selector: protNsSelector,
        parents: ['DAType', 'DA'],
        children: []
    },
    Protocol: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['GSEControl', 'SampledValueControl'],
        children: []
    },
    ReadWrite: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Services'],
        children: []
    },
    RedProt: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Services'],
        children: []
    },
    ReportControl: {
        identity: namingIdentity,
        selector: namingSelector,
        parents: __spreadArrays(tAnyLN),
        children: __spreadArrays(tControlWithTriggerOptSequence, ['OptFields', 'RptEnabled'])
    },
    ReportSettings: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Services'],
        children: []
    },
    RptEnabled: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['ReportControl'],
        children: __spreadArrays(tUnNamingSequence, ['ClientLN'])
    },
    SamplesPerSec: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['SMVSettings'],
        children: []
    },
    SampledValueControl: {
        identity: namingIdentity,
        selector: namingSelector,
        parents: ['LN0'],
        children: __spreadArrays(tControlWithIEDNameSequence, ['SmvOpts'])
    },
    SecPerSamples: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['SMVSettings'],
        children: []
    },
    SCL: {
        identity: sCLIdentity,
        selector: sCLSelector,
        parents: [],
        children: __spreadArrays(tBaseNameSequence, [
            'Header',
            'Substation',
            'Communication',
            'IED',
            'DataTypeTemplates',
            'Line',
            'Process',
        ])
    },
    SDI: {
        identity: ixNamingIdentity,
        selector: ixNamingSelector,
        parents: ['DOI', 'SDI'],
        children: __spreadArrays(tUnNamingSequence, ['SDI', 'DAI'])
    },
    SDO: {
        identity: namingIdentity,
        selector: namingSelector,
        parents: ['DOType'],
        children: __spreadArrays(tNamingSequence)
    },
    Server: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['AccessPoint'],
        children: __spreadArrays(tUnNamingSequence, [
            'Authentication',
            'LDevice',
            'Association',
        ])
    },
    ServerAt: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['AccessPoint'],
        children: __spreadArrays(tUnNamingSequence)
    },
    Services: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['IED', 'AccessPoint'],
        children: [
            'DynAssociation',
            'SettingGroups',
            'GetDirectory',
            'GetDataObjectDefinition',
            'DataObjectDirectory',
            'GetDataSetValue',
            'SetDataSetValue',
            'DataSetDirectory',
            'ConfDataSet',
            'DynDataSet',
            'ReadWrite',
            'TimerActivatedControl',
            'ConfReportControl',
            'GetCBValues',
            'ConfLogControl',
            'ReportSettings',
            'LogSettings',
            'GSESettings',
            'SMVSettings',
            'GSEDir',
            'GOOSE',
            'GSSE',
            'SMVsc',
            'FileHandling',
            'ConfLNs',
            'ClientServices',
            'ConfLdName',
            'SupSubscription',
            'ConfSigRef',
            'ValueHandling',
            'RedProt',
            'TimeSyncProt',
            'CommProt',
        ]
    },
    SetDataSetValue: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Services'],
        children: []
    },
    SettingControl: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['LN0'],
        children: __spreadArrays(tUnNamingSequence)
    },
    SettingGroups: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Services'],
        children: ['SGEdit', 'ConfSG']
    },
    SGEdit: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['SettingGroups'],
        children: []
    },
    SmpRate: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['SMVSettings'],
        children: []
    },
    SMV: {
        identity: controlBlockIdentity,
        selector: controlBlockSelector,
        parents: ['ConnectedAP'],
        children: __spreadArrays(tControlBlockSequence)
    },
    SmvOpts: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['SampledValueControl'],
        children: []
    },
    SMVsc: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Services'],
        children: []
    },
    SMVSecurity: {
        identity: namingIdentity,
        selector: namingSelector,
        parents: ['AccessPoint'],
        children: __spreadArrays(tNamingSequence, ['Subject', 'IssuerName'])
    },
    SMVSettings: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Services'],
        children: ['SmpRate', 'SamplesPerSec', 'SecPerSamples', 'McSecurity']
    },
    SubEquipment: {
        identity: namingIdentity,
        selector: namingSelector,
        parents: __spreadArrays([
            'TapChanger',
            'PowerTransformer',
            'ConductingEquipment',
            'TransformerWinding'
        ], tAbstractConductingEquipment),
        children: __spreadArrays(tPowerSystemResourceSequence, ['EqFunction'])
    },
    SubFunction: {
        identity: namingIdentity,
        selector: namingSelector,
        parents: ['SubFunction', 'Function'],
        children: __spreadArrays(tPowerSystemResourceSequence, [
            'GeneralEquipment',
            'ConductingEquipment',
            'SubFunction',
        ])
    },
    SubNetwork: {
        identity: namingIdentity,
        selector: namingSelector,
        parents: ['Communication'],
        children: __spreadArrays(tNamingSequence, ['BitRate', 'ConnectedAP'])
    },
    Subject: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['GOOSESecurity', 'SMVSecurity'],
        children: []
    },
    Substation: {
        identity: namingIdentity,
        selector: namingSelector,
        parents: ['SCL'],
        children: __spreadArrays(tEquipmentContainerSequence, ['VoltageLevel', 'Function'])
    },
    SupSubscription: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Services'],
        children: []
    },
    TapChanger: {
        identity: namingIdentity,
        selector: namingSelector,
        parents: ['TransformerWinding'],
        children: __spreadArrays(tPowerSystemResourceSequence, ['SubEquipment', 'EqFunction'])
    },
    Terminal: {
        identity: terminalIdentity,
        selector: terminalSelector,
        parents: __spreadArrays(tEquipment),
        children: __spreadArrays(tUnNamingSequence)
    },
    Text: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: sCLTags.filter(function (tag) { return tag !== 'Text' && tag !== 'Private'; }),
        children: []
    },
    TimerActivatedControl: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Services'],
        children: []
    },
    TimeSyncProt: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Services', 'ClientServices'],
        children: []
    },
    TransformerWinding: {
        identity: namingIdentity,
        selector: namingSelector,
        parents: ['PowerTransformer'],
        children: __spreadArrays(tAbstractConductingEquipmentSequence, [
            'TapChanger',
            'NeutralPoint',
            'EqFunction',
            'SubEquipment',
        ])
    },
    TrgOps: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['ReportControl'],
        children: []
    },
    Val: {
        identity: valIdentity,
        selector: valSelector,
        parents: ['DAI', 'DA', 'BDA'],
        children: []
    },
    ValueHandling: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['Services'],
        children: []
    },
    Voltage: {
        identity: singletonIdentity,
        selector: singletonSelector,
        parents: ['VoltageLevel'],
        children: []
    },
    VoltageLevel: {
        identity: namingIdentity,
        selector: namingSelector,
        parents: ['Substation'],
        children: __spreadArrays(tEquipmentContainerSequence, ['Voltage', 'Bay', 'Function'])
    }
};
function getReference(parent, tag) {
    var _a, _b, _c;
    var parentTag = parent.tagName;
    var children = Array.from(parent.children);
    if (parentTag === 'Services' ||
        parentTag === 'SettingGroups' ||
        !isSCLTag(parentTag))
        return (_a = children.find(function (child) { return child.tagName === tag; })) !== null && _a !== void 0 ? _a : null;
    var sequence = (_c = (_b = exports.tags[parentTag]) === null || _b === void 0 ? void 0 : _b.children) !== null && _c !== void 0 ? _c : [];
    var index = sequence.findIndex(function (element) { return element === tag; });
    if (index < 0)
        return null;
    var nextSibling;
    while (index < sequence.length && !nextSibling) {
        nextSibling = children.find(function (child) { return child.tagName === sequence[index]; });
        index++;
    }
    return nextSibling !== null && nextSibling !== void 0 ? nextSibling : null;
}
exports.getReference = getReference;
function selector(tagName, identity) {
    if (typeof identity !== 'string')
        return voidSelector;
    if (isSCLTag(tagName))
        return exports.tags[tagName].selector(tagName, identity);
    return tagName;
}
function find(root, tagName, identity) {
    var _a;
    if (typeof identity !== 'string' || !isSCLTag(tagName))
        return null;
    var element = root.querySelector(exports.tags[tagName].selector(tagName, identity));
    if (element === null || isPublic(element))
        return element;
    return ((_a = Array.from(root.querySelectorAll(exports.tags[tagName].selector(tagName, identity))).find(isPublic)) !== null && _a !== void 0 ? _a : null);
}
exports.find = find;
/** @returns a string uniquely identifying `e` in its document, or NaN if `e`
 * is unidentifiable. */
function identity(e) {
    if (e === null)
        return NaN;
    if (e.closest('Private'))
        return NaN;
    var tag = e.tagName;
    if (isSCLTag(tag))
        return exports.tags[tag].identity(e);
    return NaN;
}
exports.identity = identity;
/** @returns whether `a` and `b` are considered identical by IEC-61850 */
function isSame(a, b) {
    if (a.tagName === 'Private')
        return isSame(a.parentElement, b.parentElement) && a.isEqualNode(b);
    return a.tagName === b.tagName && identity(a) === identity(b);
}
exports.isSame = isSame;
function isEqual(a, b) {
    var _a, _b;
    if (a.closest('Private') || b.closest('Private'))
        return a.isEqualNode(b);
    var attributeNames = new Set(a.getAttributeNames().concat(b.getAttributeNames()));
    for (var _i = 0, attributeNames_1 = attributeNames; _i < attributeNames_1.length; _i++) {
        var name_1 = attributeNames_1[_i];
        if (a.getAttribute(name_1) !== b.getAttribute(name_1))
            return false;
    }
    if (a.childElementCount === 0)
        return (b.childElementCount === 0 &&
            ((_a = a.textContent) === null || _a === void 0 ? void 0 : _a.trim()) === ((_b = b.textContent) === null || _b === void 0 ? void 0 : _b.trim()));
    var aChildren = Array.from(a.children);
    var bChildren = Array.from(b.children);
    var _loop_1 = function (aChild) {
        var twindex = bChildren.findIndex(function (bChild) { return isEqual(aChild, bChild); });
        if (twindex === -1)
            return { value: false };
        bChildren.splice(twindex, 1);
    };
    for (var _c = 0, aChildren_1 = aChildren; _c < aChildren_1.length; _c++) {
        var aChild = aChildren_1[_c];
        var state_1 = _loop_1(aChild);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    var _loop_2 = function (bChild) {
        if (!aChildren.find(function (aChild) { return isEqual(bChild, aChild); }))
            return { value: false };
    };
    for (var _d = 0, bChildren_1 = bChildren; _d < bChildren_1.length; _d++) {
        var bChild = bChildren_1[_d];
        var state_2 = _loop_2(bChild);
        if (typeof state_2 === "object")
            return state_2.value;
    }
    return true;
}
exports.isEqual = isEqual;
/** @returns a new [[`tag`]] element owned by [[`doc`]]. */
function createElement(doc, tag, attrs) {
    var element = doc.createElementNS(doc.documentElement.namespaceURI, tag);
    Object.entries(attrs)
        .filter(function (_a) {
        var _ = _a[0], value = _a[1];
        return value !== null;
    })
        .forEach(function (_a) {
        var name = _a[0], value = _a[1];
        return element.setAttribute(name, value);
    });
    return element;
}
exports.createElement = createElement;
/** @returns a clone of `element` with attributes set to values from `attrs`. */
function cloneElement(element, attrs) {
    var newElement = element.cloneNode(false);
    Object.entries(attrs).forEach(function (_a) {
        var name = _a[0], value = _a[1];
        if (value === null)
            newElement.removeAttribute(name);
        else
            newElement.setAttribute(name, value);
    });
    return newElement;
}
exports.cloneElement = cloneElement;
/** A directive rendering its argument `rendered` only if `rendered !== {}`. */
exports.ifImplemented = lit_html_1.directive(function (rendered) { return function (part) {
    if (Object.keys(rendered).length)
        part.setValue(rendered);
    else
        part.setValue('');
}; });
var nameStartChar = '[:_A-Za-z]|[\u00C0-\u00D6]|[\u00D8-\u00F6]|[\u00F8-\u02FF]|[\u0370-\u037D]' +
    '|[\u037F-\u1FFF]|[\u200C-\u200D]|[\u2070-\u218F]|[\u2C00-\u2FEF]' +
    '|[\u3001-\uD7FF]|[\uF900-\uFDCF]|[\uFDF0-\uFFFD]';
var nameChar = nameStartChar + '|[.0-9\\-]|\u00B7|[\u0300-\u036F]|[\u203F-\u2040]';
var name = nameStartChar + '(' + nameChar + ')*';
var nmToken = '(' + nameChar + ')+';
exports.patterns = {
    string: '([\u0009-\u000A]|[\u000D]|[\u0020-\u007E]|[\u0085]|[\u00A0-\uD7FF]' +
        '|[\uE000-\uFFFD])*',
    normalizedString: '([\u0020-\u007E]|[\u0085]|[\u00A0-\uD7FF]|[\uE000-\uFFFD])*',
    name: name,
    nmToken: nmToken,
    names: name + '( ' + name + ')*',
    nmTokens: nmToken + '( ' + nmToken + ')*',
    decimal: '[+\\-]?[0-9]+(([.][0-9]*)?|([.][0-9]+))',
    unsigned: '[+]?[0-9]+(([.][0-9]*)?|([.][0-9]+))',
    integer: '[+\\-]?[0-9]+([0-9]*)',
    alphanumericFirstUpperCase: '[A-Z][0-9,A-Z,a-z]*',
    alphanumericFirstLowerCase: '[a-z][0-9,A-Z,a-z]*',
    lnClass: '(LLN0)|[A-Z]{4,4}'
};
/** Sorts selected `ListItem`s to the top and disabled ones to the bottom. */
function compareNames(a, b) {
    var _a, _b, _c;
    if (typeof a === 'string' && typeof b === 'string')
        return a.localeCompare(b);
    if (typeof a === 'object' && typeof b === 'string')
        return ((_a = a.getAttribute('name')) !== null && _a !== void 0 ? _a : '').localeCompare(b);
    if (typeof a === 'string' && typeof b === 'object')
        return a.localeCompare(b.getAttribute('name'));
    if (typeof a === 'object' && typeof b === 'object')
        return ((_b = a.getAttribute('name')) !== null && _b !== void 0 ? _b : '').localeCompare((_c = b.getAttribute('name')) !== null && _c !== void 0 ? _c : '');
    return 0;
}
exports.compareNames = compareNames;
/** Throws an error bearing `message`, never returning. */
function unreachable(message) {
    throw new Error(message);
}
exports.unreachable = unreachable;
/** @returns the cartesian product of `arrays` */
function crossProduct() {
    var arrays = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arrays[_i] = arguments[_i];
    }
    return arrays.reduce(function (a, b) { return a.flatMap(function (d) { return b.map(function (e) { return [d, e].flat(); }); }); }, [[]]);
}
exports.crossProduct = crossProduct;
/** @returns the depth of `t` if it is an object or array, zero otherwise. */
function depth(t, mem) {
    if (mem === void 0) { mem = new WeakSet(); }
    if (mem.has(t))
        return Infinity;
    else
        switch (t === null || t === void 0 ? void 0 : t.constructor) {
            case Object:
            case Array:
                mem.add(t);
                return (1 + Math.max.apply(Math, __spreadArrays([-1], Object.values(t).map(function (_) { return depth(_, mem); }))));
            default:
                return 0;
        }
}
exports.depth = depth;
function getUniqueElementName(parent, tagName, iteration) {
    if (iteration === void 0) { iteration = 1; }
    var newName = 'new' + tagName + iteration;
    var child = parent.querySelector(":scope > " + tagName + "[name=\"" + newName + "\"]");
    if (!child)
        return newName;
    else
        return getUniqueElementName(parent, tagName, ++iteration);
}
exports.getUniqueElementName = getUniqueElementName;
function findFCDAs(extRef) {
    if (extRef.tagName !== 'ExtRef' || extRef.closest('Private'))
        return [];
    var _a = [
        'iedName',
        'ldInst',
        'prefix',
        'lnClass',
        'lnInst',
        'doName',
        'daName',
    ].map(function (name) { return extRef.getAttribute(name); }), iedName = _a[0], ldInst = _a[1], prefix = _a[2], lnClass = _a[3], lnInst = _a[4], doName = _a[5], daName = _a[6];
    var ied = Array.from(extRef.ownerDocument.getElementsByTagName('IED')).find(function (element) {
        return element.getAttribute('name') === iedName && !element.closest('Private');
    });
    if (!ied)
        return [];
    return Array.from(ied.getElementsByTagName('FCDA'))
        .filter(function (item) { return !item.closest('Private'); })
        .filter(function (fcda) {
        var _a, _b, _c, _d, _e, _f;
        return ((_a = fcda.getAttribute('ldInst')) !== null && _a !== void 0 ? _a : '') === (ldInst !== null && ldInst !== void 0 ? ldInst : '') &&
            ((_b = fcda.getAttribute('prefix')) !== null && _b !== void 0 ? _b : '') === (prefix !== null && prefix !== void 0 ? prefix : '') &&
            ((_c = fcda.getAttribute('lnClass')) !== null && _c !== void 0 ? _c : '') === (lnClass !== null && lnClass !== void 0 ? lnClass : '') &&
            ((_d = fcda.getAttribute('lnInst')) !== null && _d !== void 0 ? _d : '') === (lnInst !== null && lnInst !== void 0 ? lnInst : '') &&
            ((_e = fcda.getAttribute('doName')) !== null && _e !== void 0 ? _e : '') === (doName !== null && doName !== void 0 ? doName : '') &&
            ((_f = fcda.getAttribute('daName')) !== null && _f !== void 0 ? _f : '') === (daName !== null && daName !== void 0 ? daName : '');
    });
}
exports.findFCDAs = findFCDAs;
var serviceTypeControlBlockTags = {
    GOOSE: ['GSEControl'],
    SMV: ['SampledValueControl'],
    Report: ['ReportControl'],
    NONE: ['LogControl', 'GSEControl', 'SampledValueControl', 'ReportControl']
};
function findControlBlocks(extRef) {
    var _a, _b;
    var fcdas = findFCDAs(extRef);
    var cbTags = (_b = serviceTypeControlBlockTags[(_a = extRef.getAttribute('serviceType')) !== null && _a !== void 0 ? _a : 'NONE']) !== null && _b !== void 0 ? _b : [];
    var controlBlocks = new Set(fcdas.flatMap(function (fcda) {
        var _a;
        var dataSet = fcda.parentElement;
        var dsName = (_a = dataSet.getAttribute('name')) !== null && _a !== void 0 ? _a : '';
        var anyLN = dataSet.parentElement;
        return cbTags
            .flatMap(function (tag) { return Array.from(anyLN.getElementsByTagName(tag)); })
            .filter(function (cb) { return cb.getAttribute('datSet') === dsName; });
    }));
    return controlBlocks;
}
exports.findControlBlocks = findControlBlocks;
function isPublic(element) {
    return !element.closest('Private');
}
exports.isPublic = isPublic;
/** @returns the version of the SCL project */
function getVersion(element) {
    var _a;
    var header = Array.from(element.ownerDocument.getElementsByTagName('Header')).filter(function (item) { return !item.closest('Private'); });
    return (_a = header[0].getAttribute('version')) !== null && _a !== void 0 ? _a : '2003';
}
exports.getVersion = getVersion;
function getChildElementsByTagName(element, tag) {
    if (!element || !tag)
        return [];
    return Array.from(element.children).filter(function (element) { return element.tagName === tag; });
}
exports.getChildElementsByTagName = getChildElementsByTagName;
/** maximum value for `lnInst` attribute */
var maxLnInst = 99;
var lnInstRange = Array(maxLnInst)
    .fill(1)
    .map(function (_, i) { return "" + (i + 1); });
/**
 * @param parent - The LNodes' parent element to be scanned once for `lnInst`
 * values already in use. Be sure to create a new generator every time the
 * children of this element change.
 * @returns a function generating increasing unused `lnInst` values for
 * `lnClass` LNodes within `parent` on subsequent invocations
 */
function newLnInstGenerator(parent) {
    var generators = new Map();
    return function (lnClass) {
        if (!generators.has(lnClass)) {
            var lnInsts_1 = new Set(getChildElementsByTagName(parent, 'LNode')
                .filter(function (lnode) { return lnode.getAttribute('lnClass') === lnClass; })
                .map(function (lNode) { return lNode.getAttribute('lnInst'); }));
            generators.set(lnClass, function () {
                var uniqueLnInst = lnInstRange.find(function (lnInst) { return !lnInsts_1.has(lnInst); });
                if (uniqueLnInst)
                    lnInsts_1.add(uniqueLnInst);
                return uniqueLnInst;
            });
        }
        return generators.get(lnClass)();
    };
}
exports.newLnInstGenerator = newLnInstGenerator;
/**
 * Format xml string in "pretty print" style and return as a string
 * @param xml - xml document as a string
 * @param tab - character to use as a tab
 * @returns string with pretty print formatting
 */
function formatXml(xml, tab) {
    var formatted = '', indent = '';
    if (!tab)
        tab = '\t';
    xml.split(/>\s*</).forEach(function (node) {
        if (node.match(/^\/\w/))
            indent = indent.substring(tab.length);
        formatted += indent + '<' + node + '>\r\n';
        if (node.match(/^<?\w[^>]*[^/]$/))
            indent += tab;
    });
    return formatted.substring(1, formatted.length - 3);
}
exports.formatXml = formatXml;
/**
 * @param lnElements - The LN elements to be scanned for `inst`
 * values already in use.
 * @returns first available inst value for LN or undefined if no inst is available
 */
function minAvailableLogicalNodeInstance(lnElements) {
    var lnInsts = new Set(lnElements.map(function (ln) { return ln.getAttribute('inst') || ''; }));
    return lnInstRange.find(function (lnInst) { return !lnInsts.has(lnInst); });
}
exports.minAvailableLogicalNodeInstance = minAvailableLogicalNodeInstance;
