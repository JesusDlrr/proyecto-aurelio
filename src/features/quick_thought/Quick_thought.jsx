import { React, useState } from 'react';
import { Post } from "../post/post";
import useHome from "../feed/UseFeed";

export const Quick_Thought = ({makePost}) => {

    const [post_message, setPostMessage] = useState("");
    // const {
    //     post,
    //     posts
    // } = useHome();

    return (
        <>
            <div className="text-xl rounded-lg col-span-2">
                <textarea placeholder="Quick thought..." value={post_message} className="bg-white dark:bg-zinc-400 dark:placeholder-white w-full rounded-lg shadow border-t-1 p-4 resize-none" onChange={(e) => { setPostMessage(e.target.value) }} />
                <button className="py-2 px-4 rounded-full mr-10 absolute -translate-x-40 m-1" value="POST" onClick={() => { if(post_message != ""){makePost(post_message); setPostMessage("")}}} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 flex ml-24 mt-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                </button>
            </div>
        </>
    )
}