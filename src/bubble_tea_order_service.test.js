const {createOrderRequest} = require('./bubble_tea_order_service');
const bubbleTeaType = require('./bubble_tea_type');
const bubbleTeaMessenger = require('./bubble_tea_messenger');
jest.mock('./bubble_tea_messenger');
jest.mock('./simple_logger');

afterEach(() => {
  jest.clearAllMocks();
});

it.each([[{name: 'person1', address: '1st', debitCard: {digits: '1'}}],
  // eslint-disable-next-line func-call-spacing
  [{name: 'person2', address: '2nd', debitCard: {digits: '2'}}]])
// eslint-disable-next-line no-unexpected-multiline
('test successful bubble tea order req', (dummyPaymentDetails) => {
  const bubbleTeaRequest = {
    paymentDetails: dummyPaymentDetails,
    bubbleTea: {
      type: bubbleTeaType.MATCHAMILKTEA,
    },
  };

  // Act
  const orderRequest = createOrderRequest(bubbleTeaRequest);

  // Assert
  expect(orderRequest.name).toBe(dummyPaymentDetails.name);
  expect(orderRequest.digits).toBe(dummyPaymentDetails.debitCard.digits);
  expect(bubbleTeaMessenger.sendBubbleTeaOrderRequestEmail)
      .toHaveBeenCalledWith(orderRequest);
  expect(bubbleTeaMessenger.sendBubbleTeaOrderRequestEmail)
      .toHaveBeenCalledTimes(1);
});
