class LogisticRegression {
    constructor(learningRate = 0.01, nIterations = 1000) {
        this.learningRate = learningRate;
        this.nIterations = nIterations;
        this.weights = null;
        this.bias = null;
    }

    _sigmoid(z) {
        return 1 / (1 + Math.exp(-z));
    }

    fit(X, y) {
        const nSamples = X.length;
        const nFeatures = X[0].length;

        // Khởi tạo tham số
        this.weights = new Array(nFeatures).fill(0);
        this.bias = 0;

        // Gradient Descent
        for (let iter = 0; iter < this.nIterations; iter++) {
            const linearModel = new Array(nSamples);
            for (let i = 0; i < nSamples; i++) {
                linearModel[i] = this.bias;
                for (let j = 0; j < nFeatures; j++) {
                    linearModel[i] += X[i][j] * this.weights[j];
                }
            }
            const yPredicted = new Array(nSamples);
            for (let i = 0; i < nSamples; i++) {
                yPredicted[i] = this._sigmoid(linearModel[i]);
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
        const linearModel = new Array(nSamples);
        for (let i = 0; i < nSamples; i++) {
            linearModel[i] = this.bias;
            for (let j = 0; j < nFeatures; j++) {
                linearModel[i] += X[i][j] * this.weights[j];
            }
        }
        const yPredicted = new Array(nSamples);
        for (let i = 0; i < nSamples; i++) {
            yPredicted[i] = this._sigmoid(linearModel[i]);
        }

        const yPredictedCls = new Array(nSamples);
        for (let i = 0; i < nSamples; i++) {
            yPredictedCls[i] = (yPredicted[i] > 0.5) ? 1 : 0;
        }
        return yPredictedCls;
    }
}

// Ví dụ sử dụng:
// Dữ liệu giả
const X = [
    [0.5],
    [1.2],
    [2.1],
    [3.5],
    [4.8]
];
const y = [0, 0, 1, 1, 1];

const model = new LogisticRegression();
model.fit(X, y);

// Dự đoán
const X_test = [
    [0.2],
    [2.5],
    [5.0]
];
const predictions = model.predict(X_test);

console.log("Trọng số:", model.weights);
console.log("Độ lệch:", model.bias);
console.log("Dự đoán cho X_test:", predictions);
