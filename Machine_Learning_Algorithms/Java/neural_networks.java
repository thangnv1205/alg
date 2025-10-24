import java.util.Arrays;
import java.util.Random;

public class neural_networks {

    static class NeuralNetwork {
        int inputSize;
        int hiddenSize;
        int outputSize;
        double learningRate;

        double[][] weightsInputHidden;
        double[][] biasHidden;
        double[][] weightsHiddenOutput;
        double[][] biasOutput;

        double[][] hiddenLayerInput;
        double[][] hiddenLayerOutput;
        double[][] outputLayerInput;
        double[][] output;

        Random random;

        public NeuralNetwork(int inputSize, int hiddenSize, int outputSize, double learningRate) {
            this.inputSize = inputSize;
            this.hiddenSize = hiddenSize;
            this.outputSize = outputSize;
            this.learningRate = learningRate;
            this.random = new Random();

            // Khởi tạo trọng số và độ lệch
            weightsInputHidden = new double[inputSize][hiddenSize];
            biasHidden = new double[1][hiddenSize];
            weightsHiddenOutput = new double[hiddenSize][outputSize];
            biasOutput = new double[1][outputSize];

            initializeWeights(weightsInputHidden);
            initializeWeights(weightsHiddenOutput);
        }

        private void initializeWeights(double[][] matrix) {
            for (int i = 0; i < matrix.length; i++) {
                for (int j = 0; j < matrix[0].length; j++) {
                    matrix[i][j] = random.nextGaussian() * 0.01; // Khởi tạo ngẫu nhiên nhỏ
                }
            }
        }

        private double sigmoid(double x) {
            return 1 / (1 + Math.exp(-x));
        }

        private double sigmoidDerivative(double x) {
            return x * (1 - x);
        }

        public double[][] forward(double[][] X) {
            // Lớp ẩn
            hiddenLayerInput = multiply(X, weightsInputHidden);
            addBias(hiddenLayerInput, biasHidden);
            hiddenLayerOutput = applySigmoid(hiddenLayerInput);

            // Lớp đầu ra
            outputLayerInput = multiply(hiddenLayerOutput, weightsHiddenOutput);
            addBias(outputLayerInput, biasOutput);
            output = applySigmoid(outputLayerInput);
            return output;
        }

        public void backward(double[][] X, double[][] y, double[][] output) {
            // Tính toán sai số
            double[][] error = subtract(y, output);

            // Gradient cho lớp đầu ra
            double[][] dOutput = multiply(error, applySigmoidDerivative(output));
            double[][] errorHiddenLayer = multiply(dOutput, transpose(weightsHiddenOutput));
            double[][] dHiddenLayer = multiply(errorHiddenLayer, applySigmoidDerivative(hiddenLayerOutput));

            // Cập nhật trọng số và độ lệch
            weightsHiddenOutput = add(weightsHiddenOutput, multiply(transpose(hiddenLayerOutput), dOutput, learningRate));
            biasOutput = add(biasOutput, sumColumns(dOutput, learningRate));
            weightsInputHidden = add(weightsInputHidden, multiply(transpose(X), dHiddenLayer, learningRate));
            biasHidden = add(biasHidden, sumColumns(dHiddenLayer, learningRate));
        }

        public void train(double[][] X, double[][] y, int epochs) {
            for (int epoch = 0; epoch < epochs; epoch++) {
                double[][] currentOutput = forward(X);
                backward(X, y, currentOutput);
            }
        }

        public double[][] predict(double[][] X) {
            return forward(X);
        }

        // Các hàm tiện ích cho ma trận
        private double[][] multiply(double[][] a, double[][] b) {
            int r1 = a.length;
            int c1 = a[0].length;
            int r2 = b.length;
            int c2 = b[0].length;
            if (c1 != r2) {
                throw new IllegalArgumentException("Kích thước ma trận không khớp để nhân.");
            }
            double[][] result = new double[r1][c2];
            for (int i = 0; i < r1; i++) {
                for (int j = 0; j < c2; j++) {
                    for (int k = 0; k < c1; k++) {
                        result[i][j] += a[i][k] * b[k][j];
                    }
                }
            }
            return result;
        }

