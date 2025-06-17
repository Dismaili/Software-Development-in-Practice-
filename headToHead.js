/**
 * Prevents head-to-head collisions with larger or equal-sized enemy snakes.
 * A head-to-head collision occurs when two snake heads meet in the same cell.
 * The snake with less length dies in a head-to-head collision.
 * 
 * @param {Object} gameState - The current state of the game
 * @param {Object} gameState.you - Information about your snake
 * @param {Array<Object>} gameState.you.body - Array of coordinates for your snake's body segments
 * @param {string} gameState.you.id - Your snake's unique identifier
 * @param {number} gameState.you.length - Length of your snake
 * @param {Object} gameState.board - Information about the game board
 * @param {Array<Object>} gameState.board.snakes - Array of all snakes on the board
 * @param {Object} isMoveSafe - Object tracking the safety of each possible move direction
 * @param {boolean} isMoveSafe.left - Whether moving left is safe
 * @param {boolean} isMoveSafe.right - Whether moving right is safe
 * @param {boolean} isMoveSafe.up - Whether moving up is safe
 * @param {boolean} isMoveSafe.down - Whether moving down is safe
 * @returns {Object} Updated isMoveSafe object with moves that could result in losing head-to-head collisions marked as false
 */
export function avoidHeadToHeadMoves(gameState, isMoveSafe) {
    const myHead = gameState.you.body[0];
    const myLength = gameState.you.length;
    const opponents = gameState.board.snakes;
  
    for (const snake of opponents) {
      if (snake.id === gameState.you.id) continue; // Skip self
  
      const enemyHead = snake.body[0];
      const enemyLength = snake.length;
  
      // potential positions enemy could move to next turn
      const dangerZones = [
        { x: enemyHead.x + 1, y: enemyHead.y, dir: "left" },
        { x: enemyHead.x - 1, y: enemyHead.y, dir: "right" },
        { x: enemyHead.x, y: enemyHead.y + 1, dir: "down" },
        { x: enemyHead.x, y: enemyHead.y - 1, dir: "up" },
      ];
  
      for (const zone of dangerZones) {
        if (zone.x === myHead.x && zone.y === myHead.y && enemyLength >= myLength) {
          // don't move into a head-to-head or likely you'll lose
          isMoveSafe[zone.dir] = false;
        }
      }
    }
  
    return isMoveSafe;
  }