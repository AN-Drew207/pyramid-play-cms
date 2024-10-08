/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@/components/common/button";
import { Input } from "@/components/common/form/input";
import { XIcon } from "@heroicons/react/outline";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { Select } from "@/components/common/form/inputs/select";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Roles } from "@/components/utils/roles";
import { InputPassword } from "@/components/common/form/input/inputPassword";
import { Comisiones, Datos, Ingreso, Permisos } from "./crear-editar";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/useUser";

export default function CrearUsuario({ hide, onUpdate }: any) {
  const { register, handleSubmit, setValue } = useForm();
  const { setAuth } = useContext(AuthContext);
  const [section, setSection] = React.useState("ingreso");
  const [loading, setLoading] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const secciones = [
    { text: "Ingreso", value: "ingreso" },
    { text: "Datos Personales", value: "datos" },
    // { text: "Permisos", value: "permisos" },
    { text: "Comisiones", value: "comisiones" },
  ];
  const router = useRouter();

  const crearUsuario = (dataPrev: any) => {
    setLoading(true);
    const { commission_general, ...data } = dataPrev;
    const dataToSend = {
      ...data,
      status: "active",
      commissions: data?.commissions
        ? data?.commissions?.map((commission: any) => {
            return {
              ...commission,
              commissionAmount: Number(commission.commissionAmount),
            };
          })
        : [],
    };

    console.log(dataToSend, "data");

    const newObj = Object.fromEntries(
      Object.entries(dataToSend).filter(
        ([key, value]) => value !== "" && value !== undefined,
      ),
    );

    console.log(newObj, "NEW OBJ");

    try {
      axios
        .post("/auth/register/user", newObj)
        .then((response: any) => {
          toast.success("Usuario creado exitosamente!");
          hide();
        })
        .catch((error) => {
          try {
            const message = error?.response?.data?.message || [];
            console.log(error);
            if (message?.includes("Wrong credentials provided")) {
              toast.error(
                "Credenciales inválidas, revise e intente nuevamente.",
              );
            } else {
              if (message[0]?.length) {
                message?.forEach((message: any) => {
                  if (message.includes("should not be empty")) {
                    toast.error(message);
                  }
                });
              } else {
                toast.error("Hubo un error, intente nuevamente.");
              }
            }
          } catch (error) {
            console.log(error);
          }
        })
        .finally(() => {
          onUpdate && onUpdate();
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    axios
      .get(`/games/categories/group`)
      .then((response) => {
        console.log(response, "categoriy");
        console.log(response.data.data.items, "category");
        const items = response.data.data.items;
        let id = 0;
        const itemsArray = items.map((category: any) => {
          const array = category.games.map((item: any) => {
            return { ...item, index: id++ };
          });
          return { ...category, games: array };
        });
        console.log(itemsArray, "itemsArray");
        setCategories(itemsArray);
      })
      .catch((error) => {
        console.error(error);
        if (error?.response?.status == 401) {
          setAuth(null);
          router.push("/auth/login");
        }
      });
  }, []);

  return (
    <form
      onSubmit={handleSubmit(
        section === "ingreso"
          ? () => {
              setSection("datos");
            }
          : section === "datos"
          ? () => {
              setSection("comisiones");
            }
          : section === "permisos"
          ? () => {
              setSection("comisiones");
            }
          : crearUsuario,
      )}
      className="flex flex-col w-full py-3 gap-6 overflow-auto pb-4 min-h-[400px] lg:w-[700px]"
    >
      <div className="flex text-[#989898] justify-between gap-4 px-4 w-ful">
        <h2 className="text-xl font-[500]">Crear Usuario</h2>{" "}
        <XIcon className="w-6 cursor-pointer" onClick={() => hide()} />
      </div>{" "}
      <div className="flex flex-col w-full">
        <div className="pt-2 flex gap-2 px-7">
          {secciones.map((seccion) => {
            return (
              <div
                key={"section-crear-" + seccion.value}
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
          <Ingreso hide={hide} register={register} />
        ) : section === "datos" ? (
          <Datos hide={hide} register={register} />
        ) : section === "permisos" ? (
          <Permisos hide={hide} register={register} categories={categories} />
        ) : (
          <Comisiones
            hide={hide}
            register={register}
            categories={categories}
            setValue={setValue}
            loading={loading}
          />
        )}
      </div>
    </form>
  );
}
