import { VscAccount } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { useEffect, useState } from "react";
import {
  doneOrCancel,
  repling,
  setLoading,
} from "../../Redux/Slice/CommentSlice";
import { commentService } from "../../Firebase/commentService";

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
    <div className="main-container">
      {/* comments */}
      <div className=" flex flex-col gap-1">
        <div className={`  flex gap-1 p-3 bg-slate-200  rounded-md`}>
          {/* profilePic */}
          <span>
            <VscAccount className="w-8 h-8"></VscAccount>
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
            className="font-bold cursor-pointer"
            onClick={() => {
              dispatch(repling({ userId, userName, commentId, repling: true }));
            }}
          >
            {"↰ Reply"}
          </span>
          {/* show reply */}
          <span
            className={``}
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
