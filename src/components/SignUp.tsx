// import React from 'react'

import { useEffect, useState } from "react";
import { authService } from "../Firebase/authService";
import instaIcon from "../assets/InstagramIcon.svg";
import UserIdName from "./UserIdName";

function SignUp({ changeLog }: { changeLog: () => void }) {
  const [signUp, setSignUp] = useState(false);
  const [isUserIdName, setIsUserIdName] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");

  //SignIn
  useEffect(() => {
    if (signUp) {
      (async () => {
        await authService.googleSignUp();
        const user = await authService.getCurrentUser();

        if (user?.userIdName.length === 0) {
          setIsUserIdName(true);
          setCurrentUserId(user.userId);
        } else {
          changeLog();
        }
      })();
    }
  }, [signUp]);

  if (isUserIdName) {
    return <UserIdName changeLog={changeLog} currentUserId={currentUserId} />;
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className=" flex flex-col justify-center items-center h-1/2 w-1/2 md:w-1/2 lg:w-1/2 md:border-2 border-slate-100 md:drop-shadow-lg rounded-lg ">
        <span
          className=" cursor-pointer"
          onClick={() => {
            setSignUp(true);
          }}
        >
          {" "}
          <img src={instaIcon} alt="" />
        </span>
        <span
          className=" cursor-pointer"
          onClick={() => {
            setSignUp(true);
          }}
        >
          {" "}
          SignIn
        </span>
      </div>
    </div>
  );
}

export default SignUp;
