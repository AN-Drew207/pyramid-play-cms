import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import axios from "axios";
import DetalleCajero from "@/components/detalles/cajero";
import DetalleDistribuidor from "@/components/detalles/distribuidor";
import DetalleAgente from "@/components/detalles/agente";
import DetalleJugador from "@/components/detalles/jugador";

export default function DetalleUsuario() {
  const router = useRouter();
  const query = useParams();
  const [user, setUser] = React.useState<any>(undefined);
  console.log(query?.id);

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
  }, [query?.id]);

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

// export async function getStaticPaths() {
//   const paths = (await axios.get("/users?limit=10000&offset=0")).data.data.map(
//     (user: any) => `/usuario/${user.id}`,
//   );
//   console.log(paths);
//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }: any) {
//   console.log(params);
//   return {
//     props: {
//       userData: {},
//       user: "",
//     },
//   };
// }
