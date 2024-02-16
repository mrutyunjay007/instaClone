import { useEffect, useState } from "react";
import Comment, { IComment, TComment } from "./Comment";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

function Comments() {
  const authUser = useSelector((state: RootState) => state.UserInfos.userData);
  const postId = useSelector(
    (state: RootState) => state.CurrentPostInfo.postId
  );
  const [commentItems, setCommentitems] = useState<TComment>([]);

  // const [showReplies, setShowReplies] = useState(false);
  const [newComment, setNewComment] = useState<IComment>();

  useEffect(() => {
    // TODO:
    //retrive replies from db
  }, []);

  // TODO: add new comment in local & db
  useEffect(() => {
    if (newComment) {
      setCommentitems((pre) => [...pre, newComment]);
      // setNewComment(null)
    }
  }, [newComment]);
  return (
    <div className=" w-full flex justify-center items-center">
      <div className="  w-full md:w-1/2 md:p-72px lg:w-1/4">
        {/* add new comment */}
        <div className=" md:sticky flex w-full gap-1 p-2 bottom-0">
          <input
            className=" p-1 flex-1  border-s-slate-100"
            placeholder="write your comment..."
          ></input>
          <button className=" bg-blue-500 w-10 h-8 text-white font-bold">
            {">"}
          </button>
          {/* Reply */}
          <div>
            <div className={` flex flex-col pl-5`}>
              {commentItems?.map((com) => (
                <Comment
                  comment={com}
                  refArray={[postId, "comment", com.userId]}
                ></Comment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comments;
