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
        await refreshTable();
        const forms = document.querySelectorAll("#membersGestionForm");
        forms.forEach((form) => {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                let id_user;
                let memberStatus;
                let memberType;
                form.querySelectorAll("input").forEach((input) => {
                    if (input.id === "id_user")
                        id_user = input.value;
                    else if (input.id === "memberStatus") {
                        memberStatus = input.value;
                        input.addEventListener("click", (e) => {
                            if (memberStatus === "Deactivate")
                                console.log(id_user)
                            removeUser(id_user);
                        });
                    } else {
                        memberType = input.value;

                    }
                });
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
        await refreshTable()
    } catch (e) {
        console.error(e);
    }
}

async function refreshTable() {
    const response = await fetch("/api/users/all", getRequest);

    if (!response.ok)
        throw new Error("AdminPage::error: fetch error: fetch error : " + response.status + " : " + response.statusText);
    const users = await response.json();
    const tableTbody = document.getElementById("membersGestionTbody");
    tableTbody.innerHTML = "";
    users.forEach((user) => {
        if (user.is_active)
            var memberStatus = "Deactivate";
        else
            var memberStatus = "Activate";
        if (user.is_admin)
            var memberType = "Member";
        else
            var memberType = "Admin";

            tableTbody.innerHTML += `
            <tr>
                <td>${user.id_user}</td>
                <td>${user.forename}</td>   
                <td>${user.lastname}</td>    
                <td>${user.email}</td>
                <td>${user.username}</td>
                <td>${user.image}</td>
                <td>${user.is_active}</td>
                <td>${user.is_admin}</td>
                <td>${user.biography}</td>
                <td>${user.date_creation}</td>
                <td>
                    <form id="membersGestionForm">
                        <input id="id_user" type="hidden" value="${user.id_user}">
                        <input id="memberStatus" type="submit" value="${memberStatus}">
                        <input id="memberType" type="submit" value="${memberType}">
                    </form>
                </td>
            </tr>
        `;
    });
}

export default AdminPage;