import { Before, After } from '@cucumber/cucumber';
import { CucumberWorld } from './cucumber-world';

Before(async function(this: CucumberWorld) {
    await this.init();
});

After(async function(this: CucumberWorld) {
    await this.destroy();
});