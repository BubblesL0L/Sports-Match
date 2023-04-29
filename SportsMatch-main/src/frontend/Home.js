import { React, useEffect, useState, Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../backend/firebase";
import { BsQuestionCircle } from "react-icons/bs";
import "../index.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar1 from "./NavBar1";
import Profile from "./Profile";
import Footer from "./Footer";
import Navbar2 from "./NavBar2";
import { useMediaQuery } from "react-responsive";
const Home = () => {
  const navigate = useNavigate();
  const [isHovering1, setIsHovering1] = useState(false);
  const [isHovering2, setIsHovering2] = useState(false);
  const [isHovering3, setIsHovering3] = useState(false);
  const [currLocation, setCurrLocation] = useState({});
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });
  // const getLocation = async () => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     console.log(position);
  //     const { latitude, longitude } = position.coords;
  //     setCurrLocation({ latitude, longitude });
  //   });
  // };
  const handleMouseOver3 = () => {
    setIsHovering3(true);
  };

  const handleMouseOut3 = () => {
    setIsHovering3(false);
  };
  const handleMouseOver2 = () => {
    setIsHovering2(true);
  };

  const handleMouseOut2 = () => {
    setIsHovering2(false);
  };
  const handleMouseOver1 = () => {
    setIsHovering1(true);
  };

  const handleMouseOut1 = () => {
    setIsHovering1(false);
  };

  // useEffect(() => {
  //   // onAuthStateChanged(auth, (user) => {
  //   //   if (user) {
  //   //     // User is signed in, see docs for a list of available properties
  //   //     // https://firebase.google.com/docs/reference/js/firebase.User
  //   //     const uid = user.uid;
  //   //     // ...
  //   //     console.log("uid", uid);
  //   //   } else {
  //   //     // User is signed out
  //   //     // ...
  //   //     console.log("user is logged out");
  //   //   }
  //   // });
  //   getLocation();
  // }, []);

  const navigateToCreateRoom = () => {
    navigate("/CreateARoom");
  };
  const navigateToCode = () => {
    navigate("/Code");
  };
  const navigateTojoinARoom = () => {
    navigate("/JoinARoom");
  };
  return (
    <section>
      {!isMobile ? (
        <div className="row">
          <div className="col-2 col-nav">
            <Navbar2 state="1" />
          </div>
          <div className="col-10 c2">
            {/* <div className="c2"> */}
            {/* <div class="container-fluid mt-3"> */}
            <div className="row">
              <h1 className="h1-h" style={{ fontFamily: "Monaco" }}>
                Connect,Compete,Conquer with SportsMatch
              </h1>
              <div
                className="col-h col-sm-4  text-white p-3"
                style={{ textAlign: "center" }}
              >
                <br />
                <br />
                <button
                  type="button"
                  className="btn-home btn btn-dark"
                  style={{ textAlign: "center" }}
                  onClick={() => navigateToCreateRoom()}
                >
                  <h4 className="text-button">Create Online Sport</h4>
                </button>

                <p className="p-h">
                  <div
                    onMouseOver={handleMouseOver1}
                    onMouseOut={handleMouseOut1}
                  >
                    <BsQuestionCircle />
                  </div>
                </p>
                <br />
                {isHovering1 && (
                  <div className="card-info">
                    <p style={{ color: "gray", fontSize: "1.5vw" }}>
                      Create your own match
                    </p>
                  </div>
                )}
              </div>
              <div
                className="col-sm-4 text-white p-3"
                style={{ textAlign: "center" }}
              >
                <br />
                <br />
                <button
                  type="button"
                  className="btn-home btn btn-dark"
                  onClick={() => navigateTojoinARoom()}
                >
                  <h4 className="text-button">Join Online Sport</h4>
                </button>

                <p className="p-h">
                  <div
                    onMouseOver={handleMouseOver2}
                    onMouseOut={handleMouseOut2}
                  >
                    <BsQuestionCircle />
                  </div>
                </p>
                <br />
                {isHovering2 && (
                  <div className="card-info">
                    <p style={{ color: "gray", fontSize: "1.5vw" }}>
                      Find all the matches available Online
                    </p>
                  </div>
                )}
              </div>
              <div
                className="col-sm-4 text-white p-3"
                style={{ textAlign: "center" }}
              >
                <br />
                <br />
                <button
                  type="button"
                  className="btn-home btn btn-dark"
                  onClick={() => navigateToCode()}
                >
                  <h4 className="text-button">Enter Code</h4>
                </button>

                <br />
                <p className="p-h">
                  <div
                    onMouseOver={handleMouseOver3}
                    onMouseOut={handleMouseOut3}
                  >
                    <BsQuestionCircle />
                  </div>
                </p>
                <br />
                {isHovering3 && (
                  <div className="card-info">
                    <p style={{ color: "gray", fontSize: "1.5vw" }}>
                      Join a room created by your friend using room ID
                    </p>
                  </div>
                )}
              </div>
            </div>
            <Footer></Footer>
          </div>
        </div>
      ) : (
        <article>
          <Navbar1></Navbar1>
          <div className="container-mobile">
            <div className="row container-home">
              <h1
                className="h1-h"
                style={{ fontSize: "8.2vw", fontFamily: "Copperplate" }}
              >
                Connect,Compete,Conquer with SportsMatch
              </h1>
              <div className="col-h col-sm-4  text-white p-3">
                <br />
                <br />
                <button
                  type="button"
                  className="btn-home btn btn-dark"
                  style={{ textAlign: "center" }}
                  onClick={() => navigateToCreateRoom()}
                >
                  <h4 className="text-button" style={{ fontSize: "6vw" }}>
                    Create Online Sport
                  </h4>
                </button>

                {/* <div className="p-h">
                  <BsQuestionCircle />
                </div> */}
              </div>
              <div
                className="col-sm-4 text-white p-3"
                style={{ textAlign: "center" }}
              >
                <br />
                <br />
                <button
                  type="button"
                  className="btn-home btn btn-dark"
                  onClick={() => navigateTojoinARoom()}
                >
                  <h4 className="text-button" style={{ fontSize: "6vw" }}>
                    Join Online Sport
                  </h4>
                </button>

                {/* <p className="p-h">
                  <BsQuestionCircle />
                </p> */}
              </div>
              <div
                className="col-sm-4 text-white p-3"
                style={{ textAlign: "center" }}
              >
                <br />
                <br />
                <button
                  type="button"
                  className="btn-home btn btn-dark"
                  onClick={() => navigateToCode()}
                >
                  <h4 className="text-button" style={{ fontSize: "6vw" }}>
                    Enter Code
                  </h4>
                </button>

                <br />
                {/* <p className="p-h">
                  <div
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    <BsQuestionCircle />
                  </div>
                </p> */}
                <br />
                {isHovering3 && (
                  <div className="card-info">
                    <p style={{ color: "black" }}>Info</p>
                    {/* <p style={{ color: "black" }}>
                  Latitude:{currLocation.latitude}
                </p>
                <p style={{ color: "black" }}>
                  Longitude:{currLocation.longitude}
                </p> */}
                  </div>
                )}
              </div>
            </div>
            <Footer></Footer>
          </div>
        </article>
      )}

      {/* </div> */}
    </section>
  );
};

export default Home;
