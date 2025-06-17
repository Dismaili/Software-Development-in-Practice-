/**
 * Checks if any potential move would result in a collision with other snakes on the board.
 * 
 * @param {Object} gameState - The current state of the game
 * @param {Object} gameState.board - Information about the game board
 * @param {Array<Object>} gameState.board.snakes - Array of all snakes on the board
 * @param {Array<Object>} gameState.board.snakes[].body - Array of coordinates for each snake's body segments
 * @param {Object} myHead - The coordinates of your snake's head
 * @param {number} myHead.x - X-coordinate of the snake's head
 * @param {number} myHead.y - Y-coordinate of the snake's head
 * @param {Object} isMoveSafe - Object tracking the safety of each possible move direction
 * @param {boolean} isMoveSafe.left - Whether moving left is safe
 * @param {boolean} isMoveSafe.right - Whether moving right is safe
 * @param {boolean} isMoveSafe.up - Whether moving up is safe
 * @param {boolean} isMoveSafe.down - Whether moving down is safe
 * @returns {Object} Updated isMoveSafe object with moves that would result in snake collisions marked as false
 */
export default function checkSnakeCollision(gameState, myHead, isMoveSafe) {
  gameState.board.snakes.forEach((snake) => {
    snake.body.forEach((segment) => {
      if (segment.x === myHead.x - 1 && segment.y === myHead.y)
        isMoveSafe.left = false;
      if (segment.x === myHead.x + 1 && segment.y === myHead.y)
        isMoveSafe.right = false;
      if (segment.x === myHead.x && segment.y === myHead.y - 1)
        isMoveSafe.down = false;
      if (segment.x === myHead.x && segment.y === myHead.y + 1)
        isMoveSafe.up = false;
    });
  });

  return isMoveSafe;
}
