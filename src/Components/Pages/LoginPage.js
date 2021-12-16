import logoKwicker from "../../img/banniereKiwi.png";
import Navbar from "../Navbar/Navbar";
import {Redirect} from "../Router/Router";
import anime from "animejs";

const loginDiv = `
        <div id="loginPage">
            <div id="loginContainer">
                <form id="loginForm" class="loginRegisterContainer">
                    <img src="" alt="Logo Kwicker" id="logoRegister">
                    <input class="inputForm fields" type="text" id="usernameLogin" placeholder="Pseudo">
                    <input class="inputForm fields" type="password" id="passwordLogin" placeholder="Mot de passe">
                    <input class="inputForm submitButton" type="submit" value="Se connecter">
                    <div id="errorLogin" class="alert-danger"></div>
                </form>
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
    const form = document.getElementById("loginForm");
    form.addEventListener("submit", login);
}

async function login(e) {
    e.preventDefault();
    const username = document.getElementById("usernameLogin").value;
    const password = document.getElementById("passwordLogin").value;
    const errorLogin = document.getElementById("errorLogin");
    errorLogin.innerHTML = "";

    //Verify the user entered all informations to log in and show an error message if not
    try{
        if (!username) {
            errorLogin.innerHTML = `<h2>Tu dois entrer un pseudo!</h2>`;
            throw new Error("No username");
        } else if (!password) {
            errorLogin.innerHTML = `<h2>Tu dois entrer un mot de passe.</h2>`;
            throw new Error("No password");
        } else {
        }
    }catch (e) {
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
        body: JSON.stringify(
            {
                username: username,
                password: password
            }
        ),
        headers: {
            "Content-Type": "application/json"
        }
    };
    try {
        const response = await fetch("api/users/login", request);

        if (!response.ok) {
            errorLogin.innerHTML = "<h2>Problème lors de la connexion.</h2>";
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
        const xMax = 16;
        anime({
            targets: 'form',
            easing: 'easeInOutSine',
            duration: 550,
            translateX: [{value: xMax * -1,}, {value: xMax,},{value: xMax/-2,},{value: xMax/2,}, {value: 0}],
            scale: [{value:1.05},{value:1, delay: 250} ],
        });
    }
}

export default LoginPage;