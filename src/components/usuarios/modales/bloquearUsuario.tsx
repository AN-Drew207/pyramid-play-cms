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
import axios from "axios";
import { toast } from "react-hot-toast";

export default function BloquearUsuario({ name, id, hide, onUpdate }: any) {
  const { handleSubmit } = useForm();
  const [loading, setLoading] = React.useState(false);

  const bloquear = (data: any) => {
    setLoading(true);
    try {
      axios
        .put("/users/change-status", {
          id,
          status: "blocked",
        })
        .then((response: any) => {
          console.log(response);
          toast.success("Usuario bloqueado exitosamente!");
          hide();
        })
        .catch((error) => {
          console.log(error);
          toast.error("Hubo un error, intente nuevamente.");
        })
        .finally(() => {
          onUpdate && onUpdate();
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(bloquear)}
      className="flex flex-col w-full py-3 gap-6 overflow-auto pb-4 lg:w-[550px]"
    >
      <div className="flex text-[#989898] justify-between gap-4 px-4 w-ful">
        <h2 className="text-xl font-[500]">Bloquear Usuario</h2>{" "}
        <XIcon className="w-6 cursor-pointer" onClick={() => hide()} />
      </div>{" "}
      <div className="w-full h-[1px] bg-[#EAEAEA]"></div>
      <div className="flex flex-col gap-10 items-center py-4 lg:px-16 px-8 w-full">
        <p className="text-[#838693] lg:whitespace-nowrap text-center">
          ¿Esta seguro que quiere{" "}
          <span className="text-red-600 font-[600]">Bloquear</span> al usuario “
          {name}”?
        </p>
      </div>
      <div className="w-full h-[1px] bg-[#EAEAEA]"></div>
      <div className="flex gap-4 px-8 items-center justify-center pt-3">
        <Button
          size="small"
          className="font-[550] w-2/5"
          decoration="primary-outlined"
          onClick={() => hide()}
        >
          Cancelar
        </Button>
        <Button type="submit" size="small" className="font-[550] w-2/5">
          Aceptar
        </Button>
      </div>
    </form>
  );
}
