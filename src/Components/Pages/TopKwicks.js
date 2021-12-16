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

    // Get posts sorted by likes
    await GetPostsModule(pageDiv);
};

export default TopKwicks;
