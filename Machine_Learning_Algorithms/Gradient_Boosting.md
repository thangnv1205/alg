
# Gradient Boosting (XGBoost, LightGBM)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Gradient Boosting là một kỹ thuật học máy mạnh mẽ được sử dụng cho cả bài toán phân loại và hồi quy. Nó thuộc họ các thuật toán học tập tổng hợp (ensemble learning), nơi nhiều mô hình học tập yếu (thường là cây quyết định) được kết hợp để tạo thành một mô hình mạnh mẽ hơn.

Ý tưởng cốt lõi của Gradient Boosting là xây dựng các mô hình một cách tuần tự, trong đó mỗi mô hình mới cố gắng sửa chữa các lỗi của các mô hình trước đó. Nó thực hiện điều này bằng cách huấn luyện mô hình mới để dự đoán gradient âm của hàm mất mát (residual) của mô hình tổng hợp hiện tại.

Các triển khai phổ biến của Gradient Boosting bao gồm XGBoost, LightGBM và CatBoost, nổi tiếng về hiệu suất và tốc độ.

## Mã giả (Pseudocode) - Gradient Boosting chung

```
function GradientBoosting(X, y, M, learning_rate) is
    F0(x) := argmin_γ Σ L(y_i, γ) // Khởi tạo mô hình với một hằng số

    for m from 1 to M do
        // Tính toán pseudo-residuals
        r_im := -[∂L(y_i, F(x_i)) / ∂F(x_i)] for i = 1 to n

        // Huấn luyện một bộ học yếu (ví dụ: cây quyết định) để phù hợp với pseudo-residuals
        h_m(x) := fit_weak_learner(X, r_im)

        // Tìm hệ số nhân tối ưu γ_m
        γ_m := argmin_γ Σ L(y_i, F_m-1(x_i) + γ * h_m(x_i))

        // Cập nhật mô hình
        F_m(x) := F_m-1(x) + learning_rate * γ_m * h_m(x)

    return FM(x)
```

*   `X`: Dữ liệu đầu vào
*   `y`: Nhãn mục tiêu
*   `M`: Số lượng bộ ước tính (cây)
*   `L`: Hàm mất mát
*   `F(x)`: Mô hình tổng hợp
*   `h_m(x)`: Bộ học yếu thứ `m`

## Hướng tiếp cận

Gradient Boosting hoạt động theo các bước sau:

1.  **Khởi tạo mô hình:** Bắt đầu với một mô hình đơn giản, thường là một hằng số, để dự đoán giá trị trung bình hoặc chế độ của biến mục tiêu.
2.  **Lặp lại:** Đối với một số lần lặp nhất định (hoặc số lượng cây):
    *   **Tính toán Pseudo-Residuals:** Tính toán "pseudo-residuals" (gradient âm của hàm mất mát) giữa các dự đoán hiện tại của mô hình tổng hợp và các giá trị thực tế. Các pseudo-residuals này đại diện cho các lỗi mà mô hình hiện tại đang mắc phải.
    *   **Huấn luyện bộ học yếu:** Huấn luyện một bộ học yếu mới (thường là một cây quyết định nhỏ) để dự đoán các pseudo-residuals này.
    *   **Cập nhật mô hình:** Thêm dự đoán của bộ học yếu mới vào mô hình tổng hợp, nhân với một hệ số học (`learning_rate`) để kiểm soát tốc độ học và ngăn chặn việc quá khớp.
3.  **Kết quả:** Mô hình cuối cùng là tổng của tất cả các bộ học yếu đã được huấn luyện.

## Ứng dụng

*   **Các cuộc thi Kaggle:** Rất phổ biến trong các cuộc thi học máy do hiệu suất cao của nó.
*   **Phân loại và hồi quy:** Được sử dụng rộng rãi trong nhiều lĩnh vực như tài chính, y tế, thương mại điện tử, v.v.
*   **Hệ thống khuyến nghị:** Cải thiện độ chính xác của các hệ thống khuyến nghị.
*   **Xếp hạng tìm kiếm:** Trong các công cụ tìm kiếm để xếp hạng các kết quả tìm kiếm.

