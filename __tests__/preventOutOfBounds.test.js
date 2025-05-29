import { preventOutOfBounds } from '../preventOutOfBounds.js';

test('preventOutOfBounds: disallows moves that would go off the board', () => {
  const boardWidth = 11;
  const boardHeight = 11;

  // Position at bottom-left corner (0,0)
  let myHead = { x: 0, y: 0 };
  let gameState = {
    board: {
      width: boardWidth,
      height: boardHeight,
    }
  };

  let isMoveSafe = { up: true, down: true, left: true, right: true };

  let updated = preventOutOfBounds(myHead, gameState, isMoveSafe);

  expect(updated.left).toBe(false);   // Can't move left off board
  expect(updated.down).toBe(false);   // Can't move down off board
  expect(updated.up).toBe(true);       // Can move up
  expect(updated.right).toBe(true);    // Can move right


  // Position at top-right corner (width-1, height-1)
  myHead = { x: boardWidth - 1, y: boardHeight - 1 };
  gameState = {
    board: {
      width: boardWidth,
      height: boardHeight,
    }
  };

  isMoveSafe = { up: true, down: true, left: true, right: true };

  updated = preventOutOfBounds(myHead, gameState, isMoveSafe);

  expect(updated.right).toBe(false);  // Can't move right off board
  expect(updated.up).toBe(false);     // Can't move up off board
  expect(updated.left).toBe(true);    // Can move left
  expect(updated.down).toBe(true);    // Can move down
});
