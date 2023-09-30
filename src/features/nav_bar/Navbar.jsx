import React from "react";


export const NavBar = () => {
    return (
        <>
            {/* Header */}
            <div className="bg-green-700 text-white text-5xl py-4 col-span-4">
                <div className="px-6">
                    <div className="flex">
                        <a
                            className="mr-auto pl-5 text-white duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                            href="#">

                            {/* Search button */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>

                        </a>
                        <a
                            className=" content-center text-white duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                            href="#">
                            {/* Home button */}
                            <img src="./Quickk.png" class="w-12 rounded-full mx-auto"></img>
                        </a>
                        <a
                            className="ml-auto text-white duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                            href="#"
                            type="button"
                        >
                            {/* Logout button */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10 object-right">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}