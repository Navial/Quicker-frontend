import load_user from "../../utils/load_user";

/**
 * Ask the api to add a message into the db.
 * @param body
 */
async function sendMessage(body) {
    const request = {
        method: "POST",
        body: body,
        headers: {
            Authorization: load_user.getToken()
        }
    };
    const response = await fetch("/messages/", request);
    if(!response.ok)
        throw new Error("fetch error : " + response.status + " : " + response.statusText);
}