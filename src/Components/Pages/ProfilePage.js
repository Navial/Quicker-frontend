import GetPostsModule from "../Modules/GetPostsModule";
import {Redirect} from "../Router/Router";

const ProfilePage = async () => {
    if (!location.search.startsWith("?idUser=")) location.pathname = "/";

    // Init
    const pageDiv = document.querySelector("#page");
    pageDiv.innerHTML = ``;

    // Get base user informations
    const idCurrentUser = new URLSearchParams(window.location.search).get("idUser");
    const user = await getBaseInformationsUser(idCurrentUser);
    const userConnected = JSON.parse(window.localStorage.getItem("user"));


    pageDiv.innerHTML += `
            <div class="mainContent">
                <div id="banner"></div>
                <div id="userContainer">
                    <div class="col-sm-10" id="userName">${user.forename} ${user.lastname} </div>
                    <div class="col-sm-10" id="biography">Biography : ${user.biography}</div>
                    <div class="col-sm-10" id="creationDate">Created his account on ${new Date(user.date_creation).toDateString()}</div>
                </div>
                <div class="container" id="tablePost"></div>
            </div>
        `;


    // Add follow button if other profile
    if (user.id_user !== userConnected.id_user) {

        const username = document.getElementById("userName");
        if ((await existFollow(userConnected.id_user, idCurrentUser, userConnected.token)).status === 201) {
            username.innerHTML += " (vous suit)";
        }

        const userDiv = document.getElementById("userContainer");
        const followButton = document.createElement("a");
        followButton.className = "col-sm-10";
        followButton.id = "followButton" + idCurrentUser;

        if ((await existFollow(idCurrentUser, userConnected.id_user, userConnected.token)).status === 201) {
            followButton.innerHTML = "Suivi";
        } else {
            followButton.innerHTML = "Suivre";
        }
        followButton.type = "button";
        userDiv.appendChild(followButton);

        //
        document.addEventListener("click", async function (e) {
            if (e.target.id === "followButton" + idCurrentUser) {
                const responseFollow = await toggleFollowUser(idCurrentUser, userConnected);
                if (responseFollow.status === 201) {
                    e.target.innerHTML = "Suivi"
                } else if (responseFollow.status === 200) {
                    e.target.innerHTML = "Suivre"
                }
            }
        });
    }

    // Get posts sorted by date
    await GetPostsModule(pageDiv, idCurrentUser);
}

async function existFollow(idUserFollowed, idUserFollower, token) {
    try {
        const request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(
                {
                    id_user_followed: idUserFollowed,
                    id_user_follower: idUserFollower
                }
            ),
        };
        const responseFollowInfo = await fetch("/api/follows/exists", request);
        if (!responseFollowInfo.ok) {
            throw new Error(
                "fetch error : " + responseFollowInfo.status + " : " + responseFollowInfo.statusText
            );
        }
        return await responseFollowInfo;
    } catch (e) {
        console.log(e)
    }
}

async function toggleFollowUser(idUserFollowed, userFollower) {
    try {
        const request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": userFollower.token
            },
            body: JSON.stringify(
                {
                    id_user_followed: idUserFollowed,
                    id_user_follower: userFollower.id_user
                }
            ),
        };
        const responseFollowInfo = await fetch("/api/follows/toggle", request);
        if (!responseFollowInfo.ok) {
            throw new Error(
                "fetch error : " + responseFollowInfo.status + " : " + responseFollowInfo.statusText
            );
        }
        return await responseFollowInfo;
    } catch (e) {
        console.log(e)
    }
}

async function getBaseInformationsUser(idUser) {
    try {
        const token = JSON.parse(window.localStorage.getItem("user")).token;
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

export default ProfilePage;