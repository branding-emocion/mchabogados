// "use client";
// import React, { useEffect, useState } from "react";
// import Login from "./Login";
// import useAuthState from "@/lib/useAuthState";
// import { auth } from "@/firebase/firebaseClient";
// import Link from "next/link";
// import {
//   BookOpenText,
//   Cross,
//   DollarSign,
//   File,
//   MessageCirclePlus,
//   MonitorXIcon,
//   Users,
//   WallpaperIcon,
//   Warehouse,
//   YoutubeIcon,
// } from "lucide-react";
// import { signOut } from "firebase/auth";
// import { usePathname, useRouter } from "next/navigation";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// const DashboardLayout = ({ children }) => {
//   const [{ user, claims }, loading, error] = useAuthState(auth);
//   const [Comentarios, setComentarios] = useState([]);
//   const pathname = usePathname();
//   const router = useRouter();

//   if (pathname == "/Admin/Usuarios" && claims?.UsuarioBase) {
//     router.replace("/Admin");
//   }

//   const menu = [
//     {
//       name: "Usuarios",
//       link: "/Admin/Usuarios",
//       icon: <Users className="w-6 h-6 text-white" />,
//       hidden: !claims?.isSuperAdmin,
//     },
//     {
//       name: "Carrousel",
//       link: "/Admin/Carrousel",
//       icon: <WallpaperIcon className="w-6 h-6 text-white" />,
//       hidden: !(claims?.isAdmin || claims?.isSuperAdmin),
//     },
//     {
//       name: "Calculadoras",
//       link: "/Admin/Calculadoras",
//       icon: <Warehouse className="w-6 h-6 text-white" />,
//       hidden: !(claims?.isAdmin || claims?.isSuperAdmin),
//     },
//     {
//       name: "ISO",
//       link: "/Admin/Normativas",
//       icon: <File className="w-6 h-6 text-white" />,
//       hidden: !(claims?.isAdmin || claims?.isSuperAdmin),
//     },
//     {
//       name: "Nomina",
//       link: "/Admin/Nomina",
//       icon: <DollarSign className="w-6 h-6 text-white" />,
//       hidden: !(claims?.isAdmin || claims?.isSuperAdmin),
//     },

//     {
//       name: "Laudos",
//       link: "/Admin/Laudos",
//       icon: <File className="w-6 h-6 text-white" />,
//       hidden: !(claims?.isAdmin || claims?.isSuperAdmin),
//     },
//     {
//       name: "Expedientes",
//       link: "/Admin/Expedientes",
//       icon: <MessageCirclePlus className="w-6 h-6 text-white" />,
//       hidden: !(claims?.isAdmin || claims?.isSuperAdmin),
//     },
//     {
//       name: "Solicitudes",
//       link: "/Admin/Solicitudes",
//       icon: <Cross className="w-6 h-6 text-white" />,
//       // hidden: !(claims?.isAdmin || claims?.isSuperAdmin),
//     },
//     {
//       name: "Escritos",
//       link: "/Admin/Escritos",
//       icon: <File className="w-6 h-6 text-white" />,
//     },
//   ];

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error</p>;

//   if (!user) return <Login />;
//   return (
//     <div>
//       <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50  text-black ">
//         <div className="fixed flex flex-col left-0 w-14 hover:w-64 md:w-64 bg-[#004f51] h-full text-white transition-all duration-300 border-none z-10 sidebar">
//           <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
//             <ul className="flex flex-col py-4 space-y-1">
//               <li>
//                 <div className="flex flex-row items-center h-11 focus:outline-none   text-white-600 hover:text-white-800 border-l-4 border-transparent    pr-6">
//                   <div className="inline-flex justify-center items-center ml-4">
//                     {/* <User className="w-6 h-6 text-white" /> */}
//                     <Avatar className="h-6 w-6 lg:w-9 lg:h-9">
//                       <AvatarImage src="https://github.com/shadcn.png" />
//                       <AvatarFallback>CN</AvatarFallback>
//                     </Avatar>
//                   </div>
//                   <span className="ml-2 text-sm tracking-wide truncate uppercase">
//                     {user?.displayName || "Admin"}
//                   </span>
//                 </div>
//               </li>

