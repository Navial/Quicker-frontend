import load_user from "../../utils/load_user";
import ApiModule from "../Modules/ApiModule";

/**
 * Render the Messages
 */

const Messages = async () => {
    // Init
    const pageDiv = document.querySelector("#page");

    // Get base user informations
    const userId = load_user.loadUser().id_user;
    const user = await getBaseInformationsUser(userId);

    // Get base recipient informations
    const idRecipient = new URLSearchParams(window.location.search).get("idUser");
    const recipient = await getBaseInformationsUser(idRecipient);


    let request = {
        method: "GET",
        headers: {
            "Authorization": load_user.getToken()
        }
    };
    try {

        //Get messages from dm
        const reponseMessages = await fetch(`/api/messages/getMessages/${userId}/${idRecipient}`, request);
        if (!reponseMessages.ok) {
            throw new Error(
                "fetch error : " + reponseMessages.status + " : " + reponseMessages.statusText
            );
        }
        const reponseContacts = await fetch(`/api/messages/recipients/${userId}` , request);
        if (!reponseContacts.ok) {
            throw new Error(
                "fetch error : " + reponseContacts.status + " : " + reponseContacts.statusText
            );
        }

        const contacts = await reponseContacts.json();

        const messages = await reponseMessages.json();


        // Create the html for the messages
        let messagesHtml = "";
        messages.forEach(message => {
            const date = new Date(message.date_creation);
            let dateString = `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()} at ${date.getUTCHours()}:`;
            dateString += `${date.getUTCMinutes()}`;

            if(message.id_sender === user.id_user){
                messagesHtml += `<div align="right">
                                   <li class="other">
                                        <div align="left" class="msg">
                                            <p class="userName">${user.username}</p>`;
            }else{
                messagesHtml += `<div align="left">
                                    <li class="self">
                                        <div align="left" class="msg">
                                            <p class="userName">${recipient.username}</p>`;
            }

            messagesHtml +=
                `
                    <p>${message.message}</p>
                    <p>${dateString}</p>
                </div>
            </li>
        </div>`
        });

        //Create contacts bar
        let contactHtml = "";
        let contact ;
        for(const idContact of contacts) {
            contact = await getBaseInformationsUser(idContact.id_recipient);
            console.log("contact" + contact)
            contactHtml += `
                <div class="contact">
                    <li>
                        <p class="userName">${contact.username}  </p>
                    </li>
                </div>`
        }



        pageDiv.innerHTML = `
            <div class="messagePageContainer" >
        
        <div class="row" >
            <div class="col-md-2" id="userConvs" >
                <ol class="contacts"> 
                    ${contactHtml}
                </ol>
            </div>
            <div class="col-md-9" id="openedConv">
                <div class="headConv"><h3 class="recipient">${recipient.username}</h3> </div>
                <div class="messages"> 
                    <ol class="chat">
                        ${messagesHtml}
                    </ol>
                </div>
                <div class="containerInput">
                    <textarea id="textarea" type="text" placeholder="Write a message here" minlength="1"> </textarea>
                    <button class="submit-msg-btn">
                        <svg class="icon" id="sendMessageButton" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="paper-plane" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"></path></svg>
                    </button>   
                </div>
            </div>
        </div>
<<<<<<< HEAD
    </div>
    `;

=======
        </div>
        `;
        const sendMessageButton = document.getElementById("sendMessageButton");
        sendMessageButton.addEventListener("click", (e) => {
            const body = {
                id_sender: load_user.loadUser().id_user,
                id_recipient: new URLSearchParams(window.location.search).get("idUser"),
                message: document.getElementById("textarea").value
            }
            console.log(body)
            ApiModule.sendMessage(body);
            //TODO refresh messages
        });
>>>>>>> 96f948b81361506e9d0710b2237a4bf8e56b5551
    } catch (e) {
        console.error(e);
    }
};


async function getBaseInformationsUser(idUser) {
    try {
        const token = JSON.parse(window.localStorage.getItem("user")).token;
        const request = {
            method: "GET",
            headers: {
                "Authorization": token
            }
        };
        const responseUserInfo = await fetch("/api/users/profile/" + idUser, request);
        if (!responseUserInfo.ok) {
            throw new Error(
                "fetch error : " + responseUserInfo.status + " : " + responseUserInfo.statusText
            );
        }
        return await responseUserInfo.json();
    } catch (e) {
        console.log(e)
    }
}


export default Messages;