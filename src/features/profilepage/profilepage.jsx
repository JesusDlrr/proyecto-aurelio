import { React, useContext, useRef, useState } from "react";
import { NavBar } from "../nav_bar/Navbar";
import { Feed } from "../feed/Feed";
import { Quick_Thought } from "../quick_thought/Quick_thought";
import UseProfile from "./UseProfile";
import { Post } from "../post/post";
import { useSearchParams } from "react-router-dom";
import { UserContext } from "../../App";
import { Repost } from "../repost/reposts";
import { Speed_Dial } from "../speed_dial/speed_dial";
import { SpeedDial } from "@material-tailwind/react";

export const ProfilePage = ({ name, avatar }) => {
  const ref = useRef();
  const handleClick = (e) => {
    ref.current.click();
  };

  const { user } = useContext(UserContext);
  const [search_params] = useSearchParams();
  const {
    user_name,
    user_avatar,
    updateAvatar,
    posts,
    following,
    unrepost,
    setPosts,
    followUser,
    followers,
    post,
  } = UseProfile();

  const handleChange = (e) => {
    const file = e.target.files[0];
    const file_type = file.type.split("/");
    if (file_type[0] === "image") {
      updateAvatar(new Blob([file], { type: file.type }), file_type[1]);
    }
  };
  return (
    <div className="min-h-screen bg-gray-400 dark:bg-quick7 overflow-hidden">
      {user.uid === search_params.get("user") ? <Speed_Dial /> : null}
      <NavBar />

      <div className="bg-white h-20 w-full " />

      <input
        className="hidden"
        id="default_size"
        ref={ref}
        onChange={handleChange}
        type="file"
      />

      {/* Avatar */}
      <div className="flex flex-col items-center sm:flex-row sm:justify-center mt-6">
        {user.uid === search_params.get("user") ? (
          <div
            className="absolute top-24 lg:z-40 lg:left-24
            cursor-pointer rounded-full h-40 w-40 mt-2 border-gray-400 dark:border-quick7 border-8 bg-cover bg-center"
            style={{ backgroundImage: `url("${user_avatar}")` }}
            onClick={handleClick}
            alt="user avatar"
            title="Upload Image"
            loading="lazy"
          >
            <div className="flex rounded-full justify-center h-full w-full items-center bg-gray-600/30 dark:bg-quick7/30 backdrop-brightness-75 opacity-0 hover:opacity-70">
              <span className="text-white text-lg text-center">
                Upload Image
              </span>
            </div>
          </div>
        ) : (
          <div
            className="absolute top-24 lg:z-40 lg:left-24
            cursor-pointer rounded-full h-40 w-40 mt-2 border-gray-400 dark:border-quick7 border-8 bg-cover bg-center"
            style={{ backgroundImage: `url("${user_avatar}")` }}
            alt="user avatar"
            title="Upload Image"
            loading="lazy"
          ></div>
        )}

        {/* Username and folowwers */}
        <div className="lg:absolute lg:mt-4 mt-20 lg:ml-16 left-40 px-8">
          <a>
            <h1 className="text-md font-semibold text-black dark:text-white lg:text-2xl md:text-2xl sm:text-2xl mt-1">
              {user_name}
            </h1>
          </a>
          <span className="text-md text-black dark:text-white block lg:text-lg md:text-lg sm:text-lg mt-1">
            <h1 className="flex items-center space-x-1 text-black dark:text-white">
              {followers != null && <>{followers} followers</>}
            </h1>

            {following != null && user.uid !== search_params.get("user") && (
              <div className="mt-1">
                <button
                  type="button"
                  title="Follow user"
                  onClick={followUser}
                  className="shadow-2xl shadow-black p-1 bg-green-500 rounded-lg active:bg-green-700 ease-linear transition-all duration-150 outline-none focus:outline-none"
                >
                  <h1 className="text-white">
                    {following ? "Unfollow" : "Follow"}
                  </h1>
                </button>
              </div>
            )}
          </span>
        </div>
      </div>

      {/* Settings and messagges */}
      <div className="mt-6 lg-p-10 p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-3">
        <div className="bg-white text-white text-3xl rounded-lg row-span-3 mt-20 max-h-24 lg:block md:block sm:block hidden">
          <div className="flex flex-col hover:cursor-pointer">
            <a
              className="hover:bg-gray-300 dark:hover:bg-quick5 dark:outline dark:outline-1 dark:outline-quick5 bg-white p-3 w-full text-xl text-left text-black dark:bg-quick4 dark:text-white font-semibold rounded-lg rounded-b-none"
              href={"/dms?to=" + search_params.get("user")}
            >
              Messages
            </a>
            <a
              className="hover:bg-gray-300 dark:hover:bg-quick5 dark:outline dark:outline-1 dark:outline-quick5 bg-white border-t dark:border-quick3 p-3 w-full text-xl text-left text-black dark:bg-quick4 dark:text-white font-semibold rounded-lg rounded-t-none border-black"
              href="/settings"
            >
              Settings
            </a>
          </div>
        </div>
        {/* POST Quick Thought */}
        <div className="col-span-3 mt-20">
          <div className="text-xl rounded-lg col-span-2 grid gap-3">
            {search_params.get("user") === user.uid && (
              <div className="sm:block hidden">
                <Quick_Thought makePost={post} />
              </div>
            )}
            <div>
              <Feed posts={posts} setPosts={setPosts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
