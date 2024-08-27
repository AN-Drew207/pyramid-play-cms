import Link from "next/link";
import { Button } from "@/components/common/button";
import { Input } from "@/components/common/form/input";
import { useForm } from "react-hook-form";
import { InputPassword } from "@/components/common/form/input/inputPassword";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "@/context/useUser";

export default function Home() {
  const [loading, setLoading] = React.useState(false);
  const { auth, setAuth } = useContext(AuthContext);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const submit = (data: any) => {
    setLoading(true);
    try {
      axios
        .post("/auth/login", data)
        .then((response: any) => {
          setAuth({
            user: response.data.data.user,
            token: response.data.data.accessToken,
          });
          toast.success("Inicio de sesión exitoso!");
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
        Inicio de Sesión
      </h1>
      <div className="h-[1px] bg-overlay-border opacity-50 w-full"></div>
      <form onSubmit={handleSubmit(submit)} className="flex flex-col pb-2">
        <div className="flex flex-col gap-6">
          <h2 className="text-center text-overlay-border text-md font-[400] pb-10">
            Ingresa tus datos para continuar
          </h2>

          <Input
            className="w-full"
            labelVisible
            classNameContainer="rounded-lg border-none py-3 text-overlay-border text-sm font-[450] bg-[#F4F4F4] px-4"
            placeholder="correo@ex.com"
            title="Correo Electrónico"
            name="email"
            register={register}
            withoutX
          />
          <InputPassword
            className="w-full"
            labelVisible
            classNameContainer="rounded-lg border-none py-3 text-sm font-[450] bg-[#F4F4F4] px-4"
            placeholder="Ingresa tu Contraseña"
            title="Contraseña"
            name="password"
            register={register}
            withoutX
          />
        </div>
        <div className="flex justify-end pt-2">
          <Link
            href={"/auth/recuperar"}
            className="text-primary text-sm font-[600]"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <div className="pt-8 w-full">
          <Button
            decoration="primary"
            type="submit"
            size="small"
            className="text-sm w-full !text-[14px] !py-3 font-[600] shadow-md"
          >
            Continuar
          </Button>
        </div>
      </form>
      <p className="text-center gap-4 text-overlay-border text-md">
        ¿Aún no tienes cuenta?{" "}
        <Link href={"/auth/registro"} className="text-primary font-bold ">
          Crea una cuenta
        </Link>
      </p>
    </>
  );
}
