
# Rừng ngẫu nhiên (Random Forest)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Rừng ngẫu nhiên là một thuật toán học máy linh hoạt và mạnh mẽ, được sử dụng cho cả bài toán phân loại và hồi quy. Nó là một thuật toán học tập tổng hợp (ensemble learning), có nghĩa là nó kết hợp đầu ra của nhiều mô hình học tập cơ bản (trong trường hợp này là cây quyết định) để tạo ra một dự đoán tốt hơn.

Ý tưởng cốt lõi đằng sau rừng ngẫu nhiên là xây dựng một "rừng" gồm nhiều cây quyết định. Để phân loại một đối tượng mới, mỗi cây trong rừng đưa ra một "phiếu bầu" phân loại và rừng chọn phân loại có nhiều phiếu bầu nhất. Đối với hồi quy, nó lấy giá trị trung bình của các dự đoán của các cây.

## Mã giả (Pseudocode)

```
function RandomForest(X, y, n_trees, max_depth, n_features) is
    forest := empty list of Decision Trees
    for i from 1 to n_trees do
        // Bước 1: Lấy mẫu bootstrap (lấy mẫu có thay thế)
        X_sample, y_sample := bootstrap_sample(X, y)

        // Bước 2: Xây dựng cây quyết định
        tree := new DecisionTree(max_depth, n_features)
        tree.fit(X_sample, y_sample)
        add tree to forest

    return forest

function Predict(forest, X_test) is
    predictions := empty list
    for each tree in forest do
        add tree.predict(X_test) to predictions

    // Đối với phân loại: lấy phiếu bầu đa số
    // Đối với hồi quy: lấy giá trị trung bình
    return majority_vote(predictions) or average(predictions)
```

## Hướng tiếp cận

Thuật toán rừng ngẫu nhiên hoạt động theo các bước sau:

1.  **Lấy mẫu Bootstrap (Bagging):** Đối với mỗi cây trong rừng, một tập hợp con của dữ liệu huấn luyện được lấy mẫu ngẫu nhiên **có thay thế**. Điều này có nghĩa là một số mẫu có thể xuất hiện nhiều lần trong tập con, và một số mẫu có thể không xuất hiện.
2.  **Chọn ngẫu nhiên các đặc trưng:** Khi xây dựng mỗi cây quyết định, tại mỗi nút, một tập hợp con ngẫu nhiên của các đặc trưng được chọn để tìm phân chia tốt nhất. Điều này giúp giảm sự tương quan giữa các cây và tăng cường tính ngẫu nhiên.
3.  **Xây dựng cây quyết định:** Mỗi cây quyết định được xây dựng trên tập con dữ liệu và tập con đặc trưng đã chọn. Các cây thường được xây dựng sâu hết mức có thể mà không bị cắt tỉa.
4.  **Tổng hợp dự đoán:**
    *   **Phân loại:** Đối với một điểm dữ liệu mới, mỗi cây trong rừng đưa ra một dự đoán. Dự đoán cuối cùng là kết quả của phiếu bầu đa số từ tất cả các cây.
    *   **Hồi quy:** Đối với một điểm dữ liệu mới, mỗi cây đưa ra một dự đoán. Dự đoán cuối cùng là giá trị trung bình của tất cả các dự đoán của các cây.

## Ứng dụng

*   **Phân loại và hồi quy:** Được sử dụng rộng rãi trong nhiều lĩnh vực như tài chính, y tế, thương mại điện tử, v.v.
*   **Phát hiện gian lận:** Xác định các giao dịch hoặc hành vi gian lận.
*   **Phân tích hình ảnh:** Nhận dạng đối tượng, phân đoạn hình ảnh.
*   **Y học:** Chẩn đoán bệnh, dự đoán kết quả điều trị.

## Bài toán thực hành (LeetCode)

Rừng ngẫu nhiên là một thuật toán học tập tổng hợp mạnh mẽ. Mặc dù LeetCode không có các bài toán trực tiếp yêu cầu triển khai Random Forest, nhưng các bài toán liên quan đến phân loại, tổng hợp mô hình hoặc xử lý dữ liệu có thể giúp bạn củng cố kiến thức.

*   [105. Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) (Liên quan đến cấu trúc cây)
*   [106. Construct Binary Tree from Inorder and Postorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/) (Liên quan đến cấu trúc cây)

## Triển khai (Python)

