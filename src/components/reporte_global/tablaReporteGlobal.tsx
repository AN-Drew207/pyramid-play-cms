/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { ChevronDownIcon, ChevronLeftIcon } from "@heroicons/react/solid";
import { ToggleButton } from "../common/button/toggle";
import { TipoUsuario } from "../usuarios/tipoUsuario";
import { TimePickerInput } from "../common/form/inputs/timepicker";
import { DatePickerInput } from "../common/form/inputs/datepicker";
import { Jerarquia } from "../common/jerarquía";

export default function ReporteGlobalTabla({
  categorias,
  dates,
  setDates,
  userId,
  setUserId,
  usuariosJerarquia,
  totalPagar,
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

  console.log(usuariosJerarquia);

  return (
    <div className="flex flex-col w-full gap-6 overflow-auto pb-4 min-h-[400px]">
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
        <div className="flex 2xl:flex-row flex-col gap-4 w-full items-start">
          <div className="flex flex-col w-full">
            <div className="flex rounded-t-xl rounded-l-xl w-full min-w-max overflow-y-hidden">
              <table className="w-full min-w-max">
                <thead className="text-[#000000ab] bg-[#F4F4F4]">
                  <tr>
                    <th className="text-center pr-4 pl-8 py-2 font-[400] text-lg text-[17px] roboto">
                      Categoría
                    </th>
                    <th className="text-center px-4 py-2 font-[400] text-lg text-[17px] roboto">
                      Apuestas
                    </th>
                    <th className="text-center px-4 py-3 font-[400] text-lg text-[17px] roboto">
                      Apostado
                    </th>
                    <th className="text-center px-4 py-3 font-[400] text-lg text-[17px] roboto">
                      Ganado
                    </th>
                    <th className="text-center px-4 py-3 font-[400] text-lg text-[17px] roboto">
                      Netwin
                    </th>
                    <th className="text-center px-2 py-3 font-[400] text-lg text-[17px] roboto">
                      Comisión
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-[#f4f4f465]">
                  {categorias?.map((categoria: any, i: any) => {
                    const {
                      gameCategoryName,
                      totalBets,
                      totalBetAmount,
                      totalAmountEarned,
                      netwin,
                      commission,
                    } = categoria;
                    return (
                      <tr
                        key={`user-${i}`}
                        style={{
                          background: `#${Math.floor(
                            Math.random() * 16777215,
                          ).toString(16)}80`,
                        }}
                      >
                        <>
                          <td className="py-2 pr-4 pl-8 ">
                            <h2 className="text-[#000000] text-center gap-2">
                              {gameCategoryName &&
                                gameCategoryName[0]?.toUpperCase()}
                              {gameCategoryName &&
                              gameCategoryName.indexOf(",") != -1
                                ? gameCategoryName
                                    .substr(
                                      1,
                                      gameCategoryName.indexOf(",") - 1,
                                    )
                                    .replace("_", " ")
                                : gameCategoryName.substr(1).replace("_", " ")}
                            </h2>
                          </td>
                          <td className="py-2 px-4">
                            <h2 className="text-center">
                              {new Intl.NumberFormat().format(totalBets)}
                            </h2>
                          </td>
                          <td className="py-2 px-4">
                            <h2 className="text-center">
                              {new Intl.NumberFormat().format(totalBetAmount)}
                            </h2>
                          </td>
                          <td className="py-2 px-4">
                            <h2 className="text-center">
                              {new Intl.NumberFormat().format(
                                totalAmountEarned,
                              )}
                            </h2>
                          </td>
                          <td className="py-2 pl-4 pr-8">
                            <h2 className="text-center">
                              {new Intl.NumberFormat().format(netwin)}
                            </h2>
                          </td>
                          <td className="py-2 pl-4 pr-8">
                            <h2 className="text-center">
                              {new Intl.NumberFormat().format(commission)}
                            </h2>
                          </td>
                        </>
                      </tr>
                    );
                  })}
                  <tr className="bg-[#F4F4F4]">
                    <>
                      <td className="py-2 pr-4 pl-8 ">
                        <p>Total a Pagar:</p>{" "}
                      </td>
                      <td className="py-2 px-4"></td>
                      <td className="py-2 px-4"></td>
                      <td className="py-2 px-4"></td>
                      <td className="py-2 pl-4 pr-8"></td>
                      <td className="py-2 pl-4 pr-8 text-center">
                        {new Intl.NumberFormat().format(totalPagar)}
                      </td>
                    </>
                  </tr>
                </tbody>
              </table>
            </div>{" "}
          </div>
          <Jerarquia
            usuariosJerarquia={usuariosJerarquia.children}
            setUserId={setUserId}
            userSelected={userId}
          />
        </div>
      </div>
    </div>
  );
}

const UsuariosDropdown = ({ user, noChildren }: any) => {
  const [showChildren, setShow] = React.useState(false);
  return (
    <div
      className={clsx(
        { "pl-8": user?.children?.length > 0 },
        { "pl-14": user?.children?.length == 0 || !user.children },
        "flex flex-col gap-3",
      )}
    >
      <div className="flex gap-1">
        {user?.children?.length > 0 && (
          <>
            {showChildren ? (
              <ChevronLeftIcon className="w-4" onClick={() => setShow(false)} />
            ) : (
              <ChevronDownIcon className="w-4" onClick={() => setShow(true)} />
            )}
          </>
        )}
        <h2 className="text-md text-[#989898]">{user.nombre}</h2>
        <TipoUsuario user={user.tipo} />
      </div>
      {user?.children?.length > 0 &&
        showChildren &&
        user?.children?.map((userChild: any) => {
          return (
            <React.Fragment key={"global-drop-" + user.nombre}>
              <UsuariosDropdown user={userChild} />
            </React.Fragment>
          );
        })}
    </div>
  );
};
