
# Máy vector hỗ trợ (Support Vector Machines - SVM)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Máy vector hỗ trợ (SVM) là một thuật toán học máy có giám sát được sử dụng cho các bài toán phân loại và hồi quy. Tuy nhiên, nó chủ yếu được sử dụng cho phân loại. Mục tiêu của SVM là tìm một siêu phẳng (hyperplane) trong không gian N chiều (N là số lượng đặc trưng) để phân loại rõ ràng các điểm dữ liệu.

Siêu phẳng tốt nhất là siêu phẳng có khoảng cách lớn nhất đến điểm dữ liệu gần nhất của bất kỳ lớp nào (còn gọi là biên độ - margin). Nếu siêu phẳng này tồn tại, nó được gọi là siêu phẳng biên độ tối đa. Các điểm dữ liệu gần nhất với siêu phẳng được gọi là các vector hỗ trợ.

SVM có thể thực hiện phân loại tuyến tính và phi tuyến tính. Đối với phân loại phi tuyến tính, nó sử dụng một kỹ thuật gọi là "kernel trick" để ánh xạ dữ liệu đầu vào vào một không gian đặc trưng có chiều cao hơn, nơi có thể tìm thấy một siêu phẳng phân tách tuyến tính.

## Mã giả (Pseudocode) - SVM tuyến tính

```
function LinearSVM(X, y, learning_rate, lambda_param, n_iterations) is
    n_samples := number of rows in X
    n_features := number of columns in X

    // Chuyển đổi nhãn y thành -1 và 1
    y_ := map y to -1 if y <= 0 else 1

    weights := array of n_features, initialized to 0
    bias := 0

    for iter from 1 to n_iterations do
        for idx from 0 to n_samples - 1 do
            x_i := X[idx]
            y_i := y_[idx]

            condition := y_i * (dot_product(x_i, weights) - bias) >= 1

            if condition then
                weights := weights - learning_rate * (2 * lambda_param * weights)
            else
                weights := weights - learning_rate * (2 * lambda_param * weights - dot_product(x_i, y_i))
                bias := bias - learning_rate * y_i

    return weights, bias
```

## Hướng tiếp cận

SVM tuyến tính tìm kiếm một siêu phẳng phân tách dữ liệu thành hai lớp. Cách tiếp cận bao gồm:

1.  **Khởi tạo tham số:** Khởi tạo các trọng số (`weights`) và độ lệch (`bias`) với các giá trị nhỏ.
2.  **Tối ưu hóa:** SVM cố gắng tối thiểu hóa một hàm mất mát kết hợp hai mục tiêu:
    *   **Tối đa hóa biên độ:** Tìm một siêu phẳng có khoảng cách lớn nhất đến các điểm dữ liệu gần nhất của mỗi lớp.
    *   **Giảm thiểu lỗi phân loại:** Đảm bảo rằng các điểm dữ liệu được phân loại đúng.
    Điều này thường được thực hiện bằng cách sử dụng tối ưu hóa lặp (ví dụ: Gradient Descent) để điều chỉnh `weights` và `bias`.
3.  **Hàm mất mát:** Hàm mất mát cho SVM thường bao gồm một thuật ngữ điều hòa (regularization term) để kiểm soát độ phức tạp của mô hình và một thuật ngữ mất mát bản lề (hinge loss) để phạt các lỗi phân loại.
4.  **Dự đoán:** Để phân loại một điểm dữ liệu mới, nó được đặt vào phía nào của siêu phẳng. Nếu `(np.dot(X, self.weights) - self.bias)` lớn hơn 0, nó thuộc một lớp; nếu không, nó thuộc lớp kia.

## Ứng dụng

*   **Phân loại văn bản:** Phân loại tài liệu thành các danh mục khác nhau.
*   **Nhận dạng chữ viết tay:** Nhận dạng các ký tự viết tay.
*   **Phân loại hình ảnh:** Phân loại hình ảnh thành các đối tượng khác nhau.
*   **Tin sinh học:** Phân loại protein, phân tích biểu hiện gen.

## Bài toán thực hành (LeetCode)

Máy vector hỗ trợ (SVM) là một thuật toán phân loại mạnh mẽ, đặc biệt hiệu quả trong việc tìm siêu phẳng phân tách tối ưu. Mặc dù LeetCode không có các bài toán trực tiếp yêu cầu triển khai SVM, nhưng các bài toán liên quan đến phân loại, tối ưu hóa hoặc tìm ranh giới phân tách có thể giúp bạn củng cố kiến thức.

*   [136. Single Number](https://leetcode.com/problems/single-number/) (Liên quan đến phân loại nhị phân)
*   [169. Majority Element](https://leetcode.com/problems/majority-element/) (Liên quan đến việc tìm ra lớp chiếm ưu thế)

## Triển khai (Python)

```python
import numpy as np

class SVM:
    def __init__(self, learning_rate=0.001, lambda_param=0.01, n_iterations=1000):
        self.learning_rate = learning_rate
        self.lambda_param = lambda_param
        self.n_iterations = n_iterations
        self.weights = None
        self.bias = None

    def fit(self, X, y):
        n_samples, n_features = X.shape

        # Chuyển đổi nhãn y thành -1 và 1
        y_ = np.where(y <= 0, -1, 1)

        # Khởi tạo trọng số và độ lệch
        self.weights = np.zeros(n_features)
        self.bias = 0

        # Gradient Descent
        for _ in range(self.n_iterations):
            for idx, x_i in enumerate(X):
                condition = y_[idx] * (np.dot(x_i, self.weights) - self.bias) >= 1
                if condition:
                    self.weights -= self.learning_rate * (2 * self.lambda_param * self.weights)
                else:
                    self.weights -= self.learning_rate * (2 * self.lambda_param * self.weights - np.dot(x_i, y_[idx]))
                    self.bias -= self.learning_rate * y_[idx]

    def predict(self, X):
        approx = np.dot(X, self.weights) - self.bias
        return np.sign(approx)

# Ví dụ sử dụng:
# Dữ liệu giả
X = np.array([[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]])
y = np.array([0, 0, 0, 1, 1, 1])

svm = SVM()
svm.fit(X, y)

X_test = np.array([[1.5, 2.5], [5.5, 6.5]])
predictions = svm.predict(X_test)
print("Dự đoán của SVM cho X_test:", predictions)
```
