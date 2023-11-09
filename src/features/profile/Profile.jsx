import { React, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';


export const Profile = ({ name, avatar }) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    return (
        <>
            {/* Profile */}
            <div className="bg-white text-white text-center text-3xl py-2 rounded-lg row-span-3 sm:row-span-6">
                <div className="p-16 bg-white">
                    <img className="rounded-full cursor-pointer  h-52 w-52 ml-2" src={avatar} onClick={() => { navigate("/profile?user=" + user.uid) }} />
                    <div className="pt-2 mt-3 w-full text-center text-xl text-gray-600">
                        <h1 className="text-xl font-sembold text-black hover:underline hover:cursor-pointer" onClick={() => { navigate("/profile?user=" + user.uid) }}>
                            {name}
                        </h1>
                    </div>
                </div>
                <div className="w-full h-screen antialiased flex flex-col hover:cursor-pointer">
                    <a className="hover:bg-gray-300 bg-white border-t p-3 w-full text-xl text-left text-gray-600 font-semibold" href={"/dms?to=" + user.uid}><i class="fa fa-comment text-gray-600 text-2xl pr-1 pt-1 float-right"></i>Messages</a>
                    <a className="hover:bg-gray-300 bg-white border-t p-3 w-full text-xl text-left text-gray-600 font-semibold" href="#"><i class="fa fa-cog text-gray-600 text-2xl pr-1 pt-1 float-right"></i>Settings</a>
                </div>
            </div>
        </>
    )
}

