
def solve_n_queens(n):
    board = [[0 for _ in range(n)] for _ in range(n)]
    solutions = []

    def is_safe(board, row, col):
        # Kiểm tra hàng
        for i in range(col):
            if board[row][i] == 1:
                return False

        # Kiểm tra đường chéo trên bên trái
        for i, j in zip(range(row, -1, -1), range(col, -1, -1)):
            if board[i][j] == 1:
                return False

        # Kiểm tra đường chéo dưới bên trái
        for i, j in zip(range(row, n, 1), range(col, -1, -1)):
            if board[i][j] == 1:
                return False
        return True

    def solve(board, col):
        if col >= n:
            # Tìm thấy một giải pháp, lưu nó
            solution = []
            for i in range(n):
                row_str = "".join(["Q" if board[i][j] == 1 else "." for j in range(n)])
                solution.append(row_str)
            solutions.append(solution)
            return

        for i in range(n):
            if is_safe(board, i, col):
                board[i][col] = 1
                solve(board, col + 1)
                board[i][col] = 0 # Quay lui

    solve(board, 0)
    return solutions
