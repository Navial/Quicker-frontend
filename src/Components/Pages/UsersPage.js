import SendPostHTML from "../Modules/InsertPostModule";
import getLikedPosts from "../Modules/GetLikedPostsModule";

const UsersPage = async () => {
    const pageDiv = document.getElementById("page");
    pageDiv.innerHTML = "";

    const searchBar = document.querySelector("#navbarWrapper").getElementsByTagName("input")[0];

    searchBar.addEventListener("keyup", async () => {
        if (searchBar.value !== "") {
            const tab = await getAllUsersSimilarTo(searchBar.value);
            pageDiv.innerHTML = "";
            if (tab) {
                tab.forEach((row) => {
                    pageDiv.innerHTML += `<a href="/profile?idUser=${row.id_user}">${row.forename} ${row.lastname} ${row.username}</a><br>`;
                });
            }
        }
    })

}

async function getAllUsersSimilarTo(search) {
    try {
        const token = JSON.parse(window.localStorage.getItem("user")).token;
        const request = {
            method: "GET",
            headers: {
                "Authorization": token
            }
        };
        const responseUserInfo = await fetch("/api/users/search/" + search, request);
        if (!responseUserInfo.ok) {
            return null;
        }
        return await responseUserInfo.json();
    } catch (e) {
        return null;
    }
}

export default UsersPage;