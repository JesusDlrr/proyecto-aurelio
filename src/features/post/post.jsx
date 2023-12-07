import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import usePost from "./usePost";
import { FaSync } from "react-icons/fa";
import { UserContext } from "../../App";

export const Post = ({ post, profile_user, unrepost }) => {

    //const and var para obtener la fecha de la publicacion
    const sec = post.date._seconds;
    const out = new Date(sec * 1000);
    const time = out.toLocaleString('default');
    const navigate = useNavigate();

    const {
        likes,
        reposts,
        liked,
        user,
        reposted,
        likePost,
        repost,
        setLikes,
        setReposts,
        setLiked,
        setReposted
    } = usePost();

    useEffect(() => {
        setLikes(post.likes);
        setReposts(post.reposts);
        setLiked(post.liked);
        setReposted(post.reposted);
    }, [])

    return (
        <>
            <div className="bg-gray-50 dark:bg-quick4 dark:text-white sm:flex border-b border-quick5">
                <div className="text-center sm:mt-0 sm:text-left break-all w-full">
                    {/* Div para la foto de perfil, nombre y numero de followers */}
                    <div className="cursor-pointer hover:bg-slate-200 dark:hover:bg-quick5 hover:rounded p-3" onClick={() => { navigate("/profile?user=" + post.from.id) }}>
                        <p className="text-xl font-sembold text-slate-400 ml-2 mb-5">
                            {
                                post.type === "repost" ?
                                    profile_user.id === user.uid ?
                                        "You reposted"
                                        :
                                        `${profile_user.name} reposted`
                                    :
                                    ""
                            }
                        </p>
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
                    <div className="p-3">
                        <p className="text-gray-600 font-serif dark:text-white pb-8">{post.message}</p>
                        {
                            <div className={post.media.length > 1 && 'grid grid-cols-2 gap-1'}>
                                {
                                    post.media.length > 1 ?
                                        post.media.slice(0, 4).map((file) => (
                                            <img src={file.url} className='rounded-md bg-black h-72 object-cover object-center w-full' />
                                        ))
                                        :
                                        post.media.length > 0 && <img src={post.media[0].url} className='rounded-md object-cover w- max-w-xs' />
                                }
                            </div>
                        }
                        <div className="flex gap-x-5 pt-7">
                            <div className="flex items-center space-x-4">
                                <span className="cursor-pointer" onClick={() => { likePost(post.id) }}>
                                    <svg class="h-6 w-6 ml-2 text-red-500 items-center" viewBox="0 0 24 24" fill={liked ? "red" : "none"} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                                </span>
                                <h1 className="text-md text-gray-500 dark:text-gray-400">
                                    {likes}
                                </h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                {


                                    post.type === "repost" ?
                                        profile_user.id === user.uid ?
                                            < span onClick={() => { unrepost(post.id); repost(post.id) }}>
                                                <svg className={`cursor-pointer h-6 w-6 ml-2 items-center ${reposted ? "fill-green-400" : "dark:fill-white"}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 7a1 1 0 0 0-1-1h-8v2h7v5h-3l3.969 5L22 13h-3V7zM5 17a1 1 0 0 0 1 1h8v-2H7v-5h3L6 6l-4 5h3v6z" /></svg>
                                            </span>
                                            :
                                            < span className="cursor-pointer" onClick={() => { repost(post.id) }}>
                                                <svg className={`h-6 w-6 ml-2 items-center ${reposted ? "fill-green-400" : "dark:fill-white"}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 7a1 1 0 0 0-1-1h-8v2h7v5h-3l3.969 5L22 13h-3V7zM5 17a1 1 0 0 0 1 1h8v-2H7v-5h3L6 6l-4 5h3v6z" /></svg>
                                            </span>
                                        :
                                        < span className="cursor-pointer" onClick={() => { repost(post.id) }}>
                                            <svg className={`h-6 w-6 ml-2 items-center ${reposted ? "fill-green-400" : "dark:fill-white"}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 7a1 1 0 0 0-1-1h-8v2h7v5h-3l3.969 5L22 13h-3V7zM5 17a1 1 0 0 0 1 1h8v-2H7v-5h3L6 6l-4 5h3v6z" /></svg>
                                        </span>


                                }
                                <h1 className="text-md text-gray-500 dark:text-gray-400">
                                    {reposts}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}