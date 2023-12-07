import { React, useContext, useRef, useState } from "react";
import { NavBar } from "../nav_bar/Navbar";
import { Feed } from "../feed/Feed";
import { Quick_Thought } from "../quick_thought/Quick_thought";
import UseProfile from "./UseProfile";
import { Post } from "../post/post";
import { useSearchParams } from "react-router-dom";
import { UserContext } from "../../App";
import { Repost } from "../repost/reposts";

export const ProfilePage = ({ name, avatar }) => {
    const ref = useRef();
    const handleClick = (e) => {
        ref.current.click()
    }

    const { user } = useContext(UserContext);
    const [search_params] = useSearchParams();
    const {
        user_name,
        user_avatar,
        updateAvatar,
        posts,
        following,
        setPosts,
        followUser,
        followers,
        post
    } = UseProfile();

    const handleChange = (e) => {
        const file = e.target.files[0];
        const file_type = file.type.split("/");
        if (file_type[0] === "image") {
            updateAvatar(new Blob([file], { type: file.type }), file_type[1]);
        }
    }
    return (
        <>
            <NavBar />
            <div className="bg-white  h-20 w-full " />
            <input className="hidden " id="default_size" ref={ref} onChange={handleChange} type="file" />
            <div className="sm:row-span-6 md:row-span-3">
                {user.uid === search_params.get("user") ? <>
                    <div className={"absolute cursor-pointer rounded-full h-40 w-40 top-24 z-40 left-24 mt-2 border-gray-400 dark:border-quick7 border-8 sm:row-span-6 bg-cover bg-center"} style={{ backgroundImage: `url("${user_avatar}")` }} onClick={handleClick} onChange={handleChange} alt="user avatar" title="Upload Image" loading="lazy">
                        <div className="flex rounded-full justify-center h-full w-full items-center bg-gray-600/30 dark:bg-quick7/30 backdrop-brightness-75 opacity-0 hover:opacity-70">
                            <span className="text-white text-lg text-center">Upload Image</span>
                        </div>
                    </div>
                </>
                    :
                    <>
                        <div className={"absolute rounded-full h-40 w-40 top-24 z-40 left-24 mt-2 border-gray-400 dark:border-quick7 border-8 sm:row-span-6 bg-cover bg-center"} style={{ backgroundImage: `url("${user_avatar}")` }} alt="user avatar" title="Upload Image" loading="lazy">
                        </div>
                    </>}
                <div className="mx-60 px-8">
                    <div className="absolute">
                        <a>
                            <h1 className="text-2xl font-sembold text-black dark:text-white">
                                {user_name}
                            </h1>
                        </a>
                    </div>
                    <span className="text-lg text-black dark:text-white absolute">
                        <h1 className="flex items-center mt-8 space-x-2 text-black dark:text-white">
                            {followers != null && <>{followers} followers</>}
                        </h1>
                        {following != null && user.uid !== search_params.get("user") && <>
                            <div className="">
                                <button type="button" title="Follow user" onClick={followUser} className="shadow-2xl shadow-black p-1 bg-green-500 rounded-lg active:bg-green-700 ease-linear transition-all duration-150 outline-none focus:outline-none">
                                    <h1 className="text-white">{following ? "Unfollow" : "Follow"}</h1>
                                </button>
                            </div>
                        </>}
                    </span>

                </div>
            </div>
            <div className="h-auto w-auto bg-gray-400 p-10 grid grid-cols-4 gap-3 sm:row-span-6 dark:bg-quick7">
                <div className="bg-white text-white text-center text-3xl rounded-lg row-span-3 mt-20 max-h-24">
                    <div className="flex flex-col hover:cursor-pointer">
                        <a className="hover:bg-gray-300 dark:hover:bg-quick5 dark:outline dark:outline-1 dark:outline-quick5 bg-white p-3 w-full text-xl text-left text-black dark:bg-quick4 dark:text-white font-semibold rounded-lg rounded-b-none" href={"/dms?to=" + search_params.get("user")}>Messages</a>
                        <a className="hover:bg-gray-300 dark:hover:bg-quick5 dark:outline dark:outline-1 dark:outline-quick5 bg-white border-t dark:border-quick3 p-3 w-full text-xl text-left text-black dark:bg-quick4 dark:text-white font-semibold rounded-lg rounded-t-none border-black">Settings</a>
                    </div>
                </div>
                <div className="col-span-3 mt-20">

                    {search_params.get("user") === user.uid && <Quick_Thought makePost={post} />}
                    <Feed>
                        {posts != null &&
                            posts.sort((a, b) => {
                                return b.date._seconds - a.date._seconds;
                            }).map((post) => (
                                post.type === "post" ?
                                    <Post post={post} key={post.id} />
                                    :
                                    <Repost post={post} key={post.id} self={user.uid === search_params.get("user")} reposter_name={user_name} unrepost={() => {
                                        setPosts(posts.filter((_post) => (_post.id !== post.id)))
                                    }} />
                            ))
                        }
                    </Feed>
                </div>
            </div>
        </>
    )
}

