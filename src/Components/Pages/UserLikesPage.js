import SendPostHTML from "../Modules/InsertPostModule";
import getLikedPosts from "../Modules/GetLikedPostsModule";

const UserLikesPage = async () => {
    const pageDiv = document.getElementById("page");
    pageDiv.innerHTML = "";

    //Insert a new post bar
    SendPostHTML(pageDiv);

    await getLikedPosts(pageDiv);
}

export default UserLikesPage;