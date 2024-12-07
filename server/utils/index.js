const { v4: uuidv4 } = require('uuid');
const pino = require('pino')

const uuid = uuidv4();
const counter = (data, key) => {
  return data[key].sort((a, b) => b.id - a.id)[0];
}
const logger = pino();

module.exports = { uuid, counter, logger };
