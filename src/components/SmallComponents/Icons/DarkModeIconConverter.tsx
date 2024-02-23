// import React from 'react'
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";

function DarkModeIconConverter({
  dark,
  light,
}: {
  dark: string;
  light: string;
}) {
  const theme = useSelector((state: RootState) => state.DarkModeEnable.theme);

  return (
    <>{theme === "light" ? <img src={dark}></img> : <img src={light}></img>}</>
  );
}

export default DarkModeIconConverter;
