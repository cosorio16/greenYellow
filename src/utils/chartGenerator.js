function chartGenerator(dataGraphic, fechaStart, DB) {
  if (!dataGraphic || !fechaStart) {
    throw new Error("Parámetros inválidos: 'dataGraphic' o 'fechaStart' están ausentes.");
  }

  const dataVars = [];
  const valuesVars = [];
  const datasetGraphic = [];
  const scalesGraphic = {};
  let timeStampOrder = [];
  let timeStampOrderJoin = [];
  const dateTimeStart = Math.floor(new Date(fechaStart).getTime());
  const colors = [
    [255, 87, 34], [255, 193, 7], [0, 188, 212], [76, 175, 80],
    [156, 39, 176], [233, 30, 99], [63, 81, 181], [255, 152, 0],
    [0, 150, 136], [244, 67, 54]
  ];

  // Validación de dataGraphic.numVarPhysics
  const numVarPhysics = dataGraphic.numVarPhysics || 0;
  if (!Array.isArray(dataGraphic.data) || numVarPhysics !== dataGraphic.data.length) {
    throw new Error("El número de variables físicas y los datos no coinciden.");
  }

  // Generación de dataVars según DB
  for (let index = 0; index < numVarPhysics; index++) {
    dataVars[index] = [];
    for (let idx = 0; idx < dataGraphic.numDataByVarPhysics[index]; idx++) {
      dataVars[index][idx] = [];

      if (DB) {
        // Caso: Datos provenientes de base de datos
        const dataEntries = dataGraphic.data[index]?.[idx] || [];
        dataVars[index][idx] = dataEntries.map((e) => ({
          x: new Date(e.x).getTime(),
          y: e.y,
        }));
      } else {
        // Caso: Datos generados localmente
        const localData = dataGraphic.data[index]?.[idx] || [];
        localData.forEach((value, i) => {
          dataVars[index][idx].push({
            x: dateTimeStart + ((i + 1) * 60000 * dataGraphic.minRangeAxisX),
            y: value,
          });
        });
      }
    }
  }

  // Ordenar y unir timestamps
  for (let index = 0; index < numVarPhysics; index++) {
    timeStampOrder[index] = [];
    for (let i = 0; i < dataGraphic.numDataByVarPhysics[index]; i++) {
      timeStampOrder[index] = timeStampOrder[index].concat(
        dataVars[index][i].map((e) => e.x)
      );
    }
    timeStampOrderJoin = timeStampOrderJoin.concat(timeStampOrder[index]).sort((a, b) => a - b);
  }

  // Eliminar duplicados y generar etiquetas para el eje X
  const datesOrder = [...new Set(timeStampOrderJoin)];
  const labelsGraphic = datesOrder.map((timestamp) => {
    const date = new Date(timestamp);
    const firstDate = new Date(datesOrder[0]).toLocaleDateString();
    const lastDate = new Date(datesOrder[datesOrder.length - 1]).toLocaleDateString();

    return firstDate === lastDate
      ? `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      : `${date.toLocaleDateString()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  });

  // Generar valores para el eje Y
  for (let index = 0; index < numVarPhysics; index++) {
    valuesVars[index] = [];
    for (let idx = 0; idx < dataGraphic.numDataByVarPhysics[index]; idx++) {
      valuesVars[index][idx] = [];
      datesOrder.forEach((timestamp, i) => {
        const dataFound = dataVars[index][idx].find((entry) => entry.x === timestamp);
        valuesVars[index][idx][i] = dataFound ? dataFound.y : null;
      });
    }
  }

  // Generar datasets y escalas para cada variable física
  let cont = 0;
  for (let index = 0; index < numVarPhysics; index++) {
    const axisPosition = ['left', 'right'];
    const chartTypes = ['line', 'bar'];
    const idAxisY = `y${index}`;
    scalesGraphic[idAxisY] = {
      type: 'linear',
      position: axisPosition[dataGraphic.positionAxisY[index]] || 'left',
      title: {
        display: true,
        text: dataGraphic.namesAxisY[index] || `Eje ${index + 1}`,
      },
      grid: {
        display: true,
        drawOnChartArea: false,
      },
    };

    for (let idx = 0; idx < dataGraphic.numDataByVarPhysics[index]; idx++) {
      const color = colors[cont % colors.length]; // Evitar desbordamiento de colores
      datasetGraphic.push({
        type: chartTypes[dataGraphic.type[index]] || 'line',
        data: valuesVars[index][idx],
        label: dataGraphic.namesVar[index]?.[idx] || `Variable ${index + 1}.${idx + 1}`,
        borderColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
        backgroundColor: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${dataGraphic.opacity[index] || 0.5})`,
        borderWidth: 1,
        fill: true,
        spanGaps: true,
        showLine: true,
        pointRadius: 2,
        pointHoverBackgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
        yAxisID: idAxisY,
      });
      cont++;
    }
  }

  // Configuración final del gráfico
  const options = {
    interaction: { mode: 'index', intersect: false },
    scales: scalesGraphic,
    decimation: { enabled: true, samples: 12 },
    animations: {
      tension: {
        duration: 500,
        easing: 'linear',
        from: 0,
        to: 0,
        loop: false,
      },
    },
    plugins: {
      legend: {
        display: true,
        title: {
          display: Boolean(dataGraphic.title),
          text: dataGraphic.title || '',
          font: { size: 15 },
        },
      },
      tooltip: { enabled: true },
      responsive: true,
      zoom: {
        pan: {
          enabled: dataGraphic.zoom || false,
          mode: 'xy',
          modifierKey: 'ctrl',
        },
        zoom: {
          drag: { enabled: dataGraphic.zoom || false },
          mode: 'x',
        },
      },
    },
  };

  const data = {
    labels: labelsGraphic,
    datasets: datasetGraphic,
  };

  return { options, data };
}

export default chartGenerator;
