let _ = require('lodash');
let sim = require('./../sim.es6');


function getCollector() {
  return {
    type: 'collector',
    start() {
      this._logSystem = _.find(sim.entities, (entity) => entity.type === 'logSystem');
    },

    onMessage(sender, message) {
      if (sender.type === 'client') {
        this.send(message, 0, this._logSystem);
      }
    }
  };
}

module.exports.getCollector = getCollector;