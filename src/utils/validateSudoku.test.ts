export function isSudokuValid(board: number[][]): boolean {
  const n = board.length;

  function isBoardComplete(): boolean {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (board[i][j] === 0) return false;
      }
    }
    return true;
  }

  function rowIsValid(): boolean {
    for (let i = 0; i < n; i++) {
      const rowSet = new Set<number>();
      for (let j = 0; j < n; j++) {
        if (board[i][j] !== 0) {
          rowSet.add(board[i][j]);
        }
      }
      if (rowSet.size !== n) return false;
    }
    return true;
  }

  function columnIsValid(): boolean {
    for (let i = 0; i < n; i++) {
      const columnSet = new Set<number>();
      for (let j = 0; j < n; j++) {
        if (board[j][i] !== 0) {
          if (columnSet.has(board[j][i])) return false;
          columnSet.add(board[j][i]);
        }
      }
    }
    return true;
  }

  function boxIsValid(): boolean {
    const sizeBox = Math.sqrt(n);
    for (let boxRow = 0; boxRow < n; boxRow += sizeBox) {
      for (let boxCol = 0; boxCol < n; boxCol += sizeBox) {
        const boxSet = new Set<number>();
        for (let i = 0; i < sizeBox; i++) {
          for (let j = 0; j < sizeBox; j++) {
            const value = board[boxRow + i][boxCol + j];
            if (value !== 0 && boxSet.has(value)) return false;
            boxSet.add(value);
          }
        }
      }
    }
    return true;
  }

  return isBoardComplete() && rowIsValid() && columnIsValid() && boxIsValid();
}
