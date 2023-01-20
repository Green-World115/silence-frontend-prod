import React from "react";
import { Card, Button, Alert, Navbar, Input, Form } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar(props) {
  return (
    <div>
      <nav class="navbar navbar-light mx-3 mt-3 rounded shadow-sm mb-3 bg-white">
        <a class="navbar-brand mx-3">{props.title}</a>
        <div className="d-flex align-items-center nav-icons">
          <Link class="nav-icons" to={""}>
            <FaIcons.FaRegCommentDots style={{ height: 25, width: 25 }} />
          </Link>
          <Link class="nav-icons" to={"/notifications"}>
            <FaIcons.FaBell style={{ height: 25, width: 25 }} />
          </Link>
          <Form className="d-flex mx-3">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-dark ms-2 my-2 my-sm-0" type="submit">
              Search
            </button>
          </Form>
        </div>
      </nav>
    </div>
  );
}
