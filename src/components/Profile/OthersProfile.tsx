// import React from "react";

import User from "../User";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

function OthersProfile() {
  const userData = useSelector((state: RootState) => state.OthersInfo.userData);

  return <User userData={userData} userProfile={false}></User>;
}

export default OthersProfile;
