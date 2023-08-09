const events = require('../eventPool.js');
require('./driver.index')
const payload = {
  payload: {
    store: '',
    orderId: '',
    customer: '',
    address: '',
  }
}

describe('are events calling functions?', () => {
  it('should call our handler function', () => {
    const spy = jest.spyOn(console, 'log');
    
  })
})