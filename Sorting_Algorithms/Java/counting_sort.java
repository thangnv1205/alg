
/**
 * @file counting_sort.java
 * @description Implementation of Counting Sort algorithm in Java
 * @author Algorithm Collection
 * @version 1.0
 */

import java.util.Arrays;

/**
 * @class CountingSort
 * @description Class containing Counting Sort algorithm implementation
 */
public class counting_sort {

    /**
     * @function countingSort
     * @description Sorts an array using counting sort algorithm
     * @param arr int[] - Array to be sorted
     * @returns void - Sorts the array in place
     */
    public static void countingSort(int[] arr) {
        if (arr.length == 0) {
            return;
        }

        // Find the maximum element
        int max = Arrays.stream(arr).max().getAsInt();
        int min = Arrays.stream(arr).min().getAsInt();

        // Create count array
        int range = max - min + 1;
        int[] count = new int[range];
        int[] output = new int[arr.length];

        // Count occurrences of each element
        for (int i = 0; i < arr.length; i++) {
            count[arr[i] - min]++;
        }

        // Modify count array to store actual position
        for (int i = 1; i < range; i++) {
            count[i] += count[i - 1];
        }

        // Build output array
        for (int i = arr.length - 1; i >= 0; i--) {
            output[count[arr[i] - min] - 1] = arr[i];
            count[arr[i] - min]--;
        }

        // Copy output array to original array
        System.arraycopy(output, 0, arr, 0, arr.length);
    }

    /**
     * @function countingSortStable
     * @description Stable version of counting sort
     * @param arr int[] - Array to be sorted
     * @returns void
     */
    public static void countingSortStable(int[] arr) {
        if (arr.length == 0) {
            return;
        }

        int max = Arrays.stream(arr).max().getAsInt();
        int min = Arrays.stream(arr).min().getAsInt();
        int range = max - min + 1;

        int[] count = new int[range];
        int[] output = new int[arr.length];

        // Count occurrences
        for (int value : arr) {
            count[value - min]++;
        }

        // Calculate cumulative count
        for (int i = 1; i < range; i++) {
            count[i] += count[i - 1];
        }

        // Build output array in reverse order to maintain stability
        for (int i = arr.length - 1; i >= 0; i--) {
            output[count[arr[i] - min] - 1] = arr[i];
            count[arr[i] - min]--;
        }

        System.arraycopy(output, 0, arr, 0, arr.length);
    }

    /**
     * @function countingSortWithRange
     * @description Counting sort with specified range
     * @param arr int[] - Array to be sorted
     * @param min int - Minimum value in range
     * @param max int - Maximum value in range
     * @returns void
     */
    public static void countingSortWithRange(int[] arr, int min, int max) {
        if (arr.length == 0) {
            return;
        }

        int range = max - min + 1;
        int[] count = new int[range];
        int[] output = new int[arr.length];

        // Count occurrences
        for (int value : arr) {
            if (value < min || value > max) {
                throw new IllegalArgumentException("Value " + value + " is outside range [" + min + ", " + max + "]");
            }
            count[value - min]++;
        }

        // Calculate cumulative count
        for (int i = 1; i < range; i++) {
            count[i] += count[i - 1];
        }

        // Build output array
        for (int i = arr.length - 1; i >= 0; i--) {
            output[count[arr[i] - min] - 1] = arr[i];
            count[arr[i] - min]--;
        }

        System.arraycopy(output, 0, arr, 0, arr.length);
    }

    /**
     * @function countingSortForCharacters
     * @description Counting sort for character arrays
     * @param arr char[] - Character array to be sorted
     * @returns void
     */
    public static void countingSortForCharacters(char[] arr) {
        if (arr.length == 0) {
            return;
        }

        // ASCII range for characters
        int[] count = new int[256];
        char[] output = new char[arr.length];

        // Count occurrences
        for (char c : arr) {
            count[c]++;
        }

        // Calculate cumulative count
        for (int i = 1; i < 256; i++) {
            count[i] += count[i - 1];
        }

        // Build output array
        for (int i = arr.length - 1; i >= 0; i--) {
            output[count[arr[i]] - 1] = arr[i];
            count[arr[i]]--;
        }

        System.arraycopy(output, 0, arr, 0, arr.length);
    }

    /**
     * @function printArray
     * @description Prints the elements of an array
     * @param arr int[] - Array to be printed
     * @returns void
     */
    public static void printArray(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }

    /**
     * @function testCountingSort
     * @description Test function to demonstrate counting sort
     * @returns void
     */
    public static void testCountingSort() {
        System.out.println("=== Counting Sort Test ===");

        // Test case 1: Random array
        int[] arr1 = { 4, 2, 2, 8, 3, 3, 1 };
        System.out.println("Original array: " + Arrays.toString(arr1));
        countingSort(arr1);
        System.out.println("Sorted array: " + Arrays.toString(arr1));
        System.out.println();

        // Test case 2: Array with duplicates
        int[] arr2 = { 1, 4, 1, 2, 7, 5, 2 };
        System.out.println("Array with duplicates: " + Arrays.toString(arr2));
        countingSortStable(arr2);
        System.out.println("Stable sorted array: " + Arrays.toString(arr2));
        System.out.println();

        // Test case 3: Negative numbers
        int[] arr3 = { -5, -10, 0, -3, 8, 5, -1, 10 };
        System.out.println("Array with negative numbers: " + Arrays.toString(arr3));
        countingSort(arr3);
        System.out.println("Sorted array: " + Arrays.toString(arr3));
        System.out.println();

        // Test case 4: Character array
        char[] arr4 = { 'g', 'e', 'e', 'k', 's', 'f', 'o', 'r', 'g', 'e', 'e', 'k', 's' };
        System.out.println("Character array: " + Arrays.toString(arr4));
        countingSortForCharacters(arr4);
        System.out.println("Sorted character array: " + Arrays.toString(arr4));
        System.out.println();

        // Test case 5: With specified range
        int[] arr5 = { 1, 4, 1, 2, 7, 5, 2 };
        System.out.println("Array with range [1, 7]: " + Arrays.toString(arr5));
        countingSortWithRange(arr5, 1, 7);
        System.out.println("Sorted array: " + Arrays.toString(arr5));
        System.out.println();
    }

    /**
     * @function performanceTest
     * @description Performance test for counting sort
     * @returns void
     */
    public static void performanceTest() {
        System.out.println("=== Performance Test ===");

        int[] sizes = { 1000, 5000, 10000, 50000, 100000 };

        for (int size : sizes) {
            int[] arr = new int[size];
            // Fill with random numbers in range [0, 1000]
            for (int i = 0; i < size; i++) {
                arr[i] = (int) (Math.random() * 1000);
            }

            long startTime = System.nanoTime();
            countingSort(arr);
            long endTime = System.nanoTime();

            double duration = (endTime - startTime) / 1_000_000.0; // Convert to milliseconds
            System.out.printf("Array size %d: %.2f ms%n", size, duration);
        }
    }

    /**
     * @function main
     * @description Main method to run the counting sort demonstration
     * @param args String[] - Command line arguments
     * @returns void
     */
    public static void main(String[] args) {
        System.out.println("Counting Sort Algorithm Implementation");
        System.out.println("=====================================");

        // Run basic tests
        testCountingSort();

        // Run performance test
        performanceTest();

        System.out.println("\nCounting Sort completed successfully!");
    }
}
