
# Thuật toán Branch and Bound

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Thuật toán Branch and Bound (Phân nhánh và Cận) là một kỹ thuật thuật toán được sử dụng để tìm các giải pháp tối ưu cho các bài toán tối ưu hóa tổ hợp, đặc biệt là các bài toán NP-khó. Nó là một thuật toán tìm kiếm trạng thái không gian có hệ thống, sử dụng các cận trên và cận dưới để loại bỏ các nhánh của cây tìm kiếm mà không thể chứa giải pháp tối ưu.

Ý tưởng chính là:

*   **Phân nhánh (Branching):** Chia bài toán lớn thành các bài toán con nhỏ hơn (tạo ra một cây tìm kiếm).
*   **Cận (Bounding):** Đối với mỗi bài toán con, tính toán một cận trên và/hoặc cận dưới cho giá trị giải pháp tối ưu có thể đạt được trong bài toán con đó. Các cận này được sử dụng để loại bỏ các bài toán con không hứa hẹn.

## Mã giả (Pseudocode) - Tổng quát

```
function BranchAndBound(problem) is
    Q := a priority queue of partial solutions, ordered by lower bound
    add initial_partial_solution to Q
    global_best_solution := null
    global_best_cost := infinity

    while Q is not empty do
        current_partial_solution := Q.extract_best()

        if current_partial_solution.lower_bound < global_best_cost then
            if current_partial_solution is a complete solution then
                if current_partial_solution.cost < global_best_cost then
                    global_best_cost := current_partial_solution.cost
                    global_best_solution := current_partial_solution
            else
                for each child_solution of current_partial_solution do
                    calculate child_solution.lower_bound
                    if child_solution.lower_bound < global_best_cost then
                        add child_solution to Q

    return global_best_solution
```

## Hướng tiếp cận

1.  **Khởi tạo:** Bắt đầu với một giải pháp một phần ban đầu (thường là trống) và một cận trên toàn cục cho chi phí (ví dụ: vô cùng).
2.  **Phân nhánh:** Chia bài toán hiện tại thành các bài toán con. Điều này tạo ra một cây tìm kiếm, nơi mỗi nút đại diện cho một giải pháp một phần.
3.  **Cận:** Đối với mỗi bài toán con (nút trong cây tìm kiếm), tính toán một cận dưới (lower bound) cho chi phí của bất kỳ giải pháp hoàn chỉnh nào có thể được xây dựng từ bài toán con đó. Nếu cận dưới này lớn hơn hoặc bằng cận trên toàn cục hiện tại, thì nhánh này có thể bị "cắt tỉa" (pruned) vì nó không thể dẫn đến một giải pháp tốt hơn.
4.  **Tối ưu hóa:** Nếu một giải pháp hoàn chỉnh được tìm thấy có chi phí tốt hơn cận trên toàn cục hiện tại, hãy cập nhật cận trên toàn cục và giải pháp tốt nhất.
5.  **Lặp lại:** Tiếp tục quá trình phân nhánh và cận cho đến khi không còn bài toán con nào để khám phá hoặc tất cả các nhánh không hứa hẹn đã bị cắt tỉa.

## Ứng dụng

*   **Bài toán người bán hàng (Traveling Salesperson Problem - TSP):** Tìm đường đi ngắn nhất đi qua tất cả các thành phố và quay trở lại điểm xuất phát.
*   **Bài toán cái túi (Knapsack Problem):** Tìm tập hợp các vật phẩm có giá trị tối đa mà không vượt quá giới hạn trọng lượng.
*   **Lập lịch trình:** Tối ưu hóa lịch trình sản xuất hoặc phân công nhiệm vụ.
*   **Tối ưu hóa tuyến tính số nguyên:** Giải các bài toán tối ưu hóa tuyến tính với các biến số nguyên.

## Bài toán thực hành (LeetCode)

Branch and Bound là một kỹ thuật tối ưu hóa được sử dụng để giải các bài toán NP-khó bằng cách cắt tỉa các nhánh không hứa hẹn trong cây tìm kiếm. Mặc dù không có bài toán LeetCode trực tiếp yêu cầu triển khai Branch and Bound, các bài toán tối ưu hóa tổ hợp có thể được giải bằng kỹ thuật này.

*   [473. Matchsticks to Square](https://leetcode.com/problems/matchsticks-to-square/) (Có thể giải bằng backtracking với tối ưu hóa)
*   [698. Partition to K Equal Sum Subsets](https://leetcode.com/problems/partition-to-k-equal-sum-subsets/) (Có thể giải bằng backtracking với tối ưu hóa)

## Triển khai (Python) - Ví dụ TSP đơn giản

```python
import math

# Số đỉnh trong đồ thị
N = 4

# Ma trận khoảng cách (đồ thị)
dist = [
    [0, 10, 15, 20],
    [10, 0, 35, 25],
    [15, 35, 0, 30],
    [20, 25, 30, 0]
]

# Đường đi ngắn nhất toàn cục
min_cost = math.inf

def branch_and_bound_tsp(curr_path, curr_cost, level, visited):
    global min_cost

    # Trường hợp cơ sở: Nếu tất cả các đỉnh đã được thăm
    if level == N:
        # Thêm chi phí từ đỉnh cuối cùng đến đỉnh bắt đầu
        curr_cost += dist[curr_path[level - 1]][curr_path[0]]
        min_cost = min(min_cost, curr_cost)
        return

    # Cận dưới (lower bound) cho các đường đi còn lại
    # (có thể phức tạp hơn trong các triển khai thực tế)
    # Ở đây, chúng ta chỉ sử dụng chi phí hiện tại làm cận dưới đơn giản
    # Nếu chi phí hiện tại đã lớn hơn hoặc bằng chi phí tối thiểu đã tìm thấy,
    # thì không cần khám phá nhánh này nữa.
    if curr_cost >= min_cost:
        return

    # Lặp qua tất cả các đỉnh chưa được thăm
    for i in range(N):
        if not visited[i]:
            # Thêm đỉnh i vào đường đi
            curr_path[level] = i
            visited[i] = True

            # Gọi đệ quy
            branch_and_bound_tsp(curr_path, curr_cost + dist[curr_path[level - 1]][i], level + 1, visited)

            # Quay lui: Đánh dấu đỉnh i là chưa được thăm để khám phá các đường đi khác
            visited[i] = False

def solve_tsp_bnb():
    curr_path = [-1] * N
    visited = [False] * N

    # Bắt đầu từ đỉnh 0
    curr_path[0] = 0
    visited[0] = True

    branch_and_bound_tsp(curr_path, 0, 1, visited)
    return min_cost

# Ví dụ sử dụng:
min_tsp_cost = solve_tsp_bnb()
print("Chi phí tối thiểu của TSP là:", min_tsp_cost)
```
