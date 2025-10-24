import java.util.Arrays;

public class logistic_regression {

    static class LogisticRegression {
        double learningRate;
        int nIterations;
        double[] weights;
        double bias;

        public LogisticRegression(double learningRate, int nIterations) {
            this.learningRate = learningRate;
            this.nIterations = nIterations;
        }

        private double sigmoid(double z) {
            return 1 / (1 + Math.exp(-z));
        }

        public void fit(double[][] X, int[] y) {
            int nSamples = X.length;
            int nFeatures = X[0].length;

            // Khởi tạo tham số
            weights = new double[nFeatures];
            bias = 0;

            // Gradient Descent
            for (int iter = 0; iter < nIterations; iter++) {
                double[] linearModel = new double[nSamples];
                for (int i = 0; i < nSamples; i++) {
                    linearModel[i] = bias;
                    for (int j = 0; j < nFeatures; j++) {
                        linearModel[i] += X[i][j] * weights[j];
                    }
                }
                double[] yPredicted = new double[nSamples];
                for (int i = 0; i < nSamples; i++) {
                    yPredicted[i] = sigmoid(linearModel[i]);
                }

                // Tính toán gradient
                double[] dw = new double[nFeatures];
                double db = 0;

                for (int i = 0; i < nSamples; i++) {
                    double error = yPredicted[i] - y[i];
                    for (int j = 0; j < nFeatures; j++) {
                        dw[j] += X[i][j] * error;
                    }
                    db += error;
                }

                for (int j = 0; j < nFeatures; j++) {
                    dw[j] /= nSamples;
                }
                db /= nSamples;

                // Cập nhật tham số
                for (int j = 0; j < nFeatures; j++) {
                    weights[j] -= learningRate * dw[j];
                }
                bias -= learningRate * db;
            }
        }

        public int[] predict(double[][] X) {
            int nSamples = X.length;
            int nFeatures = X[0].length;
            double[] linearModel = new double[nSamples];
            for (int i = 0; i < nSamples; i++) {
                linearModel[i] = bias;
                for (int j = 0; j < nFeatures; j++) {
                    linearModel[i] += X[i][j] * weights[j];
                }
            }
            double[] yPredicted = new double[nSamples];
            for (int i = 0; i < nSamples; i++) {
                yPredicted[i] = sigmoid(linearModel[i]);
            }

            int[] yPredictedCls = new int[nSamples];
            for (int i = 0; i < nSamples; i++) {
                yPredictedCls[i] = (yPredicted[i] > 0.5) ? 1 : 0;
            }
            return yPredictedCls;
        }
    }

    public static void main(String[] args) {
        // Ví dụ sử dụng:
        // Dữ liệu giả
        double[][] X = {
            {0.5}, {1.2}, {2.1}, {3.5}, {4.8}
        };
        int[] y = {0, 0, 1, 1, 1};

        LogisticRegression model = new LogisticRegression(0.01, 1000);
        model.fit(X, y);

        // Dự đoán
        double[][] X_test = {
            {0.2}, {2.5}, {5.0}
        };
        int[] predictions = model.predict(X_test);

        System.out.println("Trọng số: " + Arrays.toString(model.weights));
        System.out.println("Độ lệch: " + model.bias);
        System.out.println("Dự đoán cho X_test: " + Arrays.toString(predictions));
    }
}
