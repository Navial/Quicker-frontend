/**
 * Render the HomePage
 */

const TopKwicks = async () => {
    const pageDiv = document.querySelector("#page");
    pageDiv.innerHTML = " ";
    const api = "https://paf.be/tweet/";
    try {

        const responsePosts = await fetch(api + "post/"); // fetch return a promise => we wait for the response

        if (!responsePosts.ok) {
            // status code was not 200, error status code
            throw new Error(
                "fetch error : " + responsePosts.status + " : " + responsePosts.statusText
            );
        }

        const posts = await responsePosts.json();


        page.innerHTML = `
            <div class="container" id="tableTopKiwcks"></div>  
        `;

        let table = document.getElementById("tableTopKiwcks")
        posts.forEach((post) => {
            let row = `<div id="post">
							<div class="col-sm-auto" id="postText">${post.message}</div>
							<div class="col-sm-auto" id="imageDiv" >
                            <img id="image" src="${post.image}" width="50%">                
                            </div>
					  </div>`;
            table.innerHTML += row;
        });
    }catch (e){
        console.error("Error");
    }
};

export default TopKwicks;
