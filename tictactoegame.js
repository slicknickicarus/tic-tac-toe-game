var ACTIVE_PLAYER_TOKEN = "X";
var INACTIVE_PLAYER_TOKEN = "O";
var input = process.stdin;
input.setRawMode(1);
input.resume();
input.setEncoding('utf8');
var output = process.stdout;
var board=[1,2,3,4,5,6,7,8,9];
var count = 0;

function drawBoard() { 
  output.write('\033c'+
  board[0]+'|'+board[1]+'|'+board[2]+'\n'+
  board[3]+'|'+board[4]+'|'+board[5]+'\n'+
  board[6]+'|'+board[7]+'|'+board[8]+'\n'
  );
}

function checkforVictory() {
  if (
    (board[4] === board[1] && board[4] === board[7]) ||
    (board[4] === board[0] && board[4] === board[8]) ||
    (board[4] === board[3] && board[4] === board[5]) ||
    (board[4] === board[6] && board[4] === board[2]) ||
    (board[0] === board[1] && board[0] === board[2]) ||
    (board[0] === board[3] && board[0] === board[6]) ||
    (board[8] === board[2] && board[8] === board[5]) ||
    (board[8] === board[6] && board[8] === board[7])
  ) {
    return true;
  } else return false;
}

function handleNumPress(key) {
  if (typeof board[key-1] == 'number') {
    board[key-1] = ACTIVE_PLAYER_TOKEN;
    if (ACTIVE_PLAYER_TOKEN == 'X') {
      ACTIVE_PLAYER_TOKEN = 'O';
      INACTIVE_PLAYER_TOKEN = 'X';
    } else { 
      ACTIVE_PLAYER_TOKEN = 'X';
      INACTIVE_PLAYER_TOKEN = 'O';
    }
    count++;
  }
}

input.on('data', function(key) {
  if (key === 'q') {
    process.exit();
  }
  if (key > 0 && key <= 9) {
    handleNumPress(key);
  }
  drawBoard();
  if (checkforVictory()) {
    output.write(`${INACTIVE_PLAYER_TOKEN}'s' win!\n`);
    process.exit();
  }
  if (count > 8) {
    output.write("It's a draw!\n");
    process.exit();
  }
});
drawBoard();