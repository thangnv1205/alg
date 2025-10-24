
# Sắp xếp chọn (Selection Sort)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Sắp xếp chọn là một thuật toán sắp xếp tại chỗ, dựa trên so sánh. Nó có độ phức tạp thời gian O(n^2), làm cho nó không hiệu quả trên các danh sách lớn, và thường hoạt động kém hơn so với sắp xếp chèn tương tự. Sắp xếp chọn được chú ý vì sự đơn giản của nó và cũng có lợi thế về hiệu suất so với các thuật toán phức tạp hơn trong một số tình huống nhất định, đặc biệt là khi bộ nhớ ghi là một hoạt động tốn kém.

Thuật toán chia danh sách đầu vào thành hai phần: một danh sách con đã được sắp xếp được xây dựng từ trái sang phải ở đầu danh sách và một danh sách con gồm các phần tử chưa được sắp xếp còn lại chiếm phần còn lại của danh sách.

## Mã giả (Pseudocode)

```
function selectionSort(A) is
    n := length(A)
    for i from 0 to n-2 inclusive do
        minIndex := i
        for j from i+1 to n-1 inclusive do
            if A[j] < A[minIndex] then
                minIndex := j
            end if
        end for
        swap(A[i], A[minIndex])
    end for
end function
```

*   `A`: Mảng
*   `n`: Số lượng phần tử trong `A`
*   `i`: Chỉ số phân chia phần đã sắp xếp và chưa được sắp xếp của mảng
*   `j`: Chỉ số lặp qua phần chưa được sắp xếp
*   `minIndex`: Chỉ số của phần tử nhỏ nhất được tìm thấy trong phần chưa được sắp xếp

## Hướng tiếp cận

1.  **Lặp qua mảng:** Lặp qua mảng từ đầu đến phần tử áp chót.
2.  **Tìm phần tử nhỏ nhất:** Trong mỗi lần lặp, giả sử phần tử đầu tiên của phần chưa được sắp xếp là nhỏ nhất. Sau đó, lặp qua phần còn lại của phần chưa được sắp xếp để tìm phần tử thực sự nhỏ nhất.
3.  **Hoán đổi:** Sau khi tìm thấy phần tử nhỏ nhất trong phần chưa được sắp xếp, hãy hoán đổi nó với phần tử đầu tiên của phần chưa được sắp xếp đó.
4.  **Mở rộng phần đã sắp xếp:** Di chuyển ranh giới giữa phần đã sắp xếp và chưa được sắp xếp sang phải một phần tử.
5.  **Lặp lại:** Lặp lại quá trình cho đến khi toàn bộ mảng được sắp xếp.

## Ứng dụng

Giống như sắp xếp nổi bọt, sắp xếp chọn chủ yếu được sử dụng cho mục đích giáo dục do sự đơn giản của nó.

Tuy nhiên, nó có một đặc tính thú vị: nó thực hiện số lần hoán đổi ít nhất có thể (O(n)). Điều này có thể hữu ích trong các tình huống mà chi phí ghi vào bộ nhớ rất cao, chẳng hạn như khi ghi vào bộ nhớ flash.

## Bài toán thực hành (LeetCode)

Sắp xếp chọn, giống như sắp xếp nổi bọt, chủ yếu được sử dụng cho mục đích giáo dục. Các bài toán sau có thể được giải bằng sắp xếp chọn, mặc dù các thuật toán hiệu quả hơn thường được mong đợi:

*   [912. Sort an Array](https://leetcode.com/problems/sort-an-array/) (Bạn có thể thử giải bằng Selection Sort để thực hành)
*   [1051. Height Checker](https://leetcode.com/problems/height-checker/) (Có thể giải bằng cách sắp xếp và so sánh, hoặc sử dụng ý tưởng tìm phần tử nhỏ nhất)

## Triển khai (Python)

```python
def selection_sort(arr):
    for i in range(len(arr)):
        min_idx = i
        for j in range(i+1, len(arr)):
            if arr[min_idx] > arr[j]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]

# Ví dụ sử dụng:
arr = [64, 25, 12, 22, 11]
selection_sort(arr)
print ("Mảng đã sắp xếp là:")
for i in range(len(arr)):
    print("%d" %arr[i])
```
