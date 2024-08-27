"use client";
import React, { useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import axios from "axios";
import DetalleCajero from "@/components/detalles/cajero";
import DetalleDistribuidor from "@/components/detalles/distribuidor";
import DetalleAgente from "@/components/detalles/agente";
import DetalleJugador from "@/components/detalles/jugador";
import { AuthContext } from "@/context/useUser";

export default function DetalleUsuario() {
  const router = useRouter();
  const query = useParams();
  const [user, setUser] = React.useState<any>(undefined);
  const { auth } = useContext(AuthContext);
  React.useEffect(() => {
    if (query?.id) {
      axios
        .get(`/users/${query?.id}`)
        .then((response) => {
          console.log(response, "users");
          setUser(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [query?.id, auth]);

  return (
    <>
      {!user ? (
        ""
      ) : user.role == "distributor" ? (
        <DetalleDistribuidor user={user} />
      ) : user.role == "agent" ? (
        <DetalleAgente user={user} />
      ) : user.role == "atm" ? (
        <DetalleCajero user={user} />
      ) : (
        <DetalleJugador user={user} />
      )}
    </>
  );
}
