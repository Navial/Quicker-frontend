// When using Bootstrap to style components, the CSS is imported in index.js
// However, the JS has still to be loaded for each Bootstrap's component that needs it.
// Here, because our JS component 'Navbar' has the same name as Navbar Bootstrap's component
// we change the name of the imported Bootstrap's 'Navbar' component
import { Navbar as BootstrapNavbar} from "bootstrap";
import homePage from "../Pages/HomePage";



const navbarLogged = `
    
    <!--<div class="sidenav">
        <div id="menu">
                
        </div>
    </div>

    <div id="mySidenav" class="sidenav">
        <a href="/resister" id="homeButton">Home</a>
        <a href="#" id="tendanceButton">Top kwicks</a>
        <a href="#"  id="settingsButton">Paramètres</a>
    </div>
    <nav>
        <div id="menu">
          <button class="menuButton" id="homeButton">Home</button>
          <button class="menuButton" id="tendanceButton">Top kwicks</button>
          <button class="menuButton" id="messagesButton">Messages</button>
          <button class="menuButton" id="settingsButton">Paramètres</button>
          <img id="photoDeProfile">
        </div>
    </nav>-->
  `;
  navbarWrapper.innerHTML = navbarLogged;
/**
 * Render the Navbar which is styled by using Bootstrap
 * Each item in the Navbar is tightly coupled with the Router configuration :
 * - the URI associated to a page shall be given in the attribute "data-uri" of the Navbar
 * - the router will show the Page associated to this URI when the user click on a nav-link
 */

const Navbar = () => {
  const navbarWrapper = document.querySelector("#navbarWrapper");
  if(window.localStorage.getItem("user"))
    navbarWrapper.innerHTML = navbarLogged;
};

export default Navbar;
