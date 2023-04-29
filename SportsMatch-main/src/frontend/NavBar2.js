import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import "bootstrap/dist/css/bootstrap.css";
import { signOut } from "firebase/auth";
import { auth } from "../backend/firebase";

const Navbar2 = ({ state }) => {
  const navigate = useNavigate();
  const [Dropdown, setDropdown] = useState("");
  const handleClick = () => {
    setDropdown(!Dropdown);
  };
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        auth.currentUser = null;
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <section className="profile" style={{ textAlign: "center" }}>
      <Link to="/Home">
        <img
          src="flc_design20230316126131.png"
          className="home-logo"
          alt=""
          width="90%"
          height="180"
        />
      </Link>
      <Link to="/Home">
        <button
          className={state === "1" ? "btn btn-nav2" : "btn btn-dark btn-nav"}
        >
          <p className={state === "1" ? "text-button-nav2" : "text-button-nav"}>
            Home
          </p>
        </button>
      </Link>
      <Link to="/Profile">
        <button
          className={state === "2" ? "btn btn-nav2" : "btn btn-dark btn-nav"}
        >
          <p className={state === "2" ? "text-button-nav2" : "text-button-nav"}>
            Profile
          </p>
        </button>
      </Link>
      <Link to="/JoinedRooms">
        <button
          className={state === "3" ? "btn btn-nav2" : "btn btn-dark btn-nav"}
        >
          <p className={state === "3" ? "text-button-nav2" : "text-button-nav"}>
            My Matches
          </p>
        </button>
      </Link>
      <button className="btn btn-dark btn-logout" onClick={handleLogout}>
        Log out
      </button>
    </section>
  );
};

export default Navbar2;
