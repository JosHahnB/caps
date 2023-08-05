'use strict';

const events = require('../eventPool.js');

events.on('pickupReady', pickupReady);



function pickupReady(data) {
  console.log({ event: 'pickupReady' }, 'driver: picked up order', data);
  events.emit('inTransit', data)
  events.emit('delivered', data)
}

