import { Redirect } from "../Router/Router";

const registerDiv = `
        <div id="registerPage">
            <p>Kwicker</p>
            <input type="text" id="nomRegister" placeholder="Nom">
            <input type="text" id="prenomRegister" placeholder="Prénom">
            <input type="text" id="pseudoRegister" placeholder="Nom d'utilisateur">
            <input type="email" id="mailRegister" placeholder="Adresse mail">
            <input type="password" id="passwordRegister" placeholder="Mot de passe">
            <input type="password" id="confirmerPasswordRegister" placeholder="Confirmez votre mot de passe">
            <input type="submit" value="S'inscrire" id="registerButton">
        </div>
    `;


/**
 * Render the NewPage :
 * Just an example to demonstrate how to use the router to "redirect" to a new page
 */
function RegisterPage() {
    // Deal with your NewPage content here
    const pageDiv = document.querySelector("#page");


    // submit.addEventListener("click", () => {
    //     Redirect("/");
    // });
    pageDiv.innerHTML = registerDiv;
}

export default RegisterPage;
