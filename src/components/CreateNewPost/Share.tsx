import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { useState } from "react";
import { postService } from "../../Firebase/postService";

import {
  newPostUpLoadingContinue,
  setUploadedPost,
} from "../../Redux/Slice/CreatePostSlice";
import { useNavigate } from "react-router-dom";
import { upadateNumberOfPost } from "../../Redux/Slice/UserSlice";
import ImageFileCompretion from "../../utility/ImageFileCompretion";
import BackBtn from "../SmallComponents/BackBtn";
import Image from "../SmallComponents/Image";

function Share() {
  const { postUrl, postMetaData } = useSelector(
    (state: RootState) => state.CreatePostInfo.selectedPost
  );

  const authUser = useSelector((state: RootState) => state.UserInfos);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");

  const handelShare = async () => {
    setLoading(true);
    if (postMetaData != null) {
      // image compression
      const compressedFile = (await ImageFileCompretion(postMetaData)) as File;

      const postData = await postService.createNewPost({
        postMetaData: compressedFile,
        userName: authUser.userData.userName,
        userId: authUser.userData.userId,
        profilePic: authUser.userData.profilePic,
        caption,
        currentNumberOfPost: authUser.userData.postNumber,
      });
      if (postData && postData.postUrl !== undefined) {
        dispatch(setUploadedPost({ ...postData }));
        dispatch(upadateNumberOfPost());
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* nav */}
      <div className="w-full   sticky h-[5.1rem] flex justify-between p-3 items-center border-b-2 border-s-slate-100">
        <div className="flex gap-3 justify-start items-center">
          <BackBtn></BackBtn>
          <span className=" dark:text-color font-bold text-2xl cursor-pointer ">
            Create New Post
          </span>
        </div>
        <div className="flex gap-3 py-2 items-center justify-center ">
          <span
            className="  rounded-md bg-[#0095f6] text-white font-semibold px-3 py-2  cursor-pointer"
            onClick={() => {
              dispatch(newPostUpLoadingContinue(true));
              handelShare();
              navigate("/");
            }}
          >
            Share
          </span>
        </div>
      </div>

      {/* post */}
      <div className="w-full h-[calc(100vh-5.1rem)]  px-5 flex justify-center items-center ">
        <div className=" w-full h-[calc(100vh-5.1rem)] p-5 md:p-0  md:h-[368px]   md:border-2 flex flex-col md:flex-row justify-center items-center ">
          <span className="w-full h-1/2 md:h-full  ">
            <Image url={postUrl} rounded={false} />
          </span>
          <span className="w-full  h-full  font-semibold">
            <textarea
              onChange={(e) => {
                setCaption(e.target.value);
              }}
              value={caption}
              className="w-full h-full  p-2 focus:outline-none resize-none"
              placeholder="write caption..."
            ></textarea>
          </span>
        </div>
      </div>
    </>
  );
}

export default Share;
