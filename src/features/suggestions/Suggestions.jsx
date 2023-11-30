import React from "react";
import useSuggestion from "./useSuggestions";
import { useNavigate } from "react-router-dom";

export const Suggestions = () => {
    const { users } = useSuggestion();
    const navigate = useNavigate()

    return (
        <>
            <div className="bg-white text-white dark:bg-zinc-700 dark:text-white text-center text-3xl py-2 rounded-lg row-span-3 sm:row-span-3 md:row-span-6 ">
                <h1 className="text-black dark:text-white">Suggestions</h1>
                <div className="dark:bg-zinc-700 pt-6 flex flex-col items-center text-center group sm:md:lg:xl:border-b bg-white">
                    <ul className="w-full ">
                        {
                            users.map((user) => {
                                return (<>
                                    {Math.random() < 0.5 && <li
                                        className="text-gray-900 dark:text-white flex text-lg p-4 border-t-2 border-gray-100 hover:bg-gray-100 hover:cursor-pointer transition-all duration-100"
                                        key={user.uid}
                                        onMouseDown={(e) => { e.preventDefault() }}
                                        onClick={() => {
                                            navigate("/profile?user=" + user.uid, {
                                                replace: true,
                                            });
                                            window.location.reload();
                                        }}
                                    >
                                        <img
                                            className="w-10 h-10 rounded-full mr-2"
                                            src={user.avatar}
                                            alt="Imagen de user"
                                        ></img>
                                        <p>{user.name}</p>
                                    </li>}
                                </>)
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}