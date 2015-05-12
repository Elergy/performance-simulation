var _ = require('lodash');

function getClient(messageLength, messagesPerSecond, statsCollector) {
  return {
    type: 'client',
    start() {
      this.setTimer(1).done(() => {
        this.sendMessage(this.messagesPerSecond);
        this.start();
      });
    },

    sendMessage() {
      _.range(messagesPerSecond).forEach(() => {
        this.send(messageLength, 0, statsCollector);
      });
    }
  };
}

module.exports.getClient = getClient;