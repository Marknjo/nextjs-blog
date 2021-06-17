import path from 'path';

/**
 * Get's the file path of the json file (Where to save or fetch)
 *
 * @param {String} fileName | The name of the file i.e. comments
 * @param {Object} [folderPath?] | Array of paths i.e. ['data', 'comments']
 * @returns String
 */
export function getFilePath(fileName, folderPath = ['data']) {
  return path.join(process.cwd(), ...folderPath, `${fileName}.json`);
}
