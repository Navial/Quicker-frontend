import Tables from "./tables";
import user from "../models/User";

let userToken;
const deleteRequest = {
    method: "DELETE",
    headers: {
        "Authrorisation": userToken
    }
};

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

export default {removePost};