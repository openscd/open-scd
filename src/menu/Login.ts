import { LitElement} from 'lit-element';
import { login } from '../state/auth/KeycloakManager.js';

export default class LoginPlugin extends LitElement {
  async run(): Promise<void> {
    return login();
  }
}
