import SendPostHTML from "../Modules/InsertPostModule";
import GetPostsModule from "../Modules/GetPostsModule";

/**
 * Render the TopKwicks
 */

const TopKwicks = async () => {
    // Init
    const pageDiv = document.querySelector("#page");
    pageDiv.innerHTML = ``;

    // Insert new post bar
    SendPostHTML(pageDiv);
<<<<<<< HEAD

=======
    // pageDiv.innerHTML += `<h4 class="alert-danger">Top Kwicks</h4>`;
>>>>>>> fea0641ee5ddada619d4f2438ce310189bf1d9bb
    // Get posts sorted by likes
    await GetPostsModule(pageDiv);
};

export default TopKwicks;
