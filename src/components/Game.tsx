import React, { useEffect, useRef } from "react";
import Board from "./Board";
import { initializeGame } from "../Store/actions";
import { useDispatch, useSelector } from "react-redux";
import { startClock, clickHandler } from "../Store/actions";
import { getGameState } from "../Store/selectors";
import { intervalTimer } from "../utils/clock";

const Game = () => {
  const dispatch = useDispatch();
  const gameState = useSelector(getGameState);
  const settings = { boardSize: [20, 15], padSize: 5, speed: 90, velocity: 2 };
  let cloak = useRef(null);

  useEffect(() => {
    if (gameState === "INITIALIZATION") {
      dispatch(initializeGame(settings));
    }
    if (gameState === "PLAYING") {
      cloak.current = intervalTimer(() => dispatch(startClock()), settings.speed);
      return;
    }
  }, [dispatch, gameState, cloak,settings]);

  const inputHandler = () => {
    cloak.current.pause()
    dispatch(clickHandler(cloak.current));
  };

  return (
    <div className="game__container" onClick={inputHandler}>
      <div className="game__wrapper">
        <h1 className="game__title">Retro Tower</h1>
        {gameState === "PLAYING" ? <h2 className="game__text">Click to place next layers</h2> : null}
        {gameState === "LOST" ? (
          <>
            <h2 className="game__text">Ooops it's look like you lost</h2>
            <h2 className="game__restart-text">Click and try again ;)</h2>
          </>
        ) : null}
        {gameState === "WON" ? (
          <>
            <h2 className="game__text">Congratuliations you won !</h2>
          <h2 className="game__restart-text">You can restart game by just clicking</h2>
          </>
        ) : null}
      </div>
      <Board/>
    </div>
  );
};
export default Game;
