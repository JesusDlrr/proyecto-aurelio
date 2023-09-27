import React, { useState } from "react";
import useHome from "./useHome";
import homeStyles from "./home.module.css";
import { Post } from "../post/post";
import { NavBar } from "../nav_bar/Navbar";
import { Suggestions } from "../suggestions/Suggestions";

export const Home = () => {
    const [post_message, setPostMessage] = useState("");
    const {
        post,
        posts
    } = useHome();

    return (
        <>
            <NavBar />
            <div className="h-screen w-screen bg-gray-400 p-10 grid grid-cols-4 grid-rows-4 gap-2">
                {/* Profile */}
                <div className="bg-white text-white text-center text-3xl py-2 rounded-lg row-span-3 sm:row-span-3 md:row-span-3 ">
                    <div className="p-24 bg-white top-0">
                        <img className="border border-indigo-200 shadow-lg rounded-full overflow-hidden" src="http://lilithaengineering.co.za/wp-content/uploads/2017/08/person-placeholder.jpg" />
                        <div className="pt-2 mt-3 w-full text-center text-xl text-gray-600">
                            <h1 className="text-xl font-sembold text-black hover:underline">
                                Nombre de usuario aqui
                            </h1>
                        </div>
                        <div className="pt-2 mt-2 w-full text-center text-xl text-gray-600 hover:underline">
                            <a href="" class="flex items-center mt-1 space-x-2 text-gray-500 dark:text-gray-400 hover:underline">
                                <span>Numero de followers aqui Followers</span>
                            </a>
                        </div>
                    </div>
                    <div className="w-full h-screen antialiased flex flex-col hover:cursor-pointer">
                        <a className="hover:bg-gray-300 bg-white border-t p-3 w-full text-xl text-left text-gray-600 font-semibold" href="" target="_blank"><i class="fa fa-comment text-gray-600 text-2xl pr-1 pt-1 float-right"></i>Messages</a>
                        <a className="hover:bg-gray-300 bg-white border-t p-3 w-full text-xl text-left text-gray-600 font-semibold" href="" target="_blank"><i class="fa fa-cog text-gray-600 text-2xl pr-1 pt-1 float-right"></i>Settings</a>
                    </div>
                </div>
                {/* Quick Thought */}
                <div className="bg-white text-center text-xl rounded-lg col-span-2 h-12">
                    <input placeholder="Quick thought..." className="bg-white w-full rounded-lg shadow border-t-2 p-4" onChange={(e) => { setPostMessage(e.target.value) }} />
                    <button className="py-2 px-4 rounded-full mr-10 absolute -translate-x-40 m-1" value="POST" onClick={() => { post(post_message) }} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 flex ml-24 mt-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>

                    </button>
                </div>
                {/* Suggestions */}
                <Suggestions />
                {/* Feed */}
                <div className="bg-gray-400 text-black text-center text-3xl rounded-lg col-span-2 sm:row-span-2 md:row-span-5">
                    {posts.map((post) => {
                        return (<>
                            <Post message={post.texto} />
                        </>);
                    })}</div>
            </div>
        </>
    )
}