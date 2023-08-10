// export sockets to test them, then require them into the test file

const {
  startSocketServer,
  // handleInTransit,
  // handleDelivered,
  io
} = require('./hub.js')

// events should not be wrapped
const events = require('./utility.js')


describe('test the hub functionality', () => {
  test('starts socket server and logs that it connected', () => {
    const mockLog = jest.spyOn(console, 'log method')
    startSocketServer();
    expect(mockLog).toHaveBeenCalledWith('The server has been started')
  })
  test('handleInTransit takes a payload and emits the payload', () => {
    const payload = {
      orderId: 1,
    };
    const mockEmit = jest.spyOn(caps, 'emit')
    handleInTransit(payload)
    expect(mockLog).toHaveBeenCalledWith('the package is in transit', payload.payload.orderId)
    expect(mockEmit).toHaveBeenCalledWith(events.inTransit, expect.objectContaining({orderId: 1}))
  })


  io.close
})