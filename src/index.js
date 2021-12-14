import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/style.css"; // If you prefer to style your app with vanilla CSS rather than with Bootstrap

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Navbar/Footer";
import { Router } from "./Components/Router/Router";

const actuelRoot = window.location.pathname;
const isConnected = window.localStorage.length !== 0;

const unloggedPage = [
    "/login",
    "/register",
    "/logout"
];

if (unloggedPage.findIndex(s => s === actuelRoot) < 0) {
    if (!isConnected) {
        window.location.replace(window.location.origin + "/login");
    } else {
        Navbar();
    }
}

Router(); // The router will automatically load the root page

Footer();
