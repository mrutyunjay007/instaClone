import EditBio from "./EditBio";
import EditUserName from "./EditUserName";
import ProfilePic from "../SmallComponents/ProfilePic";
import { useRef, useState } from "react";
import ImageFileCompretion from "../../utility/ImageFileCompretion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { authService } from "../../Firebase/authService";
import { UpdateProfilePicUlr } from "../../Redux/Slice/UserSlice";
import Spiner from "../SmallComponents/loaders/Spiner";
import BackBtn from "../SmallComponents/BackBtn";

function EditProfile() {
  const { userName, userId, profilePic } = useSelector(
    (state: RootState) => state.UserInfos.userData
  );
  const dispatch = useDispatch();
  const [Load, setLoad] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {/* TopBar */}
      <div className="  dark:bg-background sticky top-0 flex  gap-2 justify-start items-center w-full h-[9vh] bg-white border-b-2 border-s-slate-100 md:border-none">
        <BackBtn></BackBtn>

        <span className=" dark:text-color font-bold text-2xl ml-2  md:font-normal">
          Edit
        </span>
      </div>

      {/* Body */}
      <div className="w-full h-[calc(100vh-18vh)] p-3 gap-4 pt-6 flex flex-col items-center">
        {/* profilePic */}
        <div className="flex flex-col gap-2">
          <div className=" rounded-full bg-slate-200 flex justify-center items-center w-32 h-32">
            {Load ? (
              <Spiner w={10} h={10} />
            ) : (
              <ProfilePic url={profilePic} w={"full"} h={"full"}></ProfilePic>
            )}
          </div>

          {/* Btn */}
          <span
            className="siz-8 border-2 border-s-slate-300 p-3 cursor-pointer rounded-lg text-center font-medium hover:border-blue-500  hover:bg-blue-500 hover:text-white transition-all duration-200"
            onClick={() => {
              inputRef.current?.click();
            }}
          >
            <input
              type="file"
              ref={inputRef}
              onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                const pic = e.target.files;
                try {
                  if (pic != null) {
                    setLoad(true);
                    const picMetaData = pic[0];

                    // Image Compretion
                    const compressedFile = (await ImageFileCompretion(
                      picMetaData
                    )) as File;

                    // Getting Url
                    const url = (await authService.updateUserProfilePic({
                      userName,
                      userId,
                      picMetaData: compressedFile,
                    })) as string;
                    dispatch(UpdateProfilePicUlr(url));
                    setLoad(false);
                  }
                } catch (error) {
                  console.error(error);
                }
              }}
              className="hidden"
            />
            change
          </span>
        </div>

        {/* User-Name */}
        <EditUserName></EditUserName>

        {/* Bio */}
        <EditBio></EditBio>
      </div>
    </>
  );
}

export default EditProfile;
