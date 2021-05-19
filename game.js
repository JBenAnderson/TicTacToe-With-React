const Board = () => {
  const [player, setPlayer] = React.useState(1);
  const [gameState, setGameState] = React.useState([]);
  let status = (
    <div className="status">Who won? ({checkForWinner(gameState)})</div>
  );

  let playerTurn = (
    <div className="status">
      current turn: {player == "0" ? "Player O" : "Player X"}
    </div>
  );

  console.log(`And the winner is: ${status}`);

  const takeTurn = (id) => {
    setGameState([...gameState, { id: id, player: player }]);
    setPlayer((player + 1) % 2);
    return player;
  };

  function renderSquare(i) {
    return <Square takeTurn={takeTurn} id={i}></Square>;
  }
  return (
    <div className="game-board">
      <div className="grid-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="grid-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="grid-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div id="info">
        <h1 id="turn">{playerTurn}</h1>

        <h1>{status}</h1>
      </div>
    </div>
  );
};

const Square = ({ takeTurn, id }) => {
  const mark = ["O", "X", "+"];
  const [filled, setFilled] = React.useState(false);
  const [tik, setTik] = React.useState(2);

  const [color, setColor] = React.useState("green");
  const palet = ["red", "blue", "green", "yellow", "orange", "purple", "white"];
  const getRandomColor = () => palet[Math.floor(Math.random() * 7)];

  return (
    <button
      className={tik == "1" ? "red" : "white"}
      onClick={(e) => {
        setTik(takeTurn(id));
        setFilled(true);
        console.log(`Square: ${id} filled by player : ${tik}`);
        let col = getRandomColor();
        setColor(col);
        e.target.style.background = col;

        // alert(`I'm Square ${id}`); // testing onClick Player 1 or 2
      }}
    >
      <h1 className="noClick">{mark[tik]}</h1>
    </button>
  );
};

const Game = () => {
  return (
    <div className="game">
      <Board></Board>
    </div>
  );
};

const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];
const checkPlayerTurn = (gameState) => {
  return gameState.player;
};
const checkForWinner = (gameState) => {
  if (gameState.length < 5) return "no winner yet";
  let p0 = gameState.filter((item) => {
    if (item.player == 0) return item;
  });
  p0 = p0.map((item) => item.id);
  let px = gameState.filter((item) => {
    if (item.player == 1) return item;
  });
  px = px.map((item) => item.id);
  if (p0 != null && px != null) {
    var win0 = win.filter((item) => {
      return isSuperset(new Set(p0), new Set(item));
    });
    var winX = win.filter((item) => {
      return isSuperset(new Set(px), new Set(item));
    });
  }
  if (win0.length > 0) return "Player O";
  else if (winX.length > 0) return "Player X";
  return "no winner yet";
};

function isSuperset(set, subset) {
  for (let elem of subset) {
    if (!set.has(elem)) {
      return false;
    }
  }
  return true;
}
// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));
