import { VscAccount } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { useEffect, useState } from "react";
import { doneOrCancel, repling } from "../../Redux/Slice/CommentSlice";
import { commentService } from "../../Firebase/commentService";

export interface IComment {
  userId: string;
  userName: string;
  profilePic: string;
  content: string;
  commentId: string;
  //   item: IComment[];
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

  const [commentItems, setCommentitems] = useState<TComment>([]);

  const [showReplies, setShowReplies] = useState(false);
  // const [isReplied, setReplied] = useState(reply.replied);

  const dispatch = useDispatch();

  useEffect(() => {
    // TODO: Retrive replies from db
    if (showReplies) {
    }
  }, [showReplies]);

  // Add new comment in local & db
  useEffect(() => {
    console.log(reply.replied);
    (async () => {
      try {
        if (reply.replied && reply.commentid == commentId) {
          // Add new comment db
          const commentId = await commentService.createNewComment({
            userData: {
              userId: authUser.userData.userId,
              userName: authUser.userData.userName,
              profilePic: authUser.userData.profilePic,
            },
            content,
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
          }
        }
      } catch (error) {}
    })();
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
            className={`${showReplies ? "hidden" : "block"}`}
            onClick={() => {
              setShowReplies(true);
            }}
          >
            {"view all replies"}
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
                refArray={[...refArray, "comment"]}
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
