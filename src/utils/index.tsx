export const obtenerPrimeraFechaDelMes = (numeroDeMes: number) => {
  // Obtener el año actual
  const añoActual = new Date().getFullYear();

  // Crear una nueva fecha con el primer día del mes y a las 00:00 horas
  const primeraFecha = new Date(añoActual, numeroDeMes - 1, 1, 0, 0, 0, 0);

  return primeraFecha.toISOString();
};

function obtenerDiasEnMes(mes: number, año: number): number {
  // Crear una fecha del primer día del mes siguiente
  const fechaMesSiguiente = new Date(año, mes, 1);

  // Restar un día para obtener el último día del mes actual
  const ultimoDiaDelMes = new Date(fechaMesSiguiente.getTime() - 1);

  return ultimoDiaDelMes.getDate();
}

export const obtenerUltimaFechaDelMes = (numeroDeMes: number) => {
  // Obtener el año actual
  const añoActual = new Date().getFullYear();

  // Crear una nueva fecha con el primer día del mes y a las 00:00 horas
  const primeraFecha = new Date(
    añoActual,
    numeroDeMes - 1,
    obtenerDiasEnMes(numeroDeMes, añoActual),
    0,
    23,
    59,
    59,
  );

  return primeraFecha.toISOString();
};

interface DiaJson {
  from: string;
  to: string;
}

export const obtenerSemanaEnCurso = (): DiaJson[] => {
  const hoy = new Date();
  const diaSemana = hoy.getDay(); // 0 (Domingo) a 6 (Sábado)
  const diaLunes = hoy.getDate() - (diaSemana === 0 ? 6 : diaSemana - 1); // Obtener el lunes actual

  const semana: DiaJson[] = [];

  for (let i = 0; i < 7; i++) {
    const fecha = new Date(hoy);
    fecha.setDate(diaLunes + i);
    // Fecha "from" a las 00:00 horas
    const from = new Date(fecha);
    from.setHours(0, 0, 0, 0);

    // Fecha "to" a las 23:59 horas
    const to = new Date(fecha);
    to.setHours(23, 59, 59, 999);

    // Añadir al array como JSON
    semana.push({
      from: from.toISOString(),
      to: to.toISOString(),
    });
  }

  return semana;
};

export const obtenerMesActualYAnterior = (): {
  mesActual: number;
  mesAnterior: number;
} => {
  const hoy = new Date();
  const mesActual = hoy.getMonth() + 1; // Se suma 1 porque los meses van de 0 a 11
  let mesAnterior = mesActual - 1;
  let añoAnterior = hoy.getFullYear();

  if (mesAnterior === 0) {
    mesAnterior = 12; // Si el mes actual es enero, el mes anterior es diciembre del año anterior
    añoAnterior--; // Restar 1 al año para obtener el año anterior
  }

  return { mesActual, mesAnterior };
};

const generateColor = () => {
  let randomColorString = "#";
  const arrayOfColorFunctions = "0123456789abcdef";
  for (let x = 0; x < 6; x++) {
    let index = Math.floor(Math.random() * 16);
    let value = arrayOfColorFunctions[index];

    randomColorString += value;
  }
  return randomColorString;
};

export const newColorFind = (id: any) => {
  const colorMap: any = {};
  const selectedColors: any = {};
  // If already generated and assigned, return
  if (colorMap[id]) return colorMap[id];

  // Generate new random color
  let newColor;

  do {
    newColor = generateColor();
  } while (selectedColors[newColor]);

  // Found a new random, unassigned color
  colorMap[id] = newColor;
  selectedColors[newColor] = true;

  // Return next new color
  return newColor;
};
