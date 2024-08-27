import React from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout";
import ReporteFichasTabla from "@/components/reporte_fichas/tablaReporteFichas";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const [txs, setTxs] = React.useState(0);
  const [length, setLength] = React.useState(0);
  const [dates, setDates] = React.useState([
    new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
    new Date(new Date().setHours(23, 59, 59, 59)).toISOString(),
  ]);

  React.useEffect(() => {
    axios
      .get(
        `/reports/chips/hierarchy/role?from=${dates[0]}&to=${
          dates[1]
        }&role=atm&limit=10&offset=${page * 10}`,
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
    <>
      <div className="flex flex-col shrink-0 w-full px-10 py-4 gap-6">
        <div className="flex gap-4 rounded-xl items-center shadow-box w-full py-6 px-10">
          <img src="/icons/usuarios/icon.svg" className="w-10" alt="" />
          <h1 className="text-2xl text-overlay-border font-[550]">
            Reporte de Cajeros
          </h1>
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
    </>
  );
}
