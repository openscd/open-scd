import { visualDiff } from '@web/test-runner-visual-regression';
import './open-scd.js';
import { expect } from '@open-wc/testing';
import { newEditEvent, newOpenEvent } from './foundation.js';
import { allLocales } from './locales.js';
const factor = window.process && process.env.CI ? 4 : 2;
function timeout(ms) {
    return new Promise(res => setTimeout(res, ms * factor));
}
mocha.timeout(2000 * factor);
const doc = new DOMParser().parseFromString(`<testdoc></testdoc>`, 'application/xml');
let editor;
beforeEach(() => {
    editor = document.createElement('open-scd');
    document.body.prepend(editor);
});
afterEach(() => {
    editor.remove();
});
it(`changes locales on attribute change`, async () => {
    editor.setAttribute('locale', 'invalid');
    await editor.updateComplete;
    expect(editor).to.have.property('locale', 'en');
    editor.setAttribute('locale', 'de');
    await editor.updateComplete;
    await timeout(180);
    await editor.updateComplete;
    expect(editor).to.have.property('locale', 'de');
});
allLocales.forEach(lang => describe(`translated to ${lang}`, () => {
    beforeEach(async () => {
        editor.setAttribute('locale', lang);
        await editor.updateComplete;
        expect(editor).to.have.property('locale', lang);
    });
    it(`displays a top app bar`, async () => {
        await editor.updateComplete;
        await timeout(20);
        await visualDiff(editor, `app-bar-${lang}`);
    });
    it(`displays a menu on button click`, async () => {
        var _a, _b;
        await editor.updateComplete;
        (_b = (_a = editor.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-icon-button[icon="menu"]')) === null || _b === void 0 ? void 0 : _b.click();
        await editor.updateComplete;
        await timeout(200);
        await visualDiff(editor, `menu-drawer-${lang}`);
    });
    it(`displays a current document title`, async () => {
        await editor.updateComplete;
        editor.dispatchEvent(newOpenEvent(doc, 'test.xml'));
        await editor.updateComplete;
        await timeout(20);
        await visualDiff(editor, `document-name-${lang}`);
    });
    it(`shows a log screen`, async () => {
        var _a, _b, _c, _d;
        await editor.updateComplete;
        (_b = (_a = editor.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-icon-button[icon="menu"]')) === null || _b === void 0 ? void 0 : _b.click();
        (_d = (_c = editor.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector('mwc-list-item:last-child')) === null || _d === void 0 ? void 0 : _d.click();
        await editor.updateComplete;
        await timeout(200);
        await visualDiff(editor, `log-screen-${lang}`);
    });
    it(`shows log entries`, async () => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        const parent = doc.documentElement;
        const node = doc.createElement('test');
        const reference = doc.querySelector('testchild');
        editor.dispatchEvent(newEditEvent({ parent, node, reference }));
        editor.dispatchEvent(newEditEvent({ parent, node, reference: null }));
        const element = doc.querySelector('testdoc');
        editor.dispatchEvent(newEditEvent({
            element,
            attributes: {
                name: 'A2',
                desc: null,
                'myns:attr': {
                    value: 'namespaced value',
                    namespaceURI: 'http://example.org/myns',
                },
            },
        }));
        editor.dispatchEvent(newEditEvent({ node }));
        editor.dispatchEvent(newEditEvent([
            { parent, node, reference },
            { parent, node, reference: null },
            'invalid edit',
        ]));
        await editor.updateComplete;
        (_b = (_a = editor.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-icon-button[icon="history"]')) === null || _b === void 0 ? void 0 : _b.click();
        await editor.updateComplete;
        await timeout(200);
        await visualDiff(editor, `log-entries-${lang}`);
        (_d = (_c = editor.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector('mwc-icon-button[icon="undo"]')) === null || _d === void 0 ? void 0 : _d.click();
        await editor.updateComplete;
        (_f = (_e = editor.shadowRoot) === null || _e === void 0 ? void 0 : _e.querySelector('mwc-icon-button[icon="undo"]')) === null || _f === void 0 ? void 0 : _f.click();
        await editor.updateComplete;
        (_h = (_g = editor.shadowRoot) === null || _g === void 0 ? void 0 : _g.querySelector('mwc-icon-button[icon="undo"]')) === null || _h === void 0 ? void 0 : _h.click();
        await editor.updateComplete;
        (_k = (_j = editor.shadowRoot) === null || _j === void 0 ? void 0 : _j.querySelector('mwc-icon-button[icon="undo"]')) === null || _k === void 0 ? void 0 : _k.click();
        await editor.updateComplete;
        editor.dispatchEvent(new KeyboardEvent('keydown', {
            key: 'z',
            ctrlKey: true,
            bubbles: true,
            composed: true,
        }));
        editor.dispatchEvent(new KeyboardEvent('keydown', {
            key: 'y',
            ctrlKey: false,
            bubbles: true,
            composed: true,
        }));
        editor.dispatchEvent(new KeyboardEvent('keydown', {
            key: 'X',
            ctrlKey: true,
            bubbles: true,
            composed: true,
        }));
        await editor.updateComplete;
        await timeout(20);
        await visualDiff(editor, `log-entries-undone-${lang}`);
        (_m = (_l = editor.shadowRoot) === null || _l === void 0 ? void 0 : _l.querySelector('mwc-icon-button[icon="redo"]')) === null || _m === void 0 ? void 0 : _m.click();
        await editor.updateComplete;
        (_p = (_o = editor.shadowRoot) === null || _o === void 0 ? void 0 : _o.querySelector('mwc-icon-button[icon="redo"]')) === null || _p === void 0 ? void 0 : _p.click();
        await editor.updateComplete;
        await timeout(20);
        await visualDiff(editor, `log-entries-redone-${lang}`);
    });
    describe('with menu plugins loaded', () => {
        beforeEach(async () => {
            editor.plugins = {
                editor: [],
                menu: [
                    {
                        name: 'Test Menu Plugin',
                        translations: { de: 'Test Menü Erweiterung' },
                        src: 'data:text/javascript;charset=utf-8,export%20default%20class%20TestPlugin%20extends%20HTMLElement%20%7B%0D%0A%20%20async%20run%28%29%20%7B%0D%0A%20%20%20%20return%20false%3B%0D%0A%20%20%7D%0D%0A%7D',
                        icon: 'android',
                        active: true,
                        requireDoc: true,
                    },
                    {
                        name: 'Test Menu Plugin 2',
                        src: 'data:text/javascript;charset=utf-8,export%20default%20class%20TestPlugin%20extends%20HTMLElement%20%7B%0D%0A%20%20async%20run%28%29%20%7B%0D%0A%20%20%20%20this.dispatchEvent%28new%20CustomEvent%28%27oscd-open%27%2C%20%7Bdetail%3A%20%7BdocName%3A%20%27testDoc%27%2C%20doc%3A%20window.document%7D%2C%20bubbles%3A%20true%2C%20composed%3A%20true%7D%29%29%3B%0D%0A%20%20%7D%0D%0A%7D',
                        icon: 'polymer',
                        active: true,
                        requireDoc: false,
                    },
                    {
                        name: 'Test Menu Plugin 3',
                        translations: { de: 'Test Menü Erweiterung 3' },
                        src: 'data:text/javascript;charset=utf-8,export%20default%20class%20BrokenTestPlugin%20extends%20HTMLElement%20%7B%0D%0A%20%20%2F%2F%20oh%20NO%21%20There%27s%20no%20run%20method%21%0D%0A%7D',
                        icon: 'dry',
                        active: true,
                        requireDoc: false,
                    },
                    {
                        name: 'Test Menu Plugin 4',
                        translations: { de: 'Test Menü Erweiterung 4' },
                        src: 'data:text/javascript;charset=utf-8,export%20default%20class%20BrokenTestPlugin%20extends%20HTMLElement%20%7B%0D%0A%20%20%2F%2F%20oh%20no%21%20There%27s%20no%20run%20method%21%0D%0A%7D',
                        icon: 'translate',
                        active: false,
                        requireDoc: true,
                    },
                ],
            };
            await editor.updateComplete;
        });
        it('displays menu plugins in the menu', async () => {
            var _a, _b;
            (_b = (_a = editor.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-icon-button[icon="menu"]')) === null || _b === void 0 ? void 0 : _b.click();
            await editor.updateComplete;
            await timeout(200);
            await visualDiff(editor, `menu-plugins-${lang}`);
        });
        it('triggers menu plugins on menu entry click', async () => {
            var _a, _b, _c, _d, _e, _f;
            (_b = (_a = editor.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-icon-button[icon="menu"]')) === null || _b === void 0 ? void 0 : _b.click();
            await editor.updateComplete;
            await timeout(200);
            (_d = (_c = editor.menuUI) === null || _c === void 0 ? void 0 : _c.querySelector('mwc-list-item:nth-of-type(2)')) === null || _d === void 0 ? void 0 : _d.click();
            (_f = (_e = editor.menuUI) === null || _e === void 0 ? void 0 : _e.querySelector('mwc-list-item:nth-of-type(3)')) === null || _f === void 0 ? void 0 : _f.click();
            await editor.updateComplete;
            await timeout(200);
            expect(editor.docName).to.equal('testDoc');
            await editor.updateComplete;
            await visualDiff(editor, `menu-plugins-triggered-${lang}`);
        });
    });
    describe('with editor plugins loaded', () => {
        beforeEach(async () => {
            editor.plugins = {
                menu: [],
                editor: [
                    {
                        name: 'Test Editor Plugin',
                        translations: { de: 'Test Editor Erweiterung' },
                        src: 'data:text/javascript;charset=utf-8,export%20default%20class%20TestEditorPlugin%20extends%20HTMLElement%20%7B%0D%0A%20%20constructor%20%28%29%20%7B%20super%28%29%3B%20this.innerHTML%20%3D%20%60%3Cp%3ETest%20Editor%20Plugin%3C%2Fp%3E%60%3B%20%7D%0D%0A%7D',
                        icon: 'edit',
                        active: true,
                        requireDoc: true,
                    },
                    {
                        name: 'Test Editor Plugin 2',
                        src: 'data:text/javascript;charset=utf-8,export%20default%20class%20TestEditorPlugin2%20extends%20HTMLElement%20%7B%0D%0A%20%20constructor%20%28%29%20%7B%20super%28%29%3B%20this.innerHTML%20%3D%20%60%3Cp%3ETest%20Editor%20Plugin%202%3C%2Fp%3E%60%3B%20%7D%0D%0A%7D',
                        icon: 'android',
                        active: true,
                        requireDoc: false,
                    },
                    {
                        name: 'Test Editor Plugin 3',
                        translations: { de: 'Test Editor Erweiterung 3' },
                        src: 'data:text/javascript;charset=utf-8,export%20default%20class%20EditorPluginTest3%20extends%20HTMLElement%20%7B%0D%0A%20%20%20%20constructor%20%28%29%20%7B%0D%0A%09%2F%2F%20Create%20a%20shadow%20root%0D%0A%09this.attachShadow%28%7B%20mode%3A%20%22open%22%20%7D%29%3B%20%2F%2F%20sets%20and%20returns%20%27this.shadowRoot%27%0D%0A%0D%0A%09const%20info%20%3D%20wrapper.appendChild%28document.createElement%28%22span%22%29%29%3B%0D%0A%09info.setAttribute%28%22class%22%2C%20%22info%22%29%3B%0D%0A%09%2F%2F%20Take%20attribute%20content%20and%20put%20it%20inside%20the%20info%20span%0D%0A%09info.textContent%20%3D%20this.getAttribute%28%22docName%22%29%20%7C%7C%20%27no%20docName%20Test3%27%3B%0D%0A%0D%0A%09%2F%2F%20attach%20the%20created%20elements%20to%20the%20shadow%20DOM%0D%0A%09this.shadowRoot.append%28style%2C%20info%29%3B%0D%0A%20%20%20%20%7D%0D%0A%7D%3B',
                        icon: 'polymer',
                        active: true,
                        requireDoc: false,
                    },
                    {
                        name: 'Test Editor Plugin 4',
                        translations: { de: 'Test Editor Erweiterung 4' },
                        src: 'data:text/javascript;charset=utf-8,export%20default%20class%20TestEditorPlugin4%20extends%20HTMLElement%20%7B%0D%0A%20%20constructor%20%28%29%20%7B%20super%28%29%3B%20this.innerHTML%20%3D%20%60%3Cp%3ETest%20Editor%20Plugin%204%3C%2Fp%3E%60%3B%20%7D%0D%0A%7D',
                        icon: 'edit',
                        active: false,
                        requireDoc: true,
                    },
                ],
            };
            await editor.updateComplete;
        });
        it('displays editor plugins', async () => {
            await visualDiff(editor, `editor-plugins-${lang}`);
        });
        it('displays more tabs with a doc loaded', async () => {
            editor.dispatchEvent(newOpenEvent(doc, 'test.xml'));
            await editor.updateComplete;
            await visualDiff(editor, `editor-plugins-with-doc-${lang}`);
        });
        it('changes active editor plugin on tab click', async () => {
            var _a, _b;
            (_b = (_a = editor.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-tab:nth-of-type(2)')) === null || _b === void 0 ? void 0 : _b.click();
            await editor.updateComplete;
            await timeout(120);
            await visualDiff(editor, `editor-plugins-selected-${lang}`);
        });
    });
}));
//# sourceMappingURL=open-scd.test.js.map