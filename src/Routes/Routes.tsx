import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { lazy, Suspense } from "react";

//----------------------Imp Components-----------------------
import Layout from "../components/Layout";
import Home from "../components/Home";

const UserProfile = lazy(() => import("../components/Profile/UserProfile"));
const OthersProfile = lazy(() => import("../components/Profile/OthersProfile"));
const Follower = lazy(() => import("../components/Follower"));
const Following = lazy(() => import("../components/Following"));
const Create = lazy(() => import("../components/CreateNewPost/Create"));
const Likes = lazy(() => import("../components/Likes"));
const Comments = lazy(() => import("../components/Comment/Comments"));
const Share = lazy(() => import("../components/CreateNewPost/Share"));
const Notification = lazy(
  () => import("../components/Notifications/NotificationBody")
);
const Search = lazy(() => import("../components/Search/Search"));
const ShowSinglePost = lazy(() => import("../components/ShowSinglePost"));
const EditProfile = lazy(() => import("../components/Profile/EditProfile"));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route
        path="likes"
        element={
          <Suspense>
            <Likes></Likes>
          </Suspense>
        }
      />
      <Route
        path="comment"
        element={
          <Suspense>
            <Comments></Comments>
          </Suspense>
        }
      />
      <Route
        path="upLoadPost"
        element={
          <Suspense>
            <Create></Create>
          </Suspense>
        }
      />
      <Route
        path="sharePost"
        element={
          <Suspense>
            <Share></Share>
          </Suspense>
        }
      />
      <Route
        path="userProfile"
        element={
          <Suspense>
            <UserProfile></UserProfile>
          </Suspense>
        }
      />
      <Route
        path="othersProfile"
        element={
          <Suspense>
            <OthersProfile></OthersProfile>
          </Suspense>
        }
      />
      <Route
        path="followers"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Follower />
          </Suspense>
        }
      />
      <Route
        path="following"
        element={
          <Suspense>
            <Following></Following>
          </Suspense>
        }
      />

      <Route
        path="singlePost"
        element={
          <Suspense>
            <ShowSinglePost></ShowSinglePost>
          </Suspense>
        }
      />

      <Route
        path="notification"
        element={
          <Suspense>
            <Notification></Notification>
          </Suspense>
        }
      />
      <Route
        path="search"
        element={
          <Suspense>
            <Search></Search>
          </Suspense>
        }
      />
      <Route
        path="edit"
        element={
          <Suspense>
            <EditProfile></EditProfile>
          </Suspense>
        }
      />
    </Route>
  )
);
