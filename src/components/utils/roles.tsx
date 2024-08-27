export const Roles = (rol: any) => {
  switch (rol) {
    case "distributor":
      return "Distribuidor";
    case "agent":
      return "Agente";
    case "atm":
      return "Cajero";
    case "player":
      return "Jugador";
  }
};

export const RoleEnum = (rol: any) => {
  switch (rol) {
    case "admin":
      return 4;
    case "distributor":
      return 3;
    case "agent":
      return 2;
    case "atm":
      return 1;
    case "player":
      return 0;
    default:
      return 0;
  }
};
