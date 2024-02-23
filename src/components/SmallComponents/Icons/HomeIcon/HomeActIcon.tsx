import homeActDark from "../../../../assets/HomeActIcon.png";
import homeActLight from "../../../../assets/HomeWhiteAct.svg";
import DarkModeIconConverter from "../DarkModeIconConverter";

function HomeActIcon() {
  return (
    <DarkModeIconConverter
      dark={homeActDark}
      light={homeActLight}
    ></DarkModeIconConverter>
  );
}

export default HomeActIcon;
