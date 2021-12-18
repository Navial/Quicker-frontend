import posts_modifications from "./posts_modifications";
import members_modifications from "./members_modifications";
import load_user from "./load_user";

async function refreshMembersTable() {
    const authenticatedUser = load_user.loadUser();
    const getRequest = {
        method: "GET",
        headers: {
            Authorization: authenticatedUser.token
        }
    };
    try {
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

            let tableTbodyHtml = `
                <tr>
<!--                    <td>${user.user_id}</td>-->
                    <td>${user.forename} ${user.lastname}</td>   
                    <td>${user.email}</td>
                    <td>${user.username}</td>
                    <!--<td>${user.image}</td>-->
                    <td>${user.is_active}</td>
                    <td>${user.is_admin}</td>
<!--                    <td>${user.biography}</td>-->
                    <td>${user.creation_date}</td>
            `;
            if(user.user_id !== authenticatedUser.user_id) {
                tableTbodyHtml += `
                    <td>
                        <form id="membersGestionForm">
                            <input id="user_id" type="hidden" value="${user.user_id}">
                            <input class="memberTableButton" id="memberStatus" type="submit" value="${memberStatus}">
                            <input class="memberTableButton" id="memberType" type="submit" value="${memberType}">
                        </form>
                    </td>
                `;
            }
            else {
                tableTbodyHtml += `
                    <td>
                        <h4 class="alert-warning">It's your account</h4>
                    </td>
                `;
            }
            tableTbodyHtml += `
                </tr>
            `;

            tableTbody.innerHTML += tableTbodyHtml;
        });

        const forms = document.querySelectorAll("#membersGestionForm");
        forms.forEach((form) => {
            let user_id;
            let memberStatus;
            let memberType;
            form.querySelectorAll("input").forEach((input) => {
                if (input.id === "user_id")
                    user_id = input.value;
                else if (input.id === "memberStatus") {
                    memberStatus = input.value;
                    input.addEventListener("click", (e) => {
                        e.preventDefault();
                        if (memberStatus === "Deactivate")
                            members_modifications.deactivateUser(user_id);
                        else
                            members_modifications.activateUser(user_id);
                    });
                } else {
                    memberType = input.value;
                    input.addEventListener("click", (e) => {
                        e.preventDefault();
                        if(memberType === "Admin")
                            members_modifications.setAdmin(user_id);
                        else
                            members_modifications.setNotAdmin(user_id);
                    });
                }
            });
        });
    } catch (e) {
        console.error(e)
    }
}

async function refreshPostsTable() {
    const user = load_user.loadUser();
    const getRequest = {
        method: "GET",
        headers: {
            Authorization: user.token
        }
    };
    const tableTbody = document.getElementById("postsGestionTbody");
    const response = await fetch("/api/posts/", getRequest);

    if (!response.ok)
        throw new Error("AdminPage::error: fetch error: fetch error : " + response.status + " : " + response.statusText);
    const posts = await response.json();
    tableTbody.innerHTML = "";
    posts.forEach((post) => {
        if (post.is_removed)
            var postStatus = "Cancel remove";
        else
            var postStatus = "Remove";

        let tableTbodyHtml = `
             <tr>
<!--                <td>${post.post_id}</td>-->
                <td>${post.user_id}</td>   
                <td>${post.image}</td>    
                <td clfass="messageColumnAdmin">${post.message}</td>
<!--                <td>${post.parent_post}</td>-->
                <td>${post.is_removed}</td>
                <td>${post.creation_date}</td>
                <td>${post.number_of_likes}</td>
        `;
        if(user.user_id !== post.user_id) {
            tableTbodyHtml += `
                <td>
                    <form id="postsGestionForm">
                        <input id="post_id" type="hidden" value="${post.post_id}">
                        <input id="postRemoveButton" type="submit" value="${postStatus}">
                    </form>
                </td>
            `;
        } else {
            tableTbodyHtml += `
                <td>
                    <h4 class="alert-warning">It's your post</h4>
                </td>
            `;
        }
        tableTbodyHtml += `
            </tr>
        `;
        tableTbody.innerHTML += tableTbodyHtml;
    });

    const forms = document.querySelectorAll("#postsGestionForm");
    forms.forEach((form) => {
        let post_id;
        let postStatus;
        form.querySelectorAll("input").forEach((input) => {
            if (input.id === "post_id")
                post_id = input.value;
            else {
                postStatus = input.value;
                input.addEventListener("click", (e) => {
                    e.preventDefault();
                    if (postStatus === "Remove")
                        posts_modifications.removeAdminPost(post_id);
                    else
                        posts_modifications.activatePost(post_id);
                });
            }
        });
    });
}
//
export default {refreshMembersTable, refreshPostsTable};