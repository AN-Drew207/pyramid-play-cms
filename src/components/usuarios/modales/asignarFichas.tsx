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
import axios from "axios";
import { toast } from "react-hot-toast";
import { AuthContext } from "@/context/useUser";

export default function AsignarFichas({
  id,
  name,
  balance,
  role,
  onUpdate,
  hide,
}: any) {
  const { auth, setAuth } = useContext(AuthContext);
  const { register, setValue, getValues, handleSubmit } = useForm();
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    id: 0,
    name: "",
    role: "agent",
    balance: 0,
  });

  const asignar = (data: any) => {
    setLoading(true);
    try {
      console.log({
        toUserId: id || user.id,
        assignmentType: "add",
        quantity: parseInt(data.amount),
      });
      axios
        .post("/assignments", {
          toUserId: id || user.id,
          assignmentType: "add",
          quantity: parseInt(data.amount),
        })
        .then((response: any) => {
          console.log(response);
          toast.success("Fichas asignadas exitosamente!");
          hide();
        })
        .catch((error) => {
          console.log(error);
          toast.error("Hubo un error, intente nuevamente.");
        })
        .finally(() => {
          onUpdate && onUpdate();
          axios.get("/users/me").then((response) => {
            setAuth({ ...auth, user: response.data.data } as any);
          });
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (!id) {
      axios
        .get(`/users?limit=1000000&offset=0`)
        .then((response) => {
          console.log(response, "users");
          const user = response.data.data.find((user: any) => {
            return user.username === name;
          });
          if (user) {
            setUser(user);
          } else {
            hide();
            return toast.error("Introduzca un username válido");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit(asignar)}
      className="flex flex-col w-full py-3 gap-6 overflow-auto pb-4 min-h-[400px] lg:w-[550px]"
    >
      <div className="flex text-[#989898] justify-between gap-4 px-4 w-ful">
        <h2 className="text-xl font-[500]">Asignar Fichas</h2>{" "}
        <XIcon className="w-6 cursor-pointer" onClick={() => hide()} />
      </div>{" "}
      <div className="w-full h-[1px] bg-[#EAEAEA]"></div>
      <div className="flex flex-col gap-10 items-center py-8 lg:px-16 px-8 w-full">
        <div className="flex rounded-md overflow-hidden w-full border-2 border-[#ECECEC]">
          <div className="bg-[#F4F4F4] shrink-0 p-2 text-[#B3B3B3] h-12 w-12 flex items-center justify-center">
            <img src="/icons/modals/user.svg" className="w-6" />
          </div>
          <div className="min-w-3/5 shrink-0 flex gap-2 items-center px-4 text-[#989898] border-r border-[#ECECEC] whitespace-nowrap">
            {name} <TipoUsuario user={role || user?.role} />
          </div>
          <div className="flex items-center justify-end px-4 w-2/5 text-[#5C5C5C]">
            {balance || user.balance}
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex rounded-md overflow-hidden w-full border-2 border-[#ECECEC]">
            <div className="bg-[#F4F4F4] shrink-0 p-2 text-[#B3B3B3] h-12 w-12 flex items-center justify-center">
              <img src="/icons/modals/coins.svg" className="w-6" />
            </div>

            <Input
              register={register}
              classNameContainer="h-12 !bg-transparent py-4 px-3 !text-[#5C5C5C]"
              className="!text-black"
              placeholder="Ingrese la cantidad de fichas"
              name="amount"
              type="number"
            ></Input>
          </div>
          <div className="flex items-center gap-4 justify-center w-48">
            <Button
              size="extra-small"
              className="font-[550] !p-2"
              type="button"
              onClick={() => {
                setValue("amount", (parseInt(getValues("amount")) || 0) + 10);
              }}
            >
              <PlusIcon className="w-5" />
            </Button>
            <Button
              size="extra-small"
              className="font-[550] !p-2"
              type="button"
              onClick={() => {
                if (parseInt(getValues("amount")) > 0) {
                  setValue("amount", parseInt(getValues("amount")) - 10);
                }
              }}
            >
              <MinusIcon className="w-5" />
            </Button>
          </div>
        </div>
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
          Asignar
        </Button>
      </div>
    </form>
  );
}
