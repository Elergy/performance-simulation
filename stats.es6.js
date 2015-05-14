let sim = require('./sim.es6');

const STATS_INTERVAL = 20000;

let stats = {
  _stats: {},

  start() {
    this.messageQueue = _.find(sim.entities, (entity) => entity.type === 'messageQueue');
    this.parsers = sim.entities.filter((entity) => entity.type === 'parser');

    this.collectStats();
  },

  collectStats() {
    let time = this.time();

    this.addStatObject('queueSize', this.messageQueue.getQueueSize());
    this.addStatObject('busyParsers', this.parsers.filter((parser) => parser.isBusy()).length);
    this.addStatObject('freeParsers', this.parsers.filter((parser) => !parser.isBusy()).length);

    this.setTimer(STATS_INTERVAL).done(this.collectStats);
  },

  addStatObject(type, value) {
    this._stats[type] = this._stats[type] || {};
    this._stats[type][this.time()] = value;
  },

  getStats() {
    return this._stats;
  }
};

module.exports = stats;