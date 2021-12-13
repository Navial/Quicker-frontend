const adminPagehtml = `
    <div id="adminPage">
        <div id="adminButtons">
            <input id="postsGestionButton" type="button" value="Posts Gestion">
            <input id="membersGestionButton" type="button" value="Members Gestion">
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
    <div id="postsGestionDiv">
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
    </div>
`;

async function showPostsGestion() {
    const adminPage = document.getElementById("adminPage");
    adminPage.innerHTML += postsGestionHtml;
    const table = document.getElementById("postsGestionTable");

    try {
        const response = await fetch("/api/posts/");
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

function showMembersGestion() {

}

export default AdminPage;