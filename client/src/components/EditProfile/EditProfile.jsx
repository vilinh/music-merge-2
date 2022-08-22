import React, { useState } from "react";
import { useEffect } from "react";
import "./editProfile.css";
import { updateEmail } from "../../utils/user";

export const EditProfile = () => {
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState(null);

  useEffect(() => {
    console.log(birthday);
  }, [birthday]);

  const changeEmail = async () => {
    await updateEmail().then(() => console.log("ftonendresponse"));
  }

  const updateEmail = async () => {};
  return (
    <div className="edit-profile">
      <h3>Edit Profile</h3>
      <div className="pic">
        <img src="https://i.scdn.co/image/ab6775700000ee850e227e40152a057cad6fdf16" />
        <h4>name</h4>
      </div>
      <div className="form">
        <form action="" className="edit">
          <h4>email</h4>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h4>birthday</h4>
          <input type="date" onChange={(e) => setBirthday(e.target.value)} />
          <button
            className="save"
            onClick={(e) => {
              changeEmail(email);
              e.preventDefault();
              setEmail("");
            }}
          >
            save changes
          </button>
        </form>
      </div>
    </div>
  );
};
