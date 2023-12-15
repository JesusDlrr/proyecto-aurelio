import { React, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';


export const Profile = ({ name, avatar }) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    return (
        <>
            {/* Profile */}
            <div className=" dark:bg-quick4 dark:outline dark:outline-1 dark:outline-quick5 text-center text-3xl py-2 rounded-lg row-span-3 hidden lg:bg-white lg:dark:bg-quick4 lg:dark:outline lg:dark:outline-1 lg:dark:outline-quick5 lg:text-center lg:text-3xl lg:py-2 lg:rounded-lg lg:row-span-3 lg:block md:bg-white md:dark:bg-quick4 md:dark:outline md:dark:outline-1 md:dark:outline-quick5 md:text-center md:text-3xl md:py-2 md:rounded-lg md:row-span-3 md:block sm:bg-white sm:dark:bg-quick4 sm:dark:outline sm:dark:outline-1 sm:dark:outline-quick5 sm:text-center sm:text-3xl sm:py-2 sm:rounded-lg sm:row-span-3 sm:block ">
                <div className="p-16">
                    <img className="rounded-full cursor-pointer  h-52 w-52 ml-2" src={avatar} onClick={() => { navigate("/profile?user=" + user.uid) }} />
                    <div className="pt-2 mt-3 w-full text-center text-xl text-gray-600">
                        <h1 className="text-xl font-sembold text-black dark:text-white hover:underline hover:cursor-pointer" onClick={() => { navigate("/profile?user=" + user.uid) }}>
                            {name}
                        </h1>
                    </div>
                </div>
                <div className="w-full h-screen antialiased flex flex-col hover:cursor-pointer">
                    <a className="hover:bg-gray-300 dark:hover:bg-quick5 dark:text-white dark:border-quick5 border-t p-3 w-full text-xl text-left text-gray-600 font-semibold" href={"/dms?to=" + user.uid}><i class="fa fa-comment text-gray-600 text-2xl pr-1 pt-1 float-right"></i>Messages</a>
                    <a className="hover:bg-gray-300 dark:hover:bg-quick5 dark:text-white dark:border-quick5 border-t p-3 w-full text-xl text-left text-gray-600 font-semibold" href="#"><i class="fa fa-cog text-gray-600 text-2xl pr-1 pt-1 float-right"></i>Settings</a>
                </div>
            </div>
        </>
    )
}

