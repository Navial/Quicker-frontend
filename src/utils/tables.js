const userToken = JSON.parse(window.localStorage.getItem("user")).token;
const getRequest = {
    method: "GET",
    headers: {
        "Authorisation": userToken
    }
};

async function refreshMembersTable() {
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
    } catch (e) {
        console.error(e)
    }
}

export default {refreshMembersTable};