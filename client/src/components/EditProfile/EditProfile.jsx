import React, { useState } from "react";
import { useEffect } from "react";
import { changeEmail } from "../../utils/user";
import "./editProfile.css";

export const EditProfile = ({ username, email }) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  useEffect(() => {}, []);

  const handleSave = async (e) => {
    await changeEmail(emailInput).then(() => setEmailInput(""))
  };

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
          <h4>password</h4>
          <input
            type="password"
            placeholder="old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="new password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />

          <button
            className="save"
            onClick={(e) => {
              handleSave(e);
            }}
          >
            save changes
          </button>
        </form>
      </div>
    </div>
  );
};
