const floodFill = require('../floodFill');

describe('Flood Fill Algorithm', () => {
  test('Empty board, center start', () => {
    const board = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ];
    const result = floodFill(board, 1, 1);
    expect(result).toBe(9);
  });

  test('Board with walls', () => {
    const board = [
      ['#', '.', '#'],
      ['.', '.', '.'],
      ['#', '.', '#'],
    ];
    const result = floodFill(board, 1, 1);
    expect(result).toBe(5);
  });

  test('Start in a blocked cell', () => {
    const board = [
      ['#', '#', '#'],
      ['#', '#', '#'],
      ['#', '#', '#'],
    ];
    const result = floodFill(board, 1, 1);
    expect(result).toBe(0);
  });

  test('Start at edge', () => {
    const board = [
      ['.', '.', '.'],
      ['.', '#', '.'],
      ['.', '.', '.'],
    ];
    const result = floodFill(board, 0, 0);
    expect(result).toBe(8);
  });
});
