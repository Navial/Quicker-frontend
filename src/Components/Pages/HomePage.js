import SendPostHTML from "../Modules/InsertPostModule";

/**
 * Render the HomePage
 */

const HomePage = async () => {
    const pageDiv = document.querySelector("#page");
    SendPostHTML(pageDiv);

    const token = JSON.parse(window.localStorage.getItem("user")).token;
    const request = {
        method: "GET",
        headers: {
            "Authorization": token
        }
    };
    try {

        const responseUsersInfo = await fetch("/api/users/", request); // fetch return a promise => we wait for the response
        if (!responseUsersInfo.ok) {
            // status code was not 200, error status code
            throw new Error(
                "fetch error : " + responseUsersInfo.status + " : " + responseUsersInfo.statusText
            );
        }

        const responsePosts = await fetch("/api/posts/"); // fetch return a promise => we wait for the response

        if (!responsePosts.ok) {
            // status code was not 200, error status code
            throw new Error(
                "fetch error : " + responsePosts.status + " : " + responsePosts.statusText
            );
        }

        const users = await responseUsersInfo.json();
        const posts = await responsePosts.json();

        let author
        let table = document.getElementById("tableTopKiwcks")
        let date;
        let dateString;
        let htmlImage;

        posts.forEach((post) => {
            date = new Date(post.creationDate)
            dateString = date.toDateString();
            users.forEach((user) => {
                if(user.id_user === post.id_user){
                    author = user.forename;
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
							<div class="col-sm-auto" id="postText">${post.message}</div>
							`+
                            htmlImage
                            +`
					  </div>`;
            table.innerHTML += row;
        });
    }catch (e){
        console.error("Error");
    }
};

export default HomePage;
