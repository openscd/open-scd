import { de } from './de.js';
import { en } from './en.js';
export const languages = { en, de };
export async function loader(lang) {
    if (Object.keys(languages).includes(lang))
        return languages[lang];
    else
        return {};
}
//# sourceMappingURL=loader.js.map