import Tables from "./tables";
import load_user from "./load_user";

async function setAdmin(user_id) {
    const putRequest = {
        method: "PUT",
        headers: {
            Authorization: load_user.getToken()
        }
    };

    try {
        const response = await fetch(`/api/users/setadmin/${user_id}`, putRequest);

        if(!response.ok)
            throw new Error("fetch error : " + response.status + " : " + response.statusText);
        await Tables.refreshMembersTable();
    } catch (e) {
        console.error(e);
    }
}

async function setNotAdmin(user_id) {
    const putRequest = {
        method: "PUT",
        headers: {
            Authorization: load_user.getToken()
        }
    };
    try {
        const response = await fetch(`/api/users/setnotadmin/${user_id}`, putRequest);
        if(!response.ok)
            throw new Error("fetch error : " + response.status + " : " + response.statusText);
        await Tables.refreshMembersTable();
    } catch (e) {
        console.error(e);
    }
}

async function activateUser(user_id) {
    const putRequest = {
        method: "PUT",
        headers: {
            Authorization: load_user.getToken()
        }
    };
    try {
        const response = await fetch(`/api/users/activate/${user_id}`, putRequest);
        if(!response.ok)
            throw new Error("fetch error : " + response.status + " : " + response.statusText);
        await Tables.refreshMembersTable();
    } catch (e) {
        console.error(e);
    }
}

async function deactivateUser(user_id) {
    const deleteRequest = {
        method: "DELETE",
        headers: {
            Authorization: load_user.getToken()
        }
    };
    try {
        const response = await fetch(`/api/users/${user_id}`, deleteRequest);
        if (!response.ok)
            throw new Error("fetch error : " + response.status + " : " + response.statusText);
        await Tables.refreshMembersTable();
    } catch (e) {
        console.error(e);
    }
}

export default {activateUser, deactivateUser, setAdmin, setNotAdmin};