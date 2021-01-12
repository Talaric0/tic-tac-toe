import React, { useState } from 'react'
import Square from './Square'

export default function Board() {
  const [boardSquares, setBoardSquares] = useState(Array(9).fill(null));

  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (index) => {
    // copy state
    const squares = [...boardSquares];

    if (calculateWinner(boardSquares) || squares[index]) return;

    // Set X or O
    squares[index] = xIsNext ? "X" : "O"

    // state of the board
    setBoardSquares(squares);

    // state of the turn
    setXIsNext(!xIsNext);
    
  }

  const renderSquare = (index) => {
    return <Square value={boardSquares[index]} onClick={() => handleClick(index)} />
  }

  // lazy reset function
  function reset() {
    document.location.reload()
  }

  // init status
  let status;
  const winner = calculateWinner(boardSquares);
  status = winner ? `Winner is: ${winner}` : `Next player: ${xIsNext ? "X" : "O"}`

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">{renderSquare(0)}{renderSquare(1)}{renderSquare(2)}</div>
      <div className="board-row">{renderSquare(3)}{renderSquare(4)}{renderSquare(5)}</div>
      <div className="board-row">{renderSquare(6)}{renderSquare(7)}{renderSquare(8)}</div>
      <div className="reset-wrapper">
        <button className="reset btn btn-outline-primary" onClick={reset}>
            Reset
        </button>
      </div>
    </div>
  )
}

function calculateWinner(squares) {
  // possible winnning combinations
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  // check if squares is in winning combinations
  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }

  }
  return null;
}
