
# Thuật toán Backtracking

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Backtracking là một kỹ thuật thuật toán để giải quyết các bài toán tối ưu hóa hoặc bài toán thỏa mãn ràng buộc một cách đệ quy. Nó cố gắng xây dựng một giải pháp từng bước, loại bỏ các giải pháp không thỏa mãn bất kỳ ràng buộc nào của bài toán tại bất kỳ thời điểm nào.

Khi thuật toán gặp một "ngõ cụt" (tức là, một lựa chọn dẫn đến một giải pháp không hợp lệ), nó sẽ "quay lui" (backtrack) đến điểm quyết định trước đó và thử một lựa chọn khác. Quá trình này tiếp tục cho đến khi tìm thấy một giải pháp hợp lệ hoặc tất cả các khả năng đã được khám phá.

Backtracking thường được sử dụng cho các bài toán mà chúng ta cần tìm tất cả (hoặc một số) giải pháp cho một bài toán thỏa mãn một số ràng buộc, thay vì tìm một giải pháp tối ưu duy nhất.

## Mã giả (Pseudocode) - Tổng quát

```
function solve(k) is
    if k is a solution then
        add k to solutions
    else
        for each choice c in possible_choices(k) do
            if c is valid then
                add c to k
                solve(k + 1)
                remove c from k // Quay lui
```

## Hướng tiếp cận

Thuật toán backtracking có thể được hình dung như việc duyệt một cây trạng thái tìm kiếm:

1.  **Chọn một điểm bắt đầu:** Bắt đầu từ một trạng thái ban đầu (thường là một giải pháp trống).
2.  **Thực hiện một lựa chọn:** Tại mỗi bước, thực hiện một lựa chọn từ các lựa chọn có sẵn.
3.  **Kiểm tra tính hợp lệ:** Kiểm tra xem lựa chọn hiện tại có hợp lệ hay không (tức là, nó có vi phạm bất kỳ ràng buộc nào của bài toán không).
    *   **Nếu hợp lệ:** Tiếp tục xây dựng giải pháp bằng cách thực hiện các lựa chọn tiếp theo.
    *   **Nếu không hợp lệ:** Lựa chọn này dẫn đến một ngõ cụt. Quay lui đến điểm quyết định trước đó và thử một lựa chọn khác.
4.  **Tìm giải pháp:** Nếu một giải pháp hoàn chỉnh được xây dựng và nó hợp lệ, hãy ghi lại nó.
5.  **Quay lui:** Sau khi khám phá tất cả các khả năng từ một điểm quyết định, hoặc sau khi tìm thấy một giải pháp, quay lui đến điểm quyết định trước đó để khám phá các lựa chọn khác.

## Ứng dụng

*   **Bài toán N-Queens:** Đặt N quân hậu trên một bàn cờ N x N sao cho không có hai quân hậu nào tấn công lẫn nhau.
*   **Giải Sudoku:** Điền vào một lưới Sudoku theo các quy tắc của trò chơi.
*   **Bài toán người bán hàng (Traveling Salesperson Problem - TSP):** Tìm đường đi ngắn nhất đi qua tất cả các thành phố và quay trở lại điểm xuất phát (mặc dù thường được giải bằng các phương pháp tối ưu hóa khác).
*   **Tạo mê cung:** Tạo ra các mê cung bằng cách sử dụng backtracking để đảm bảo có một đường đi từ đầu đến cuối.
*   **Phân tích cú pháp:** Trong các trình biên dịch để phân tích cú pháp mã nguồn.

## Bài toán thực hành (LeetCode)

Backtracking là một kỹ thuật mạnh mẽ để giải quyết các bài toán tìm kiếm tất cả các giải pháp hoặc bài toán thỏa mãn ràng buộc. Nó thường được sử dụng trong các bài toán liên quan đến hoán vị, tổ hợp và các cấu hình khác.

*   [51. N-Queens](https://leetcode.com/problems/n-queens/)
*   [37. Sudoku Solver](https://leetcode.com/problems/sudoku-solver/)
*   [39. Combination Sum](https://leetcode.com/problems/combination-sum/)
*   [46. Permutations](https://leetcode.com/problems/permutations/)
*   [78. Subsets](https://leetcode.com/problems/subsets/)

## Triển khai (Python) - Bài toán N-Queens

```python
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
        # Trường hợp cơ sở: Nếu tất cả các quân hậu đã được đặt
        if col >= n:
            # Tìm thấy một giải pháp, lưu nó
            solution = []
            for i in range(n):
                row_str = "".join(["Q" if board[i][j] == 1 else "." for j in range(n)])
                solution.append(row_str)
            solutions.append(solution)
            return

        # Xem xét cột này và thử đặt quân hậu vào tất cả các hàng
        for i in range(n):
            if is_safe(board, i, col):
                board[i][col] = 1
                solve(board, col + 1)
                board[i][col] = 0 # Quay lui: loại bỏ quân hậu và thử hàng khác

    solve(board, 0)
    return solutions

# Ví dụ sử dụng:
n = 4
queens_solutions = solve_n_queens(n)
for sol in queens_solutions:
    for row in sol:
        print(row)
    print()
```
