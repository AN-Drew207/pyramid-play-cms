import Link from "next/link";
import { Button } from "@/components/common/button";
import { Input } from "@/components/common/form/input";
import { useForm } from "react-hook-form";
import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { register, reset } = useForm();
  const router = useRouter();

  return (
    <>
      <h1 className="text-center font-[500] text-overlay-border text-2xl">
        Recuperación de Contraseña
      </h1>
      <div className="h-[1px] bg-overlay-border opacity-50 w-full"></div>
      <div className="flex flex-col pb-2">
        <div className="flex flex-col gap-6">
          <h2 className="text-center text-overlay-border text-md font-[400] px-4">
            Ingresa tu correo electronico para reestablecer tu contraseña
          </h2>

          <Input
            className="w-full"
            labelVisible
            classNameContainer="rounded-lg border-none py-3 text-overlay-border text-sm font-[450] placeholder-[#989898] bg-[#F4F4F4] px-4"
            placeholder="correo@ex.com"
            title="Correo"
            name="email"
            register={register}
            withoutX
          />
        </div>

        <div className="pt-8 w-full">
          <Button
            decoration="primary"
            size="small"
            className="text-sm w-full !text-[14px] !py-3 font-[600] shadow-md"
          >
            Enviar
          </Button>
        </div>
      </div>
      <p className="text-center gap-4 text-overlay-border text-md">
        Volver a{" "}
        <Link href={"/auth/login"} className="text-primary font-bold ">
          Inicio de sesión
        </Link>{" "}
        o{" "}
        <Link href={"/auth/registro"} className="text-primary font-bold ">
          Registrarse
        </Link>
      </p>
    </>
  );
}
