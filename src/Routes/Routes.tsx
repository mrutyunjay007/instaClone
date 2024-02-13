import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

//components imp
import Layout from "../components/Layout";
import Home from "../components/Home";
import UserProfile from "../components/Profile.tsx/UserProfile";
import OthersProfile from "../components/Profile.tsx/OthersProfile";
import Follower from "../components/Follower";
import Following from "../components/Following";
import Create from "../components/CreateNewPost/Create";
// import Share from "../components/CreateNewPost/Share";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="createPost" element={<Create />} />
      <Route path="userProfile" element={<UserProfile />} />
      <Route path="othersProfile" element={<OthersProfile />} />
      <Route path="followers" element={<Follower />} />
      <Route path="following" element={<Following />} />
    </Route>
  )
);