        private double[][] multiply(double[][] a, double[][] b, double scalar) {
            double[][] result = new double[a.length][a[0].length];
            for (int i = 0; i < a.length; i++) {
                for (int j = 0; j < a[0].length; j++) {
                    result[i][j] = a[i][j] * b[i][j] * scalar;
                }
            }
            return result;
        }

        private double[][] multiply(double[][] a, double scalar) {
            double[][] result = new double[a.length][a[0].length];
            for (int i = 0; i < a.length; i++) {
                for (int j = 0; j < a[0].length; j++) {
                    result[i][j] = a[i][j] * scalar;
                }
            }
            return result;
        }

        private void addBias(double[][] matrix, double[][] bias) {
            for (int i = 0; i < matrix.length; i++) {
                for (int j = 0; j < matrix[0].length; j++) {
                    matrix[i][j] += bias[0][j];
                }
            }
        }

        private double[][] applySigmoid(double[][] matrix) {
            double[][] result = new double[matrix.length][matrix[0].length];
            for (int i = 0; i < matrix.length; i++) {
                for (int j = 0; j < matrix[0].length; j++) {
                    result[i][j] = sigmoid(matrix[i][j]);
                }
            }
            return result;
        }

        private double[][] applySigmoidDerivative(double[][] matrix) {
            double[][] result = new double[matrix.length][matrix[0].length];
            for (int i = 0; i < matrix.length; i++) {
                for (int j = 0; j < matrix[0].length; j++) {
                    result[i][j] = sigmoidDerivative(matrix[i][j]);
                }
            }
            return result;
        }

        private double[][] subtract(double[][] a, double[][] b) {
            double[][] result = new double[a.length][a[0].length];
            for (int i = 0; i < a.length; i++) {
                for (int j = 0; j < a[0].length; j++) {
                    result[i][j] = a[i][j] - b[i][j];
                }
            }
            return result;
        }

        private double[][] add(double[][] a, double[][] b) {
            double[][] result = new double[a.length][a[0].length];
            for (int i = 0; i < a.length; i++) {
                for (int j = 0; j < a[0].length; j++) {
                    result[i][j] = a[i][j] + b[i][j];
                }
            }
            return result;
        }

        private double[][] transpose(double[][] matrix) {
            double[][] result = new double[matrix[0].length][matrix.length];
            for (int i = 0; i < matrix.length; i++) {
                for (int j = 0; j < matrix[0].length; j++) {
                    result[j][i] = matrix[i][j];
                }
            }
            return result;
        }

        private double[][] sumColumns(double[][] matrix, double scalar) {
            double[][] result = new double[1][matrix[0].length];
            for (int j = 0; j < matrix[0].length; j++) {
                for (int i = 0; i < matrix.length; i++) {
                    result[0][j] += matrix[i][j];
                }
                result[0][j] *= scalar;
            }
            return result;
        }
    }

    public static void main(String[] args) {
        // Ví dụ sử dụng:
        // Dữ liệu XOR
        double[][] X = {
            {0, 0}, {0, 1}, {1, 0}, {1, 1}
        };
        double[][] y = {
            {0}, {1}, {1}, {0}
        };

        // Khởi tạo mạng nơ-ron
        int inputSize = 2;
        int hiddenSize = 4;
        int outputSize = 1;
        double learningRate = 0.1;
        int epochs = 10000;

        NeuralNetwork nn = new NeuralNetwork(inputSize, hiddenSize, outputSize, learningRate);
        nn.train(X, y, epochs);

        System.out.println("Dự đoán sau khi huấn luyện:");
        double[][] predictions = nn.predict(X);
        for (double[] row : predictions) {
            System.out.println(Arrays.toString(row));
        }
    }
}
