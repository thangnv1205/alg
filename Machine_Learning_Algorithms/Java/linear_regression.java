import java.util.Arrays;

public class linear_regression {

    static class LinearRegression {
        double learningRate;
        int nIterations;
        double[] weights;
        double bias;

        public LinearRegression(double learningRate, int nIterations) {
            this.learningRate = learningRate;
            this.nIterations = nIterations;
        }

        public void fit(double[][] X, double[] y) {
            int nSamples = X.length;
            int nFeatures = X[0].length;

            // Khởi tạo tham số
            weights = new double[nFeatures];
            bias = 0;

            // Gradient Descent
            for (int iter = 0; iter < nIterations; iter++) {
                double[] yPredicted = new double[nSamples];
                for (int i = 0; i < nSamples; i++) {
                    yPredicted[i] = bias;
                    for (int j = 0; j < nFeatures; j++) {
                        yPredicted[i] += X[i][j] * weights[j];
                    }
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

        public double[] predict(double[][] X) {
            int nSamples = X.length;
            int nFeatures = X[0].length;
            double[] yPredicted = new double[nSamples];

            for (int i = 0; i < nSamples; i++) {
                yPredicted[i] = bias;
                for (int j = 0; j < nFeatures; j++) {
                    yPredicted[i] += X[i][j] * weights[j];
                }
            }
            return yPredicted;
        }
    }

    public static void main(String[] args) {
        // Ví dụ sử dụng:
        // Dữ liệu giả
        double[][] X = {
            {1}, {2}, {3}, {4}, {5}
        };
        double[] y = {2, 4, 5, 4, 5};

        LinearRegression model = new LinearRegression(0.01, 1000);
        model.fit(X, y);

        // Dự đoán
        double[][] X_test = {
            {6}, {7}
        };
        double[] predictions = model.predict(X_test);

        System.out.println("Trọng số: " + Arrays.toString(model.weights));
        System.out.println("Độ lệch: " + model.bias);
        System.out.println("Dự đoán cho X_test: " + Arrays.toString(predictions));
    }
}
