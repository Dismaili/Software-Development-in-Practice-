import checkSelfCollision from '../checkSelfCollision.js';

describe('checkSelfCollision', () => {
  test('disallows moves into snake body segments adjacent to head', () => {
    const myHead = { x: 5, y: 5 };
    const gameState = {
      you: {
        body: [
          { x: 5, y: 5 }, // head
          { x: 4, y: 5 }, // left
          { x: 6, y: 5 }, // right
          { x: 5, y: 6 }, // up
          { x: 5, y: 4 }  // down
        ]
      }
    };
    const isMoveSafe = {
      left: true,
      right: true,
      up: true,
      down: true,
    };

    const updated = checkSelfCollision(gameState, myHead, isMoveSafe);
    expect(updated.left).toBe(false);
    expect(updated.right).toBe(false);
    expect(updated.up).toBe(false);
    expect(updated.down).toBe(false);
  });

  test('allows all moves if no adjacent body segments', () => {
    const myHead = { x: 5, y: 5 };
    const gameState = {
      you: {
        body: [
          { x: 5, y: 5 }, // head
          { x: 3, y: 3 },
          { x: 7, y: 7 }
        ]
      }
    };
    const isMoveSafe = {
      left: true,
      right: true,
      up: true,
      down: true,
    };

    const updated = checkSelfCollision(gameState, myHead, isMoveSafe);
    expect(updated.left).toBe(true);
    expect(updated.right).toBe(true);
    expect(updated.up).toBe(true);
    expect(updated.down).toBe(true);
  });
});
