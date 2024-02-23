import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Redux/store";
import { postService } from "../Firebase/postService";
import { IPost, addCurrentPost } from "../Redux/Slice/CurrentPostSlice";
import { Link } from "react-router-dom";

import SaveActIcon from "./SmallComponents/Icons/SaveIcon/SaveActIcon";
import SaveIcon from "./SmallComponents/Icons/SaveIcon/SaveIcon";
import LikeActIcon from "./SmallComponents/Icons/LikeIcon/LikeActIcon";
import LikeIcon from "./SmallComponents/Icons/LikeIcon/LikeIcon";
import CommentIcon from "./SmallComponents/Icons/CommentIcon/CommentIcon";

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
  const [isLikedByAuthUser, setIsLikedByAuthUser] = useState(false);
  const [isSavedByAuthUser, setIsSavedByAuthUser] = useState(false);

  // Check: Liked by user or not
  useEffect(() => {
    (async () => {
      try {
        const isLiked = await postService.isAuthUserLiked({
          postId,
          authUserId: authUser.userId,
        });
        if (isLiked) {
          setIsLikedByAuthUser(true);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // Check: Saved by user or not
  useEffect(() => {
    (async () => {
      try {
        const isSaved = await postService.isPostSaved({
          postId,
          userId: authUser.userId,
        });
        if (isSaved) {
          setIsSavedByAuthUser(true);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // Update Like-Count
  const handeUpdatingLikeCount = () => {
    // upate Like-Count in local
    if (isLikedByAuthUser) {
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
      likeStatus: !isLikedByAuthUser,
    });

    // Add authUser to post->Likes-List and user->save
    postService.updateUsersInLikeList({
      userId: authUser.userId,
      userName: authUser.userName,
      profilePic: authUser.profilePic,
      postId,
      likeStatus: !isLikedByAuthUser,
    });

    setIsLikedByAuthUser(!isLikedByAuthUser);
  };

  //  Update Saving status
  const handelSave = () => {
    try {
      const postData = {
        postId,
        postUrl,
      };

      postService.updateSaveStatusforCurrentUser({
        postData,
        authUserId: authUser.userId,
        isSaved: !isSavedByAuthUser,
      });

      setIsSavedByAuthUser(!isSavedByAuthUser);
    } catch (error) {
      console.log(error);
    }
  };

  // ADD: current post
  const handelCurrentPost = () => {
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
          {isLikedByAuthUser ? (
            <LikeActIcon></LikeActIcon>
          ) : (
            <LikeIcon></LikeIcon>
          )}
        </li>
        <Link to="/comment">
          <li className=" cursor-pointer" onClick={handelCurrentPost}>
            <CommentIcon></CommentIcon>
          </li>
        </Link>
        <li className=" cursor-pointer" onClick={handelSave}>
          {isSavedByAuthUser ? (
            <SaveActIcon></SaveActIcon>
          ) : (
            <SaveIcon></SaveIcon>
          )}
        </li>
      </ul>

      {/* Show Likes */}
      <Link to="/likes">
        <div className="dark:text-color" onClick={handelCurrentPost}>
          {`${currentLikeCount} Likes`}{" "}
        </div>
      </Link>

      {/* caption */}
      <div className="flex  items-center gap-2 mt-2 mb-1">
        <div className=" dark:text-color font-bold">{userName}</div>
        <div className="dark:text-color">{caption}</div>
      </div>

      {/* comment */}
      <Link to="/comment">
        <span
          className="mt-2 cursor-pointer dark:text-color"
          onClick={handelCurrentPost}
        >
          {"view all comments"}
        </span>
      </Link>
    </div>
  );
}

export default Engagments;
