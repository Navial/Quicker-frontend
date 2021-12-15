import Tables from "./tables";

let userToken;
const deleteRequest = {
    method: "DELETE",
    headers: {
        "Authrorisation": userToken
    }
};

async function removePost(id_post){
    userToken = JSON.parse(window.localStorage.getItem("user")).token;
    try {
        const response = await fetch(`/api/posts/${id_post}`, deleteRequest);
        if (!response.ok)
            throw new Error("fetch error : " + response.status + " : " + response.statusText);
        await Tables.refreshPostsTable();
    } catch (e) {
        console.error(e);
    }
}

export default {removePost};