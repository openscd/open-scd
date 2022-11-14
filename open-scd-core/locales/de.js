/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * Tag that allows expressions to be used in localized non-HTML template
 * strings.
 *
 * Example: msg(str`Hello ${this.user}!`);
 *
 * The Lit html tag can also be used for this purpose, but HTML will need to be
 * escaped, and there is a small overhead for HTML parsing.
 *
 * Untagged template strings with expressions aren't supported by lit-localize
 * because they don't allow for values to be captured at runtime.
 */
const _str = (strings, ...values) => ({
    strTag: true,
    strings,
    values,
});
const str = _str;

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class Deferred {
    constructor() {
        this.settled = false;
        this.promise = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
    }
    resolve(value) {
        this.settled = true;
        this._resolve(value);
    }
    reject(error) {
        this.settled = true;
        this._reject(error);
    }
}

/**
 * @license
 * Copyright 2014 Travis Webb
 * SPDX-License-Identifier: MIT
 */
for (let i = 0; i < 256; i++) {
    ((i >> 4) & 15).toString(16) + (i & 15).toString(16);
}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let loading = new Deferred();
// The loading promise must be initially resolved, because that's what we should
// return if the user immediately calls setLocale(sourceLocale).
loading.resolve();

// Do not modify this file by hand!
/* eslint-disable no-irregular-whitespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
const templates = {
    's0731afca1ab76175': str `${0} nach ${1} verschoben`,
    's0f8217f07c54b541': str `${0} entfernt`,
    's5e8250fb85d64c23': `Schließen`,
    's62b4f83c9503e1af': str `≥ ${0} Knoten verändert`,
    's6d8c02aee480af7a': `Menü`,
    's7417792bbe720149': `Wiederholen`,
    's83eaab546be4bfb9': str `${0} in ${1} eingefügt`,
    's85a55e7007003cc2': str `${0} verändert`,
    's8f4be9f086eb530f': `Rückgängig`,
    's90c6a2fed2796c07': `Bearbeitungshistorie`,
    'sbcdf43ebad9c5a3a': `Etwas unerwartetes ist passiert!`,
    'sfb0e98cb12fe463c': `Hier wird Ihre Bearbeitungshistorie angezeigt.`,
};

export { templates };
//# sourceMappingURL=de.js.map
