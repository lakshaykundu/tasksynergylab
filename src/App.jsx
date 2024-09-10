import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";
import { UserProvider } from "./contexts/UserContext";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/details/:id" element={<UserDetail />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
