import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { useEffect, useState } from "react";
import {
  doneOrCancel,
  repling,
  setLoading,
} from "../../Redux/Slice/CommentSlice";
import { commentService } from "../../Firebase/commentService";
import ProfilePic from "../SmallComponents/ProfilePic";

export interface IComment {
  userId: string;
  userName: string;
  profilePic: string;
  content: string;
  commentId: string;
}

export type TComment = IComment[];

function Comment({
  comment: { userId, userName, profilePic, content, commentId },
  refArray,
}: {
  comment: IComment;
  refArray: string[];
}) {
  const reply = useSelector((state: RootState) => state.CommentInfo);
  const authUser = useSelector((state: RootState) => state.UserInfos);

  const dispatch = useDispatch();

  const [commentItems, setCommentitems] = useState<TComment>([]);

  const [showReplies, setShowReplies] = useState(false);

  const [replyCallCount, setReplyCallCount] = useState(0);

  // Show All replies
  useEffect(() => {
    // Retrive replies from db
    if (showReplies) {
      if (replyCallCount == 0) {
        (async () => {
          console.log("yes");

          dispatch(setLoading({ loading: true }));
          const comentList = await commentService.getComments({
            refArray: [...refArray],
          });
          if (comentList) {
            setCommentitems([...comentList]);
          }
          dispatch(setLoading({ loading: false }));
        })();
        setReplyCallCount(replyCallCount + 1);
      }
    }
  }, [showReplies]);

  // Add new comment in local & db
  useEffect(() => {
    if (reply.replied && reply.commentId === commentId) {
      (async () => {
        try {
          // Add new comment db

          dispatch(setLoading({ loading: true }));
          const commentId = await commentService.createNewComment({
            userData: {
              userId: authUser.userData.userId,
              userName: authUser.userData.userName,
              profilePic: authUser.userData.profilePic,
            },
            content: reply.content,
            refArray,
          });
          // Add new comment in local
          if (commentId) {
            const newComment = {
              userId,
              userName,
              profilePic,
              commentId,
              content: reply.content,
            };
            setCommentitems((pre) => [...pre, newComment]);
            dispatch(doneOrCancel());
            dispatch(setLoading({ loading: false }));
            setShowReplies(true);
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [reply.replied]);

  return (
    <div className="main-container mt-2">
      {/* comments */}
      <div className=" flex flex-col gap-1">
        <div
          className={`  flex gap-2 p-5 items-center border-2 border-slate-200   rounded-lg`}
        >
          {/* profilePic */}
          <span className="size-7">
            <ProfilePic url={profilePic} w={"full"} h={"full"}></ProfilePic>
          </span>
          {/* userName */}
          <span className="font-bold">{userName}</span>
          {/* content */}
          <span className=" ml-4">{content}</span>
        </div>

        {/* Reply */}
        <div className=" flex gap-3">
          {/* Reply btn */}
          <span
            className="font-semibold cursor-pointer"
            onClick={() => {
              dispatch(repling({ userId, userName, commentId, repling: true }));
            }}
          >
            {"↰ Reply"}
          </span>
          {/* show reply */}
          <span
            className={`cursor-pointer ${
              showReplies && "text-red-500 hover:text-red-600"
            }`}
            onClick={() => {
              setShowReplies(!showReplies);
            }}
          >
            {!showReplies ? "view all replies" : "close"}
          </span>
        </div>

        <div
          className={`${showReplies ? "block" : "hidden"} flex flex-col pl-5`}
        >
          {commentItems.length > 0 ? (
            commentItems.map((com) => (
              <Comment
                key={com.commentId}
                comment={com}
                refArray={[...refArray, com.commentId, "comment"]}
              ></Comment>
            ))
          ) : (
            <div>{}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
