import { React, useEffect, useState } from "react";
import { Post } from "../post/post";
import useSearch from "./useSearch";
import { Navigate, useNavigate } from "react-router-dom";

export const Search = ({ children }) => {
  const navigate = useNavigate();
  const usuarios = [
    {
      id_usuario: "2YmepLYR5bW5yipaPXq7asmXMPn2",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/quick-11766.appspot.com/o/avatars%2FJose%20Manuel.jpeg?alt=media&token=3c2d9470-a33f-4c54-8df9-cef4767f5835",
      nombre: "Jose Manuel",
    },
    {
      id_usuario: "KshNYRlBJaYvHbyMdp8B4azYjz23",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/quick-11766.appspot.com/o/avatars%2FJavier%20Palomares.gif?alt=media&token=37a2d81e-c2ca-4651-a98a-aa91d1228e21",
      nombre: "Javier Palomares",
    },
  ];

  return (
    <>
      <div className="container mx-auto pt-4 absolute z-200">
        <ul className="list-disc flex-col font-normal text-black bg-white">
          {usuarios.map((usuario) => {
            return (
              <li
                className="text-gray-900 flex text-lg p-4 border-t-2 border-gray-100 hover:bg-gray-100 hover:cursor-pointer transition-all duration-100"
                key={usuario.id_usuario}
                onClick={() => {
                  navigate("/profile?user=" + usuario.id_usuario, {
                    replace: true,
                  });
                  window.location.reload();
                }}
              >
                <img
                  className="w-10 h-10 rounded-full mr-2"
                  src={usuario.avatar}
                  alt="Imagen de usuario"
                ></img>
                <p>{usuario.nombre}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
