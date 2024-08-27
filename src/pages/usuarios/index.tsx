"use client";
import React, { useContext } from "react";
import UsuariosTabla from "@/components/usuarios/tablaUsuarios";
import { Button } from "@/components/common/button";
import axios from "axios";
import { useModal } from "@/hooks/modal";
import CrearUsuario from "@/components/usuarios/modales/crearUsuario";
import { AuthContext } from "@/context/useUser";

export default function Usuarios() {
  const [search, setSearch] = React.useState("");
  const [length, setLength] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [role, setRole] = React.useState({ text: "Todos", value: "all" });
  const [users, setUsers] = React.useState([]);

  const [hierarchy, setHierarchy] = React.useState([]);
  const { auth } = useContext(AuthContext);

  const {
    Modal: ModalCrear,
    isShow: isShowCrear,
    show: showCrear,
    hide: hideCrear,
  } = useModal();

  const onUpdate = async () => {
    try {
      const [users, hierarchy] = await Promise.all([
        axios.get(
          `/users?limit=20&offset=${20 * page}${
            search ? `completeName=${search}` : ""
          }`,
        ),
        axios.get(`/users/me/hierarchy`),
      ]);
      console.log("requests");

      setUsers(users.data.data);
      setLength(users.data.metadata.total);
      setHierarchy(hierarchy.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    console.log("update");
    onUpdate();
  }, [search, page, role, auth]);

  return (
    <div className="flex flex-col shrink-0 w-full sm:px-10 px-2 py-4 gap-6">
      <ModalCrear isShow={isShowCrear}>
        <CrearUsuario hide={hideCrear} onUpdate={onUpdate} />
      </ModalCrear>
      <div className="flex gap-4 rounded-xl items-center justify-between shadow-box w-full py-6 px-10">
        <div className="flex gap-4 items-center">
          <img src="/icons/usuarios/icon.svg" className="lg:w-10 w-8" alt="" />
          <h1 className="lg:text-2xl text-overlay-border font-[550] text-xl">
            Usuarios
          </h1>
        </div>
        <Button
          decoration="primary"
          size="small"
          className="font-[600] flex gap-2 items-center justify-center"
          onClick={() => {
            showCrear();
          }}
        >
          + <span className="lg:flex hidden ">Añadir Usuario</span>
        </Button>
      </div>
      <UsuariosTabla
        usuarios={users}
        usuariosJerarquia={hierarchy}
        length={length}
        page={page}
        setPage={setPage}
        txSearch={search}
        setTextSearch={setSearch}
        role={role}
        setRole={setRole}
        onUpdate={onUpdate}
      />
    </div>
  );
}