//               <li className="px-5 hidden md:block">
//                 <div className="flex flex-row items-center h-8">
//                   <div className="text-sm font-light tracking-wide text-gray-p00 uppercase">
//                     Dashboard
//                   </div>
//                 </div>
//               </li>
//               {menu.map((men, key) => (
//                 <li key={key}>
//                   {!men.hidden && (
//                     <>
//                       <Link
//                         href={men.link}
//                         className={` flex flex-row items-center h-11 focus:outline-none uppercase hover:bg-blue-800  text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500  pr-6 ${
//                           pathname.includes(men.link) &&
//                           "bg-blue-800 border-blue-500 "
//                         }`}
//                       >
//                         <span className="inline-flex justify-center items-center ml-4">
//                           {men.icon}
//                         </span>
//                         <span className="ml-2 text-sm tracking-wide truncate uppercase">
//                           {men.name}
//                         </span>

//                         {men?.CantComentarios && (
//                           <span className="ml-2 text-sm tracking-wide truncate bg-orange-700 px-2  rounded-full">
//                             {Comentarios?.length || 0}
//                           </span>
//                         )}
//                       </Link>
//                     </>
//                   )}
//                 </li>
//               ))}

//               <li>
//                 <div
//                   onClick={() => signOut(auth)}
//                   className="cursor-pointer relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800  text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500  pr-6"
//                 >
//                   <span className="inline-flex justify-center items-center ml-4">
//                     <MonitorXIcon className="w-6 h-6 text-white" />{" "}
//                   </span>
//                   <span className="ml-2 text-sm tracking-wide truncate">
//                     Cerrar sesión
//                   </span>
//                 </div>
//               </li>
//             </ul>
//             <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">
//               Copyright @{new Date().getFullYear()} -{" "}
//               {new Date().getFullYear() + 1}
//             </p>
//           </div>
//         </div>
//         {/* ./Sidebar */}
//         <div className=" ml-14  mb-6 md:ml-64 p-4 ">{children}</div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

