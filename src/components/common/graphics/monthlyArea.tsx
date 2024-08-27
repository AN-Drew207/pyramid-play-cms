import React, { useContext } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { AuthContext } from "@/context/useUser";
import axios from "axios";
import { obtenerPrimeraFechaDelMes, obtenerUltimaFechaDelMes } from "@/utils";
import { useRouter } from "next/navigation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const labels = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export function NetwinMonthlyGraph() {
  const { auth } = useContext(AuthContext);
  const router = useRouter();
  const [data, setData] = React.useState({
    labels,
    datasets: [
      {
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  });

  const getData = async () => {
    try {
      if (auth?.user.role !== "admin") {
        const arrayData = await Promise.all(
          labels.map((a, i) => {
            return axios.get(
              `/netwin/${auth?.user.id}?from=${obtenerPrimeraFechaDelMes(
                i + 1,
              )}&to=${obtenerUltimaFechaDelMes(i + 1)}`,
            );
          }),
        );
        setData({
          labels,
          datasets: [
            {
              data: arrayData.map(({ data }) => {
                return data?.data?.items[0]?.netwin || 0;
              }),
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
          ],
        });
      }
    } catch (err: any) {
      if (err?.response?.status == 401) {
        router.push("/auth/login");
      }
      console.log(err);
    }
  };

  React.useEffect(() => {
    if (auth?.token) {
      getData();
    }
  }, [auth]);

  return <Line options={options} data={data} />;
}
