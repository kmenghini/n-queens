/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

//colSkip array (for dead columns)
//rowSkip array (for dead rows)
//if row in rowSkip or col in colSkip --> current row /col ++ 

window.findNRooksSolution = function(n) {
  var solution = undefined; 
  
  const board = new Board({n: n});
  
  board.togglePiece(0, 0);
  
  // colIndex++;
  //on row 1, col 0
  for (let rowIndex = 1; rowIndex < n; rowIndex++) {
    for (let colIndex = 0; colIndex < n; colIndex++) {
      board.togglePiece(rowIndex, colIndex);
      if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {
        board.togglePiece(rowIndex, colIndex);
      }
    }
  }
  
  solution = board.rows();
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme
  
  

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined;
  
  if (n === 0) {
    return [];
  }
  
  for (let i = 0; i < n; i++) {
    let board = new Board({n: n});
    board.togglePiece(0, i); 
    for (let rowIndex = 1; rowIndex < n; rowIndex++) {
      for (let colIndex = 0; colIndex < n; colIndex++) {
        board.togglePiece(rowIndex, colIndex);
        if (board.hasAnyRowConflicts() || board.hasAnyColConflicts() || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts()) {
          board.togglePiece(rowIndex, colIndex);
        }
      }
    }
    var pieceCount = 0;
    board.rows().forEach(element => pieceCount += (element.reduce((sum, value)=> sum + value) ));
    if (pieceCount === n) {
      solution = board.rows();
      break;
    }
  } 

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