"use client";
import { useState } from "react";
import Login from "./Login";
import useAuthState from "@/lib/useAuthState";
import { auth } from "@/firebase/firebaseClient";
import Link from "next/link";
import {
  Cross,
  DollarSign,
  File,
  MessageCirclePlus,
  MonitorXIcon,
  Users,
  WallpaperIcon,
  Warehouse,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DashboardLayout = ({ children }) => {
  const [{ user, claims }, loading, error] = useAuthState(auth);
  const [Comentarios, setComentarios] = useState([]);
  const pathname = usePathname();
  const router = useRouter();

  if (pathname == "/Admin/Usuarios" && claims?.UsuarioBase) {
    router.replace("/Admin");
  }

  console.log("claims", claims);

  const menu = [
    {
      name: "Usuarios",
      link: "/Admin/Usuarios",
      icon: <Users className="w-5 h-5" />,
      hidden: !claims?.isSuperAdmin,
    },
    {
      name: "Carrousel",
      link: "/Admin/Carrousel",
      icon: <WallpaperIcon className="w-5 h-5" />,
      hidden: !(claims?.isAdmin || claims?.isSuperAdmin),
    },
    {
      name: "Calculadoras",
      link: "/Admin/Calculadoras",
      icon: <Warehouse className="w-5 h-5" />,
      hidden: !(claims?.isAdmin || claims?.isSuperAdmin),
    },
    {
      name: "ISO",
      link: "/Admin/Normativas",
      icon: <File className="w-5 h-5" />,
      hidden: !(claims?.isAdmin || claims?.isSuperAdmin),
    },
    {
      name: "Nomina",
      link: "/Admin/Nomina",
      icon: <DollarSign className="w-5 h-5" />,
      hidden: !(claims?.isAdmin || claims?.isSuperAdmin),
    },
    {
      name: "Laudos",
      link: "/Admin/Laudos",
      icon: <File className="w-5 h-5" />,
      hidden: !(claims?.isAdmin || claims?.isSuperAdmin),
    },
    {
      name: "Expedientes",
      link: "/Admin/Expedientes",
      icon: <MessageCirclePlus className="w-5 h-5" />,
      hidden: !(claims?.isAdmin || claims?.isSuperAdmin),
    },
    {
      name: "Solicitudes",
      link: "/Admin/Solicitudes",
      icon: <Cross className="w-5 h-5" />,
      // hidden: !(claims?.isAdmin || claims?.isSuperAdmin),
    },
    {
      name: "Escritos",
      link: "/Admin/Escritos",
      icon: <File className="w-5 h-5" />,
    },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  if (!user) return <Login />;
  return (
    <div>
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-black">
        <div className="fixed flex flex-col left-0 w-14 hover:w-64 md:w-64 bg-black h-full text-white transition-all duration-300 border-none z-10 sidebar shadow-2xl">
          <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
            <ul className="flex flex-col py-6 space-y-1">
              <li>
                <div className="flex flex-row items-center h-14 focus:outline-none text-white border-l-4 border-transparent px-6 mb-4">
                  <div className="inline-flex justify-center items-center">
                    <Avatar className="h-8 w-8 lg:w-10 lg:h-10 ring-2 ring-gray-600">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback className="bg-gray-700 text-white">
                        {user?.displayName?.charAt(0) || "A"}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <span className="ml-3 text-sm font-medium tracking-wide truncate">
                    {user?.displayName || "Admin"}
                  </span>
                </div>
              </li>

              <li className="px-6 hidden md:block mb-2">
                <div className="flex flex-row items-center h-8">
                  <div className="text-xs font-semibold tracking-wider text-gray-400 uppercase border-b border-white pb-2 w-full">
                    Dashboard
                  </div>
                </div>
              </li>

              {menu.map((men, key) => (
                <li key={key}>
                  {!men.hidden && (
                    <>
                      <Link
                        href={men.link}
                        className={`group flex flex-row items-center h-12 focus:outline-none hover:bg-gray-900 text-gray-300 hover:text-white border-l-4 border-transparent hover:border-white transition-all duration-200 px-6 mx-2 rounded-r-lg ${
                          pathname.includes(men.link) &&
                          "bg-gray-900 border-white text-white shadow-lg"
                        }`}
                      >
                        <span className="inline-flex justify-center items-center text-gray-400 group-hover:text-white">
                          {men.icon}
                        </span>
                        <span className="ml-3 text-sm font-medium tracking-wide truncate">
                          {men.name}
                        </span>

                        {men?.CantComentarios && (
                          <span className="ml-auto text-xs bg-red-600 text-white px-2 py-1 rounded-full font-semibold">
                            {Comentarios?.length || 0}
                          </span>
                        )}
                      </Link>
                    </>
                  )}
                </li>
              ))}

              <li className="mt-8">
                <div
                  onClick={() => signOut(auth)}
                  className="group cursor-pointer flex flex-row items-center h-12 focus:outline-none hover:bg-red-900 text-gray-300 hover:text-white border-l-4 border-transparent hover:border-red-500 transition-all duration-200 px-6 mx-2 rounded-r-lg"
                >
                  <span className="inline-flex justify-center items-center text-gray-400 group-hover:text-red-400">
                    <MonitorXIcon className="w-5 h-5" />
                  </span>
                  <span className="ml-3 text-sm font-medium tracking-wide truncate">
                    Cerrar sesión
                  </span>
                </div>
              </li>
            </ul>

            <div className="border-t border-white pt-4">
              <p className="mb-6 px-6 py-2 hidden md:block text-center text-xs text-white font-medium">
                © {new Date().getFullYear()} - {new Date().getFullYear() + 1}
                <br />
                <span className="text-gray-600">
                  Todos los derechos reservados
                </span>
              </p>
            </div>
          </div>
        </div>
        {/* ./Sidebar */}
        <div className="ml-14 mb-6 md:ml-64 p-6">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
