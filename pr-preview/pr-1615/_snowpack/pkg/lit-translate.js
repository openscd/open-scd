import { N as NodePart, A as AttributePart } from './common/lit-html-e07bf80b.js';

const CLEANUP_PARTS_MS = 1000 * 60;
const LANG_CHANGED_EVENT = "langChanged";

/**
 * Interpolates the values into the string.
 * @param text
 * @param values
 * @param config
 */
function interpolate(text, values, config) {
    return Object.entries(extract(values || {})).reduce((text, [key, value]) => text.replace(new RegExp(`{{[  ]*${key}[  ]*}}`, `gm`), String(extract(value))), text);
}
/**
 * Returns a string based on a chain of keys using the dot notation.
 * @param key
 * @param config
 */
function lookup(key, config) {
    // Split the key in parts (example: hello.world)
    const parts = key.split(".");
    // Find the string by traversing through the strings matching the chain of keys
    let string = config.strings;
    // Shift through all of the parts of the key while matching with the strings.
    // Do not continue if the string is not defined or if we have traversed all of the key parts
    while (string != null && parts.length > 0) {
        string = string[parts.shift()];
    }
    // Make sure the string is in fact a string!
    return string != null ? string.toString() : null;
}
/**
 * Extracts either the value from the function or returns the value that was passed in.
 * @param obj
 */
function extract(obj) {
    return (typeof obj === "function") ? obj() : obj;
}

/**
 * Default configuration object.
 */
const defaultTranslateConfig = () => {
    return {
        loader: () => Promise.resolve({}),
        empty: key => `[${key}]`,
        lookup: lookup,
        interpolate: interpolate,
        translationCache: {}
    };
};
// The current configuration.
let translateConfig = defaultTranslateConfig();
/**
 * Registers a translation config.
 * @param config
 */
function registerTranslateConfig(config) {
    return (translateConfig = Object.assign(Object.assign({}, translateConfig), config));
}
/**
 * Dispatches a language changed event.
 * @param detail
 */
function dispatchLangChanged(detail) {
    window.dispatchEvent(new CustomEvent(LANG_CHANGED_EVENT, { detail }));
}
/**
 * Updates the configuration object with a new language and strings.
 * Then dispatches that the language has changed.
 * @param newLang
 * @param newStrings
 * @param config
 */
function updateLang(newLang, newStrings, config = translateConfig) {
    dispatchLangChanged({
        previousStrings: config.strings,
        previousLang: config.lang,
        lang: (config.lang = newLang),
        strings: (config.strings = newStrings)
    });
}
/**
 * Listens for changes in the language.
 * Returns a method for unsubscribing from the event.
 * @param callback
 * @param options
 */
function listenForLangChanged(callback, options) {
    const handler = (e) => callback(e.detail);
    window.addEventListener(LANG_CHANGED_EVENT, handler, options);
    return () => window.removeEventListener(LANG_CHANGED_EVENT, handler);
}
/**
 * Sets a new current language and dispatches a global language changed event.
 * @param lang
 * @param config
 */
async function use(lang, config = translateConfig) {
    // Load the translations and set the cache
    const strings = await config.loader(lang, config);
    config.translationCache = {};
    // Dispatch global language changed event while setting the new values
    updateLang(lang, strings, config);
}
/**
 * Translates a key and interpolates if values are defined.
 * Uses the current strings and translation cache to fetch the translation.
 * @param key (eg. "common.get_started")
 * @param values (eg. { count: 42 })
 * @param config
 */
function get(key, values, config = translateConfig) {
    // Either use the translation from the cache or get it and add it to the cache
    let translation = config.translationCache[key]
        || (config.translationCache[key] = config.lookup(key, config) || config.empty(key, config));
    // Extract the values
    values = values != null ? extract(values) : null;
    // Interpolate the values and return the translation
    return values != null ? config.interpolate(translation, values, config) : translation;
}

/** #################################################################################
 ** The purpose of this module is to provide an API to clean up the node parts cache.
 ** This is to avoid memory leaks from parts being added and removed to the template.
 ** This is necessary since lit-html currently do not provide a way of cleaning up after a directive.
 ** In the ideal world we would be able to cache the parts in a weakmap, however that makes
 ** us unable to loop over the map which is required for updating the translations when the lang changes.
 ** This module will be obsolete the day lit-html provides a way of cleaning up after a directive
 ** ##################################################################################

/**
 * Check whether the part is still connected / has been removed from the DOM.
 * @param part
 */
function isConnected(part) {
    if (part instanceof NodePart) {
        return part.startNode.isConnected;
    }
    else if (part instanceof AttributePart) {
        return part.committer.element.isConnected;
    }
    else {
        return part.element.isConnected;
    }
}
/**
 * Removes the disconnected parts from the cache.
 */
function removeDisconnectedParts(map) {
    for (const [part] of map) {
        if (!isConnected(part)) {
            map.delete(part);
        }
    }
}
/**
 * Invokes a callback when the browser is idle.
 * Fallback to setTimeout.
 * @param cb
 */
function whenIdle(cb) {
    "requestIdleCallback" in window ? window.requestIdleCallback(cb) : setTimeout(cb);
}
/**
 * Starts an interval that cleans up the part cache map each X ms.
 * @param map
 * @param ms
 */
function attachPartsGarbageCollector(map, ms) {
    setInterval(() => whenIdle(() => removeDisconnectedParts(map)), ms);
}

// Caches the parts and the translations.
// In the ideal world this would be a weakmap, but it is not possible to loop over weakmaps.
// This is the best solution until lit-html provides an API to clean up after directives.
const partCache = new Map();
/**
 * Listens for changes in the language and updates all of the cached parts if necessary
 */
function attachTranslateListener() {
    listenForLangChanged((e) => {
        for (const [part, cb] of partCache) {
            if (isConnected(part)) {
                updatePart(part, cb, e);
            }
        }
    });
}
attachTranslateListener();
attachPartsGarbageCollector(partCache, CLEANUP_PARTS_MS);
/**
 * Handles the translation.
 * @param part
 * @param cb
 * @param e
 */
function updatePart(part, cb, e) {
    // Grab the new value
    const newValue = cb(e);
    // Only set the value if it has changed
    if (part.value === newValue) {
        return;
    }
    // Set the new value
    part.setValue(newValue);
    part.commit();
}

export { get, registerTranslateConfig, use };
