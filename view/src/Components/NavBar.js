import React from "react";
import { Link } from "react-router-dom";

function NavBar() {

    return (
        <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-dark bg-primary border-bottom box-shadow mb-3">
            
            <div class="navbar-collapse collapse d-sm-inline-flex justify-content-between">
            <ul class="navbar-nav flex-grow-1 praDireita">
            <li class="nav-item">
                <Link to="/" className="nav-link text-dark" >Home</Link>
            </li>
            <li class="nav-item" >
                <Link to="/Clientes"  className="nav-link text-dark">Clientes</Link>
            </li>
            <li class="nav-item">
                <Link to="/Sobre"  className="nav-link text-dark">Sobre o Projeto</Link>
            </li>
            </ul>
            </div>
            
        </nav>
    )
};

export default NavBar;