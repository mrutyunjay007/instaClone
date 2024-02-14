// import React from 'react'

// import { useEffect } from "react";
import User from "../User";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

function UserProfile() {
  const userData = useSelector((state: RootState) => state.UserInfos.userData);
  return <User userData={userData} userProfile={true}></User>;
}

export default UserProfile;
