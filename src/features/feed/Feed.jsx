import { React, useState } from 'react';
import { Post } from "../post/post";
import useHome from "../home/useHome";


export const Feed = () => {
    const [post_message, setPostMessage] = useState("");
    const {
        post,
        posts
    } = useHome();

    return (
        <>
            {/* Feed */}
            <div className="bg-gray-400 text-black text-center text-3xl rounded-lg col-span-2 sm:row-span-2 md:row-span-5 -mt-96">
                {posts.map((post) => {
                    return (<>
                        <Post message={post.texto} />
                    </>);
                })}
            </div>
        </>
    )
}