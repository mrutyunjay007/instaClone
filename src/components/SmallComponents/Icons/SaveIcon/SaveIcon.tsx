import SaveLight from "../../../../assets/SaveWhite.svg";
import SaveDark from "../../../../assets/Save.svg";
import DarkModeIconConverter from "../DarkModeIconConverter";

function SaveIcon() {
  return (
    <DarkModeIconConverter
      dark={SaveDark}
      light={SaveLight}
    ></DarkModeIconConverter>
  );
}

export default SaveIcon;
