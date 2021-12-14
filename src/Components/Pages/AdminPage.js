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
    const postGestionutton = document.getElementById("postsGestionButton");
    const membersGestionButton = document.getElementById("membersGestionButton");
    postGestionutton.addEventListener("click", showPostsGestion);
    membersGestionButton.addEventListener("click", showMembersGestion);
}

const postsGestionHtml = `
    <h3>Posts Gestion</h3>
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
        </tr>
    </table>
`;

async function showPostsGestion() {
    const adminTable = document.getElementById("adminTable");
    adminTable.innerHTML = postsGestionHtml;
    const table = document.getElementById("postsGestionTable");

    try {
        const response = await fetch("/api/posts/");
        console.log(response)
        if (!response.ok)
            throw new Error("AdminPage::error: fetch error: fetch error : " + response.status + " : " + response.statusText);
        const posts = await response.json();

        posts.forEach((post) => {
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
        </tr>
    </table>
`;

async function showMembersGestion() {
    const adminTable = document.getElementById("adminTable");
    adminTable.innerHTML = membersGestionHtml;
    const table = document.getElementById("membersGestionTable");

    try {
        const response = await fetch("/api/users/");
        console.log(response)
        if (!response.ok)
            throw new Error("AdminPage::error: fetch error: fetch error : " + response.status + " : " + response.statusText);
        const users = await response.json();
        console.log(users)
        users.forEach((user) => {
            table.innerHTML += `
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
                </tr>
            `;
        });
    } catch (e) {
        console.log(e.message);
    }
}

export default AdminPage;