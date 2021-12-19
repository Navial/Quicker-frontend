import ApiModule from "./ApiModule";
import load_user from "../../utils/load_user";

/**
 * Create the message page
 * @param page
 */

const messagePageHtml = `
                <div class="messagePageContainer" >
            
            <div class="row" >
                <div class="col-md-2" id="userConvs" >
                    <ol class="contacts"> 
                    </ol>
                </div>
                <div class="col-md-9" id="openedConv">
                    <div class="headConv"><h3 class="senderHeadConv"></h3> </div>
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


async function createMessagePage() {
    const page = document.querySelector("#page");
    const userId = load_user.loadUser().id_user;
    try {
        //Load all informations
        let conversation = await ApiModule.getTheLatestConversation(userId);
        const user = await ApiModule.getBaseInformationsUser(userId);

        const recipient = await ApiModule.getBaseInformationsUser(conversation.id_recipient);
        const sender = await ApiModule.getBaseInformationsUser(conversation.id_sender);

        //To determinate if the user is the sender or recipient
        if(userId === conversation.id_recipient) {
            var contacts = await ApiModule.getSender(recipient.id_user);
        }
        else
            var contacts = await ApiModule.getRecipients(sender.id_user);

        const messages = await ApiModule.getMessages(sender.id_user, recipient.id_user);

        page.innerHTML = messagePageHtml;

        //Insert the username of sender into the html
        if(sender.id_user === user.id_user){
            document.querySelector(".senderHeadConv").innerHTML = recipient.username;
        } else {
            document.querySelector(".senderHeadConv").innerHTML = sender.username;
        }

        //Show messages and contacts for the first time on reload
        refreshMessages(sender, recipient, messages)
        await refreshContactBar(contacts)

        //Periodic function to reload informations and content
        setInterval(async function (){
            const recipient = await ApiModule.getBaseInformationsUser(conversation.id_recipient);
            if(userId === recipient.id_user)
                contacts = await ApiModule.getSender(recipient.id_user);
            else
                contacts = await ApiModule.getRecipients(user.id_user);
            const messages = await ApiModule.getMessages(sender.id_user, recipient.id_user);

            refreshMessages(sender, recipient, messages)
            await refreshContactBar(contacts);
        },5000)

        //Create the send message feature
        createSendMessageFeature(sender, recipient);
    } catch (e) {
        console.error(e);
    }
}

function refreshMessages(sender, recipient, messages) {
    const chats = document.querySelector(".chat");
    chats.innerHTML = createMessagesHtml(sender, recipient, messages);
}


function createMessagesHtml(sender, recipient, messages) {
    // Create the html for the messages
    let messagesHtml = "";
    messages.forEach(message => {
        const date = new Date(message.date_creation);
        let dateString = `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()} at ${date.getUTCHours()}:`;
        dateString += `${date.getUTCMinutes()}`;

        if (message.id_sender === recipient.id_user) {
            messagesHtml += `<div align="right">
                                   <li class="other">
                                        <div align="left" class="msg">
                                            <p class="userName">${recipient.username}</p>`;
        } else {
            messagesHtml += `<div align="left">
                                    <li class="self">
                                        <div align="left" class="msg">
                                            <p class="userName">${sender.username}</p>`;
        }

        messagesHtml +=`
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
    for (let contact of contacts) {
        if(contact.id_sender)
            contact = await ApiModule.getBaseInformationsUser(contact.id_sender);
        else
            contact = await ApiModule.getBaseInformationsUser(contact.id_recipient);
        contactHtml += `
                <div class="contact">
                    <li>
                        <a href="/messages?idUser=${contact.id_user}" class="userName">${contact.username}  </a>
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
function createSendMessageFeature (convSender, recipient) {
    const sendMessageButton = document.getElementById("sendMessageButton");
    const sender = load_user.loadUser()
    sendMessageButton.addEventListener("click", async (e) => {
        const body = {
            id_sender: sender.id_user,
            id_recipient: convSender.id_user,
            message: document.getElementById("textarea").value
        }
        await ApiModule.sendMessage(body);
        const messages = await ApiModule.getMessages(convSender.id_user, recipient.id_user);
        refreshMessages(convSender, recipient, messages);
    });
}

export default createMessagePage;
