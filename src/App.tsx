// import { useState } from 'react'

import { RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { router } from "./Routes/Routes";
import { useEffect, useState } from "react";
import { authService } from "./Firebase/authService";
import { logIn, logOut } from "./Redux/Slice/UserSlice";
import SignUp from "./components/SignUp";
// import UserIdName from "./components/UserIdName";

function App() {
  const dispatch = useDispatch();
  const [isLogged, setLog] = useState(false);

  useEffect(() => {
    isLogged &&
      (async () => {
        try {
          const userData = await authService.getCurrentUser();

          if (userData) {
            dispatch(logIn({ ...userData }));
          } else {
            dispatch(logOut());
          }
        } catch (error) {
          console.log(error);
        }
      })();
  }, [isLogged]);

  return (
    // <UserIdName></UserIdName>
    <div className=" w-full h-screen dark:bg-background">
      {!isLogged ? (
        <SignUp
          changeLog={() => {
            setLog(true);
          }}
        ></SignUp>
      ) : (
        <RouterProvider router={router} />
      )}
    </div>
  );
}

export default App;
