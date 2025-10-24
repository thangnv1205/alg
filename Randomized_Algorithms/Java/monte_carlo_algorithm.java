import java.util.Random;

public class monte_carlo_algorithm {

    public static double monteCarloPiEstimation(int numPoints) {
        int insideCircle = 0;
        Random random = new Random();

        for (int i = 0; i < numPoints; i++) {
            double x = random.nextDouble(); // Số ngẫu nhiên từ 0.0 đến 1.0
            double y = random.nextDouble(); // Số ngẫu nhiên từ 0.0 đến 1.0

            double distance = x * x + y * y;
            if (distance <= 1) {
                insideCircle++;
            }
        }

        return 4.0 * insideCircle / numPoints;
    }

    public static void main(String[] args) {
        int numPoints = 100000;
        double piApprox = monteCarloPiEstimation(numPoints);
        System.out.println("Ước tính Pi bằng phương pháp Monte Carlo với " + numPoints + " điểm: " + piApprox);

        int numPointsLarge = 10000000;
        double piApproxLarge = monteCarloPiEstimation(numPointsLarge);
        System.out.println("Ước tính Pi bằng phương pháp Monte Carlo với " + numPointsLarge + " điểm: " + piApproxLarge);
    }
}
