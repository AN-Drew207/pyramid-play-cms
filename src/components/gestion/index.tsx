/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { Input } from "../common/form/input";
import { Select } from "../common/form/inputs/select";

export default function GestionApuesta({}: any) {
  const {
    register,
    formState: { errors },
    setValue,
  } = useForm();

  return (
    <div className="flex flex-col w-full gap-6 overflow-auto pb-4">
      <div className={clsx("w-full flex flex-col py-16 px-6 gap-16")}>
        <div className="flex justify-between w-full">
          <h3 className="text-[#989898] text-sm w-1/2 shrink-0">
            Modo de operación de apuesta
          </h3>
          <Select
            register={register}
            name="type"
            classNameContainer="px-4 py-3 rounded-lg !w-1/2 min-w-40"
            placeholder="Apuesta Regular"
          />
        </div>
        <div className="flex justify-between w-full">
          <h3 className="text-[#989898] text-sm w-1/2 shrink-0">
            Todos los bonos a Wager
          </h3>
          <div className="flex w-full items-start justify-start px-1">
            <Input
              type="checkbox"
              register={register}
              name="apuesta"
              classNameContainer="!w-min "
            />
          </div>
        </div>
        <div className="flex justify-between w-full">
          <h3 className="text-[#989898] text-sm w-1/2 shrink-0">
            Apùesta en giras gratis del código promocional de bonificación
          </h3>
          <Input
            register={register}
            name="apuesta"
            type="number"
            classNameContainer="px-5 py-3 rounded-lg !w-1/2 min-w-40"
            defaultValue={0.0}
          />
        </div>
        <div className="flex justify-between w-full">
          <h3 className="text-[#989898] text-sm w-1/2 shrink-0">
            Restricción sobre la reutilización del código de promoción de
            bonificación
          </h3>
          <div className="flex w-full items-start justify-start px-1">
            <Input
              type="checkbox"
              register={register}
              name="apuesta"
              classNameContainer="!w-min "
            />
          </div>
        </div>
        <div className="flex justify-between w-full">
          <h3 className="text-[#989898] text-sm w-1/2 shrink-0">
            Bonus acumulativo
          </h3>
          <Input
            register={register}
            name="apuesta"
            type="number"
            classNameContainer="px-5 py-3 rounded-lg !w-1/2 min-w-40"
            defaultValue={0.0}
          />
        </div>
        <div className="flex justify-between w-full">
          <h3 className="text-[#989898] text-sm w-1/2 shrink-0">
            Numero total de apuestas para obtener la rueda de giros gratis
          </h3>
          <Select
            register={register}
            name="type"
            classNameContainer="px-4 py-3 rounded-lg !w-1/2 min-w-40"
            placeholder="Apagar"
          />
        </div>
        <div className="flex justify-between w-full">
          <h3 className="text-[#989898] text-sm w-1/2 shrink-0">
            Regreso de la perdida
          </h3>
          <Select
            register={register}
            name="type"
            classNameContainer="px-4 py-3 rounded-lg !w-1/2 min-w-40"
            placeholder="Apagar"
          />
        </div>
        <div className="flex justify-between w-full">
          <h3 className="text-[#989898] text-sm w-1/2 shrink-0">
            El porcentaje de ganancia de giros es gratis se destina al saldo
            facturable
          </h3>
          <Select
            register={register}
            name="type"
            classNameContainer="px-4 py-3 rounded-lg !w-1/2 min-w-40"
            placeholder="Apagar"
          />
        </div>
        <div className="flex justify-between w-full">
          <h3 className="text-[#989898] text-sm w-1/2 shrink-0">
            Wager multiplicadora
          </h3>
          <Select
            register={register}
            name="type"
            classNameContainer="px-4 py-3 rounded-lg !w-1/2 min-w-40"
            placeholder="10"
          />
        </div>
        <div className="flex justify-between w-full">
          <h3 className="text-[#989898] text-sm w-1/2 shrink-0">
            Limite de wager (en horas)
          </h3>
          <Select
            register={register}
            name="type"
            classNameContainer="px-4 py-3 rounded-lg !w-1/2 min-w-40"
            placeholder="1"
          />
        </div>
        <div className="flex justify-between w-full">
          <h3 className="text-[#989898] text-sm w-1/2 shrink-0">
            Porcentaje de wager en cada deposito
          </h3>
          <Select
            register={register}
            name="type"
            classNameContainer="px-4 py-3 rounded-lg !w-1/2 min-w-40"
            placeholder="Apagar"
          />
        </div>
        <div className="flex justify-between w-full">
          <h3 className="text-[#989898] text-sm w-1/2 shrink-0">
            Porcentaje de wager en cada repostaje
          </h3>
          <Select
            register={register}
            name="type"
            classNameContainer="px-4 py-3 rounded-lg !w-1/2 min-w-40"
            placeholder="Apagar"
          />
        </div>
      </div>
    </div>
  );
}
