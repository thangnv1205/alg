
# Hồi quy tuyến tính (Linear Regression)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Hồi quy tuyến tính là một thuật toán học máy cơ bản và được sử dụng rộng rãi để mô hình hóa mối quan hệ giữa một biến phụ thuộc (biến mục tiêu) và một hoặc nhiều biến độc lập (biến dự đoán). Mục tiêu của hồi quy tuyến tính là tìm ra một hàm tuyến tính tốt nhất để dự đoán giá trị của biến phụ thuộc dựa trên các biến độc lập.

Trong hồi quy tuyến tính đơn giản (một biến độc lập), mối quan hệ được biểu diễn bằng một đường thẳng:

`y = wx + b`

Trong đó:
*   `y`: Biến phụ thuộc (giá trị dự đoán).
*   `x`: Biến độc lập.
*   `w`: Trọng số (độ dốc của đường thẳng).
*   `b`: Độ lệch (điểm cắt trục y).

Trong hồi quy tuyến tính đa biến (nhiều biến độc lập), mối quan hệ được biểu diễn bằng một siêu phẳng:

`y = w1x1 + w2x2 + ... + wnxn + b`

Mục tiêu là tìm các giá trị `w` và `b` sao cho sai số giữa giá trị dự đoán và giá trị thực tế là nhỏ nhất. Điều này thường được thực hiện bằng cách tối thiểu hóa hàm chi phí, chẳng hạn như Sai số bình phương trung bình (Mean Squared Error - MSE).

## Mã giả (Pseudocode) - Gradient Descent

```
function LinearRegression(X, y, learning_rate, n_iterations) is
    n_samples := number of rows in X
    n_features := number of columns in X

    weights := array of n_features, initialized to 0
    bias := 0

    for iter from 1 to n_iterations do
        y_predicted := dot_product(X, weights) + bias

        // Tính toán gradient
        dw := (1/n_samples) * dot_product(transpose(X), (y_predicted - y))
        db := (1/n_samples) * sum(y_predicted - y)

        // Cập nhật tham số
        weights := weights - learning_rate * dw
        bias := bias - learning_rate * db

    return weights, bias
```

## Hướng tiếp cận

Cách tiếp cận phổ biến để tìm các tham số tối ưu (`w` và `b`) là sử dụng thuật toán **Gradient Descent**:

1.  **Khởi tạo tham số:** Khởi tạo các trọng số (`w`) và độ lệch (`b`) với các giá trị ngẫu nhiên nhỏ hoặc bằng 0.
2.  **Dự đoán:** Tính toán giá trị dự đoán `y_predicted` bằng cách sử dụng các tham số hiện tại.
3.  **Tính toán hàm chi phí:** Tính toán sai số giữa `y_predicted` và `y` thực tế bằng cách sử dụng hàm chi phí (ví dụ: MSE).
4.  **Tính toán gradient:** Tính toán gradient của hàm chi phí đối với từng tham số (`w` và `b`). Gradient cho biết hướng dốc nhất của hàm chi phí.
5.  **Cập nhật tham số:** Cập nhật các tham số bằng cách di chuyển theo hướng ngược lại của gradient, với một bước nhảy được xác định bởi `learning_rate`.
    `w = w - learning_rate * dw`
    `b = b - learning_rate * db`
6.  **Lặp lại:** Lặp lại các bước 2-5 cho một số lần lặp nhất định hoặc cho đến khi hàm chi phí hội tụ.

## Ứng dụng

*   **Dự đoán giá nhà:** Dự đoán giá nhà dựa trên các yếu tố như diện tích, số phòng ngủ, vị trí.
*   **Dự báo doanh số:** Dự báo doanh số bán hàng trong tương lai dựa trên dữ liệu lịch sử.
*   **Phân tích tài chính:** Dự đoán giá cổ phiếu hoặc các chỉ số kinh tế khác.
*   **Y học:** Dự đoán nguy cơ mắc bệnh dựa trên các yếu tố sức khỏe của bệnh nhân.

## Bài toán thực hành (LeetCode)

Hồi quy tuyến tính là một thuật toán cơ bản trong học máy. Mặc dù LeetCode không có các bài toán trực tiếp yêu cầu triển khai mô hình hồi quy tuyến tính, nhưng các bài toán liên quan đến tối ưu hóa, gradient descent hoặc xử lý dữ liệu có thể giúp bạn củng cố kiến thức.

*   [1502. Can Make Arithmetic Progression From Sequence](https://leetcode.com/problems/can-make-arithmetic-progression-from-sequence/) (Liên quan đến các dãy số tuyến tính)
*   [121. Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) (Có thể liên quan đến việc tìm xu hướng tuyến tính)

## Triển khai (Python)

```python
import numpy as np

class LinearRegression:
    def __init__(self, learning_rate=0.01, n_iterations=1000):
        self.learning_rate = learning_rate
        self.n_iterations = n_iterations
        self.weights = None
        self.bias = None

    def fit(self, X, y):
        n_samples, n_features = X.shape

        # Khởi tạo tham số
        self.weights = np.zeros(n_features)
        self.bias = 0

        # Gradient Descent
        for _ in range(self.n_iterations):
            y_predicted = np.dot(X, self.weights) + self.bias

            # Tính toán gradient
            dw = (1/n_samples) * np.dot(X.T, (y_predicted - y))
            db = (1/n_samples) * np.sum(y_predicted - y)

            # Cập nhật tham số
            self.weights -= self.learning_rate * dw
            self.bias -= self.learning_rate * db

    def predict(self, X):
        y_predicted = np.dot(X, self.weights) + self.bias
        return y_predicted

# Ví dụ sử dụng:
# Dữ liệu giả
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2, 4, 5, 4, 5])

model = LinearRegression()
model.fit(X, y)

# Dự đoán
X_test = np.array([[6], [7]])
predictions = model.predict(X_test)

print("Trọng số:", model.weights)
print("Độ lệch:", model.bias)
print("Dự đoán cho X_test:", predictions)
```
