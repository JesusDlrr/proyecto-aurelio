import React from "react";

export const Post = ({ message }) => {
    return (
        <>
            <div class="p-6 border border-gray-100 rounded bg-gray-50 sm:flex sm:space-x-8 sm:p-8">
                <img class="w-20 h-20 rounded-full" src="https://tailus.io/sources/blocks/grid-cards/preview/images/avatars/first_user.webp" alt="user avatar" height="220" width="220" loading="lazy"></img>
                    <div class="space-y-4 mt-4 text-center sm:mt-0 sm:text-left">
                        <p class="text-gray-600"> <span class="font-serif">"</span>{message}<span class="font-serif">"</span></p>
                        <div>
                            <h6 class="text-lg font-semibold leading-none">Some user</h6>
                        </div>
                    </div>
            </div>
            <div>
                <p></p>
            </div>
        </>
    )
}