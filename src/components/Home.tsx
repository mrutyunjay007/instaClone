import { useEffect, useState } from "react";

import TopBar from "./TopBar";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";

import { postService } from "../Firebase/postService";
import { setPostList } from "../Redux/Slice/PostSlice";
import { RootState } from "../Redux/store";

function Home() {
  const allPost = useSelector((state: RootState) => state.PostList);
  const dispatch = useDispatch();
  const [isLoding, setIsLoding] = useState(true);

  useEffect(() => {
    (async () => {
      const postList = await postService.getAllPosts();
      if (postList) {
        dispatch(setPostList(postList));
      }
      setIsLoding(false);
    })();
  }, []);

  return (
    <>
      <div className=" w-full sticky  top-0  md:hidden">
        <TopBar></TopBar>
      </div>
      <div className=" flex  justify-center  items-center md:w-3/4 lg:w-1/2">
        <div className=" px-10">
          <div className="w-full">
            {isLoding ? (
              <div>Loading...</div>
            ) : (
              allPost.map((post) => (
                <Post key={post.postId} posts={{ ...post }}></Post>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
