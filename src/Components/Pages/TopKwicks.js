/**
 * Render the HomePage
 */

const TopKwicks = async () => {
    const pageDiv = document.querySelector("#page");
    pageDiv.innerHTML = " ";
    const api = "https://paf.be/tweet/";

    try {

        // hide data to inform if the pizza menu is already printed
        const responseUsersInfo = await fetch(api + "user/"); // fetch return a promise => we wait for the response

        if (!responseUsersInfo.ok) {
            // status code was not 200, error status code
            throw new Error(
                "fetch error : " + responseUsersInfo.status + " : " + responseUsersInfo.statusText
            );
        }


        const responsePosts = await fetch(api + "post/"); // fetch return a promise => we wait for the response

        if (!responsePosts.ok) {
            // status code was not 200, error status code
            throw new Error(
                "fetch error : " + responsePosts.status + " : " + responsePosts.statusText
            );
        }

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
        posts.forEach((post) => {
            date = new Date(post.creationDate)
            dateString = date.toDateString();
            users.forEach((user) => {
                if(user.idUser == post.idUser){
                    author = user.forename;
                } 
            });
            let row = `<div id="post">
							<div class="col-sm-auto" id="postText">
                                <div class="col-sm-5">${author}</div>
                                <div class="col-sm-5" id="creationDate">Posté le ${dateString}</div>
                            </div>
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
