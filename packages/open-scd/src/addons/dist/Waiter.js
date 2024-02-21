"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.OscdWaiter = void 0;
var lit_element_1 = require("lit-element");
require("@material/mwc-linear-progress");
var OscdWaiter = /** @class */ (function (_super) {
    __extends(OscdWaiter, _super);
    function OscdWaiter() {
        var _this = _super.call(this) || this;
        /** Whether the element is currently waiting for some async work. */
        _this.waiting = false;
        _this.work = new Set();
        /** A promise which resolves once all currently pending work is done. */
        _this.workDone = Promise.allSettled(_this.work);
        _this.onPendingState = _this.onPendingState.bind(_this);
        return _this;
    }
    OscdWaiter.prototype.onPendingState = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.waiting = true;
                        this.work.add(e.detail.promise);
                        this.workDone = Promise.allSettled(this.work);
                        return [4 /*yield*/, e.detail.promise["catch"](function (reason) { return console.warn(reason); })];
                    case 1:
                        _a.sent();
                        this.work["delete"](e.detail.promise);
                        this.waiting = this.work.size > 0;
                        return [2 /*return*/];
                }
            });
        });
    };
    OscdWaiter.prototype.connectedCallback = function () {
        _super.prototype.connectedCallback.call(this);
        this.addEventListener('pending-state', this.onPendingState);
    };
    OscdWaiter.prototype.disconnectedCallback = function () {
        _super.prototype.disconnectedCallback.call(this);
        this.removeEventListener('pending-state', this.onPendingState);
    };
    OscdWaiter.prototype.render = function () {
        return lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<slot></slot>\n      <mwc-linear-progress\n        .closed=", "\n        indeterminate\n      ></mwc-linear-progress>"], ["<slot></slot>\n      <mwc-linear-progress\n        .closed=", "\n        indeterminate\n      ></mwc-linear-progress>"])), !this.waiting);
    };
    __decorate([
        lit_element_1.property({ type: Boolean })
    ], OscdWaiter.prototype, "waiting");
    OscdWaiter = __decorate([
        lit_element_1.customElement('oscd-waiter')
    ], OscdWaiter);
    return OscdWaiter;
}(lit_element_1.LitElement));
exports.OscdWaiter = OscdWaiter;
var templateObject_1;
