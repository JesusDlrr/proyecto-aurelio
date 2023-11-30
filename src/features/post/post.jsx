import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePost from "./usePost";

export const Post = ({ post }) => {

    //const and var para obtener la fecha de la publicacion
    const sec = post.date.seconds;
    const out = new Date(sec * 1000);
    const time = out.toLocaleString('default');
    const navigate = useNavigate();

    const {
        likes,
        liked,
        likePost
    } = usePost(post.id);

    return (
        <>
            <div className="rounded bg-gray-50 dark:bg-zinc-700 dark:text-white sm:flex sm:space-x-8 sm:md:lg:xl:border-b">
                <div className="space-y-4 text-center sm:mt-0 sm:text-left break-all w-full">
                    {/* Div para la foto de perfil, nombre y numero de followers */}
                    <div className="cursor-pointer hover:bg-green-400 hover:rounded p-4" onClick={()=>{navigate("/profile?user="+post.from.uid)}}>
                        <div className="flex items-center space-x-4">
                            <img className="w-20 h-20 rounded-full" src={post.from.avatar} alt="user avatar" loading="lazy"></img>
                            <div className="">
                                <div>
                                    <a className="dark:text-white">
                                        <h1 className="text-xl font-sembold text-black dark:text-white">
                                            {post.from.name}
                                        </h1>
                                    </a>
                                </div>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    <h1 href="" class="flex items-center mt-1 space-x-2 text-gray-500 dark:text-gray-400">
                                        {time}
                                    </h1>
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Seccion para el post de las personas */}
                    <div className="p-4 ">
                        <p className="text-gray-600 font-serif dark:text-white">{post.message}</p>
                        <div className="flex items-center space-x-4">
                            <span className="cursor-pointer" onClick={()=>{likePost()}}><svg class="h-6 w-6 ml-2 text-red-500 items-center" viewBox="0 0 24 24" fill={liked ? "red" : "none"} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg></span>
                            <h1 className="text-md text-gray-500 dark:text-gray-400">
                                {likes}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}