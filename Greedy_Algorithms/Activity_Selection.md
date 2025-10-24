
# Thuật toán chọn hoạt động (Activity Selection Problem)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Bài toán chọn hoạt động là một bài toán tối ưu hóa trong đó chúng ta được cho một tập hợp các hoạt động, mỗi hoạt động có thời gian bắt đầu và thời gian kết thúc. Mục tiêu là chọn số lượng hoạt động tối đa có thể được thực hiện bởi một người hoặc một tài nguyên duy nhất, với điều kiện là không có hai hoạt động nào được chọn chồng chéo nhau (tức là, một hoạt động phải kết thúc trước khi hoạt động tiếp theo bắt đầu).

Đây là một bài toán kinh điển có thể được giải quyết bằng cách sử dụng một thuật toán tham lam.

## Mã giả (Pseudocode)

```
function ActivitySelection(activities) is
    sort activities by finish time in non-decreasing order
    
    selected_activities := empty list
    if activities is empty then
        return selected_activities

    add first activity to selected_activities
    last_finish_time := finish time of first activity

    for i from 1 to length(activities) - 1 do
        if start time of activities[i] >= last_finish_time then
            add activities[i] to selected_activities
            last_finish_time := finish time of activities[i]

    return selected_activities
```

*   `activities`: Danh sách các hoạt động, mỗi hoạt động là một cặp `(start_time, finish_time)`

## Hướng tiếp cận

Thuật toán chọn hoạt động sử dụng một cách tiếp cận tham lam:

1.  **Sắp xếp:** Sắp xếp tất cả các hoạt động theo thời gian kết thúc tăng dần. Đây là bước quan trọng nhất của cách tiếp cận tham lam.
2.  **Chọn hoạt động đầu tiên:** Chọn hoạt động đầu tiên trong danh sách đã sắp xếp (hoạt động kết thúc sớm nhất). Thêm nó vào tập hợp các hoạt động đã chọn.
3.  **Lặp và chọn:** Lặp qua các hoạt động còn lại. Đối với mỗi hoạt động, nếu thời gian bắt đầu của nó lớn hơn hoặc bằng thời gian kết thúc của hoạt động đã chọn gần đây nhất, hãy chọn hoạt động này và cập nhật thời gian kết thúc của hoạt động đã chọn gần đây nhất.

Lý do cách tiếp cận tham lam này hoạt động là vì việc chọn hoạt động kết thúc sớm nhất sẽ để lại nhiều thời gian nhất có thể cho các hoạt động còn lại, do đó tối đa hóa số lượng hoạt động có thể được chọn.

## Ứng dụng

*   **Lập lịch trình:** Lập lịch trình các cuộc họp, lớp học hoặc các sự kiện khác để tối đa hóa việc sử dụng tài nguyên.
*   **Quản lý tài nguyên:** Phân bổ tài nguyên hạn chế (ví dụ: máy móc, nhân viên) cho các nhiệm vụ khác nhau.
*   **Tối ưu hóa sử dụng CPU:** Trong hệ điều hành, để lập lịch trình các tác vụ trên CPU.

## Bài toán thực hành (LeetCode)

Bài toán chọn hoạt động là một bài toán tham lam kinh điển, thường xuất hiện dưới dạng các bài toán lập lịch trình hoặc tối ưu hóa tài nguyên.

*   [435. Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)
*   [253. Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/) (Bài toán khó)
*   [1353. Maximum Number of Events That Can Be Attended](https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended/) (Biến thể của Activity Selection)

## Triển khai (Python)

```python
def activity_selection(activities):
    # Sắp xếp các hoạt động theo thời gian kết thúc
    activities.sort(key=lambda x: x[1])

    n = len(activities)
    if n == 0:
        return []

    # Hoạt động đầu tiên luôn được chọn
    selected_activities = [activities[0]]
    last_finish_time = activities[0][1]

    # Xem xét các hoạt động còn lại
    for i in range(1, n):
        if activities[i][0] >= last_finish_time:
            selected_activities.append(activities[i])
            last_finish_time = activities[i][1]

    return selected_activities

# Ví dụ sử dụng:
# Mỗi hoạt động là một bộ (thời gian bắt đầu, thời gian kết thúc)
activities = [(1, 4), (3, 5), (0, 6), (5, 7), (3, 8), (5, 9), (6, 10), (8, 11), (8, 12), (2, 13), (12, 14)]

selected = activity_selection(activities)
print("Các hoạt động được chọn là:", selected)
```
