import createMessagePage from "../Modules/GetMessagesModule"

/**
 * Render the Messages
 */

const Messages = async () => {
    //setTimeout("location.reload(true)", 5000); //TODO change the 1st parameter for reload conversation only
    try {
        await createMessagePage();
    } catch (e) {
        console.error(e);
    }
};

export default Messages;