import { customElement, LitElement, html, TemplateResult } from 'lit-element';
import './open-scd.ts';

@customElement('open-scd-wrapper')
export class OpenSCDWrapper extends LitElement {
  render(): TemplateResult {
    return html`
      <meta charset="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, viewport-fit=cover"
      />
      <meta
        name="Description"
        content="Open Substation Communication Designer is a bottom-up system configuration tool for projects described using IEC 61850-6 Edition 2 or greater."
      />
      <base href="/" />

      <!-- Original URL from Google: https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&family=Roboto:wght@300;400;500&display=swap -->
      <link href="public/google/fonts/roboto-v27.css" rel="stylesheet" />
      <link href="public/google/fonts/roboto-mono-v13.css" rel="stylesheet" />
      <!-- Original URL from Google: https://fonts.googleapis.com/css?family=Material+Icons+Outlined&display=block -->
      <link
        href="public/google/icons/material-icons-outlined.css"
        rel="stylesheet"
      />
      <link href="public/css/normalize.css" rel="stylesheet" />

      <link rel="manifest" href="manifest.json" />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="public/favicon-16x16.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="public/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="public/icon-192x192.png"
      />

      <title>OpenSCD</title>

      <script>
        const _customElementsDefine = window.customElements.define;
        window.customElements.define = (name, cl, conf) => {
          if (!customElements.get(name)) {
            _customElementsDefine.call(window.customElements, name, cl, conf);
          }
        };
      </script>

      <script>
        if ('serviceWorker' in navigator)
          navigator.serviceWorker.register('/sw.js');
      </script>

      <script>
        const openScd = document.querySelector('open-scd');
        addEventListener('beforeunload', e => {
          if (openScd && openScd.doc) {
            e.preventDefault();
            return (e.returnValue = 'Are you sure you want to exit?');
          }
        });
      </script>

      <open-scd></open-scd>
    `;
  } // render

  protected createRenderRoot(): Element | ShadowRoot {
    return this;
  }
}
