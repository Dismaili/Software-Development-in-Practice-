
// Welcome to
// __________         __    __  .__                               __
// \______   \_____ _/  |__/  |_|  |   ____   ______ ____ _____  |  | __ ____
//  |    |  _/\__  \\   __\   __\  | _/ __ \ /  ___//    \\__  \ |  |/ // __ \
//  |    |   \ / __ \|  |  |  | |  |_\  ___/ \___ \|   |  \/ __ \|    <\  ___/
//  |________/(______/__|  |__| |____/\_____>______>___|__(______/__|__\\_____>
//
// This file can be a nice home for your Battlesnake logic and helper functions.
//
// To get you started we've included code to prevent your Battlesnake from moving backwards.
// For more info see docs.battlesnake.com

import runServer from './server.js';
import { preventOutOfBounds } from './preventOutOfBounds.js';
import checkSelfCollision from './checkSelfCollision.js';
import checkSnakeCollision from './checkSnakeCollision.js';
import { avoidHeadToHeadMoves } from './headToHead.js';
const floodFill = require('./floodFill');

function getNewHeadPosition(head, direction) {
  const moves = {
    up: { x: head.x, y: head.y - 1 },
    down: { x: head.x, y: head.y + 1 },
    left: { x: head.x - 1, y: head.y },
    right: { x: head.x + 1, y: head.y },
  };
  return moves[direction];
}

function buildFloodBoard(gameState) {
  const width = gameState.board.width;
  const height = gameState.board.height;
  const board = Array.from({ length: height }, () => Array(width).fill('.'));

  gameState.board.snakes.forEach(snake => {
    snake.body.forEach(segment => {
      board[segment.y][segment.x] = '#';
    });
  });

  return board;
}


// info is called when you create your Battlesnake on play.battlesnake.com
// and controls your Battlesnake's appearance
// TIP: If you open your Battlesnake URL in a browser you should see this data
function info() {
  console.log("INFO");

  return {
    apiversion: "1",
    author: "ichindris, dismaili, mmatevski, aganiu, rrama, jkotori123",      
    color: "#1E90FF", 
    head: "alligator",
    tail: "curled",  
  };
}

// start is called when your Battlesnake begins a game
function start(gameState) {
  console.log("GAME START");
}

// end is called when your Battlesnake finishes a game
function end(gameState) {
  console.log("GAME OVER\n");
}

// move is called on every turn and returns your next move
// Valid moves are "up", "down", "left", or "right"
// See https://docs.battlesnake.com/api/example-move for available data

function move(gameState) {

  let isMoveSafe = {
    up: true,
    down: true,
    left: true,
    right: true
  };

  // We've included code to prevent your Battlesnake from moving backwards
  const myHead = gameState.you.body[0];
  const myNeck = gameState.you.body[1];

  if (myNeck.x < myHead.x) {        // Neck is left of head, don't move left
    isMoveSafe.left = false;

  } else if (myNeck.x > myHead.x) { // Neck is right of head, don't move right
    isMoveSafe.right = false;

  } else if (myNeck.y < myHead.y) { // Neck is below head, don't move down
    isMoveSafe.down = false;

  } else if (myNeck.y > myHead.y) { // Neck is above head, don't move up
    isMoveSafe.up = false;
  }

  isMoveSafe = avoidHeadToHeadMoves(gameState, isMoveSafe);
  isMoveSafe = preventOutOfBounds(myHead, gameState, isMoveSafe);
  isMoveSafe = checkSelfCollision(gameState, myHead, isMoveSafe);
  isMoveSafe = checkSnakeCollision(gameState, myHead, isMoveSafe);

  // Are there any safe moves left?
  const safeMoves = Object.keys(isMoveSafe).filter(key => isMoveSafe[key]);
  if (safeMoves.length == 0) {
    console.log(`MOVE ${gameState.turn}: No safe moves detected! Moving down`);
    return { move: "down" };
  }

  // Choose a random move from the safe moves
  const gameBoard = buildFloodBoard(gameState);

const movesWithSpace = safeMoves.map(direction => {
  const newHead = getNewHeadPosition(myHead, direction);

  if (
    newHead.x < 0 || newHead.x >= gameState.board.width ||
    newHead.y < 0 || newHead.y >= gameState.board.height ||
    gameBoard[newHead.y][newHead.x] === '#'
  ) {
    return { direction, area: -1 };
  }

  const area = floodFill(gameBoard, newHead.x, newHead.y);
  return { direction, area };
});

const bestMove = movesWithSpace.reduce((a, b) => (a.area > b.area ? a : b)).direction;


  // TODO: Step 4 - Move towards food instead of random, to regain health and survive longer
  // food = gameState.board.food;

  console.log(`MOVE ${gameState.turn}: ${bestMove}`)
return { move: bestMove };

}


runServer({
  info: info,
  start: start,
  move: move,
  end: end
});