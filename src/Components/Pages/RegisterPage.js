import { Redirect } from "../Router/Router";
import Navbar from "../Navbar/Navbar";
import anime from "animejs";

const registerDiv = `
        <div id="registerPage">
                <form id="registerForm" class="loginRegisterContainer">
                    <h3 class="loginText">Kwicker</h3>
                    <input class="inputForm fields" type="text" id="lastnameRegister" placeholder="Nom">
                    <input class="inputForm fields" type="text" id="forenameRegister" placeholder="Prénom">
                    <input class="inputForm fields" type="text" id="usernameRegister" placeholder="Nom d'utilisateur">
                    <input class="inputForm fields" type="email" id="emailRegister" placeholder="Adresse mail">
                    <input class="inputForm fields" type="password" id="passwordRegister" placeholder="Mot de passe">
                    <input class="inputForm fields" type="password" id="passwordConfirmationRegister" placeholder="Confirmez votre mot de passe">
                    <input class="inputForm submitButton" type="submit" value="S'inscrire" id="registerButton">
                    <a class="loginText" type="button" id="goToLogin">J'ai déjà un compte</a>
                    <div id="errorRegister" class="alert-danger"></div>
                </form>
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
    const form = document.getElementById("registerForm");
    let goToLogin = document.getElementById("goToLogin");
    goToLogin.addEventListener("click", e => {
        e.preventDefault();
        Redirect("/login");
    });
    form.addEventListener("submit", register);

}

async function register (e) {
    e.preventDefault();
    const errorLogin = document.getElementById("errorRegister");
    const password = document.getElementById("passwordRegister").value;
    const passwordConfirmation = document.getElementById("passwordConfirmationRegister").value;
    errorLogin.innerHTML = "";
    let user;

    try{
    if(password !== passwordConfirmation) {
        errorLogin.innerHTML = "<h2>Les mots de passe ne sont pas identiques</h2>";
        throw new Error("Passwords don't match");
    }
<<<<<<< HEAD

=======
>>>>>>> fea0641ee5ddada619d4f2438ce310189bf1d9bb
    user = {
        lastname: document.getElementById("lastnameRegister").value,
        forename: document.getElementById("forenameRegister").value,
        username: document.getElementById("usernameRegister").value,
        email: document.getElementById("emailRegister").value,
        password: password,
    }

    //Si erreur dans le formulaire alors fait trembler le formulaire en catchant l'exception lancée
        if(!user.lastname){
            errorLogin.innerHTML = `<h2>Tu dois entrer un nom !</h2>`;
            throw new Error("No lastname");
        } else if (!user.forename){
            errorLogin.innerHTML = `<h2>Tu dois entrer un prénom !</h2>`;
            throw new Error("No forename");
        } else if (!user.username){
            errorLogin.innerHTML = `<h2>Tu dois entrer un pseudo !</h2>`;
            throw new Error("No username");
        } else if (!user.email){
            errorLogin.innerHTML = `<h2>Tu dois entrer un email !</h2>`;
            throw new Error("No email");
        } else if (!user.password){
            errorLogin.innerHTML = `<h2>Tu dois entrer un mot de passe !</h2>`;
            throw new Error("No password");
        }
    }catch (e) {
        console.error("LoginPage::error ", e);
        const xMax = 16;
        anime({
            targets: 'form',
            easing: 'easeInOutSine',
            duration: 550,
            translateX: [{value: xMax * -1,}, {value: xMax,},{value: xMax/-2,},{value: xMax/2,}, {value: 0}],
            scale: [{value:1.05},{value:1, delay: 250} ],
        });
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
