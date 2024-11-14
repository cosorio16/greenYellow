/*---------------------------MODELO PARA PROBAR LA GRFICA-----------------------
  const dataGraphic = {
  // cuantas variables fisicas a comparar,  1 = no comparativa; mayot a 1 = comparativa
  numVarPhysics: 3,
  // nombre de cada uno de los ejes Y para las variables fisicas a comparar
  namesAxisY: ['Variable 1', 'Variable 2', 'Variable 3'],
  // 0 = left; 1 = right, posicion de los ejes
  positionAxisY: [0,1,1],
  // datos correspondientes a las graficas de cada variable fisica
  numDataByVarPhysics: [3,2,1],
  // datos correspondientes a las graficas de cada variable fisica
  data: [
    [[5,2,3], [12,13,10], [15,23,17]],      // var 1
    [[78,66,77], [88,78,99]],               // var 2
    [[56, 65, 89]],                         // var 3
  ],
  // nombres para las graficas de cada variable fisica
  namesVar: [
    ["Var 1.1", "Var 1.2","Var 1.3"],
    ["Var 2.1", "Var 2.2"],
    ["Var 3.1"],
  ],
  // 0 = linea; 1 = barra, tipo de grafica por variable fisica
  type: [0, 1, 1],
  // intervalo de tiempo en "MINUTOS" en que se dan los valores de la grafica
  minRangeAxisX: 5,
  // opacidad del fondo de la grafica
  opacity: [0.2, 0.6, 0.6]
}
// recibes informacion de base de datos ???? si = true, no = false
const DB = false
// fecha de donde inicia la grafica
const fechaStart = "2024-11-07 00:00:00"

const resultGraphics = genGraphic(dataGraphic, fechaStart, DB)

function AppLM() {
  return <>
    <Chart
      data={resultGraphics.data}
      options={resultGraphics.options}
    />
  </>
}
------------------------------------------------------------------------------*/


