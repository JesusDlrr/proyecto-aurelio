import React, { useState } from "react";
import useHome from "./useHome";
import homeStyles from "./home.module.css";
import boxicons from "boxicons";

export const Home = () => {
    const [post_message, setPostMessage] = useState("");
    const {
        post,
        posts
    } = useHome();

    return (
        <>
            {/* Header */}
            <div className="bg-green-700 text-white text-center text-5xl py-4 col-span-4">
                <i><box-icon name='search-alt' color='#ffffff' ></box-icon></i>
                <box-icon name='home' color='#ffffff' ></box-icon>
                <box-icon name='log-out-circle' color='#ffffff' ></box-icon>
            </div>
            <div className="h-screen bg-slate-400 p-10 grid grid-cols-4 grid-rows-4 gap-6">

                {/* Profile */}
                <div className="bg-white text-white text-center text-3xl py-2 rounded-lg row-span-3 sm:row-span-3 md:row-span-3 ">
                    <div className="p-16 bg-white sticky top-0">
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
                <div className="bg-white text-center text-3xl rounded-lg col-span-2">
                    <input placeholder="Quick thought..." className="bg-white w-full rounded-lg shadow border-t-2 p-2" onChange={(e) => { setPostMessage(e.target.value) }} />
                    <button className="py-2 px-4 rounded-full mr-10 absolute -translate-x-40 m-1" value="POST" onClick={() => { post(post_message) }} >
                        <box-icon className=" hover:bg-gray-300" name='send' type='solid' color='#397850'></box-icon>
                        {posts.map((post) => {
                            return (<>
                                <div className="">{post.texto}</div>
                            </>);
                        })}
                    </button>
                </div>
                {/* Suggestions */}
                <div className="bg-white text-white text-center text-3xl py-2 rounded-lg row-span-3 sm:row-span-3 md:row-span-6 ">
                    <h1 className="text-black">Suggestions</h1>
                    <div className="p-10 flex flex-col items-center text-center group md:lg:xl:border-r md:lg:xl:border-b bg-white rounded-lg">
                        <span className="p-5 rounded-full bg-slate-700 text-white shadow-lg shadow-slate-200"><svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                        </svg></span>
                        <p className="text-xl font-medium text-slate-700 mt-3">Username</p>
                        <button type="button" className=" bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-full">Follow</button>
                    </div>
                </div>
                {/* Feed */}
                <div className="bg-white text-black text-center text-3xl py-2 rounded-lg col-span-2 sm:row-span-2 md:row-span-5 ">Feed</div>
            </div>
        </>
    )
}