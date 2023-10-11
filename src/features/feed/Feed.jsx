import { React, useState } from 'react';
import { Post } from "../post/post";
import UseFeed from './UseFeed';

export const Feed = () => {
    const [post_message, setPostMessage] = useState("");
    const {
        post,
        posts
    } = UseFeed();

    return (
        <>
            {/* Feed */}
            <div className="bg-gray-400 text-black text-center text-3xl rounded-lg col-span-2 sm:row-span-2 md:row-span-5">
                {posts.map((post) => {
                    return (<>
                        <Post post={post} />
                    </>);
                })}
            </div>
        </>
    )
}