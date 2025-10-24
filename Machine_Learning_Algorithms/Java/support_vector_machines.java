import java.util.Arrays;

public class support_vector_machines {

    static class SVM {
        double learningRate;
        double lambdaParam;
        int nIterations;
        double[] weights;
        double bias;

        public SVM(double learningRate, double lambdaParam, int nIterations) {
            this.learningRate = learningRate;
            this.lambdaParam = lambdaParam;
            this.nIterations = nIterations;
        }

        public void fit(double[][] X, int[] y) {
            int nSamples = X.length;
            int nFeatures = X[0].length;

            // Chuyển đổi nhãn y thành -1 và 1
            int[] y_ = new int[nSamples];
            for (int i = 0; i < nSamples; i++) {
                y_[i] = (y[i] <= 0) ? -1 : 1;
            }

            // Khởi tạo trọng số và độ lệch
            weights = new double[nFeatures];
            bias = 0;

            // Gradient Descent
            for (int iter = 0; iter < nIterations; iter++) {
                for (int idx = 0; idx < nSamples; idx++) {
                    double[] x_i = X[idx];
                    int y_i = y_[idx];

                    double dotProduct = 0;
                    for (int j = 0; j < nFeatures; j++) {
                        dotProduct += x_i[j] * weights[j];
                    }

                    boolean condition = y_i * (dotProduct - bias) >= 1;

                    if (condition) {
                        for (int j = 0; j < nFeatures; j++) {
                            weights[j] -= learningRate * (2 * lambdaParam * weights[j]);
                        }
                    } else {
                        for (int j = 0; j < nFeatures; j++) {
                            weights[j] -= learningRate * (2 * lambdaParam * weights[j] - x_i[j] * y_i);
                        }
                        bias -= learningRate * y_i;
                    }
                }
            }
        }

        public int[] predict(double[][] X) {
            int nSamples = X.length;
            int nFeatures = X[0].length;
            int[] predictions = new int[nSamples];

            for (int i = 0; i < nSamples; i++) {
                double dotProduct = 0;
                for (int j = 0; j < nFeatures; j++) {
                    dotProduct += X[i][j] * weights[j];
                }
                double approx = dotProduct - bias;
                predictions[i] = (int) Math.signum(approx);
            }
            return predictions;
        }
    }

    public static void main(String[] args) {
        // Ví dụ sử dụng:
        // Dữ liệu giả
        double[][] X = {
            {1, 2}, {2, 3}, {3, 4}, {4, 5}, {5, 6}, {6, 7}
        };
        int[] y = {0, 0, 0, 1, 1, 1};

        SVM svm = new SVM(0.001, 0.01, 1000);
        svm.fit(X, y);

        double[][] X_test = {
            {1.5, 2.5}, {5.5, 6.5}
        };
        int[] predictions = svm.predict(X_test);
        System.out.println("Dự đoán của SVM cho X_test: " + Arrays.toString(predictions));
    }
}
