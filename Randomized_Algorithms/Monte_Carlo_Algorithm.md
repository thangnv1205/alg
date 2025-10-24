
# Thuật toán Monte Carlo

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Thuật toán Monte Carlo là một lớp thuật toán máy tính dựa vào việc lấy mẫu ngẫu nhiên lặp đi lặp lại để có được kết quả số. Chúng thường được sử dụng khi không thể hoặc không thực tế khi sử dụng một thuật toán xác định. Thuật toán Monte Carlo đặc biệt hữu ích cho các bài toán có nhiều biến được ghép nối, như trong mô phỏng vật lý, tối ưu hóa và tích phân số.

Ý tưởng cốt lõi là sử dụng tính ngẫu nhiên để giải quyết các bài toán mà về nguyên tắc có thể là xác định nhưng quá phức tạp để giải quyết trực tiếp. Bằng cách chạy mô phỏng nhiều lần với các đầu vào ngẫu nhiên, chúng ta có thể ước tính một giải pháp.

## Mã giả (Pseudocode) - Ước tính Pi

```
function MonteCarloPiEstimation(num_points) is
    points_inside_circle := 0
    for i from 1 to num_points do
        x := random number between 0 and 1
        y := random number between 0 and 1
        distance := x*x + y*y
        if distance <= 1 then
            points_inside_circle := points_inside_circle + 1

    pi_estimate := 4 * points_inside_circle / num_points
    return pi_estimate
```

## Hướng tiếp cận

Cách tiếp cận Monte Carlo thường bao gồm các bước sau:

1.  **Xác định miền đầu vào:** Xác định một miền các giá trị đầu vào có thể.
2.  **Tạo đầu vào ngẫu nhiên:** Tạo các đầu vào ngẫu nhiên từ miền này.
3.  **Thực hiện tính toán:** Thực hiện một số tính toán bằng cách sử dụng các đầu vào ngẫu nhiên.
4.  **Tổng hợp kết quả:** Tổng hợp các kết quả của các tính toán riêng lẻ để có được một ước tính cuối cùng.

Ví dụ về ước tính Pi:

*   Chúng ta biết rằng diện tích của một hình tròn có bán kính `r` là `πr^2` và diện tích của một hình vuông có cạnh `2r` là `(2r)^2 = 4r^2`.
*   Nếu chúng ta xem xét một hình tròn đơn vị (bán kính 1) nằm trong một hình vuông có cạnh 2, tỷ lệ diện tích của hình tròn so với hình vuông là `π/4`.
*   Bằng cách tạo ra một số lượng lớn các điểm ngẫu nhiên trong hình vuông và đếm số điểm rơi vào hình tròn, chúng ta có thể ước tính tỷ lệ này và do đó ước tính giá trị của Pi.

## Ứng dụng

*   **Tích phân số:** Ước tính các tích phân phức tạp.
*   **Mô phỏng vật lý:** Mô phỏng hành vi của các hệ thống phức tạp trong vật lý hạt, vật lý thiên văn, v.v.
*   **Tài chính:** Định giá các công cụ tài chính, mô hình hóa rủi ro.
*   **Trò chơi:** Tạo ra các kết quả ngẫu nhiên và mô phỏng hành vi của đối thủ.

## Bài toán thực hành (LeetCode)

Thuật toán Monte Carlo sử dụng tính ngẫu nhiên để ước tính kết quả. Mặc dù không có bài toán LeetCode trực tiếp yêu cầu triển khai Monte Carlo, việc hiểu nguyên lý của nó có thể hữu ích trong các bài toán liên quan đến xác suất, mô phỏng hoặc khi cần ước tính một giá trị.

*   [470. Implement Rand10() Using Rand7()](https://leetcode.com/problems/implement-rand10-using-rand7/) (Liên quan đến việc tạo số ngẫu nhiên)
*   [382. Linked List Random Node](https://leetcode.com/problems/linked-list-random-node/) (Liên quan đến việc chọn ngẫu nhiên)

## Triển khai (Python)

```python
import random

def monte_carlo_pi_estimation(num_points):
    inside_circle = 0
    for _ in range(num_points):
        x = random.uniform(0, 1)
        y = random.uniform(0, 1)
        distance = x**2 + y**2
        if distance <= 1:
            inside_circle += 1

    pi_estimate = 4 * inside_circle / num_points
    return pi_estimate

# Ví dụ sử dụng:
num_points = 100000
pi_approx = monte_carlo_pi_estimation(num_points)
print(f"Ước tính Pi bằng phương pháp Monte Carlo với {num_points} điểm: {pi_approx}")
```
