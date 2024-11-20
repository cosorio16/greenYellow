// "Corriente",
// "Energia Activa",
// "Factor de Potencia",
// "Potencia Activa",
// "circuito"
// "Compuestos Organicos Volatiles",
// "Concentración de CO2",
// "Humedad Relativa",
// "Lumenes",
// "Presencia"

function calculateGroupTime(days) {
  if (days <= 1) return 2;
  if (days <= 3) return 5;
  if (days <= 5) return 10;
  if (days <= 8) return 15;
  if (days <= 11) return 20;
  if (days <= 21) return 30;
  if (days <= 30) return 60;
  if (days > 30) return days*2
}

async function getDataDB(nameData, numberdata, timeMin, timeMax, type, numberTopic) {
  let queryDB = ''
  let result = [];
  let days = (new Date(timeMax).getTime() - new Date(timeMin).getTime()) / 86400000
  let timeGroup = Math.round(calculateGroupTime(days))

  if(days <= 0.5) {
    if (type == 'Sensor'){
      for (let i=0; i<numberTopic; i++) {
        queryDB += `SELECT "${nameData}" AS "last" FROM "autogen"."edificio" WHERE ("nombre"::tag = '${type} ${numberdata}') AND time >= '${timeMin}' + 5h and time <= '${timeMax}' + 5h fill(null) tz('America/Bogota');`
      }
    } else if (type == 'Medidor') {
      for (let i=0; i<numberTopic; i++) {
        let typeVar = i==3 ? "Total" : i+1;
        queryDB += `SELECT "${nameData}" AS "last" FROM "autogen"."edificio" WHERE ("circuito"::tag = '${typeVar}' AND "nombre"::tag = '${type} ${numberdata}') AND time >= '${timeMin}' + 5h and time <= '${timeMax}' + 5h fill(null) tz('America/Bogota');`
      }
    }
  } else {
    if(type == 'Sensor') {
      for (let i=0; i<numberTopic; i++) {
        queryDB += `SELECT last("${nameData}") FROM "autogen"."edificio" WHERE ("nombre"::tag = '${type} ${numberdata}') AND time >= '${timeMin}' + 5h and time <= '${timeMax}' + 5h GROUP BY time(${timeGroup}m) fill(null) tz('America/Bogota');`
      }
    }else if (type == 'Medidor') {
      for (let i=0; i<numberTopic; i++) {
        let typeVar = i==3 ? "Total" : i+1;
        queryDB += `SELECT last("${nameData}") FROM "autogen"."edificio" WHERE ("circuito"::tag = '${typeVar}' AND "nombre"::tag = '${type} ${numberdata}') AND time >= '${timeMin}' + 5h and time <= '${timeMax}' + 5h GROUP BY time(${timeGroup}m) fill(null) tz('America/Bogota');`
      }
    }
  }

  let response = await fetch( "http://74.208.139.232:1880/greenyellow", {
  method: 'POST',
  headers: {'Content-Type': 'text/plain'},
  body: queryDB,
  })
  .then(r => r.json())
  .then(res => {
    if(type == 'Sensor') {
      result = numberTopic <= 1 
        ? [res.map(elm => ({ x: new Date(elm.time).getTime(), y: elm.last }))]
        : res.map(elm => elm.map(e => ({ x: new Date(e.time).getTime(), y: e.last })));
    }else if (type == 'Medidor') {
      result = numberTopic <= 1 
        ? [res.map(elm => ({ x: new Date(elm.time).getTime(), y: elm.last }))]
        : res.map(elm => elm.map(e => ({ x: new Date(e.time).getTime(), y: e.last })));
    }
    return result
  })
  .catch(error => console.error('Error:', error))
  return response 
}

async function totalAccumulatedEnergy(nameData, numberdata, timeMin, timeMax) {
  let queryDB = ''
  let result = [];
  let totalToAddResult = [];

  queryDB =`SELECT LAST("${nameData}") - FIRST("${nameData}") AS "consumo" FROM edificio WHERE "nombre"='Medidor ${numberdata}' AND time >= '${timeMin}' + 5h AND time < '${timeMax}' + 5h GROUP BY time(24h), "circuito" tz('America/Bogota')`

  let response = await fetch( "http://74.208.139.232:1880/greenyellow", {
  method: 'POST',
  headers: {'Content-Type': 'text/plain'},
  body: queryDB,
  })
  .then(r => r.json())
  .then(res => {
    res.map(e => {
      if(e.circuito != 'Total') {
        result[e.circuito - 1] = !result[e.circuito-1] ? [] : result[e.circuito-1]
        result[e.circuito - 1].push({x: e.time, y:e.consumo})
      } else { 
        totalToAddResult.push({x: e.time, y:e.consumo})
      }
    })
    if (res[0]) result[result.length] = totalToAddResult
    else result = []
    return result
  })
  .catch(error => console.error('Error:', error))

  return response
}



export { getDataDB, totalAccumulatedEnergy }