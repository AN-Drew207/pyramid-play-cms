import React from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout";
import UsuariosTabla from "@/components/usuarios/tablaUsuarios";
import { Button } from "@/components/common/button";
import axios from "axios";
import { useModal } from "@/hooks/modal";
import CrearUsuario from "@/components/usuarios/modales/crearUsuario";

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = React.useState("");
  const [length, setLength] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [role, setRole] = React.useState({ text: "Todos", value: "all" });
  const [users, setUsers] = React.useState([]);

  const [hierarchy, setHierarchy] = React.useState([]);

  const {
    Modal: ModalCrear,
    isShow: isShowCrear,
    show: showCrear,
    hide: hideCrear,
  } = useModal();

  React.useEffect(() => {
    onUpdate && onUpdate();
  }, [search, page, role]);

  const onUpdate = () => {
    axios
      .get(
        `/users?limit=20&offset=${20 * page}${
          search ? `completeName=${search}` : ""
        }`,
      )
      .then((response) => {
        console.log(response, "users");
        setUsers(response.data.data);
        setLength(response.data.metadata.total);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(`/users/me/hierarchy`)
      .then((response) => {
        console.log(response, "hierarchy");
        setHierarchy(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex flex-col shrink-0 w-full px-10 py-4 gap-6">
      <ModalCrear isShow={isShowCrear}>
        <CrearUsuario hide={hideCrear} onUpdate={onUpdate} />
      </ModalCrear>
      <div className="flex gap-4 rounded-xl items-center justify-between shadow-box w-full py-6 px-10">
        <div className="flex gap-4 items-center">
          <img src="/icons/usuarios/icon.svg" className="w-10" alt="" />
          <h1 className="text-2xl text-overlay-border font-[550]">Usuarios</h1>
        </div>
        <Button
          decoration="primary"
          size="small"
          className="font-[600]"
          onClick={() => {
            showCrear();
          }}
        >
          + Añadir Usuario
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
