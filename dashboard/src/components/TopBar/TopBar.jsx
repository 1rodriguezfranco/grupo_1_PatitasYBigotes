import React from "react";
import JordanWalke from "../../assets/images/jordan-walke.png";
import LogoPyB from "../../assets/images/logo.jpg";

function TopBar(){
    return(
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

        {/* <!-- Sidebar Toggle (Topbar) --> */}
        <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
            <i className="fa fa-bars"></i>
        </button>

        {/* <!-- Topbar Navbar --> */}
        <ul className="navbar-nav ml-auto">

            {/* <!-- Nav Item - User Information --> */}
            <li className="nav-item dropdown no-arrow">
                <a className="nav-link dropdown-toggle" href="/" id="userDropdown">
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">Patitas y Bigotes</span>
                    <img className="img-profile rounded-circle" src={LogoPyB} alt="Jordan Walke - Creador de React" width="100" />
                </a>
            </li>

        </ul>

    </nav>
    )
}

export default TopBar;