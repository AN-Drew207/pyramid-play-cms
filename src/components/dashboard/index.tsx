import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout";
import { TopAgentesChart } from "@/components/common/graphics/topAgentes";
import { DailyNetwin } from "@/components/common/graphics/weeklyNetwin";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { Button } from "../common/button";
import { MinusIcon, PlusIcon } from "@heroicons/react/solid";
import { useModal } from "@/hooks/modal";
import AsignarFichas from "../usuarios/modales/asignarFichas";
import RetirarFichas from "../usuarios/modales/retirarFichas";
import { Input } from "../common/form/input";
import { useForm } from "react-hook-form";
import CrearUsuario from "../usuarios/modales/crearUsuario";
import { toast } from "react-hot-toast";
import { NetwinMonthlyGraph } from "../common/graphics/monthlyArea";
import {
  obtenerMesActualYAnterior,
  obtenerPrimeraFechaDelMes,
  obtenerUltimaFechaDelMes,
} from "@/utils";
import axios from "axios";
import { AuthContext } from "@/context/useUser";

export const DashboardData = () => {
  const [search, setSearch] = React.useState("");
  const [user, setUser] = React.useState({ nombre: "", tipo: "" });
  const { register } = useForm();
  const {
    Modal: ModalAsignar,
    isShow: isShowAsignar,
    show: showAsignar,
    hide: hideAsignar,
  } = useModal();
  const {
    Modal: ModalRetirar,
    isShow: isShowRetirar,
    show: showRetirar,
    hide: hideRetirar,
  } = useModal();

  const {
    Modal: ModalCrear,
    isShow: isShowCrear,
    show: showCrear,
    hide: hideCrear,
  } = useModal();

  React.useEffect(() => {
    if (search) {
      setUser({ nombre: search, tipo: "atm" });
    }
  }, [search]);

  return (
    <div className="py-16 grid 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-2 grid-cols-1 !justify-center gap-x-4 gap-y-16">
      <ModalAsignar isShow={isShowAsignar}>
        <AsignarFichas hide={hideAsignar} name={user.nombre} tipo={user.tipo} />
      </ModalAsignar>
      <ModalRetirar isShow={isShowRetirar}>
        <RetirarFichas hide={hideRetirar} name={user.nombre} tipo={user.tipo} />
      </ModalRetirar>
      <ModalCrear isShow={isShowCrear}>
        <CrearUsuario hide={hideCrear} />
      </ModalCrear>
      <div className="flex flex-col items-center justify-center xl:w-full w-96 p-4 gap-12 rounded-lg shadow-box relative pt-16 pb-8">
        <div className="top-[-20px] left-0 right-0 mx-auto absolute bg-green-200 text-green-600 py-3 px-6 w-fit rounded-xl font-[500]">
          Carga Rápida
        </div>
        <div className="flex h-full items-center justify-center w-full">
          <Button
            decoration="primary"
            size="small"
            className="w-2/3 text-lg font-[600] flex gap-3 items-center justify-center"
            onClick={() => {
              showCrear();
            }}
          >
            Nuevo Usuario <PlusIcon className="w-5" />
          </Button>
        </div>
        <div className="flex items-center justify-center w-full gap-4">
          <div className="w-1/2">
            <Input
              register={register}
              name="name"
              onChangeCustom={(e: any) => {
                setSearch(e.target.value);
              }}
              placeholder="Nombre de usuario"
              className="border-b border-[#989898]"
              classNameContainer="!bg-white px-2"
            />
          </div>
          <div className="flex gap-8 items-center  justify-end w-1/2">
            <Button
              size="extra-small"
              className="font-[550] !p-2"
              onClick={() => {
                if (search) {
                  showAsignar();
                } else {
                  toast.error("Ingrese un username válido.");
                }
              }}
            >
              <PlusIcon className="w-5" />
            </Button>
            <Button
              size="extra-small"
              className="font-[550] !p-2"
              onClick={() => {
                if (search) {
                  showRetirar();
                } else {
                  toast.error("Ingrese un username válido.");
                }
              }}
            >
              <MinusIcon className="w-5" />
            </Button>
          </div>
        </div>
      </div>
      <GananciaNeta />
      <NetwinMensual />
      <NetwinDiario />
      <TopAgentes />
    </div>
  );
};

