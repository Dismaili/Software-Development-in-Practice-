import { preventOutOfBounds } from '../preventOutOfBounds.js';

test('blocks move left at x = 0', () => {
  const myHead = { x: 0, y: 5 };
  const gameState = {
    board: { width: 11, height: 11 }
  };
  let isMoveSafe = { up: true, down: true, left: true, right: true };

  const result = preventOutOfBounds(myHead, gameState, isMoveSafe);
  expect(result.left).toBe(false);
});
