import { setDefaultTimeout, setWorldConstructor } from '@cucumber/cucumber';
import { CucumberWorld } from './cucumber-world';

setWorldConstructor(CucumberWorld);
setDefaultTimeout(10000);