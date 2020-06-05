document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const squares = Array.from(document.querySelectorAll('.grid div'));
  const ScoreDisplay = document.querySelector('#score');
  const StartBtn = document.querySelector('#start-button');
  const GRID_WIDTH = 10;
  const INITIAL_POSITION = 3;
  // const COLORS = ['red'];
  const COLORS = ['red', 'green', 'blue', 'yellow', 'cyan'];

  // The tetrominoes
  const lTetromino = [
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, 2],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 2],
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2],
    [GRID_WIDTH, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2],
  ];

  const zTetromino = [
    [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
    [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
  ];

  const tTetromino = [
    [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2],
    [1, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
    [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
  ];

  const oTetromino = [
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
  ];

  const iTetromino = [
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
  ];

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

  let currentPosition = INITIAL_POSITION;
  const currentRotation = 0;

  // Generate random color
  const getColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

  // Generate a randomly tetromino
  let random = Math.floor(Math.random() * theTetrominoes.length);
  let current = theTetrominoes[random][currentRotation];
  let currentColor = getColor();


  // draw Tetromino
  const draw = () => current.forEach((index) => squares[currentPosition + index].classList.add(currentColor));

  // draw Tetromino
  const undraw = () => current.forEach((index) => squares[currentPosition + index].classList.remove(currentColor));

  const freeze = () => {
    const element = current.some((index) => squares[currentPosition + index + GRID_WIDTH].classList.contains('taken'));

    if (element) {
      current.forEach((index) => squares[currentPosition + index].classList.add('taken'));
      // Generate new tetromino
      random = Math.floor(Math.random() * theTetrominoes.length);
      current = theTetrominoes[random][currentRotation];
      currentPosition = INITIAL_POSITION;
      currentColor = getColor();

      draw();
    }
  };

  // move down function
  const moveDown = () => {
    undraw();
    currentPosition += GRID_WIDTH;
    draw();
    freeze();
  };

  // Move every second
  setInterval(moveDown, 500);
});
