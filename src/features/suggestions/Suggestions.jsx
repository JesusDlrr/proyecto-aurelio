import React from "react";

export const Suggestions = () => {
    return (
        <>
            <div className="bg-white text-white text-center text-3xl py-2 rounded-lg row-span-3 sm:row-span-3 md:row-span-6 ">
                <h1 className="text-black">Suggestions</h1>
                <div className="p-10 flex flex-col items-center text-center group md:lg:xl:border-r md:lg:xl:border-b bg-white">
                    <span className="p-5 rounded-full bg-slate-700 text-white shadow-lg shadow-slate-200"><svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg></span>
                    <p className="text-xl font-medium text-slate-700 mt-3">Username</p>
                    <button type="button" className=" bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-full">Follow</button>
                </div>
            </div>
        </>
    )
}