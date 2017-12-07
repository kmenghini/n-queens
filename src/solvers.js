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
window.Tree = function(coords, board, n) {
  this.coords = coords;
  // this.blocked = null;
  this.children = [];
  this.board = board;
};

Tree.prototype.addChild = function(value) {
  this.children.push(new Tree(value));
  return this.children[this.children.length - 1];
};

Tree.prototype.addChildren = function(array) {
  this.children = array;
};

window.findNRooksSolution = function(n) {
  
  var solution = undefined; 
  var solutions = [];
  
  // board.togglePiece(0, 0);
  
  // colIndex++;
  // //on row 1, col 0
  // for (let rowIndex = 0; rowIndex < n; rowIndex++) {
  //   for (let colIndex = 0; colIndex < n; colIndex++) {
  //     var instance = new Tree([rowIndex, colIndex]);
  //     instance.blocked = rowIndex;
  //     const board = new Board({n: n});
  //     board.togglePiece(instance.coords[0], instance.coords[1]);
      
  //     if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {
  //       board.togglePiece(rowIndex, colIndex);
  //     }
  //   }
  // }
    
  var countPieces = function() {
    var pieceCount = 0;
    board.rows().forEach(element => pieceCount += (element.reduce((sum, value)=> sum + value) ));
    return pieceCount;
  };
    
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
      noLevel = true;
    } 
    var level = level || 0;
    board.togglePiece(level, colIndex);
    //see if there are conflicts, if so, take the piece off
    if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {
      board.togglePiece(level, colIndex);
    } else {
    //if not, add a new decision tree for all possibilities afterwards
      if (countPieces(board) === n) {
        solutions.push(board.rows());
      } else {
        var rook = new Tree([level, colIndex], board);
        //if not at the bottom of the board 
        //for loop depth
        // rook.addChild(decisionTree(level + 1));
        rook.addChildren(decisionTree(rook.board, level + 1));
        //for (let i = 0; i < )rook.children 
        if (!noLevel) {
          trees.push(rook);
        }
      }
    }
  };
  
  for (var i = 0; i < n; i++) {
    var board = new Board({n: n});
    decide(i, board); 
  }
  
  solution = solutions[0];
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  
  var solutions = [];
  solutionCount = undefined;
    
  var countPieces = function() {
    var pieceCount = 0;
    board.rows().forEach(element => pieceCount += (element.reduce((sum, value)=> sum + value) ));
    return pieceCount;
  };
    
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
    //see if there are conflicts, if so, take the piece off
    if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {
      board.togglePiece(level, colIndex);
    } else {
    //if not, add a new decision tree for all possibilities afterwards
      if (countPieces(board) === n) {
        solutions.push(board.rows());
      } 
      
      if (level < n - 1) {
        var rook = new Tree([level, colIndex], board);
        //if not at the bottom of the board 
        //for loop depth
        // rook.addChild(decisionTree(level + 1));
        rook.addChildren(decisionTree(rook.board, level + 1));
        //for (let i = 0; i < )rook.children 
        if (!topLevel) {
          trees.push(rook);
        }
      }
      board.togglePiece(level, colIndex);
    }
  };
  
  for (var i = 0; i < n; i++) {
    var board = new Board({n: n});
    decide(i, board); 
  }
  
  console.log(solutions);
  solutionCount = solutions.length;
  
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var solutions = [];
  solutionCount = undefined;

    
  var countPieces = function() {
    var pieceCount = 0;
    board.rows().forEach(element => pieceCount += (element.reduce((sum, value)=> sum + value) ));
    return pieceCount;
  };
    
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
    //see if there are conflicts, if so, take the piece off
    if (board.hasAnyRowConflicts() || board.hasAnyColConflicts() || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts()) {
      board.togglePiece(level, colIndex);
    } else {
    //if not, add a new decision tree for all possibilities afterwards
      if (countPieces(board) === n) {
        solutions.push(JSON.parse(JSON.stringify(board.rows())));
      } 
      
      if (level < n - 1) {
        var rook = new Tree([level, colIndex], board);
        //if not at the bottom of the board 
        //for loop depth
        // rook.addChild(decisionTree(level + 1));
        rook.addChildren(decisionTree(rook.board, level + 1));
        //for (let i = 0; i < )rook.children 
        if (!topLevel) {
          trees.push(rook);
        }
      }
      board.togglePiece(level, colIndex);
    }
  };
  
  for (var i = 0; i < n; i++) {
    var board = new Board({n: n});
    decide(i, board); 
  }
  
//debugger;
  
  if (solutions.length === 0) {
    var board = new Board({n: n});
    solutions.push(board.rows());
  }

  if (n === 0) {
    solutions = [[]];
  }

  console.log(solutions);
  
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solutions[0]));
  
  return solutions[0];
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  var solutions = [];
  solutionCount = undefined;
    
  var countPieces = function() {
    var pieceCount = 0;
    board.rows().forEach(element => pieceCount += (element.reduce((sum, value)=> sum + value) ));
    return pieceCount;
  };
    
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
    //see if there are conflicts, if so, take the piece off
    if (board.hasAnyRowConflicts() || board.hasAnyColConflicts() || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts()) {
      board.togglePiece(level, colIndex);
    } else {
    //if not, add a new decision tree for all possibilities afterwards
      if (countPieces(board) === n) {
        solutions.push(JSON.parse(JSON.stringify(board.rows())));
      } 
      
      if (level < n - 1) {
        var rook = new Tree([level, colIndex], board);
        //if not at the bottom of the board 
        //for loop depth
        // rook.addChild(decisionTree(level + 1));
        rook.addChildren(decisionTree(rook.board, level + 1));
        //for (let i = 0; i < )rook.children 
        if (!topLevel) {
          trees.push(rook);
        }
      }
      board.togglePiece(level, colIndex);
    }
  };
    
  for (var i = 0; i < n; i++) {
    var board = new Board({n: n});
    decide(i, board); 
  }
  
//debugger;
  
  if (solutions.length === 0) {
    var board = new Board({n: n});
    solutions.push(board.rows());
  }

  if (n === 0) {
    solutions = [[]];
  }

  solutionCount = solutions.length;

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
