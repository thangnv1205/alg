import java.util.Random;

public class simulated_annealing {

    // Hàm mục tiêu (ví dụ: tìm giá trị x tối thiểu hóa x^2 - 4x + 4)
    // Giá trị tối thiểu là 0 tại x = 2
    private static double objectiveFunction(double x) {
        return Math.pow(x, 2) - 4 * x + 4;
    }

    public static Object[] simulatedAnnealing(double initialSolution, double initialTemperature, double coolingRate, double minTemperature) {
        double currentSolution = initialSolution;
        double bestSolution = currentSolution;
        double bestCost = objectiveFunction(bestSolution);

        double temperature = initialTemperature;
        Random random = new Random();

        while (temperature > minTemperature) {
            // Tạo một giải pháp lân cận
            // Đối với ví dụ đơn giản này, chúng ta sẽ thêm một nhiễu nhỏ
            // Phạm vi nhiễu có thể phụ thuộc vào nhiệt độ
            double neighborSolution = currentSolution + (random.nextDouble() * 2 - 1) * temperature * 0.1; // random.nextDouble() * 2 - 1 tạo số trong [-1, 1]

            double currentCost = objectiveFunction(currentSolution);
            double neighborCost = objectiveFunction(neighborSolution);

            // Quyết định chấp nhận giải pháp lân cận
            if (neighborCost < currentCost) {
                currentSolution = neighborSolution;
            } else {
                // Chấp nhận giải pháp tồi hơn với một xác suất
                double acceptanceProbability = Math.exp((currentCost - neighborCost) / temperature);
                if (random.nextDouble() < acceptanceProbability) {
                    currentSolution = neighborSolution;
                }
            }

            // Cập nhật giải pháp tốt nhất
            if (objectiveFunction(currentSolution) < bestCost) {
                bestSolution = currentSolution;
                bestCost = objectiveFunction(bestSolution);
            }

            // Giảm nhiệt độ
            temperature *= coolingRate;
        }

        return new Object[]{bestSolution, bestCost};
    }

    public static void main(String[] args) {
        // Ví dụ sử dụng:
        Random random = new Random();
        double initialSolution = random.nextDouble() * 20 - 10; // Bắt đầu từ một điểm ngẫu nhiên trong [-10, 10]
        double initialTemperature = 100.0;
        double coolingRate = 0.95;
        double minTemperature = 0.01;

        Object[] result = simulatedAnnealing(initialSolution, initialTemperature, coolingRate, minTemperature);
        double bestX = (double) result[0];
        double minVal = (double) result[1];

        System.out.println("Giá trị x tốt nhất được tìm thấy: " + bestX);
        System.out.println("Giá trị hàm mục tiêu tối thiểu: " + minVal);
    }
}
