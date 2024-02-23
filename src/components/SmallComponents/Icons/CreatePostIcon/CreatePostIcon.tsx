import createDark from "../../../../assets/CreateIcon.png";
import createLight from "../../../../assets/createWhite.png";
import DarkModeIconConverter from "../DarkModeIconConverter";

function CreatePostIcon() {
  return (
    <DarkModeIconConverter
      dark={createDark}
      light={createLight}
    ></DarkModeIconConverter>
  );
}

export default CreatePostIcon;
