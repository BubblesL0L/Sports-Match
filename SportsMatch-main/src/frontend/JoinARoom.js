import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar1 from "./NavBar1";
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
import Navbar2 from "./NavBar2";
import { updateProfile } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useMediaQuery } from "react-responsive";
const JoinARoom = () => {
  const navigate = useNavigate();
  const [snap, setSnap] = useState([]);
  // const [uid, setId] = useState(null);
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });
  const [state, setState] = useState("Any");
  const [distance, setDistance] = useState(3000);
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  // const { currentUser } = useAuthValue();
  var uid;
  var idx = 0;
  if (loading) {
    console.log("Loading");
  } else {
    // setId(currentUser.uid);
    // console.log(user);
    if (user === null) {
      navigate("/");
    } else uid = user.uid;
    // console.log(currentUser);
  }
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
  const getMatches = async () => {
    const docRef = doc(db, "Users", uid);
    const docSnap = await getDoc(docRef);
    // console.log(docSnap.data());
    const userLongitude = docSnap.data().longitude;
    const userLatitude = docSnap.data().latitude;

    const querySnapshot = await getDocs(collection(db, "Rooms"));
    var liste = [];
    var flag = 0;
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data().Location);
      const MatchLocation = doc.data().Location;
      // console.log(doc.data());
      // console.log(MatchLocation);
      // console.log("Distance Filter: ", parseInt(distance));
      doc.data()["id"] = doc.id;
      var dis = getPreciseDistance(
        { latitude: userLatitude, longitude: userLongitude },
        { latitude: MatchLocation[0], longitude: MatchLocation[1] }
      );
      // console.log("Distance: ", dis);
      // console.log(doc.id);
      // console.log(doc.data().Members.includes(uid));
      var alreadyJoined = doc.data().Members.includes(uid);
      var MatchSize = doc.data().Members.length;
      // console.log("State: ", state, "Sport: ", doc.data().Sport);

      if (
        dis <= parseInt(distance) &&
        !alreadyJoined &&
        MatchSize != doc.data().MaxPlayers &&
        (state === "Any" || state === doc.data().Sport)
      ) {
        liste.push({ ...doc.data(), id: doc.id, dist: dis });
        flag = 1;
        setSnap(liste);
        // console.log("Liste: ", liste); // Put a flag to know the list is empty or not
      }
      // console.log("Flag:", flag);
    });
    if (flag === 0) {
      setSnap([]);
    }
    return querySnapshot;
  };

  const goToChatroom = async ({ s }) => {
    // console.log(id);

    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     // User is signed in, see docs for a list of available properties
    //     // https://firebase.google.com/docs/reference/js/firebase.User
    //     const uid1 = user.uid;
    //     setUid(uid1);
    //     console.log(uid);
    //   }
    // });
    // console.log(uid);

    // console.log(docSnap.data().TopSport);

    const user = doc(db, "Users", uid);
    const room = doc(db, "Rooms", s.id);
    var mid = {};
    const docSnap = await getDoc(user);
    const Sport = s.Sport;
    mid = docSnap.data().TopSport;
    //console.log("s:", s);
    mid[Sport] = mid[Sport] + 1;
    // console.log("Sport", Sport);
    await updateDoc(room, {
      Members: arrayUnion(uid),
    });
    await updateDoc(user, {
      Chatrooms: arrayUnion(s.id),
      total_matches: increment(1),
      TopSport: mid,
    });

    navigate("/chatroom2", { state: { id: s.id } });
  };
  const handleChange = (e) => {
    setState(e.target.value);
  };
  const changeDist = (e) => {
    setDistance(e.target.value);
    // console.log(distance);
  };
  useEffect(() => {
    if (uid !== null) getMatches();
  }, [state, distance, user]);
  // console.log(snap);
  return (
    <section>
      {user == null ? (
        "Login Pls"
      ) : (
        <section>
          {!isMobile ? (
            <div className="row">
              <div className="col-2 col-nav">
                <Navbar2 />
              </div>
              <div className="col-10 container2">
                <div className="row">
                  <div className="col-12">
                    <h1 style={{ textAlign: "center", fontFamily: "Monaco" }}>
                      Available Matches
                    </h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6" style={{ textAlign: "center" }}>
                    <form>
                      <label>
                        <select
                          className="select"
                          value={state.value}
                          onChange={(e) => handleChange(e)}
                        >
                          <option value="Any">Choose Sport</option>
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
                      </label>
                    </form>
                  </div>
                  <div className="col-6" style={{ textAlign: "center" }}>
                    <form>
                      <input
                        className="select"
                        type="number"
                        placeholder="Max Dist (Default:3000m) "
                        onChange={(e) => changeDist(e)}
                      ></input>
                    </form>
                  </div>
                </div>
                <br />
                <br />
                <br />
                {snap.map((s) => {
                  const { Sport, time, Members, MaxPlayers, id, dist } = s;
                  // console.log(time);
                  idx = idx + 1;
                  return (
                    <div
                      className="card-matches"
                      style={{ height: "16vh", top: "5%", overflow: "hidden" }}
                    >
                      <div className="row">
                        <div
                          className="col-2 logo-sport"
                          style={{ textAlign: "center" }}
                        >
                          <img src={logo[Sport]}></img>
                        </div>
                        <div
                          className="col-1"
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
                        <div className="col-2"></div>
                        <div
                          className="col-2"
                          style={{ textAlign: "center", fontSize: "1.5vw" }}
                        >
                          <div className="row" style={{ fontSize: "1.1vw" }}>
                            Players
                          </div>
                          <div className="row" style={{ color: "gray" }}>
                            {Members.length}/{MaxPlayers}
                          </div>
                        </div>
                        {/* <div className="col-1"></div> */}
                        <div
                          className="col-1"
                          style={{ textAlign: "center", fontSize: "1.5vw" }}
                        >
                          <div className="row" style={{ fontSize: "1vw" }}>
                            Distance
                          </div>
                          <div className="row" style={{ color: "gray" }}>
                            {dist}m
                          </div>
                        </div>
                        <div className="col-1"></div>
                        <div
                          className="col-3"
                          style={{ textAlign: "center", fontSize: "1.5vw" }}
                        >
                          <button
                            type="button"
                            className="btn-h btn btn-success"
                            style={{ textAlign: "center", height: "7vh" }}
                            onClick={() => goToChatroom({ s })}
                          >
                            <p style={{ fontSize: "2vw" }}>Join</p>
                          </button>
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
                  <div className="col-12" style={{ textAlign: "center" }}>
                    Available Matches
                  </div>
                </div>
                <div className="row">
                  <div className="col-6" style={{ textAlign: "center" }}>
                    <form>
                      <label>
                        <select
                          className="select"
                          value={state.value}
                          onChange={(e) => handleChange(e)}
                        >
                          <option value="Any">
                            <p>Choose Sport</p>
                          </option>
                          <option value="Cricket">Cricket</option>
                          <option value="Football">Football</option>
                          <option value="Hockey">Hockey</option>
                          <option value="VolleyBall">VolleyBall</option>
                          <option value="Basketball">Basketball</option>
                          <option value="Tennis">Tennis</option>
                          <option value="Kabaddi">Kabaddi</option>
                          <option value="TableTennis">TableTennis</option>
                        </select>
                      </label>
                    </form>
                  </div>
                  <div className="col-6" style={{ textAlign: "center" }}>
                    <form>
                      <input
                        className="select"
                        type="number"
                        placeholder="Max Dist (Default:3000m) "
                        onChange={(e) => changeDist(e)}
                      ></input>
                    </form>
                  </div>
                </div>
                {/* <br />
                <br /> */}
                <div
                  className="container-matches"
                  style={{ position: "relative", top: "12vh" }}
                >
                  {snap.map((s) => {
                    const { Sport, time, Members, MaxPlayers, id, dist } = s;
                    // console.log(time);
                    idx = idx + 1;
                    return (
                      <div className="card-matches">
                        <button
                          style={{ backgroundColor: "white", border: "none" }}
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
                                style={{
                                  textAlign: "center",
                                  fontSize: "3.5vw",
                                }}
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
                                <button
                                  type="button"
                                  className="btn-h btn btn-success"
                                  style={{
                                    textAlign: "center",
                                    fontSize: "3.5vw",
                                  }}
                                  onClick={() => goToChatroom({ s })}
                                >
                                  <p style={{ fontSize: "3.5vw" }}>Join</p>
                                </button>
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
                                <p
                                  style={{ fontSize: "4vw", textAlign: "left" }}
                                >
                                  {" "}
                                  {dist} m away
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
        </section>
      )}
    </section>
  );
};

export default JoinARoom;