## Bài toán thực hành (LeetCode)

Gradient Boosting là một kỹ thuật học máy mạnh mẽ, thường được sử dụng trong các cuộc thi và ứng dụng thực tế. Mặc dù LeetCode không có các bài toán trực tiếp yêu cầu triển khai Gradient Boosting, nhưng các bài toán liên quan đến học tập tổng hợp, tối ưu hóa hoặc xây dựng mô hình tuần tự có thể giúp bạn củng cố kiến thức.

*   [135. Candy](https://leetcode.com/problems/candy/) (Có thể giải bằng cách tối ưu hóa cục bộ)
*   [134. Gas Station](https://leetcode.com/problems/gas-station/) (Có thể giải bằng cách tối ưu hóa cục bộ)

## Triển khai (Python) - Ví dụ đơn giản (AdaBoost)

Ví dụ dưới đây là một triển khai đơn giản của AdaBoost, một thuật toán boosting ban đầu, để minh họa khái niệm cơ bản của việc kết hợp các bộ học yếu.

```python
import numpy as np

class DecisionStump:
    def __init__(self):
        self.polarity = 1
        self.feature_idx = None
        self.threshold = None
        self.alpha = None

    def predict(self, X):
        n_samples = X.shape[0]
        X_column = X[:, self.feature_idx]
        predictions = np.ones(n_samples)
        predictions[X_column < self.threshold] = -1
        return predictions * self.polarity

class AdaBoost:
    def __init__(self, n_estimators=50):
        self.n_estimators = n_estimators
        self.estimators = []
        self.alphas = []

    def fit(self, X, y):
        n_samples, n_features = X.shape

        # Chuyển đổi nhãn y thành -1 và 1
        y_ = np.where(y == 0, -1, 1)

        # Khởi tạo trọng số cho các mẫu
        w = np.full(n_samples, (1 / n_samples))

        for _ in range(self.n_estimators):
            # Tìm bộ phân loại yếu nhất
            estimator = DecisionStump()
            min_error = float('inf')

            for feature_idx in range(n_features):
                thresholds = np.unique(X[:, feature_idx])
                for threshold in thresholds:
                    # Thử hai cực: 1 và -1
                    for polarity in [1, -1]:
                        predictions = np.ones(n_samples)
                        predictions[X[:, feature_idx] < threshold] = -1
                        predictions *= polarity

                        # Tính toán lỗi có trọng số
                        error = np.sum(w[y_ != predictions])

                        if error < min_error:
                            min_error = error
                            estimator.polarity = polarity
                            estimator.feature_idx = feature_idx
                            estimator.threshold = threshold

            # Tính toán alpha (mức độ quan trọng của bộ phân loại)
            alpha = 0.5 * np.log((1.0 - min_error) / (min_error + 1e-10))

            # Cập nhật trọng số mẫu
            predictions = estimator.predict(X)
            w *= np.exp(-alpha * y_ * predictions)
            w /= np.sum(w) # Chuẩn hóa trọng số

            # Lưu trữ bộ phân loại và alpha của nó
            estimator.alpha = alpha
            self.estimators.append(estimator)

    def predict(self, X):
        estimator_preds = [estimator.alpha * estimator.predict(X) for estimator in self.estimators]
        y_pred = np.sum(estimator_preds, axis=0)
        return np.sign(y_pred)

# Ví dụ sử dụng:
# Dữ liệu giả
X = np.array([[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]])
y = np.array([0, 0, 0, 1, 1, 1])

adaboost = AdaBoost(n_estimators=10)
adaboost.fit(X, y)

X_test = np.array([[1.5, 2.5], [5.5, 6.5]])
predictions = adaboost.predict(X_test)
print("Dự đoán của AdaBoost cho X_test:", predictions)
```
