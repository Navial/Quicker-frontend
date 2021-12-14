import { Redirect } from "../Router/Router";
import bannerExample from "../../img/bannerExample.jpg";


const ProfilePage = async () => {
    const pageDiv = document.querySelector("#page");

    pageDiv.innerHTML = "";
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userSession = JSON.parse(window.localStorage.getItem("user"));
    let idUser = userSession.id_user;
    const request = {
        method: "GET",
        headers: {
            "Authorization": userSession.token
        }
    };
    try {
        const responseUserInfo = await fetch(`api/users/profile/${idUser}`, request); // fetch return a promise => we wait for the response
        if (!responseUserInfo.ok) {
            // status code was not 200, error status code
            throw new Error(
                "fetch error : " + responseUserInfo.status + " : " + responseUserInfo.statusText
            );
        }

        const responsePosts = await fetch(`api/posts/user/${idUser}`, request); // fetch return a promise => we wait for the response

        if (!responsePosts.ok) {
            // status code was not 200, error status code
            throw new Error(
                "fetch error : " + responsePosts.status + " : " + responsePosts.statusText
            );
        }

        const responseLikes = await fetch(`api/likes/`, request); // fetch return a promise => we wait for the response

        if (!responseLikes.ok) {
            // status code was not 200, error status code
            throw new Error(
                "fetch error : " + responseLikes.status + " : " + responseLikes.statusText
            );
        }
        
        const user = await responseUserInfo.json();
        const likes = await responseLikes.json();
        const posts = await responsePosts.json();

        let date = new Date(user.date_creation);
        let likesPost = 0;
        let dateString = date.toDateString();
        let htmlImage;

        page.innerHTML = `
            <div class="mainContent">    
                <div id="banner"></div>
                <div id="userContainer">
                    <div class="col-sm-10" id="userName">${user.forename} ${user.lastname} </div>
                    <div class="col-sm-10" id="biography">Biography : ${user.biography}</div>
                    <div class="col-sm-10" id="creationDate">Created his account on ${dateString}</div>
                </div>
                <div class="container" id="tablePost"></div>  
            </div> 
        `;

        let table = document.getElementById("tablePost")
        posts.forEach((post) => {
            likes.forEach((like) => {
                if(like.id_post == post.id_post) {
                    likesPost++;
                }
            });
            if(post.image == null) htmlImage = "";
            else htmlImage =  
                `<div class="col-sm-auto" id="imageDiv" >
                <img id="image" src="${post.image}" width="50%">                
                </div>`;
            var row = `<div id="post">
                            <div class="col-sm-1" >${user.forename}</div>
							<div class="col-sm-auto" id="postText">${post.message}</div>
							`+
                            htmlImage
                            +`
							<div class="col-sm-auto" id="actionBar">
                            <svg id="likeButton" aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path></svg>
							${likesPost}
                            
                            </div>
                        </div>`;
            table.innerHTML += row;
        });
    } catch (error) {
        console.error("Error");
    }
};



export default ProfilePage;