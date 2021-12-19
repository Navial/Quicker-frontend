import createMessagePage from "../Modules/GetMessagesModule"

/**
 * Render the Messages
 */

const Messages = async () => {
    setTimeout("location.reload(true)", 30000); //TODO change the 1st parameter for reload conversation only
    // Init
    const pageDiv = document.querySelector("#page");
    try {
        await createMessagePage(pageDiv);
    } catch (e) {
        console.error(e);
    }
};

export default Messages;