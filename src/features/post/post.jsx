import React from "react";
import usePost from "./usePost";

export const Post = ({ post }) => 
{

    return (
        <>
            <div className="p-4 border border-gray-100 rounded bg-gray-50 sm:flex sm:space-x-8 sm:p-8">
                <div className="space-y-4 text-center sm:mt-0 sm:text-left">
                    {/* Div para la foto de perfil, nombre y numero de followers */}
                    <div className="">
                        <div className="flex items-center space-x-4">
                            <img className="w-20 h-20 rounded-full" src="https://tailus.io/sources/blocks/grid-cards/preview/images/avatars/first_user.webp" alt="user avatar" loading="lazy"></img>
                            <div>
                                <div>
                                    <h1 className="text-xl font-sembold text-black hover:underline">
                                        Nombre de usuario aqui
                                    </h1>
                                </div>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    <a href="" class="flex items-center mt-1 space-x-2 text-gray-500 dark:text-gray-400 hover:underline">
                                        <span>Numero de followers aqui Followers</span>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Seccion para el post de las personas */}
                    <div className="">
                        <p class="text-gray-600 mt-10"> <span class="font-serif"></span>{post.message}<span class="font-serif"></span></p>
                        <img class="border rounded-lg" src="https://images.unsplash.com/photo-1572817519612-d8fadd929b00?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80" />
                        <div className="flex items-center space-x-4">
                            <svg class="h-6 w-6 ml-2 text-red-500 items-center" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" onClick={()=>{}}></path>
                            </svg>
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