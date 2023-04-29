import React from "react";
import { useState, useEffect } from "react";
import Login from "./frontend/Router.js";
import Router from "./frontend/Router.js";
import { AuthProvider } from "./context.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./backend/firebase";
function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user != null) {
        setCurrentUser(user);
      } else {
        setCurrentUser((prev_user) => {
          return prev_user;
        });
      }
    });
    const user = auth.currentUser;
    setCurrentUser(user);
  }, []);

  return (
    <AuthProvider value={{ currentUser }}>
      <Router />
    </AuthProvider>
  );
}

export default App;
