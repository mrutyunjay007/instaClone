import { useEffect, useState } from "react";
import { postService } from "../Firebase/postService";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import Connection from "./Connection";
import BackBtn from "./SmallComponents/BackBtn";

interface ILike {
  userName: string;
  userId: string;
  profilePic: string;
}
type TLike = ILike[];

function Likes() {
  const { postId, likeCount } = useSelector(
    (state: RootState) => state.CurrentPostInfo
  );
  const [loding, setLoding] = useState(true);

  const [likeList, setLikeList] = useState<TLike>([]);

  // Get All users who liked
  useEffect(() => {
    (async () => {
      const list = await postService.getAllUserFromLikeList({ postId });

      if (list) {
        setLikeList([...list]);
        setLoding(false);
      }
    })();
  }, []);

  return (
    <div className="w-full ">
      <div className=" w-full h-[9vh] sticky top-0 flex gap-2 justify-center items-center  border-b-2 border-s-slate-100">
        <BackBtn />
        <div>Likes</div>
        <div>{likeCount}</div>
      </div>
      <div className=" mt-2 flex justify-center">
        <div className="w-full md:w-3/4  lg:w-1/2">
          {loding ? (
            <div>Loding...</div>
          ) : (
            likeList.map((data) => (
              <Connection
                key={data.userId}
                followersData={{
                  userName: data.userName,
                  userId: data.userId,
                  profilePic: data.profilePic,
                  isFollower: false,
                  isFollowing: false,
                }}
                likeCount={likeCount}
              ></Connection>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Likes;
