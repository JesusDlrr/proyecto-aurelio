import React, { useContext } from "react";
import { NavBar } from "../nav_bar/Navbar";
import { Suggestions } from "../suggestions/Suggestions";
import { Feed } from "../feed/Feed";
import { Profile } from "../profile/Profile";
import { Quick_Thought } from "../quick_thought/Quick_thought";
import { Post } from "../post/post";
import useHome from "./UseHome";

export const Home = () => {
  const { user_name, user_avatar, posts, post } = useHome();
  return (
    <>
      <NavBar />

      <div className="h-auto w-auto bg-gray-400 dark:bg-quick7 p-10 grid grid-cols-4 gap-3">
        <Profile name={user_name} avatar={user_avatar} />
        <div className="text-xl rounded-lg col-span-2">
          <Quick_Thought makePost={post} />
        </div>
        <Suggestions />
        <Feed>
          {posts
            .sort((a, b) => {
              return b.date._seconds - a.date._seconds;
            })
            .map((post) => {
              return (
                <>
                  <Post post={post} key={post.id} />
                </>
              );
            })}
        </Feed>
      </div>
    </>
  );
};
