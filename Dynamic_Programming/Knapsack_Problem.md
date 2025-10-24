
# Bài toán cái túi (Knapsack Problem)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Bài toán cái túi là một bài toán tối ưu tổ hợp. Nó đặt ra câu hỏi: Cho một tập hợp các vật phẩm, mỗi vật phẩm có một trọng lượng và một giá trị, xác định số lượng của mỗi vật phẩm cần đưa vào một cái túi để tổng trọng lượng không vượt quá một giới hạn trọng lượng đã cho và tổng giá trị là lớn nhất có thể.

Có hai biến thể chính của bài toán cái túi:

*   **Bài toán cái túi 0/1:** Mỗi vật phẩm chỉ có thể được chọn một lần (0 lần hoặc 1 lần). Không thể lấy một phần của vật phẩm.
*   **Bài toán cái túi phân số:** Có thể lấy một phần của vật phẩm. (Thường được giải bằng thuật toán tham lam).

Ở đây, chúng ta sẽ tập trung vào **Bài toán cái túi 0/1** được giải bằng quy hoạch động.

## Mã giả (Pseudocode)

```
function knapsack(W, wt, val, n) is
    K := 2D array of size (n+1) x (W+1)

    for i from 0 to n do
        for w from 0 to W do
            if i = 0 or w = 0 then
                K[i][w] := 0
            else if wt[i-1] <= w then
                K[i][w] := max(val[i-1] + K[i-1][w - wt[i-1]], K[i-1][w])
            else
                K[i][w] := K[i-1][w]

    return K[n][W]
```

*   `W`: Sức chứa tối đa của cái túi
*   `wt[]`: Mảng trọng lượng của các vật phẩm
*   `val[]`: Mảng giá trị của các vật phẩm
*   `n`: Tổng số vật phẩm
*   `K[i][w]`: Giá trị tối đa có thể có với `i` vật phẩm và sức chứa `w`

## Hướng tiếp cận

Bài toán cái túi 0/1 có thể được giải quyết bằng quy hoạch động. Chúng ta xây dựng một bảng 2D `K` trong đó `K[i][w]` đại diện cho giá trị tối đa có thể có khi xem xét `i` vật phẩm và sức chứa `w`.

1.  **Khởi tạo:** Tạo một bảng `K` có kích thước `(n+1) x (W+1)` và khởi tạo tất cả các giá trị ở hàng đầu tiên và cột đầu tiên thành 0.
2.  **Điền bảng:** Lặp qua bảng từ `i = 1` đến `n` (số vật phẩm) và `w = 1` đến `W` (sức chứa).
    *   **Nếu trọng lượng của vật phẩm hiện tại (`wt[i-1]`) nhỏ hơn hoặc bằng sức chứa hiện tại (`w`):** Chúng ta có hai lựa chọn:
        *   Bao gồm vật phẩm hiện tại: Giá trị sẽ là `val[i-1]` cộng với giá trị tối đa có thể có từ `i-1` vật phẩm còn lại với sức chứa `w - wt[i-1]`.
        *   Không bao gồm vật phẩm hiện tại: Giá trị sẽ là giá trị tối đa có thể có từ `i-1` vật phẩm còn lại với sức chứa `w`.
        Chúng ta chọn giá trị lớn nhất trong hai lựa chọn này.
    *   **Nếu trọng lượng của vật phẩm hiện tại lớn hơn sức chứa hiện tại:** Chúng ta không thể bao gồm vật phẩm hiện tại, vì vậy giá trị sẽ là giá trị tối đa có thể có từ `i-1` vật phẩm còn lại với sức chứa `w`.
3.  **Kết quả:** Giá trị ở `K[n][W]` sẽ là giá trị tối đa có thể có.

## Ứng dụng

*   **Phân bổ tài nguyên:** Phân bổ tài nguyên hạn chế (ví dụ: ngân sách, thời gian) cho các dự án hoặc nhiệm vụ khác nhau để tối đa hóa lợi nhuận.
*   **Quản lý danh mục đầu tư:** Chọn một tập hợp các khoản đầu tư để tối đa hóa lợi nhuận trong khi vẫn nằm trong giới hạn rủi ro.
*   **Tối ưu hóa cắt:** Cắt các vật liệu (ví dụ: gỗ, vải) thành các mảnh nhỏ hơn để tối đa hóa giá trị hoặc giảm thiểu chất thải.

## Bài toán thực hành (LeetCode)

Bài toán cái túi 0/1 là một bài toán quy hoạch động kinh điển với nhiều biến thể. Nó thường xuất hiện dưới dạng các bài toán tối ưu hóa tài nguyên.

*   [416. Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/) (Biến thể của bài toán cái túi)
*   [494. Target Sum](https://leetcode.com/problems/target-sum/) (Biến thể của bài toán cái túi)
*   [322. Coin Change](https://leetcode.com/problems/coin-change/) (Tương tự bài toán cái túi không giới hạn)

## Triển khai (Python)

```python
def knapsack_problem(W, wt, val, n):
    K = [[0 for x in range(W + 1)] for x in range(n + 1)]

    # Xây dựng bảng K[][] theo cách từ dưới lên
    for i in range(n + 1):
        for w in range(W + 1):
            if i == 0 or w == 0:
                K[i][w] = 0
            elif wt[i-1] <= w:
                K[i][w] = max(val[i-1] + K[i-1][w-wt[i-1]], K[i-1][w])
            else:
                K[i][w] = K[i-1][w]

    return K[n][W]

# Ví dụ sử dụng:
val = [60, 100, 120]
wt = [10, 20, 30]
W = 50
n = len(val)
print("Giá trị tối đa có thể có là", knapsack_problem(W, wt, val, n))
```
