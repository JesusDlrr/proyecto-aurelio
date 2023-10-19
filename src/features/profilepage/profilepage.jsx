import { React } from "react";
import { NavBar } from "../nav_bar/Navbar";
import { Feed } from "../feed/Feed";
import { Quick_Thought } from "../quick_thought/Quick_thought";
import { UserContext } from "../../App";
import UseProfile from "./UseProfile";

export const ProfilePage = ({ name, avatar }) => {
    const { user_name, user_avatar } = UseProfile();
    return (
        <>
            <NavBar />
            <div className="bg-white h-20 w-full" />
            <div className="sm:row-span-6 md:row-span-3">
                    <img className="absolute rounded-full w-40 top-24 z-50 left-24 mt-2 border-gray-400 border-8 sm:row-span-6" src="https://districts.neocities.org/onerat.gif" alt="user avatar" loading="lazy"/>
                    <div className="mx-60 px-8">
                        <div className="absolute">
                            <a>
                                <h1 className="text-2xl font-sembold text-black">
                                    Name of the person
                                </h1>
                            </a>
                        </div>
                        <span className="text-lg text-black absolute">
                            <h1 href="" class="flex items-center mt-8 space-x-2 text-black">
                                Followers of the person 
                            </h1>
                        </span>
                    </div>
                </div>
          <div className="h-auto w-auto bg-gray-400 p-10 grid grid-cols-4 gap-3 sm:row-span-6">
                <div className="bg-white text-white text-center text-3xl rounded-lg row-span-3 mt-20 max-h-24">
                    <div className="flex flex-col hover:cursor-pointer">
                        <a className="hover:bg-gray-300 bg-white border-t p-3 w-full text-xl text-left text-black font-semibold rounded-lg rounded-b-none" href="/dms" target="_blank">Messages</a>
                        <a className="hover:bg-gray-300 bg-white border-t p-3 w-full text-xl text-left text-black font-semibold rounded-lg rounded-t-none border-black" href="" target="_blank">Settings</a>
                    </div>
                </div>
                <div className="col-span-3 mt-20">
                    <Quick_Thought />
                    <Feed />
                </div>
            </div>
        </>
    )
}

