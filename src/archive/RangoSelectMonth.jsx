import React, { useState } from 'react';

const RangoSeleccion = () => {
  // Array de objetos con mes y día
  const fechas = [
    { mes: 1, dia: 1 }, { mes: 1, dia: 2 }, { mes: 1, dia: 3 }, { mes: 1, dia: 4 }, { mes: 1, dia: 5 }, { mes: 1, dia: 6 }, { mes: 1, dia: 7 },
    { mes: 1, dia: 8 }, { mes: 1, dia: 9 }, { mes: 1, dia: 10 }, { mes: 1, dia: 11 }, { mes: 1, dia: 12 }, { mes: 1, dia: 13 }, { mes: 1, dia: 14 },
    { mes: 1, dia: 15 }, { mes: 1, dia: 16 }, { mes: 1, dia: 17 }, { mes: 1, dia: 18 }, { mes: 1, dia: 19 }, { mes: 1, dia: 20 }, { mes: 1, dia: 21 },
    { mes: 1, dia: 22 }, { mes: 1, dia: 23 }, { mes: 1, dia: 24 }, { mes: 1, dia: 25 }, { mes: 1, dia: 26 }, { mes: 1, dia: 27 }, { mes: 1, dia: 28 },
    { mes: 2, dia: 1 }, { mes: 2, dia: 2 }, { mes: 2, dia: 3 }, { mes: 2, dia: 4 }, { mes: 2, dia: 5 }, { mes: 2, dia: 6 }, { mes: 2, dia: 7 },
    { mes: 2, dia: 8 }, { mes: 2, dia: 9 }, { mes: 2, dia: 10 }, { mes: 2, dia: 11 }, { mes: 2, dia: 12 }, { mes: 2, dia: 13 }, { mes: 2, dia: 14 }
  ];

  // Estado para almacenar las fechas seleccionadas
  const [seleccionados, setSeleccionados] = useState([]);
  const [seleccionando, setSeleccionando] = useState(false);
  const [inicio, setInicio] = useState(null);

  // Función para verificar si una fecha está seleccionada
  const esSeleccionado = (fecha) => {
    return seleccionados.some(
      (selected) => selected.mes === fecha.mes && selected.dia === fecha.dia
    );
  };

  // Función para manejar el inicio de la selección
  const handleMouseDown = (fecha) => {
    setSeleccionando(true);
    setInicio(fecha);
    setSeleccionados([fecha]);
  };

  // Función para manejar la selección mientras se mantiene presionado
  const handleMouseEnter = (fecha) => {
    if (seleccionando && inicio) {
      // Seleccionamos el rango entre el inicio y la fecha actual
      const rango = [inicio, fecha].sort((a, b) => {
        if (a.mes !== b.mes) return a.mes - b.mes;
        return a.dia - b.dia;
      });

      const fechasSeleccionadas = [];
      let mes = rango[0].mes;
      let dia = rango[0].dia;

      // Crear un array de fechas entre el inicio y la fecha final
      while (
        (mes < rango[1].mes) ||
        (mes === rango[1].mes && dia <= rango[1].dia)
      ) {
        fechasSeleccionadas.push({ mes, dia });
        dia++;
        if (dia > 31) { // Simplemente para el caso de un mes de 31 días
          dia = 1;
          mes++;
        }
      }

      setSeleccionados(fechasSeleccionadas);
    }
  };

  // Función para manejar cuando se suelta el clic
  const handleMouseUp = () => {
    setSeleccionando(false);
  };

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)', // 7 columnas
          gap: '10px',
        }}
      >
        {fechas.map((fecha, index) => (
          <p
            key={index}
            onMouseDown={() => handleMouseDown(fecha)}  // Inicia la selección
            onMouseEnter={() => handleMouseEnter(fecha)}  // Actualiza la selección mientras se mantiene presionado
            onMouseUp={handleMouseUp}  // Finaliza la selección
            style={{
              cursor: 'pointer',
              backgroundColor: esSeleccionado(fecha) ? 'lightblue' : 'transparent',
              padding: '10px',
              textAlign: 'center',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          >
            {`${fecha.mes}/${fecha.dia}`}
          </p>
        ))}
      </div>
    </div>
  );
};

export default RangoSeleccion;
