
# K-Means Clustering (Phân cụm K-Means)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

K-Means là một thuật toán phân cụm không giám sát phổ biến, được sử dụng để phân chia một tập hợp dữ liệu thành `k` nhóm (cụm) riêng biệt. Mục tiêu của thuật toán là tìm `k` tâm cụm sao cho tổng bình phương khoảng cách từ mỗi điểm dữ liệu đến tâm cụm gần nhất của nó là nhỏ nhất.

"Không giám sát" có nghĩa là thuật toán hoạt động trên dữ liệu không được gắn nhãn, cố gắng tìm các cấu trúc hoặc mẫu ẩn trong dữ liệu. K-Means là một thuật toán lặp, có nghĩa là nó tinh chỉnh các cụm của mình qua nhiều lần lặp cho đến khi đạt được sự hội tụ.

## Mã giả (Pseudocode)

```
function KMeans(X, k, max_iterations) is
    // Bước 1: Khởi tạo k tâm cụm ngẫu nhiên
    centroids := select k random data points from X

    for iter from 1 to max_iterations do
        // Bước 2: Gán mỗi điểm dữ liệu cho tâm cụm gần nhất
        clusters := empty list of k lists
        for each data_point in X do
            min_distance := infinity
            closest_centroid_index := -1
            for i from 1 to k do
                distance := euclidean_distance(data_point, centroids[i])
                if distance < min_distance then
                    min_distance := distance
                    closest_centroid_index := i
            add data_point to clusters[closest_centroid_index]

        // Bước 3: Cập nhật tâm cụm
        new_centroids := empty list of k points
        for i from 1 to k do
            new_centroids[i] := mean of all data_points in clusters[i]

        // Kiểm tra sự hội tụ
        if new_centroids are same as centroids then
            break
        centroids := new_centroids

    return centroids, clusters
```

## Hướng tiếp cận

Thuật toán K-Means hoạt động theo các bước lặp sau:

1.  **Khởi tạo tâm cụm:** Chọn `k` điểm dữ liệu ngẫu nhiên từ tập dữ liệu làm tâm cụm ban đầu. `k` là một tham số phải được xác định trước.
2.  **Gán cụm:** Gán mỗi điểm dữ liệu cho tâm cụm gần nhất của nó. Khoảng cách Euclidean thường được sử dụng để đo lường sự gần gũi.
3.  **Cập nhật tâm cụm:** Tính toán lại vị trí của mỗi tâm cụm bằng cách lấy trung bình của tất cả các điểm dữ liệu đã được gán cho cụm đó.
4.  **Lặp lại:** Lặp lại các bước 2 và 3 cho đến khi các tâm cụm không còn thay đổi đáng kể (hội tụ) hoặc đạt đến số lần lặp tối đa.

## Ứng dụng

*   **Phân khúc khách hàng:** Phân chia khách hàng thành các nhóm dựa trên hành vi mua hàng hoặc nhân khẩu học.
*   **Nén hình ảnh:** Giảm số lượng màu trong một hình ảnh bằng cách nhóm các pixel có màu tương tự lại với nhau.
*   **Phát hiện bất thường:** Xác định các điểm dữ liệu không phù hợp với các cụm chính.
*   **Phân loại tài liệu:** Nhóm các tài liệu tương tự lại với nhau dựa trên nội dung của chúng.

## Bài toán thực hành (LeetCode)

K-Means là một thuật toán phân cụm không giám sát phổ biến. Mặc dù LeetCode không có các bài toán trực tiếp yêu cầu triển khai K-Means, nhưng các bài toán liên quan đến phân nhóm, khoảng cách hoặc tối ưu hóa vị trí có thể giúp bạn củng cố kiến thức.

*   [296. Best Meeting Point](https://leetcode.com/problems/best-meeting-point/) (Liên quan đến việc tìm điểm trung tâm tối ưu)
*   [812. Largest Triangle Area](https://leetcode.com/problems/largest-triangle-area/) (Có thể liên quan đến việc nhóm các điểm)

## Triển khai (Python)

```python
import numpy as np

class KMeans:
    def __init__(self, k=3, max_iterations=100):
        self.k = k
        self.max_iterations = max_iterations
        self.centroids = None
        self.labels = None

    def _initialize_centroids(self, X):
        # Chọn ngẫu nhiên k điểm dữ liệu làm tâm cụm ban đầu
        random_indices = np.random.choice(X.shape[0], self.k, replace=False)
        self.centroids = X[random_indices]

    def _assign_clusters(self, X):
        # Gán mỗi điểm dữ liệu cho tâm cụm gần nhất
        # Tính khoảng cách từ mỗi điểm dữ liệu đến mỗi tâm cụm
        distances = np.sqrt(((X - self.centroids[:, np.newaxis])**2).sum(axis=2))
        # Gán mỗi điểm dữ liệu cho tâm cụm có khoảng cách nhỏ nhất
        self.labels = np.argmin(distances, axis=0)

    def _update_centroids(self, X):
        # Cập nhật tâm cụm bằng cách tính trung bình các điểm trong mỗi cụm
        new_centroids = np.zeros_like(self.centroids)
        for i in range(self.k):
            cluster_points = X[self.labels == i]
            if len(cluster_points) > 0:
                new_centroids[i] = np.mean(cluster_points, axis=0)
        self.centroids = new_centroids

    def fit(self, X):
        self._initialize_centroids(X)

        for _ in range(self.max_iterations):
            old_centroids = self.centroids.copy()
            self._assign_clusters(X)
            self._update_centroids(X)
            # Kiểm tra sự hội tụ
            if np.allclose(old_centroids, self.centroids):
                break

    def predict(self, X):
        # Sau khi fit, bạn có thể sử dụng predict để gán nhãn cụm cho các điểm mới
        # hoặc để lấy nhãn cho các điểm đã được fit
        self._assign_clusters(X)
        return self.labels

# Ví dụ sử dụng:
# Tạo dữ liệu giả
X = np.array([[1, 2], [1.5, 1.8], [5, 8], [8, 8], [1, 0.6], [9, 11]])

kmeans = KMeans(k=2)
kmeans.fit(X)

print("Tâm cụm cuối cùng:", kmeans.centroids)
print("Nhãn cụm cho mỗi điểm dữ liệu:", kmeans.labels)
```
