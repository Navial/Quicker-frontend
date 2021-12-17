
const UsersPage = async () => {
    const pageDiv = document.getElementById("page");
    pageDiv.innerHTML = "";

    const searchBar = document.querySelector("#navbarWrapper").getElementsByTagName("input")[0];

    searchBar.addEventListener("keyup", async () => {
        if (searchBar.value !== "") {
            const tab = await getAllUsersSimilarTo(searchBar.value.toLowerCase());
            pageDiv.innerHTML = `
                    <h3 id="resultSearchTitle">Résultats de recherche pour ${searchBar.value}</h3>
                    <ul id="userSearchResultList">
            `;
            if (tab) {
                tab.forEach((row) => {
                    pageDiv.innerHTML += `<li><a class="resultUserSearch" href="/profile?idUser=${row.id_user}">${row.forename} ${row.lastname} ${row.username}</a></li>`;
                });
            }
            // else if(tab.length ===0){
            //     pageDiv.innerHTML += `<li><p>Aucun résultat à afficher</p></li>`
            // }
            pageDiv.innerHTML += `
                    </ul>
            `;
        }
    });

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