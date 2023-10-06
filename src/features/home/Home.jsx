import React, { useState } from "react";
import useHome from "./useHome";
import homeStyles from "./home.module.css";
import { Post } from "../post/post";
import { NavBar } from "../nav_bar/Navbar";
import { Suggestions } from "../suggestions/Suggestions";
import { Feed } from "../feed/Feed";
import { Profile } from "../profile/Profile";
import { Quick_Thought } from "../quick_thought/Quick_thought";

export const Home = () => {
    const [post_message, setPostMessage] = useState("");
    const {
        post,
        posts
    } = useHome();

    return (
        <>
            <NavBar />
            <div className="h-auto w-auto bg-gray-400 p-10 grid grid-cols-4 gap-3">
                <Profile />
                <Quick_Thought />
                <Suggestions />
                <Feed />
            </div>
        </>
    )
}