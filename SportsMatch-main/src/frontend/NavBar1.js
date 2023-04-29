import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import "bootstrap/dist/css/bootstrap.css";
import { signOut } from "firebase/auth";
import { auth } from "../backend/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const Navbar1 = ({ userId }) => {
  const navigate = useNavigate();
  const [Dropdown, setDropdown] = useState("");
  const [user, loading] = useAuthState(auth);
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
  const handleProfile = () => {
    navigate("/profile");
  };
  const handleMatches = () => {
    navigate("/JoinedRooms");
  };
  return (
    <section id="Nav">
      <nav
        className="navbar navbar-light bg-gray"
        style={{
          position: "absolute",
          left: "0px",
          width: "105%",
          height: "80px",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="container">
          <div
            className="navbar-brand"
            style={{ position: "absolute", left: "3%", top: "2%" }}
          >
            <Link to="/Home">
              <img
                src="flc_design20230316126131.png"
                alt=""
                width="50%"
                height="79"
              />
            </Link>
          </div>
          <div
            className="navbar-brand"
            style={{
              position: "absolute",
              left: "85%",
              top: "2%",
            }}
          >
            {/* <Link to="/Profile"> */}
            <div className="img-circle">
              <img
                className="logo"
                src="https://t4.ftcdn.net/jpg/00/64/67/27/240_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
                alt=""
                width="100"
                height="70"
                onClick={handleClick}
              />
            </div>
            {/* </Link> */}
          </div>
        </div>
      </nav>
      {Dropdown && (
        <div className="container-pc">
          <div className="card-prof" style={{ width: "100px" }}>
            <h1 className="card1-title" style={{ fontSize: "7vw" }}>
              {user.displayName}
            </h1>
            <button className="dropbtn" onClick={handleProfile}>
              Profile
            </button>
            <br></br>
            <button className="dropbtn" onClick={handleMatches}>
              My Matches
            </button>
            <br></br>
            <button className="dropbtn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Navbar1;
