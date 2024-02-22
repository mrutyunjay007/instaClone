// import React from 'react'
import { useEffect, useState } from "react";
import Connection from "./Connection";
import { RootState } from "../Redux/store";
import { useSelector } from "react-redux";
import { profileService } from "../Firebase/profileService";
import { TConnection } from "../Redux/Slice/FollowSlice";
import BackBtn from "./SmallComponents/BackBtn";

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
    <div className="w-full dark:bg-background ">
      <div className=" w-full h-[9vh] sticky top-0 flex justify-center items-center  border-b-2 border-s-slate-100">
        <BackBtn></BackBtn>

        <span className=" dark:text-color font-bold text-2xl">Following</span>
      </div>
      <div className=" mt-2 flex justify-center">
        <div className="w-full md:w-3/4  lg:w-1/2">
          {loding ? (
            <div>Loding...</div>
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
