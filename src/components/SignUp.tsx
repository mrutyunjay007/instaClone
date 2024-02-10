// import React from 'react'

import { useEffect, useState } from "react";
import { authService } from "../Firebase/authService";
import instaIcon from "../assets/InstagramIcon.svg";

function SignUp({ changeLog }: { changeLog: () => void }) {
  const [signUp, setSignUp] = useState(false);

  //SignIn
  useEffect(() => {
    if (signUp) {
      (async () => {
        await authService.googleSignUp();
        changeLog();
      })();
    }
  }, [signUp]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className=" flex flex-col justify-center items-center h-1/2 w-1/2 md:w-1/2 lg:w-1/2 border-2 border-s-slate-100 drop-shadow-lg rounded-lg ">
        <span className=" cursor-pointer">
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
