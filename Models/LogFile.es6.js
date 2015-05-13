class LogFile {
  constructor() {
    this._items = [];
    this._size = 0;
  }

  addLog(message) {
    this._items.push(message);
    this._size += message.length;
  }

  get size() {
    return this._size;
  }
}

module.exports = LogFile;