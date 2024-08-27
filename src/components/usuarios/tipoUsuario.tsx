export const TipoUsuario = ({ user }: any) => {
  return (
    <>
      {user == "pyramid" ? (
        <span className="bg-secondary text-xs py-1 px-2 rounded-lg font-[600] text-primary">
          Pyramid
        </span>
      ) : user == "distributor" ? (
        <span className="bg-blue-200 text-xs py-1 px-2 rounded-lg font-[600] text-blue-800">
          Distribuidor
        </span>
      ) : user == "agent" ? (
        <span className="bg-green-200 text-xs py-1 px-2 rounded-lg font-[600] text-green-800">
          Agente
        </span>
      ) : user == "atm" ? (
        <span className="bg-yellow-200 text-xs py-1 px-2 rounded-lg font-[600] text-yellow-800">
          Cajero
        </span>
      ) : (
        <span className="bg-cyan-200 text-xs py-1 px-2 rounded-lg font-[600] text-cyan-800">
          Jugador
        </span>
      )}
    </>
  );
};
