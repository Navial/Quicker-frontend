import GetPostsModule from "../Modules/GetPostsModule";

const ProfilePage = async () => {

    // Init
    const pageDiv = document.querySelector("#page");
    pageDiv.innerHTML = ``;

    // Get base user informations
    const idCurrentUser = new URLSearchParams(window.location.search).get("idUser");
    const user = await getBaseInformationsUser(new URLSearchParams(window.location.search).get("idUser"));
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

    // Get posts sorted by date
    await GetPostsModule(pageDiv, false, idCurrentUser);
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