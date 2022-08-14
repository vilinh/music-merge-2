import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Protected({ token, children }) {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post("/verify-token", {
        token,
      })
      .catch(() => {
        console.log("Authentication Failed");
        navigate("/login");
      });
  }, []);

  return children;
}
