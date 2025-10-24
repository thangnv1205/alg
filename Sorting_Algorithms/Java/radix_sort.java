
/**
 * @file radix_sort.java
 * @description Implementation of Radix Sort algorithm in Java
 * @author Algorithm Collection
 * @version 1.0
 */

import java.util.Arrays;

/**
 * @class RadixSort
 * @description Class containing Radix Sort algorithm implementation
 */
public class radix_sort {

    /**
     * @function radixSort
     * @description Sorts an array using radix sort algorithm
     * @param arr int[] - Array to be sorted
     * @returns void - Sorts the array in place
     */
    public static void radixSort(int[] arr) {
        if (arr.length == 0) {
            return;
        }

        // Find the maximum number to know number of digits
        int max = Arrays.stream(arr).max().getAsInt();

        // Do counting sort for every digit
        for (int exp = 1; max / exp > 0; exp *= 10) {
            countingSortByDigit(arr, exp);
        }
    }

    /**
     * @function countingSortByDigit
     * @description Counting sort for a specific digit
     * @param arr int[] - Array to be sorted
     * @param exp int - Current digit position (1, 10, 100, ...)
     * @returns void
     */
    private static void countingSortByDigit(int[] arr, int exp) {
        int n = arr.length;
        int[] output = new int[n];
        int[] count = new int[10];

        // Count occurrences of each digit
        for (int i = 0; i < n; i++) {
            count[(arr[i] / exp) % 10]++;
        }

        // Change count[i] so that count[i] now contains actual position
        for (int i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        // Build the output array
        for (int i = n - 1; i >= 0; i--) {
            output[count[(arr[i] / exp) % 10] - 1] = arr[i];
            count[(arr[i] / exp) % 10]--;
        }

        // Copy the output array to arr
        System.arraycopy(output, 0, arr, 0, n);
    }

    /**
     * @function radixSortLSD
     * @description Least Significant Digit (LSD) radix sort
     * @param arr int[] - Array to be sorted
     * @returns void
     */
    public static void radixSortLSD(int[] arr) {
        if (arr.length == 0) {
            return;
        }

        int max = Arrays.stream(arr).max().getAsInt();

        // Process each digit from LSD to MSD
        for (int exp = 1; max / exp > 0; exp *= 10) {
            countingSortByDigit(arr, exp);
        }
    }

    /**
     * @function radixSortMSD
     * @description Most Significant Digit (MSD) radix sort
     * @param arr int[] - Array to be sorted
     * @returns void
     */
    public static void radixSortMSD(int[] arr) {
        if (arr.length == 0) {
            return;
        }

        int max = Arrays.stream(arr).max().getAsInt();
        int maxDigits = (int) Math.log10(max) + 1;

        radixSortMSDHelper(arr, 0, arr.length - 1, maxDigits);
    }

    /**
     * @function radixSortMSDHelper
     * @description Helper function for MSD radix sort
     * @param arr   int[] - Array to be sorted
     * @param low   int - Starting index
     * @param high  int - Ending index
     * @param digit int - Current digit position
     * @returns void
     */
    private static void radixSortMSDHelper(int[] arr, int low, int high, int digit) {
        if (low >= high || digit <= 0) {
            return;
        }

        // Partition array by current digit
        int[] partition = partitionByDigit(arr, low, high, digit);

        // Recursively sort each partition
        for (int i = 0; i < partition.length - 1; i++) {
            if (partition[i] < partition[i + 1]) {
                radixSortMSDHelper(arr, partition[i], partition[i + 1] - 1, digit - 1);
            }
        }
    }

    /**
     * @function partitionByDigit
     * @description Partitions array by current digit
     * @param arr   int[] - Array to partition
     * @param low   int - Starting index
     * @param high  int - Ending index
     * @param digit int - Current digit position
     * @returns int[] - Partition boundaries
     */
    private static int[] partitionByDigit(int[] arr, int low, int high, int digit) {
        int exp = (int) Math.pow(10, digit - 1);
        int[] count = new int[10];

        // Count occurrences of each digit
        for (int i = low; i <= high; i++) {
            count[(arr[i] / exp) % 10]++;
        }

        // Calculate partition boundaries
        int[] partition = new int[11];
        partition[0] = low;
        for (int i = 1; i <= 10; i++) {
            partition[i] = partition[i - 1] + count[i - 1];
        }

        // Rearrange elements
        int[] temp = new int[high - low + 1];
        System.arraycopy(arr, low, temp, 0, temp.length);

        int[] pos = new int[10];
        for (int i = 0; i < 10; i++) {
            pos[i] = partition[i];
        }

        for (int i = 0; i < temp.length; i++) {
            int digitValue = (temp[i] / exp) % 10;
            arr[pos[digitValue]] = temp[i];
            pos[digitValue]++;
        }

        return partition;
    }

    /**
     * @function radixSortForStrings
     * @description Radix sort for strings
     * @param arr String[] - String array to be sorted
     * @returns void
     */
    public static void radixSortForStrings(String[] arr) {
        if (arr.length == 0) {
            return;
        }

        // Find maximum length
        int maxLength = Arrays.stream(arr).mapToInt(String::length).max().getAsInt();

        // Pad strings with spaces to make them same length
        for (int i = 0; i < arr.length; i++) {
            arr[i] = String.format("%-" + maxLength + "s", arr[i]);
        }

        // Sort by each character position from right to left
        for (int pos = maxLength - 1; pos >= 0; pos--) {
            countingSortByCharacter(arr, pos);
        }

        // Remove padding spaces
        for (int i = 0; i < arr.length; i++) {
            arr[i] = arr[i].trim();
        }
    }

    /**
     * @function countingSortByCharacter
     * @description Counting sort for a specific character position
     * @param arr String[] - String array to be sorted
     * @param pos int - Character position
     * @returns void
     */
    private static void countingSortByCharacter(String[] arr, int pos) {
        int n = arr.length;
        String[] output = new String[n];
        int[] count = new int[256]; // ASCII range

        // Count occurrences of each character
        for (String s : arr) {
            count[s.charAt(pos)]++;
        }

        // Calculate cumulative count
        for (int i = 1; i < 256; i++) {
            count[i] += count[i - 1];
        }

        // Build output array
        for (int i = n - 1; i >= 0; i--) {
            output[count[arr[i].charAt(pos)] - 1] = arr[i];
            count[arr[i].charAt(pos)]--;
        }

        System.arraycopy(output, 0, arr, 0, n);
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
     * @function testRadixSort
     * @description Test function to demonstrate radix sort
     * @returns void
     */
    public static void testRadixSort() {
        System.out.println("=== Radix Sort Test ===");

        // Test case 1: Random array
        int[] arr1 = { 170, 45, 75, 90, 2, 802, 24, 66 };
        System.out.println("Original array: " + Arrays.toString(arr1));
        radixSort(arr1);
        System.out.println("Sorted array: " + Arrays.toString(arr1));
        System.out.println();

        // Test case 2: Array with different number of digits
        int[] arr2 = { 1, 10, 100, 1000, 10000, 100000 };
        System.out.println("Array with different digits: " + Arrays.toString(arr2));
        radixSortLSD(arr2);
        System.out.println("LSD sorted array: " + Arrays.toString(arr2));
        System.out.println();

        // Test case 3: MSD radix sort
        int[] arr3 = { 329, 457, 657, 839, 436, 720, 355 };
        System.out.println("Array for MSD sort: " + Arrays.toString(arr3));
        radixSortMSD(arr3);
        System.out.println("MSD sorted array: " + Arrays.toString(arr3));
        System.out.println();

        // Test case 4: String array
        String[] arr4 = { "word", "category", "apple", "banana", "cherry" };
        System.out.println("String array: " + Arrays.toString(arr4));
        radixSortForStrings(arr4);
        System.out.println("Sorted string array: " + Arrays.toString(arr4));
        System.out.println();
    }

    /**
     * @function performanceTest
     * @description Performance test for radix sort
     * @returns void
     */
    public static void performanceTest() {
        System.out.println("=== Performance Test ===");

        int[] sizes = { 1000, 5000, 10000, 50000, 100000 };

        for (int size : sizes) {
            int[] arr = new int[size];
            // Fill with random numbers
            for (int i = 0; i < size; i++) {
                arr[i] = (int) (Math.random() * 1000000);
            }

            long startTime = System.nanoTime();
            radixSort(arr);
            long endTime = System.nanoTime();

            double duration = (endTime - startTime) / 1_000_000.0; // Convert to milliseconds
            System.out.printf("Array size %d: %.2f ms%n", size, duration);
        }
    }

    /**
     * @function main
     * @description Main method to run the radix sort demonstration
     * @param args String[] - Command line arguments
     * @returns void
     */
    public static void main(String[] args) {
        System.out.println("Radix Sort Algorithm Implementation");
        System.out.println("===================================");

        // Run basic tests
        testRadixSort();

        // Run performance test
        performanceTest();

        System.out.println("\nRadix Sort completed successfully!");
    }
}
