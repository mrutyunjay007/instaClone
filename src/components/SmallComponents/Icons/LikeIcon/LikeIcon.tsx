import DarkModeIconConverter from "../DarkModeIconConverter";
import likeDarkIcon from "../../../../assets/Like.svg";
import likeLightIcon from "../../../../assets/LikeWhite.svg";

function LikeIcon() {
  return (
    <DarkModeIconConverter
      dark={likeDarkIcon}
      light={likeLightIcon}
    ></DarkModeIconConverter>
  );
}

export default LikeIcon;
