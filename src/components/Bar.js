import React from "react";
import "bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './BarStyles.css';
import { Logout } from "../pages/Interface";

function SideBar() {
    const navigate = useNavigate();

    const handleSignOutClick = () => {
        Logout();
        navigate("/login");
    };
    const handleProfileClick = () => {
        navigate("/profile");
    };

    const location = useLocation();

    return (
        <div>
            {/* sidebar col */}
            {/* image and mycircle */}
            <div className="my-circles">
                <a class="navbar-brand" href="/" aria-label="MyCircles">
                    <img
                        src="https://github.com/ITProject-Thu-12pm/Assets/blob/main/logo-white-bg.png?raw=true"
                        class="title-img"
                        alt="logo"
                    ></img>
                </a>
                <h5>MyCircles</h5>
            </div>

            {/* button */}
            <div className="btns">
                <Button to="/dashboard" buttonTitle="Dashboard" >
                    <i class="bi bi-window btn-icon"></i>
                </Button>
                <Button to="/contacts" buttonTitle="Contacts">
                    <i className="bi bi-people-fill btn-icon"></i>
                </Button>
                <Button to="/trello-board" buttonTitle="Todo">
                    <i class="bi bi-card-checklist btn-icon"></i>
                </Button>
                <Button to="/calendar" buttonTitle="Calendar" >
                    <i class="bi bi-calendar3-range btn-icon"></i>
                </Button>

            </div>

            {/* profile dropdown menu */}
            <div className={`dropdown small-bar-profile profile ${location.pathname === "/profile" ? "active-profile" : ""}`}>
                <a
                    href="#"
                    className="d-flex align-items-center text-black text-decoration-none dropdown-toggle"
                    id="dropdownUser"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <img
                        src={localStorage.getItem('avatar')} // Replace with actual image URL
                        alt="User Avatar"
                        className="rounded-circle me-2 avatar"
                    />
                    <span className="d-none d-sm-inline user-name">{localStorage.getItem('userName')}</span>
                </a>
                <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser">
                    {/* Dropdown menu items */}
                    <li><a className="dropdown-item" href="#" onClick={handleProfileClick}>Profile</a></li>
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#" onClick={handleSignOutClick}>Sign Out</a></li>
                </ul>
            </div>



        </div>
    );
}

const Button = ({ buttonTitle, to, children }) => {
    return (
        <NavLink
            to={to}
            activeClassName="active"
            className="btn btn-outline-secondary align-items-center bar-btn"
        >
            {children}
            <span>{buttonTitle}</span>
        </NavLink>
    );
}



export default SideBar;
