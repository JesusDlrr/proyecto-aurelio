import { React, useEffect, useState } from 'react';
import { Post } from "../post/post";
import UseFeed from './UseFeed';

export const Feed = ({ children }) => {
    // const [post_message, setPostMessage] = useState("");

    return (
        <>
            {/* Feed */}
            <div className="dark:outline dark:outline-1 dark:outline-quick5 bg-gray-400 text-black dark:bg-quick4 text-center text-3xl col-span-1 lg:col-span-2 md:col-span-2 sm:col-span-2">
                {children}
            </div>
        </>
    )
}