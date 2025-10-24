class LinearRegression {
    constructor(learningRate = 0.01, nIterations = 1000) {
        this.learningRate = learningRate;
        this.nIterations = nIterations;
        this.weights = null;
        this.bias = null;
    }

    fit(X, y) {
        const nSamples = X.length;
        const nFeatures = X[0].length;

        // Khởi tạo tham số
        this.weights = new Array(nFeatures).fill(0);
        this.bias = 0;

        // Gradient Descent
        for (let iter = 0; iter < this.nIterations; iter++) {
            const yPredicted = new Array(nSamples);
            for (let i = 0; i < nSamples; i++) {
                yPredicted[i] = this.bias;
                for (let j = 0; j < nFeatures; j++) {
                    yPredicted[i] += X[i][j] * this.weights[j];
                }
            }

            // Tính toán gradient
            const dw = new Array(nFeatures).fill(0);
            let db = 0;

            for (let i = 0; i < nSamples; i++) {
                const error = yPredicted[i] - y[i];
                for (let j = 0; j < nFeatures; j++) {
                    dw[j] += X[i][j] * error;
                }
                db += error;
            }

            for (let j = 0; j < nFeatures; j++) {
                dw[j] /= nSamples;
            }
            db /= nSamples;

            // Cập nhật tham số
            for (let j = 0; j < nFeatures; j++) {
                this.weights[j] -= this.learningRate * dw[j];
            }
            this.bias -= this.learningRate * db;
        }
    }

    predict(X) {
        const nSamples = X.length;
        const nFeatures = X[0].length;
        const yPredicted = new Array(nSamples);

        for (let i = 0; i < nSamples; i++) {
            yPredicted[i] = this.bias;
            for (let j = 0; j < nFeatures; j++) {
                yPredicted[i] += X[i][j] * this.weights[j];
            }
        }
        return yPredicted;
    }
}

// Ví dụ sử dụng:
// Dữ liệu giả
const X = [
    [1],
    [2],
    [3],
    [4],
    [5]
];
const y = [2, 4, 5, 4, 5];

const model = new LinearRegression();
model.fit(X, y);

// Dự đoán
const X_test = [
    [6],
    [7]
];
const predictions = model.predict(X_test);

console.log("Trọng số:", model.weights);
console.log("Độ lệch:", model.bias);
console.log("Dự đoán cho X_test:", predictions);
