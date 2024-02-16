import { VscAccount } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { useEffect, useState } from "react";

export interface IComment {
  userId: string;
  userName: string;
  profilePic: string;
  content: string;
  //   item: IComment[];
}

export type TComment = IComment[];

function Comment({
  comment: { userId, userName, profilePic, content },
  refArray,
}: {
  comment: IComment;
  refArray: string[];
}) {
  const authUser = useSelector((state: RootState) => state.UserInfos.userData);

  const [commentItems, setCommentitems] = useState<TComment>([]);

  const [showReplies, setShowReplies] = useState(false);

  const [newComment, setNewComment] = useState<IComment>();

  useEffect(() => {
    // TODO:
    if (showReplies) {
      //retrive replies from db
    }
  }, [showReplies]);

  // TODO: add new comment in local & db
  useEffect(() => {
    if (newComment) {
      setCommentitems((pre) => [...pre, newComment]);
      // setNewComment(null)
    }
  }, [newComment]);

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
        <span className={`${showReplies ? "block" : "hidden"}`}>
          {" "}
          "↰ Reply"
        </span>
      </div>

      {/* Reply */}
      <div>
        <span className={`${showReplies ? "hidden" : "block"}`}>
          {"view all replies"}
        </span>
        <div
          className={`${showReplies ? "block" : "hidden"} flex flex-col pl-5`}
        >
          {commentItems?.map((com) => (
            <Comment
              comment={com}
              refArray={[...refArray, "comment", com.userId]}
            ></Comment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Comment;
