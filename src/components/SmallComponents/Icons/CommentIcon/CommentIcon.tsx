import commentDark from "../../../../assets/Comment.svg";
import commnetLight from "../../../../assets/CommentWhite.svg";
import DarkModeIconConverter from "../DarkModeIconConverter";

function CommentIcon() {
  return (
    <DarkModeIconConverter
      dark={commentDark}
      light={commnetLight}
    ></DarkModeIconConverter>
  );
}

export default CommentIcon;
