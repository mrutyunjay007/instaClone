import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux/store";
import { lightDarkMode } from "../../Redux/Slice/DarkMOdeSlice";
import { FiSun } from "react-icons/fi";
import { FiMoon } from "react-icons/fi";
import { DarkLigth } from "../../Redux/Slice/NavSlice";

function ToggleBtn() {
  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useSelector((state: RootState) => state.DarkModeEnable.theme);
  const dark = useSelector((state: RootState) => state.Navigation.DarkMode);
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    document.querySelector("html")?.classList.remove("dark", "light");
    document.querySelector("html")?.classList.add(theme);
  }, [theme]);

  return (
    <div
      className=" md:flex gap-2 justify-center items-center cursor-pointer"
      onClick={() => {
        inputRef.current?.click();
      }}
    >
      <input
        ref={inputRef}
        className="w-8 h-8 hidden"
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          dispatch(lightDarkMode({ isChecked: !isChecked }));
          setIsChecked(!isChecked);
          dispatch(DarkLigth(!isChecked));
        }}
      />

      {/* {!isChecked ? ( */}
      <div
        className={`${!dark ? "block" : "hidden"} ${
          dark && "animate-ping"
        } duration-500`}
      >
        <FiSun className="w-6 h-6"></FiSun>
      </div>
      {/* ) : ( */}
      <div className={`${dark ? "block" : "hidden"}`}>
        <FiMoon
          className="w-6 h-6  text-slate-100 "
          // style={{ color: "white" }}
        ></FiMoon>
      </div>
      {/* )} */}
      {/* </div> */}
      <span className={`text-lg lg:block  hidden dark:text-white`}>{`${
        dark ? "Dark Mode" : "Light Mode"
      }`}</span>
    </div>
  );
}

export default ToggleBtn;
