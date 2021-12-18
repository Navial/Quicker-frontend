import GetPostsModule from "../Modules/GetPostsModule";
import {Redirect} from "../Router/Router";
import load_user from "../../utils/load_user";

const ProfilePage = async () => {

    // Init
    const pageDiv = document.querySelector("#page");
    pageDiv.innerHTML = ``;

    // Get base user informations
    const actualUser = load_user.loadUser();
    const user = await getBaseInformationsUser(actualUser.id_user);
    let biography = user.biography;
    if (biography === null) {
        biography = "";
    }
    pageDiv.innerHTML += `
            <div class="mainContent" id="contentProfilePage">
                <div id="">
                    <div id="banner">
                        <p style="text-align: center; font-size: 30px; color: #cdc7e2;">Settings</p>
                    </div>
                    <div id="userContainer">
                    <form>
                      <div class="row">
                        <div class="col">
                          <label for="fornamechange">Firstname</label>
                          <input type="text" id="fornamechange" class="form-control change-form" value="${user.forename}">
                        </div>
                        <div class="col">
                          <label for="fornamechange">Lastname</label>
                          <input type="text" id="lastnamechange" class="form-control change-form" value="${user.lastname}">
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                            <label for="fornamechange">Biography</label>
                            <textarea placeholder="Your biography" maxlength="300" id="biographychangeform" type="form-control" rows="3" class="form-control change-form">${biography}</textarea>
                        </div>
                      </div>
                      <div class="text-center">
                        <button id="submitChangeModify" type="submit" class="btn btn-primary mb-3 mt-5" id="tablePost" >Confirm changes</button>
                      </div>
                      <div id="statusMessageSettings"></div>
                    </form>
                    </div>
                </div>
                <div class="container" id="tablePost"></div>
            </div>
        `;

    document.getElementById("submitChangeModify").addEventListener("click", async function(e) {
        e.preventDefault()
        const lastname = document.getElementById("lastnamechange");
        const forename = document.getElementById("fornamechange");
        const username = document.getElementById("usernamechange");
        const biography = document.getElementById("biographychangeform");
        console.log("oui")
        let done = false;
        if (lastname.value !== user.lastname) {
            done = await putLastName(lastname.value, actualUser.id_user);
        }

        if (forename.value !== user.forename) {
            done = await putForeName(forename.value, actualUser.id_user);
        }

        if (biography.value !== "" || biography.value !== user.biography) {
            done = await putBiography(biography.value, actualUser.id_user);
        }
        const status = document.getElementById("statusMessageSettings");
        if(done) {
            status.innerHTML = `<h4 class="alert">Done!</h4>`;
        } else {
            status.innerHTML = `<h4 class="alert-danger">Something went wrong.</h4>`;
        }

    });
}


async function getBaseInformationsUser(idUser) {
    try {
        const token = load_user.getToken();
        const request = {
            method: "GET",
            headers: {
                "Authorization": token
            }
        };
        const responseUserInfo = await fetch("/api/users/profile/" + idUser, request);
        if (!responseUserInfo.ok) {
            throw new Error(
                "fetch error : " + responseUserInfo.status + " : " + responseUserInfo.statusText
            );
        }
        return await responseUserInfo.json();
    } catch (e) {
        console.log(e)
    }
}

async function putLastName(lastname, idUser) {
    try {
        const token = load_user.getToken();
        const request = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(
                {
                    lastname: lastname,
                }
            ),
        };
        const responseUserInfo = await fetch("/api/users/lastname/" + idUser, request);
        if (!responseUserInfo.ok) {
            throw new Error(
                "fetch error : " + responseUserInfo.status + " : " + responseUserInfo.statusText
            );
        }
        return true;
    } catch (e) {
        console.log(e)
        return false;
    }
}

async function putForeName(forename, idUser) {
    try {
        const token = load_user.getToken();
        const request = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(
                {
                    forename: forename,
                }
            ),
        };
        const responseUserInfo = await fetch("/api/users/forename/" + idUser, request);
        if (!responseUserInfo.ok) {
            throw new Error(
                "fetch error : " + responseUserInfo.status + " : " + responseUserInfo.statusText
            );
        }
        return true;
    } catch (e) {
        console.log(e)
        return false;
    }
}

async function putBiography(biography, idUser) {
    try {
        const token = load_user.getToken();
        const request = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(
                {
                    biography: biography,
                }
            ),
        };
        const responseUserInfo = await fetch("/api/users/biography/" + idUser, request);
        if (!responseUserInfo.ok) {
            throw new Error(
                "fetch error : " + responseUserInfo.status + " : " + responseUserInfo.statusText
            );
        }
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export default ProfilePage;