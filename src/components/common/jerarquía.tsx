import clsx from "clsx";
import { ToggleButton } from "./button/toggle";
import { ChevronDownIcon, ChevronLeftIcon } from "@heroicons/react/solid";
import React, { useContext } from "react";
import { TipoUsuario } from "../usuarios/tipoUsuario";
import { AuthContext } from "@/context/useUser";

export const Jerarquia = ({
  usuariosJerarquia,
  userSelected,
  setUserId,
}: any) => {
  const [showChildren, setShow] = React.useState(false);
  const { auth } = useContext(AuthContext);
  return (
    <div className="flex flex-col 2xl:w-2/5 w-full min-w-[350px] rounded-xl overflow-hidden">
      <div className="bg-[#F4F4F4] py-3 flex justify-end items-center w-full px-4 gap-3">
        <h3 className="text-lg text-[17px] text-[#6b6b6bab] roboto">
          Incluir ocultos
        </h3>
        <ToggleButton />
      </div>
      <div className="flex flex-col min-h-64 py-4 px-6 bg-[#FCFCFC] gap-6">
        <div className={clsx("flex flex-col gap-3")}>
          <div className="flex gap-1">
            {usuariosJerarquia?.length > 0 && (
              <>
                {showChildren ? (
                  <ChevronLeftIcon
                    className="w-4"
                    onClick={() => setShow(false)}
                  />
                ) : (
                  <ChevronDownIcon
                    className="w-4"
                    onClick={() => setShow(true)}
                  />
                )}
              </>
            )}

            <h2 className="text-md text-[#989898]">
              {auth?.user.firstName} {auth?.user.lastName}
            </h2>
            <TipoUsuario user={auth?.user.role} />
          </div>
          {showChildren &&
            usuariosJerarquia?.map((user: any) => {
              return (
                <React.Fragment key={"jerarquia-" + user.nombre}>
                  <UsuariosDropdown
                    user={user}
                    userSelected={userSelected}
                    setUserId={setUserId}
                  />
                </React.Fragment>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const UsuariosDropdown = ({ user, userSelected, setUserId }: any) => {
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
        <div
          className={clsx(
            "flex gap-2  px-2 py-1 rounded-md",
            { "cursor-pointer": setUserId },
            {
              "bg-[#55555522]": userSelected == user.id,
            },
          )}
          onClick={
            setUserId
              ? () => {
                  if (userSelected == user.id) {
                    setUserId("0");
                  } else {
                    setUserId(user.id);
                  }
                }
              : undefined
          }
        >
          <h2 className="text-md text-[#989898]">
            {user.firstName} {user.lastName}
          </h2>
          <TipoUsuario user={user.role} />
        </div>
      </div>
      {user?.children?.length > 0 &&
        showChildren &&
        user?.children?.map((userChild: any) => {
          return (
            <React.Fragment key={userChild.completename}>
              <UsuariosDropdown
                user={userChild}
                userSelected={userSelected}
                setUserId={setUserId}
              />
            </React.Fragment>
          );
        })}
    </div>
  );
};
