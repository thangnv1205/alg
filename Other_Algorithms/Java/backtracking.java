import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class backtracking {

    public static List<List<String>> solveNQueens(int n) {
        char[][] board = new char[n][n];
        for (int i = 0; i < n; i++) {
            Arrays.fill(board[i], '.');
        }
        List<List<String>> solutions = new ArrayList<>();
        solve(board, 0, solutions);
        return solutions;
    }

    private static boolean isSafe(char[][] board, int row, int col) {
        int n = board.length;

        // Kiểm tra hàng bên trái
        for (int i = 0; i < col; i++) {
            if (board[row][i] == 'Q') {
                return false;
            }
        }

        // Kiểm tra đường chéo trên bên trái
        for (int i = row, j = col; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] == 'Q') {
                return false;
            }
        }

        // Kiểm tra đường chéo dưới bên trái
        for (int i = row, j = col; i < n && j >= 0; i++, j--) {
            if (board[i][j] == 'Q') {
                return false;
            }
        }
        return true;
    }

    private static void solve(char[][] board, int col, List<List<String>> solutions) {
        int n = board.length;

        // Trường hợp cơ sở: Nếu tất cả các quân hậu đã được đặt
        if (col == n) {
            // Tìm thấy một giải pháp, lưu nó
            List<String> solution = new ArrayList<>();
            for (int i = 0; i < n; i++) {
                solution.add(new String(board[i]));
            }
            solutions.add(solution);
            return;
        }

        // Xem xét cột này và thử đặt quân hậu vào tất cả các hàng
        for (int i = 0; i < n; i++) {
            if (isSafe(board, i, col)) {
                board[i][col] = 'Q';
                solve(board, col + 1, solutions);
                board[i][col] = '.'; // Quay lui: loại bỏ quân hậu và thử hàng khác
            }
        }
    }

    public static void main(String[] args) {
        int n = 4;
        List<List<String>> queensSolutions = solveNQueens(n);
        for (List<String> sol : queensSolutions) {
            for (String row : sol) {
                System.out.println(row);
            }
            System.out.println();
        }
    }
}
