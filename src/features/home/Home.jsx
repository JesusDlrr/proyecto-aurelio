import React, { useContext } from "react";
import { NavBar } from "../nav_bar/Navbar";
import { Suggestions } from "../suggestions/Suggestions";
import { Feed } from "../feed/Feed";
import { Profile } from "../profile/Profile";
import { Quick_Thought } from "../quick_thought/Quick_thought";
import { Post } from "../post/post";
import useHome from "./UseHome";

export const Home = () => {
  const { user_name, user_avatar, posts, setPosts, post } = useHome();
  return (
    <>
      <NavBar />

      <div className="h-auto w-auto bg-gray-400 dark:bg-quick7 p-4 grid grid-cols-1 gap-3 lg:grid-cols-4 lg:p-10 md:grid-cols-4 md:p-10 sm:grid-cols-1 sm:p-10 ">
        <Profile name={user_name} avatar={user_avatar} />
        <div className="text-xl rounded-lg col-span-2 grid gap-3">
          <div className="">
            <Quick_Thought makePost={post} />
          </div>
          <div>
            <Feed posts={posts} setPosts={setPosts} />
          </div>
        </div>
        <Suggestions />
      </div>
    </>
  );
};
