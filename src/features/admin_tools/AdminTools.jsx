import React from 'react'
import { NavBar } from '../nav_bar/Navbar'

export const AdminTools = () => {
  return (
    <>
    <NavBar />
    <div className='h-screen w-auto bg-gray-400 dark:bg-quick7 p-4 grid grid-cols-1 gap-3 lg:grid-cols-1 lg:p-10 md:grid-cols-1 md:p-10 sm:grid-cols-1 sm:p-10 '>
                <div className=" bg-white dark:bg-quick4 rounded-lg p-4 dark:outline dark:outline-1 dark:outline-quick5">
                    <div className="font-semibold text-xs lg:text-4xl md:text-lg sm:text-sm text-black dark:text-white w-full">Admin Tools</div>
                    <div className="w-full border dark:border-quick5"></div>
                </div>
            </div>
        </>
  )
}
