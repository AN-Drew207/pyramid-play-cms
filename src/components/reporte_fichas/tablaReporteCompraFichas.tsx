/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline";
import { DatePickerInput } from "../common/form/inputs/datepicker";
import { TimePickerInput } from "../common/form/inputs/timepicker";

export default function ReporteCompraDeFichasTabla({
  title,
  transacciones,
  page,
  setPage,
  totalPages,
  dates,
  setDates,
}: any) {
  const {
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const [hours, setHours] = React.useState([
    { hour: 0, mins: 0 },
    { hour: 23, mins: 59 },
  ]);

  return (
    <div className="flex flex-col w-full gap-6 overflow-auto pb-4 min-h-[400px]">
      {title && <h2 className="text-2xl text-[#B3B3B3] font-[500]">{title}</h2>}
      <div className={clsx("w-full flex flex-col py-4 px-6 gap-8")}>
        <div className="w-full flex gap-6 items-end">
          <DatePickerInput
            title="Fecha Inicial"
            name="start_date"
            setValue={setValue}
            onChangeCustom={(e: any) => {
              console.log(e, hours[0].hour, hours[0].mins);
              setDates((prev: any) => {
                return [
                  new Date(
                    new Date(e).setHours(hours[0].hour, hours[0].mins, 0, 0),
                  ).toISOString(),
                  prev[1],
                ];
              });
            }}
            error={errors.start}
          />
          <TimePickerInput
            title="Hora Inicial"
            name="start_time"
            onChangeCustom={(e: any) => {
              console.log(e);
              var mins = new Date(e).getMinutes();
              var hour = new Date(e).getHours();
              setHours((prev: any) => {
                return [{ hour, mins }, prev[1]];
              });
              setDates((prev: any) => {
                return [
                  new Date(
                    new Date(dates[0]).setHours(hour, mins, 0, 0),
                  ).toISOString(),
                  prev[1],
                ];
              });
            }}
            setValue={setValue}
            error={errors.start}
            defaultValue={new Date(new Date().setHours(0, 0, 0, 0))}
          />
          <DatePickerInput
            title="Fecha Final"
            name="end_date"
            setValue={setValue}
            error={errors.start}
            onChangeCustom={(e: any) => {
              console.log(e, hours[1].hour, hours[1].mins);
              setDates((prev: any) => {
                return [
                  prev[0],
                  new Date(
                    new Date(dates[1]).setHours(
                      hours[1].hour,
                      hours[1].mins,
                      0,
                      0,
                    ),
                  ).toISOString(),
                ];
              });
            }}
          />
          <TimePickerInput
            title="Hora Final"
            name="end_time"
            setValue={setValue}
            error={errors.start}
            onChangeCustom={(e: any) => {
              console.log(e);
              var mins = new Date(e).getMinutes();
              var hour = new Date(e).getHours();
              setHours((prev: any) => {
                return [prev[0], { hour, mins }];
              });
              setDates((prev: any) => {
                return [
                  prev[0],
                  new Date(
                    new Date(e).setHours(hour, mins, 0, 0),
                  ).toISOString(),
                ];
              });
            }}
            defaultValue={new Date(new Date().setHours(23, 59, 59, 59))}
          />
        </div>
        <div className="flex gap-4 w-full items-start">
          <div className="flex rounded-xl w-full min-w-max overflow-y-hidden">
            <table className="w-full min-w-max">
              <thead className="text-[#000000ab] bg-[#F4F4F4]">
                <tr>
                  <th className="text-center px-8 py-2 font-[400] text-lg text-[16px] roboto">
                    Fecha
                  </th>
                  <th className="text-center px-8 py-2 font-[400] text-lg text-[16px] roboto">
                    Monto Pagado
                  </th>
                  <th className="text-center px-8 py-2 font-[400] text-lg text-[16px] roboto">
                    Cantidad
                  </th>
                  <th className="text-center px-8 py-2 font-[400] text-lg text-[16px] roboto">
                    Precio
                  </th>

                  <th className="text-center px-8 py-3 font-[400] text-lg text-[16px] roboto">
                    Saldo Anterior
                  </th>
                  <th className="text-center px-8 py-2 font-[400] text-lg text-[16px] roboto">
                    Saldo Posterior
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[#f4f4f465]">
                {transacciones.map((user: any, i: any) => {
                  const {
                    updatedAt,
                    currency,
                    price,
                    quantity,
                    total,
                    newBalance,
                    oldBalance,
                  } = user;
                  return (
                    <tr key={`user-${i}`}>
                      <>
                        <td className="py-4 px-8">
                          <h2 className="text-[#5C5C5C] text-center text-sm">
                            {new Date(updatedAt).toLocaleDateString()} -{" "}
                            {new Date(updatedAt).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </h2>
                        </td>
                        <td className="py-4 px-4">
                          <h2 className="text-[#5C5C5C] text-center text-md">
                            {total} {currency}
                          </h2>
                        </td>
                        <td className="py-4 px-4">
                          <h2 className="text-[#5C5C5C] text-center text-md">
                            {quantity}
                          </h2>
                        </td>
                        <td className="py-4 px-4">
                          <h2 className="text-[#5C5C5C] text-center text-dm">
                            {price}{" "}
                          </h2>
                        </td>
                        <td className="py-4 px-4">
                          <h2 className="text-[#5C5C5C] text-center text-md">
                            {oldBalance}
                          </h2>
                        </td>
                        <td className="py-4 px-4">
                          <h2 className="text-[#5C5C5C] text-center text-md">
                            {newBalance}
                          </h2>
                        </td>
                      </>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {totalPages > 1 ? (
        <div className="flex w-full gap-4 items-center justify-center xl:text-lg text-sm text-primary">
          <ArrowLeftIcon
            className="w-6"
            onClick={() => {
              setPage((page: any) => {
                if (page > 1) {
                  return page - 1;
                }
                return page;
              });
            }}
          />
          {new Array(totalPages).fill(1).map((a, i) => {
            return (
              <p
                className={clsx("text-sm cursor-pointer", {
                  "font-bold": page == i + 1,
                })}
                key={`page-${i}`}
                onClick={() => {
                  setPage(i + 1);
                }}
              >
                {i + 1}
              </p>
            );
          })}
          <ArrowRightIcon
            className="w-6"
            onClick={() => {
              setPage((page: any) => {
                if (page < totalPages) {
                  return page + 1;
                }
                return page;
              });
            }}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

const TipoOperacion = (tipo: string) => {
  switch (tipo) {
    case "add":
      return "Depósito";
    case "remove":
      return "Retiro";
  }
};
