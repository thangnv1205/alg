
# Cây quyết định (Decision Trees)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Cây quyết định là một thuật toán học máy không tham số, có giám sát, được sử dụng cho cả bài toán phân loại và hồi quy. Mục tiêu là tạo ra một mô hình dự đoán giá trị của một biến mục tiêu bằng cách học các quy tắc quyết định đơn giản được suy ra từ các đặc trưng dữ liệu.

Cấu trúc của cây quyết định giống như một cây lưu đồ, nơi mỗi nút bên trong đại diện cho một "kiểm tra" trên một thuộc tính (ví dụ: liệu một đồng xu có phải là đầu hay không), mỗi nhánh đại diện cho kết quả của kiểm tra và mỗi nút lá (hoặc nút cuối) đại diện cho một nhãn lớp (hoặc giá trị số trong hồi quy).

## Mã giả (Pseudocode) - ID3 Algorithm

```
function ID3(examples, target_attribute, attributes) is
    create a root node for the tree

    if all examples are positive then
        return a leaf node with label = positive
    if all examples are negative then
        return a leaf node with label = negative
    if attributes is empty then
        return a leaf node with label = most common value of target_attribute in examples

    best_attribute := attribute from attributes that best classifies examples
    root.attribute := best_attribute

    for each possible value v of best_attribute do
        add a new tree branch below root, corresponding to the test best_attribute = v
        examples_v := subset of examples where best_attribute = v
        if examples_v is empty then
            add a leaf node with label = most common value of target_attribute in examples
        else
            add the subtree ID3(examples_v, target_attribute, attributes - {best_attribute}) below this branch

    return root
```

## Hướng tiếp cận

Việc xây dựng cây quyết định thường liên quan đến một cách tiếp cận đệ quy, chia để trị:

1.  **Chọn thuộc tính tốt nhất:** Tại mỗi nút, thuật toán chọn thuộc tính tốt nhất để phân chia dữ liệu. "Tốt nhất" thường được xác định bằng các số liệu như **độ lợi thông tin (Information Gain)** hoặc **chỉ số Gini (Gini Impurity)**, đo lường mức độ thuần khiết của các tập con được tạo ra sau khi phân chia.
2.  **Phân chia dữ liệu:** Dữ liệu được phân chia thành các tập con dựa trên các giá trị của thuộc tính đã chọn.
3.  **Đệ quy:** Quá trình được lặp lại đệ quy cho mỗi tập con cho đến khi một trong các điều kiện dừng sau được đáp ứng:
    *   Tất cả các ví dụ trong một nút thuộc cùng một lớp.
    *   Không còn thuộc tính nào để phân chia.
    *   Độ sâu tối đa của cây đã đạt được.
    *   Số lượng mẫu trong một nút nhỏ hơn ngưỡng tối thiểu.
4.  **Tạo nút lá:** Khi một điều kiện dừng được đáp ứng, nút hiện tại trở thành nút lá và được gán nhãn lớp phổ biến nhất trong các mẫu của nó.

## Ứng dụng

*   **Chẩn đoán y tế:** Dự đoán bệnh dựa trên các triệu chứng của bệnh nhân.
*   **Phân loại khách hàng:** Phân loại khách hàng thành các nhóm khác nhau (ví dụ: khách hàng có nguy cơ cao/thấp).
*   **Phát hiện gian lận:** Xác định các giao dịch gian lận trong tài chính.
*   **Hệ thống khuyến nghị:** Đề xuất sản phẩm hoặc dịch vụ cho người dùng.

## Bài toán thực hành (LeetCode)

Cây quyết định là một thuật toán phân loại và hồi quy mạnh mẽ. Mặc dù LeetCode không có các bài toán trực tiếp yêu cầu triển khai cây quyết định từ đầu, nhưng các bài toán liên quan đến phân loại, tìm kiếm quy tắc hoặc cấu trúc cây có thể giúp bạn củng cố kiến thức.

*   [105. Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) (Liên quan đến cấu trúc cây)
*   [106. Construct Binary Tree from Inorder and Postorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/) (Liên quan đến cấu trúc cây)

## Triển khai (Python)

```python
import numpy as np
from collections import Counter

class Node:
    def __init__(self, feature_index=None, threshold=None, left=None, right=None, value=None):
        self.feature_index = feature_index  # Chỉ số của tính năng để phân tách
        self.threshold = threshold          # Ngưỡng để phân tách
        self.left = left                    # Cây con bên trái
        self.right = right                  # Cây con bên phải
        self.value = value                  # Giá trị của nút lá (lớp dự đoán)

class DecisionTree:
    def __init__(self, min_samples_split=2, max_depth=100, n_features=None):
        self.min_samples_split = min_samples_split
        self.max_depth = max_depth
        self.n_features = n_features
        self.root = None

    def _is_finished(self, depth):
        if depth >= self.max_depth or self.n_features is None or self.min_samples_split is None:
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

        # Điều kiện dừng
        if self._is_finished(depth) or n_labels == 1 or n_samples < self.min_samples_split:
            leaf_value = self._most_common_label(y)
            return Node(value=leaf_value)

        feat_idxs = np.random.choice(n_features, self.n_features, replace=False)

        best_feature, best_threshold = self._best_split(X, y, feat_idxs)

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

# Ví dụ sử dụng:
# Dữ liệu giả
X = np.array([[2, 3], [3, 4], [4, 5], [5, 6], [1, 2], [2, 2], [6, 7], [7, 8]])
y = np.array([0, 0, 0, 0, 1, 1, 1, 1])

model = DecisionTree(max_depth=5)
model.fit(X, y)

X_test = np.array([[2.5, 3.5], [6.5, 7.5]])
predictions = model.predict(X_test)
print("Dự đoán cho X_test:", predictions)
```
