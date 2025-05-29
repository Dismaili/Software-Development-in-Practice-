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
  