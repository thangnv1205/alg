
# Thuật toán Las Vegas

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Thuật toán Las Vegas là một loại thuật toán ngẫu nhiên luôn đưa ra câu trả lời đúng hoặc thông báo thất bại. Nói cách khác, nó không bao giờ đưa ra câu trả lời sai. Tuy nhiên, thời gian chạy của nó là ngẫu nhiên. Điều này trái ngược với thuật toán Monte Carlo, thuật toán này luôn chạy trong một khoảng thời gian xác định nhưng có thể đưa ra câu trả lời sai với một xác suất nhỏ.

Thuật toán Las Vegas được đặt tên theo thành phố Las Vegas, nổi tiếng với các sòng bạc, nơi kết quả của trò chơi là ngẫu nhiên nhưng người chơi luôn biết liệu họ có thắng hay không.

## Mã giả (Pseudocode) - Tìm kiếm một phần tử

```
function LasVegasSearch(A, T) is
    n := length(A)
    while true do
        idx := random integer from 0 to n-1
        if A[idx] = T then
            return idx
        // Nếu không tìm thấy, lặp lại. Thuật toán này luôn tìm thấy câu trả lời đúng
        // nhưng thời gian chạy là ngẫu nhiên.
```

## Hướng tiếp cận

Cách tiếp cận của thuật toán Las Vegas thường bao gồm:

1.  **Sử dụng tính ngẫu nhiên:** Thuật toán sử dụng một số hình thức ngẫu nhiên để đưa ra các quyết định trong quá trình thực hiện.
2.  **Luôn đúng:** Nếu thuật toán đưa ra một câu trả lời, câu trả lời đó luôn đúng.
3.  **Thời gian chạy ngẫu nhiên:** Thời gian cần thiết để thuật toán hoàn thành là một biến ngẫu nhiên. Trong trường hợp xấu nhất, nó có thể chạy vô thời hạn, nhưng xác suất xảy ra điều này là rất thấp.

Một ví dụ điển hình là sắp xếp nhanh ngẫu nhiên, nơi việc lựa chọn pivot ngẫu nhiên đảm bảo rằng thuật toán luôn sắp xếp đúng mảng, nhưng thời gian chạy của nó thay đổi tùy thuộc vào lựa chọn pivot.

## Ứng dụng

*   **Sắp xếp nhanh ngẫu nhiên:** Một ví dụ kinh điển, nơi việc chọn pivot ngẫu nhiên đảm bảo độ phức tạp thời gian trung bình là O(n log n).
*   **Kiểm tra số nguyên tố:** Thuật toán Miller-Rabin là một thuật toán Monte Carlo, nhưng có các biến thể Las Vegas.
*   **Tìm kiếm:** Trong một số bài toán tìm kiếm, nơi việc tìm kiếm ngẫu nhiên có thể hiệu quả hơn việc tìm kiếm có hệ thống.

## Bài toán thực hành (LeetCode)

Thuật toán Las Vegas luôn đưa ra câu trả lời đúng, nhưng thời gian chạy là ngẫu nhiên. Các bài toán sau có thể được giải bằng cách áp dụng tư duy ngẫu nhiên hóa để tìm kiếm giải pháp đúng.

*   [384. Shuffle an Array](https://leetcode.com/problems/shuffle-an-array/) (Liên quan đến việc tạo ra các hoán vị ngẫu nhiên)
*   [470. Implement Rand10() Using Rand7()](https://leetcode.com/problems/implement-rand10-using-rand7/) (Liên quan đến việc tạo số ngẫu nhiên)

## Triển khai (Python)

```python
import random

def las_vegas_search(arr, target):
    n = len(arr)
    # Trong một ứng dụng thực tế, bạn sẽ muốn giới hạn số lần thử
    # để tránh vòng lặp vô hạn nếu mục tiêu không có trong mảng.
    # Tuy nhiên, theo định nghĩa của thuật toán Las Vegas, nó sẽ tiếp tục
    # cho đến khi tìm thấy câu trả lời đúng.
    while True:
        # Chọn ngẫu nhiên một chỉ số
        idx = random.randint(0, n - 1)
        # Kiểm tra xem phần tử tại chỉ số đó có phải là mục tiêu không
        if arr[idx] == target:
            return idx
        # Nếu không, tiếp tục lặp lại.

# Ví dụ sử dụng:
arr = [1, 5, 8, 12, 15, 20, 25, 30]
target = 15

index = las_vegas_search(arr, target)
print(f"Phần tử {target} được tìm thấy tại chỉ số {index}")
```
