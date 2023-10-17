import React, { useContext } from "react";
import { NavBar } from "../nav_bar/Navbar";
import { Suggestions } from "../suggestions/Suggestions";
import { Feed } from "../feed/Feed";
import { Profile } from "../profile/Profile";
import { Quick_Thought } from "../quick_thought/Quick_thought";
import UseHome from "./useHome";
import { UserContext } from "../../App";

export const Home = () => {
    const {user} = useContext(UserContext);
    const {user_name, user_avatar} = UseHome();
    return (
        <>
            <NavBar />
            <div className="h-auto w-auto bg-gray-400 p-10 grid grid-cols-4 gap-3">
                <Profile name={user_name} avatar={user_avatar}/>
                <Quick_Thought />
                <Suggestions />
                <Feed />
            </div>
        </>
    )
}