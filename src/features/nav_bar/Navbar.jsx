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
  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "system");
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const element = document.documentElement;

  function onReload() {
    if (localStorage.theme === 'dark' || (!("theme" in localStorage) && darkQuery.matches)) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark")
    }
  }

  onReload();

  useEffect(() => {
    switch (theme) {
      case 'dark':
        element.classList.add('dark')
        localStorage.setItem('theme', 'dark')
        break;
      case 'light':
        element.classList.remove('dark')
        localStorage.setItem('theme', 'light')
        break;
      default:
        localStorage.removeItem('theme')
        onReload()
        break;
    }
  }, [theme])

  darkQuery.addEventListener("change", (e) => {
    if (!("theme" in localStorage)) {
      if (e.matches) {
        element.classList.add('dark');
      } else {
        element.classList.remove('dark');
      }
    }
  })



  const options = [
    {
      icon: "sunny",
      text: "light"
    },
    {
      icon: "moon",
      text: "dark"
    },
    {
      icon: "desktop-outline",
      text: "system"
    }
  ]

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
            <button
              className="pl-3 text-white duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
              href="/"
            >
              {/* Search button */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
            {search_value !== "" && search_active && <Search results={search_results} />}
            <BuyButton />
            <input
              type="search"
              value={search_value}
              className=" relative w-1/4 ml-6 rounded px-3 text-base font-normal text-black hidden lg:block md:block sm:block"
              placeholder="Quick search..."
              aria-label="Search"
              onFocus={() => { setSearchActive(true) }}
              onBlur={() => { setSearchActive(false) }}
              onChange={(e) => { setSearchValue(e.target.value); searchUsers(e.target.value) }}
            />

            <a
              className="text-white m-auto duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
              href="/"
            >

              {/* Home button */}
              <img src="./Quickk.png" className=" w-12 rounded-full"></img>
            </a>

            {/* Dark mode button */}
            <div className="flex rounded dark:bg-quick7  text-black dark:text-white bg-gray-400">
              {
                options?.map(opt => (

                  <button key={opt.text} onClick={() => setTheme(opt.text)} className={`w-8 h-8 leading-9 text-xl rounded-full m-1 ${theme === opt.text && "text-green-400"}`}>
                    <ion-icon name={opt.icon}></ion-icon>
                  </button>
                ))
              }
            </div>
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
                className="w-10 h-10 object-right"
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
