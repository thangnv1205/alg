class NeuralNetwork {
    constructor(inputSize, hiddenSize, outputSize, learningRate = 0.1) {
        this.inputSize = inputSize;
        this.hiddenSize = hiddenSize;
        this.outputSize = outputSize;
        this.learningRate = learningRate;

        // Khởi tạo trọng số và độ lệch
        this.weightsInputHidden = this._initializeMatrix(inputSize, hiddenSize);
        this.biasHidden = new Array(1).fill(0).map(() => new Array(hiddenSize).fill(0));
        this.weightsHiddenOutput = this._initializeMatrix(hiddenSize, outputSize);
        this.biasOutput = new Array(1).fill(0).map(() => new Array(outputSize).fill(0));
    }

    _initializeMatrix(rows, cols) {
        const matrix = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                matrix[i][j] = Math.random() * 0.01; // Khởi tạo ngẫu nhiên nhỏ
            }
        }
        return matrix;
    }

    _sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }

    _sigmoidDerivative(x) {
        return x * (1 - x);
    }

    _dot(a, b) {
        const aRows = a.length;
        const aCols = a[0].length;
        const bRows = b.length;
        const bCols = b[0].length;

        if (aCols !== bRows) {
            throw new Error("Kích thước ma trận không khớp để nhân.");
        }

        const result = new Array(aRows).fill(0).map(() => new Array(bCols).fill(0));

        for (let i = 0; i < aRows; i++) {
            for (let j = 0; j < bCols; j++) {
                for (let k = 0; k < aCols; k++) {
                    result[i][j] += a[i][k] * b[k][j];
                }
            }
        }
        return result;
    }

    _addBias(matrix, bias) {
        const result = new Array(matrix.length).fill(0).map(() => new Array(matrix[0].length).fill(0));
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[0].length; j++) {
                result[i][j] = matrix[i][j] + bias[0][j];
            }
        }
        return result;
    }

    _applyFunction(matrix, func) {
        const result = new Array(matrix.length).fill(0).map(() => new Array(matrix[0].length).fill(0));
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[0].length; j++) {
                result[i][j] = func(matrix[i][j]);
            }
        }
        return result;
    }

    _subtract(a, b) {
        const result = new Array(a.length).fill(0).map(() => new Array(a[0].length).fill(0));
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < a[0].length; j++) {
                result[i][j] = a[i][j] - b[i][j];
            }
        }
        return result;
    }

    _multiply(a, b) {
        const result = new Array(a.length).fill(0).map(() => new Array(a[0].length).fill(0));
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < a[0].length; j++) {
                result[i][j] = a[i][j] * b[i][j];
            }
        }
        return result;
    }

    _transpose(matrix) {
        const rows = matrix.length;
        const cols = matrix[0].length;
        const result = new Array(cols).fill(0).map(() => new Array(rows).fill(0));
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                result[j][i] = matrix[i][j];
            }
        }
        return result;
    }

    _sumColumns(matrix, scalar) {
        const result = new Array(1).fill(0).map(() => new Array(matrix[0].length).fill(0));
        for (let j = 0; j < matrix[0].length; j++) {
            for (let i = 0; i < matrix.length; i++) {
                result[0][j] += matrix[i][j];
            }
            result[0][j] *= scalar;
        }
        return result;
    }

    _add(a, b) {
        const result = new Array(a.length).fill(0).map(() => new Array(a[0].length).fill(0));
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < a[0].length; j++) {
                result[i][j] = a[i][j] + b[i][j];
            }
        }
        return result;
    }

    forward(X) {
        // Lớp ẩn
        this.hiddenLayerInput = this._addBias(this._dot(X, this.weightsInputHidden), this.biasHidden);
        this.hiddenLayerOutput = this._applyFunction(this.hiddenLayerInput, this._sigmoid);

        // Lớp đầu ra
        this.outputLayerInput = this._addBias(this._dot(this.hiddenLayerOutput, this.weightsHiddenOutput), this.biasOutput);
        this.output = this._applyFunction(this.outputLayerInput, this._sigmoid);
        return this.output;
    }

    backward(X, y, output) {
        const nSamples = X.length;

        // Tính toán sai số
        const error = this._subtract(y, output);

        // Gradient cho lớp đầu ra
        const dOutput = this._multiply(error, this._applyFunction(output, this._sigmoidDerivative));
        const errorHiddenLayer = this._dot(dOutput, this._transpose(this.weightsHiddenOutput));
        const dHiddenLayer = this._multiply(errorHiddenLayer, this._applyFunction(this.hiddenLayerOutput, this._sigmoidDerivative));

        // Cập nhật trọng số và độ lệch
        this.weightsHiddenOutput = this._add(this.weightsHiddenOutput, this._dot(this._transpose(this.hiddenLayerOutput), dOutput).map(row => row.map(val => val * this.learningRate)));
        this.biasOutput = this._add(this.biasOutput, this._sumColumns(dOutput, this.learningRate));
        this.weightsInputHidden = this._add(this.weightsInputHidden, this._dot(this._transpose(X), dHiddenLayer).map(row => row.map(val => val * this.learningRate)));
        this.biasHidden = this._add(this.biasHidden, this._sumColumns(dHiddenLayer, this.learningRate));
    }

    train(X, y, epochs) {
        for (let epoch = 0; epoch < epochs; epoch++) {
            const currentOutput = this.forward(X);
            this.backward(X, y, currentOutput);
        }
    }

    predict(X) {
        return this.forward(X);
    }
}

// Ví dụ sử dụng:
// Dữ liệu XOR
const X = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
];
const y = [
    [0],
    [1],
    [1],
    [0]
];

// Khởi tạo mạng nơ-ron
const inputSize = 2;
const hiddenSize = 4;
const outputSize = 1;
const learningRate = 0.1;
const epochs = 10000;

const nn = new NeuralNetwork(inputSize, hiddenSize, outputSize, learningRate);
nn.train(X, y, epochs);

console.log("Dự đoán sau khi huấn luyện:");
const predictions = nn.predict(X);
predictions.forEach(row => console.log(row.map(val => Math.round(val))));
