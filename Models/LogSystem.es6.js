let LogFile = require('./LogFile.es6');

class LogSystem {
  constructor(maxLogSize, timeToRotate) {
    this.maxLogSize = maxLogSize;
    this.timeToRotate = timeToRotate;

    this.currentLog = new LogFile();
    this.lastRotateTime = 0;
  }

  static get type() {
    return 'logSystem';
  }

  start() {

  }

  onMessage(sender, message) {
    this.currentLog.addLog(message);
    this.tryRotate();
  }

  tryRotate() {
    //console.log(this.time());
    //console.log(this.time() - this.lastRotateTime);
    if (this.currentLog.size >= this.maxLogSize || this.time() - this.lastRotateTime >= this.timeToRotate) {
      this.currentLog = new LogFile();
      this.lastRotateTime = this.time();

      console.log(`rotate when time is ${this.time()} size is ${this.maxLogSize}`);

      //TODO: send to Queue
    }
  }
}

module.exports = LogSystem;