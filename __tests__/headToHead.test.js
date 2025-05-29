import { avoidHeadToHeadMoves } from '../headToHead.js';

test('blocks head-to-head when enemy is stronger and can move into our head', 
    () => {
  const gameState = {
    you: {
      id: "my-id",
      body: [{ x: 5, y: 5 }],
      length: 3
    },
    board: {
      snakes: [
        {
          id: "enemy-id",
          body: [{ x: 5, y: 4 }],
          length: 5
        }
      ]
    }
  };
  let isMoveSafe = { up: true, down: true, left: true, right: true };

  const result = avoidHeadToHeadMoves(gameState, isMoveSafe);
  expect(result.up).toBe(false);
});
