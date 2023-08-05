'use strict';

const events = require('../eventPool.js');
// let chance = new Chance();

events.on('pickedUp', pickedUp);
events.on('inTransit', inTransit);
events.on('delivered', delivered)


function pickedUp(data) {
  console.log({event: 'pickedUp'}, 'Driver recieved order', data);
}

function inTransit(data) {
  console.log({event: 'inTransit'}, 'Driver: order on the way to ', data.payload.customer);
  }
  
  function delivered(data) {
  console.log({event: 'delivered'}, 'Driver: delivery complete', data);
  }

setInterval(() => {
  console.log('______________');
  let EVENT = {

      time: new Date(). getTime(),
      payload: {
        store: 'dots',
        orderId: Math.ceil(Math.random() * 100),
        customer: 'Jamal Braun',
        address: 'Schmittfort, LA',
      }
    }
    events.emit('pickupReady', EVENT)
}, 3000)