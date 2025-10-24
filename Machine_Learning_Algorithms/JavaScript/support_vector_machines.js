class SVM {
    constructor(learningRate = 0.001, lambdaParam = 0.01, nIterations = 1000) {
        this.learningRate = learningRate;
        this.lambdaParam = lambdaParam;
        this.nIterations = nIterations;
        this.weights = null;
        this.bias = null;
    }

    fit(X, y) {
        const nSamples = X.length;
        const nFeatures = X[0].length;

        // Chuyển đổi nhãn y thành -1 và 1
        const y_ = y.map(val => (val <= 0 ? -1 : 1));

        // Khởi tạo trọng số và độ lệch
        this.weights = new Array(nFeatures).fill(0);
        this.bias = 0;

        // Gradient Descent
        for (let iter = 0; iter < this.nIterations; iter++) {
            for (let idx = 0; idx < nSamples; idx++) {
                const x_i = X[idx];
                const y_i = y_[idx];

                let dotProduct = 0;
                for (let j = 0; j < nFeatures; j++) {
                    dotProduct += x_i[j] * this.weights[j];
                }

                const condition = y_i * (dotProduct - this.bias) >= 1;

                if (condition) {
                    for (let j = 0; j < nFeatures; j++) {
                        this.weights[j] -= this.learningRate * (2 * this.lambdaParam * this.weights[j]);
                    }
                } else {
                    for (let j = 0; j < nFeatures; j++) {
                        this.weights[j] -= this.learningRate * (2 * this.lambdaParam * this.weights[j] - x_i[j] * y_i);
                    }
                    this.bias -= this.learningRate * y_i;
                }
            }
        }
    }

    predict(X) {
        const nSamples = X.length;
        const nFeatures = X[0].length;
        const predictions = new Array(nSamples);

        for (let i = 0; i < nSamples; i++) {
            let dotProduct = 0;
            for (let j = 0; j < nFeatures; j++) {
                dotProduct += X[i][j] * this.weights[j];
            }
            const approx = dotProduct - this.bias;
            predictions[i] = Math.sign(approx);
        }
        return predictions;
    }
}

// Ví dụ sử dụng:
// Dữ liệu giả
const X = [
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 7]
];
const y = [0, 0, 0, 1, 1, 1];

const svm = new SVM();
svm.fit(X, y);

const X_test = [
    [1.5, 2.5],
    [5.5, 6.5]
];
const predictions = svm.predict(X_test);
console.log("Dự đoán của SVM cho X_test:", predictions);
