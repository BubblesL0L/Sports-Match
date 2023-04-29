import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar1 from "./NavBar1";
import { db } from "../backend/firebase";
import { auth } from "../backend/firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  increment,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import Navbar2 from "./NavBar2";
import { useMediaQuery } from "react-responsive";
const JoinARoom = () => {
  const navigate = useNavigate();
  const [sport, setSport] = useState("");
  const [time, setTime] = useState("");
  const [maxPlayers, setMaxplayers] = useState(null);
  const [validation, setValidation] = useState(0);
  // const [state, setState] = useState("Any");
  const auth = getAuth();
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });
  const [user, loading] = useAuthState(auth);
  var uid;
  if (loading) {
    console.log("Loading");
  } else {
    // setId(currentUser.uid);
    // console.log(user);
    if (user == null) {
      navigate("/");
    } else uid = user.uid;
    // console.log(currentUser);
  }
  const Members = [];
  Members.push(uid);
  const handleChange = (e) => {
    setSport(e.target.value);
  };
  var flag = 1;
  const handleValidation = () => {
    var today = new Date();
    var time_curr = today.getHours() + ":" + today.getMinutes();
    var reserv1 = time_curr;
    var reserv2 = time;
    var hrs_curr = parseInt(time_curr.split(":")[0]);
    var min_curr = parseInt(time_curr.split(":")[1]);
    var hrs_match = parseInt(time.slice(0, 2));
    var min_match = parseInt(time.slice(3, 4));
    //console.log(hrs_curr, min_curr);
    var val1 = hrs_curr * 60 + min_curr;
    var val2 = hrs_match * 60 + min_match;
    if (time === "" || sport === "" || maxPlayers === "") {
      flag = 1;
      setValidation(1);
    } else if (maxPlayers <= 1 || maxPlayers == null) {
      flag = 1;
      setValidation(2);
    } else if (val2 <= val1) {
      flag = 1;
      setValidation(3);
    } else if (maxPlayers >= 50) {
      flag = 1;
      setValidation(4);
    } else {
      flag = 0;
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const docLoc = doc(db, "Users", uid);
    const docLocSnap = await getDoc(docLoc);
    // console.log(docLocSnap.data());
    handleValidation();
    // console.log(validation);
    if (flag === 0) {
      const docRef = await addDoc(collection(db, "Rooms"), {
        Sport: sport,
        time: time,
        MaxPlayers: maxPlayers,
        Members: Members,
        Location: [docLocSnap.data().latitude, docLocSnap.data().longitude],
      });

      // console.log(docRef.data());

      const user = doc(db, "Users", uid);
      var mid = {};
      const docSnap = await getDoc(user);
      const Sport = sport;
      mid = docSnap.data().TopSport;

      mid[Sport] = mid[Sport] + 1;
      await updateDoc(user, {
        Chatrooms: arrayUnion(docRef.id),
        total_matches: increment(1),
        TopSport: mid,
      });

      // console.log(docRef);
      navigate("/chatroom2", { state: { id: docRef.id } });
    }
  };

  return (
    <section>
      {!isMobile ? (
        <div className="row">
          <div className="col-2 col-nav">
            <Navbar2 />
          </div>
          <div className="col-10 ">
            <div className="card1" style={{ width: "50%", left: "60%" }}>
              <h1 className="card1-title" style={{ color: "gray" }}>
                Create A Match
              </h1>
              <div className="card-body">
                {/* <h2 style={{ paddingTop: "50px", color: "gray" }}>
                  Create A Match
                </h2> */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 mt-3">
                    <label
                      style={{ fontSize: "25px", color: "gray" }}
                      htmlFor="string"
                      className="form-label"
                    >
                      Sport
                    </label>
                    <br />
                    <select
                      className="select-form"
                      value={sport.value}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="">Choose Sport</option>
                      <option value="Cricket">Cricket</option>
                      <option value="Football">Football</option>
                      <option value="Hockey">Hockey</option>
                      <option value="Volleyball">Volleyball</option>
                      <option value="Basketball">Basketball</option>
                      <option value="Tennis">Tennis</option>
                      <option value="Kabaddi">Kabaddi</option>
                      <option value="TableTennis">TableTennis</option>
                      <option value="Badminton">Badminton</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label
                      style={{ fontSize: "25px", color: "gray" }}
                      htmlFor="time"
                      className="form-label"
                    >
                      Time
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="time"
                      style={{
                        borderTop: "0px solid",
                        borderLeft: "0px solid",
                        borderRight: "0px solid",
                      }}
                      placeholder="Enter the time you want to play"
                      name="time"
                      onChange={(e) => setTime(e.target.value)}
                    />
                    <div className="mb-3 mt-3">
                      <label
                        style={{ fontSize: "25px", color: "gray" }}
                        htmlFor="number"
                        className="form-label"
                      >
                        Max Players
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="name"
                        style={{
                          borderTop: "0px solid",
                          borderLeft: "0px solid",
                          borderRight: "0px solid",
                        }}
                        placeholder="Enter the max Number of players required"
                        name="name"
                        onChange={(e) => setMaxplayers(e.target.value)}
                      ></input>
                    </div>
                    <button type="submit" className="btn btn-dark btn-login">
                      Create
                    </button>
                    <p style={{ color: "red", fontSize: "2vw" }}>
                      {validation == 1 ? "Any field can't be empty" : ""}
                      {validation == 2
                        ? "MaxPlayer should be greater than 1"
                        : ""}
                      {validation == 3
                        ? "Selected Time of match has already passed"
                        : ""}
                      {validation == 4
                        ? "Max players can't be more than 50"
                        : ""}
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <section>
          <Navbar1></Navbar1>
          <div className="container-mobile-form">
            <div
              className="card1"
              style={{ width: "90%", left: "50%", top: "58%" }}
            >
              <h1 className="card1-title" style={{ color: "gray" }}>
                Create A Match
              </h1>
              <div className="card-body">
                {/* <h2 style={{ paddingTop: "50px", color: "gray" }}>
                  Create A Room
                </h2> */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 mt-3">
                    <label
                      style={{ fontSize: "25px", color: "gray" }}
                      htmlFor="email"
                      className="form-label"
                    >
                      Sport
                    </label>
                    <input
                      type="name"
                      className="form-control"
                      id="name"
                      style={{
                        borderTop: "0px solid",
                        borderLeft: "0px solid",
                        borderRight: "0px solid",
                      }}
                      placeholder="Enter the sport you want to play"
                      name="name"
                      onChange={(e) => setSport(e.target.value)}
                    ></input>
                  </div>
                  <div className="mb-3">
                    <label
                      style={{ fontSize: "25px", color: "gray" }}
                      htmlFor="pwd"
                      className="form-label"
                    >
                      Time
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="time"
                      style={{
                        borderTop: "0px solid",
                        borderLeft: "0px solid",
                        borderRight: "0px solid",
                      }}
                      placeholder="Enter the time you want to play"
                      name="time"
                      onChange={(e) => setTime(e.target.value)}
                    />
                    <div className="mb-3 mt-3">
                      <label
                        style={{ fontSize: "25px", color: "gray" }}
                        htmlFor="email"
                        className="form-label"
                      >
                        Max Players
                      </label>
                      <input
                        type="name"
                        className="form-control"
                        id="name"
                        style={{
                          borderTop: "0px solid",
                          borderLeft: "0px solid",
                          borderRight: "0px solid",
                        }}
                        placeholder="Enter the max Number of players required"
                        name="name"
                        onChange={(e) => setMaxplayers(e.target.value)}
                      ></input>
                    </div>
                    <button type="submit" className="btn btn-dark btn-login">
                      Create
                    </button>
                    <p style={{ color: "red", fontSize: "5vw" }}>
                      {validation == 1 ? "Any field can't be empty" : ""}
                      {validation == 2
                        ? "MaxPlayer should be greater than 1"
                        : ""}
                      {validation == 3
                        ? "Selected Time of match has already passed"
                        : ""}
                      {validation == 4
                        ? "Max players can't be more than 50"
                        : ""}
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </section>
  );
};

export default JoinARoom;
