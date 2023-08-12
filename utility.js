const Chance = require('chance');

const EVENT_NAMES = {
  pickup: "pickupReady",
  pickedUp: "driverPickedUp",
  inTransit: "inTransit",
  delivered: "packageDelivered",
  announcement: "announcement",
  ready: "ready",
};

class Queue {
  constructor() {
    this.queue = [];
  }

  // adds an item to the back of the queue
  enqueue(item) {
    this.queue.unshift(item)
  }

  // returns the item at the front of the queue
  dequeue() {
    return this.queue.pop();
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

module.exports = {EVENT_NAMES, Queue, Chance}