function loadUser () {
    return JSON.parse(window.localStorage.getItem("user"));
}

export default loadUser;