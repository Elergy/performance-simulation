let _ = require('lodash');

let sim = require('./../sim.es6');

const MESSAGE_PARSE_TIME = 5;
const CHECK_LOG_INTERVAL = 100;

class Parser {
  constructor() {
    this.type = 'parser';

    this.busy = false;
  }

  start() {
    this.messageQueue = _.find(sim.entities, (entity) => entity.type === 'messageQueue');
    this.tryToGetLog();
  }

  tryToGetLog() {
    if (!this.busy) {
      let logs = this.messageQueue.getLogFile();
      if (logs) {
        this.busy = true;
        this.parse(logs);
      }
    }

    this.setTimer(CHECK_LOG_INTERVAL).done(this.tryToGetLog);
  }

  parse(logs) {
    let log = logs.getLog();
    if (log) {
      let time = log.time || 0;
      this.setTimer(time + MESSAGE_PARSE_TIME).done(() => {
        this.parse(logs);
      });
    } else {
      this.busy = false;
    }
  }
  
  isBusy() {
    return this.busy;
  }
}

module.exports = Parser;