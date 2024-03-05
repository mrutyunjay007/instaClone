// import React from "react";
import { RiAccountCircleLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { Link } from "react-router-dom";

function SearchResult({
  userName,
  userId,
  userIdName,
}: {
  userName: string;
  userId: string;
  userIdName: string;
}) {
  const authUserId = useSelector(
    (state: RootState) => state.UserInfos.userData.userId
  );
  return (
    <Link to={userId == authUserId ? "/userProfile" : "/othersProfile"}>
      <div className=" w-full cursor-pointer flex gap-2 items-center p-3 justify-start font-semibold   border-2 border-s-slate-200 drop-shadow-xl rounded-lg ">
        <span>
          <RiAccountCircleLine className="size-7 dark:text-white" />
        </span>
        <div className="dark:text-white flex flex-col">
          <span>{userName}</span>
          <span className="font-mono text-slate-400 text-[0.75rem] font-thin">{`@${userIdName}`}</span>
        </div>
      </div>
    </Link>
  );
}

export default SearchResult;
