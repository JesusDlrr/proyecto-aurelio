import { React, useEffect, useState } from 'react';
import { Post } from "../post/post";
import UseFeed from './UseFeed';

export const Feed = ({children}) => {
    // const [post_message, setPostMessage] = useState("");
    
    return (
        <>
            {/* Feed */}
            <div className="bg-gray-400 text-black dark:bg-quick4 text-center text-3xl col-span-2 sm:row-span-2 md:row-span-5 space-y-1 dark:space-y-1">
                {children}
            </div>
        </>
    )
}