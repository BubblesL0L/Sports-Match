import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar1 from "./NavBar1";
import Navbar2 from "./NavBar2";
import { db } from "../backend/firebase";
import { auth } from "../backend/firebase";
import { useAuthValue } from "../context.js";
import { onAuthStateChanged } from "firebase/auth";
import { getDistance, getPreciseDistance } from "geolib";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  increment,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useMediaQuery } from "react-responsive";
const Code = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [roomFull, setRoomFull] = useState(0);
  const [joined, setJoined] = useState(0);
  const [unvalidId, setUnvalidId] = useState(0);
  const [user, loading] = useAuthState(auth);
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });
  const handleSubmit = async (event) => {
    event.preventDefault();
    var mid = {};
    const user1 = doc(db, "Users", user.uid);
    const room = doc(db, "Rooms", roomId);
    const docSnap = await getDoc(room); // Getting room info
    const docSnapUser = await getDoc(user1); // Getting user info
    // console.log(docSnap.data());
    if (docSnap.data() === undefined) {
      setUnvalidId(1);
    } else {
      const Sport = docSnap.data().Sport;
      var s = docSnap.data();
      // console.log("s: ", s);
      mid = docSnapUser.data().TopSport;
      // console.log("Sport:", mid);
      // console.log(docSnap.data().Members.includes(user.uid));
      mid[Sport] = mid[Sport] + 1;
      if (docSnap.data().Members.length >= docSnap.data().MaxPlayers) {
        console.log("Room Full");
        setRoomFull(1);
      } else if (docSnap.data().Members.includes(user.uid)) {
        console.log("Already Joined");
        setJoined(1);
      } else {
        await updateDoc(room, {
          Members: arrayUnion(user.uid),
        });
        await updateDoc(user1, {
          Chatrooms: arrayUnion(roomId),
          total_matches: increment(1),
          TopSport: mid,
        });
        navigate("/chatroom2", { state: { id: roomId } });
      }
    }
  };
  return (
    <section>
      {loading ? (
        "Loading"
      ) : (
        <section>
          {!isMobile ? (
            <div className="row">
              <div className="col-2 col-nav">
                <Navbar2 />
              </div>
              <div className="col-10 ">
                <div
                  className="card1"
                  style={{
                    width: "40%",
                    left: "60%",
                  }}
                >
                  <h1 className="card1-title" style={{ color: "gray" }}>
                    Join A Match
                  </h1>
                  <div className="card-body">
                    {/* <h2 style={{ paddingTop: "50px", color: "gray" }}>
                      Join A Room:
                    </h2> */}
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3 mt-3">
                        <label
                          style={{ fontSize: "25px", color: "gray" }}
                          class="form-label"
                        >
                          RoomID:
                        </label>
                        <input
                          type="string"
                          className="form-control"
                          id="id"
                          style={{
                            borderTop: "0px solid",
                            borderLeft: "0px solid",
                            borderRight: "0px solid",
                          }}
                          placeholder="Enter the room ID"
                          name="RoomId"
                          onChange={(e) => setRoomId(e.target.value)}
                        ></input>
                      </div>
                      <button type="submit" className="btn btn-dark btn-login">
                        Join
                      </button>
                      <p style={{ color: "red", fontSize: "20px" }}>
                        {!roomFull
                          ? ""
                          : "Room Full....Please try another code"}
                        {!joined
                          ? ""
                          : "You are already present in this match "}
                        {!unvalidId ? "" : "Invalid Match Id"}
                      </p>
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
                  style={{ width: "90%", left: "50%", top: "52%" }}
                >
                  <h1 className="card1-title" style={{ color: "gray" }}>
                    Join A Match
                  </h1>
                  <div className="card-body">
                    {/* <h2 style={{ paddingTop: "50px", color: "gray" }}>
                      Join A Room:
                    </h2> */}
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3 mt-3">
                        <label
                          style={{ fontSize: "25px", color: "gray" }}
                          class="form-label"
                        >
                          RoomID:
                        </label>
                        <input
                          type="string"
                          className="form-control"
                          id="id"
                          style={{
                            borderTop: "0px solid",
                            borderLeft: "0px solid",
                            borderRight: "0px solid",
                          }}
                          placeholder="Enter the room ID"
                          name="RoomId"
                          onChange={(e) => setRoomId(e.target.value)}
                        ></input>
                      </div>
                      <button type="submit" className="btn btn-dark btn-login">
                        Join
                      </button>
                      <p style={{ color: "red", fontSize: "20px" }}>
                        {!roomFull
                          ? ""
                          : "Room Full....Please try another code"}
                        {!joined
                          ? ""
                          : "You are already present in this match "}
                        {!unvalidId ? "" : "Invalid Match Id"}
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          )}
        </section>
      )}
    </section>
  );
};

export default Code;
