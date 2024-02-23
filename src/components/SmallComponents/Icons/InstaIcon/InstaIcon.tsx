import instdark from "../../../../assets/InstagramIcon.svg";
import instLight from "../../../../assets/InstagramWhite.svg";
import DarkModeIconConverter from "../DarkModeIconConverter";

function InstaIcon() {
  return (
    <DarkModeIconConverter
      dark={instdark}
      light={instLight}
    ></DarkModeIconConverter>
  );
}

export default InstaIcon;
