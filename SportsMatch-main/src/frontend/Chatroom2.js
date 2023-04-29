import { Link, useLocation, useNavigate } from "react-router-dom";
import { db } from "../backend/firebase";
import { auth } from "../backend/firebase";
import Navbar1 from "./NavBar1";
import { React, useEffect, useState } from "react";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { MessageInput } from "./MessageInput";
import { useAuthValue } from "../context.js";
import { MessageList } from "./MessageList";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import Navbar2 from "./NavBar2";
import { useMediaQuery } from "react-responsive";
const Chatroom2 = () => {
  const Location = useLocation();
  const navigate = useNavigate();
  // console.log(Location.state);
  // const { currentUser } = useAuthValue();
  // console.log(currentUser.uid);
  const [snap1, setSnap1] = useState("");
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });
  const [currentuser, loading] = useAuthState(auth);

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
  // const { currentUser } = useAuthValue();
  var uid;
  if (loading) {
    console.log("Loading");
  } else {
    // setId(currentUser.uid);
    // console.log(currentuser);
    if (currentuser === null) {
      navigate("/");
    } else uid = currentuser.uid;
    // console.log(currentUser);
  }

  const getChatRoomDetails = async () => {
    const snap = await getDoc(doc(db, "Rooms", Location.state.id));

    if (snap.exists()) {
      // console.log(snap.data());
      if (snap1 === "") {
        setSnap1(snap.data());
      }
    } else {
      console.log("No such document");
    }
    return snap.data();
  };
  useEffect(() => {
    if (currentuser !== null) getChatRoomDetails();
  }, [currentuser, snap1]);
  return (
    <section>
      {!isMobile ? (
        <div className="row">
          <div className="col-2 col-nav">
            <Navbar2 />
          </div>
          <div className="col-10 container2">
            {/* <h1 style={{ textAlign: "center" }}>{snap1.Sport}</h1> */}
            {/* <h2>{Location.state.id}</h2>
        <h3>{snap1.time}</h3>
        <h3>{snap1.MaxPlayers}</h3> */}
            {currentuser == null ? (
              "Loading"
            ) : (
              <div className="container-chatbox">
                <div className="msg-header">
                  <div className="container-match">
                    <img src={logo[snap1.Sport]} className="msgimg"></img>
                    <div className="active">
                      <h1>{snap1.Sport}</h1>
                    </div>
                  </div>
                </div>
                <div className="chat-page">
                  <div className="msg-inbox">
                    <div className="chats">
                      {/* <div className="received-chats"> */}
                      {/* <div className="received-chats-img">
                        <img src="user2.png" />
                      </div>
                      <div class="received-msg">
                        <div class="received-msg-inbox"> */}
                      {/* <p>
                            Hi !! This is message from Riya . Lorem ipsum, dolor
                            sit amet consectetur adipisicing elit. Non quas nemo
                            eum, earum sunt, nobis similique quisquam eveniet
                            pariatur commodi modi voluptatibus iusto omnis harum
                            illum iste distinctio expedita illo!
                          </p> */}
                      {/* <MessageList
                            roomId={Location.state.id}
                            user={currentuser}
                          ></MessageList>
                          <span class="time">18:06 PM | July 24 </span>
                        </div>
                      </div> */}
                      <div className="msg-page">
                        <MessageList
                          roomId={Location.state.id}
                          user={currentuser}
                        ></MessageList>
                      </div>
                    </div>
                    <div className="msg-bottom">
                      <MessageInput
                        roomId={Location.state.id}
                        user={currentuser}
                      ></MessageInput>
                    </div>
                  </div>
                </div>
              </div>
              // <div className="message-container">
              //   {console.log(
              //     "RoomId: ",
              //     Location.state.id,
              //     "user: ",
              //     currentuser
              //   )}

              //   <MessageList
              //     roomId={Location.state.id}
              //     user={currentuser}
              //   ></MessageList>
              //   <MessageInput
              //     roomId={Location.state.id}
              //     user={currentuser}
              //   ></MessageInput>
              // </div>
            )}
          </div>
        </div>
      ) : (
        <article>
          <Navbar1></Navbar1>
          <div className="container-mobile">
            <div className="msg-header">
              <div className="container-match">
                <img src="bat_ball.jpg" className="msgimg"></img>
                <div className="active">
                  <h1>{snap1.Sport}</h1>
                </div>
              </div>
            </div>
            <div className="chat-page">
              <div className="msg-inbox">
                <div className="chats">
                  {/* <div className="received-chats"> */}
                  {/* <div className="received-chats-img">
                        <img src="user2.png" />
                      </div>
                      <div class="received-msg">
                        <div class="received-msg-inbox"> */}
                  {/* <p>
                            Hi !! This is message from Riya . Lorem ipsum, dolor
                            sit amet consectetur adipisicing elit. Non quas nemo
                            eum, earum sunt, nobis similique quisquam eveniet
                            pariatur commodi modi voluptatibus iusto omnis harum
                            illum iste distinctio expedita illo!
                          </p> */}
                  {/* <MessageList
                            roomId={Location.state.id}
                            user={currentuser}
                          ></MessageList>
                          <span class="time">18:06 PM | July 24 </span>
                        </div>
                      </div> */}
                  <div className="msg-page">
                    <MessageList
                      roomId={Location.state.id}
                      user={currentuser}
                    ></MessageList>
                  </div>
                </div>
                <div className="msg-bottom">
                  <MessageInput
                    roomId={Location.state.id}
                    user={currentuser}
                  ></MessageInput>
                </div>
              </div>
            </div>
          </div>
        </article>
      )}
    </section>
  );
};

