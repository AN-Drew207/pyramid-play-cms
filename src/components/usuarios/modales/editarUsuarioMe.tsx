/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { XIcon } from "@heroicons/react/outline";
import React from "react";
import { useForm } from "react-hook-form";
import { TipoUsuario } from "../tipoUsuario";
import { MinusIcon, PlusIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Comisiones, Datos, Ingreso, Permisos } from "./crear-editar";

export default function EditarUsuarioMe({ id, hide, onUpdate }: any) {
  const { register, setValue, handleSubmit } = useForm();
  const [section, setSection] = React.useState("ingreso");
  const [loading, setLoading] = React.useState(false);
  const [categories, setCategories] = React.useState([]);

  const [user, setUser] = React.useState<any>(null);
  const secciones = [
    { text: "Ingreso", value: "ingreso" },
    { text: "Datos Personales", value: "datos" },
  ];
  const [sectionVisited, setSectionVisited] = React.useState({
    ingreso: true,
    datos: false,
    permisos: false,
    comisiones: false,
  });

  React.useEffect(() => {
    if (id) {
      axios
        .get("/users/me")
        .then((response: any) => {
          const user = response.data.data;
          setUser(user);
        })
        .catch((error) => {
          console.log(error);
          if (
            error.response.data.message.includes("Wrong credentials provided")
          ) {
            toast.error("Credenciales inválidas, revise e intente nuevamente.");
          } else {
            toast.error("Hubo un error, intente nuevamente.");
          }
        })
        .finally(() => {
          onUpdate && onUpdate();
          setLoading(false);
        });
    }
  }, []);

  React.useEffect(() => {
    axios
      .get(`/games/categories/group`)
      .then((response) => {
        console.log(response, "categories");
        setCategories(response.data.data.items);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  React.useEffect(() => {
    setValue("username", user?.username);
    setValue("email", user?.email);
    if (section === "datos" && !sectionVisited["datos"]) {
      setSectionVisited((prev) => {
        return { ...prev, datos: true };
      });
      setValue("firstName", user?.firstName);
      setValue("lastName", user?.lastName);
      setValue("documentId", user?.documentId);
      setValue("phoneNumber", user?.phoneNumber);
      setValue("country", user?.country);
      setValue("city", user?.city);
      setValue("role", user?.role);
    }
  }, [user, section]);

  const editar = (data: any) => {
    setLoading(true);
    try {
      const dataToSend: any = {};
      Object.keys(data).map((key) => {
        if (data[key]) dataToSend[key] = data[key];
      });
      axios
        .put("/users/me", dataToSend)
        .then((response: any) => {
          toast.success("Perfil editado exitosamente!");
          hide();
        })
        .catch((error) => {
          console.log(error);
          toast.error("Hubo un error, intente nuevamente.");
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(
        section === "ingreso"
          ? () => {
              setSection("datos");
            }
          : editar,
      )}
      className="flex flex-col w-full py-3 gap-6 overflow-auto pb-4 min-h-[400px] lg:w-[700px]"
    >
      <div className="flex text-[#989898] justify-between gap-4 px-4 w-ful">
        <h2 className="text-xl font-[500]">Editar Usuario</h2>{" "}
        <XIcon className="w-6 cursor-pointer" onClick={() => hide()} />
      </div>{" "}
      <div className="flex flex-col w-full">
        <div className="pt-2 flex gap-2 px-7">
          {secciones.map((seccion) => {
            return (
              <div
                key={"section-editar-" + seccion.value}
                className={clsx(
                  "text-primary text-sm font-[500] px-7 py-3 rounded-t-lg cursor-pointer",
                  { "bg-[#FFFAEB]": section == seccion.value },
                )}
                onClick={() => {
                  setSection(seccion.value);
                }}
              >
                {seccion.text}
              </div>
            );
          })}
        </div>
        <div className="w-full h-[1px] bg-[#EAEAEA]"></div>
        {section === "ingreso" ? (
          <Ingreso user={user} hide={hide} register={register} me crear />
        ) : (
          <Datos hide={hide} register={register} me />
        )}
      </div>
    </form>
  );
}
