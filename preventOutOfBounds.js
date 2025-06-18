/**
 * Prevents the snake from moving outside the game board boundaries.
 * 
 * @param {Object} myHead - The coordinates of your snake's head
 * @param {number} myHead.x - X-coordinate of the snake's head
 * @param {number} myHead.y - Y-coordinate of the snake's head
 * @param {Object} gameState - The current state of the game
 * @param {Object} gameState.board - Information about the game board
 * @param {number} gameState.board.width - Width of the game board
 * @param {number} gameState.board.height - Height of the game board
 * @param {Object} isMoveSafe - Object tracking the safety of each possible move direction
 * @param {boolean} isMoveSafe.left - Whether moving left is safe
 * @param {boolean} isMoveSafe.right - Whether moving right is safe
 * @param {boolean} isMoveSafe.up - Whether moving up is safe
 * @param {boolean} isMoveSafe.down - Whether moving down is safe
 * @returns {Object} Updated isMoveSafe object with moves that would go out of bounds marked as false
 */
export function preventOutOfBounds(myHead, gameState, isMoveSafe) {
  const boardWidth = gameState.board.width;
  const boardHeight = gameState.board.height;

  if (myHead.x === 0) isMoveSafe.left = false;
  if (myHead.x === boardWidth - 1) isMoveSafe.right = false;
  if (myHead.y === 0) isMoveSafe.down = false;
  if (myHead.y === boardHeight - 1) isMoveSafe.up = false;

  return isMoveSafe;
}
