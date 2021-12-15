import SendPostHTML from "../Modules/InsertPostModule";
import GetPostsModule from "../Modules/GetPostsModule";
/**
 * Render the HomePage
 */

const HomePage = async () => {
    const pageDiv = document.querySelector("#page");
    // Insert new post bar (init page)
    SendPostHTML(pageDiv);

    pageDiv.innerHTML += await GetPostsModule();
};

export default HomePage;
