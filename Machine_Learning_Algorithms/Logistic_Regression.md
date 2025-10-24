
# Hồi quy logistic (Logistic Regression)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Hồi quy logistic là một thuật toán phân loại, không phải hồi quy, mặc dù tên của nó có thể gây nhầm lẫn. Nó được sử dụng để dự đoán xác suất của một biến phụ thuộc phân loại (thường là nhị phân, tức là hai lớp) dựa trên một hoặc nhiều biến độc lập.

Không giống như hồi quy tuyến tính, hồi quy logistic sử dụng hàm sigmoid (còn gọi là hàm logistic) để ánh xạ bất kỳ giá trị thực nào thành một giá trị nằm trong khoảng từ 0 đến 1. Giá trị này có thể được diễn giải là xác suất thuộc về một lớp cụ thể.

Công thức cơ bản:

`P(Y=1|X) = 1 / (1 + e^-(wX + b))`

Trong đó:
*   `P(Y=1|X)`: Xác suất biến phụ thuộc `Y` thuộc lớp 1, với các biến độc lập `X`.
*   `w`: Trọng số.
*   `X`: Các biến độc lập.
*   `b`: Độ lệch.
*   `e`: Cơ số của logarit tự nhiên.

## Mã giả (Pseudocode) - Gradient Descent

```
function LogisticRegression(X, y, learning_rate, n_iterations) is
    n_samples := number of rows in X
    n_features := number of columns in X

    weights := array of n_features, initialized to 0
    bias := 0

    for iter from 1 to n_iterations do
        linear_model := dot_product(X, weights) + bias
        y_predicted := sigmoid(linear_model)

        // Tính toán gradient
        dw := (1/n_samples) * dot_product(transpose(X), (y_predicted - y))
        db := (1/n_samples) * sum(y_predicted - y)

        // Cập nhật tham số
        weights := weights - learning_rate * dw
        bias := bias - learning_rate * db

    return weights, bias

function sigmoid(z) is
    return 1 / (1 + exp(-z))
```

## Hướng tiếp cận

Giống như hồi quy tuyến tính, hồi quy logistic cũng sử dụng **Gradient Descent** để tìm các tham số tối ưu (`w` và `b`) tối thiểu hóa hàm chi phí (thường là hàm mất mát logarit hoặc entropy chéo).

1.  **Khởi tạo tham số:** Khởi tạo các trọng số (`w`) và độ lệch (`b`) với các giá trị ngẫu nhiên nhỏ hoặc bằng 0.
2.  **Tính toán mô hình tuyến tính:** `linear_model = np.dot(X, self.weights) + self.bias`
3.  **Áp dụng hàm Sigmoid:** Chuyển đổi đầu ra tuyến tính thành xác suất bằng cách sử dụng hàm sigmoid: `y_predicted = sigmoid(linear_model)`.
4.  **Tính toán gradient:** Tính toán gradient của hàm chi phí đối với từng tham số (`w` và `b`).
5.  **Cập nhật tham số:** Cập nhật các tham số bằng cách di chuyển theo hướng ngược lại của gradient, với một bước nhảy được xác định bởi `learning_rate`.
6.  **Lặp lại:** Lặp lại các bước 2-5 cho một số lần lặp nhất định hoặc cho đến khi hàm chi phí hội tụ.
7.  **Dự đoán lớp:** Để phân loại, một ngưỡng (thường là 0.5) được áp dụng cho xác suất dự đoán. Nếu xác suất lớn hơn ngưỡng, nó được phân loại là lớp 1; nếu không, là lớp 0.

## Ứng dụng

*   **Phân loại email spam:** Xác định xem một email có phải là spam hay không.
*   **Dự đoán bệnh:** Dự đoán khả năng một bệnh nhân mắc một bệnh cụ thể (ví dụ: bệnh tim, tiểu đường) dựa trên các triệu chứng và yếu tố rủi ro.
*   **Phân tích tình cảm:** Phân loại văn bản là tích cực, tiêu cực hoặc trung tính.
*   **Dự đoán vỡ nợ tín dụng:** Dự đoán khả năng một khách hàng sẽ vỡ nợ khoản vay.

## Bài toán thực hành (LeetCode)

Hồi quy logistic là một thuật toán phân loại nhị phân cơ bản. Mặc dù LeetCode không có các bài toán trực tiếp yêu cầu triển khai mô hình hồi quy logistic, nhưng các bài toán liên quan đến phân loại, tối ưu hóa hoặc xử lý xác suất có thể giúp bạn củng cố kiến thức.

*   [136. Single Number](https://leetcode.com/problems/single-number/) (Liên quan đến phân loại nhị phân)
*   [169. Majority Element](https://leetcode.com/problems/majority-element/) (Liên quan đến việc tìm ra lớp chiếm ưu thế)

## Triển khai (Python)

```python
import numpy as np

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

class LogisticRegression:
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
            linear_model = np.dot(X, self.weights) + self.bias
            y_predicted = sigmoid(linear_model)

            # Tính toán gradient
            dw = (1/n_samples) * np.dot(X.T, (y_predicted - y))
            db = (1/n_samples) * np.sum(y_predicted - y)

            # Cập nhật tham số
            self.weights -= self.learning_rate * dw
            self.bias -= self.learning_rate * db

    def predict(self, X):
        linear_model = np.dot(X, self.weights) + self.bias
        y_predicted = sigmoid(linear_model)
        y_predicted_cls = [1 if i > 0.5 else 0 for i in y_predicted]
        return np.array(y_predicted_cls)

# Ví dụ sử dụng:
# Dữ liệu giả
X = np.array([[0.5], [1.2], [2.1], [3.5], [4.8]])
y = np.array([0, 0, 1, 1, 1])

model = LogisticRegression()
model.fit(X, y)

# Dự đoán
X_test = np.array([[0.2], [2.5], [5.0]])
predictions = model.predict(X_test)

print("Trọng số:", model.weights)
print("Độ lệch:", model.bias)
print("Dự đoán cho X_test:", predictions)
```
