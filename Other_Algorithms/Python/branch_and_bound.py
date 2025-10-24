
import math

# Số đỉnh
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

            # Quay lui
            visited[i] = False

def solve_tsp_bnb():
    curr_path = [-1] * N
    visited = [False] * N

    # Bắt đầu từ đỉnh 0
    curr_path[0] = 0
    visited[0] = True

    branch_and_bound_tsp(curr_path, 0, 1, visited)
    return min_cost
