
# Sắp xếp chèn (Insertion Sort)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Sắp xếp chèn là một thuật toán sắp xếp đơn giản, xây dựng mảng đã sắp xếp cuối cùng по одному элементу за раз. Nó lặp qua mảng đầu vào và tại mỗi lần lặp, nó loại bỏ một phần tử và tìm vị trí của nó trong phần đã được sắp xếp của mảng, sau đó chèn nó vào đó.

Thuật toán này hiệu quả đối với các tập dữ liệu nhỏ và hiệu quả hơn đáng kể so với các thuật toán O(n^2) khác như sắp xếp chọn và sắp xếp nổi bọt trong thực tế. Nó cũng là một thuật toán sắp xếp ổn định, có nghĩa là nó không thay đổi thứ tự tương đối của các phần tử có giá trị bằng nhau.

## Mã giả (Pseudocode)

```
function insertionSort(A) is
    for i from 1 to length(A)-1 inclusive do
        key := A[i]
        j := i - 1
        while j >= 0 and A[j] > key do
            A[j+1] := A[j]
            j := j - 1
        end while
        A[j+1] := key
    end for
end function
```

*   `A`: Mảng
*   `i`: Chỉ số của phần tử hiện tại đang được xem xét
*   `key`: Giá trị của phần tử hiện tại
*   `j`: Chỉ số được sử dụng để lặp ngược qua phần đã được sắp xếp của mảng

## Hướng tiếp cận

1.  **Lặp qua mảng:** Bắt đầu từ phần tử thứ hai (chỉ số 1), vì phần tử đầu tiên được coi là đã được sắp xếp.
2.  **Chọn khóa:** Lưu trữ giá trị của phần tử hiện tại trong một biến `key`.
3.  **So sánh và dịch chuyển:** So sánh `key` với các phần tử ở bên trái của nó (phần đã được sắp xếp của mảng). Nếu một phần tử trong phần đã được sắp xếp lớn hơn `key`, hãy dịch chuyển nó sang phải một vị trí.
4.  **Tiếp tục dịch chuyển:** Tiếp tục quá trình này, dịch chuyển các phần tử sang phải, cho đến khi bạn tìm thấy một phần tử nhỏ hơn hoặc bằng `key`, hoặc bạn đến đầu mảng.
5.  **Chèn khóa:** Chèn `key` vào vị trí trống được tạo ra bởi quá trình dịch chuyển.
6.  **Lặp lại:** Lặp lại các bước 2-5 cho đến khi tất cả các phần tử đã được xem xét.

## Ứng dụng

*   **Tập dữ liệu nhỏ:** Rất hiệu quả đối với các danh sách nhỏ.
*   **Danh sách gần như đã được sắp xếp:** Khi danh sách đầu vào gần như đã được sắp xếp, sắp xếp chèn chạy theo thời gian gần tuyến tính (O(n)), làm cho nó trở thành một lựa chọn tốt.
*   **Sắp xếp trực tuyến:** Vì nó xử lý các phần tử một cách tuần tự, nó có thể được sử dụng để sắp xếp một danh sách khi nó đang được nhận.
*   **Thư viện sắp xếp:** Nhiều thư viện sắp xếp sử dụng sắp xếp chèn cho các mảng con nhỏ hơn một ngưỡng nhất định, vì nó hoạt động tốt hơn các thuật toán chia để trị phức tạp hơn trên các danh sách nhỏ.

## Bài toán thực hành (LeetCode)

Sắp xếp chèn hiệu quả cho các tập dữ liệu nhỏ hoặc gần như đã được sắp xếp. Các bài toán sau có thể được giải bằng sắp xếp chèn, hoặc bạn có thể sử dụng nó như một phần của giải pháp:

*   [912. Sort an Array](https://leetcode.com/problems/sort-an-array/) (Bạn có thể thử giải bằng Insertion Sort để thực hành)
*   [147. Insertion Sort List](https://leetcode.com/problems/insertion-sort-list/) (Áp dụng Insertion Sort cho danh sách liên kết)

## Triển khai (Python)

```python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i-1
        while j >=0 and key < arr[j] :
                arr[j+1] = arr[j]
                j -= 1
        arr[j+1] = key

# Ví dụ sử dụng:
arr = [12, 11, 13, 5, 6]
insertion_sort(arr)
print ("Mảng đã sắp xếp là:")
for i in range(len(arr)):
    print ("%d" %arr[i])
```
