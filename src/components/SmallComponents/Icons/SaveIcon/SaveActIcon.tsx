import SaveActLight from "../../../../assets/SavedWhite.svg";
import SaveActDark from "../../../../assets/saved.svg";
import DarkModeIconConverter from "../DarkModeIconConverter";

function SaveActIcon() {
  return (
    <DarkModeIconConverter
      dark={SaveActDark}
      light={SaveActLight}
    ></DarkModeIconConverter>
  );
}

export default SaveActIcon;
