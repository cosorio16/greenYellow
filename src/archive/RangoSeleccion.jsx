import React, { useState } from 'react';

const RangoSeleccion = () => {
  // Array de números (1-42)
  const numeros = Array.from({ length: 42 }, (_, i) => i + 1);

  // Estado para almacenar los índices seleccionados
  const [seleccionados, setSeleccionados] = useState([]);
  const [seleccionando, setSeleccionando] = useState(false);
  const [inicio, setInicio] = useState(null);

  // Función para manejar el inicio de la selección
  const handleMouseDown = (index) => {
    setSeleccionando(true);
    setInicio(index);
    setSeleccionados([index]);
  };

  // Función para manejar la selección mientras se mantiene presionado
  const handleMouseEnter = (index) => {
    if (seleccionando) {
      // Seleccionamos el rango entre el inicio y el índice actual
      const rango = [inicio, index].sort((a, b) => a - b);
      setSeleccionados(Array.from({ length: rango[1] - rango[0] + 1 }, (_, i) => rango[0] + i));
    }
  };

  // Función para manejar cuando se suelta el clic
  const handleMouseUp = () => {
    setSeleccionando(false);
  };

  // Función para verificar si un número está seleccionado
  const esSeleccionado = (index) => {
    return seleccionados.includes(index);
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
        {numeros.map((numero, index) => (
          <p
            key={index}
            onMouseDown={() => handleMouseDown(index)}  // Inicia la selección
            onMouseEnter={() => handleMouseEnter(index)}  // Actualiza la selección mientras se mantiene presionado
            onMouseUp={handleMouseUp}  // Finaliza la selección
            style={{
              cursor: 'pointer',
              backgroundColor: esSeleccionado(index) ? 'lightblue' : 'transparent',
              padding: '10px',
              textAlign: 'center',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          >
            {numero}
          </p>
        ))}
      </div>
    </div>
  );
};

export default RangoSeleccion;
