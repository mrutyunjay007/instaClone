import { useEffect, useState } from "react";

import Connection from "./Connection";
import { RootState } from "../Redux/store";
import { useSelector } from "react-redux";
import { profileService } from "../Firebase/profileService";
import { IConnection, TConnection } from "../Redux/Slice/FollowSlice";
import BackBtn from "./SmallComponents/BackBtn";
import FollowLoader from "./SmallComponents/loaders/FollowLoader";

function Follower() {
  const { userId } = useSelector((state: RootState) => state.CurrentUserInfo);

  const [followersList, setFollowersList] = useState<TConnection>([]);
  const [loding, setLoding] = useState(true);

  // GET followers List
  useEffect(() => {
    userId &&
      (async () => {
        const list = await profileService.getFollowerData({ userId });

        if (list) {
          console.log(list);

          setFollowersList([...list]);
          setLoding(false);
        }
      })();
  }, [userId]);

  return (
    <div className="w-full pb-[5.1rem] md:pb-0 ">
      <div className="  dark:bg-background sticky top-0 flex justify-start items-center w-full h-[5.1rem] bg-white border-b-2 border-s-slate-100 md:border-none">
        <BackBtn></BackBtn>

        <span className=" dark:text-color font-bold text-2xl ml-2  md:font-normal">
          Follower
        </span>
      </div>
      <div className=" flex justify-center">
        <div className=" w-full md:w-[668px] px-5 md:px-0 ">
          {loding ? (
            <FollowLoader></FollowLoader>
          ) : (
            followersList.map((data) => (
              <Connection
                key={data?.userId}
                followersData={{ ...(data as IConnection) }}
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
