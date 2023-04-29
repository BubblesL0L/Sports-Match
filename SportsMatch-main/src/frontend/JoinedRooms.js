import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar1 from "./NavBar1";
import { db } from "../backend/firebase";
import { auth } from "../backend/firebase";
import { useAuthValue } from "../context.js";
import { onAuthStateChanged } from "firebase/auth";
import { FaCrown } from "react-icons/fa";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  arrayRemove,
  increment,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import Navbar2 from "./NavBar2";
import Footer from "./Footer";
import { useMediaQuery } from "react-responsive";
const JoinedRooms = () => {
  const navigate = useNavigate();
  // const { currentUser } = useAuthValue();
  const [listOfRooms, setListOfRooms] = useState([]);
  const [update, setUpdate] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [up, setU] = useState(1);
  const [user, loading] = useAuthState(auth);
  const [rinfo, setRinfo] = useState([]);
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });
  var idx = 0;
  const logo = {
    Cricket: "CricketLogo.jpeg",
    Football: "FootballLogo.jpg",
    Hockey: "HockeyLogo.jpg",
    Kabaddi: "KabbadiLogo.png",
    Volleyball: "VolleyBallLogo.jpg",
    Tennis: "TennisLogo.jpg",
    Badminton: "BadmintonLogo.jpg",
    Basketball: "BasketballLogo.jpg",
    TableTennis: "TableTennisLogo.jpg",
  };
  // console.log(currentUser);
  // const uid = currentUser.uid;
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

  var hue = [];
  const roomInfo = async ({ id, info }) => {
    const room = doc(db, "Rooms", id);
    const docSnap = await getDoc(room);
    // console.log(info.includes({ ...docSnap.data(), id: id }));
    info.push({ ...docSnap.data(), id: id });
    if (rinfo.length != info.length) setRinfo(info);
  };
  const getListOfRooms = async () => {
    const docRef = doc(db, "Users", uid);
    const docSnap = await getDoc(docRef);
    var info = [];
    var flag = 0;
    {
      docSnap.data().Chatrooms.map((c) => {
        // console.log("c:", { id: c, info: info });
        // const room = doc(db, "Rooms", c.s.id);
        // const docSnap = await getDoc(room);
        roomInfo({ id: c, info: info });
        flag = 1;
      });
      if (flag == 0) setRinfo([]);
      setU(up + 1);
      // console.log("Info:", rinfo);
    }

    // if (adminSnap.data().Members[0] === uid) {
    //   setIsAdmin(true);
    // }
    // if (docSnap.exists()) {
    //   // console.log("Document data:", docSnap.data());
    //   setListOfRooms(docSnap.data().Chatrooms);
    //   // console.log(docSnap.data().Chatrooms);
    // } else {
    //   // doc.data() will be undefined in this case
    //   // console.log("No such document!");
    // }
  };

  // const getRoomInfo = async ({ id }) => {
  //   const docRef = doc(db, "Rooms", id);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //     info.push(docSnap.data());
  //     console.log("info:", info);
  //   } else {
  //     // doc.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
  // };

  // const getRoomInfoHelper = () => {
  //   listOfRooms.map((s) => {
  //     const { id } = s;
  //     getRoomInfo(id);
  //   });
  // };
  const goToChatroom = async ({ id }) => {
    const user = doc(db, "Users", uid);

    // await updateDoc(user, {
    //   Chatrooms: arrayUnion({ s }),
    // });
    navigate("/chatroom2", { state: { id: id } });
  };
  const LeaveChatroom = async ({ s }) => {
    const docRef = doc(db, "Users", uid);
    // console.log(s.s);
    // console.log(uid);
    var mid = {};
    const docSnap = await getDoc(docRef);
    const Sport = s.Sport;
    mid = docSnap.data().TopSport;

    mid[Sport] = mid[Sport] - 1;

    await updateDoc(docRef, {
      Chatrooms: arrayRemove(s.id),
      total_matches: increment(-1),
      TopSport: mid,
    });

    const room = doc(db, "Rooms", s.id);
    // console.log(uid);
    await updateDoc(room, {
      Members: arrayRemove(uid),
    });
    setU(0);
    setUpdate(!update);
  };
  useEffect(() => {
    if (uid !== null && up <= 7) getListOfRooms();
  }, [update, user, rinfo]);
  return (
    <section>
      {!isMobile ? (
        <div className="row">
          <div className="col-2 col-nav">
            <Navbar2 state="3" />
          </div>
          <div className="col-10 container2">
            {/* <div className="container2"> */}
            <div className="row">
              <div className="col-12" style={{ textAlign: "center" }}>
                <h1
                  style={{
                    fontSize: "2.5vw",
                    fontFamily: "Monaco",
                    color: "gray",
                  }}
                >
                  Joined Matches
                </h1>
              </div>
            </div>
            {/* {console.log("Hue hue: ", rinfo)} */}
            {rinfo.map((s) => {
              // {
              //   console.log("Length:", rinfo.length);
              // }
              const { MaxPlayers, time, Sport, Members, id } = s;
              // console.log("MaxPlayers", MaxPlayers);
              // {
              //   console.log({ s: s });
              // }
              // const s1 = "Cricket";
              // console.log(typeof Sport);
              // console.log("Logo:", logo[Sport]);
              idx += 1;
              return (
                <div className="card-matches" style={{ height: "15vh" }}>
                  <div className="row">
                    {/* <div
                      className="col-1"
                      style={{ textAlign: "center", fontSize: "1.5vw" }}
                    >
                      {idx}.
                    </div> */}
                    <div
                      className="col-2 logo-sport"
                      style={{ textAlign: "center" }}
                    >
                      <img src={logo[Sport]}></img>
                    </div>
                    <div
                      className="col-2"
                      style={{ textAlign: "center", fontSize: "1.5vw" }}
                    >
                      <div className="row">{Sport}</div>
                      <div
                        className="row"
                        style={{ fontSize: "1.1vw", color: "gray" }}
                      >
                        Time:{time}
                      </div>
                    </div>
                    <div
                      className="col-2"
                      style={{ textAlign: "center", fontSize: "1.5vw" }}
                    >
                      <div className="row" style={{ fontSize: "0.9vw" }}>
                        Players:
                      </div>
                      <div className="row" style={{ color: "gray" }}>
                        {Members.length}/{MaxPlayers}
                      </div>
                    </div>
                    <div
                      className="col-2"
                      style={{ textAlign: "center", fontSize: "1vw" }}
                    >
                      {Members[0] === uid ? (
                        <section>
                          <div className="row" style={{ fontSize: "0.9vw" }}>
                            ID:
                          </div>
                          <div className="row" style={{ color: "gray" }}>
                            {id}
                          </div>
                        </section>
                      ) : (
                        ""
                      )}
                    </div>
                    {/* <div className="col-1"></div> */}
                    <div
                      className="col-2"
                      style={{ textAlign: "center", fontSize: "1.5vw" }}
                    >
                      <button
                        type="button"
                        className="btn-h btn btn-success"
                        style={{ textAlign: "center" }}
                        onClick={() => goToChatroom({ id })}
                      >
                        Join
                      </button>
                    </div>
                    <div className="col-2" style={{ textAlign: "center" }}>
                      {/* {console.log("Admin:", Members[0], uid)} */}
                      {Members[0] === uid ? (
                        <FaCrown size={"2.5vw"} />
                      ) : (
                        <button
                          type="button"
                          className="btn-h btn btn-danger"
                          style={{ textAlign: "center" }}
                          onClick={() => LeaveChatroom({ s })}
                        >
                          Leave
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <section>
          <Navbar1></Navbar1>
          <div className="container-mobile">
            <div className="row">
              <div
                className="col-12"
                style={{
                  textAlign: "center",
                  fontFamily: "Monaco",
                  color: "gray",
                }}
              >
                Joined Matches
              </div>
            </div>

            {/* {console.log(listOfRooms)} */}
            <div
              className="container-matches"
              style={{ position: "relative", top: "11vh" }}
            >
              {rinfo.map((s) => {
                const { MaxPlayers, time, Sport, Members, id } = s;
                {
                  // console.log(s.s);
                }
                const s1 = "Cricket";
                // console.log(typeof Sport);
                // console.log("Logo:", logo[Sport]);
                idx += 1;
                return (
                  <div className="card-matches">
                    <button
                      style={{
                        backgroundColor: "white",
                        border: "none",
                      }}
                      onClick={() => goToChatroom({ id })}
                    >
                      <div className="card-matches-body">
                        <div className="row">
                          {/* <div
                      className="col-1"
                      style={{ textAlign: "center", fontSize: "2.5vw" }}
                    >
                      {idx}.
                    </div> */}
                          <div
                            className="col-3 logo-sport"
                            style={{ textAlign: "center" }}
                          >
                            <img src={logo[Sport]}></img>
                          </div>
                          <div
                            className="col-1"
                            style={{ textAlign: "center", fontSize: "3.5vw" }}
                          >
                            <div className="row">{Sport}</div>

                            <div className="row" style={{ color: "gray" }}>
                              {time}
                            </div>
                          </div>
                          <div className="col-2"></div>
                          <div
                            className="col-1"
                            style={{
                              textAlign: "center",
                              fontSize: "3.5vw",
                            }}
                          >
                            <div className="row">Players:</div>
                            <div className="row" style={{ color: "gray" }}>
                              {/* {console.log("ID:", id)} */}
                              {Members.length}/{MaxPlayers}
                            </div>
                          </div>
                          {/* <div
                          className="col-3"
                          style={{ textAlign: "center", fontSize: "1.5vw" }}
                        >
                          <button
                            type="button"
                            className="btn-h btn btn-success"
                            style={{ textAlign: "center" }}
                            onClick={() => goToChatroom({ id })}
                          >
                            <p style={{ fontSize: "3.5vw" }}>Join</p>
                          </button>
                        </div> */}
                          <div className="col-1"></div>
                          <div
                            className="col-4"
                            style={{ textAlign: "center" }}
                          >
                            {/* {console.log("Admin:", Members[0], uid)} */}
                            {Members[0] === uid ? (
                              <FaCrown size={"8vw"} />
                            ) : (
                              <button
                                type="button"
                                className="btn-h btn btn-danger"
                                style={{
                                  textAlign: "center",
                                  fontSize: "3.5vw",
                                }}
                                onClick={() => LeaveChatroom({ s })}
                              >
                                <p style={{ fontSize: "3.5vw" }}>Leave</p>
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div
                            className="col-12 footer-card"
                            style={{
                              backgroundColor: "pink",
                              height: "3.2vh",
                              width: "100vw",
                            }}
                          >
                            <p style={{ fontSize: "4vw", textAlign: "left" }}>
                              {Members[0] === uid ? (
                                <section>
                                  <div
                                    className="row"
                                    style={{
                                      color: "black",
                                      fontFamily: "Calibri",
                                    }}
                                  >
                                    ID:{id}
                                  </div>
                                </section>
                              ) : (
                                ""
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* </div> */}
    </section>
  );
};

export default JoinedRooms;
