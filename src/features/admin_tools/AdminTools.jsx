import React, { useEffect, useState } from 'react'
import { NavBar } from '../nav_bar/Navbar'
import useAdminTools from './useAdminTools'
import { Card, Typography } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

export const AdminTools = () => {
  const [selected_post, setSelectedPost] = useState(null)
  const [table_rows, setTableRows] = useState(null)
  const TABLE_HEAD = ['ID', 'Author', 'Date', 'Actions'];
  const navigate = useNavigate()
  const {
    flagged_posts
  } = useAdminTools()

  useEffect(() => {
    if (flagged_posts !== null) {
      console.log(flagged_posts)
      setTableRows(flagged_posts)
    }
  }, [flagged_posts])

  useEffect(() => {
    console.log(selected_post)
  }, [selected_post])

  return (
    <>
      <NavBar />
      <div className='h-screen w-auto bg-gray-400 dark:bg-quick7 p-4 grid grid-cols-1 gap-3 lg:grid-cols-1 lg:p-10 md:grid-cols-1 md:p-10 sm:grid-cols-1 sm:p-10 '>
        <div className=" bg-white dark:bg-quick4 rounded-lg p-4 dark:outline dark:outline-1 dark:outline-quick5">
          <div className="font-semibold text-xs lg:text-3xl md:text-md sm:text-sm text-black dark:text-white w-full">Admin Tools</div>
          <div className="flex w-full p-3 gap-5">
            <Card className="h-full w-full overflow-scroll">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table_rows !== null && table_rows.map((post) => (
                    <tr key={post.id} className="even:bg-slate-100">
                      <td className="p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal text-blue-800 hover:underline cursor-pointer"
                          onClick={() => { setSelectedPost(post) }}
                        >
                          {post.id}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal hover:underline cursor-pointer"
                          onClick={() => { navigate('/profile?user=' + post.author.id) }}
                        >
                          {post.author.name}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {new Date(post.date._seconds).toString()}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <button>
                          Unflag
                        </button>
                        <button>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
            <div className='w-1/3'>
              {
                selected_post !== null &&
                <div className="w-full">
                  {
                    selected_post.original_post !== undefined && <p>This is a repost of {selected_post.original_post.id}</p>
                  }
                  <p className="text-gray-600 font-serif dark:text-white lg:pb-8 content-start">

                    {
                      selected_post.is_repost ?
                        selected_post.original_post.content
                        :
                        selected_post.content

                    }
                  </p>
                  {
                    selected_post.media !== undefined &&
                    <>
                      {
                        selected_post.original_post === undefined ?
                          <div className={selected_post.media.length > 1 && 'grid grid-cols-2 gap-1'}>
                            {
                              selected_post.media.length > 1 ?
                                selected_post.media.slice(0, 4).map((file) => (
                                  <img src={file.url} className='rounded-md bg-black h-72 object-cover object-center w-full' alt="" />
                                ))
                                :
                                selected_post.media.length > 0 && <img src={selected_post.media[0].url} className='rounded-md object-cover' alt="" />
                            }
                          </div>
                          :
                          <div className={selected_post.original_post.media.length > 1 && 'grid grid-cols-2 gap-1'}>
                            {
                              selected_post.original_post.media.length > 1 ?
                                selected_post.media.slice(0, 4).map((file) => (
                                  <img src={file.url} className='rounded-md bg-black h-72 object-cover object-center w-full' alt="" />
                                ))
                                :
                                selected_post.original_post.media.length > 0 && <img src={selected_post.original_post.media[0].url} className='rounded-md object-cover w- max-w-xs' alt="" />
                            }
                          </div>
                      }
                    </>
                  }
                  <div className="flex gap-x-5 pt-7">
                    <div className="flex items-center space-x-4">
                      {/* <span onClick={() => {
                        setUpdatingLikes(true);
                        !updating_likes &&
                          selected_post.is_repost ?
                          (selected_post.original_post.liked ? unlike(selected_post.original_post.id) : like(selected_post.original_post.id))
                          :
                          (selected_post.liked ? unlike(selected_post.id) : like(selected_post.id))
                      }}>
                        {
                          updating_likes ?
                            <Spinner className="h-6 w-6" />
                            :
                            selected_post.is_repost ?
                              <svg class="cursor-pointer h-6 w-6 ml-2 text-red-500 items-center" viewBox="0 0 24 24" fill={selected_post.original_post.liked ? "red" : "none"} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                              :
                              <svg class="cursor-pointer h-6 w-6 ml-2 text-red-500 items-center" viewBox="0 0 24 24" fill={selected_post.liked ? "red" : "none"} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                        }
                      </span> */}
                      <h1 className="text-md text-gray-500 dark:text-gray-400">
                        {
                          selected_post.original_post === undefined ?
                            selected_post.likes + ' likes'
                            :
                            selected_post.original_post.likes + ' likes'
                        }
                      </h1>
                    </div>
                    <div className="flex items-center space-x-4">
                      {/* {
                        < span onClick={() => {
                          setUpdatingReposts(true);
                          !updating_reposts &&
                            selected_post.is_repost ?
                            (selected_post.original_post.reposted ? unrepost(selected_post.original_post.id) : repost(selected_post.original_post.id))
                            :
                            (selected_post.reposted ? unrepost(selected_post.id) : repost(selected_post.id))
                        }}>
                          {
                            updating_reposts ?
                              <Spinner className="h-6 w-6" />
                              :
                              selected_post.is_repost ?
                                <svg className={`cursor-pointer h-6 w-6 ml-2 items-center ${selected_post.original_post.reposted ? "fill-green-400" : "dark:fill-white"}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 7a1 1 0 0 0-1-1h-8v2h7v5h-3l3.969 5L22 13h-3V7zM5 17a1 1 0 0 0 1 1h8v-2H7v-5h3L6 6l-4 5h3v6z" /></svg>
                                :
                                <svg className={`cursor-pointer h-6 w-6 ml-2 items-center ${selected_post.reposted ? "fill-green-400" : "dark:fill-white"}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 7a1 1 0 0 0-1-1h-8v2h7v5h-3l3.969 5L22 13h-3V7zM5 17a1 1 0 0 0 1 1h8v-2H7v-5h3L6 6l-4 5h3v6z" /></svg>
                          }
                        </span>
                      } */}
                      <h1 className="text-md text-gray-500 dark:text-gray-400">
                        {
                          selected_post.original_post === undefined ?
                            selected_post.reposts + ' reposts'
                            :
                            selected_post.original_post.reposts + ' reposts'
                        }
                      </h1>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
