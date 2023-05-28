import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

const strengthLevels = [
    /^.{0,5}$/,          // Any password with 5 or fewer characters
    /^(?=.*[a-z]).{6,10}$/,     // At least one lowercase letter, 6-10 characters
    /^(?=.*[a-z])(?=.*[A-Z]).{8,12}$/,  // At least one lowercase and one uppercase letter, 8-12 characters
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/ // At least one lowercase, one uppercase, and one digit, 10 or more characters
];

@customElement('password-judger')
export class PasswordJudger extends LitElement {
  static override styles = css`
    * {
      -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
              box-sizing: border-box;
              
      margin: 0;
      padding: 0;
    }

    :host {
      width: 100%;
      height: 100vh;
    }

    #noise {
      height: 100%;
      left: 0;
      opacity: .4;
      pointer-events: none;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 10000;
      background: -webkit-linear-gradient(rgba(18,16,16,0) 50%,rgba(0,0,0,0.25) 50%),-webkit-linear-gradient(left,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06));
      background: linear-gradient(rgba(18,16,16,0) 50%,rgba(0,0,0,0.25) 50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06));
      background-size: 100% 2px,3px 100%;
    }

    #container {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #54b9ad;
      position: relative;
      font-family: "Quicksand",sans-serif;
      font-weight: 500;

      border-radius: 5px;
      padding: 5%;
    }

    .box {
      width: 100%;
      height: 100%;

      border: 4px solid #000;
      background: #fff;

      display: flex;
      font-size: 20px;
    }

    .box > div {
      height: 100%;
      width: 50%;
      position: relative;

      display: flex;
      flex-direction: column;
    }

    input {
      border: none;
      outline: none;

      width: 100%;
      height: 25px;
      padding: 25px;

      font-size: 20px;
      font-weight: bold;
    }

    img {
      image-rendering: pixelated;
    }
  `;

  @property({type: Number})
  passwordLevel = 0;

  change(event: InputEvent) {
    let target = event.target as HTMLInputElement | null;
    if (target) {
      for (let level = 0; level < strengthLevels.length; level++) {
        if (strengthLevels[level].test(target.value)) {
          console.log(level)
          this.passwordLevel = level;
          super.requestUpdate();
          return;
        }
      }

      this.passwordLevel = 4;
    }
  }

  override render() {
    return html`
      <div id="container">
        <div class="box">
          <div>
            <div style="height: 100%;"></div>
            <div style="border-top: 4px solid rgba(0,0,0,.5);">
              <input @input=${this.change} placeholder="Type here your password" type="password" />
            </div>
          </div>
          <div style="border-left: 4px solid rgba(0,0,0,.5);">
            <img src="/images/pwd-${this.passwordLevel}.png" />
          </div>
        </div>
      </div>
      <div id="noise"></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'password-judger': PasswordJudger;
  }
}
