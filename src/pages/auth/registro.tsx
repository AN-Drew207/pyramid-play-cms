"use client";
import Link from "next/link";
import { Button } from "@/components/common/button";
import { Input } from "@/components/common/form/input";
import { useForm } from "react-hook-form";
import { InputPassword } from "@/components/common/form/input/inputPassword";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AuthContext } from "@/context/useUser";

export default function Registro() {
  const { register, reset, handleSubmit } = useForm();
  const { auth, setAuth } = useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const registro = (data: any) => {
    const { rep_password, ...dataToSent } = data;
    console.log(dataToSent);
    setLoading(true);
    try {
      axios
        .post("/auth/register", { termsAndConditions: true, ...dataToSent })
        .then((response: any) => {
          setAuth({
            user: response.data.data.user,
            token: response.data.data.accessToken,
          });
          toast.success("Registro exitoso!");
          router.replace("/dashboard");
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
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-center font-[500] text-overlay-border text-2xl">
        Registrarme
      </h1>
      <div className="h-[1px] bg-overlay-border opacity-50 w-full"></div>
      <form onSubmit={handleSubmit(registro)} className="flex flex-col pb-2">
        <div className="flex flex-col gap-6">
          <p className="text-center gap-4 text-overlay-border text-md">
            ¿Ya tienes cuenta?{" "}
            <Link href={"/auth/login"} className="text-primary font-bold ">
              Inicia Sesión
            </Link>
          </p>
          <div className="flex gap-4">
            <Input
              className="w-full"
              labelVisible
              classNameContainer="rounded-lg border-none py-3 text-overlay-border text-sm font-[450] placeholder-[#989898] bg-[#F4F4F4] px-4"
              placeholder="John"
              title="Nombre"
              name="firstName"
              register={register}
              withoutx
            />
            <Input
              className="w-full"
              labelVisible
              classNameContainer="rounded-lg border-none py-3 text-overlay-border text-sm font-[450] placeholder-[#989898] bg-[#F4F4F4] px-4"
              placeholder="Doe"
              title="Apellido"
              name="lastName"
              register={register}
              withoutx
            />
          </div>

          <Input
            className="w-full"
            labelVisible
            classNameContainer="rounded-lg border-none py-3 text-overlay-border text-sm font-[450] placeholder-[#989898] bg-[#F4F4F4] px-4"
            placeholder="correo@ex.com"
            title="Correo Electrónico"
            name="email"
            register={register}
            withoutx
          />
          <InputPassword
            className="w-full"
            labelVisible
            classNameContainer="rounded-lg border-none py-3 text-overlay-border text-sm font-[450] placeholder-[#989898] bg-[#F4F4F4] px-4"
            placeholder="Contraseña"
            title="Min. 8 caracteres"
            name="password"
            register={register}
            withoutx
          />
          <InputPassword
            className="w-full"
            labelVisible
            classNameContainer="rounded-lg border-none py-3 text-overlay-border text-sm font-[450] placeholder-[#989898] bg-[#F4F4F4] px-4"
            placeholder="Repite tu Contraseña"
            title="Contraseña"
            name="rep_password"
            register={register}
            withoutx
          />
        </div>
        <div className="pt-8 w-full">
          <Button
            decoration="primary"
            size="small"
            type="submit"
            className="text-sm w-full !text-[14px] !py-3 font-[600] shadow-md"
          >
            Continuar
          </Button>
        </div>
      </form>
    </>
  );
}
