
import DataURIParser from 'datauri/parser.js'; // Correct import path

const getDataUri = (file) => {
  const parser = new DataURIParser();
  return parser.format(file.mimetype, file.buffer);
};

export default getDataUri;

