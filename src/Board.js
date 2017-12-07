// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var rowSum = this.get(rowIndex).reduce((sum, value)=>sum + value);
      return rowSum > 1;
    },
    
    hasAnyRowConflicts: function() {
      let isConflict = false;
      
      for (let i = 0; i < this.attributes.n; i++) {
        if (this.hasRowConflictAt(i)) {
          isConflict = true;
        } 
      }
    
      return isConflict;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //get all rows @ columnindex
      //sum same index in each row
      var sum = 0;
      
      for (let i = 0; i < this.attributes.n; i++) {
        sum += this.get(i)[colIndex];
      }
      
      return sum > 1; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      let isConflict = false;
      
      for (let i = 0; i < this.attributes.n; i++) {
        if (this.hasColConflictAt(i)) {
          isConflict = true;
        } 
      }
      
      return isConflict; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      let sum = 0;
      let colIndex = majorDiagonalColumnIndexAtFirstRow;
      
      //if diag starts at top (positive index)
      if (colIndex >= 0) {
        for (let i = 0; colIndex + i < this.attributes.n; i++) {
          sum += this.get(i)[colIndex + i];
        }  
      }
      
      //if diag starts from side (neg index)
      if (colIndex < 0) {
        var rowIndex = -colIndex;
        for (let i = 0; rowIndex + i < this.attributes.n; i++) {
          sum += this.get(rowIndex + i)[i];
        }
      }
      
      return sum > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      let bottomLeftCornerIndex = -(this.attributes.n - 1);
      let isConflict = false;
      
      for ( let i = bottomLeftCornerIndex; i < this.attributes.n; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          isConflict = true; 
        }
      }
      
      return isConflict; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      
      let sum = 0;
      
      let colIndex = minorDiagonalColumnIndexAtFirstRow;
      var n = this.attributes.n;
      
      if (colIndex <= n - 1) {
        for (let i = 0; colIndex - i >= 0; i++) {
          sum += this.get(i)[colIndex - i];
        }
      }
      
      if (colIndex > n - 1) {
        for (let i = 0; colIndex - (n - 1) + i <= (n - 1); i++) {
          sum += this.get(colIndex - (n - 1) + i)[n - 1 - i];
        }
      }
          
      return sum > 1; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      //       let bottomLeftCornerIndex = -(this.attributes.n - 1);
      // let isConflict = false;
      
      // for ( let i = bottomLeftCornerIndex; i < this.attributes.n; i++) {
      //   if (this.hasMajorDiagonalConflictAt(i)) {
      //     isConflict = true; 
      //   }
      // }
      
      // return isConflict; // fixme
      let isConflict = false;
      for (let i = 0; i <= (this.attributes.n - 1) * 2; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          isConflict = true;
        }
      }
      return isConflict; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
