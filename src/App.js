import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import UserList from "./components/UserList";
function App() {
  return (
    <div>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/user">Users</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user" element={<UserList />} />
      </Routes>
    </div>
  );
}

export default App;
