import loadUser from "../../utils/load_user";
import showPostsHtml from "./ShowPostsHtmlModule";

async function getLikedPosts (page) {
    const user = loadUser();
    const request = {
        "method": "GET",
        headers: {
            Authorization: user.token
        }
    };

    try {
        const response = await fetch(`/api/posts/postsLiked/${user.id_user}`, request);
        if(!response.ok)
            throw new Error("fetch error : " + response.status + " : " + response.statusText);
        const posts = await response.json();
        if (posts.length === 0)
            return;
        console.log(posts);
        showPostsHtml(page, posts);
    } catch (e){
        console.error(e);
    }
}

export default getLikedPosts;