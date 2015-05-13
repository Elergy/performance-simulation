let _ = require('lodash');

let sim = require('./../sim.es6');

const MESSAGES_SEND_DELAY = 30;
const SIMULATION_INTERVAL = 1000;

class Client {
  constructor(getClientsCount, getMessage, getMessagesCount) {
    this.getClientsCount = getClientsCount;
    this.getMessage = getMessage;
    this.getMessagesCount = getMessagesCount;

    this.collector = _.find(sim.entities, (entity) => entity.type === 'collector');
  }

  static get type() {
    return 'client';
  }

  start() {
    this.sendMessages();
  }

  sendMessages() {
    let clientsCount = this.getClientsCount(Math.round(this.time() / 60 / 60 / 1000));
    for (let i = 0; i < clientsCount; i++) {
      let messagesCount = this.getMessagesCount();
      let messages = _.range(messagesCount)
        .map(() => this.getMessage());

      this.send(messages, MESSAGES_SEND_DELAY, this.collector);
    }

    this.setTimer(SIMULATION_INTERVAL).done(this.sendMessages);
  }
}

module.exports = Client;