/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@/components/common/button";
import { Input } from "@/components/common/form/input";
import { XIcon } from "@heroicons/react/outline";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { TipoUsuario } from "../tipoUsuario";
import { MinusIcon, PlusIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Comisiones, Datos, Ingreso, Permisos } from "./crear-editar";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/useUser";

export default function EditarUsuario({ id, hide, onUpdate }: any) {
  const { register, setValue, handleSubmit } = useForm();
  const [section, setSection] = React.useState("ingreso");
  const [loading, setLoading] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const router = useRouter();
  const { setAuth } = useContext(AuthContext);

  const [user, setUser] = React.useState<any>(null);
  const secciones = [
    { text: "Ingreso", value: "ingreso" },
    { text: "Datos Personales", value: "datos" },
    // { text: "Permisos", value: "permisos" },
    { text: "Comisiones", value: "comisiones" },
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
        .get("/users/" + id)
        .then((response: any) => {
          const user = response.data.data;
          setUser(user);
        })
        .catch((error) => {
          console.log(error);
          if (
            error?.response?.data?.message?.includes(
              "Wrong credentials provided",
            )
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
    } else if (section === "permisos" && !sectionVisited["permisos"]) {
    } else if (section === "comisiones" && !sectionVisited["comisiones"]) {
      setValue(`liquidation`, user?.liquidation);
      console.log(user, "USER");
      user?.commissions.forEach((commission: any, index: any) => {
        setValue(`commissions[${index}].gameId`, commission.game.id);
        setValue(`commissions[${index}].commissionAmount`, commission.amount);
        setValue(`commissions[${index}].comissionId`, commission.id);
      });
    }
  }, [user, section]);

  const registro = (data: any) => {
    setLoading(true);
    try {
      const dataPrev = {
        id: user.id,
        status: "active",
        commissions: data?.commissions.map((commission: any) => {
          return {
            ...commission,
            commissionAmount: parseFloat(commission.commissionAmount),
          };
        }),
        ...data,
      };
      const dataToSend: any = {};
      Object.keys(dataPrev).map((key) => {
        if (dataPrev[key]) dataToSend[key] = dataPrev[key];
      });
      const newObj = Object.entries(dataToSend).filter((value) => value[1]);
      axios
        .put("/users", newObj)
        .then((response: any) => {
          toast.success("Usuario editado exitosamente!");
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
          : section === "datos"
          ? () => {
              setSection("comisiones");
            }
          : section === "permisos"
          ? () => {
              setSection("comisiones");
            }
          : registro,
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
          <Ingreso edit user={user} hide={hide} register={register} />
        ) : section === "datos" ? (
          <Datos hide={hide} register={register} />
        ) : section === "permisos" ? (
          <Permisos hide={hide} register={register} />
        ) : (
          <Comisiones
            hide={hide}
            register={register}
            categories={categories}
            setValue={setValue}
          />
        )}
      </div>
    </form>
  );
}
