
# Sắp xếp nổi bọt (Bubble Sort)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Sắp xếp nổi bọt là một thuật toán sắp xếp dựa trên so sánh đơn giản. Nó hoạt động bằng cách lặp đi lặp lại qua danh sách, so sánh các phần tử liền kề và hoán đổi chúng nếu chúng sai thứ tự. Quá trình này được lặp lại cho đến khi danh sách được sắp xếp. Thuật toán được đặt tên theo cách các phần tử nhỏ hơn hoặc lớn hơn "nổi" lên đầu (hoặc cuối) danh sách.

Mặc dù đơn giản để hiểu và triển khai, sắp xếp nổi bọt không hiệu quả đối với các danh sách lớn và thường không được sử dụng trong các ứng dụng thực tế.

## Mã giả (Pseudocode)

```
function bubbleSort(A) is
    n := length(A)
    repeat
        swapped := false
        for i from 1 to n-1 inclusive do
            if A[i-1] > A[i] then
                swap(A[i-1], A[i])
                swapped := true
            end if
        end for
        n := n - 1
    until not swapped
end function
```

*   `A`: Mảng
*   `n`: Số lượng phần tử trong `A`
*   `swapped`: Một biến boolean để theo dõi xem có bất kỳ hoán đổi nào được thực hiện trong một lần lặp hay không

## Hướng tiếp cận

1.  **Bắt đầu từ đầu:** Bắt đầu từ đầu danh sách.
2.  **So sánh và hoán đổi:** So sánh phần tử đầu tiên với phần tử thứ hai. Nếu phần tử đầu tiên lớn hơn phần tử thứ hai, hãy hoán đổi chúng.
3.  **Di chuyển:** Chuyển sang cặp phần tử tiếp theo (thứ hai và thứ ba) và lặp lại so sánh và hoán đổi.
4.  **Hoàn thành một lần lặp:** Tiếp tục quá trình này cho đến cuối danh sách. Sau lần lặp đầu tiên, phần tử lớn nhất sẽ ở vị trí cuối cùng.
5.  **Lặp lại:** Lặp lại toàn bộ quá trình cho danh sách, nhưng bỏ qua phần tử cuối cùng (vì nó đã ở đúng vị trí). Mỗi lần lặp sẽ đặt phần tử lớn nhất tiếp theo vào đúng vị trí của nó.
6.  **Tối ưu hóa:** Nếu một lần lặp hoàn chỉnh đi qua mà không có bất kỳ hoán đổi nào, điều đó có nghĩa là danh sách đã được sắp xếp và thuật toán có thể dừng lại sớm.

## Ứng dụng

Do sự đơn giản của nó, sắp xếp nổi bọt chủ yếu được sử dụng cho mục đích giáo dục. Nó hiếm khi được sử dụng trong các ứng dụng sản xuất vì các thuật toán khác như sắp xếp nhanh, sắp xếp trộn hoặc sắp xếp vun đống có hiệu suất tốt hơn nhiều.

Tuy nhiên, nó có thể hữu ích trong một vài trường hợp cụ thể:

*   **Kiểm tra xem một danh sách đã được sắp xếp hay chưa:** Một lần lặp duy nhất của sắp xếp nổi bọt có thể xác định xem một danh sách đã được sắp xếp hay chưa.
*   **Các tập dữ liệu rất nhỏ:** Đối với các danh sách rất nhỏ, sự đơn giản của sắp xếp nổi bọt có thể làm cho nó nhanh hơn các thuật toán phức tạp hơn có chi phí thiết lập cao hơn.

## Bài toán thực hành (LeetCode)

Sắp xếp nổi bọt hiếm khi được sử dụng trong các ứng dụng thực tế do hiệu suất kém. Tuy nhiên, việc hiểu nó là cơ bản. Các bài toán sau có thể được giải bằng sắp xếp nổi bọt, mặc dù các thuật toán hiệu quả hơn thường được mong đợi:

*   [912. Sort an Array](https://leetcode.com/problems/sort-an-array/) (Bạn có thể thử giải bằng Bubble Sort để thực hành, nhưng sẽ bị TLE với các bộ dữ liệu lớn)
*   [283. Move Zeroes](https://leetcode.com/problems/move-zeroes/) (Có thể giải bằng cách di chuyển các phần tử tương tự như Bubble Sort)

## Triển khai (Python)

```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        # Cờ để tối ưu hóa: nếu không có hoán đổi nào trong một lần lặp, danh sách đã được sắp xếp
        swapped = False
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = True
        if not swapped:
            break

# Ví dụ sử dụng:
arr = [64, 34, 25, 12, 22, 11, 90]

bubble_sort(arr)

print("Mảng đã sắp xếp là:")
for i in range(len(arr)):
    print("%d" %arr[i]),
```
