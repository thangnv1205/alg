
/**
 * @file fibonacci_sequence.java
 * @description Implementation of Fibonacci Sequence algorithm in Java
 * @author Algorithm Collection
 * @version 1.0
 */

import java.util.*;

/**
 * @class fibonacci_sequence
 * @description Class containing Fibonacci Sequence algorithm implementation
 */
public class fibonacci_sequence {

    /**
     * @function fibonacciRecursive
     * @description Recursive implementation of Fibonacci sequence
     * @param n int - Position in Fibonacci sequence
     * @returns long - Fibonacci number at position n
     */
    public static long fibonacciRecursive(int n) {
        if (n <= 1) {
            return n;
        }
        return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
    }

    /**
     * @function fibonacciMemoized
     * @description Memoized implementation of Fibonacci sequence
     * @param n int - Position in Fibonacci sequence
     * @returns long - Fibonacci number at position n
     */
    public static long fibonacciMemoized(int n) {
        long[] memo = new long[n + 1];
        Arrays.fill(memo, -1);
        return fibonacciMemoizedHelper(n, memo);
    }

    /**
     * @function fibonacciMemoizedHelper
     * @description Helper function for memoized Fibonacci
     * @param n    int - Position in Fibonacci sequence
     * @param memo long[] - Memoization array
     * @returns long - Fibonacci number at position n
     */
    private static long fibonacciMemoizedHelper(int n, long[] memo) {
        if (n <= 1) {
            return n;
        }
        if (memo[n] != -1) {
            return memo[n];
        }
        memo[n] = fibonacciMemoizedHelper(n - 1, memo) + fibonacciMemoizedHelper(n - 2, memo);
        return memo[n];
    }

    /**
     * @function fibonacciDP
     * @description Dynamic programming implementation of Fibonacci sequence
     * @param n int - Position in Fibonacci sequence
     * @returns long - Fibonacci number at position n
     */
    public static long fibonacciDP(int n) {
        if (n <= 1) {
            return n;
        }

        long[] dp = new long[n + 1];
        dp[0] = 0;
        dp[1] = 1;

        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }

