import fs from 'fs';
import { isArray } from 'lodash';
import path from 'path';

//1.save
//2. read
//@TODO: 3. Delete
//@TODO: 4. Edit

/**
 *
 * Get's the JSON file from the directory saved
 *
 * @param {String} fileName Name of the json file
 * @param {String | Array} [fileDir?] Default is 'data' or supply A string of director i.e. data/files or array of dirs i.e ['data', 'contacts']
 * @returns {String} path to the string
 */
export function getJsonFilePath(fileName, fileDir = 'data') {
  const generateFileDir = suppliedDir => {
    if (isArray(suppliedDir)) {
      if (suppliedDir.length > 1) {
        return suppliedDir.join(', ');
      }

      return suppliedDir.join('');
    }

    return suppliedDir;
  };

  const filePath = path.join(
    process.cwd(),
    generateFileDir(fileDir),
    `${fileName}.json`
  );

  return filePath;
}

/**
 *
 * Fetches all data store in a Json file
 *
 * @param {String} filePath A string of the path the json file is saved
 * @returns {Array} Array of fetched data
 */
export function fetchAllDataFromAJsonFile(filePath) {
  const fileData = fs.readFileSync(filePath);

  const data = JSON.parse(fileData);

  return data;
}

/**
 *
 * Saved some data to a json file store in a local file system
 *
 * @param {Object} newData An object literal of data to be merged and saved to the Json File
 * @param {String} fileName Name of the json file
 * @param {String | Array} [fileDir?] Default is 'data' or supply A string of director i.e. data/files or array of dirs i.e ['data', 'contacts']
 * @returns {void} doest return anything
 */
export function saveToJsonFile(newData, fileName, fileDir = 'data') {
  const filePath = getJsonFilePath(fileName, fileDir);

  //fetch data from json file
  const fetchedData = fetchAllDataFromAJsonFile(filePath);

  //recreate the new data
  const data = [newData, ...fetchedData];

  //save the newData + existing
  fs.writeFileSync(filePath, JSON.stringify(data));

  return null;
}
