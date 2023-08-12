const { EVENT_NAMES } = require('../utility.js');

const handleReady = (payload, client) => {
  console.log('the package is erady to be picked up');
  setTimeout(() => {
    client.emit(EVENT_NAMES.inTransit, payload);
  }, 2000);
  setTimeout(() => {
    console.log('the package has been delivered');
    client.emit(EVENT_NAMES.delivered, payload);
  }, 5000);
}

module.exports = { handleReady }