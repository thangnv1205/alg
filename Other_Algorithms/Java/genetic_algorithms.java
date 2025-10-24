import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

public class genetic_algorithms {

    // Hàm mục tiêu (ví dụ: tìm giá trị x tối đa hóa -x^2 + 5x + 10)
    // Giả sử x được mã hóa bằng một chuỗi bit có độ dài 4 (0-15)
    private static double fitnessFunction(List<Integer> chromosome) {
        int x = 0;
        for (int i = 0; i < chromosome.size(); i++) {
            x += chromosome.get(i) * Math.pow(2, chromosome.size() - 1 - i);
        }
        return -Math.pow(x, 2) + 5 * x + 10;
    }

    // Khởi tạo quần thể
    private static List<List<Integer>> createPopulation(int popSize, int chromosomeLength, Random random) {
        List<List<Integer>> population = new ArrayList<>();
        for (int i = 0; i < popSize; i++) {
            List<Integer> chromosome = new ArrayList<>();
            for (int j = 0; j < chromosomeLength; j++) {
                chromosome.add(random.nextInt(2)); // 0 hoặc 1
            }
            population.add(chromosome);
        }
        return population;
    }

    // Chọn lọc (Tournament Selection)
    private static List<List<Integer>> selection(List<List<Integer>> population, List<Double> fitnesses, Random random) {
        List<List<Integer>> selectedParents = new ArrayList<>();
        int popSize = population.size();

        for (int i = 0; i < popSize; i++) {
            // Chọn 2 cá thể ngẫu nhiên
            int idx1 = random.nextInt(popSize);
            int idx2 = random.nextInt(popSize);
            List<Integer> parent1 = population.get(idx1);
            List<Integer> parent2 = population.get(idx2);

            // Chọn cá thể tốt hơn
            if (fitnesses.get(idx1) > fitnesses.get(idx2)) {
                selectedParents.add(parent1);
            } else {
                selectedParents.add(parent2);
            }
        }
        return selectedParents;
    }

    // Lai ghép (One-point Crossover)
    private static List<List<Integer>> crossover(List<Integer> parent1, List<Integer> parent2, Random random) {
        int crossoverPoint = random.nextInt(parent1.size() - 1) + 1; // Từ 1 đến length-1
        List<Integer> child1 = new ArrayList<>();
        List<Integer> child2 = new ArrayList<>();

        for (int i = 0; i < parent1.size(); i++) {
            if (i < crossoverPoint) {
                child1.add(parent1.get(i));
                child2.add(parent2.get(i));
            } else {
                child1.add(parent2.get(i));
                child2.add(parent1.get(i));
            }
        }
        return Arrays.asList(child1, child2);
    }

    // Đột biến (Bit-flip Mutation)
    private static List<Integer> mutate(List<Integer> chromosome, double mutationRate, Random random) {
        List<Integer> mutatedChromosome = new ArrayList<>(chromosome);
        for (int i = 0; i < mutatedChromosome.size(); i++) {
            if (random.nextDouble() < mutationRate) {
                mutatedChromosome.set(i, 1 - mutatedChromosome.get(i)); // Lật bit
            }
        }
        return mutatedChromosome;
    }

    public static Object[] geneticAlgorithm(int popSize, int chromosomeLength, int generations, double mutationRate) {
        Random random = new Random();
        List<List<Integer>> population = createPopulation(popSize, chromosomeLength, random);

        for (int generation = 0; generation < generations; generation++) {
            List<Double> fitnesses = population.stream()
                    .map(genetic_algorithms::fitnessFunction)
                    .collect(Collectors.toList());

            // Chọn lọc
            List<List<Integer>> parents = selection(population, fitnesses, random);

            // Lai ghép và đột biến
            List<List<Integer>> nextPopulation = new ArrayList<>();
            for (int i = 0; i < popSize; i += 2) {
                List<Integer> parent1 = parents.get(i);
                List<Integer> parent2 = parents.get(i + 1);
                List<List<Integer>> children = crossover(parent1, parent2, random);
                nextPopulation.add(mutate(children.get(0), mutationRate, random));
                nextPopulation.add(mutate(children.get(1), mutationRate, random));
            }
            population = nextPopulation;

            // Tìm cá thể tốt nhất trong thế hệ hiện tại
            // (Tùy chọn: có thể in ra để theo dõi tiến trình)
            // int bestChromosomeIdx = 0;
            // double maxFitness = Double.MIN_VALUE;
            // for (int i = 0; i < fitnesses.size(); i++) {
            //     if (fitnesses.get(i) > maxFitness) {
            //         maxFitness = fitnesses.get(i);
            //         bestChromosomeIdx = i;
            //     }
            // }
            // List<Integer> bestChromosome = population.get(bestChromosomeIdx);
            // int bestX = 0;
            // for (int i = 0; i < bestChromosome.size(); i++) {
            //     bestX += bestChromosome.get(i) * Math.pow(2, bestChromosome.size() - 1 - i);
            // }
            // System.out.println("Thế hệ " + generation + ": x = " + bestX + ", fitness = " + maxFitness);
        }

        // Trả về cá thể tốt nhất cuối cùng
        List<Double> finalFitnesses = population.stream()
                .map(genetic_algorithms::fitnessFunction)
                .collect(Collectors.toList());
        int bestChromosomeIdx = 0;
        double maxFitness = Double.MIN_VALUE;
        for (int i = 0; i < finalFitnesses.size(); i++) {
            if (finalFitnesses.get(i) > maxFitness) {
                maxFitness = finalFitnesses.get(i);
                bestChromosomeIdx = i;
            }
        }
        List<Integer> bestChromosome = population.get(bestChromosomeIdx);

        return new Object[]{bestChromosome, maxFitness};
    }

    public static void main(String[] args) {
        // Ví dụ sử dụng:
        int popSize = 10;
        int chromosomeLength = 4; // Để mã hóa số từ 0-15
        int generations = 100;
        double mutationRate = 0.1;

        Object[] result = geneticAlgorithm(popSize, chromosomeLength, generations, mutationRate);
        List<Integer> bestSolution = (List<Integer>) result[0];
        double bestScore = (double) result[1];

        int bestX = 0;
        for (int i = 0; i < bestSolution.size(); i++) {
            bestX += bestSolution.get(i) * Math.pow(2, bestSolution.size() - 1 - i);
        }

        System.out.println("Giải pháp tốt nhất (chuỗi bit): " + bestSolution);
        System.out.println("Giá trị x tương ứng: " + bestX);
        System.out.println("Điểm thích nghi tốt nhất: " + bestScore);
    }
}
