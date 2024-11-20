let data = {}

function addDataFiles(dataGraphic, nameData) {
  data[`"${nameData}"`] = dataGraphic
}

function clearDataFile () {
  data = {}
}

export { addDataFiles, clearDataFile, data }