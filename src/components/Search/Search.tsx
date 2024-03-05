import { useEffect, useState } from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { RiSearchLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { searchUserIdName } from "../../Firebase/SearchUserIdNameService";
import { IUser } from "../../Redux/Slice/UserSlice";
import SearchResult from "./SearchResult";
import SearchItemLoader from "../SmallComponents/loaders/SearchItemLoader";

function Search() {
  const [search, setSearch] = useState("");
  const navigater = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search.length === 0) {
      setUser(null);
    }
  }, [search]);

  return (
    <>
      {/* TopBar */}
      <div className="  dark:bg-background sticky top-0 flex  gap-2 justify-start items-center w-full h-[9vh] bg-white border-b-2 border-s-slate-100 md:border-none">
        <RiArrowLeftSLine
          className="size-7 cursor-pointer dark:text-white"
          onClick={() => {
            navigater(-1);
          }}
        />
        <span className=" dark:text-color font-bold text-2xl ml-2  md:font-normal">
          Search
        </span>
      </div>
      <div className="w-full h-[calc(100vh-18vh)] flex flex-col justify-center items-center">
        <div className=" flex flex-col gap-2 justify-center items-center h-1/2 w-1/2 md:w-1/2 lg:w-1/2  ">
          <div className="  flex justify-center items-center  w-full rounded h-1/5 px-3 border-2 border-s-slate-300">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                e.preventDefault();
                setSearch(e.target.value);
              }}
              placeholder="search userId"
              className=" focus:outline-none flex-1"
            />
            <RiSearchLine
              className="size-5  dark:text-white text-slate-400 hover:text-slate-600 cursor-pointer"
              onClick={async () => {
                if (search.length > 0) {
                  setLoading(true);
                  try {
                    const searchedUser =
                      !user && (await searchUserIdName.findUserIdName(search));

                    if (searchedUser) {
                      setLoading(false);
                      setUser(searchedUser);
                    }
                  } catch (error) {
                    console.log(error);
                  }
                }
              }}
            ></RiSearchLine>
          </div>
          <div className="w-full h-[2.5rem]">
            {!loading ? (
              user && (
                <SearchResult
                  userId={user.userId}
                  userName={user.userName}
                  userIdName={user.userIdName}
                ></SearchResult>
              )
            ) : (
              <SearchItemLoader></SearchItemLoader>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
