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
import {
  obtenerPrimeraFechaDelMes,
  obtenerSemanaEnCurso,
  obtenerUltimaFechaDelMes,
} from "@/utils";

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
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

export const data = {
  labels,
  datasets: [
    {
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export function DailyNetwin() {
  const { auth } = useContext(AuthContext);
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
    if (auth?.user.role !== "admin") {
      const arrayData = await Promise.all(
        obtenerSemanaEnCurso().map(({ from, to }, i) => {
          return axios.get(`/netwin/${auth?.user.id}?from=${from}&to=${to}`);
        }),
      );
      setData({
        labels,
        datasets: [
          {
            data: arrayData.map(({ data }) => {
              return data.data.items[0].netwin;
            }),
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      });
    }
  };

  React.useEffect(() => {
    if (auth?.token) {
      getData();
    }
  }, [auth]);

  return <Line options={options} data={data} />;
}
