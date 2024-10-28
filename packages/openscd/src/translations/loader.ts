import { Strings } from 'lit-translate';
import { de } from './de.js';
import { en } from './en.js';
import { Language } from '@openscd/core/foundation/deprecated/settings.js';
export const languages = { en, de };

export type Translations = typeof en;

export async function loader(lang: string): Promise<Strings> {
  if (Object.keys(languages).includes(lang)) return languages[<Language>lang];
  else return {};
}
