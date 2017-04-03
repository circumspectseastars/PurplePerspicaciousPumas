'use strict';
import React from 'react';
import { Col, Panel, Glyphicon } from 'react-bootstrap';

const GameWinner = (props) => {

  let rounds = props.game.rounds;
  let roundWinners = {};

  rounds.forEach(function(round) {
    roundWinners[round.winner] ? roundWinners[round.winner]++ : roundWinners[round.winner] = 1;
  });


  let gameWinner = [];

  for (var winner in roundWinners) {
    var currentWinner = roundWinners[gameWinner[0]] || 0;

    if (roundWinners[winner] > currentWinner) {
      gameWinner = [winner];
    } else if (roundWinners[winner] === currentWinner) {
      gameWinner.push(winner);
    }
  }

  let winnerMessage = '';

  if (gameWinner.length === 1) {
    winnerMessage = gameWinner[0];
  } else {
    gameWinner.forEach(function(winner, index) {
      index === gameWinner.length - 1 ? winner + ', ' : winner;
    })
  }

  console.log(winnerMessage);

  return (
    <Col id="GameWinner" className="animated tada">
      <Panel header="Winner">
        <b>Player <Glyphicon glyph="glyphicon glyphicon-user" />
        {winnerMessage} wins!</b>
      </Panel>
      <br />
    </Col>
  )
}


export default GameWinner;