import load_user from "../../utils/load_user";

/**
 * Render the Messages
 */

const Messages = async () => {
    // Init
    const userId = load_user.loadUser().id_user;
    console.log(userId);

    const user = await getBaseInformationsUser(userId);

    // Get base user informations
    const idRecipient = new URLSearchParams(window.location.search).get("idUser");

    const recipient = await getBaseInformationsUser(idRecipient);
    console.log(recipient);

    const pageDiv = document.querySelector("#page");

    let request = {
        method: "GET",
        headers: {
            "Authorization": load_user.getToken()
        }
    };
    try {
        const reponseMessages = await fetch(`/api/messages/` + userId + `/` + idRecipient , request);
        if (!reponseMessages.ok) {
            throw new Error(
                "fetch error : " + reponseMessages.status + " : " + reponseMessages.statusText
            );
        }

        const messages = await reponseMessages.json();
        let messagesHtml = "";
        messages.forEach(message => {
            if(message.id_sender === user.id_user){
                messagesHtml += `<div align="right">
                                   <li className="other">
                                        <div align="left" className="msg">
                                            <p>${user.username}</p>`;
            }else{
                messagesHtml += `<div align="left">
                                    <li className="self">
                                        <div align="left" className="msg">
                                            <p>${recipient.username}</p>`;
            }

            messagesHtml +=
                `
                    <p>${message.message}</p>
                    <time>20:18</time>
                </div>
            </li>
        </div>`
        });


   pageDiv.innerHTML = `
    <div class="messagePageContainer" >
        
        <div class="row" >
            <div class="col-md-2" id="userConvs" >
                <ol class="contacts"> 
                    <div class="contact" > 
                        <li >
                            <p> LePirelot </p>
                        </li>
                    </div>
                    <div class="contact" > 
                        <li >
                            <p> François </p>
                        </li>
                    </div>
                    <div class="contact" > 
                        <li >
                            <p> Souli </p>
                        </li>
                    </div>
                    
                    <div class="contact" > 
                        <li >
                            <p> Guillaume </p>
                        </li>
                    </div>
                </ol>
            </div>
            <div class="col-md-9" id="openedConv">
                <div class="headConv"><h3 class="recipient">LePirelot</h3> </div>
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
    </div>
    `;
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