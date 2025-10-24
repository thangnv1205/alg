
# Thuật toán Simulated Annealing (Ủ nhiệt mô phỏng)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Simulated Annealing (SA) là một kỹ thuật tối ưu hóa metaheuristic, được sử dụng để tìm kiếm một giải pháp gần tối ưu cho các bài toán tối ưu hóa phức tạp, đặc biệt là các bài toán có không gian tìm kiếm lớn và nhiều cực tiểu cục bộ. Nó được lấy cảm hứng từ quá trình ủ nhiệt trong luyện kim, một kỹ thuật liên quan đến việc nung nóng và sau đó kiểm soát làm mát vật liệu để tăng kích thước tinh thể của nó và giảm các khuyết tật.

Ý tưởng chính là bắt đầu với một giải pháp ngẫu nhiên và một "nhiệt độ" cao. Tại mỗi bước, một giải pháp lân cận được tạo ra. Nếu giải pháp lân cận tốt hơn giải pháp hiện tại, nó sẽ được chấp nhận. Nếu nó tệ hơn, nó vẫn có thể được chấp nhận với một xác suất nhất định, xác suất này giảm dần khi nhiệt độ giảm. Điều này cho phép thuật toán thoát khỏi các cực tiểu cục bộ.

## Mã giả (Pseudocode)

```
function SimulatedAnnealing(initial_solution, initial_temperature, cooling_rate, min_temperature) is
    current_solution := initial_solution
    best_solution := current_solution
    current_cost := cost(current_solution)
    best_cost := current_cost
    temperature := initial_temperature

    while temperature > min_temperature do
        neighbor_solution := generate_neighbor(current_solution)
        neighbor_cost := cost(neighbor_solution)

        if neighbor_cost < current_cost then
            current_solution := neighbor_solution
        else
            // Chấp nhận giải pháp tồi hơn với một xác suất
            acceptance_probability := exp((current_cost - neighbor_cost) / temperature)
            if random() < acceptance_probability then
                current_solution := neighbor_solution

        if cost(current_solution) < best_cost then
            best_solution := current_solution
            best_cost := cost(best_solution)

        temperature := temperature * cooling_rate

    return best_solution, best_cost
```

## Hướng tiếp cận

1.  **Khởi tạo:** Bắt đầu với một giải pháp ngẫu nhiên ban đầu và một "nhiệt độ" cao. Nhiệt độ này sẽ giảm dần theo thời gian.
2.  **Vòng lặp chính:** Lặp lại trong khi nhiệt độ lớn hơn một ngưỡng tối thiểu:
    *   **Tạo giải pháp lân cận:** Tạo một giải pháp lân cận từ giải pháp hiện tại bằng cách thực hiện một thay đổi nhỏ (ví dụ: hoán đổi hai phần tử trong một chuỗi).
    *   **Tính toán chi phí:** Tính toán chi phí (hoặc giá trị hàm mục tiêu) của giải pháp hiện tại và giải pháp lân cận.
    *   **Quyết định chấp nhận:**
        *   Nếu giải pháp lân cận tốt hơn giải pháp hiện tại, hãy chấp nhận nó.
        *   Nếu giải pháp lân cận tệ hơn giải pháp hiện tại, hãy chấp nhận nó với một xác suất nhất định. Xác suất này phụ thuộc vào sự khác biệt về chi phí và nhiệt độ hiện tại. Ở nhiệt độ cao, xác suất chấp nhận giải pháp tệ hơn cao hơn, cho phép khám phá không gian tìm kiếm rộng hơn. Khi nhiệt độ giảm, xác suất này giảm, khuyến khích thuật toán hội tụ về một giải pháp tốt.
    *   **Cập nhật giải pháp tốt nhất:** Luôn theo dõi giải pháp tốt nhất được tìm thấy cho đến nay.
    *   **Giảm nhiệt độ:** Giảm nhiệt độ theo một "lịch trình làm mát" (cooling schedule) đã định trước (ví dụ: nhân với một hệ số làm mát).
3.  **Kết quả:** Trả về giải pháp tốt nhất được tìm thấy.

## Ứng dụng

*   **Bài toán người bán hàng (TSP):** Tìm đường đi ngắn nhất đi qua tất cả các thành phố.
*   **Thiết kế mạch tích hợp:** Tối ưu hóa việc đặt các thành phần trên chip.
*   **Tối ưu hóa hàm:** Tìm cực tiểu toàn cục của các hàm phức tạp.
*   **Lập lịch trình:** Tối ưu hóa lịch trình sản xuất hoặc phân công nhiệm vụ.

## Bài toán thực hành (LeetCode)

Simulated Annealing là một kỹ thuật tối ưu hóa metaheuristic để tìm kiếm các giải pháp gần tối ưu cho các bài toán phức tạp. Mặc dù không có bài toán LeetCode trực tiếp yêu cầu triển khai Simulated Annealing, các bài toán tối ưu hóa hoặc tìm kiếm có thể được giải bằng cách áp dụng tư duy này.

*   [473. Matchsticks to Square](https://leetcode.com/problems/matchsticks-to-square/) (Có thể giải bằng các kỹ thuật tìm kiếm và tối ưu hóa)
*   [698. Partition to K Equal Sum Subsets](https://leetcode.com/problems/partition-to-k-equal-sum-subsets/) (Có thể giải bằng các kỹ thuật tìm kiếm và tối ưu hóa)

## Triển khai (Python) - Ví dụ đơn giản

```python
import random
import math

# Hàm mục tiêu (ví dụ: tìm giá trị x tối thiểu hóa x^2 - 4x + 4)
# Giá trị tối thiểu là 0 tại x = 2
def objective_function(x):
    return x**2 - 4*x + 4

def simulated_annealing(objective_function, initial_solution, initial_temperature, cooling_rate, min_temperature):
    current_solution = initial_solution
    best_solution = current_solution
    best_cost = objective_function(best_solution)

    temperature = initial_temperature

    while temperature > min_temperature:
        # Tạo một giải pháp lân cận
        # Đối với ví dụ đơn giản này, chúng ta sẽ thêm một nhiễu nhỏ
        # Phạm vi nhiễu có thể phụ thuộc vào nhiệt độ
        neighbor_solution = current_solution + random.uniform(-1, 1) * temperature * 0.1

        current_cost = objective_function(current_solution)
        neighbor_cost = objective_function(neighbor_solution)

        # Quyết định chấp nhận giải pháp lân cận
        if neighbor_cost < current_cost:
            current_solution = neighbor_solution
        else:
            # Chấp nhận giải pháp tồi hơn với một xác suất
            acceptance_probability = math.exp((current_cost - neighbor_cost) / temperature)
            if random.random() < acceptance_probability:
                current_solution = neighbor_solution

        # Cập nhật giải pháp tốt nhất
        if objective_function(current_solution) < best_cost:
            best_solution = current_solution
            best_cost = objective_function(best_solution)

        # Giảm nhiệt độ
        temperature *= cooling_rate

    return best_solution, best_cost

# Ví dụ sử dụng:
initial_solution = random.uniform(-10, 10) # Bắt đầu từ một điểm ngẫu nhiên
initial_temperature = 100.0
cooling_rate = 0.95
min_temperature = 0.01

best_x, min_val = simulated_annealing(objective_function, initial_solution, initial_temperature, cooling_rate, min_temperature)

print(f"Giá trị x tốt nhất được tìm thấy: {best_x}")
print(f"Giá trị hàm mục tiêu tối thiểu: {min_val}")
```
