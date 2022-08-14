import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Protected from "./components/Protected";
import useToken from "./utils/useToken";
import Login from "./components/Login/Login";
import "./index.css";
import { Dashboard } from "./components/Dashboard/Dashboard";
import Register from "./components/Register/Register";

function App() {
  const { token, setToken, clearToken } = useToken();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={<Login setToken={setToken} clearToken={clearToken} />}
          />
          <Route
            path="/register"
            element={<Register/>}
          />
          <Route
            path="/"
            element={
              <Protected token={token}>
                <Dashboard />
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
