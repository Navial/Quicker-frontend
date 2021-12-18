import Tables from "./tables";
import load_user from "./load_user";

async function activatePost(post_id) {
    const putRequest = {
        "method": "PUT",
        headers: {
            Authorization: load_user.getToken()
        }
    };
    try {
        const response = await fetch(`/api/posts/activate/${post_id}`, putRequest);
        if(!response.ok)
            throw new Error("fetch error : " + response.status + " : " + response.statusText);
        await Tables.refreshPostsTable();
    } catch (e) {
        console.error(e);
    }
}

async function removeAdminPost(post_id){
    const deleteRequest = {
        method: "DELETE",
        headers: {
            Authorization: load_user.getToken()
        }
    };
    try {
        const response = await fetch(`/api/posts/admin/${post_id}`, deleteRequest);
        if (!response.ok)
            throw new Error("fetch error : " + response.status + " : " + response.statusText);
        if(window.location.pathname === "/admin_page")
            await Tables.refreshPostsTable();
    } catch (e) {
        console.error(e);
    }
}
async function removePost(post_id){
    const deleteRequest = {
        method: "DELETE",
        headers: {
            Authorization: load_user.getToken()
        }
    };
    try {
        const response = await fetch(`/api/posts/${post_id}`, deleteRequest);
        if (!response.ok)
            throw new Error("fetch error : " + response.status + " : " + response.statusText);
        if(window.location.pathname === "/admin_page")
            await Tables.refreshPostsTable();
    } catch (e) {
        console.error(e);
    }
}

export default {activatePost, removeAdminPost, removePost};