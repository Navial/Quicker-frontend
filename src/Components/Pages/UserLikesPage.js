import SendPostHTML from "../Modules/InsertPostModule";
import getPostsModule from "../Modules/GetPostsModule";

const UserLikesPage = async () => {
    const pageDiv = document.getElementById("page");
    pageDiv.innerHTML = "";

    //Insert a new post bar
    SendPostHTML(pageDiv);

<<<<<<< HEAD
=======
    // pageDiv.innerHTML += `<h4 class="alert-danger">Your liked posts</h4>`;
>>>>>>> fea0641ee5ddada619d4f2438ce310189bf1d9bb
    await getPostsModule(pageDiv, null, false, true);
}

export default UserLikesPage;