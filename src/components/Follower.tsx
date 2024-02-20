import { useEffect, useState } from "react";

import Connection from "./Connection";
import { RootState } from "../Redux/store";
import { useSelector } from "react-redux";
import { profileService } from "../Firebase/profileService";
import { TConnection } from "../Redux/Slice/FollowSlice";
import BackBtn from "./SmallComponents/BackBtn";

function Follower() {
  const { userId } = useSelector((state: RootState) => state.CurrentUserInfo);

  const [followersList, setFollowersList] = useState<TConnection>([]);
  const [loding, setLoding] = useState(true);

  // GET followers List
  useEffect(() => {
    (async () => {
      const list = await profileService.getFollowerData({ userId });

      if (list) {
        setFollowersList([...list]);
        setLoding(false);
      }
    })();
  }, []);

  return (
    <div className="w-full ">
      <div className=" w-full h-[9vh] sticky top-0 flex justify-center items-center  border-b-2 border-s-slate-100">
        <BackBtn></BackBtn>

        <span className=" font-bold text-2xl"> Follower</span>
      </div>
      <div className=" mt-2 flex justify-center">
        <div className="w-full md:w-3/4  lg:w-1/2">
          {loding ? (
            <div>Loding...</div>
          ) : (
            followersList.map((data) => (
              <Connection
                key={data.userId}
                followersData={{ ...data }}
                likeCount={null}
              ></Connection>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Follower;
