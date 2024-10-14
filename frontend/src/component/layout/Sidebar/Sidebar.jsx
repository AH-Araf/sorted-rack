import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { SidebarContext } from "../../../contexts/SidebarContext";
import logo from "../../../assests/images/sorted-rack-logo.svg";
import "./Sidebar.scss";
import { getUserDetails } from "../../../service";

const Sidebar = () => {
  const { activeMenu } = useContext(SidebarContext);
  const { role } = getUserDetails();

  const superAdminRoles = ["superadmin"];
  const adminRoles = ["admin", "superadmin"];

  const isSuperAdmin = superAdminRoles.includes(role);
  const isAdmin = adminRoles.includes(role);

  return (
    <div className={activeMenu ? "sidebar d-flex bg-dark hide" : "sidebar d-flex bg-dark"}>
      <div className="d-flex flex-column flex-shrink-0 px-3 text-white w-100">
        <a href="/" className="d-flex align-items-center pt-3 mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <img alt="Sorted Rack" src={logo} width="140px" />
        </a>

        <hr />

        <nav className="h-100vh">
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <NavLink
                end={true}
                to="/"
                className={({ isActive }) => `nav-link text-white ${isActive ? "active" : undefined}`}
              >
                <div className="d-flex gap-2">
                  <i className="bi bi-house"></i>
                  <span>Dashboard</span>
                </div>
              </NavLink>
            </li>

            {isSuperAdmin && (
              <li>
                <NavLink
                  to="/user"
                  className={({ isActive }) => `nav-link text-white ${isActive ? "active" : undefined}`}
                >
                  <div className="d-flex gap-2">
                    <i className="bi bi-people"></i>
                    <span>User</span>
                  </div>
                </NavLink>
              </li>
            )}

            {isAdmin && (
              <>
                <li>
                  <NavLink
                    to="/stock"
                    className={({ isActive }) => `nav-link text-white ${isActive ? "active" : undefined}`}
                  >
                    <div className="d-flex gap-2">
                      <i className="bi bi-box-seam"></i>
                      <span>Stock</span>
                    </div>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/assigned"
                    className={({ isActive }) => `nav-link text-white ${isActive ? "active" : undefined}`}
                  >
                    <div className="d-flex gap-2">
                      <i className="bi bi-person-check"></i>
                      <span>Assigned Devices</span>
                    </div>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/adminTicket"
                    className={({ isActive }) => `nav-link text-white ${isActive ? "active" : undefined}`}
                  >
                    <div className="d-flex">
                      <i className="bi bi-ticket-perforated"></i>
                      <span className="ms-2">Admin Ticket</span>
                    </div>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/Statistics"
                    className={({ isActive }) => `nav-link text-white ${isActive ? "active" : undefined}`}
                  >
                    <div className="d-flex">
                      <i className="bi bi-graph-down-arrow"></i>
                      <span className="ms-2">Statistics</span>
                    </div>
                  </NavLink>
                </li>
              </>
            )}

            {!isAdmin && !isSuperAdmin && (
              <li>
                <NavLink
                  to="/userTicketPart"
                  className={({ isActive }) => `nav-link text-white ${isActive ? "active" : undefined}`}
                >
                  <div className="d-flex gap-2">
                    <i className="bi bi-ticket-perforated"></i>
                    <span className="ms-2">User Ticket</span>
                  </div>
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <hr />
        <div className="dropdown">
          <a
            href="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
            <strong>mdo</strong>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
            <li>
              <a className="dropdown-item" href="#">
                New project...
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
