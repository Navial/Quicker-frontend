import Tables from "./tables";

let userToken;
const deleteRequest = {
    method: "DELETE",
    headers: {
        "Authrorisation": userToken
    }
};



async function deactivateUser(id_user) {
    loadToken();
    try {
        const response = await fetch(`/api/users/${id_user}`, deleteRequest);
        if (!response.ok)
            throw new Error("fetch error : " + response.status + " : " + response.statusText);
        await Tables.refreshMembersTable();
    } catch (e) {
        console.error(e);
    }
}

function loadToken() {
    userToken = JSON.parse(window.localStorage.getItem("user")).token;
}

export default {deactivateUser};