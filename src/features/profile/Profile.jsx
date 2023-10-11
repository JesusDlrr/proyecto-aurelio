import {React} from 'react';


export const Profile = ({user_name}) => {
    return(
        <>
        {/* Profile */}
<div className="bg-white text-white text-center text-3xl py-2 rounded-lg row-span-3 sm:row-span-3 md:row-span-3 h-screen">
<div className="p-24 bg-white top-0">
    <img className="border border-indigo-200 shadow-lg rounded-full overflow-hidden" src="http://lilithaengineering.co.za/wp-content/uploads/2017/08/person-placeholder.jpg" />
    <div className="pt-2 mt-3 w-full text-center text-xl text-gray-600">
        <h1 className="text-xl font-sembold text-black hover:underline">
            {user_name}
        </h1>
    </div>
    <div className="pt-2 mt-2 w-full text-center text-xl text-gray-600 hover:underline">
        <a href="" class="flex items-center mt-1 space-x-2 text-gray-500 dark:text-gray-400 hover:underline">
            <span>Numero de followers aqui Followers</span>
        </a>
    </div>
</div>
<div className="w-full h-screen antialiased flex flex-col hover:cursor-pointer">
    <a className="hover:bg-gray-300 bg-white border-t p-3 w-full text-xl text-left text-gray-600 font-semibold" href="" target="_blank"><i class="fa fa-comment text-gray-600 text-2xl pr-1 pt-1 float-right"></i>Messages</a>
    <a className="hover:bg-gray-300 bg-white border-t p-3 w-full text-xl text-left text-gray-600 font-semibold" href="" target="_blank"><i class="fa fa-cog text-gray-600 text-2xl pr-1 pt-1 float-right"></i>Settings</a>
</div>
</div>
        </>
    )
}