        return dp[n];
    }

    /**
     * @function fibonacciOptimized
     * @description Space-optimized implementation of Fibonacci sequence
     * @param n int - Position in Fibonacci sequence
     * @returns long - Fibonacci number at position n
     */
    public static long fibonacciOptimized(int n) {
        if (n <= 1) {
            return n;
        }

        long prev2 = 0;
        long prev1 = 1;

        for (int i = 2; i <= n; i++) {
            long current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }

        return prev1;
    }

    /**
     * @function fibonacciMatrix
     * @description Matrix exponentiation implementation of Fibonacci sequence
     * @param n int - Position in Fibonacci sequence
     * @returns long - Fibonacci number at position n
     */
    public static long fibonacciMatrix(int n) {
        if (n <= 1) {
            return n;
        }

        long[][] matrix = { { 1, 1 }, { 1, 0 } };
        long[][] result = matrixPower(matrix, n - 1);
        return result[0][0];
    }

    /**
     * @function matrixPower
     * @description Matrix exponentiation helper
     * @param matrix long[][] - Matrix to raise to power
     * @param power  int - Power to raise matrix to
     * @returns long[][] - Result matrix
     */
    private static long[][] matrixPower(long[][] matrix, int power) {
        if (power == 1) {
            return matrix;
        }

        if (power % 2 == 0) {
            long[][] half = matrixPower(matrix, power / 2);
            return matrixMultiply(half, half);
        } else {
            return matrixMultiply(matrix, matrixPower(matrix, power - 1));
        }
    }

    /**
     * @function matrixMultiply
     * @description Matrix multiplication helper
     * @param a long[][] - First matrix
     * @param b long[][] - Second matrix
     * @returns long[][] - Result matrix
     */
    private static long[][] matrixMultiply(long[][] a, long[][] b) {
        long[][] result = new long[2][2];
        result[0][0] = a[0][0] * b[0][0] + a[0][1] * b[1][0];
        result[0][1] = a[0][0] * b[0][1] + a[0][1] * b[1][1];
        result[1][0] = a[1][0] * b[0][0] + a[1][1] * b[1][0];
        result[1][1] = a[1][0] * b[0][1] + a[1][1] * b[1][1];
        return result;
    }

    /**
     * @function fibonacciSequence
     * @description Generates Fibonacci sequence up to n terms
     * @param n int - Number of terms to generate
     * @returns List<Long> - List of Fibonacci numbers
     */
    public static List<Long> fibonacciSequence(int n) {
        List<Long> sequence = new ArrayList<>();

        if (n <= 0) {
            return sequence;
        }

        long a = 0, b = 1;
        sequence.add(a);

        if (n > 1) {
            sequence.add(b);
        }

        for (int i = 2; i < n; i++) {
            long next = a + b;
            sequence.add(next);
            a = b;
            b = next;
        }

        return sequence;
    }

    /**
     * @function fibonacciWithMod
     * @description Fibonacci with modular arithmetic
     * @param n   int - Position in Fibonacci sequence
     * @param mod int - Modulo value
     * @returns long - Fibonacci number at position n mod mod
     */
    public static long fibonacciWithMod(int n, int mod) {
        if (n <= 1) {
            return n % mod;
        }

        long prev2 = 0;
        long prev1 = 1;

        for (int i = 2; i <= n; i++) {
            long current = (prev1 + prev2) % mod;
            prev2 = prev1;
            prev1 = current;
        }

        return prev1;
    }

    /**
     * @function testFibonacci
     * @description Test function to demonstrate Fibonacci algorithms
     * @returns void
     */
    public static void testFibonacci() {
        System.out.println("=== Fibonacci Sequence Test ===");

        int[] testValues = { 0, 1, 5, 10, 20, 30, 40 };

        for (int n : testValues) {
            System.out.println("n = " + n + ":");

            // Test recursive (only for small values)
            if (n <= 30) {
                long startTime = System.nanoTime();
                long recursive = fibonacciRecursive(n);
                long endTime = System.nanoTime();
                System.out.printf("  Recursive: %d (%.2f ms)%n", recursive, (endTime - startTime) / 1_000_000.0);
            }

            // Test memoized
            long startTime = System.nanoTime();
            long memoized = fibonacciMemoized(n);
            long endTime = System.nanoTime();
            System.out.printf("  Memoized: %d (%.2f ms)%n", memoized, (endTime - startTime) / 1_000_000.0);

            // Test DP
            startTime = System.nanoTime();
            long dp = fibonacciDP(n);
            endTime = System.nanoTime();
            System.out.printf("  DP: %d (%.2f ms)%n", dp, (endTime - startTime) / 1_000_000.0);

            // Test optimized
            startTime = System.nanoTime();
            long optimized = fibonacciOptimized(n);
            endTime = System.nanoTime();
            System.out.printf("  Optimized: %d (%.2f ms)%n", optimized, (endTime - startTime) / 1_000_000.0);

            // Test matrix
            startTime = System.nanoTime();
            long matrix = fibonacciMatrix(n);
            endTime = System.nanoTime();
            System.out.printf("  Matrix: %d (%.2f ms)%n", matrix, (endTime - startTime) / 1_000_000.0);

            System.out.println();
        }

        // Test sequence generation
        System.out.println("Fibonacci sequence (first 15 terms):");
        List<Long> sequence = fibonacciSequence(15);
        System.out.println(sequence);
        System.out.println();

        // Test with modulo
        System.out.println("Fibonacci with modulo 1000000007:");
        for (int n : new int[] { 10, 20, 30, 40, 50 }) {
            long result = fibonacciWithMod(n, 1000000007);
            System.out.printf("F(%d) mod 1000000007 = %d%n", n, result);
        }
        System.out.println();
    }

    /**
     * @function performanceTest
     * @description Performance test for Fibonacci algorithms
     * @returns void
     */
    public static void performanceTest() {
        System.out.println("=== Performance Test ===");

        int[] sizes = { 1000, 5000, 10000, 50000, 100000 };

        for (int size : sizes) {
            System.out.println("n = " + size + ":");

            // Test DP
            long startTime = System.nanoTime();
            fibonacciDP(size);
            long endTime = System.nanoTime();
            System.out.printf("  DP: %.2f ms%n", (endTime - startTime) / 1_000_000.0);

            // Test optimized
            startTime = System.nanoTime();
            fibonacciOptimized(size);
            endTime = System.nanoTime();
            System.out.printf("  Optimized: %.2f ms%n", (endTime - startTime) / 1_000_000.0);

            // Test matrix
            startTime = System.nanoTime();
            fibonacciMatrix(size);
            endTime = System.nanoTime();
            System.out.printf("  Matrix: %.2f ms%n", (endTime - startTime) / 1_000_000.0);

            System.out.println();
        }
    }

    /**
     * @function main
     * @description Main method to run the Fibonacci demonstration
     * @param args String[] - Command line arguments
     * @returns void
     */
    public static void main(String[] args) {
        System.out.println("Fibonacci Sequence Algorithm Implementation");
        System.out.println("==========================================");

        // Run basic tests
        testFibonacci();

        // Run performance test
        performanceTest();

        System.out.println("\nFibonacci sequence completed successfully!");
    }
}
