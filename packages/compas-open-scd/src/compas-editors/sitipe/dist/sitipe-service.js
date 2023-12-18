"use strict";
exports.__esModule = true;
exports.getImportedBtComponents = exports.getImportedBTComponentData = exports.getBayTypicalComponents = exports.getAssignedBayTypicals = void 0;
var foundation_js_1 = require("../../compas-services/foundation.js");
var CompasSettings_js_1 = require("../../compas/CompasSettings.js");
function getSitipeServiceBaseUrl() {
    return CompasSettings_js_1.CompasSettings().compasSettings.sitipeServiceUrl;
}
function getAssignedBayTypicals() {
    return fetch(getSitipeServiceBaseUrl() + "/v2/baytypicals")["catch"](foundation_js_1.handleError)
        .then(function (res) { return res.json(); });
}
exports.getAssignedBayTypicals = getAssignedBayTypicals;
function getBayTypicalComponents(accessId) {
    return fetch(getSitipeServiceBaseUrl() + "/v2/baytypicals/" + accessId + "/components")["catch"](foundation_js_1.handleError)
        .then(function (res) { return res.json(); });
}
exports.getBayTypicalComponents = getBayTypicalComponents;
function getImportedBTComponentData(id) {
    return fetch(getSitipeServiceBaseUrl() + "/v2/btcomponents/imported/" + id)["catch"](foundation_js_1.handleError)
        .then(function (res) { return res.json(); });
}
exports.getImportedBTComponentData = getImportedBTComponentData;
function getImportedBtComponents(accessId) {
    return fetch(getSitipeServiceBaseUrl() + "/v2/btcomponents/" + accessId + "/imported")["catch"](foundation_js_1.handleError)
        .then(function (res) { return res.json(); });
}
exports.getImportedBtComponents = getImportedBtComponents;
