import {React} from "react";
import { NavBar } from "../nav_bar/Navbar";
import { Feed } from "../feed/Feed";
import { Quick_Thought } from "../quick_thought/Quick_thought";
import { UserContext } from "../../App";
import UseProfile from "./UseProfile";

export const ProfilePage = ({ name, avatar }) => {
    const { user_name, user_avatar } = UseProfile();
    return (
        <>
        <NavBar/>
        <div className="relative w-full h-[78px] bg-cover bg-no-repeat bg-[top]"/>
        <img className="relative rounded-full w-40 top-20 z-50 left-20 border-gray-400 border-8" src="https://districts.neocities.org/onerat.gif"/>
        <div className="h-auto w-auto bg-gray-400 p-10 grid grid-cols-4 gap-3">
        <div className="bg-white text-white text-center text-3xl py-2 rounded-lg row-span-3 sm:row-span-6 mt-10">
                <div className="sticky p-5 bg-white">
                    <div className="pt-2 mt-3 w-full text-left text-xl text-gray-600">
                        <h1 className="text-xl font-sembold text-black">
                            {user_name}
                        </h1>
                    </div>
                    <div className="w-full text-left text-xl text-gray-600">
                            <span className="flex items-left mt-1 space-x-2 text-gray-500 dark:text-gray-400">Numero de followers</span>
                    </div>
                </div>
                <div className="w-full h-screen antialiased flex flex-col hover:cursor-pointer">
                    <a className="hover:bg-gray-300 bg-white border-t p-3 w-full text-xl text-left text-gray-600 font-semibold" href="/dms" target="_blank"><i class="fa fa-comment text-gray-600 text-2xl pr-1 pt-1 float-right"></i>Messages</a>
                    <a className="hover:bg-gray-300 bg-white border-t p-3 w-full text-xl text-left text-gray-600 font-semibold" href="" target="_blank"><i class="fa fa-cog text-gray-600 text-2xl pr-1 pt-1 float-right"></i>Settings</a>
                </div>
            </div>
                {/* <Quick_Thought />
                <Feed /> */}
            </div>
        </>   
    )
}

