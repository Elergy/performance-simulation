let _ = require('lodash');

let sim = require('./../sim.es6');

const MESSAGES_SEND_DELAY = 0;

class Collector {
  constructor() {
    this.type = 'collector';
    this.logSystem = _.find(sim.entities, (entity) => entity.type === 'logSystem');
  }

  start() {

  }

  onMessage(sender, messages) {
    if (sender.type === 'client') {
      messages.forEach((message) => {
        message._time = this.time();

        this.send(message, MESSAGES_SEND_DELAY, this.logSystem);
      });
    }
  }
}

module.exports = Collector;