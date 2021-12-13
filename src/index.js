import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/style.css"; // If you prefer to style your app with vanilla CSS rather than with Bootstrap

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Navbar/Footer";
import { Router } from "./Components/Router/Router";

const actuelRoot = window.location.pathname;
if (actuelRoot !== '/login' && actuelRoot !== '/register')
    Navbar();

Router(); // The router will automatically load the root page

Footer();
