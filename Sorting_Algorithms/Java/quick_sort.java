
/**
 * @file quick_sort.java
 * @description Implementation of Quick Sort algorithm in Java
 * @author Algorithm Collection
 * @version 1.0
 */

import java.util.Arrays;
import java.util.Random;

/**
 * @class QuickSort
 * @description Class containing Quick Sort algorithm implementation
 */
public class quick_sort {

    /**
     * @function quickSort
     * @description Sorts an array using quick sort algorithm
     * @param arr int[] - Array to be sorted
     * @returns void - Sorts the array in place
     */
    public static void quickSort(int[] arr) {
        if (arr == null || arr.length <= 1) {
            return;
        }
        quickSort(arr, 0, arr.length - 1);
    }

    /**
     * @function quickSort
     * @description Recursive quick sort implementation
     * @param arr  int[] - Array to be sorted
     * @param low  int - Starting index
     * @param high int - Ending index
     * @returns void
     */
    private static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            // Partition the array and get pivot index
            int pivotIndex = partition(arr, low, high);

            // Recursively sort elements before and after partition
            quickSort(arr, low, pivotIndex - 1);
            quickSort(arr, pivotIndex + 1, high);
        }
    }

    /**
     * @function partition
     * @description Partitions the array around a pivot element
     * @param arr  int[] - Array to be partitioned
     * @param low  int - Starting index
     * @param high int - Ending index
     * @returns int - Final position of pivot element
     */
    private static int partition(int[] arr, int low, int high) {
        // Choose the rightmost element as pivot
        int pivot = arr[high];

        // Index of smaller element (indicates right position of pivot)
        int i = low - 1;

        for (int j = low; j < high; j++) {
            // If current element is smaller than or equal to pivot
            if (arr[j] <= pivot) {
                i++;
                swap(arr, i, j);
            }
        }

        // Place pivot in correct position
        swap(arr, i + 1, high);
        return i + 1;
    }

    /**
     * @function swap
     * @description Swaps two elements in an array
     * @param arr int[] - Array containing elements
     * @param i   int - First index
     * @param j   int - Second index
     * @returns void
     */
    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    /**
     * @function randomizedQuickSort
     * @description Randomized version of quick sort for better average performance
     * @param arr int[] - Array to be sorted
     * @returns void
     */
    public static void randomizedQuickSort(int[] arr) {
        if (arr == null || arr.length <= 1) {
            return;
        }
        randomizedQuickSort(arr, 0, arr.length - 1);
    }

    /**
     * @function randomizedQuickSort
     * @description Recursive randomized quick sort implementation
     * @param arr  int[] - Array to be sorted
     * @param low  int - Starting index
     * @param high int - Ending index
     * @returns void
     */
    private static void randomizedQuickSort(int[] arr, int low, int high) {
        if (low < high) {
            // Randomly select pivot and swap with last element
            Random random = new Random();
            int randomIndex = low + random.nextInt(high - low + 1);
            swap(arr, randomIndex, high);

            // Partition the array
            int pivotIndex = partition(arr, low, high);

            // Recursively sort elements before and after partition
            randomizedQuickSort(arr, low, pivotIndex - 1);
            randomizedQuickSort(arr, pivotIndex + 1, high);
        }
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
     * @function testQuickSort
     * @description Test function to demonstrate quick sort
     * @returns void
     */
    public static void testQuickSort() {
        System.out.println("=== Quick Sort Test ===");

        // Test case 1: Random array
        int[] arr1 = { 64, 34, 25, 12, 22, 11, 90 };
        System.out.println("Original array: " + Arrays.toString(arr1));
        quickSort(arr1);
        System.out.println("Sorted array: " + Arrays.toString(arr1));
        System.out.println();

        // Test case 2: Already sorted array
        int[] arr2 = { 1, 2, 3, 4, 5 };
        System.out.println("Already sorted array: " + Arrays.toString(arr2));
        quickSort(arr2);
        System.out.println("After sorting: " + Arrays.toString(arr2));
        System.out.println();

        // Test case 3: Reverse sorted array
        int[] arr3 = { 5, 4, 3, 2, 1 };
        System.out.println("Reverse sorted array: " + Arrays.toString(arr3));
        quickSort(arr3);
        System.out.println("After sorting: " + Arrays.toString(arr3));
        System.out.println();

        // Test case 4: Array with duplicates
        int[] arr4 = { 3, 1, 4, 1, 5, 9, 2, 6, 5 };
        System.out.println("Array with duplicates: " + Arrays.toString(arr4));
        quickSort(arr4);
        System.out.println("After sorting: " + Arrays.toString(arr4));
        System.out.println();

        // Test case 5: Randomized Quick Sort
        int[] arr5 = { 7, 2, 1, 6, 8, 5, 3, 4 };
        System.out.println("Testing Randomized Quick Sort:");
        System.out.println("Original array: " + Arrays.toString(arr5));
        randomizedQuickSort(arr5);
        System.out.println("Sorted array: " + Arrays.toString(arr5));
        System.out.println();
    }

    /**
     * @function performanceTest
     * @description Performance test for quick sort
     * @returns void
     */
    public static void performanceTest() {
        System.out.println("=== Performance Test ===");

        int[] sizes = { 100, 500, 1000, 2000, 5000 };

        for (int size : sizes) {
            int[] arr = new int[size];
            // Fill with random numbers
            Random random = new Random();
            for (int i = 0; i < size; i++) {
                arr[i] = random.nextInt(1000);
            }

            long startTime = System.nanoTime();
            quickSort(arr);
            long endTime = System.nanoTime();

            double duration = (endTime - startTime) / 1_000_000.0; // Convert to milliseconds
            System.out.printf("Array size %d: %.2f ms%n", size, duration);
        }
    }

    /**
     * @function main
     * @description Main method to run the quick sort demonstration
     * @param args String[] - Command line arguments
     * @returns void
     */
    public static void main(String[] args) {
        System.out.println("Quick Sort Algorithm Implementation");
        System.out.println("==================================");

        // Run basic tests
        testQuickSort();

        // Run performance test
        performanceTest();

        System.out.println("\nQuick Sort completed successfully!");
    }
}
