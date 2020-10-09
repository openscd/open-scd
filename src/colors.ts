import { css, CSSResult } from 'lit-element';

export function getTheme(theme: string): CSSResult {
  return theme === 'night' ? mdcThemeLigth : mdcThemeNight;
}

export const baseThemeColor = css`
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
`;

export const mdcThemeLigth = css`
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

    --mdc-theme-primary: var(--violet);
    --mdc-theme-secondary: var(--orange);
    --mdc-theme-background: var(--base02);
    --mdc-theme-surface: var(--base2);
    --mdc-theme-on-secondary: var(--base3);
    --mdc-theme-on-background: var(--base2);
    --mdc-theme-on-surface: var(--base01);
    --mdc-theme-error: var(--red);

    --mdc-drawer-heading-ink-color: var(--base01);

    --mdc-text-field-fill-color: var(--base2);
    --mdc-text-field-disabled-fill-color: var(--base2);
    --mdc-text-field-ink-color: var(--base01);
    --mdc-text-field-label-ink-color: var(--base01);

    --mdc-select-fill-color: var(--base2);
    --mdc-select-disabled-fill-color: var(--base2);
    --mdc-select-ink-color: var(--base01);

    --mdc-dialog-heading-ink-color: var(--base01);

    --mdc-circular-progress-bar-color-1: var(--mdc-theme-primary);
    --mdc-circular-progress-bar-color-2: var(--mdc-theme-secondary);
    --mdc-circular-progress-bar-color-3: var(--mdc-theme-primary);
    --mdc-circular-progress-bar-color-4: var(--mdc-theme-background);
  }
`;

export const mdcThemeNight = css`
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

    --mdc-theme-primary: var(--violet);
    --mdc-theme-secondary: var(--orange);
    --mdc-theme-background: var(--base2);
    --mdc-theme-surface: var(--base02);
    --mdc-theme-on-secondary: var(--base3);
    --mdc-theme-on-background: var(--base1);
    --mdc-theme-on-surface: var(--base01);
    --mdc-theme-error: var(--red);

    --mdc-text-field-fill-color: var(--base02);
    --mdc-text-field-disabled-fill-color: var(--base02);

    --mdc-select-fill-color: var(--base02);
    --mdc-select-disabled-fill-color: var(--base02);

    --mdc-text-field-fill-color: var(--base02);
    --mdc-text-field-disabled-fill-color: var(--base02);
    --mdc-text-field-ink-color: var(--base2);
    --mdc-text-field-label-ink-color: var(--base2);
    --mdc-text-field-disabled-ink-color: var(--base2);

    --mdc-select-fill-color: var(--base02);
    --mdc-select-disabled-fill-color: var(--base02);

    --mdc-dialog-heading-ink-color: var(--base2);

    --mdc-circular-progress-bar-color-1: var(--mdc-theme-primary);
    --mdc-circular-progress-bar-color-2: var(--mdc-theme-secondary);
    --mdc-circular-progress-bar-color-3: var(--mdc-theme-primary);
    --mdc-circular-progress-bar-color-4: var(--mdc-theme-background);
  }
`;
