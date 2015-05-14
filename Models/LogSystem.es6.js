let LogFile = require('./LogFile.es6');
let sim = require('./../sim.es6');

class LogSystem {
  constructor(maxLogSize, timeToRotate) {
    this.type = 'logSystem';
    this.maxLogSize = maxLogSize;
    this.timeToRotate = timeToRotate;

    this.currentLog = new LogFile();
    this.lastRotateTime = 0;

    this.messageQueue = _.find(sim.entities, (entity) => entity.type === 'messageQueue');
  }

  start() {

  }

  onMessage(sender, message) {
    if (sender.type === 'collector') {
      this.currentLog.addLog(message);
      this.tryRotate();
    }
  }

  tryRotate() {
    //console.log(this.time());
    //console.log(this.time() - this.lastRotateTime);
    if (this.currentLog.getSize() >= this.maxLogSize || this.time() - this.lastRotateTime >= this.timeToRotate) {
      console.log(`rotate when time is ${this.time()} size is ${this.currentLog.getSize() / 1024 / 1024} MB`);

      this.send(this.currentLog, 0, this.messageQueue);

      this.currentLog = new LogFile();
      this.lastRotateTime = this.time();

      //TODO: send to Queue
    }
  }
}

module.exports = LogSystem;