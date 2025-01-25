import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "./components/Sidebar";  // Import Sidebar component
import StudentsPage from "./components/StudentsPage";  // Import StudentsPage component
import LoginPage from "./components/LoginPage";  // Import LoginPage (for login)
import { auth } from "./firebaseConfig";  // Firebase authentication import
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const App = () => {
  // State to track if user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in (Firebase auth state)
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <Router>
      <div style={{ display: "flex" }}>
        {/* Sidebar on the left */}
        <Sidebar />

        <div style={{ marginLeft: "260px", padding: "20px", width: "100%" }}>
          <Switch>
            {/* Routes for different pages */}
            <Route path="/students">
              {/* Only show StudentsPage if the user is logged in */}
              {isLoggedIn ? <StudentsPage /> : <Redirect to="/" />}
            </Route>
            <Route path="/logout">
              {/* Implement logout logic */}
              {() => {
                auth.signOut();  // Firebase sign-out
                return <Redirect to="/" />;
              }}
            </Route>
            <Route path="/" exact>
              {/* Show Login Page if user is not logged in */}
              {!isLoggedIn ? <LoginPage /> : <Redirect to="/students" />}
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
