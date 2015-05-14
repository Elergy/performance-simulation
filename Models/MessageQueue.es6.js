class MessageQueue {
  constructor() {
    this.type = 'messageQueue';
    this._queue = [];
  }

  start() {
  }

  onMessage(sender, logFile) {
    if (sender.type === 'logSystem') {
      this._queue.push(logFile);
    }
  }

  getLogFile() {
    return this._queue.shift();
  }

  getQueueSize() {
    return this._queue.length;
  }
}

module.exports = MessageQueue;