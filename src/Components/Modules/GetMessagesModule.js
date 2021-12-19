import ApiModule from "./ApiModule";
import load_user from "../../utils/load_user";

/**
 * Create the message page
 * @param page
 */
async function createMessagePage() {
    const page = document.querySelector("#page");
    const userId = load_user.loadUser().id_user;
    try {
        let idRecipient = window.localStorage.getItem("idRecipientMessagePage");
        if (!idRecipient) {
            //don't remove await, ide is wrong
            idRecipient = await ApiModule.getTheLatestConversationIdRecipient(userId);
            window.localStorage.setItem("idRecipientMessagePage", idRecipient);
        }

        const recipient = await ApiModule.getBaseInformationsUser(idRecipient);
        const contacts = await ApiModule.getContacts(userId);
        const messages = await ApiModule.getMessages(userId, idRecipient);
        const user = await ApiModule.getBaseInformationsUser(userId);

        page.innerHTML = `
                <div class="messagePageContainer" >
            
            <div class="row" >
                <div class="col-md-2" id="userConvs" >
                    <ol class="contacts"> 
                    </ol>
                </div>
                <div class="col-md-9" id="openedConv">
                    <div class="headConv"><h3 class="recipient">${recipient.username}</h3> </div>
                    <div class="messages"> 
                        <ol class="chat">
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
        </div>
        `;
        refreshMessages(user, recipient, messages)
        await refreshContactBar(contacts)
        setInterval(async function (){
            const recipient = await ApiModule.getBaseInformationsUser(idRecipient);
            const contacts = await ApiModule.getContacts(userId);
            const messages = await ApiModule.getMessages(userId, idRecipient);
            refreshMessages(user, recipient, messages)
            await refreshContactBar(contacts);
        },5000)
        createSendMessageFeature(user, recipient, messages);
    } catch (e) {
        console.error(e);
    }
}

function refreshMessages(user, recipient, messages) {
    const chats = document.querySelector(".chat");
    chats.innerHTML = createMessagesHtml(user, recipient, messages);
}


function createMessagesHtml(user, recipient, messages) {
    // Create the html for the messages
    let messagesHtml = "";
    messages.forEach(message => {
        const date = new Date(message.date_creation);
        let dateString = `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()} at ${date.getUTCHours()}:`;
        dateString += `${date.getUTCMinutes()}`;

        if (message.id_sender === user.id_user) {
            messagesHtml += `<div align="right">
                                   <li class="other">
                                        <div align="left" class="msg">
                                            <p class="userName">${user.username}</p>`;
        } else {
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
    return messagesHtml;
}

/**
 * Create the contact bar on the left
 * @param contacts
 * @returns {Promise<string>}
 */
async function createContactBarHtml(contacts) {
    //Create contacts bar
    let contactHtml = "";
    let contact;
    for (const idContact of contacts) {
        contact = await ApiModule.getBaseInformationsUser(idContact.id_recipient);
        contactHtml += `
                <div class="contact">
                    <li>
                        <p class="userName">${contact.username}  </p>
                    </li>
                </div>`
    }
    return contactHtml;
}

/**
 * Refresh the contacts bar
 * @param contacts
 * @returns {Promise<void>}
 */
async function refreshContactBar(contacts) {
    const contactsHtml = document.querySelector(".contacts");
    contactsHtml.innerHTML = await createContactBarHtml(contacts);
}

/**
 * Create the feature to send a message when clicking on send image
 */
function createSendMessageFeature (user, recipient, message) {
    const sendMessageButton = document.getElementById("sendMessageButton");
    sendMessageButton.addEventListener("click", async (e) => {
        const body = {
            id_sender: load_user.loadUser().id_user,
            id_recipient: window.localStorage.getItem("idRecipientMessagePage"),
            message: document.getElementById("textarea").value
        }
        await ApiModule.sendMessage(body);
        refreshMessages(user, recipient, message)
    });
}

export default createMessagePage;
