import express from "express";

/**
 * Initializes and runs the Battlesnake server with the provided game handlers.
 * Sets up HTTP endpoints for the Battlesnake API and starts listening for requests.
 * 
 * @param {Object} handlers - Object containing handler functions for different game events
 * @param {Function} handlers.info - Returns information about your Battlesnake
 * @param {Function} handlers.start - Called when a game your Battlesnake is in starts
 * @param {Function} handlers.move - Called when your Battlesnake needs to make a move
 * @param {Function} handlers.end - Called when a game your Battlesnake was in ends
 * 
 * @example
 * const handlers = {
 *   info: () => ({ apiversion: "1", author: "", color: "#888888" }),
 *   start: (gameState) => console.log("Game started!"),
 *   move: (gameState) => ({ move: "up" }),
 *   end: (gameState) => console.log("Game ended!")
 * };
 * runServer(handlers);
 */
export default function runServer(handlers) {
  const app = express();
  app.use(express.json());

  app.get("/", (req, res) => {
    res.send(handlers.info());
  });

  app.post("/start", (req, res) => {
    handlers.start(req.body);
    res.send("ok");
  });

  app.post("/move", (req, res) => {
    res.send(handlers.move(req.body));
  });

  app.post("/end", (req, res) => {
    handlers.end(req.body);
    res.send("ok");
  });

  app.use(function (req, res, next) {
    res.set("Server", "battlesnake/github/starter-snake-javascript");
    next();
  });

  const host = "0.0.0.0";
  const port = process.env.PORT || 8000;

  app.listen(port, host, () => {
    console.log(`Running Battlesnake at http://${host}:${port}...`);
  });
}
