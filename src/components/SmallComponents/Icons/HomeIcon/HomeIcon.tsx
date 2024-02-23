import homeDark from "../../../../assets/HomeIcon.png";
import homeLight from "../../../../assets/HomeWhite.svg";
import DarkModeIconConverter from "../DarkModeIconConverter";

function HomeIcon() {
  return (
    <DarkModeIconConverter
      dark={homeDark}
      light={homeLight}
    ></DarkModeIconConverter>
  );
}

export default HomeIcon;
