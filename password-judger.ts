import {LitElement, html, css} from './node_modules/lit-element/lit-element.js';
import {customElement, property} from './node_modules/lit-element/decorators.js';

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

      box-shadow: -0.6rem 0.6rem 0 rgba(29, 30, 28, 0.26);
      position: relative;
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

    p {
      font-size: 20px;
      opacity: .9;
      font-weight: 500;
    }

    a {
      position: absolute;

      width: 200px;
      height: 200px;

      left: 100%;
      top: 0;

      transform: translate(-50%, -50%);
      z-index: 4;
    }

    .box::before {
      content: "";
      
      position: absolute;
      left: 100%;
      top: 0;

      transform: translate(-50%, -50%);

      background-image: url("./images/star.png");
      background-repeat: no-repeat;
      background-size: cover;

      width: 200px;
      height: 200px;

      cursor: pointer;
      z-index: 2;
    }

    .box::after {
      content: "with AI!";
      
      position: absolute;
      left: 100%;
      top: 0;

      transform: translate(-50%, -50%);

      
      font-size: 25px;
      font-weight: 600;
      width: max-content;

      pointer-events: none;
      cursor: pointer;

      z-index: 3;
    }
  `;

  @property({type: Number})
  passwordLevel = 0;

  change(event: InputEvent) {
    let target = event.target as HTMLInputElement | null;
    if (target) {
      let value = target.value;
      if (value === "1234") {
        this.passwordLevel = 1234;
        return;
      } 

      var strength = 0;
    
      // Check password length
      if (value !== "") {
        strength += 1;
      }
    
      // Check for mixed case
      if (value.match(/[a-z]/) && value.match(/[A-Z]/)) {
        strength += 1;
      }
    
      // Check for numbers
      if (value.match(/\d/)) {
        strength += 1;
      }
    
      // Check for special characters
      if (value.match(/[^a-zA-Z\d]/)) {
        strength += 1;
      }
    
      // Return results
      this.passwordLevel = strength;
    }
  }

  override render() {
    return html`
      <div id="container">
        <div class="box">
          <a href="https://github.com/mauro-balades/password-judger" target="_blank"></a>
          <div>
            <div style="height: 100%; padding: 50px;">
              <h1>Password judger</h1>
              <br />
              <p>Introducing "Password Judger" - the revolutionary password checker powered by AI (Artificial Ignorance). Get ready to have your passwords scrutinized by an incredibly "intelligent" system that will amaze you with its comical judgments!</p>
              <br />
              <br />
              <h2>How does it work, you ask?</h2>
              <br />
              <p>Well, Password Judger utilizes a highly advanced AI algorithm called "Artificial Ignorance," designed to mimic the thought processes of the most clueless individuals. It leverages the power of sheer randomness and absurdity to evaluate your password choices with a touch of humor.</p>
              <br />
              <p>When you enter a password into Password Judger, our AI kicks into action, generating a series of completely nonsensical metrics and conducting the most irrational analysis imaginable. These metrics include:</p>
              <br />
              <h2>Strong password 101:</h2>
              <br />
              <p>More than <b>8 characters of length</b>, Contains <b>special characters</b>, Mixed cases for letters, Contains numbers. <b>IT MUST NOT BE "1234" ;)</b></p>
            </div>
            <div style="border-top: 4px solid rgba(0,0,0,.7);">
              <input @input=${this.change} placeholder="Type here your password" type="password" />
            </div>
          </div>
          <div style="border-left: 4px solid rgba(0,0,0,.7);">
            <img src="./images/pwd-${this.passwordLevel}.png" />
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
