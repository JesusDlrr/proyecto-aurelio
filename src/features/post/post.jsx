import React from "react";

export const Post = ({ post }) => {

    //const and var para obtener la fecha de la publicacion
    const sec = post.date.seconds
    const out = new Date(sec * 1000)
    var time = out.toLocaleString('default')

    return (
        <>
            <div className="rounded bg-gray-50 sm:flex sm:space-x-8">
                <div className="space-y-4 text-center sm:mt-0 sm:text-left break-all w-full">
                    {/* Div para la foto de perfil, nombre y numero de followers */}
                    <div className="cursor-pointer hover:bg-green-400 p-4">
                        <div className="flex items-center space-x-4">
                            <img className="w-20 h-20 rounded-full" src="https://tailus.io/sources/blocks/grid-cards/preview/images/avatars/first_user.webp" alt="user avatar" loading="lazy"></img>
                            <div className="">
                                <div>
                                    <a>
                                        <h1 className="text-xl font-sembold text-black">
                                            {post.from.name}
                                        </h1>
                                    </a>
                                </div>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    <h1 href="" class="flex items-center mt-1 space-x-2 text-gray-500 dark:text-gray-400">
                                        {time}
                                    </h1>
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Seccion para el post de las personas */}
                    <div className="p-4">
                        <p className="text-gray-600 mt-10 font-serif">{post.message}</p>
                        <div className="flex items-center space-x-4">
                            <button className="" href=""><svg class="h-6 w-6 ml-2 text-red-500 items-center" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg></button>
                            <h1 className="text-md text-gray-500 dark:text-gray-400">
                                {post.likes}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}