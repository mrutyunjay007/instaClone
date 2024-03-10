// import React from 'react'
import { useEffect, useState } from "react";
import Connection from "./Connection";
import { RootState } from "../Redux/store";
import { useSelector } from "react-redux";
import { profileService } from "../Firebase/profileService";
import { TConnection } from "../Redux/Slice/FollowSlice";
import BackBtn from "./SmallComponents/BackBtn";
import FollowLoader from "./SmallComponents/loaders/FollowLoader";

function Following() {
  const { userId } = useSelector((state: RootState) => state.CurrentUserInfo);

  const [followingList, setFollowingList] = useState<TConnection>([]);
  const [loding, setLoding] = useState(true);

  // GET following list
  useEffect(() => {
    (async () => {
      const list = await profileService.getFollowingData({ userId });

      if (list) {
        setFollowingList([...list]);
        setLoding(false);
      }
    })();
  }, []);

  return (
    <div className="w-full pb-[5.1rem] md:pb-0 dark:bg-background ">
      <div className="  dark:bg-background sticky top-0 flex  gap-2 justify-start items-center w-full h-[5.1rem] bg-white border-b-2 border-s-slate-100 md:border-none">
        <BackBtn></BackBtn>

        <span className=" dark:text-color font-bold text-2xl ml-2  md:font-normal">
          Following
        </span>
      </div>
      <div className=" mt-2 flex justify-center">
        <div className="w-full md:w-3/4  px-5 md:px-0 lg:w-1/2">
          {loding ? (
            <FollowLoader></FollowLoader>
          ) : (
            followingList.map((data) => (
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

export default Following;
