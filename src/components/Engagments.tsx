import LikeAct from "../assets/likeAct.png";
import { useEffect, useState } from "react";
import CommentIcon from "../assets/Comment.png";
import LikeIcon from "../assets/Like.png";
import SaveIcon from "../assets/Save.png";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Redux/store";
import { postService } from "../Firebase/postService";
import { IPost, addCurrentPost } from "../Redux/Slice/CurrentPostSlice";
import { Link } from "react-router-dom";

function Engagments({
  postInfo: {
    userId,
    userName,
    profilePic,
    postId,
    postUrl,
    likeCount,
    caption,
  },
}: {
  postInfo: IPost;
}) {
  const authUser = useSelector((state: RootState) => state.UserInfos.userData);
  const dispatch = useDispatch();

  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);
  const [isLikedBuAuthUser, setIsLikedBuAuthUser] = useState(false);

  // Check: Liked by user or not
  useEffect(() => {
    (async () => {
      const isLiked = await postService.isAuthUserLiked({
        postId,
        authUserId: authUser.userId,
      });
      if (isLiked) {
        setIsLikedBuAuthUser(true);
      }
    })();
  }, []);

  // Update Like-Count
  const handeUpdatingLikeCount = () => {
    // upate Like-Count in local
    if (isLikedBuAuthUser) {
      // Decrese LikeCount
      setCurrentLikeCount(currentLikeCount - 1);
    } else {
      // Increase LikeCount
      setCurrentLikeCount(currentLikeCount + 1);
    }

    // update Like-Count in db
    postService.updateLikeCount({
      postId,
      likeCount: currentLikeCount,
      likeStatus: !isLikedBuAuthUser,
    });

    // Add authUser to post->Likes-List
    postService.updateUsersInLikeList({
      userId: authUser.userId,
      userName: authUser.userName,
      profilePic: authUser.profilePic,
      postId,
      likeStatus: !isLikedBuAuthUser,
    });

    setIsLikedBuAuthUser(!isLikedBuAuthUser);
  };

  // ADD: current post
  const saveCurrentPost = () => {
    dispatch(
      addCurrentPost({
        postId,
        userId,
        userName,
        profilePic,
        postUrl,
        caption,
        likeCount: currentLikeCount,
      })
    );
  };

  return (
    <div className="flex flex-col gap-2 mt-1 pb-4 ml-2">
      {/* like comment save */}
      <ul className="flex  items-center gap-4 ">
        <li onClick={handeUpdatingLikeCount} className=" cursor-pointer">
          {isLikedBuAuthUser ? (
            <img src={LikeAct} alt="" />
          ) : (
            <img src={LikeIcon} alt="" />
          )}
        </li>
        <Link to="/comment">
          <li className=" cursor-pointer" onClick={saveCurrentPost}>
            <img src={CommentIcon} alt="" />
          </li>
        </Link>
        <li className=" cursor-pointer">
          <img src={SaveIcon} alt="" />
          {/* <VscBookmark></VscBookmark> */}
        </li>
      </ul>

      {/* Show Likes */}
      <Link to="/likes">
        <div onClick={saveCurrentPost}>{`${currentLikeCount} Likes`} </div>
      </Link>

      {/* caption */}
      <div className="flex  items-center gap-2 mt-2 mb-1">
        <div className=" font-bold">{userName}</div>
        <div>{caption}</div>
      </div>

      {/* comment */}
      <Link to="/comment">
        <span className="mt-2 cursor-pointer" onClick={saveCurrentPost}>
          {"view all replies"}
        </span>
      </Link>
    </div>
  );
}

export default Engagments;
