import React from "react";
import { Link } from "react-router-dom";
// Css
import "../../css/app.css";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark">
    <Link className={"navbar-brand"} to={"/"}>
      COVID-19
    </Link>

    <div className="collapse navbar-collapse" id="navbarText">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className={"nav-link"} to={"/tweets"}>
            Analisis
          </Link>
        </li>

        <li className="nav-item">
          <Link className={"nav-link"} to={"/news"}>
            Noticias
          </Link>
        </li>

        <li className="nav-item">
          <Link className={"nav-link"} to={"/world"}>
            Mundo
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
