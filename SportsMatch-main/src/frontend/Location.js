import { React, useEffect, useState, Component, setTimeOut } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import "bootstrap/dist/css/bootstrap.css";
import { collection, setDoc, doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { useAuthValue } from "../context.js";
import { auth, db } from "../backend/firebase";

const UpdateLocation = () => {
  const navigate = useNavigate();
  // const [currLocation, setCurrLocation] = useState("");
  const { currentUser } = useAuthValue();
  const [status, setStatus] = useState(null);
  const id = currentUser.uid;
  var currLocation = {};
  const updateLocation = async () => {
    // console.log("I'm here");
    await updateDoc(doc(db, "Users", id), {
      latitude: currLocation.latitude,
      longitude: currLocation.longitude,
    });
  };
  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position.coords);
        // const { latitude, longitude } = position.coords;
        // setCurrLocation({ latitude, longitude });
        currLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        if (currLocation.latitude !== undefined) updateLocation();
        // console.log("From inside: ", currLocation);
        navigate("/Home");
      });
    }
    // console.log(status);
  };

  useEffect(() => {
    getLocation();
  }, [currLocation]);
};
export default UpdateLocation;
