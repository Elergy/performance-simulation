function getLogSystem(timeToRotate, maxFileSize) {
  return {
    type: 'logSystem',

    start() {
      this.currentLog = 0;
      this.lastRotateTime = 0;
    },

    onMessage(sender, recordSize) {
      this.currentLog += recordSize;
      this.tryRotate();
    },

    tryRotate() {
      if (this.currentLog >= maxFileSize || this.time() - this.lastRotateTime >= timeToRotate) {
        console.log(`Rotate when log has ${this.currentLog} bytes`);
        this.currentLog = 0;
        this.lastRotateTime = this.time();
      }
    }
  };
}

module.exports.getLogSystem = getLogSystem;