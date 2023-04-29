import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../backend/firebase";
import "../index.css";
import "bootstrap/dist/css/bootstrap.css";
import NavBar1 from "./NavBar1";
import { useMediaQuery } from "react-responsive";
import Loading from "./LoadingScreen";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const er = error || "";

  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  const images = ["fball.jpeg", "fball3.jpeg"];

  // const [index, setIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (index <= images.length - 2) setIndex(index + 1);
  //     else setIndex(0);
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, [index]);

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/Location");
        // console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorCode.substring(4));
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <section>
      {!isMobile ? (
        <div className="row">
          <div className="col-sm-6 col-xs-3 vh-100 img-log">
            <img className="img-fluid" src={images[1]} alt=""></img>
            {/* <div>
            <SimpleImageSlider
              width={1200}
              height={1000}
              images={images}
              showBullets={true}
              showNavs={true}
            />
          </div> */}
          </div>
          <div className="col-sm-6 col-xs-3 ">
            <div className="container1">
              <div className="card1" style={{ left: "40%", top: "50%" }}>
                <img
                  className="logo-login"
                  src="logo.jpeg"
                  height="120px"
                ></img>
                <h1
                  className="card1-title"
                  style={{
                    color: "gray",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                >
                  Login
                </h1>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3 mt-3">
                      <label
                        style={{ fontSize: "25px", color: "gray" }}
                        htmlFor="email"
                        className="form-label"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        style={{
                          borderTop: "0px solid",
                          borderLeft: "0px solid",
                          borderRight: "0px solid",
                        }}
                        id="email"
                        placeholder="Type Your Email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                      ></input>
                    </div>
                    <div className="mb-3">
                      <label
                        style={{ fontSize: "25px", color: "gray" }}
                        htmlFor="pwd"
                        className="form-label"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        style={{
                          borderTop: "0px solid",
                          borderLeft: "0px solid",
                          borderRight: "0px solid",
                        }}
                        className="form-control"
                        id="pwd"
                        placeholder="Type Your Password"
                        name="pswd"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button type="submit" className="btn btn-dark btn-login">
                        Log In
                      </button>
                      <p style={{ color: "red", fontSize: "15px" }}>{er}</p>
                    </div>
                  </form>
                  <h6 style={{ color: "Gray" }}>New Here?</h6>
                  <Link to="/SignUp" className="btn btn-dark">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="c2">
          <div className="card1" style={{ left: "40%" }}>
            <img className="logo-login" src="logo.jpeg" height="120px"></img>
            <h1
              className="card1-title"
              style={{ color: "gray", fontFamily: "Open Sans, sans-serif" }}
            >
              Login
            </h1>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-3">
                  <label
                    style={{ fontSize: "25px", color: "gray" }}
                    htmlFor="email"
                    className="form-label"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    style={{
                      borderTop: "0px solid",
                      borderLeft: "0px solid",
                      borderRight: "0px solid",
                    }}
                    id="email"
                    placeholder="Type Your Email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <div className="mb-3">
                  <label
                    style={{ fontSize: "25px", color: "gray" }}
                    htmlFor="pwd"
                    className="form-label"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    style={{
                      borderTop: "0px solid",
                      borderLeft: "0px solid",
                      borderRight: "0px solid",
                    }}
                    className="form-control"
                    id="pwd"
                    placeholder="Type Your Password"
                    name="pswd"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="submit" className="btn btn-dark btn-login">
                    Log In
                  </button>
                  <p style={{ color: "red", fontSize: "15px" }}>{er}</p>
                </div>
              </form>
              <h6 style={{ color: "Gray" }}>New Here?</h6>
              <Link to="/SignUp" className="btn btn-dark">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Login;
