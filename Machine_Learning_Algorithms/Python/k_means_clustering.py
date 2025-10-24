
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
        distances = np.sqrt(((X - self.centroids[:, np.newaxis])**2).sum(axis=2))
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
            if np.allclose(old_centroids, self.centroids):
                break

    def predict(self, X):
        self._assign_clusters(X)
        return self.labels
