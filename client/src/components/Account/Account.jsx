import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getUserName } from "../../utils/user";
import { EditProfile } from "../EditProfile/EditProfile";
import { MyAccount } from "../MyAccount/MyAccount";
import "./account.css";

export const Account = () => {
  const [activeView, setActiveView] = useState("account");
  const [name, setName] = useState("");

  useEffect(() => {
    const getName = async () => {
      await getUserName().then((res) => setName(res));
    };
    getName();
  }, []);

  return (
    <div className="account-page">
      <div className="account-sidebar">
        <span className="subheading">USER SETTINGS</span>
        <span
          className={`link ` + (activeView === "account" ? "active" : "")}
          onClick={() => setActiveView("account")}
        >
          my account
        </span>
        <span
          className={`link ` + (activeView === "edit" ? "active" : "")}
          onClick={() => setActiveView("edit")}
        >
          profile
        </span>
        <span className="link">change password</span>
        <span
          className={`link ` + (activeView === "connections" ? "active" : "")}
          onClick={() => setActiveView("connections")}
        >
          connections
        </span>
        <span className="subheading">APP SETTINGS</span>
        <span className="link">appearance</span>
      </div>
      <div className="account-main">
        {activeView === "account" ? (
          <MyAccount username={name} setActiveView={setActiveView} />
        ) : (
          <></>
        )}
        {activeView === "edit" ? <EditProfile username={name} /> : <></>}
      </div>
    </div>
  );
};
