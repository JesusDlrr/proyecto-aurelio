import { React } from 'react';
import { useNavigate } from 'react-router-dom';


export const Profile = ({ name, avatar }) => {
    const navigate = useNavigate();
    return (
        <>
            {/* Profile */}
            <div className="bg-white text-white text-center text-3xl py-2 rounded-lg row-span-3 sm:row-span-6">
                <div className="sticky p-16 bg-white">
                    <img className="rounded-full cursor-pointer  h-52 w-52 ml-2" src={avatar} onClick={()=>{navigate("/profile")}}/>
                    <div className="pt-2 mt-3 w-full text-center text-xl text-gray-600">
                        <h1 className="text-xl font-sembold text-black hover:underline">
                            {name}
                        </h1>
                    </div>
                    <div className="pt-2 mt-2 w-full text-center text-xl text-gray-600 hover:underline">
                            <span className="flex items-center mt-1 space-x-2 text-gray-500 dark:text-gray-400 hover:underline">Numero de followers aqui Followers</span>
                    </div>
                </div>
                <div className="w-full h-screen antialiased flex flex-col hover:cursor-pointer">
                    <a className="hover:bg-gray-300 bg-white border-t p-3 w-full text-xl text-left text-gray-600 font-semibold" href="/dms" target="_blank"><i class="fa fa-comment text-gray-600 text-2xl pr-1 pt-1 float-right"></i>Messages</a>
                    <a className="hover:bg-gray-300 bg-white border-t p-3 w-full text-xl text-left text-gray-600 font-semibold" href="" target="_blank"><i class="fa fa-cog text-gray-600 text-2xl pr-1 pt-1 float-right"></i>Settings</a>
                </div>
            </div>
        </>
    )
}

