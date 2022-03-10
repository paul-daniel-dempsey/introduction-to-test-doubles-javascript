const {createOrderRequest} = require('./bubble_tea_order_service');
const bubbleTeaType = require('./bubble_tea_type');
const bubbleTeaMessenger = require('./bubble_tea_messenger');
jest.mock('./bubble_tea_messenger');
jest.mock('./simple_logger');

afterEach(() => {
  jest.clearAllMocks();
});

it.each([
  ['person1', '1st Street', '1'],
  ['person2', '2nd Street', '21'],
  ['person3', '3nd Street', '321'],
])('test successful bubble tea order req [%s]', (name, address, digits) => {
  // Arrange
  const dummyPaymentDetails = {
    name: name,
    address: address,
    debitCard: {
      digits: digits,
    },
  };
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
