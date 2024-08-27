"use client";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { Button } from "@/components/common/button";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { Input } from "@/components/common/form/input";
import { useForm } from "react-hook-form";
import { MinusIcon, PlusIcon } from "@heroicons/react/solid";
import { chargeCard, getBalances } from "@/components/utils/utils";
import { LoaderIcon, toast } from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "@/context/useUser";

export default function Tienda() {
  const router = useRouter();
  const [section, setSection] = React.useState("membresia");

  return (
    <div className="flex flex-col shrink-0 w-full px-10 py-4 gap-10">
      <div className="flex gap-4 rounded-xl items-center shadow-box w-full py-6 px-10">
        <img src="/icons/tienda/icon.svg" className="w-10" alt="" />
        <h1 className="text-2xl text-overlay-border font-[550]">Tienda</h1>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex gap-2 border-b !border-gray-300">
          <div
            className={clsx(
              "text-primary font-[600] py-2 px-4 rounded-t-md cursor-pointer",
              {
                "bg-[#FFFAEB]": section === "membresia",
              },
            )}
            onClick={() => {
              setSection("membresia");
            }}
          >
            Membresía
          </div>
          <div
            className={clsx(
              "text-primary font-[600] py-2 px-4 rounded-t-md cursor-pointer",
              {
                "bg-[#FFFAEB]": section === "fichas",
              },
            )}
            onClick={() => {
              setSection("fichas");
            }}
          >
            Fichas
          </div>
        </div>
      </div>
      {section === "membresia" ? <Membresia /> : <Fichas />}
    </div>
  );
}

