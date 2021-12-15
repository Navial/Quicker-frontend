import GetPostsModule from "../Modules/GetPostsModule";

const ProfilePage = async () => {
    const idCurrentUser = new URLSearchParams(window.location.search).get("idUser");
    let user = null;

    try {
        const token = JSON.parse(window.localStorage.getItem("user")).token;
        const request = {
            method: "GET",
            headers: {
                "Authorization": token
            }
        };
        const responseUserInfo = await fetch("/api/users/profile/" + idCurrentUser, request); // fetch return a promise => we wait for the response
        if (!responseUserInfo.ok) {
            // status code was not 200, error status code
            throw new Error(
                "fetch error : " + responseUserInfo.status + " : " + responseUserInfo.statusText
            );
        }
        user = await responseUserInfo.json();
    } catch (e) {
        console.log(e)
    }

    const pageDiv = document.querySelector("#page");
        pageDiv.innerHTML = `
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

    pageDiv.innerHTML += await GetPostsModule(false, idCurrentUser);
}



export default ProfilePage;