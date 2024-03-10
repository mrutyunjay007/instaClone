// import { useSelector } from "react-redux";
// import { RootState } from "../../Redux/store";
import { VscAccount } from "react-icons/vsc";
import Image from "./Image";

function ProfilePic({
  w,
  h,
  url,
}: {
  w: number | string;
  h: number | string;
  url: string;
}) {
  // console.log(w);

  return (
    <>
      {url.length === 0 ? (
        <VscAccount className={`dark:text-color  w-${w} h-${h}`} />
      ) : (
        <div className={`rounded-full w-${w} h-${h}`}>
          <Image url={url} rounded={true}></Image>
        </div>
      )}
    </>
  );
}

export default ProfilePic;
