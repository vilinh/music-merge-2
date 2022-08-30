import React, { useState } from "react";
import { useEffect } from "react";
import "./editProfile.css";

export const EditProfile = ({ username, email }) => {
  const [emailInput, setEmailInput] = useState("");

  useEffect(() => {}, []);

  const changeEmail = async () => {
    await updateEmail(emailInput).then(() => console.log("ftonendresponse"));
  };

  const updateEmail = async () => {};
  return (
    <div className="edit-profile">
      <h3>Edit Profile</h3>
      <div className="pic">
        <img src="https://i.scdn.co/image/ab6775700000ee850e227e40152a057cad6fdf16" />
        <h4>{username}</h4>
      </div>
      <div className="form">
        <form action="" className="edit">
          <h4>email</h4>
          <input
            type="email"
            value={emailInput}
            placeholder={email}
            onChange={(e) => setEmailInput(e.target.value)}
          />

          <button
            className="save"
            onClick={(e) => {
              changeEmail(emailInput);
              e.preventDefault();
              setEmailInput("");
            }}
          >
            save changes
          </button>
        </form>
      </div>
    </div>
  );
};
