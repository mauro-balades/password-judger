import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';


@customElement('password-judger')
export class PasswordJudger extends LitElement {
  static override styles = css`
    :host {
      width: 100%;
      height: 100vh;
    }
  `;

  @property()
  name = 'World';

  /**
   * The number of times the button has been clicked.
   */
  @property({type: Number})
  count = 0;

  override render() {
    return html`
      <h1>${this.sayHello(this.name)}!</h1>
      <button @click=${this._onClick} part="button">
        Click Count: ${this.count}
      </button>
      <slot></slot>
    `;
  }

  private _onClick() {
    this.count++;
    this.dispatchEvent(new CustomEvent('count-changed'));
  }

  /**
   * Formats a greeting
   * @param name The name to say "Hello" to
   */
  sayHello(name: string): string {
    return `Hello, ${name}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'password-judger': PasswordJudger;
  }
}
