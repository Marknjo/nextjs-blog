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
 *
 * @author Mark Njoroge
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
 *
 * @author Mark Njoroge
 */
export function saveDataToJsonFile(data, filePath, reqData) {
  data = [reqData, ...data];
  //write data to the file on the disk
  fs.writeFileSync(filePath, JSON.stringify(data));

  return null;
}

/**
 *
 * Fetches all comments for an event
 *
 * @param {String} eventId The current event id
 * @returns {Object} Arrays of current event's comment
 *
 * @author Mark Njoroge
 */
export function fetchAllEventComments(eventId) {
  const filePath = getFilePath('comments');
  const data = extractDataFromJsonFile(filePath);

  return data.filter(comment => comment.eventId === eventId);
}

/**
 *
 * Filters the comments to avoid sending uncessary data to the client
 *
 * @param {Object} allComments Unfiltered comments
 * @returns {Object} Array of mapped comments
 *
 * @author Mark Njoroge
 */
export function filteredComments(allComments) {
  return allComments.map(comment => ({
    id: comment.id,
    name: comment.name,
    text: comment.text,
  }));
}

/**
 * Gets events mapped for client side consumption
 * @param {String} eventId Event id which to fetch it's comments
 * @returns {Object} Array of mapped comments
 *
 * @author Mark Njoroge
 */
export function clientSideEventComments(eventId) {
  const allComments = fetchAllEventComments(eventId);
  return filteredComments(allComments);
}
