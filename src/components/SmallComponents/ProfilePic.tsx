import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { VscAccount } from "react-icons/vsc";
import Image from "./Image";

function ProfilePic({ w, h }: { w: number | string; h: number | string }) {
  const userProfilePicture = useSelector(
    (state: RootState) => state.UserInfos.userData.profilePic
  );

  return (
    <>
      {userProfilePicture.length === 0 ? (
        <VscAccount className={`dark:text-color w-${w} h-${h}`} />
      ) : (
        <div className={`rounded-full w-${w} h-${h}`}>
          <Image url={userProfilePicture} rounded={true}></Image>
        </div>
      )}
    </>
  );
}

export default ProfilePic;