function chartGenerator (dataGraphic, fechaStart, DB) {
  const dataVars = []
  const valuesVars = [], datasetGraphic = [], scalesGraphic = {}
  let timeStampOrder = [], timeStampOrderJoin = []
  let dateTime = Math.floor(new Date(fechaStart).getTime())
  const colors = [
      [255, 87, 34],     // Naranja brillante
      [255, 193, 7],     // Amarillo dorado
      [0, 188, 212],     // Turquesa
      [76, 175, 80],     // Verde vibrante
      [156, 39, 176],    // Morado intenso
      [233, 30, 99],     // Rosa vibrante
      [63, 81, 181],     // Azul intenso
      [255, 152, 0],     // Naranja oscuro
      [0, 150, 136],     // Verde azulado
      [244, 67, 54]      // Rojo vibrante
    ]

  if(DB) {
    for (let index = 0; index < dataGraphic.numVarPhysics; index++) {
      dataVars[index] = []
      for (let i = 0; i < dataGraphic.numDataByVarPhysics[index]; i++) {
        dataVars[index][i] = []
        dataVars[index][i] = dataGraphic.data[index][i].map((e) => {
          return {x: new Date(e.x).getTime() + 18000000, y:e.y}
        })
      }
    }
  } else {
    for (let index = 0; index < dataGraphic.numVarPhysics; index++) {
      dataVars[index] = []
      for (let idx = 0; idx < dataGraphic.numDataByVarPhysics[index]; idx++) {
        dataVars[index][idx] = []
        dataGraphic.data[index][idx].map((e, i) => {
          dataVars[index][idx].push({x: dateTime + ((i+1)*60000*dataGraphic.minRangeAxisX), y: e})
        })
      }
    }
  }

  // se ordenas ls fechas de menor a mayor numero en formato timeStamp
  for (let index = 0; index < dataGraphic.numVarPhysics; index++) {
    timeStampOrder[index] = []
    for (let i = 0; i < dataGraphic.numDataByVarPhysics[index]; i++) {
      timeStampOrder[index] = timeStampOrder[index].concat(dataVars[index][i].map(e => e.x))
    }
    timeStampOrderJoin = timeStampOrderJoin.concat(timeStampOrder[index]).sort((a, b) => a - b)
  }

  // se eliminan duplicados para agregar sacar los Labels del eje X de la grafica
  const datesOrder = [... new Set(timeStampOrderJoin)]
  // se retorna la fecha de forma legible para humanos para mostrar en grafica
  const labelsGraphic = datesOrder.map(e => {
    let dateTime = new Date(e), date;
    const firstDate = new Date (datesOrder[0]).toLocaleDateString()
    const lastDate = new Date (datesOrder[datesOrder.length-1]).toLocaleDateString()
     
    if ( firstDate === lastDate) {
      date = `${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`
    } else {
      date = `${dateTime.toLocaleDateString()}, ${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`
    }
    return date
  })

  for (let index = 0; index < dataGraphic.numVarPhysics; index++) {
    valuesVars[index] = []
    for (let idx = 0; idx < dataGraphic.numDataByVarPhysics[index]; idx++) {
      valuesVars[index][idx] = []
      datesOrder.forEach((e, i) => {
        let dataFound = dataVars[index][idx].find(elm => elm.x === e)
        if (dataFound) valuesVars[index][idx][i] = dataFound.y;
      });
    }
  }

  let cont = 0;
  for (let index = 0; index < dataGraphic.numVarPhysics; index++) {
    const pos = ['left', 'right']
    const typeGraphic = ['line', 'bar']
    const idAxisY = `y${index}`

    for (let i = 0; i < dataGraphic.numDataByVarPhysics[index]; i++) {
      scalesGraphic[idAxisY]= {
        type: 'linear',
        position: pos[dataGraphic.positionAxisY[index]],
        title: {
          display: true,
          text: dataGraphic.namesAxisY[index]
        },
        grid: {
          display: true, // Oculta la grilla de este eje
          drawOnChartArea: false, // Esto evita que las líneas de la cuadrícula se superpongan
        },
      }
    }

    //se rellenar los ejes Y que se van a utilizar
    for (let i = 0; i < dataGraphic.numDataByVarPhysics[index]; i++) {
      cont = cont + 1
      datasetGraphic[cont - 1] = {
        type: typeGraphic[dataGraphic.type[index]],
        data: valuesVars[index][i],
        label: dataGraphic.namesVar[index][i],
        borderColor: `rgb(${colors[cont][0]},${colors[cont][1]},${colors[cont][2]})`,
        backgroundColor: `rgb(${colors[cont][0]},${colors[cont][1]},${colors[cont][2]},${dataGraphic.opacity[index]})`,
        borderWidth: 1,
        fill: true,
        spanGaps: true,
        showLine: true,
        pointRadius: 2,
        pointHoverBackgroundColor: `rgb(${colors[cont][0]},${colors[cont][1]},${colors[cont][2]})`,
        yAxisID: idAxisY
      }
    }
  }

  const options = {
    interaction: {
      mode: "index",
      intersect: true
    },
    scales: scalesGraphic,
    decimation:{
      enabled: true,
      samples: 12
    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0.4,
        loop: 0
      },
    },
    plugins: {
      legend: {
        display: true,
        title: {
          display: dataGraphic.title ? true : false,
          text: dataGraphic.title,
          font: {
            size: 15,
          }
        }
      },
      tooltip: {
        enabled: true
      },
      responsive: true,
      zoom: {
        pan: {
          enabled: dataGraphic.zoom,
          mode: 'xy',
          modifierKey: "ctrl"
        },
        zoom: {
          drag: {
            enabled: dataGraphic.zoom,
            speed: 0.1
          },
          mode: 'x',
        },
      },
    }
  }
  const data = {
    labels: labelsGraphic,
    datasets: datasetGraphic
  };

  return {options, data}
}

export default chartGenerator
