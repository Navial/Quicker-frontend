import load_user from "../../utils/load_user";

/**
 * Ask the api to add a message into the db.
 * @param body
 */
async function sendMessage(body) {
    const request = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            Authorization: load_user.getToken(),
            "Content-Type": "application/json"
        }
    };
    const response = await fetch("/api/messages/", request);
    if(!response.ok)
        throw new Error("fetch error : " + response.status + " : " + response.statusText);
}

export default {sendMessage};