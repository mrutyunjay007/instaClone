import { useEffect, useState, useRef } from "react";
import Comment, { TComment } from "./Comment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import {
  doneOrCancel,
  replied,
  setLoading,
} from "../../Redux/Slice/CommentSlice";
import { commentService } from "../../Firebase/commentService";
import BackBtn from "../SmallComponents/BackBtn";
import { FiSend } from "react-icons/fi";
import Spiner from "../SmallComponents/loaders/Spiner";

function Comments() {
  const authUser = useSelector((state: RootState) => state.UserInfos.userData);
  const postId = useSelector(
    (state: RootState) => state.CurrentPostInfo.postId
  );
  const [commentItems, setCommentitems] = useState<TComment>([]);

  const [content, setContent] = useState("");

  const { loading, userName, repling } = useSelector(
    (state: RootState) => state.CommentInfo
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Retrive replies from db
  useEffect(() => {
    (async () => {
      dispatch(setLoading({ loading: true }));
      const comentList = await commentService.getComments({
        refArray: [postId, "comment"],
      });
      if (comentList) {
        setCommentitems([...comentList]);
      }
      dispatch(setLoading({ loading: false }));
    })();
  }, []);

  // Add comment to Local & DB
  const handelNewComment = async () => {
    try {
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
          //Add new comment in db
          dispatch(setLoading({ loading: true }));
          const commentId = await commentService.createNewComment({
            userData: {
              userId: authUser.userId,
              userName: authUser.userName,
              profilePic: authUser.profilePic,
            },
            content,
            refArray: [postId, "comment"],
          });

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
            dispatch(setLoading({ loading: false }));
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full sticky top-0 bg-white">
        {/* TopBar */}

        <div className="w-full  h-[5.1rem] flex justify-between p-3 items-center border-b-2 border-s-slate-100">
          <div className="flex gap-3 justify-start items-center">
            <BackBtn></BackBtn>
            <span className=" dark:text-color font-bold text-2xl cursor-pointer ">
              Comment
            </span>
          </div>
        </div>

        {/* add new comment */}
        <div className="  flex  items-center justify-center px-5 py-3 w-full md ">
          <div className=" relative flex  justify-center rounded-xl  items-center w-full md:w-[686px] h-full p-5  border-2 border-s-slate-300 ">
            {repling && (
              <div className=" absolute top-[-0.5rem] left-4  w-48 h-8 py-2 px-2 bg-white rounded-lg border-2 border-slate-300 text-xs flex justify-between items-center">
                <span className="font-normal">{`@ ${userName}`}</span>
                <span
                  className="cursor-pointer text-red-400 hover:text-red-600 font-semibold text-base"
                  onClick={() => {
                    dispatch(doneOrCancel());
                  }}
                >
                  X
                </span>
              </div>
            )}
            {/* Input Field */}
            <input
              ref={inputRef}
              className=" flex-1 p-2 focus:outline-none"
              placeholder="Add a comment..."
              value={content}
              onChange={(e) => {
                e.preventDefault();
                setContent(e.target.value);
              }}
            ></input>

            {/* send btn */}
            <span
              className=" "
              onClick={() => {
                handelNewComment();
                setContent("");
              }}
            >
              {!loading ? (
                <FiSend className="size-8 text-slate-400 hover:text-slate-600 cursor-pointer" />
              ) : (
                <Spiner w={8} h={8}></Spiner>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* all commen render */}
      <div className=" w-full flex px-5 md:px-0 justify-center items-center">
        <div className=" flex flex-col items-center justify-center w-full md:w-[668px] ">
          {/* Reply */}
          <div className=" w-full p-2">
            <div className={` flex flex-col`}>
              {commentItems.length != 0 &&
                commentItems.map((com) => (
                  <Comment
                    key={com.commentId}
                    comment={com}
                    refArray={[postId, "comment", com.commentId, "comment"]}
                  ></Comment>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comments;
