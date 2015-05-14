let Random = require('./node_modules/simjs/dist/random-node-0.25');
let random = new Random(new Date());

window.rand = random;

module.exports = random;