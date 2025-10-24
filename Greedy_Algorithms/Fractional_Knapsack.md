
# Thuật toán Fractional Knapsack (Bài toán cái túi phân số)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Bài toán cái túi phân số là một bài toán tối ưu hóa trong đó chúng ta được cho một tập hợp các vật phẩm, mỗi vật phẩm có một trọng lượng và một giá trị. Mục tiêu là chọn các vật phẩm để đưa vào một cái túi có sức chứa giới hạn, sao cho tổng giá trị của các vật phẩm trong túi là lớn nhất có thể.

Điểm khác biệt chính so với bài toán cái túi 0/1 là trong bài toán cái túi phân số, chúng ta có thể lấy một phần của vật phẩm. Điều này có nghĩa là nếu chúng ta không thể lấy toàn bộ một vật phẩm do giới hạn trọng lượng, chúng ta có thể lấy một phần của nó và nhận được một phần giá trị tương ứng.

Bài toán cái túi phân số có thể được giải quyết hiệu quả bằng một thuật toán tham lam.

## Mã giả (Pseudocode)

```
function FractionalKnapsack(W, items) is
    sort items by (value / weight) in descending order
    
    current_weight := 0
    final_value := 0.0

    for each item in items do
        if current_weight + item.weight <= W then
            current_weight := current_weight + item.weight
            final_value := final_value + item.value
        else
            remaining_weight := W - current_weight
            final_value := final_value + item.value * (remaining_weight / item.weight)
            break

    return final_value
```

*   `W`: Sức chứa tối đa của cái túi
*   `items`: Danh sách các vật phẩm, mỗi vật phẩm là một cặp `(weight, value)`

## Hướng tiếp cận

Thuật toán Fractional Knapsack sử dụng một cách tiếp cận tham lam:

1.  **Tính tỷ lệ giá trị/trọng lượng:** Đối với mỗi vật phẩm, tính tỷ lệ giá trị trên trọng lượng (`value / weight`).
2.  **Sắp xếp:** Sắp xếp tất cả các vật phẩm theo tỷ lệ giá trị/trọng lượng giảm dần.
3.  **Điền túi:** Lặp qua các vật phẩm đã sắp xếp:
    *   Nếu vật phẩm hiện tại có thể được thêm toàn bộ vào túi mà không vượt quá sức chứa, hãy thêm nó vào và cập nhật tổng giá trị và trọng lượng còn lại của túi.
    *   Nếu không thể thêm toàn bộ vật phẩm, hãy lấy một phần của vật phẩm đó để lấp đầy phần còn lại của túi. Tính toán giá trị tương ứng của phần đó và thêm vào tổng giá trị. Sau đó, dừng lại.

Cách tiếp cận tham lam này hoạt động vì việc chọn các vật phẩm có tỷ lệ giá trị/trọng lượng cao nhất trước sẽ đảm bảo rằng chúng ta luôn nhận được giá trị tối đa cho mỗi đơn vị trọng lượng được thêm vào túi.

## Ứng dụng

*   **Quản lý tài nguyên:** Phân bổ tài nguyên hạn chế (ví dụ: ngân sách, thời gian) cho các dự án hoặc nhiệm vụ khác nhau để tối đa hóa lợi nhuận.
*   **Tối ưu hóa cắt:** Cắt các vật liệu (ví dụ: gỗ, vải) thành các mảnh nhỏ hơn để tối đa hóa giá trị hoặc giảm thiểu chất thải.
*   **Lập lịch trình:** Trong một số bài toán lập lịch trình, nơi các nhiệm vụ có thể được chia nhỏ.

## Bài toán thực hành (LeetCode)

Bài toán cái túi phân số là một bài toán tham lam có thể giải quyết hiệu quả. Mặc dù không có nhiều bài toán LeetCode trực tiếp yêu cầu triển khai Fractional Knapsack, các bài toán sau có thể được giải bằng cách áp dụng tư duy tham lam tương tự.

*   [122. Best Time to Buy and Sell Stock II](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/) (Có yếu tố tham lam)
*   [455. Assign Cookies](https://leetcode.com/problems/assign-cookies/) (Bài toán tham lam)

## Triển khai (Python)

```python
def fractional_knapsack(W, arr):
    # Sắp xếp các vật phẩm theo tỷ lệ giá trị/trọng lượng giảm dần
    # Mỗi vật phẩm là một bộ (trọng lượng, giá trị)
    arr.sort(key=lambda x: (x[1] / x[0]), reverse=True)

    final_value = 0.0

    for item in arr:
        weight = item[0]
        value = item[1]

        if W >= weight:
            # Lấy toàn bộ vật phẩm
            W -= weight
            final_value += value
        else:
            # Lấy một phần của vật phẩm
            final_value += value * (W / weight)
            W = 0
            break
    return final_value

# Ví dụ sử dụng:
W = 50  # Sức chứa cái túi
arr = [(10, 60), (20, 100), (30, 120)]  # (trọng lượng, giá trị)

max_value = fractional_knapsack(W, arr)
print("Giá trị tối đa trong cái túi là:", max_value)
```
