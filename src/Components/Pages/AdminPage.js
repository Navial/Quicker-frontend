import Tables from "../../utils/tables";

const userToken = JSON.parse(window.localStorage.getItem("user")).token;
const getRequest = {
    method: "GET",
    headers: {
        "Authorisation": userToken
    }
};

const adminPagehtml = `
    <div id="adminPage">
        <div id="adminButtons">
            <input id="postsGestionButton" type="button" value="Posts Gestion">
            <input id="membersGestionButton" type="button" value="Members Gestion">
        </div>
        <div id="adminTable">
        </div>
    </div>
`;

const AdminPage = () => {
    const page = document.getElementById("page");
    page.innerHTML = adminPagehtml;
    const postGestionButton = document.getElementById("postsGestionButton");
    const membersGestionButton = document.getElementById("membersGestionButton");
    postGestionButton.addEventListener("click", showPostsGestion);
    membersGestionButton.addEventListener("click", showMembersGestion);
}

const postsGestionHtml = `
    <h3>Posts Gestion</h3>
    <form id="postsGestionForm">
        <table id="postsGestionTable" class="table-bordered">
            <tr>
                <th>Post's Id</th>
                <th>User's Id</th>
                <th>Image</th>
                <th>Message</th>
                <th>Parent Post's Id</th>
                <th>Removed (True/False)</th>
                <th>Creation Date</th>
                <th>Number of Likes</th>
                <th>Suppression</th>
            </tr>
        </table>
    </form>
`;

async function showPostsGestion() {
    const adminTable = document.getElementById("adminTable");
    adminTable.innerHTML = postsGestionHtml;
    const table = document.getElementById("postsGestionTable");

    try {
        const response = await fetch("/api/posts/", getRequest);
        console.log(response)
        if (!response.ok)
            throw new Error("AdminPage::error: fetch error: fetch error : " + response.status + " : " + response.statusText);
        const posts = await response.json();

        posts.forEach((post) => {
            if (post.is_removed)
                var postStatus = "Cancel remove";
            else
                var postStatus = "Remove";

            table.innerHTML += `
                <tr>
                    <td>${post.id_post}</td>
                    <td>${post.id_user}</td>   
                    <td>${post.image}</td>    
                    <td>${post.message}</td>
                    <td>${post.parent_post}</td>
                    <td>${post.is_removed}</td>
                    <td>${post.date_creation}</td>
                    <td>${post.number_of_likes}</td>
                    <td>
                        <input type="hidden" value="${post.id_post}">
                        <input type="submit" value="${postStatus}">
                    </td>
                </tr>
            `;
        });
    } catch (e) {
        console.log(e.message);
    }
}

const membersGestionHtml = `
    <h3>Members Gestion</h3>
 
        <table id="membersGestionTable" class="table-bordered">
            <tr>
                <th>User's Id</th>
                <th>Forename</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>Username</th>
                <th>Image</th>
                <th>Active (True/False)</th>
                <th>Admin (True/False)</th>
                <th>Biography</th>
                <th>Creation Date</th>
                <th>Modifications</th>
            </tr>
            <tbody id="membersGestionTbody">
            
            </tbody>
        </table>
 
`;

async function showMembersGestion() {
    const adminTable = document.getElementById("adminTable");
    adminTable.innerHTML = membersGestionHtml;

    try {
        await Tables.refreshMembersTable();
        const forms = document.querySelectorAll("#membersGestionForm");
        forms.forEach((form) => {
            let id_user;
            let memberStatus;
            let memberType;
            form.querySelectorAll("input").forEach((input) => {
                if (input.id === "id_user")
                    id_user = input.value;
                else if (input.id === "memberStatus") {
                    memberStatus = input.value;
                    input.addEventListener("click", (e) => {
                        e.preventDefault();
                        if (memberStatus === "Deactivate")
                            console.log(id_user)
                        removeUser(id_user);
                    });
                } else {
                    memberType = input.value;

                }
            });
        });
    } catch (e) {
        console.log(e.message);
    }
}

async function removeUser(id_user) {
    const deleteRequest = {
        method: "DELETE",
        headers: {
            "Authorisation": userToken
        }
    };
    try {
        const response = await fetch(`/api/users/${id_user}`, deleteRequest);
        if (!response.ok)
            throw new Error("fetch error : " + responsePosts.status + " : " + responsePosts.statusText);
        await Tables.refreshMembersTable();
    } catch (e) {
        console.error(e);
    }
}

export default AdminPage;