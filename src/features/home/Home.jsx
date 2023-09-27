import React, { useState } from "react";
import useHome from "./useHome";
import homeStyles from "./home.module.css";
import boxicons from "boxicons";
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
        <NavBar/>
            <div className="h-screen bg-gray-500 p-10 grid grid-cols-4 grid-rows-4 gap-2">
                {/* Profile */}
                <div className="bg-white text-white text-center text-3xl py-2 rounded-lg row-span-3 sm:row-span-3 md:row-span-3 ">
                    <div className="p-16 bg-white top-0">
                        <img className="border border-indigo-100 shadow-lg rounded-full overflow-hidden" src="http://lilithaengineering.co.za/wp-content/uploads/2017/08/person-placeholder.jpg" />
                        <div className="pt-2 mt-5 w-full text-center text-xl text-gray-600">
                            Some Person
                        </div>
                        <div className="pt-2 mt-5 w-full text-center text-xl text-gray-600">
                            999999 Followers
                        </div>
                    </div>
                    <div className="w-full h-screen antialiased flex flex-col hover:cursor-pointer">
                        <a className="hover:bg-gray-300 bg-white border-t p-3 w-full text-xl text-left text-gray-600 font-semibold" href="" target="_blank"><i class="fa fa-comment text-gray-600 text-2xl pr-1 pt-1 float-right"></i>Messages</a>
                        <a className="hover:bg-gray-300 bg-white border-t p-3 w-full text-xl text-left text-gray-600 font-semibold" href="" target="_blank"><i class="fa fa-cog text-gray-600 text-2xl pr-1 pt-1 float-right"></i>Settings</a>
                    </div>
                </div>
                {/* Quick Thought */}
                <div className="bg-gray-500 text-center text-xl rounded-lg col-span-2">
                    <input placeholder="Quick thought..." className="bg-white w-full rounded-lg shadow border-t-2 p-2" onChange={(e) => { setPostMessage(e.target.value) }} />
                    <button className="py-2 px-4 rounded-full mr-10 absolute -translate-x-40 m-1" value="POST" onClick={() => { post(post_message) }} >
                        <box-icon className=" hover:bg-gray-300" name='send' type='solid' color='#397850'></box-icon>
                    </button>
                </div>
                {/* Suggestions */}
                    <Suggestions/>
                {/* Feed */}
                <div className="bg-white text-black text-center text-3xl py-2 rounded-lg col-span-2 sm:row-span-2 md:row-span-5 ">Feed
                {posts.map((post) => {
                            return (<>
                                <Post message={post.texto}/>
                            </>);
                        })}</div>
            </div>
        </>
    )
}