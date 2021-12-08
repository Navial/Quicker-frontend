/**
 * Render the HomePage
 */

const HomePage = () => {
    const pageDiv = document.querySelector("#page");

    let page = `
        
       <div id="newPost">
           
            <input type="text" id="textPost">
            <input type="submit" id="buttonPost" value="Post">
       </div>
       
       <div id="posts">
       
       </div>
  
  `;

    pageDiv.innerHTML = page;
};

export default HomePage;
