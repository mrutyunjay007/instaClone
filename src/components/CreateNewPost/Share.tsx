import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { useState } from "react";
import { postService } from "../../Firebase/postService";
import imageCompression from "browser-image-compression";
import {
  newPostUpLoadingDone,
  setUploadedPost,
} from "../../Redux/Slice/CreatePostSlice";
import { Link, useNavigate } from "react-router-dom";

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

      //conver image size in kB
      const imageSize = Math.round(postMetaData.size / 1024);

      // more than 1.5Mb not allow
      if (imageSize > 1536) {
        console.log("more than 1.5MB is not allow");
        return;
      }

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      // file comression
      const compressedFile = await imageCompression(postMetaData, options);

      const postData = await postService.createNewPost({
        postMetaData: compressedFile,
        userName: authUser.userData.userName,
        userId: authUser.userData.userId,
        profilePic: authUser.userData.profilePic,
        caption,
      });
      if (postData) {
        dispatch(setUploadedPost({ ...postData }));
        setLoading(false);
        navigate("/");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      {/* nav */}
      <div className="w-full md:pl-[80px] lg:pl-[250px] sticky h-[9vh] flex justify-between p-3 items-center border-b-2 border-s-slate-100">
        {/* <span>
          <img src={BackIcon} alt="" />
        </span> */}
        <span className=" dark:text-color font-bold text-2xl cursor-pointer ">
          Create New Post
        </span>
        <div className="flex gap-3 py-2 items-center justify-center ">
          <span
            className="  rounded-md bg-[#0095f6] text-white font-semibold px-3 py-2  cursor-pointer"
            onClick={() => {
              handelShare();
            }}
          >
            Share
          </span>
          <Link to="/upLoadPost">
            <span
              className="  rounded-md  bg-red-500 text-white font-semibold px-3 py-2 cursor-pointer "
              onClick={() => {
                dispatch(newPostUpLoadingDone());
              }}
            >
              Cancel
            </span>
          </Link>
        </div>
      </div>

      {/* post */}
      <div className="flex justify-center ">
        <div className=" w-full flex flex-col md:w-1/2 lg:w-1/4 h-[91vh] items-center justify-start gap-2  ">
          <span className="w-full flex-1 bg-slate-500 mt-3 ">
            <img className="" src={postUrl} alt="" />
          </span>
          <span className="mt-2 w-full h-1/4 font-semibold  border-s-slate-100 border-2 p-1 rounded-lg  ">
            <textarea
              onChange={(e) => {
                setCaption(e.target.value);
              }}
              value={caption}
              className="w-full h-full rounded-lg p-2"
              placeholder="write caption..."
            ></textarea>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Share;
