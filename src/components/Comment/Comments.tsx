import { useEffect, useState } from "react";
import Comment, { TComment } from "./Comment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { replied } from "../../Redux/Slice/CommentSlice";
import { commentService } from "../../Firebase/commentService";

function Comments() {
  const authUser = useSelector((state: RootState) => state.UserInfos.userData);
  const postId = useSelector(
    (state: RootState) => state.CurrentPostInfo.postId
  );
  const [commentItems, setCommentitems] = useState<TComment>([]);

  const [content, setContent] = useState("");

  const { userName, repling } = useSelector(
    (state: RootState) => state.CommentInfo
  );

  const dispatch = useDispatch();
  useEffect(() => {
    // TODO: Retrive replies from db
  }, []);

  useEffect(() => {
    if (repling) {
      setContent(`@${userName}`);
    }
  }, [repling]);

  return (
    <div className=" w-full flex justify-center items-center">
      <div className=" flex flex-col items-center justify-center w-full md:w-1/2 md:p-72px lg:w-1/4">
        {/* add new comment */}

        <div className=" sticky top-0 flex w-full gap-1 px-2 ">
          <input
            className=" p-1 flex-1  border-s-slate-100"
            placeholder="write your comment..."
            value={content}
            onChange={(e) => {
              e.preventDefault();
              setContent(e.target.value);
            }}
          ></input>
          <button
            className=" bg-blue-500 w-10 h-8 text-white font-bold"
            onClick={async () => {
              if (content.length > 0) {
                if (repling) {
                  // Add new comment in local
                  dispatch(
                    replied({
                      authUserId: authUser.userId,
                      content,
                      replied: true,
                    })
                  );
                } else {
                  // TODO: add new comment in db
                  const commentId = await commentService.createNewComment({
                    userData: {
                      userId: authUser.userId,
                      userName: authUser.userName,
                      profilePic: authUser.profilePic,
                    },
                    content,
                    refArray: [postId, "comment"],
                  });
                  console.log(commentId);

                  // Add new comment in local
                  if (commentId) {
                    const newComment = {
                      userId: authUser.userId,
                      userName: authUser.userName,
                      profilePic: authUser.profilePic,
                      content,
                      commentId,
                    };
                    setCommentitems((pre) => [...pre, newComment]);
                    setContent("");
                  }
                }
              }
            }}
          >
            {">"}
          </button>
        </div>

        {/* Reply */}
        <div className=" w-full p-2">
          <div className={` flex flex-col`}>
            {commentItems.length != 0 &&
              commentItems.map((com) => (
                <Comment
                  key={com.userId}
                  comment={com}
                  refArray={[postId, "comment", com.commentId]}
                ></Comment>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comments;
