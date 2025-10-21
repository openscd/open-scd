/**
 * Hashes `uri` using cyrb64 analogous to
 * https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js .
 * @returns a valid customElement tagName containing the URI hash.
 */
export function pluginTag(uri) {
    let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    for (let i = 0, ch; i < uri.length; i++) {
        ch = uri.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 =
        Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
            Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 =
        Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
            Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 'oscd-plugin' +
        ((h2 >>> 0).toString(16).padStart(8, '0') +
            (h1 >>> 0).toString(16).padStart(8, '0'));
}
//# sourceMappingURL=plugin-tag.js.map