// import React from "react";
// import {
//   MDBContainer,
//   MDBRow,
//   MDBCol,
//   MDBCard,
//   MDBCardHeader,
//   MDBCardBody,
//   MDBCardFooter,
//   MDBIcon,
//   MDBBtn,
// } from "mdb-react-ui-kit";

// const Chatroom2 = () => {
//   return (
//     <MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }}>
//       <MDBRow className="d-flex justify-content-center">
//         <MDBCol md="1000" lg="1500" xl="1000">
//           <MDBCard id="chat2" style={{ borderRadius: "15px" }}>
//             <MDBCardHeader className="d-flex justify-content-between align-items-center p-3">
//               <h5 className="mb-0">Chat</h5>
//               <MDBBtn color="primary" size="sm" rippleColor="dark">
//                 Let's Chat App
//               </MDBBtn>
//             </MDBCardHeader>
//             {/* <MDBScrollbar
//               suppressScrollX
//               style={{ position: "relative", height: "400px" }}
//             > */}
//             <MDBCardBody>
//               <div className="d-flex flex-row justify-content-start">
//                 <img
//                   src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
//                   alt="avatar 1"
//                   style={{ width: "45px", height: "100%" }}
//                 />
//                 <div>
//                   <p
//                     className="small p-2 ms-3 mb-1 rounded-3"
//                     style={{ backgroundColor: "#f5f6f7" }}
//                   >
//                     Hi
//                   </p>
//                   <p
//                     className="small p-2 ms-3 mb-1 rounded-3"
//                     style={{ backgroundColor: "#f5f6f7" }}
//                   >
//                     How are you ...???
//                   </p>
//                   <p
//                     className="small p-2 ms-3 mb-1 rounded-3"
//                     style={{ backgroundColor: "#f5f6f7" }}
//                   >
//                     What are you doing tomorrow? Can we come up a bar?
//                   </p>
//                   <p className="small ms-3 mb-3 rounded-3 text-muted">23:58</p>
//                 </div>
//               </div>

//               <div className="divider d-flex align-items-center mb-4">
//                 <p
//                   className="text-center mx-3 mb-0"
//                   style={{ color: "#a2aab7" }}
//                 >
//                   Today
//                 </p>
//               </div>

//               <div className="d-flex flex-row justify-content-end mb-4 pt-1">
//                 <div>
//                   <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
//                     Hiii, I'm good.
//                   </p>
//                   <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
//                     How are you doing?
//                   </p>
//                   <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
//                     Long time no see! Tomorrow office. will be free on sunday.
//                   </p>
//                   <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
//                     00:06
//                   </p>
//                 </div>
//                 <img
//                   src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
//                   alt="avatar 1"
//                   style={{ width: "45px", height: "100%" }}
//                 />
//               </div>

