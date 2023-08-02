import { World, IWorldOptions } from '@cucumber/cucumber';
import { BrowserDelegate } from '../delegates/browser-delegate.js';

export class CucumberWorld extends World {

    readonly browser: BrowserDelegate;

    constructor(options: IWorldOptions) {
        super(options);
        this.browser = new BrowserDelegate(this);
    }

    async init(): Promise<void> {
        await this.browser.init();
    }

    async destroy(): Promise<void> {
        await this.browser.destroy();
    }

}