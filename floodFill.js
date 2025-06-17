/**
 * Performs a flood fill algorithm to calculate the accessible area from a starting point.
 * Uses breadth-first search to explore connected empty cells marked as '.' on the board.
 * 
 * @param {Array<Array<string>>} board - 2D array representing the game board
 *                                       '.' represents empty space
 *                                       Other characters represent obstacles
 * @param {number} startX - Starting X coordinate for the flood fill
 * @param {number} startY - Starting Y coordinate for the flood fill
 * @returns {number} The total number of connected empty cells accessible from the starting point
 * 
 * @example
 * const board = [
 *   ['.', '.', '#'],
 *   ['.', '#', '.'],
 *   ['#', '.', '.']
 * ];
 * floodFill(board, 0, 0); // Returns 2 (can only reach two '.' cells from 0,0)
 */
function floodFill(board, startX, startY) {
    const rows = board.length;
    const cols = board[0].length;
  
    if (board[startY][startX] !== '.') {
      return 0;
    }
  
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const queue = [[startX, startY]];
    visited[startY][startX] = true;
  
    let area = 0;
    const directions = [
      [0, 1], [1, 0], [0, -1], [-1, 0]
    ];
  
    while (queue.length > 0) {
      const [x, y] = queue.shift();
      area++;
  
      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
  
        if (
          nx >= 0 && ny >= 0 &&
          nx < cols && ny < rows &&
          board[ny][nx] === '.' &&
          !visited[ny][nx]
        ) {
          visited[ny][nx] = true;
          queue.push([nx, ny]);
        }
      }
    }
  
    return area;
  }
  
  module.exports = floodFill;
  