import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import "bootstrap/dist/css/bootstrap.css";
import NavBar1 from "./NavBar1";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, setDoc, doc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

import { auth, db } from "../backend/firebase";
import { useMediaQuery } from "react-responsive";

const SignUp = () => {
  const navigate = useNavigate();
  var id;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const images = [
    "HomePagePhoto1.png",
    "HomePagePhoto2.jpg",
    "HomePagePhoto3.jpg",
  ];

  const [index, setIndex] = useState(0);

  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });
  useEffect(() => {
    const interval = setInterval(() => {
      if (index <= images.length - 2) setIndex(index + 1);
      else setIndex(0);
    }, 4000);
    return () => clearInterval(interval);
  }, [index]);

  const er = error || "";
  const handleSubmit = async (e) => {
    e.preventDefault();

    var credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
      .then((userCredential) => {
        //Signed in
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: name,
          FavSport: "Cricket",
          ChatRooms: [],
        })
          .then(() => {
            // Profile updated!
            // ...
            // console.log(name);
          })
          .catch((error) => {
            console.log(error);
            // An error occurred
            // ...
          });
        // console.log(user.uid);
        id = user.uid;
        // console.log(id);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorCode.substring(5));
        console.log(errorCode, errorMessage);
      });
    await setDoc(doc(db, "Users", id), {
      Chatrooms: [],
      total_matches: 0,
      TopSport: {
        Badminton: 0,
        Basketball: 0,
        Cricket: 0,
        Football: 0,
        Hockey: 0,
        Kabaddi: 0,
        TableTennis: 0,
        Tennis: 0,
        Volleyball: 0,
      },
    });
  };
  return (
    <section>
      {!isMobile ? (
        <div className="row">
          <div className="col-sm-6 col-xs-3 vh-100 img-log">
            <img src={images[parseInt(index)]} alt=""></img>
          </div>
          <div className="col-sm-6 col-xs-3">
            <div className="container1">
              <div
                className="card1"
                style={{
                  left: "40%",
                  top: "50%",
                }}
              >
                <img
                  className="logo-login"
                  src="logo.jpeg"
                  height="120px"
                ></img>
                <h1 className="card1-title" style={{ color: "gray" }}>
                  Sign Up
                </h1>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3 mt-3">
                      <label
                        style={{ fontSize: "25px", color: "gray" }}
                        htmlFor="Name"
                        className="form-label"
                      >
                        Name
                      </label>
                      <input
                        type="name"
                        className="form-control"
                        id="Name"
                        style={{
                          borderTop: "0px solid",
                          borderLeft: "0px solid",
                          borderRight: "0px solid",
                        }}
                        placeholder="Type the name you want yourself to be called with"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                      ></input>
                    </div>
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
                        id="email"
                        style={{
                          borderTop: "0px solid",
                          borderLeft: "0px solid",
                          borderRight: "0px solid",
                        }}
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
                        className="form-control"
                        id="pwd"
                        style={{
                          borderTop: "0px solid",
                          borderLeft: "0px solid",
                          borderRight: "0px solid",
                        }}
                        placeholder="Type Your Password"
                        name="pswd"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button type="submit" className="btn btn-dark btn-login">
                        Sign Up
                      </button>
                      <p style={{ color: "red", fontSize: "15px" }}>
                        {er.toUpperCase()}
                      </p>
                      <h6 style={{ color: "gray" }}>
                        Already Have an Account?
                      </h6>
                      <Link to="/" className="btn btn-dark ">
                        Log In
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="c2">
          <div
            className="card1"
            style={{
              left: "40%",
              top: "60%",
            }}
          >
            <img className="logo-login" src="logo.jpeg" height="120px"></img>
            <h1 className="card1-title" style={{ color: "gray" }}>
              Sign Up
            </h1>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-3">
                  <label
                    style={{ fontSize: "25px", color: "gray" }}
                    htmlFor="Name"
                    className="form-label"
                  >
                    Name
                  </label>
                  <input
                    type="name"
                    className="form-control"
                    id="Name"
                    style={{
                      borderTop: "0px solid",
                      borderLeft: "0px solid",
                      borderRight: "0px solid",
                    }}
                    placeholder="Type the name you want yourself to be called with"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </div>
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
                    id="email"
                    style={{
                      borderTop: "0px solid",
                      borderLeft: "0px solid",
                      borderRight: "0px solid",
                    }}
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
                    className="form-control"
                    id="pwd"
                    style={{
                      borderTop: "0px solid",
                      borderLeft: "0px solid",
                      borderRight: "0px solid",
                    }}
                    placeholder="Type Your Password"
                    name="pswd"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="submit" className="btn btn-dark btn-login">
                    Sign Up
                  </button>
                  <p style={{ color: "red", fontSize: "15px" }}>
                    {er.toUpperCase()}
                  </p>
                  <h6 style={{ color: "gray" }}>Already Have an Account?</h6>
                  <Link to="/" className="btn btn-dark ">
                    Log In
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SignUp;
