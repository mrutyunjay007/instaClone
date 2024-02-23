import createActDark from "../../../../assets/createAct.png";
import createActLight from "../../../../assets/createActWhite.png";
import DarkModeIconConverter from "../DarkModeIconConverter";

function CreatePostActIcon() {
  return (
    <DarkModeIconConverter
      dark={createActDark}
      light={createActLight}
    ></DarkModeIconConverter>
  );
}

export default CreatePostActIcon;
