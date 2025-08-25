"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BadgePlus, PencilIcon, TrashIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import ModalBlog from "./ModalBlog";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db, storage } from "@/firebase/firebaseClient";
import Image from "next/image";
import { deleteObject, listAll, ref } from "firebase/storage";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";

const Blog = () => {
  const [OpenModal, setOpenModal] = useState({
    Visible: false,
    InfoEditar: {},
  });

  const [Blog, setBlog] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "Blog"), orderBy("CreatAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBlog(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      {OpenModal.Visible && (
        <ModalBlog OpenModal={OpenModal} setOpenModal={setOpenModal} />
      )}
      <div className="space-y-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Bienvenido al Blog</CardTitle>

            <CardDescription>
              En esta sección, puedes ver y modificar las publicaciones del blog
              de la página.
            </CardDescription>
            <div>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  console.log(e);
                  setOpenModal({
                    Visible: true,
                    InfoEditar: {},
                  });
                }}
                className="space-x-2"
              >
                <BadgePlus />
                <p>Agregar nuevo </p>
              </Button>
            </div>
          </CardHeader>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Lista de blogs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3  ">
              {Blog?.map((blog) => (
                <div key={blog.id} className="  w-full mx-auto cursor-pointer">
                  <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
                    <section className="relative w-full h-[205px]">
                      <Image
                        className="rounded-t-lg "
                        fill
                        src={blog?.Imagenes[0] || ""}
                        alt="imageBlog"
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    </section>

                    <div className="p-5">
                      <div>
                        <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">
                          {blog?.TituloBlog}
                        </h5>
                      </div>
                      <div
                        className="quill-content line-clamp-4 text-justify"
                        dangerouslySetInnerHTML={{
                          __html: blog?.ContenidoBLog,
                        }}
                      />

                      {/* <a
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
                    href="#"
                  >
                    Read more
                  </a> */}
                    </div>

                    <div className="flex items-center justify-center gap-x-2 pb-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenModal({
                            Visible: true,
                            InfoEditar: blog,
                          });
                        }}
                        className="bg-blue-500 space-x-1.5 rounded-lg  px-4 py-1.5 text-white duration-100 hover:bg-blue-600"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={async (e) => {
                          e.preventDefault();

                          const Confirm = confirm(
                            `Esta Seguro de eliminar el blog: ${blog.TituloBlog}`
                          );
                          if (Confirm) {
                            const ImgRef = ref(
                              storage,
                              `ImagenesBlog/${blog?.TituloBlog?.replace(
                                /\s+/g,
                                "_"
                              )}/`
                            );

                            await deleteDoc(doc(db, "Blog", `${blog.id}`));

                            // Lista todos los objetos (archivos) en el directorio
                            listAll(ImgRef)
                              .then((res) => {
                                res.items.forEach((itemRef) => {
                                  // Ahora debes borrar cada objeto (archivo)
                                  deleteObject(itemRef).catch((error) => {
                                    // Maneja cualquier error
                                    alert(
                                      ` Error al eliminar ${itemRef.fullPath}`
                                    );
                                    console.log(
                                      `Error al eliminar ${itemRef.fullPath}`,
                                      error
                                    );
                                  });
                                });
                              })
                              .catch((error) => {
                                // Maneja cualquier error
                                console.error(
                                  "Error al listar los objetos",
                                  error
                                );
                              });
                          }
                        }}
                        className="bg-red-500 space-x-1.5 rounded-lg  px-4 py-1.5 text-white duration-100 hover:bg-red-600"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex justify-center space-x-2 py-4">
                      <FacebookShareButton
                        url={`https://www.alvainmobiliarios.com/Blog/${blog.id}`}
                      >
                        <FacebookIcon size={32} round />
                      </FacebookShareButton>
                      <TwitterShareButton
                        url={`https://www.alvainmobiliarios.com/Blog/${blog.id}`}
                      >
                        <TwitterIcon size={32} round />
                      </TwitterShareButton>
                      <WhatsappShareButton
                        url={`https://www.alvainmobiliarios.com/Blog/${blog.id}`}
                      >
                        <WhatsappIcon size={32} round />
                      </WhatsappShareButton>
                      <LinkedinShareButton
                        url={`https://www.alvainmobiliarios.com/Blog/${blog.id}`}
                      >
                        <LinkedinIcon size={32} round />
                      </LinkedinShareButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Blog;
