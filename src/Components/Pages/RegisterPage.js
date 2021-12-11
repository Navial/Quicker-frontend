import { Redirect } from "../Router/Router";
import logoKwicker from "../../img/banniereKiwi.png";

const registerDiv = `
        <div id="registerPage">
            <div class="loginRegisterContainer">
                <img src="" alt="Logo Kwicker" id="logoRegister">
                <input class="inputForm fields" type="text" id="nomRegister" placeholder="Nom">
                <input class="inputForm fields" type="text" id="prenomRegister" placeholder="Prénom">
                <input class="inputForm fields" type="text" id="pseudoRegister" placeholder="Nom d'utilisateur">
                <input class="inputForm fields" type="email" id="mailRegister" placeholder="Adresse mail">
                <input class="inputForm fields" type="password" id="passwordRegister" placeholder="Mot de passe">
                <input class="inputForm fields" type="password" id="confirmerPasswordRegister" placeholder="Confirmez votre mot de passe">
                <input class="inputForm submitButton" type="submit" value="S'inscrire" id="registerButton">
            </div>
        </div>
    `;


/**
 * Render the NewPage :
 * Just an example to demonstrate how to use the router to "redirect" to a new page
 */
function RegisterPage() {
    const pageDiv = document.querySelector("#page");
    pageDiv.innerHTML = registerDiv;
    // Créer d'abord l'élément dans le innerHTML puis le querySelector pour séléctionner
    // l'élément qui vient d'être créer
    const logo = document.querySelector("#logoRegister");
    logo.src = logoKwicker;
}

export default RegisterPage;
