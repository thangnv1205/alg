function solveNQueens(n) {
    const board = new Array(n).fill(0).map(() => new Array(n).fill('.'));
    const solutions = [];

    function isSafe(board, row, col) {
        // Kiểm tra hàng bên trái
        for (let i = 0; i < col; i++) {
            if (board[row][i] === 'Q') {
                return false;
            }
        }

        // Kiểm tra đường chéo trên bên trái
        for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') {
                return false;
            }
        }

        // Kiểm tra đường chéo dưới bên trái
        for (let i = row, j = col; i < n && j >= 0; i++, j--) {
            if (board[i][j] === 'Q') {
                return false;
            }
        }
        return true;
    }

    function solve(board, col) {
        // Trường hợp cơ sở: Nếu tất cả các quân hậu đã được đặt
        if (col === n) {
            // Tìm thấy một giải pháp, lưu nó
            const solution = board.map(row => row.join(''));
            solutions.push(solution);
            return;
        }

        // Xem xét cột này và thử đặt quân hậu vào tất cả các hàng
        for (let i = 0; i < n; i++) {
            if (isSafe(board, i, col)) {
                board[i][col] = 'Q';
                solve(board, col + 1);
                board[i][col] = '.'; // Quay lui: loại bỏ quân hậu và thử hàng khác
            }
        }
    }

    solve(board, 0);
    return solutions;
}

// Ví dụ sử dụng:
const n = 4;
const queensSolutions = solveNQueens(n);
queensSolutions.forEach(sol => {
    sol.forEach(row => console.log(row));
    console.log();
});