//               <div className="d-flex flex-row justify-content-start mb-4">
//                 <img
//                   src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
//                   alt="avatar 1"
//                   style={{ width: "45px", height: "100%" }}
//                 />
//                 <div>
//                   <p
//                     className="small p-2 ms-3 mb-1 rounded-3"
//                     style={{ backgroundColor: "#f5f6f7" }}
//                   >
//                     Okay
//                   </p>
//                   <p
//                     className="small p-2 ms-3 mb-1 rounded-3"
//                     style={{ backgroundColor: "#f5f6f7" }}
//                   >
//                     We will go on Sunday?
//                   </p>
//                   <p className="small ms-3 mb-3 rounded-3 text-muted">00:07</p>
//                 </div>
//               </div>

//               <div className="d-flex flex-row justify-content-end mb-4">
//                 <div>
//                   <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
//                     That's awesome!
//                   </p>
//                   <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
//                     I will meet you Sandon Square sharp at 10 AM
//                   </p>
//                   <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
//                     Is that okay?
//                   </p>
//                   <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
//                     00:09
//                   </p>
//                 </div>
//                 <img
//                   src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
//                   alt="avatar 1"
//                   style={{ width: "45px", height: "100%" }}
//                 />
//               </div>

//               <div className="d-flex flex-row justify-content-start mb-4">
//                 <img
//                   src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
//                   alt="avatar 1"
//                   style={{ width: "45px", height: "100%" }}
//                 />
//                 <div>
//                   <p
//                     className="small p-2 ms-3 mb-1 rounded-3"
//                     style={{ backgroundColor: "#f5f6f7" }}
//                   >
//                     Okay i will meet you on Sandon Square
//                   </p>
//                   <p className="small ms-3 mb-3 rounded-3 text-muted">00:11</p>
//                 </div>
//               </div>

//               <div className="d-flex flex-row justify-content-end mb-4">
//                 <div>
//                   <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
//                     Do you have pictures of Matley Marriage?
//                   </p>
//                   <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
//                     00:11
//                   </p>
//                 </div>
//                 <img
//                   src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
//                   alt="avatar 1"
//                   style={{ width: "45px", height: "100%" }}
//                 />
//               </div>

//               <div className="d-flex flex-row justify-content-start mb-4">
//                 <img
//                   src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
//                   alt="avatar 1"
//                   style={{ width: "45px", height: "100%" }}
//                 />
//                 <div>
//                   <p
//                     className="small p-2 ms-3 mb-1 rounded-3"
//                     style={{ backgroundColor: "#f5f6f7" }}
//                   >
//                     Sorry I don't have. i changed my phone.
//                   </p>
//                   <p className="small ms-3 mb-3 rounded-3 text-muted">00:13</p>
//                 </div>
//               </div>

//               <div className="d-flex flex-row justify-content-end">
//                 <div>
//                   <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
//                     Okay then see you on sunday!!
//                   </p>
//                   <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
//                     00:15
//                   </p>
//                 </div>
//                 <img
//                   src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
//                   alt="avatar 1"
//                   style={{ width: "45px", height: "100%" }}
//                 />
//               </div>
//             </MDBCardBody>
//             {/* </MDBScrollbar> */}
//             <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
//               <img
//                 src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
//                 alt="avatar 3"
//                 style={{ width: "45px", height: "100%" }}
//               />
//               <input
//                 type="text"
//                 class="form-control form-control-lg"
//                 id="exampleFormControlInput1"
//                 placeholder="Type message"
//               ></input>
//               <a className="ms-1 text-muted" href="#!">
//                 <MDBIcon fas icon="paperclip" />
//               </a>
//               <a className="ms-3 text-muted" href="#!">
//                 <MDBIcon fas icon="smile" />
//               </a>
//               <a className="ms-3" href="#!">
//                 <MDBIcon fas icon="paper-plane" />
//               </a>
//             </MDBCardFooter>
//           </MDBCard>
//         </MDBCol>
//       </MDBRow>
//     </MDBContainer>
//   );
// };

export default Chatroom2;
