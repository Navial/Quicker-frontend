/**
 * Render the HomePage
 */

const HomePage = () => {
    const pageDiv = document.querySelector("#page");

    let page = `
  
       <div id="postMessage">
            <p id="imageProfile"></p>
            <input type="text" id="textPost">
            <input type="submit" id="buttonPost" value="Post">
       </div>
       
       <div id="posts">
            <p id="post"></p>
       </div>
  
  `;

    pageDiv.innerHTML = page;
};

export default HomePage;
