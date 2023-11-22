import { D as Directive } from './directive-afe88016.js';
import { N as NodePart, E as EventPart, B as BooleanAttributePart, P as PropertyPart, A as AttributePart } from './lit-html-1055e278.js';

/**
 * @license
 * Copyright (c) 2021 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * A superclass for directives that need to asynchronously update.
 */
class AsyncDirective extends Directive {
    constructor(partInfo) {
        super(partInfo);
        this._renderedYet = false;
        this._legacyPart = partInfo.legacyPart;
    }
    _legacyGetNode() {
        if (this._legacyPart instanceof NodePart) {
            return this._legacyPart.startNode;
        }
        else if (this._legacyPart instanceof EventPart) {
            return this._legacyPart.element;
        }
        else if (this._legacyPart instanceof BooleanAttributePart) {
            return this._legacyPart.element;
        }
        else if (this._legacyPart instanceof PropertyPart ||
            this._legacyPart instanceof AttributePart) {
            return this._legacyPart.committer.element;
        }
        return undefined;
    }
    _shouldRender() {
        if (!this._renderedYet) {
            this._renderedYet = true;
            return true;
        }
        const node = this._legacyGetNode();
        return !!(node === null || node === void 0 ? void 0 : node.isConnected);
    }
    setValue(value) {
        if (!this._shouldRender()) {
            // node is disconnected, do nothing.
            return;
        }
        this._legacyPart.setValue(value);
        this._legacyPart.commit();
    }
    /**
     * User callback for implementing logic to release any
     * resources/subscriptions that may have been retained by this directive.
     * Since directives may also be re-connected, `reconnected` should also be
     * implemented to restore the working state of the directive prior to the next
     * render.
     *
     * NOTE: In lit-html 1.x, the `disconnected` and `reconnected` callbacks WILL
     * NOT BE CALLED. The interface is provided here for forward-compatible
     * directive authoring only.
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    disconnected() {
    }
    /**
     * User callback to restore the working state of the directive prior to the
     * next render. This should generally re-do the work that was undone in
     * `disconnected`.
     *
     * NOTE: In lit-html 1.x, the `disconnected` and `reconnected` callbacks WILL
     * NOT BE CALLED. The interface is provided here for forward-compatible
     * directive authoring only.
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    reconnected() {
    }
}

export { AsyncDirective as A };
