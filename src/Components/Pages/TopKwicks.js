/**
 * Render the HomePage
 */

const TopKwicks = async () => {
    const pageDiv = document.querySelector("#page");
    pageDiv.innerHTML = " ";
    const request = {
        method: "GET",
        headers: {
            "Authorization": JSON.parse(window.localStorage.getItem("user")).token
        }
    };
    try {

        // hide data to inform if the pizza menu is already printed
        const responseUsersInfo = await fetch( "/api/users/", request); // fetch return a promise => we wait for the response
        if (!responseUsersInfo.ok) {
            // status code was not 200, error status code
            throw new Error(
                "fetch error : " + responseUsersInfo.status + " : " + responseUsersInfo.statusText
            );
        }

        const responsePosts = await fetch(`/api/posts/`, request); // fetch return a promise => we wait for the response

        if (!responsePosts.ok) {
            // status code was not 200, error status code
            throw new Error(
                "fetch error : " + responsePosts.status + " : " + responsePosts.statusText
            );
        }

        const responseLikes = await fetch(`/api/likes/`, request); // fetch return a promise => we wait for the response

        if (!responseLikes.ok) {
            // status code was not 200, error status code
            throw new Error(
                "fetch error : " + responseLikes.status + " : " + responseLikes.statusText
            );
        }
        
        const likes = await responseLikes.json();
        const users = await responseUsersInfo.json();
        const posts = await responsePosts.json();


        page.innerHTML = `
            <div class="newPost">
                <input type="text" id="textPost">
                <input type="submit" id="buttonPost" value="Post">
            </div>
            <div class="container" id="tableTopKiwcks"></div>  
        `;
        let author
        let table = document.getElementById("tableTopKiwcks")
        let date;
        let dateString;
        let likesPost = 0;  
        let htmlImage;
        posts.forEach((post) => {
            date = new Date(post.creationDate)
            dateString = date.toDateString();
            users.forEach((user) => {
                if(user.id_user === post.id_user){
                    author = user.forename;
                } 
            });
            likes.forEach((like) => {
                if(like.id_post === post.id_post) {
                    likesPost++;
                }
            });
            if(post.image == null) htmlImage = "";
            else htmlImage =  
                `<div class="col-sm-auto" id="imageDiv" >
                <img id="image" src="${post.image}" width="50%">                
                </div>`;

            let row = `<div id="post">
							<div class="col-sm-auto" id="postText">
                                <div class="col-sm-5">${author}</div>
                                <div class="col-sm-5" id="creationDate">Posté le ${dateString}</div>
                            </div>
							<div class="col-sm-auto" id="postText">${post.message}</div>`+
                            htmlImage
                            +`
                            <svg id="likeButton" aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path></svg>
							${likesPost}
                            </div>`;
            table.innerHTML += row;
        });
    }catch (e){
        console.error("Error");
    }
};

export default TopKwicks;
