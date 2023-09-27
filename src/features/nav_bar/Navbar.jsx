import React from "react";

export const NavBar = () => {
    return (
        <>
            {/* Header */}
            <div className="bg-green-700 text-white text-center text-5xl py-4 col-span-4">
                <i><box-icon name='search-alt' color='#ffffff' ></box-icon></i>
                <box-icon name='home' color='#ffffff' ></box-icon>
                <box-icon name='log-out-circle' color='#ffffff' ></box-icon>
            </div>
        </>
    )
}