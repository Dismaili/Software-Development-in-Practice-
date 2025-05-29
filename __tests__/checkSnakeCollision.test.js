import checkSnakeCollision from '../checkSnakeCollision.js';

test('blocks move up when enemy snake is above', () => {
  const gameState = {
    board: {
      snakes: [
        {
          body: [{ x: 5, y: 6 }]
        }
      ]
    },
    you: { body: [{ x: 5, y: 5 }] }
  };
  const myHead = { x: 5, y: 5 };
  let isMoveSafe = { up: true, down: true, left: true, right: true };

  const result = checkSnakeCollision(gameState, myHead, isMoveSafe);
  expect(result.up).toBe(false);
});
