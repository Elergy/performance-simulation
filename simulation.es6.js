let sim = require('./sim.es6');
let Random = require('./node_modules/simjs/dist/random-node-0.25');

let models = require('./Models');

//let requestMaker = {
//  messageLength: 10,
//  messagesPerSecond: 10,
//
//  start() {
//    this.setTimer(1).done(this.sendMessage);
//  },
//
//  sendMessage() {
//    console.log('send message!!');
//    this.setTimer(1).done(this.sendMessage);
//  }
//};
//
//var et = sim.addEntity(requestMaker);

function getClientCount(hour) {
  let random = new Random(new Date());
  let clientPerHour = [4200, 3100, 2750, 2400, 2300, 2500, 2600, 3000, 3200, 3500, 4000, 4200, 4400, 4600, 4700, 4800, 5000, 5300, 5500, 6000, 6500, 6900, 6000, 5000];

  return Math.round(clientPerHour[hour] / 60 / 60 * random.normal(3, 1));
}

function getMessage() {
  let random = new Random(new Date());
  return {
    length: 60 * random.normal(1, 0.1)
  };
}

function getMessagesCount() {
  let random = new Random(new Date());
  return random.normal(5, 2);
}

let logSystem = new models.LogSystem(5 * 1024 * 1024, 5 * 60 * 1000);
let collector = new models.Collector();
let client = new models.Client(getClientCount, getMessage, getMessagesCount);

sim.addEntity(logSystem);
sim.addEntity(collector);
sim.addEntity(client);

sim.simulate(60 * 60 * 1000);


