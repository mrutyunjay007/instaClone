import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopBar from "./TopBar";
import Post from "./Post";
// import { useDispatch, useSelector } from "react-redux";

import { postService } from "../Firebase/postService";
import { TPostList } from "../Redux/Slice/CurrentPostSlice";
import { RootState } from "../Redux/store";
import { newPostUpLoadingDone } from "../Redux/Slice/CreatePostSlice";
import { AtHome } from "../Redux/Slice/NavSlice";
import PostsLoader from "./SmallComponents/loaders/PostsLoader";

// import {
//   INotificationData,
//   notificationService,
// } from "../Firebase/notificationService";
// import { getAllNotification } from "../Redux/Slice/NotificationSlice";
// import {
//   INotificationData,
//   notificationService,
// } from "../Firebase/notificationService";
// import { Unsubscribe } from "firebase/auth";
// import { getAllNotification } from "../Redux/Slice/NotificationSlice";

function Home() {
  const newPost = useSelector(
    (state: RootState) => state.CreatePostInfo.uploadedPost
  );
  // const numberOfNotification = useSelector(
  //   (state: RootState) => state.NotificationInfo.notifications.length
  // );
  // const userId = useSelector(
  //   (state: RootState) => state.UserInfos.userData.userId
  // );

  const dispatch = useDispatch();
  const [postList, setPostList] = useState<TPostList>([]);

  const [isLoding, setIsLoding] = useState(true);

  // Retrive all Post
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
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       notificationService.getAllNotificationsFirstTime(
  //         userId,
  //         (notificationData: INotificationData, notificationId: string) => {
  //           //push in notificatin-state
  //           dispatch(
  //             getAllNotification({ ...notificationData, id: notificationId })
  //           );
  //         }
  //       );
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);

  // Add new Post
  useEffect(() => {
    if (newPost.postId.length > 0) {
      const post = {
        postId: newPost.postId,
        userId: newPost.userId,
        userName: newPost.userName,
        profilePic: newPost.profilePic,
        postUrl: newPost.postUrl as string,
        caption: newPost.caption,
        likeCount: newPost.likeCount,
      };

      setPostList((pre) => [...pre, post]);
      dispatch(newPostUpLoadingDone());
      dispatch(AtHome());
    }
  }, [newPost]);

  // // Get all Notification
  // useEffect(() => {
  //   let unsubscribe: Unsubscribe | undefined;

  //   (async () => {
  //     // get notifications from db
  //     unsubscribe = await notificationService.getNotifications(
  //       userId,
  //       (notificationData: INotificationData, notificationId: string) => {
  //         //push in notificatin-state
  //         dispatch(
  //           getAllNotification({ ...notificationData, id: notificationId })
  //         );
  //       }
  //     );
  //   })();

  //   return () => {
  //     unsubscribe !== undefined && unsubscribe();
  //   };
  // }, [userId]);

  return (
    <>
      <div className=" dark:bg-gray-700 w-full sticky  top-0  md:hidden">
        <TopBar></TopBar>
      </div>
      <div className=" flex  justify-center px-10  items-center w-full md:w-[630px] lg:w-1/2">
        {/* <div className=" px-10"> */}
        <div className="w-full">
          {isLoding ? (
            <PostsLoader></PostsLoader>
          ) : (
            postList.map((post) => (
              <Post key={post.postId} posts={{ ...post }}></Post>
            ))
          )}
        </div>
        {/* </div> */}
      </div>
    </>
  );
}

export default Home;
