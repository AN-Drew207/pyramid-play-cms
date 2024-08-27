import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { newColorFind } from "@/utils";

ChartJS.register(ArcElement, Tooltip, Legend);

export function TopAgentesChart({ dataAgents }: any) {
  const [data, setData] = React.useState({
    labels: [],
    datasets: [
      {
        label: "% de Netwin",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 0,
      },
    ],
  });

  React.useEffect(() => {
    console.log(dataAgents);
    if (dataAgents) {
      setData({
        labels: dataAgents.map(({ nombre, percentage }: any) => {
          return `${nombre} ${percentage}%`;
        }),
        datasets: [
          {
            label: "% de Netwin",
            data: dataAgents.map(({ percentage }: any) => {
              return percentage;
            }),
            backgroundColor: dataAgents.map((a: any, i: any) =>
              newColorFind(i),
            ),
            borderColor: dataAgents.map((a: any, i: any) => newColorFind(i)),
            borderWidth: 0,
          },
        ],
      });
    }
  }, [dataAgents]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          boxWidth: 6,
          boxHeight: 6,
          usePointStyle: true,
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
}
