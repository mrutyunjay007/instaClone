import { useEffect, useState } from "react";

import TopBar from "./TopBar";
import Post from "./Post";
// import { useDispatch, useSelector } from "react-redux";

import { postService } from "../Firebase/postService";
import { TPostList } from "../Redux/Slice/CurrentPostSlice";

function Home() {
  const [postList, setPostList] = useState<TPostList>([]);

  const [isLoding, setIsLoding] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const postList = await postService.getAllPosts();
        console.log(postList);

        if (postList) {
          // dispatch(setPostList([...postList]));
          setPostList([...postList]);
          setIsLoding(false);
        }
      } catch (error) {
        console.log(error);
      }
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
              postList.map((post) => (
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
