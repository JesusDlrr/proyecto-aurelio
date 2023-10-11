import React, { useContext, useState } from "react";
import useHome from "./useHome";
import { NavBar } from "../nav_bar/Navbar";
import { Suggestions } from "../suggestions/Suggestions";
import { Feed } from "../feed/Feed";
import { Profile } from "../profile/Profile";
import { Quick_Thought } from "../quick_thought/Quick_thought";
import { UserContext } from "../../App";

export const Home = () => {
    const [post_message, setPostMessage] = useState("");
    const {user} = useContext(UserContext);
    const {
        post,
        posts
    } = useHome();

    return (
        <>
            <NavBar />
            <div className="h-auto w-auto bg-gray-400 p-10 grid grid-cols-4 gap-3">
                <Profile user_name={user.displayName}/>
                <Quick_Thought />
                <Suggestions />
                <Feed />
            </div>
        </>
    )
}