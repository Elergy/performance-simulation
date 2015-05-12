let sim = require('./sim.es6');

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
var logSystem = sim.addEntity(require('./Models/LogSystem.es6').getLogSystem(5 * 60, 5 * 1024 * 1024));
var collector = sim.addEntity(require('./Models/Collector.es6').getCollector(logSystem));
var client = require('./Models/Client.es6.js').getClient(80, 500, collector);
sim.addEntity(client);

sim.simulate(60 * 60);