const Membresia = () => {
  const { register, handleSubmit, reset } = useForm();
  const [section, setSection] = React.useState("preview");
  const [loading, setLoading] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const { auth } = useContext(AuthContext);

  const comprarMembresia = async (data: any) => {
    try {
      const res = await axios.get("/checkout/membership-prices");
      setLoading(true);
      const charged = await chargeCard({
        card: {
          type: "card",
          number: data.card,
          expiry_month: parseInt(data.expiry_month),
          expiry_year: parseInt(data.expiry_year),
          cvv: data.cvv,
        },
      });

      if (!charged) {
        setLoading(false);
        return toast.error("Hubo un error, intente de nuevo");
      }

      const resPay = await axios.post("/checkout/membership/pay", {
        token: charged,
        membershipId: res.data.data[0].id,
      });
      console.log(resPay, "pay");
      reset();
      setSection("preview");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    axios
      .get("/checkout/membership-active")
      .then((response) => {
        console.log(response.data.data.hasAnActiveMembership, "response");
        setActive(response.data.data.hasAnActiveMembership);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, [auth, section]);

  console.log(auth, active);

  return (
    <div className="flex xl:flex-row flex-col gap-10 items-start">
      {section === "preview" ? (
        <div className="flex flex-col w-full xl:w-2/3 gap-10 px-10 pt-10 pb-8 items-start border !border-gray-300 rounded-lg">
          <h2 className="text-2xl font-[500] text-[#B3B3B3]">
            Descripción de Membresia Anual
          </h2>
          <p className="text-[#B3B3B3] text-2xl !text-[15px]">
            ¡Convierte tu negocio en el destino de entretenimiento definitivo
            con la Membresía Anual de Pyramid Play! Únete a la élite de los
            juegos con acceso ilimitado a nuestra exclusiva colección, mientras
            disfrutas de una plataforma personalizada donde tus clientes pueden
            sumergirse en la diversión. Renueva tu membresía para mantener tu
            plataforma y aprovecha el soporte continuo y las oportunidades de
            crecimiento. ¡Hazte miembro hoy y lleva tu negocio al siguiente
            nivel de éxito y entretenimiento
          </p>
          {active ? (
            <p className="text-lg font-bold text-center text-primary">
              Usted ya tiene una membresía activa!
            </p>
          ) : (
            <Button
              size="small"
              className="font-bold min-w-[100px] w-1/3"
              onClick={() => {
                setSection("pay");
              }}
            >
              Comprar
            </Button>
          )}
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(comprarMembresia)}
          className="flex flex-col px-10 border-2 bg-overlay-2 rounded-xl border-white overflow-y-auto gap-2 w-3/5"
        >
          <h2 className="text-3xl font-[600] pb-2 text-primary text-center flex items-center gap-2">
            Metodo de Pago
          </h2>
          <div className="w-full h-[1px] bg-primary"></div>
          <div className="flex flex-col w-full py-4 pb-6 gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex-auto">
                <p className={clsx("block f-14 text-primary font-[500]")}>
                  Nombre del Titular
                </p>
              </div>
              <Input
                classNameContainer="rounded-md !bg-white border !border-gray-300 px-4 py-2 text-black placeholder-gray-400"
                className="border border-white rounded-xl"
                placeholder="Carlos Pérez"
                name="name"
                register={register}
                required
                withoutx
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex-auto">
                <p className={clsx("block f-14 text-primary font-[500]")}>
                  Numero de Tarjeta
                </p>
              </div>
              <Input
                classNameContainer="rounded-md !bg-white border !border-gray-300 px-4 py-2 text-black placeholder-gray-400"
                className="border border-white rounded-xl"
                placeholder="0123 4567 8901 ..."
                name="card"
                register={register}
                required
                withoutx
              />
            </div>
            <div className="flex w-full gap-2">
              <div className="flex flex-col gap-1 w-1/3">
                <div className="flex-auto">
                  <p className={clsx("block f-14 text-primary font-[500]")}>
                    Mes de Expiración
                  </p>
                </div>
                <Input
                  classNameContainer="rounded-md !bg-white border !border-gray-300 px-4 py-2 text-black placeholder-gray-400"
                  className="border border-white rounded-xl"
                  placeholder="12"
                  name="expiry_month"
                  register={register}
                  required
                  withoutx
                />
              </div>
              <div className="flex flex-col gap-1 w-1/3">
                <div className="flex-auto">
                  <p className={clsx("block f-14 text-primary font-[500]")}>
                    Año de Expiración
                  </p>
                </div>
                <Input
                  classNameContainer="rounded-md !bg-white border !border-gray-300 px-4 py-2 text-black placeholder-gray-400"
                  className="border border-white rounded-xl"
                  placeholder="2026"
                  name="expiry_year"
                  type="number"
                  register={register}
                  required
                  withoutx
                />
              </div>
              <div className="flex flex-col gap-1 w-1/3">
                <div className="flex-auto">
                  <p className={clsx("block f-14 text-primary font-[500]")}>
                    CVV
                  </p>
                </div>
                <Input
                  classNameContainer="rounded-md !bg-white border !border-gray-300 px-4 py-2 text-black placeholder-gray-400"
                  className="border border-white rounded-xl"
                  placeholder="123"
                  name="cvv"
                  register={register}
                  required
                  withoutx
                />
              </div>
            </div>
          </div>

          {active ? (
            <p className="text-lg font-bold text-center text-primary">
              Usted ya tiene una membresía activa!
            </p>
          ) : (
            <Button
              type="submit"
              size="small"
              className="font-[550] w-full flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <LoaderIcon className="!w-6 !h-6 text-lg" /> : "PAGAR"}
            </Button>
          )}
        </form>
      )}
      <div className="xl:w-1/3 w-full flex flex-col gap-6 pb-8 items-start border-2 border-[#EFB626] rounded-lg overflow-hidden">
        <h2 className="text-primary text-lg font-[500] bg-[#FFFAEB] py-6 px-4 w-full">
          Plan Anual
        </h2>
        <div className="flex flex-col gap-4 px-8">
          <h2 className="text-5xl text-primary font-bold">
            $25<span className="text-2xl">/anual</span>
          </h2>
          <div className="flex flex-col gap-8 pt-10 pb-6">
            <div className="flex gap-4 items-center">
              <CheckCircleIcon className="text-green-500 bg-green-100 w-7 rounded-full" />{" "}
              <p className="text-sm text-[#959595]">
                Acceso Ilimitado a Juegos Exclusivos
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <CheckCircleIcon className="text-green-500 bg-green-100 w-7 rounded-full" />{" "}
              <p className="text-sm text-[#959595]">Plataforma Personalizada</p>
            </div>
            <div className="flex gap-4 items-center">
              <CheckCircleIcon className="text-green-500 bg-green-100 w-7 rounded-full" />{" "}
              <p className="text-sm text-[#959595]">
                Renovación Automática de Plataforma
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <CheckCircleIcon className="text-green-500 bg-green-100 w-7 rounded-full" />{" "}
              <p className="text-sm text-[#959595]">
                Soporte y Actualizaciones Continuas
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <CheckCircleIcon className="text-green-500 bg-green-100 w-7 rounded-full" />{" "}
              <p className="text-sm text-[#959595]">
                Oportunidades de Crecimiento
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Fichas = () => {
  const { register, handleSubmit, setValue, getValues, reset } = useForm();
  const [section, setSection] = React.useState("preview");
  const [amountToBuy, setAmountToBuy] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [price, setPrice] = React.useState(0);
  const { auth, setAuth } = useContext(AuthContext);

  React.useEffect(() => {
    if (amountToBuy > 0) {
      setPrice(amountToBuy * 0.001);
    } else {
      setPrice(0);
    }
  }, [amountToBuy]);

  const comprarFichas = async (data: any) => {
    setLoading(true);
    try {
      const charged = await chargeCard({
        price,
        card: {
          type: "card",
          number: data.card.toString().replaceAll(" ", ""),
          expiry_month: parseInt(data.expiry_month),
          expiry_year: parseInt(data.expiry_year),
          cvv: data.cvv,
        },
      });
      if (!charged) {
        return toast.error("Hubo un error, intente de nuevo");
      }
      await axios.post("/checkout/buy-chips", {
        chips: amountToBuy,
        token: charged,
      });
      const res = await axios.get("/users/me");
      setAuth({
        ...auth,
        user: res.data.data,
      } as any);
      toast.success("Su compra de fichas ha sido exitosa!");
      setAmountToBuy(0);
      setPrice(0);
      setLoading(false);
      setSection("preview");
      reset();
    } catch (error) {
      toast.error("Hubo un error, intente de nuevo");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex xl:flex-row flex-col gap-10 items-start">
      {section === "preview" ? (
        <>
          <div className="flex flex-col gap-4 xl:w-2/3">
            <div className="flex flex-col w-full gap-10 px-10 pt-10 pb-12 items-start border !border-gray-300 rounded-lg">
              <h2 className="text-2xl font-[500] text-[#B3B3B3]">
                Compra Fichas para tu Negocio
              </h2>
              <p className="text-[#B3B3B3] text-2xl !text-[15px]">
                ¡Potencia tus ventas en Pyramid Play con nuestras fichas!
                Nuestro sistema de fichas te permite obtener beneficios al
                comprarlas y luego venderlas a los jugadores mediante los
                Cajeros de tu negocio, permitiéndote aumentar tus ingresos de
                manera eficiente. Únete a Pyramid Play y conviértete en un líder
                en el mundo del entretenimiento. ¡Compra tus fichas ahora y
                lleva tu negocio al siguiente nivel
              </p>
            </div>
            <div className="flex flex-col w-full gap-10 px-10 pt-10 pb-8 items-start border !border-gray-300 rounded-lg">
              <form
                onSubmit={handleSubmit(() => {
                  setSection("pay");
                })}
                className="flex flex-col w-full py-3 gap-6 overflow-auto pb-4"
              >
                <div className="flex flex-col gap-10 items-start py-8 lg:px-16 px-8 w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <h3 className="text-[#B3B3B3] font-[500] text-md">
                      Cantidad de Fichas
                    </h3>
                    <div className="flex justify-between w-full">
                      <div className="flex rounded-md overflow-hidden w-1/2 border-2 border-[#ECECEC]">
                        <div className="bg-[#F4F4F4] shrink-0 p-2 text-[#B3B3B3] h-12 w-12 flex items-center justify-center">
                          <img src="/icons/modals/coins.svg" className="w-6" />
                        </div>
                        <Input
                          register={register}
                          classNameContainer="h-12 !bg-transparent py-4 px-3 !text-[#5C5C5C]"
                          className="!text-black"
                          placeholder="Ingrese la cantidad de fichas"
                          onChangeCustom={(e: any) => {
                            setAmountToBuy(parseInt(e.target.value));
                          }}
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
                            setAmountToBuy(
                              (parseInt(getValues("amount")) || 0) + 1000,
                            );
                            setValue(
                              "amount",
                              (parseInt(getValues("amount")) || 0) + 1000,
                            );
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
                              setAmountToBuy(
                                parseInt(getValues("amount")) - 1000,
                              );
                              setValue(
                                "amount",
                                parseInt(getValues("amount")) - 1000,
                              );
                            }
                          }}
                        >
                          <MinusIcon className="w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex rounded-md overflow-hidden w-1/2 border-2 border-[#ECECEC]">
                    <div className="bg-[#F4F4F4] shrink-0 p-2 text-[#B3B3B3] h-12 w-12 flex items-center justify-center">
                      <img src="/icons/tienda/dolar.svg" className="w-4" />
                    </div>
                    <Input
                      register={register}
                      classNameContainer="h-12 !bg-transparent py-4 px-3 !text-[#5C5C5C]"
                      className="!text-black"
                      value={price}
                      name="price"
                      type="number"
                      disabled
                    ></Input>
                  </div>
                </div>
                <div className="flex gap-4 px-8 items-center justify-center pt-3">
                  <Button
                    type="submit"
                    size="small"
                    className="font-[550] w-2/5"
                    disabled={amountToBuy <= 0}
                  >
                    Comprar
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className="xl:w-1/3 w-full shrink-0">
            <img src="./images/tienda.png" className="w-full" alt="" />
          </div>
        </>
      ) : (
        <div className="flex gap-8 w-full items-start">
          <form
            onSubmit={handleSubmit(comprarFichas)}
            className="flex flex-col px-10 border-2 bg-overlay-2 rounded-xl border-white overflow-y-auto gap-2 w-3/5"
          >
            <h2 className="text-3xl font-[600] pb-2 text-primary text-center flex items-center gap-2">
              Metodo de Pago
            </h2>
            <div className="w-full h-[1px] bg-primary"></div>
            <div className="flex flex-col w-full py-4 pb-6 gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex-auto">
                  <p className={clsx("block f-14 text-primary font-[500]")}>
                    Nombre del Titular
                  </p>
                </div>
                <Input
                  classNameContainer="rounded-md !bg-white border !border-gray-300 px-4 py-2 text-black placeholder-gray-400"
                  placeholder="Carlos Pérez"
                  name="name"
                  register={register}
                  required
                  withoutx
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex-auto">
                  <p className={clsx("block f-14 text-primary font-[500]")}>
                    Numero de Tarjeta
                  </p>
                </div>
                <Input
                  classNameContainer="rounded-md !bg-white border !border-gray-300 px-4 py-2 text-black placeholder-gray-400"
                  name="card"
                  register={register}
                  type="tel"
                  inputmode="numeric"
                  pattern="[0-9\s]{13,19}"
                  autocomplete="cc-number"
                  maxlength="19"
                  placeholder="xxxx xxxx xxxx xxxx"
                  required
                  withoutx
                />
              </div>
              <div className="flex w-full gap-2">
                <div className="flex flex-col gap-1 w-1/3">
                  <div className="flex-auto">
                    <p className={clsx("block f-14 text-primary font-[500]")}>
                      Mes de Expiración
                    </p>
                  </div>
                  <Input
                    classNameContainer="rounded-md !bg-white border !border-gray-300 px-4 py-2 text-black placeholder-gray-400"
                    placeholder="12"
                    name="expiry_month"
                    register={register}
                    required
                    withoutx
                  />
                </div>
                <div className="flex flex-col gap-1 w-1/3">
                  <div className="flex-auto">
                    <p className={clsx("block f-14 text-primary font-[500]")}>
                      Año de Expiración
                    </p>
                  </div>
                  <Input
                    classNameContainer="rounded-md !bg-white border !border-gray-300 px-4 py-2 text-black placeholder-gray-400"
                    placeholder="2026"
                    name="expiry_year"
                    type="number"
                    register={register}
                    required
                    withoutx
                  />
                </div>
                <div className="flex flex-col gap-1 w-1/3">
                  <div className="flex-auto">
                    <p className={clsx("block f-14 text-primary font-[500]")}>
                      CVV
                    </p>
                  </div>
                  <Input
                    classNameContainer="rounded-md !bg-white border !border-gray-300 px-4 py-2 text-black placeholder-gray-400"
                    placeholder="123"
                    name="cvv"
                    register={register}
                    required
                    withoutx
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              size="small"
              className="font-[550] w-full flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <LoaderIcon className="!w-6 !h-6 text-lg" /> : "PAGAR"}
            </Button>
          </form>
          <div className="xl:w-1/3 w-full flex flex-col gap-16 pb-8 items-start border-2 border-[#EFB626] rounded-lg overflow-hidden">
            <h2 className="text-primary text-lg font-[500] bg-[#FFFAEB] py-6 px-4 w-full">
              Total a Pagar
            </h2>
            <div className="flex flex-col gap-10 px-16 pb-8 w-full items-center">
              <div className="flex flex-col gap-2 w-full">
                <h3 className="text-[#B3B3B3] font-[500] text-md">
                  Cantidad de Fichas
                </h3>
                <div className="flex justify-between w-full">
                  <div className="flex rounded-md overflow-hidden w-full border-2 border-[#ECECEC]">
                    <div className="bg-[#F4F4F4] shrink-0 p-2 text-[#B3B3B3] h-12 w-12 flex items-center justify-center">
                      <img src="/icons/modals/coins.svg" className="w-6" />
                    </div>
                    <Input
                      register={register}
                      classNameContainer="h-12 !bg-transparent py-4 px-3 !text-[#5C5C5C] text-right"
                      className="!text-black"
                      name="preview"
                      value={amountToBuy}
                      disabled
                      type="number"
                    ></Input>
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-between items-end">
                <h3 className="text-2xl text-primary font-bold">Total</h3>{" "}
                <h2 className="text-5xl text-primary font-bold">
                  ${new Intl.NumberFormat().format(price)}
                </h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
