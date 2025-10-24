
/**
 * @file bubble_sort.java
 * @description Implementation of Bubble Sort algorithm in Java
 * @author Algorithm Collection
 * @version 1.0
 */

import java.util.Arrays;

/**
 * @class BubbleSort
 * @description Class containing Bubble Sort algorithm implementation
 */
public class bubble_sort {

    /**
     * @function bubbleSort
     * @description Sorts an array using bubble sort algorithm
     * @param arr int[] - Array to be sorted
     * @returns void - Sorts the array in place
     */
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        boolean swapped;

        for (int i = 0; i < n - 1; i++) {
            swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap elements
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            // If no swapping occurred, array is sorted
            if (!swapped) {
                break;
            }
        }
    }

    /**
     * @function bubbleSortOptimized
     * @description Optimized version of bubble sort with early termination
     * @param arr int[] - Array to be sorted
     * @returns void - Sorts the array in place
     */
    public static void bubbleSortOptimized(int[] arr) {
        int n = arr.length;
        boolean swapped;

        do {
            swapped = false;
            for (int i = 0; i < n - 1; i++) {
                if (arr[i] > arr[i + 1]) {
                    // Swap elements
                    int temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                    swapped = true;
                }
            }
            n--; // Reduce the range of comparison
        } while (swapped);
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
     * @function testBubbleSort
     * @description Test function to demonstrate bubble sort
     * @returns void
     */
    public static void testBubbleSort() {
        System.out.println("=== Bubble Sort Test ===");

        // Test case 1: Random array
        int[] arr1 = { 64, 34, 25, 12, 22, 11, 90 };
        System.out.println("Original array: " + Arrays.toString(arr1));
        bubbleSort(arr1);
        System.out.println("Sorted array: " + Arrays.toString(arr1));
        System.out.println();

        // Test case 2: Already sorted array
        int[] arr2 = { 1, 2, 3, 4, 5 };
        System.out.println("Already sorted array: " + Arrays.toString(arr2));
        bubbleSort(arr2);
        System.out.println("After sorting: " + Arrays.toString(arr2));
        System.out.println();

        // Test case 3: Reverse sorted array
        int[] arr3 = { 5, 4, 3, 2, 1 };
        System.out.println("Reverse sorted array: " + Arrays.toString(arr3));
        bubbleSort(arr3);
        System.out.println("After sorting: " + Arrays.toString(arr3));
        System.out.println();

        // Test case 4: Array with duplicates
        int[] arr4 = { 3, 1, 4, 1, 5, 9, 2, 6, 5 };
        System.out.println("Array with duplicates: " + Arrays.toString(arr4));
        bubbleSort(arr4);
        System.out.println("After sorting: " + Arrays.toString(arr4));
        System.out.println();
    }

    /**
     * @function performanceTest
     * @description Performance test for bubble sort
     * @returns void
     */
    public static void performanceTest() {
        System.out.println("=== Performance Test ===");

        int[] sizes = { 100, 500, 1000, 2000 };

        for (int size : sizes) {
            int[] arr = new int[size];
            // Fill with random numbers
            for (int i = 0; i < size; i++) {
                arr[i] = (int) (Math.random() * 1000);
            }

            long startTime = System.nanoTime();
            bubbleSort(arr);
            long endTime = System.nanoTime();

            double duration = (endTime - startTime) / 1_000_000.0; // Convert to milliseconds
            System.out.printf("Array size %d: %.2f ms%n", size, duration);
        }
    }

    /**
     * @function main
     * @description Main method to run the bubble sort demonstration
     * @param args String[] - Command line arguments
     * @returns void
     */
    public static void main(String[] args) {
        System.out.println("Bubble Sort Algorithm Implementation");
        System.out.println("===================================");

        // Run basic tests
        testBubbleSort();

        // Run performance test
        performanceTest();

        System.out.println("\nBubble Sort completed successfully!");
    }
}
