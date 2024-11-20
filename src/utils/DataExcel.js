let data = {};
let titleFile = "";

function addDataFiles(dataGraphic, nameData) {
  data[`"${nameData}"`] = dataGraphic;
}

function addTitle(title) {
  titleFile = title;
}

function clearDataFile() {
  data = {};
}

export { addDataFiles, clearDataFile, data, titleFile, addTitle };
