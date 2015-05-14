class LogFile {
  constructor() {
    this._items = [];
    this._size = 0;
  }

  addLog(message) {
    this._items.push(message);
    this._size += message.length;
  }

  getSize() {
    return this._size;
  }

  getLog() {
    return this._items.shift();
  }
}

module.exports = LogFile;