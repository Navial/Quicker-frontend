import { Redirect } from "../Router/Router";
import logoKwicker from "../../img/banniereKiwi.png";
import Navbar from "../Navbar/Navbar";

const registerDiv = `
        <div id="registerPage">
            <div class="loginRegisterContainer">
                <img src="" alt="Logo Kwicker" id="logoRegister">
                <form id="registerForm">
                    <input class="inputForm fields" type="text" id="lastnameRegister" placeholder="Nom">
                    <input class="inputForm fields" type="text" id="forenameRegister" placeholder="Prénom">
                    <input class="inputForm fields" type="text" id="usernameRegister" placeholder="Nom d'utilisateur">
                    <input class="inputForm fields" type="email" id="emailRegister" placeholder="Adresse mail">
                    <input class="inputForm fields" type="password" id="passwordRegister" placeholder="Mot de passe">
                    <input class="inputForm fields" type="password" id="passwordConfirmationRegister" placeholder="Confirmez votre mot de passe">
                    <input class="inputForm submitButton" type="submit" value="S'inscrire" id="registerButton">
                </form>
            </div>
            <div id="errorRegister" class="alert-danger"></div>
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
    const form = document.getElementById("registerForm");
    form.addEventListener("submit", register);
}

async function register (e) {
    e.preventDefault();
    const errorLogin = document.getElementById("errorRegister");
    const password = document.getElementById("passwordRegister").value;
    const passwordConfirmation = document.getElementById("passwordConfirmationRegister").value;
    if(password !== passwordConfirmation) {
        errorLogin.innerHTML = "<h2>Les mots de passe ne sont pas identiques</h2>";
        throw new Error("Passwords don't match");
    } else
        errorLogin.innerHTML = "";

    const user = {
        lastname: document.getElementById("lastnameRegister").value,
        forename: document.getElementById("forenameRegister").value,
        username: document.getElementById("usernameRegister").value,
        email: document.getElementById("emailRegister").value,
        password: password,
    }
    if(!user.lastname){
        errorLogin.innerHTML = `<h2>Tu dois entrer un nom!</h2>`;
        throw new Error("No lastname");
    } else if (!user.forename){
        errorLogin.innerHTML = `<h2>Tu dois entrer un prénom!</h2>`;
        throw new Error("No forename");
    } else if (!user.username){
        errorLogin.innerHTML = `<h2>Tu dois entrer un pseudo!</h2>`;
        throw new Error("No username");
    } else if (!user.email){
        errorLogin.innerHTML = `<h2>Tu dois entrer un email!</h2>`;
        throw new Error("No email");
    } else if (!user.password){
        errorLogin.innerHTML = `<h2>Tu dois entrer un mot de passe!</h2>`;
        throw new Error("No password");
    } else {
        errorLogin.innerHTML = "";
    }

    const request = {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
    };
    try {
        const response = await fetch("api/users/register", request);

        if (!response.ok) {
            errorLogin.innerHTML = "<h2>Problème lors de l'inscription.</h2>";
            throw new Error("fetch error : " + response.status + " : " + response.statusText);
        } else {
            errorLogin.innerHTML = "";
        }

        const user = await response.json();
        window.localStorage.setItem("user", JSON.stringify(user));
        Navbar();
        Redirect("/");
    } catch (e) {
        console.error("LoginPage::error ", e);
    }
}

export default RegisterPage;
