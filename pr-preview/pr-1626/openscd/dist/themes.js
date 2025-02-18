import { html } from '../../_snowpack/pkg/lit-element.js';
export function getTheme(theme) {
    document.body.style.cssText = bodyStyles[theme];
    return html `
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
        --mdc-theme-text-primary-on-background: var(--base01);
        --mdc-theme-text-secondary-on-background: var(--base00);
        --mdc-theme-text-icon-on-background: var(--base00);
        --mdc-theme-error: var(--red);

        --mdc-button-disabled-ink-color: var(--base1);

        --mdc-drawer-heading-ink-color: var(--base00);

        --mdc-text-field-fill-color: var(--base2);
        --mdc-text-field-disabled-fill-color: var(--base3);
        --mdc-text-field-ink-color: var(--base00);
        --mdc-text-field-label-ink-color: var(--base00);

        --mdc-select-fill-color: var(--base2);
        --mdc-select-disabled-fill-color: var(--base3);
        --mdc-select-ink-color: var(--base00);

        --mdc-dialog-heading-ink-color: var(--base00);

        --mdc-icon-font: 'Material Icons Outlined';

        --oscd-primary: var(--oscd-theme-primary, var(--cyan));
        --oscd-secondary: var(--oscd-theme-secondary, var(--violet));
        --oscd-error: var(--oscd-theme-error, var(--red));

        --oscd-base03: var(--oscd-theme-base03, var(--base03));
        --oscd-base02: var(--oscd-theme-base02, var(--base02));
        --oscd-base01: var(--oscd-theme-base01, var(--base01));
        --oscd-base00: var(--oscd-theme-base00, var(--base00));
        --oscd-base0: var(--oscd-theme-base0, var(--base0));
        --oscd-base1: var(--oscd-theme-base1, var(--base1));
        --oscd-base2: var(--oscd-theme-base2, var(--base2));
        --oscd-base3: var(--oscd-theme-base3, var(--base3));

        --oscd-text-font: var(--oscd-theme-text-font, 'Roboto');
        --oscd-icon-font: var(--oscd-theme-icon-font, 'Material Icons');
      }

      .mdc-drawer span.mdc-drawer__title {
        color: var(--mdc-theme-text-primary-on-background) !important;
      }

      abbr {
        text-decoration: none;
        border-bottom: none;
      }

      mwc-textfield[iconTrailing='search'] {
        --mdc-shape-small: 28px;
      }
    </style>
  `;
}
const bodyStyles = {
    dark: 'background: #073642',
    light: 'background: #eee8d5',
};
const themes = {
    light: html `
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
    dark: html `
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
//# sourceMappingURL=themes.js.map