let sim = require('./sim.es6');
let random = require('./random.es6');
_ = require('lodash');
let React = require('react');
let LineChart = require('react-d3').LineChart;

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
  let clientPerHour = [56000, 33000, 20000, 14500, 17500, 29000, 40000, 64000, 84000,
    90000, 107000, 113000, 116000, 118000, 125000, 127000, 125000, 116000, 116000, 124000, 125000, 139000, 125000, 93000];

  let prevHour = hour - 1;
  let nextHour = hour + 1;

  prevHour = prevHour >= 0 ? prevHour : clientPerHour.length - 1;
  nextHour = nextHour !== clientPerHour.length ? nextHour : 0;

  let clients = _.sortByAll([clientPerHour[hour], clientPerHour[prevHour], clientPerHour[nextHour]], (x) => -x);

  return Math.round(random.uniform(clients[0], clients[1]) / 60 / 60 * random.normal(1.5, 0.4));
}

function getMessage() {
  return {
    length: Math.round(60 * random.normal(1, 0.1))
  };
}

function getMessagesCount() {
  return random.normal(10, 2);
}

let logSystem = new models.LogSystem(5 * 1024 * 1024, 5 * 60 * 1000);
let collector = new models.Collector();
let client = new models.Client(getClientCount, getMessage, getMessagesCount);
let messageQueue = new models.MessageQueue();
let parser1 = new models.Parser();
let parser2 = new models.Parser();

let stats = require('./stats.es6');

sim.addEntity(messageQueue);
sim.addEntity(logSystem);
sim.addEntity(collector);
sim.addEntity(client);
sim.addEntity(parser1);
sim.addEntity(parser2);
sim.addEntity(stats);

sim.simulate(24 * 60 * 60 * 1000);

let statsData = stats.getStats();
let freeParsers = statsData.freeParsers;
freeParsers = _.chain(freeParsers).map((value, key) => {
  return {
    time: Math.round(key / 60 / 1000),
    value: value
  };
}).groupBy('time')
  .map((arr, key) => {
    return {
      x: parseInt(key),
      y: _.sum(arr, (x) => x.value) / arr.length
    }
  }).value();

let data = [{
  name: 'freeParsers',
  values: freeParsers
}];

let queueSize = statsData.queueSize;
queueSize = _.chain(queueSize).map((value, key) => {
  return {
    time: Math.round(key / 60 / 1000),
    value: value
  };
}).groupBy('time')
  .map((arr, key) => {
    return {
      x: parseInt(key),
      y: _.sum(arr, (x) => x.value) / arr.length
    }
  }).value();

React.render(<LineChart data={data}
                       width={1200}
                       height={400}
                       legend={true}
    />, document.getElementById('container-parsers')
);

React.render(<LineChart data={{name: 'queue-size', values: queueSize}}
                        width={1200}
                        height={400}
                        legend={true}
    />, document.getElementById('container-queue')
);