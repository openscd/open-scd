import { Browser, launch, Page } from 'puppeteer';
import { CucumberWorld } from '../support/cucumber-world';

export class BrowserDelegate {
    
    browser!: Browser;
    page!: Page;

    constructor(private world: CucumberWorld) {
    }

    async init(): Promise<void> {
        this.browser = await launch({
            headless: false
        });
        this.page = (await this.browser.pages())[0];
    }

    async destroy(): Promise<void> {
        await this.browser.close();
    }

    async navigate(): Promise<void> {

    }

}