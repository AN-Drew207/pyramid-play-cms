/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@/components/common/button";
import { Input } from "@/components/common/form/input";
import { XIcon } from "@heroicons/react/outline";
import React from "react";
import { useForm } from "react-hook-form";
import { TipoUsuario } from "../tipoUsuario";
import { MinusIcon, PlusIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Comisiones, Datos, Ingreso, Permisos } from "./crear-editar";
import { InputPassword } from "@/components/common/form/input/inputPassword";

export default function EditarPassword({ id, hide, onUpdate }: any) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = React.useState(false);

  const cambioClave = (data: any) => {
    setLoading(true);
    try {
      axios
        .patch("/users/password", { userId: id, ...data })
        .then((response: any) => {
          toast.success("Usuario editado exitosamente!");
          hide();
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
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(cambioClave)}
      className="flex flex-col w-full py-6 gap-6 overflow-auto pb-4 lg:w-[700px]"
    >
      <div className="flex text-[#989898] justify-between gap-4 px-4 w-full">
        <h2 className="text-xl font-[500]">Cambiar Contraseña</h2>{" "}
        <XIcon className="w-6 cursor-pointer" onClick={() => hide()} />
      </div>{" "}
      <div className="flex flex-col w-full items-center justify-center px-16 pb-6 gap-6">
        <div className="flex flex-col gap-2 w-2/3">
          <h2 className="text-sm font-[500] text-[#B3B3B3]">Contraseña</h2>
          <InputPassword
            register={register}
            classNameContainer="h-12 bg-[#F4F4F4] py-4 px-3 !text-[#5C5C5C] rounded-lg"
            className="!text-black"
            placeholder="Ingrese su clave"
            required
            name="password"
          />
        </div>
        <div className="flex flex-col gap-2 w-2/3">
          <h2 className="text-sm font-[500] text-[#B3B3B3]">
            Confirmar Contraseña
          </h2>
          <InputPassword
            register={register}
            classNameContainer="h-12 bg-[#F4F4F4] py-4 px-3 !text-[#5C5C5C] rounded-lg"
            className="!text-black"
            placeholder="Ingrese su clave"
            required
            name="confirmPassword"
          />
        </div>
        <div className="flex gap-4 px-16 items-center justify-center pt-2 w-full">
          <Button
            size="small"
            className="font-[550] w-1/2"
            decoration="primary-outlined"
            onClick={() => hide()}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            size="small"
            className="font-[550] w-1/2 text-center"
            disabled={loading}
          >
            Confirmar
          </Button>
        </div>
      </div>
    </form>
  );
}
