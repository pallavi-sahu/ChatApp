import React from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from "./Login";
// import { Rocket } from "@mui/icons-material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function App() {
  const [{user}, dispatch] = useStateValue(null);

  return (
    <div className="app">
      {!user? (
        <Login/>
      ) : (
        <div className="app_body">
        <Router>
          <Routes>
          <Route path="/" element={<Sidebar />} />
            <Route path="/rooms/:roomId" 
            element={<><Sidebar /> <Chat /></>}/>
          </Routes>
        </Router>
      </div>
      )}
    </div>
  );
}

export default App;