```python
import numpy as np
from collections import Counter

class Node:
    def __init__(self, feature_index=None, threshold=None, left=None, right=None, value=None):
        self.feature_index = feature_index
        self.threshold = threshold
        self.left = left
        self.right = right
        self.value = value

class DecisionTree:
    def __init__(self, min_samples_split=2, max_depth=100, n_features=None):
        self.min_samples_split = min_samples_split
        self.max_depth = max_depth
        self.n_features = n_features
        self.root = None

    def _is_finished(self, depth):
        if depth >= self.max_depth:
            return True
        return False

    def _entropy(self, y):
        hist = np.bincount(y)
        ps = hist / len(y)
        return -np.sum([p * np.log2(p) for p in ps if p > 0])

    def _create_split(self, X, y, feature_index, threshold):
        left_idx = np.argwhere(X[:, feature_index] <= threshold).flatten()
        right_idx = np.argwhere(X[:, feature_index] > threshold).flatten()
        return left_idx, right_idx

    def _best_split(self, X, y, features):
        best_gain = -1
        split_idx, split_threshold = None, None

        for feature_index in features:
            thresholds = np.unique(X[:, feature_index])
            for threshold in thresholds:
                gain = self._information_gain(X, y, feature_index, threshold)

                if gain > best_gain:
                    best_gain = gain
                    split_idx = feature_index
                    split_threshold = threshold

        return split_idx, split_threshold

    def _information_gain(self, X, y, feature_index, threshold):
        parent_entropy = self._entropy(y)

        left_idx, right_idx = self._create_split(X, y, feature_index, threshold)

        if len(left_idx) == 0 or len(right_idx) == 0:
            return 0

        n = len(y)
        n_l, n_r = len(left_idx), len(right_idx)
        e_l, e_r = self._entropy(y[left_idx]), self._entropy(y[right_idx])
        child_entropy = (n_l / n) * e_l + (n_r / n) * e_r

        ig = parent_entropy - child_entropy
        return ig

    def _most_common_label(self, y):
        counter = Counter(y)
        most_common = counter.most_common(1)[0][0]
        return most_common

    def _build_tree(self, X, y, depth=0):
        n_samples, n_features = X.shape
        n_labels = len(np.unique(y))

        if self._is_finished(depth) or n_labels == 1 or n_samples < self.min_samples_split:
            leaf_value = self._most_common_label(y)
            return Node(value=leaf_value)

        feat_idxs = np.random.choice(n_features, self.n_features, replace=False) if self.n_features else np.arange(n_features)

        best_feature, best_threshold = self._best_split(X, y, feat_idxs)

        if best_feature is None: # Không tìm thấy phân tách tốt
            leaf_value = self._most_common_label(y)
            return Node(value=leaf_value)

        left_idx, right_idx = self._create_split(X, y, best_feature, best_threshold)
        left_child = self._build_tree(X[left_idx, :], y[left_idx], depth + 1)
        right_child = self._build_tree(X[right_idx, :], y[right_idx], depth + 1)
        return Node(best_feature, best_threshold, left_child, right_child)

    def fit(self, X, y):
        self.n_features = X.shape[1] if not self.n_features else min(X.shape[1], self.n_features)
        self.root = self._build_tree(X, y)

    def _traverse_tree(self, x, node):
        if node.value is not None:
            return node.value

        if x[node.feature_index] <= node.threshold:
            return self._traverse_tree(x, node.left)
        return self._traverse_tree(x, node.right)

    def predict(self, X):
        return np.array([self._traverse_tree(x, self.root) for x in X])


class RandomForest:
    def __init__(self, n_trees=10, min_samples_split=2, max_depth=100, n_features=None):
        self.n_trees = n_trees
        self.min_samples_split = min_samples_split
        self.max_depth = max_depth
        self.n_features = n_features
        self.trees = []

    def fit(self, X, y):
        self.trees = []
        for _ in range(self.n_trees):
            tree = DecisionTree(
                min_samples_split=self.min_samples_split,
                max_depth=self.max_depth,
                n_features=self.n_features
            )
            X_sample, y_sample = self._bootstrap_samples(X, y)
            tree.fit(X_sample, y_sample)
            self.trees.append(tree)

    def _bootstrap_samples(self, X, y):
        n_samples = X.shape[0]
        idxs = np.random.choice(n_samples, n_samples, replace=True)
        return X[idxs], y[idxs]

    def predict(self, X):
        predictions = np.array([tree.predict(X) for tree in self.trees])
        # Đối với phân loại, lấy phiếu bầu đa số
        tree_predictions = np.swapaxes(predictions, 0, 1)
        y_pred = [Counter(pred).most_common(1)[0][0] for pred in tree_predictions]
        return np.array(y_pred)

# Ví dụ sử dụng:
# Dữ liệu giả
X = np.array([[2, 3], [3, 4], [4, 5], [5, 6], [1, 2], [2, 2], [6, 7], [7, 8]])
y = np.array([0, 0, 0, 0, 1, 1, 1, 1])

rf = RandomForest(n_trees=3, max_depth=5, n_features=2)
rf.fit(X, y)

X_test = np.array([[2.5, 3.5], [6.5, 7.5]])
predictions = rf.predict(X_test)
print("Dự đoán của Random Forest cho X_test:", predictions)
```
