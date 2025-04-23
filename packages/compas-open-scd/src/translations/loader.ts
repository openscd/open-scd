import { Strings } from 'lit-translate';
import { de as compasDe } from './de.js';
import { en as compasEn } from './en.js';
import { de as oscdDe } from '@openscd/open-scd/src/translations/de.js';
import { en as oscdEn } from '@openscd/open-scd/src/translations/en.js';

export type Language = 'en' | 'de';
export const languages = {
  en: { ...oscdEn, ...compasEn },
  de: { ...oscdDe, ...compasDe },
};

export type Translations = typeof compasEn;

export async function loader(lang: string): Promise<Strings> {
  if (Object.keys(languages).includes(lang)) return languages[<Language>lang];
  else return {};
}
