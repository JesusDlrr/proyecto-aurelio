import React, { useState, useEffect } from "react";
import UseNavbar from "./UseNavbar";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Search } from "../search/Search";
import ReactSwitch from 'react-switch';
import { IoIosSunny } from "react-icons/io";
import { IoIosMoon } from "react-icons/io";
import { IoMdDesktop } from "react-icons/io";
import BuyButton from "../buy_button/BuyButton";

export const NavBar = () => {
  const { searchUsers, search_results } = UseNavbar();
  const [search_value, setSearchValue] = useState("");
  const [search_active, setSearchActive] = useState(false);

  const so = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <>
      {/* Header */}
      <div className="bg-green-700 text-white text-5xl py-4 col-span-1 md:col-span-4 lg:col-span-4 sm:col-span-4">
        <div className="px-6">
          <div className="flex">
            {search_value !== "" && search_active && <Search results={search_results} />}

            <input
              type="search"
              value={search_value}
              className=" relative w-1/4 ml-4 rounded px-3 text-base font-normal text-black hidden lg:block md:block sm:block"
              placeholder="Quick search..."
              aria-label="Search"
              onFocus={() => { setSearchActive(true) }}
              onBlur={() => { setSearchActive(false) }}
              onChange={(e) => { setSearchValue(e.target.value); searchUsers(e.target.value) }}
            />
            <BuyButton />
            <a
              className=" ml-44"
              href="/"
            >
              {/* Home button */}
              <img src="./Quickk.png" className="w-12 rounded-full"></img>
            </a>

            <a
              className="ml-auto text-white duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
              href="#"
              type="button"
            >

              {/* Logout button */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-10 h-10 object-right hidden lg:block md:block sm:block"
                onClick={so}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
