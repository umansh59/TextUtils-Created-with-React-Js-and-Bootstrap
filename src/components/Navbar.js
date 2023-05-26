import React from "react";
import propsTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <div>
      <nav
        className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            {props.title}
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
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  {props.about}
                </Link>
              </li>
            </ul>
            <div style={{ display: props.mode === "dark" ? "block" : "none" }}>
              <button
                type="button"
                className="btn btn-primary btn-circle btn-xl"
                style={{ border: "0.5px solid white" }}
                onClick={props.darkModeBlueColor}
              ></button>
              <button
                type="button"
                className="btn btn-success btn-circle btn-xl"
                style={{ border: "0.5px solid white" }}
                onClick={props.darkModeGreenColor}
              ></button>
              <button
                type="button"
                className="btn btn-danger btn-circle btn-xl"
                style={{ border: "0.5px solid white" }}
                onClick={props.darkModeRedColor}
              ></button>
              <button
                type="button"
                className="btn btn-dark btn-circle btn-xl"
                style={{ border: "0.5px solid white" }}
                onClick={props.darkModeBlackColor}
              ></button>
            </div>
            <div
              className={`form-check form-switch text-${
                props.mode === "light" ? "dark" : "light"
              } mx-2`}
            >
              <input
                className="form-check-input"
                type="checkbox"
                // eslint-disable-next-line
                role="switch"
                id="toggleSwitch"
                onClick={props.toggleMode}
              />
              <label className="form-check-label" htmlFor="toggleSwitch">
                Dark Mode
              </label>
            </div>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}
Navbar.propsTypes = {
  title: propsTypes.string,
  about: propsTypes.string,
};
