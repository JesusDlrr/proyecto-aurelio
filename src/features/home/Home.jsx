import React, { useState } from "react";
import useHome from "./useHome";

export const Home = () => {
    const [post_message, setPostMessage] = useState("");
    const {
        post,
        posts
    } = useHome();

    return(
        <>
            <textarea name="" id="" cols="30" rows="10" onChange={(e) => {setPostMessage(e.target.value)}}></textarea>
            <br />
            <input type="button" value="POST" onClick={() => {post(post_message)}}/>
            {posts.map((post) => {
                return(<>
                    <div>{post.texto}</div>
                </>);
            })}
        </>
    )
}