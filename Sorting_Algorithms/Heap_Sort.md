
# Sắp xếp vun đống (Heap Sort)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Sắp xếp vun đống là một thuật toán sắp xếp dựa trên so sánh. Nó có thể được coi là một phiên bản cải tiến của sắp xếp chọn. Giống như sắp xếp chọn, nó chia danh sách đầu vào thành một vùng đã sắp xếp và một vùng chưa được sắp xếp, và nó lặp đi lặp lại việc thu nhỏ vùng chưa được sắp xếp bằng cách trích xuất phần tử lớn nhất và chuyển nó vào vùng đã sắp xếp.

Sự cải tiến so với sắp xếp chọn là nó sử dụng một cấu trúc dữ liệu **heap** để nhanh chóng tìm thấy phần tử lớn nhất. Một heap là một cấu trúc dữ liệu dựa trên cây nhị phân đặc biệt thỏa mãn thuộc tính heap: trong một max heap, đối với bất kỳ nút nào C, nếu P là một nút cha của C, thì khóa (giá trị) của P lớn hơn hoặc bằng khóa của C.

## Mã giả (Pseudocode)

```
function heapSort(A) is
    n := length(A)
    // Xây dựng max heap
    for i from floor(n/2) - 1 down to 0 do
        heapify(A, n, i)
    // Trích xuất từng phần tử một từ heap
    for i from n - 1 down to 1 do
        swap A[0] with A[i]
        heapify(A, i, 0)

function heapify(A, n, i) is
    largest := i
    left := 2*i + 1
    right := 2*i + 2
    if left < n and A[left] > A[largest] then
        largest := left
    if right < n and A[right] > A[largest] then
        largest := right
    if largest != i then
        swap A[i] with A[largest]
        heapify(A, n, largest)
```

## Hướng tiếp cận

Quá trình sắp xếp vun đống có hai bước chính:

1.  **Xây dựng Heap:** Bước đầu tiên là xây dựng một max heap từ mảng đầu vào. Một max heap là một cây nhị phân hoàn chỉnh trong đó giá trị ở mỗi nút lớn hơn hoặc bằng giá trị của các con của nó. Điều này đảm bảo rằng phần tử lớn nhất trong mảng nằm ở gốc của heap.

2.  **Sắp xếp Heap:** Sau khi max heap được xây dựng, thuật toán sẽ lặp đi lặp lại việc hoán đổi phần tử gốc (phần tử lớn nhất) với phần tử cuối cùng trong mảng, sau đó giảm kích thước của heap đi một. Sau mỗi lần hoán đổi, nó sẽ gọi `heapify` trên gốc của heap đã giảm để duy trì thuộc tính heap. Quá trình này được lặp lại cho đến khi heap trống, dẫn đến một mảng đã được sắp xếp.

## Ứng dụng

*   **Hàng đợi ưu tiên:** Cấu trúc dữ liệu heap là một cách tuyệt vời để triển khai hàng đợi ưu tiên, trong đó phần tử có mức độ ưu tiên cao nhất có thể được truy cập nhanh chóng. Sắp xếp vun đống có thể được sử dụng trong các ứng dụng yêu cầu hàng đợi ưu tiên.
*   **Thuật toán đồ thị:** Các thuật toán như của Dijkstra và Prim sử dụng hàng đợi ưu tiên (thường được triển khai bằng heap) để tìm đường đi ngắn nhất hoặc cây bao trùm tối thiểu.
*   **Bất cứ khi nào cần đảm bảo độ phức tạp O(n log n):** Không giống như sắp xếp nhanh, sắp xếp vun đống có độ phức tạp trường hợp xấu nhất là O(n log n), làm cho nó trở thành một lựa chọn tốt khi không thể chấp nhận hiệu suất trường hợp xấu nhất.

## Bài toán thực hành (LeetCode)

Sắp xếp vun đống là một thuật toán sắp xếp hiệu quả với độ phức tạp thời gian O(n log n) trong mọi trường hợp. Cấu trúc dữ liệu heap cũng rất quan trọng trong nhiều bài toán khác.

*   [912. Sort an Array](https://leetcode.com/problems/sort-an-array/) (Triển khai Heap Sort)
*   [215. Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/) (Sử dụng Min-Heap hoặc Max-Heap)
*   [347. Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/) (Sử dụng Min-Heap)
*   [703. Kth Largest Element in a Stream](https://leetcode.com/problems/kth-largest-element-in-a-stream/) (Sử dụng Min-Heap)

## Triển khai (Python)

```python
def heapify(arr, n, i):
    largest = i
    l = 2 * i + 1
    r = 2 * i + 2

    if l < n and arr[i] < arr[l]:
        largest = l

    if r < n and arr[largest] < arr[r]:
        largest = r

    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heap_sort(arr):
    n = len(arr)

    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)

# Ví dụ sử dụng:
arr = [ 12, 11, 13, 5, 6, 7]
heap_sort(arr)
n = len(arr)
print ("Mảng đã sắp xếp là")
for i in range(n):
    print ("%d" %arr[i]),
```
