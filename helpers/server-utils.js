import path from 'path';
import fs from 'fs';

/**
 *
 * Get's the file path of the json file (Where to save or fetch)
 *
 * @param {String} fileName | The name of the file i.e. comments
 * @param {Object} [folderPath?] | Array of paths i.e. ['data', 'comments']
 * @returns String | Json file
 */
export function getFilePath(fileName, folderPath = ['data']) {
  return path.join(process.cwd(), ...folderPath, `${fileName}.json`);
}

/**
 *
 * Extracts/Reads data stored in a .json file
 *
 * @param {String} filePath | Path to the JSON file
 * @returns Object | Arrays of stored objects
 */
export function extractDataFromJsonFile(filePath) {
  const fileData = fs.readFileSync(filePath);

  //get raw data from json file
  return JSON.parse(fileData);
}

/**
 *
 * Save to the Json file
 *
 * @param {Object} data | Data to save to json file
 * @param {String} filePath | Location of the json file
 * @param {Object} reqData | New data to merge with the saved data
 *
 * @return null
 */
export function saveDataToJsonFile(data, filePath, reqData) {
  data = [reqData, ...data];
  //write data to the file on the disk
  fs.writeFileSync(filePath, JSON.stringify(data));

  return null;
}
