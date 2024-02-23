import instTypoDark from "../../../../assets/insta logo.png";
import instTypoLight from "../../../../assets/InstagramTypoWhite.svg";
import DarkModeIconConverter from "../DarkModeIconConverter";

function InstaTypoIcon() {
  return (
    <DarkModeIconConverter
      dark={instTypoDark}
      light={instTypoLight}
    ></DarkModeIconConverter>
  );
}

export default InstaTypoIcon;