const GananciaNeta = () => {
  const router = useRouter();
  const [isShowed, setIsShowed] = React.useState(true);
  const [data, setData] = React.useState({ mesActual: 0, mesAnterior: 0 });
  const { auth } = useContext(AuthContext);

  const getData = async () => {
    try {
      if (auth?.user.role !== "admin") {
        const { mesActual, mesAnterior } = obtenerMesActualYAnterior();
        const arrayData = await Promise.all([
          axios.get(
            `/netwin/${auth?.user.id}?from=${obtenerPrimeraFechaDelMes(
              mesAnterior,
            )}&to=${obtenerUltimaFechaDelMes(mesAnterior)}`,
          ),
          axios.get(
            `/netwin/${auth?.user.id}?from=${obtenerPrimeraFechaDelMes(
              mesActual,
            )}&to=${obtenerUltimaFechaDelMes(mesActual)}`,
          ),
        ]);
        console.log(arrayData);
        const data = arrayData.map(({ data }: any) => {
          return data.data.items[0].netwin;
        });
        setData({ mesAnterior: data[0], mesActual: data[1] });
      } else {
        return router.push("/usuarios");
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    if (auth?.token) {
      getData();
    }
  }, [auth]);

  return (
    <div className="flex flex-col items-center justify-center xl:w-full w-96 p-4 rounded-lg shadow-box relative py-16">
      <div className="top-[-20px] left-0 right-0 mx-auto absolute bg-green-200 text-green-600 py-3 px-6 w-fit rounded-xl font-[500]">
        Ganancia Neta
      </div>
      <div className="h-full w-full flex flex-col items-center justify-center gap-y-6 px-10">
        <div className="flex justify-between items-center w-full">
          <p className="text-[#989898] font-[500] text-md">Mes Actual:</p>
          <p className="font-[600] text-2xl text-green-600">
            {isShowed
              ? new Intl.NumberFormat().format(data.mesActual)
              : "*****"}
          </p>
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="text-[#989898] font-[500] text-md">Mes Anterior:</p>
          <p className="font-[600] text-2xl text-green-600">
            {isShowed
              ? new Intl.NumberFormat().format(data.mesAnterior)
              : "*****"}
          </p>
        </div>
      </div>
      <div className="flex gap-6 pt-16">
        <p className="bg-yellow-200 text-md py-2 px-6 rounded-lg font-[600] text-yellow-800">
          {isShowed
            ? new Intl.NumberFormat().format(data.mesActual - data.mesAnterior)
            : "*****"}
        </p>
        {isShowed ? (
          <EyeOffIcon
            className="w-10 text-[#989898]"
            onClick={() => {
              setIsShowed(false);
            }}
          />
        ) : (
          <EyeIcon
            className="w-10 text-[#989898]"
            onClick={() => {
              setIsShowed(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

const NetwinMensual = () => {
  return (
    <div className="flex items-center justify-center xl:w-full w-96 p-4 rounded-lg shadow-box relative xl:py-16 py-8 px-8">
      <div className="top-[-20px] left-0 right-0 mx-auto absolute bg-green-200 text-green-600 py-3 px-6 w-fit rounded-xl font-[500]">
        Netwin Mensual
      </div>
      <NetwinMonthlyGraph />
    </div>
  );
};

const NetwinDiario = () => {
  return (
    <div className="flex items-center justify-center xl:w-full w-96 p-4 rounded-lg shadow-box relative xl:py-16  px-8">
      <div className="top-[-20px] left-0 right-0 mx-auto absolute bg-green-200 text-green-600 py-3 px-6 w-fit rounded-xl font-[500]">
        Netwin Diario
      </div>
      <DailyNetwin />
    </div>
  );
};

const TopAgentes = () => {
  const [data, setData] = React.useState<any>([]);
  const { auth } = useContext(AuthContext);
  const router = useRouter();

  const getData = async () => {
    if (auth?.user.role !== "admin") {
      const { mesActual } = obtenerMesActualYAnterior();
      const { data: users } = await axios.get(`/users?limit=1000000&offset=0`);
      const totalNetwin = (
        await axios.get(
          `/netwin/${auth?.user.id}?from=${obtenerPrimeraFechaDelMes(
            mesActual,
          )}&to=${obtenerUltimaFechaDelMes(mesActual)}`,
        )
      )?.data?.data?.items[0]?.netwin;
      const arrayData = await Promise.all(
        users.data
          .filter((user: any) => {
            return user.role == "agent";
          })
          .map((a: any) => {
            return axios.get(
              `/netwin/${a.id}?from=${obtenerPrimeraFechaDelMes(
                mesActual,
              )}&to=${obtenerUltimaFechaDelMes(mesActual)}`,
            );
          }),
      );
      // console.log(arrayData);
      setData(
        arrayData
          .map(({ data }, i) => {
            const percentage = (data.data.items[0].netwin * 100) / totalNetwin;
            return {
              netwin: data.data.items[0].netwin,
              nombre: users?.data[i].completename,
              percentage: percentage,
            };
          })
          .sort((a, b) => b.percentage - a.percentage)
          .filter(({ percentage }: any, i) => {
            return i <= 5 && percentage > 0;
          }),
      );
    } else {
      router.push("/usuarios");
    }
  };

  React.useEffect(() => {
    if (auth?.token) {
      getData();
    }
  }, [auth]);

  return (
    <div className="flex items-center justify-center xl:w-full w-96 p-4 rounded-lg shadow-box relative">
      <div className="top-[-20px] left-0 right-0 mx-auto absolute bg-green-200 text-green-600 py-3 px-6 w-fit rounded-xl font-[500]">
        Top Agentes del Mes
      </div>
      <div className="flex items-center justify-center w-72">
        <TopAgentesChart dataAgents={data} />
      </div>
    </div>
  );
};
