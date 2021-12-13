import { Redirect } from "../Router/Router"

const Logout = () => {
    window.localStorage.clear();
    Redirect("/");
}

export default Logout;