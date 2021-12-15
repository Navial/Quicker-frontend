import Tables from "./tables";

let userToken;

const putRequest = {
    "method": "PUT",
    headers: {
        Authorization: userToken
    }
};

const deleteRequest = {
    method: "DELETE",
    headers: {
        Authorization: userToken
    }
};

async function activatePost(id_post) {
    loadToken();
    try {
        const response = await fetch(`/api/posts/activate/${id_post}`, putRequest);
        if(!response.ok)
            throw new Error("fetch error : " + response.status + " : " + response.statusText);
        await Tables.refreshPostsTable();
    } catch (e) {
        console.error(e);
    }
}

async function removePost(id_post){
    loadToken();
    try {
        const response = await fetch(`/api/posts/${id_post}`, deleteRequest);
        if (!response.ok)
            throw new Error("fetch error : " + response.status + " : " + response.statusText);
        await Tables.refreshPostsTable();
    } catch (e) {
        console.error(e);
    }
}

function loadToken() {
    userToken = JSON.parse(window.localStorage.getItem("user")).token;
}

export default {activatePost, removePost};