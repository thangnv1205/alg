import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

public class k_means_clustering {

    static class KMeans {
        int k;
        int maxIterations;
        double[][] centroids;
        int[] labels;
        Random random;

        public KMeans(int k, int maxIterations) {
            this.k = k;
            this.maxIterations = maxIterations;
            this.random = new Random();
        }

        private void initializeCentroids(double[][] X) {
            // Chọn ngẫu nhiên k điểm dữ liệu làm tâm cụm ban đầu
            int nSamples = X.length;
            centroids = new double[k][X[0].length];
            List<Integer> chosenIndices = new ArrayList<>();

            for (int i = 0; i < k; i++) {
                int randomIndex;
                do {
                    randomIndex = random.nextInt(nSamples);
                } while (chosenIndices.contains(randomIndex));
                chosenIndices.add(randomIndex);
                centroids[i] = Arrays.copyOf(X[randomIndex], X[randomIndex].length);
            }
        }

        private void assignClusters(double[][] X) {
            // Gán mỗi điểm dữ liệu cho tâm cụm gần nhất
            labels = new int[X.length];
            for (int i = 0; i < X.length; i++) {
                double minDistance = Double.MAX_VALUE;
                int closestCentroidIndex = -1;
                for (int j = 0; j < k; j++) {
                    double distance = euclideanDistance(X[i], centroids[j]);
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestCentroidIndex = j;
                    }
                }
                labels[i] = closestCentroidIndex;
            }
        }

        private void updateCentroids(double[][] X) {
            // Cập nhật tâm cụm bằng cách tính trung bình các điểm trong mỗi cụm
            double[][] newCentroids = new double[k][X[0].length];
            int[] clusterCounts = new int[k];

            for (int i = 0; i < X.length; i++) {
                int clusterIndex = labels[i];
                for (int j = 0; j < X[0].length; j++) {
                    newCentroids[clusterIndex][j] += X[i][j];
                }
                clusterCounts[clusterIndex]++;
            }

            for (int i = 0; i < k; i++) {
                if (clusterCounts[i] > 0) {
                    for (int j = 0; j < X[0].length; j++) {
                        newCentroids[i][j] /= clusterCounts[i];
                    }
                } else {
                    // Nếu một cụm trống, khởi tạo lại tâm cụm ngẫu nhiên
                    int randomIndex = random.nextInt(X.length);
                    newCentroids[i] = Arrays.copyOf(X[randomIndex], X[randomIndex].length);
                }
            }
            centroids = newCentroids;
        }

        private double euclideanDistance(double[] p1, double[] p2) {
            double sum = 0;
            for (int i = 0; i < p1.length; i++) {
                sum += Math.pow(p1[i] - p2[i], 2);
            }
            return Math.sqrt(sum);
        }

        public void fit(double[][] X) {
            initializeCentroids(X);

            for (int iter = 0; iter < maxIterations; iter++) {
                double[][] oldCentroids = Arrays.stream(centroids).map(double[]::clone).toArray(double[][]::new);
                assignClusters(X);
                updateCentroids(X);

                // Kiểm tra sự hội tụ
                boolean converged = true;
                for (int i = 0; i < k; i++) {
                    if (euclideanDistance(oldCentroids[i], centroids[i]) > 1e-6) { // Sử dụng ngưỡng nhỏ để so sánh số thực
                        converged = false;
                        break;
                    }
                }
                if (converged) {
                    break;
                }
            }
        }

        public int[] predict(double[][] X) {
            assignClusters(X);
            return labels;
        }
    }

    public static void main(String[] args) {
        // Ví dụ sử dụng:
        // Tạo dữ liệu giả
        double[][] X = {
            {1, 2}, {1.5, 1.8}, {5, 8}, {8, 8}, {1, 0.6}, {9, 11}
        };

        KMeans kmeans = new KMeans(2, 100);
        kmeans.fit(X);

        System.out.println("Tâm cụm cuối cùng:");
        for (double[] centroid : kmeans.centroids) {
            System.out.println(Arrays.toString(centroid));
        }
        System.out.println("Nhãn cụm cho mỗi điểm dữ liệu: " + Arrays.toString(kmeans.labels));
    }
}
