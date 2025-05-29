
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

function willEat(snake, food) {
  const head = snake.body[0];
  return food.some(f =>
    f.x === head.x + 1 && f.y === head.y ||
    f.x === head.x - 1 && f.y === head.y ||
    f.x === head.x && f.y === head.y + 1 ||
    f.x === head.x && f.y === head.y - 1
  );
}


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

  // ✅ Iteration 3: Tail logic — allow stepping on another snake's tail if it's going to move
const you = gameState.you;
const food = gameState.board.food;
const snakes = gameState.board.snakes;

for (const snake of snakes) {
  if (snake.id === you.id) continue;

  const tail = snake.body[snake.body.length - 1];

  for (const direction of Object.keys(isMoveSafe)) {
    if (!isMoveSafe[direction]) continue;

    let nextX = myHead.x;
    let nextY = myHead.y;

    if (direction === "up") nextY += 1;
    if (direction === "down") nextY -= 1;
    if (direction === "left") nextX -= 1;
    if (direction === "right") nextX += 1;

    if (nextX === tail.x && nextY === tail.y) {
      if (willEat(snake, food)) {
        // Tail will not move — block this move
        isMoveSafe[direction] = false;
      }
    }
  }
}


  // Are there any safe moves left?
  const safeMoves = Object.keys(isMoveSafe).filter(key => isMoveSafe[key]);
  if (safeMoves.length == 0) {
    console.log(`MOVE ${gameState.turn}: No safe moves detected! Moving down`);
    return { move: "down" };
  }

  // Choose a random move from the safe moves
  const nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];

  // TODO: Step 4 - Move towards food instead of random, to regain health and survive longer
  // food = gameState.board.food;

  console.log(`MOVE ${gameState.turn}: ${nextMove}`)
  return { move: nextMove };
}

runServer({
  info: info,
  start: start,
  move: move,
  end: end
});