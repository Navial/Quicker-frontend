import GetPostsModule from "../Modules/GetPostsModule";
import {Redirect} from "../Router/Router";
import load_user from "../../utils/load_user";

const pageDivHtml = `
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
                  <input type="text" id="fornamechange" class="form-control change-form" value="${actualUser.forename}">
                </div>
                <div class="col">
                  <label for="fornamechange">Lastname</label>
                  <input type="text" id="lastnamechange" class="form-control change-form" value="${actualUser.lastname}">
                </div>
              </div>
              <div class="row">
                <div class="col">
                    <label for="fornamechange">Biography</label>
                    <textarea placeholder="Your biography" maxlength="300" id="biographychangeform" type="form-control" rows="3" class="form-control change-form">${actualUser.biography}</textarea>
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

const ProfilePage = async () => {

    // Init
    const pageDiv = document.querySelector("#page");
    pageDiv.innerHTML = pageDivHtml;

    // Get base user informations
    const actualUser = await getBaseInformationsUser(load_user.loadUser());
    let biography = actualUser.biography;
    if (biography === null) {
        actualUser.biography = "";
    }


    document.getElementById("submitChangeModify").addEventListener("click", async function(e) {
        e.preventDefault()
        const lastname = document.getElementById("lastnamechange");
        const forename = document.getElementById("fornamechange");
        const username = document.getElementById("usernamechange");
        const biography = document.getElementById("biographychangeform");
        console.log("oui")
        let done = false;
        if (lastname.value !== actualUser.lastname) {
            done = await putLastName(lastname.value, actualUser.id_user);
        }

        if (forename.value !== actualUser.forename) {
            done = await putForeName(forename.value, actualUser.id_user);
        }

        if (biography.value !== actualUser.biography) {f
            done = await putBiography(biography.value, actualUser.id_user);
        }
        const status = document.getElementById("statusMessageSettings");
        if(done) {
            status.innerHTML = `<h4 class="alert">Done!</h4>`;
        } else {
            status.innerHTML = `<h4 class="alert">Nothing changed</h4>`;
        }
    });
}


async function getBaseInformationsUser(actualUser) {
    try {
        const token = actualUser.token
        const request = {
            method: "GET",
            headers: {
                "Authorization": token
            }
        };
        const responseUserInfo = await fetch("/api/users/profile/" + actualUser.id_user, request);
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