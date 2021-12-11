// import { Redirect } from "../Router/Router";
import logoKwicker from "../../img/banniereKiwi.png";

const loginDiv = `
        <div id="registerPage">
            <div class="loginRegisterContainer" id="loginContainer">
                <img src="" alt="Logo Kwicker" id="logoRegister">
                <input class="inputForm fields" type="email" id="mailRegister" placeholder="Adresse mail">
                <input class="inputForm fields" type="password" id="passwordRegister" placeholder="Mot de passe">
                <input class="inputForm submitButton" type="submit" value="Se connecter">
            </div>
        </div>
    `;


/**
 * Render the NewPage :
 * Just an example to demonstrate how to use the router to "redirect" to a new page
 */
function LoginPage() {
    const pageDiv = document.querySelector("#page");
    pageDiv.innerHTML = loginDiv;
    const logo = document.querySelector("#logoRegister");
    logo.src = logoKwicker;
}

export default LoginPage;