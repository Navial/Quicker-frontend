import showPostsHtml from "./ShowPostsHtmlModule";
import {Redirect} from "../Router/Router";
import Posts_modifications from "../../utils/posts_modifications";
import loadUser from "../../utils/load_user";

async function GetPosts(page, profilePosts = null, isHomepage = false) {
    const user = loadUser();
    let request = {
        method: "GET",
        headers: {
            "Authorization": user.token
        }
    };

    let responsePosts= await fetch(`/api/posts/allPostWithLikesAndUser/` + profilePosts, request);
    try {
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

            responsePosts  = await fetch(`/api/posts/homepage`, request);
        }

        if (!responsePosts.ok) {
            throw new Error(
                "fetch error : " + responsePosts.status + " : " + responsePosts.statusText
            );
        }
        const posts = await responsePosts.json();
        showPostsHtml(page, posts);

        // like listener
        const b = document.querySelectorAll('input[type="button"]');
        [].slice.call(b).forEach(function (el) {
            el.onclick = sendLike.bind(this, el);
        });

        // remove post listener
        document.addEventListener("click", async function (e) {
            if (e.target.id.startsWith("remove_button")) {
                await Posts_modifications.removePost(e.target.id.replace("remove_button", ""));
                e.target.parentNode.parentNode.hidden = true;
            }
        });

    } catch (e){
        console.error("Error");
    }
}

async function sendLike(post){
    const user = loadUser();
    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": user.token
        },
        body: JSON.stringify(
            {
                id_user: user.id_user,
                id_post: post.id
            }
        ),
    };
    try {
        const responsePosts = await fetch(`/api/likes/toggle`, request);
        if (!responsePosts.ok) {
            throw new Error(
                "fetch error : " + responsePosts.status + " : " + responsePosts.statusText
            );
        }

        const likeCounter = document.getElementById("counter" + post.id);
        const likeCounterInt = parseInt(likeCounter.innerHTML);
        if (responsePosts.status === 201) {
            likeCounter.innerHTML = likeCounterInt + 1;
        } else {
            likeCounter.innerHTML = likeCounterInt - 1;
        }

    } catch (e) {
        console.log(e);
    }
}



export default GetPosts;