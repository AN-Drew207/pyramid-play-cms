import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout";
import ReporteGlobalTabla from "@/components/reporte_global/tablaReporteGlobal";
import axios from "axios";
import { AuthContext } from "@/context/useUser";

export default function ReporteGlobal() {
  const [dates, setDates] = React.useState([
    new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
    new Date(new Date().setHours(23, 59, 59, 59)).toISOString(),
  ]);
  const [categorias, setCategorias] = React.useState([]);
  const [totalPagar, setTotalPagar] = React.useState(0);
  const [userId, setUserId] = React.useState("0");
  const [hierarchy, setHierarchy] = React.useState([]);

  const { auth } = useContext(AuthContext);

  React.useEffect(() => {
    if (userId === "0") {
      axios
        .get(`/netwin/${auth?.user.id}?from=${dates[0]}&to=${dates[1]}`)
        .then((response) => {
          console.log(response, "users");
          setCategorias(response.data.data.items);
          setTotalPagar(response.data.data.totalCommission);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .get(`/netwin/${userId}?from=${dates[0]}&to=${dates[1]}`)
        .then((response) => {
          console.log(response, "users");
          setCategorias(response.data.data.items);
          setTotalPagar(response.data.data.totalCommission);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    axios
      .get(`/users/me/hierarchy`)
      .then((response) => {
        console.log(response, "hierarchy");
        setHierarchy(response.data.data.children);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dates, userId]);

  return (
    <div className="flex flex-col shrink-0 w-full px-10 py-4 gap-6">
      <div className="flex gap-4 rounded-xl items-center shadow-box w-full py-6 px-10">
        <img src="/icons/reporte_global/icon.svg" className="w-10" alt="" />
        <h1 className="text-2xl text-overlay-border font-[550]">
          Reporte Global
        </h1>
      </div>
      <ReporteGlobalTabla
        categorias={categorias}
        totalPagar={totalPagar}
        usuariosJerarquia={hierarchy}
        dates={dates}
        setDates={setDates}
        setUserId={setUserId}
        userId={userId}
      />
    </div>
  );
}
