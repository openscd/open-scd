import { html, TemplateResult } from 'lit-element';
import { Settings } from './Setting.js';

export function getTheme(theme: Settings['theme']): TemplateResult {
  document.body.style.cssText = bodyStyles[theme];
  return html`
    ${themes[theme]}
    <style>
      * {
        --primary: var(--cyan);
        --secondary: var(--violet);
        --mdc-theme-primary: var(--primary);
        --mdc-theme-secondary: var(--secondary);
        --mdc-theme-background: var(--base3);
        --mdc-theme-surface: var(--base3);
        --mdc-theme-on-primary: var(--base2);
        --mdc-theme-on-secondary: var(--base2);
        --mdc-theme-on-background: var(--base00);
        --mdc-theme-on-surface: var(--base00);
        --mdc-theme-error: var(--red);

        --mdc-drawer-heading-ink-color: var(--base00);

        --mdc-text-field-fill-color: var(--base2);
        --mdc-text-field-disabled-fill-color: var(--base3);
        --mdc-text-field-ink-color: var(--base00);
        --mdc-text-field-label-ink-color: var(--base00);

        --mdc-select-fill-color: var(--base2);
        --mdc-select-disabled-fill-color: var(--base3);
        --mdc-select-ink-color: var(--base00);

        --mdc-dialog-heading-ink-color: var(--base00);

        --mdc-circular-progress-bar-color-1: var(--mdc-theme-primary);
        --mdc-circular-progress-bar-color-2: var(--mdc-theme-on-background);
        --mdc-circular-progress-bar-color-3: var(--mdc-theme-secondary);
        --mdc-circular-progress-bar-color-4: var(--mdc-theme-on-background);
      }

      abbr {
        text-decoration: none;
        border-bottom: none;
      }
    </style>
  `;
}

const bodyStyles: Record<Settings['theme'], string> = {
  dark: 'background: #073642',
  light: 'background: #eee8d5',
};

const themes: Record<Settings['theme'], TemplateResult> = {
  light: html`
    <style>
      * {
        --base03: #002b36;
        --base02: #073642;
        --base01: #586e75;
        --base00: #657b83;
        --base0: #839496;
        --base1: #93a1a1;
        --base2: #eee8d5;
        --base3: #fdf6e3;
        --yellow: #b58900;
        --orange: #cb4b16;
        --red: #dc322f;
        --magenta: #d33682;
        --violet: #6c71c4;
        --blue: #268bd2;
        --cyan: #2aa198;
        --green: #859900;
      }
    </style>
  `,
  dark: html`
    <style>
      * {
        --base03: #fdf6e3;
        --base02: #eee8d5;
        --base01: #93a1a1;
        --base00: #839496;
        --base0: #657b83;
        --base1: #586e75;
        --base2: #073642;
        --base3: #002b36;
        --yellow: #b58900;
        --orange: #cb4b16;
        --red: #dc322f;
        --magenta: #d33682;
        --violet: #6c71c4;
        --blue: #268bd2;
        --cyan: #2aa198;
        --green: #859900;
      }
    </style>
  `,
};
