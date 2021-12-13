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
        <table class="table-bordered">
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
            <tr id="postsGestionTableRows">
            </tr>
        </table>
    </div>
`;

function showPostsGestion() {
    const adminPage = document.getElementById("adminPage");
    adminPage.innerHTML += postsGestionHtml;

}

function showMembersGestion() {

}

export default AdminPage;