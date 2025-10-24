
# Tìm kiếm tuyến tính (Linear Search)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Tìm kiếm tuyến tính, còn được gọi là tìm kiếm tuần tự, là thuật toán tìm kiếm đơn giản nhất. Nó hoạt động bằng cách kiểm tra tuần tự từng phần tử của danh sách cho đến khi tìm thấy một kết quả khớp hoặc cho đến khi đã tìm kiếm hết toàn bộ danh sách.

Không giống như tìm kiếm nhị phân, tìm kiếm tuyến tính không yêu cầu danh sách phải được sắp xếp. Điều này làm cho nó linh hoạt nhưng cũng kém hiệu quả hơn đối với các danh sách lớn.

## Mã giả (Pseudocode)

```
function linear_search(A, n, T) is
    for i from 0 to n-1 do
        if A[i] == T then
            return i
    return unsuccessful
```

*   `A`: Mảng
*   `n`: Số lượng phần tử trong `A`
*   `T`: Mục tiêu cần tìm
*   `i`: Chỉ số hiện tại

## Hướng tiếp cận

1.  **Bắt đầu từ đầu:** Bắt đầu từ chỉ số đầu tiên của danh sách (chỉ số 0).
2.  **So sánh:** So sánh phần tử ở chỉ số hiện tại với giá trị mục tiêu.
    *   **Tìm thấy:** Nếu chúng bằng nhau, trả về chỉ số hiện tại. Quá trình tìm kiếm kết thúc thành công.
    *   **Không tìm thấy:** Nếu chúng không bằng nhau, hãy chuyển sang chỉ số tiếp theo.
3.  **Lặp lại:** Lặp lại bước 2 cho đến khi tìm thấy mục tiêu hoặc đến cuối danh sách.
4.  **Kết thúc:** Nếu bạn duyệt qua toàn bộ danh sách mà không tìm thấy mục tiêu, hãy trả về một giá trị cho biết không tìm thấy (ví dụ: -1).

## Ứng dụng

*   **Danh sách nhỏ hoặc chưa được sắp xếp:** Khi danh sách nhỏ hoặc không được sắp xếp, chi phí sắp xếp danh sách trước để sử dụng tìm kiếm nhị phân có thể lớn hơn chi phí của một tìm kiếm tuyến tính đơn giản.
*   **Kiểm tra sự tồn tại:** Hữu ích khi bạn chỉ cần biết liệu một phần tử có tồn tại trong danh sách hay không, chứ không phải vị trí của nó.
*   **Các cấu trúc dữ liệu không cho phép truy cập ngẫu nhiên:** Hoạt động tốt trên các cấu trúc dữ liệu như danh sách liên kết, nơi bạn chỉ có thể duyệt qua các phần tử một cách tuần tự.

## Bài toán thực hành (LeetCode)

Tìm kiếm tuyến tính thường là một phần của các bài toán lớn hơn hoặc được sử dụng trong các trường hợp cơ sở. Dưới đây là một số bài toán mà bạn có thể cần sử dụng tìm kiếm tuyến tính hoặc hiểu nguyên lý của nó:

*   [136. Single Number](https://leetcode.com/problems/single-number/) (Có thể giải bằng tìm kiếm tuyến tính hoặc các phương pháp khác)
*   [217. Contains Duplicate](https://leetcode.com/problems/contains-duplicate/) (Có thể giải bằng tìm kiếm tuyến tính hoặc các phương pháp khác)

## Triển khai (Python)

```python
def linear_search(arr, x):
    for i in range(len(arr)):
        if arr[i] == x:
            return i
    return -1

# Ví dụ sử dụng:
arr = [ 10, 20, 80, 30, 60, 50, 110, 100, 130, 170 ]
x = 110

# Function call
result = linear_search(arr, x)

if result != -1:
    print("Phần tử có mặt tại chỉ số", str(result))
else:
    print("Phần tử không có trong mảng")
```
