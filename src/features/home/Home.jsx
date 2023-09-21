import React from "react";
import useHome from "./useHome";

export const Home = () => {
    const {
        post
    } = useHome();

    return(
        <>
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <br />
            <input type="button" value="POST" onClick={() => {post()}}/>
        </>
    )
}