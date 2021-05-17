const Square = ({ id, player }) => {
  const [color, setColor] = React.useState("green");
  const palet = ["red", "blue", "green", "yellow", "orange", "purple", "white"];
  const getRandomColor = () => palet[Math.floor(Math.random() * 7)];
  React.useEffect(() => {
    console.log(`Render ${id}`);
    return () => console.log(`unmounting Square ${id}`);
  });

  return (
    <button
      onClick={(e) => {
        let col = getRandomColor();
        setColor(col);
        e.target.style.background = col;
        // alert(`I'm Square ${id}`); // testing onClick Player 1 or 2
      }}
    >
      <h1>{id}</h1>
    </button>
  );
};

const Board = () => {
  const [player, setPlayer] = React.useState(1);
  const [mounted, setMounted] = React.useState(true);
  const [random, setRandom] = React.useState(0);
  let status = `Player ${player}`;
  const toggle = () => setMounted(!mounted);
  const reRender = () => setRandom(Math.random());
  function renderSquare(i) {
    return <Square id={i} player={player}></Square>;
  }
  return (
    <div
      className="game-board"
      onClick={(e) => {
        setPlayer((player + 1) % 2); // the player needs to be zero player or one
        status = `Player ${player}`;
      }}
    >
      <div className="grid-row">
        {mounted && renderSquare(0)}
        {mounted && renderSquare(1)}
        {mounted && renderSquare(2)}
      </div>
      <div id="info">
        <button onClick={toggle}>Show/Hide Row</button>
        <button onClick={reRender}>Re-render</button>
        <h1>{status}</h1>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));
