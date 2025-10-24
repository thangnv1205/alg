
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
                        error = np.sum(w[y != predictions])

                        if error < min_error:
                            min_error = error
                            estimator.polarity = polarity
                            estimator.feature_idx = feature_idx
                            estimator.threshold = threshold

            # Tính toán alpha (mức độ quan trọng của bộ phân loại)
            alpha = 0.5 * np.log((1.0 - min_error) / (min_error + 1e-10))

            # Cập nhật trọng số mẫu
            predictions = estimator.predict(X)
            w *= np.exp(-alpha * y * predictions)
            w /= np.sum(w) # Chuẩn hóa trọng số

            # Lưu trữ bộ phân loại và alpha của nó
            estimator.alpha = alpha
            self.estimators.append(estimator)

    def predict(self, X):
        estimator_preds = [estimator.alpha * estimator.predict(X) for estimator in self.estimators]
        y_pred = np.sum(estimator_preds, axis=0)
        return np.sign(y_pred)
