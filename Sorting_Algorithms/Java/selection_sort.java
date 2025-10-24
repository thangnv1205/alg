
/**
 * @file selection_sort.java
 * @description Implementation of Selection Sort algorithm in Java
 * @author Algorithm Collection
 * @version 1.0
 */

import java.util.Arrays;

/**
 * @class SelectionSort
 * @description Class containing Selection Sort algorithm implementation
 */
public class selection_sort {

    /**
     * @function selectionSort
     * @description Sorts an array using selection sort algorithm
     * @param arr int[] - Array to be sorted
     * @returns void - Sorts the array in place
     */
    public static void selectionSort(int[] arr) {
        int n = arr.length;

        for (int i = 0; i < n - 1; i++) {
            // Find the minimum element in unsorted array
            int minIndex = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }

            // Swap the found minimum element with the first element
            if (minIndex != i) {
                swap(arr, i, minIndex);
            }
        }
    }

    /**
     * @function selectionSortWithCallback
     * @description Selection sort with custom comparison function
     * @param arr       Object[] - Array to be sorted
     * @param compareFn Function - Comparison function
     * @returns void
     */
    public static void selectionSortWithCallback(Object[] arr,
            java.util.function.BiFunction<Object, Object, Integer> compareFn) {
        int n = arr.length;

        for (int i = 0; i < n - 1; i++) {
            int minIndex = i;
            for (int j = i + 1; j < n; j++) {
                if (compareFn.apply(arr[j], arr[minIndex]) < 0) {
                    minIndex = j;
                }
            }

            if (minIndex != i) {
                Object temp = arr[i];
                arr[i] = arr[minIndex];
                arr[minIndex] = temp;
            }
        }
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
     * @function testSelectionSort
     * @description Test function to demonstrate selection sort
     * @returns void
     */
    public static void testSelectionSort() {
        System.out.println("=== Selection Sort Test ===");

        // Test case 1: Random array
        int[] arr1 = { 64, 34, 25, 12, 22, 11, 90 };
        System.out.println("Original array: " + Arrays.toString(arr1));
        selectionSort(arr1);
        System.out.println("Sorted array: " + Arrays.toString(arr1));
        System.out.println();

        // Test case 2: Already sorted array
        int[] arr2 = { 1, 2, 3, 4, 5 };
        System.out.println("Already sorted array: " + Arrays.toString(arr2));
        selectionSort(arr2);
        System.out.println("After sorting: " + Arrays.toString(arr2));
        System.out.println();

        // Test case 3: Reverse sorted array
        int[] arr3 = { 5, 4, 3, 2, 1 };
        System.out.println("Reverse sorted array: " + Arrays.toString(arr3));
        selectionSort(arr3);
        System.out.println("After sorting: " + Arrays.toString(arr3));
        System.out.println();

        // Test case 4: Array with duplicates
        int[] arr4 = { 3, 1, 4, 1, 5, 9, 2, 6, 5 };
        System.out.println("Array with duplicates: " + Arrays.toString(arr4));
        selectionSort(arr4);
        System.out.println("After sorting: " + Arrays.toString(arr4));
        System.out.println();

        // Test case 5: String array
        String[] arr5 = { "banana", "apple", "cherry", "date" };
        System.out.println("String array: " + Arrays.toString(arr5));
        selectionSortWithCallback(arr5, (a, b) -> ((String) a).compareTo((String) b));
        System.out.println("Sorted string array: " + Arrays.toString(arr5));
        System.out.println();
    }

    /**
     * @function performanceTest
     * @description Performance test for selection sort
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
            selectionSort(arr);
            long endTime = System.nanoTime();

            double duration = (endTime - startTime) / 1_000_000.0; // Convert to milliseconds
            System.out.printf("Array size %d: %.2f ms%n", size, duration);
        }
    }

    /**
     * @function main
     * @description Main method to run the selection sort demonstration
     * @param args String[] - Command line arguments
     * @returns void
     */
    public static void main(String[] args) {
        System.out.println("Selection Sort Algorithm Implementation");
        System.out.println("=====================================");

        // Run basic tests
        testSelectionSort();

        // Run performance test
        performanceTest();

        System.out.println("\nSelection Sort completed successfully!");
    }
}
