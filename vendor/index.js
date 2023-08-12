'use strict';

// const events = require('../eventPool.js');


// events.on('pickedUp', pickedUp);
// events.on('inTransit', inTransit);
// events.on('delivered', delivered)


// function pickedUp(data) {
//   console.log({ event: 'pickedUp' }, 'Driver recieved order', data);
// }

// function inTransit(data) {
//   console.log({ event: 'inTransit' }, 'Driver: order on the way to ', data.payload.customer);
// }

// function delivered(data) {
//   console.log({ event: 'delivered' }, 'Driver: delivery complete', data);
// }

// setInterval(() => {
//   console.log('______________');
//   let EVENT = {

//     time: new Date().getTime(),
//     payload: {
//       store: 'dots',
//       orderId: Math.ceil(Math.random() * 100),
//       customer: 'Jamal Braun',
//       address: 'Schmittfort, LA',
//     }
//   }
//   events.emit('pickupReady', EVENT)
// }, 3000)


let Chance = require('chance');
let chance = new Chance();
const { io } = require('socket.io-client');
const { EVENT_NAMES } = require('../utility.js');

// ws means web socket
const client = io('ws://localhost:3000/caps');

function orderObj() {
  const payload = {
    store: chance.city(),
    orderId: chance.integer({ min: 100, max: 199 }),
    customer: chance.name(),
    address: chance.address(),
  }
  console.log(payload);
  client.emit(EVENT_NAMES.pickup, payload)
}

function vendorQueue() {
  setInterval(() => {
    orderObj();
  }, 2000
  )
}

// client.emit(EVENT_NAMES.pickup, payload);

client.on(EVENT_NAMES.announcement, (payload) => console.log(payload.orderId)
);
client.on(EVENT_NAMES.pickedUp, (payload) =>
  console.log('package has been picked up by driver', payload.orderId)
);
client.on(EVENT_NAMES.inTransit, (payload) =>
  console.log('the package is in transit', payload.orderId)
);
client.on(EVENT_NAMES.delivered, (payload) =>
  console.log(payload.message, payload.orderId)
);
vendorQueue();

module.exports = { client, orderObj };