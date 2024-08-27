import React from "react";
import { Input } from "@/components/common/form/input";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import ReporteFichasTabla from "../../reporte_fichas/tablaReporteFichas";
import axios from "axios";
import ReporteFichasPerfilTabla from "../pyramid/tablas/tablaReporteFichasPerfil";

export default function PerfilAgente() {
  const [page, setPage] = React.useState(0);
  const [txs, setTxs] = React.useState(0);
  const [length, setLength] = React.useState(0);
  const [dates, setDates] = React.useState([
    new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
    new Date(new Date().setHours(23, 59, 59, 59)).toISOString(),
  ]);
  const { register } = useForm();

  React.useEffect(() => {
    axios
      .get(
        `/reports/chips/me?from=${dates[0]}&to=${dates[1]}&limit=10&offset=${
          page * 10
        }`,
      )
      .then((response) => {
        console.log(response, "users");
        setTxs(response.data.data);
        setLength(response.data.metadata.totalPages);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dates, page]);

  return (
    <div className="flex flex-col shrink-0 w-full px-10 py-4">
      <div className="flex gap-4 rounded-xl items-center shadow-box w-full py-6 px-10">
        <img src="/icons/perfil/icon.svg" className="w-10" alt="" />
        <h1 className="text-2xl text-overlay-border font-[550]">Perfil</h1>
      </div>
      <div className={clsx("w-full flex flex-col py-4 px-6 gap-8")}>
        <div className="w-full flex flex-wrap gap-6 items-end pt-6">
          <div>
            <Input
              name="name"
              required
              labelVisible
              title="Nombre"
              defaultValue={"Carlos"}
              register={register}
              classNameContainer="xl:!w-auto !w-36 px-6 rounded-md !py-3"
              disabled
            />
          </div>
          <div>
            <Input
              name="lastName"
              required
              labelVisible
              title="Apellido"
              defaultValue={"Correa"}
              register={register}
              classNameContainer="xl:!w-auto !w-36 px-6 rounded-md !py-3"
              disabled
            />
          </div>
          <div>
            <Input
              name="email"
              required
              labelVisible
              title="Email"
              defaultValue={"correo@email.com"}
              register={register}
              classNameContainer="xl:!w-auto !w-36 px-6 rounded-md !py-3"
              disabled
            />
          </div>
        </div>

        <ReporteFichasTabla
          transacciones={txs || []}
          totalPages={length}
          page={page}
          setPage={setPage}
          dates={dates}
          setDates={setDates}
        />
      </div>
    </div>
  );
}
