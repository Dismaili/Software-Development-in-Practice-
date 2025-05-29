import checkSelfCollision from '../checkSelfCollision.js';

test('blocks move left when self is to the left', () => {
  const gameState = {
    you: {
      body: [{ x: 5, y: 5 }, { x: 4, y: 5 }]
    }
  };
  const myHead = { x: 5, y: 5 };
  let isMoveSafe = { up: true, down: true, left: true, right: true };

  const result = checkSelfCollision(gameState, myHead, isMoveSafe);
  expect(result.left).toBe(false);
});
