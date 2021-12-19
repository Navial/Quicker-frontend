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
    if (!response.ok)
        throw new Error("fetch error : " + response.status + " : " + response.statusText);
}

async function getPosts(profilePosts = null, isHomepage = false, isLikesPost = false) {
    const user = load_user.loadUser();
    let request = {
        method: "GET",
        headers: {
            "Authorization": user.token
        }
    };

    let responsePosts = await fetch(`/api/posts/allPostWithLikesAndUser/` + profilePosts, request);
    if (isHomepage) {
        request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": user.token
            },
            body: JSON.stringify(
                {
                    id_user: user.id_user,
                }
            ),
        };

        responsePosts = await fetch(`/api/posts/homepage`, request);
    } else if (isLikesPost) {
        request = {
            "method": "GET",
            headers: {
                Authorization: user.token
            }
        };
        responsePosts = await fetch(`/api/posts/postsLiked/${user.id_user}`, request);
    }

    if (!responsePosts.ok) {
        throw new Error(
            "fetch error : " + responsePosts.status + " : " + responsePosts.statusText
        );
    }
    return await responsePosts.json();
}

export default {sendMessage, getPosts};