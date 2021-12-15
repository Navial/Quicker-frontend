import SendPostHTML from "../Modules/InsertPostModule";
import GetPostsModule from "../Modules/GetPostsModule";

/**
 * Render the HomePage
 */

const TopKwicks = async () => {
    const pageDiv = document.querySelector("#page");
    SendPostHTML(pageDiv);

    await GetPostsModule(true);
};

export default TopKwicks;
