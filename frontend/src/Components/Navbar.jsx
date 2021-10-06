import React from "react";
import { Link, useLocation } from "react-router-dom";
const Navbar = () => {
  const { pathname } = useLocation();
  const handleLogout =() => {
    localStorage.removeItem('token');
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNoteBook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={pathname === "/" ? `nav-link active` : "nav-link"}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  pathname === "/about" ? `nav-link active` : "nav-link"
                }
                aria-current="page"
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          <form className="d-flex">
            {!localStorage.getItem("token") ? (
              <>
                <Link
                  className="btn btn-primary mx-1"
                  to="/login"
                  type="submit"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-primary mx-1"
                  to="/signup"
                  type="submit"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button className="btn btn-primary mx-1" onClick={handleLogout}  type="submit">
                Log Out
              </button>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
