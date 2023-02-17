import React from "react";
import "@pages/options/Options.scss";
import BackupForm from "./components/BackupForm";
import ProfileForm from "./components/ProfileForm";
import AutoFillForm from "./components/AutoFillForm";

const Options: React.FC = () => {
  return <div className="OptionsContainer">
    <h2>Extension Option</h2>
    <ProfileForm />
    <AutoFillForm />
    <BackupForm />
  </div>;
};

export default Options;
