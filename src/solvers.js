/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

window.Tree = function() {
  this.children = [];
};

Tree.prototype.addChildren = function(array) {
  this.children = array;
};

window.findNSolutions = function(n, type, findOne) {
  
  var solutions = [];
    
  var decisionTree = function(board, level) {
    var trees = [];
    for (let colIndex = 0; colIndex < n; colIndex++) {
      //add new piece
      decide(colIndex, board, level);
    }
    return trees;
  };  
  
  var decide = function(colIndex, board, level) {
    
    if (level === undefined) {
      topLevel = true;
    } 
    var level = level || 0;
    board.togglePiece(level, colIndex);
    
    let hasConflicts = board.hasAnyRowConflicts() || board.hasAnyColConflicts();
    
    if (type === 'queen') {
      hasConflicts = hasConflicts || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts();
    }
    
    if (hasConflicts) {
      board.togglePiece(level, colIndex);
    } else {
      
      if (level === n - 1) {
        solutions.push(JSON.parse(JSON.stringify(board.rows())));
        
      } 
      
      if (solutions.length < 1 || (!findOne && level < n - 1)) {
        var rook = new Tree();
        rook.addChildren(decisionTree(board, level + 1));
        
        if (!topLevel) {
          trees.push(rook);
        }
      }
      board.togglePiece(level, colIndex);
    }
  };
    
  var board = new Board({n: n});
    
  for (var i = 0; i < n; i++) {
    decide(i, board); 
  }

  if (n === 0) {
    solutions = [[]];
  }
  
  return solutions;
};

window.findNRooksSolution = function(n) {
  var solutions = findNSolutions(n, 'rook', true);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solutions[0]));
  return solutions[0];
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutions = findNSolutions(n, 'rook');
  var solutionCount = solutions.length;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solutions = findNSolutions(n, 'queen', true);
  
  if (solutions.length === 0) {
    var board = new Board({n: n});
    solutions.push(board.rows());
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solutions[0]));
  
  return solutions[0];
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {  
  var solutions = findNSolutions(n, 'queen');
  var solutionCount = solutions.length;
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
