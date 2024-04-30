/**
 * Hashes `str` using the cyrb64 variant of
 * https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js
 * @returns digest - a rather insecure hash, very quickly
 */
export declare function cyrb64(str: string): string;
