import loadUser from "../../utils/load_user";

async function deletePost(idPost){
    const user = loadUser();
    const request = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": user.token
        },
        body: JSON.stringify(
            {
                id_post: idPost
            }
        ),
    };
    try {
        const responsePosts = await fetch(`/api/posts/`, request);
        if (!responsePosts.ok) {
            throw new Error(
                "fetch error : " + responsePosts.status + " : " + responsePosts.statusText
            );
        }
    } catch (e) {
        console.log(e);
    }
}

export default deletePost;