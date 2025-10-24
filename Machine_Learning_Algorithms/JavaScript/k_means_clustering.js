class KMeans {
    constructor(k = 3, maxIterations = 100) {
        this.k = k;
        this.maxIterations = maxIterations;
        this.centroids = null;
        this.labels = null;
    }

    _initializeCentroids(X) {
        // Chọn ngẫu nhiên k điểm dữ liệu làm tâm cụm ban đầu
        const nSamples = X.length;
        this.centroids = new Array(this.k).fill(0).map(() => new Array(X[0].length).fill(0));
        const chosenIndices = new Set();

        for (let i = 0; i < this.k; i++) {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * nSamples);
            } while (chosenIndices.has(randomIndex));
            chosenIndices.add(randomIndex);
            this.centroids[i] = [...X[randomIndex]];
        }
    }

    _assignClusters(X) {
        // Gán mỗi điểm dữ liệu cho tâm cụm gần nhất
        this.labels = new Array(X.length);
        for (let i = 0; i < X.length; i++) {
            let minDistance = Infinity;
            let closestCentroidIndex = -1;
            for (let j = 0; j < this.k; j++) {
                const distance = this._euclideanDistance(X[i], this.centroids[j]);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestCentroidIndex = j;
                }
            }
            this.labels[i] = closestCentroidIndex;
        }
    }

    _updateCentroids(X) {
        // Cập nhật tâm cụm bằng cách tính trung bình các điểm trong mỗi cụm
        const newCentroids = new Array(this.k).fill(0).map(() => new Array(X[0].length).fill(0));
        const clusterCounts = new Array(this.k).fill(0);

        for (let i = 0; i < X.length; i++) {
            const clusterIndex = this.labels[i];
            for (let j = 0; j < X[0].length; j++) {
                newCentroids[clusterIndex][j] += X[i][j];
            }
            clusterCounts[clusterIndex]++;
        }

        for (let i = 0; i < this.k; i++) {
            if (clusterCounts[i] > 0) {
                for (let j = 0; j < X[0].length; j++) {
                    newCentroids[i][j] /= clusterCounts[i];
                }
            } else {
                // Nếu một cụm trống, khởi tạo lại tâm cụm ngẫu nhiên
                const randomIndex = Math.floor(Math.random() * X.length);
                newCentroids[i] = [...X[randomIndex]];
            }
        }
        this.centroids = newCentroids;
    }

    _euclideanDistance(p1, p2) {
        let sum = 0;
        for (let i = 0; i < p1.length; i++) {
            sum += Math.pow(p1[i] - p2[i], 2);
        }
        return Math.sqrt(sum);
    }

    fit(X) {
        this._initializeCentroids(X);

        for (let iter = 0; iter < this.maxIterations; iter++) {
            const oldCentroids = JSON.parse(JSON.stringify(this.centroids)); // Deep copy
            this._assignClusters(X);
            this._updateCentroids(X);

            // Kiểm tra sự hội tụ
            let converged = true;
            for (let i = 0; i < this.k; i++) {
                if (this._euclideanDistance(oldCentroids[i], this.centroids[i]) > 1e-6) {
                    converged = false;
                    break;
                }
            }
            if (converged) {
                break;
            }
        }
    }

    predict(X) {
        this._assignClusters(X);
        return this.labels;
    }
}

// Ví dụ sử dụng:
// Tạo dữ liệu giả
const X = [
    [1, 2],
    [1.5, 1.8],
    [5, 8],
    [8, 8],
    [1, 0.6],
    [9, 11]
];

const kmeans = new KMeans(2, 100);
kmeans.fit(X);

console.log("Tâm cụm cuối cùng:", kmeans.centroids);
console.log("Nhãn cụm cho mỗi điểm dữ liệu:", kmeans.labels);
