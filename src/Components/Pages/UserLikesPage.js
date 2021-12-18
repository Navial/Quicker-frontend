import SendPostHTML from "../Modules/InsertPostModule";
import getPostsModule from "../Modules/GetPostsModule";

const UserLikesPage = async () => {
    const pageDiv = document.getElementById("page");
    pageDiv.innerHTML = "";

    //Insert a new post bar
    SendPostHTML(pageDiv);

    await getPostsModule(pageDiv, null, false, true);
}

export default UserLikesPage;