/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useContext } from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  InformationCircleIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import { Input } from "../common/form/input";
import { TipoUsuario } from "./tipoUsuario";
import { DropdownSelect } from "../common/dropdowns/dropdownMonedaTable";
import { useModal } from "@/hooks/modal";
import AsignarFichas from "./modales/asignarFichas";
import RetirarFichas from "./modales/retirarFichas";
import BloquearUsuario from "./modales/bloquearUsuario";
import OcultarUsuario from "./modales/ocultarUsuario";
import EditarUsuario from "./modales/editarUsuario";
import { ChevronDownIcon, ChevronLeftIcon } from "@heroicons/react/solid";
import { ToggleButton } from "../common/button/toggle";
import { Menu } from "@headlessui/react";
import { AuthContext } from "@/context/useUser";
import { Roles } from "../utils/roles";
import { Jerarquia } from "../common/jerarquía";
import EditarPassword from "./modales/editarPassword";

export default function UsuariosTabla({
  usuarios,
  usuariosJerarquia,
  role,
  setRole,
  page,
  setPage,
  txSearch,
  setTextSearch,
  onUpdate,
  length,
}: any) {
  const { register } = useForm();

  const { auth } = useContext(AuthContext);

  const router = useRouter();

  const roles = [
    { text: "Todos", value: "all" },
    { text: "Distribuidores", value: "distributor" },
    { text: "Agentes", value: "agent" },
    { text: "Cajeros", value: "atm" },
    { text: "Jugadores", value: "player" },
  ];

  const maxPage = new Array(
    Math.floor(length / 20) < length / 20
      ? Math.floor(length / 20) + 1
      : Math.floor(length / 20),
  );

  return (
    <div className="flex flex-col w-full gap-6 overflow-auto pb-4 min-h-[400px]">
      <div className={clsx("w-full flex flex-col py-4 px-6 gap-8")}>
        <div className="w-full flex gap-6 items-end">
          <div>
            <Input
              name="tx"
              required
              labelVisible={false}
              placeholder={"Busqueda"}
              register={register}
              value={txSearch}
              classNameContainer="xl:!w-auto !w-36 px-6 rounded-md !py-3"
              onChangeCustom={(e: any) => {
                setTextSearch(e.target.value);
                setPage(0);
              }}
            />
          </div>
          <DropdownSelect name={role.text}>
            <div className="flex flex-col">
              {roles.map((role) => {
                return (
                  <React.Fragment key={role.text}>
                    <Menu.Button
                      className="py-2 text-left px-4 cursor-pointer hover:opacity-50"
                      onClick={() => {
                        setRole(role);
                      }}
                    >
                      {role.text}
                    </Menu.Button>
                  </React.Fragment>
                );
              })}
            </div>
          </DropdownSelect>
        </div>
        <div className="flex 2xl:flex-row flex-col gap-4 w-full items-start">
          <div className="flex rounded-xl w-full min-w-max overflow-y-hidden">
            <table className="w-full min-w-max">
              <thead className="text-[#000000ab] bg-[#F4F4F4]">
                <tr>
                  <th className="text-left pr-4 pl-8 py-2 font-[400] text-lg text-[17px] roboto">
                    Usuario
                  </th>
                  <th className="text-left px-4 py-2 font-[400] text-lg text-[17px] roboto">
                    Fichas
                  </th>
                  <th className="text-left px-4 py-3 font-[400] text-lg text-[17px] roboto">
                    Acciones
                  </th>
                  <th className="text-left pl-4 pr-8 py-4 font-[400] text-sm"></th>
                </tr>
              </thead>
              <tbody className="bg-[#f4f4f465]">
                {usuarios
                  .filter((user: any) => {
                    return role.text === "Todos"
                      ? true
                      : role.value == user.role;
                  })
                  .map((user: any, i: any) => {
                    const { completename, username, balance, role } = user;
                    return (
                      <tr key={`user-${i}`}>
                        <>
                          <td className="py-4 pr-4 pl-8">
                            <h2 className="text-[#5C5C5C] xl:text-md flex items-center gap-2">
                              {username} <TipoUsuario user={role} />
                            </h2>
                          </td>
                          <td className="py-4 px-4">
                            <h2 className="text-[#5C5C5C] xl:text-lg text-sm">
                              {balance}
                            </h2>
                          </td>
                          <td className="py-4 px-4">
                            <AccionesFichas user={user} onUpdate={onUpdate} />
                          </td>
                          <td className="py-4 pl-4 pr-8">
                            <div className="flex gap-2">
                              <AccionesUser user={user} onUpdate={onUpdate} />
                            </div>
                          </td>
                        </>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <Jerarquia
            usuariosJerarquia={usuariosJerarquia?.children}
            setUserId={(id: any) => {
              router.push(`/usuario/${id}`);
            }}
          />
        </div>
      </div>
      {length > 20 && txSearch.length === 0 ? (
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
          {maxPage.fill(1).map((a, i) => {
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
                if (page < maxPage.length) {
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

const AccionesFichas = ({ user, onUpdate }: any) => {
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
  return (
    <>
      <ModalAsignar isShow={isShowAsignar}>
        <AsignarFichas
          id={user.id}
          hide={hideAsignar}
          name={user.completename}
          balance={user.balance}
          role={user.role}
          onUpdate={onUpdate}
        />
      </ModalAsignar>
      <ModalRetirar isShow={isShowRetirar}>
        <RetirarFichas
          id={user.id}
          hide={hideRetirar}
          name={user.completename}
          balance={user.balance}
          role={user.role}
          onUpdate={onUpdate}
        />
      </ModalRetirar>
      <div className="flex gap-2">
        <div className="flex h-7 w-7 justify-center bg-[#a1a5b74d] rounded-md items-center text-[#838693] cursor-pointer">
          <PlusIcon
            className="w-5"
            onClick={() => {
              showAsignar();
            }}
          />
        </div>
        <div className="flex h-7 w-7 justify-center bg-[#a1a5b74d] rounded-md items-center text-[#838693] cursor-pointer">
          <MinusIcon
            className="w-5"
            onClick={() => {
              showRetirar();
            }}
          />
        </div>
      </div>
    </>
  );
};

const AccionesUser = ({ user, onUpdate }: any) => {
  const router = useRouter();
  const {
    Modal: ModalEdit,
    isShow: isShowEdit,
    show: showEdit,
    hide: hideEdit,
  } = useModal();
  const {
    Modal: ModalBloquear,
    isShow: isShowBloquear,
    show: showBloquear,
    hide: hideBloquear,
  } = useModal();
  const {
    Modal: ModalOcultar,
    isShow: isShowOcultar,
    show: showOcultar,
    hide: hideOcultar,
  } = useModal();
  const {
    Modal: ModalPassword,
    isShow: isShowPassword,
    show: showPassword,
    hide: hidePassword,
  } = useModal();

  return (
    <>
      <ModalEdit isShow={isShowEdit}>
        <EditarUsuario hide={hideEdit} id={user?.id} onUpdate={onUpdate} />
      </ModalEdit>
      <ModalPassword isShow={isShowPassword}>
        <EditarPassword hide={hidePassword} id={user?.id} onUpdate={onUpdate} />
      </ModalPassword>
      <ModalBloquear isShow={isShowBloquear}>
        <BloquearUsuario
          hide={hideBloquear}
          name={user.completename}
          id={user.id}
          onUpdate={onUpdate}
        />
      </ModalBloquear>
      <ModalOcultar isShow={isShowOcultar}>
        <OcultarUsuario
          hide={hideOcultar}
          name={user.completename}
          id={user.id}
          onUpdate={onUpdate}
        />
      </ModalOcultar>
      <div className="flex gap-6">
        <div
          onClick={() => {
            router.push(`/usuario/${user.id}`);
          }}
          className="flex h-7 w-7 justify-center bg-[#a1a5b74d] rounded-md items-center text-[#838693] cursor-pointer"
        >
          <img src="/icons/information.svg" className="w-3" />
        </div>
        <div
          onClick={() => {
            showPassword();
          }}
          className="flex h-7 w-7 justify-center bg-[#a1a5b74d] rounded-md items-center text-[#838693] cursor-pointer"
        >
          <img src="/icons/key.svg" className="w-4" />
        </div>
        <div
          onClick={() => {
            showEdit();
          }}
          className="flex h-7 w-7 justify-center bg-[#a1a5b74d] rounded-md items-center text-[#838693] cursor-pointer"
        >
          <img src="/icons/edit.svg" className="w-4" />
        </div>
        <div
          onClick={() => {
            showBloquear();
          }}
          className="flex h-7 w-7 justify-center bg-[#a1a5b74d] rounded-md items-center text-[#838693] cursor-pointer"
        >
          <img src="/icons/block.svg" className="w-3" />
        </div>
        <div
          onClick={() => {
            showOcultar();
          }}
          className="flex h-7 w-7 justify-center bg-[#a1a5b74d] rounded-md items-center text-[#838693] cursor-pointer"
        >
          <img src="/icons/eye.svg" className="w-4" />
        </div>
      </div>
    </>
  );
};
