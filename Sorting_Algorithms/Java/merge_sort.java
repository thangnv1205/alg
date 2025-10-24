
/**
 * @file merge_sort.java
 * @description Implementation of Merge Sort algorithm in Java
 * @author Algorithm Collection
 * @version 1.0
 */

import java.util.Arrays;

/**
 * @class MergeSort
 * @description Class containing Merge Sort algorithm implementation
 */
public class merge_sort {

    /**
     * @function mergeSort
     * @description Sorts an array using merge sort algorithm
     * @param arr int[] - Array to be sorted
     * @returns void - Sorts the array in place
     */
    public static void mergeSort(int[] arr) {
        if (arr == null || arr.length <= 1) {
            return;
        }
        mergeSort(arr, 0, arr.length - 1);
    }

    /**
     * @function mergeSort
     * @description Recursive merge sort implementation
     * @param arr   int[] - Array to be sorted
     * @param left  int - Starting index
     * @param right int - Ending index
     * @returns void
     */
    private static void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            // Find the middle point
            int mid = left + (right - left) / 2;

            // Sort first and second halves
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);

            // Merge the sorted halves
            merge(arr, left, mid, right);
        }
    }

    /**
     * @function merge
     * @description Merges two sorted subarrays
     * @param arr   int[] - Array containing subarrays
     * @param left  int - Starting index of first subarray
     * @param mid   int - Ending index of first subarray
     * @param right int - Ending index of second subarray
     * @returns void
     */
    private static void merge(int[] arr, int left, int mid, int right) {
        // Find sizes of two subarrays to be merged
        int n1 = mid - left + 1;
        int n2 = right - mid;

        // Create temporary arrays
        int[] leftArray = new int[n1];
        int[] rightArray = new int[n2];

        // Copy data to temporary arrays
        for (int i = 0; i < n1; i++) {
            leftArray[i] = arr[left + i];
        }
        for (int j = 0; j < n2; j++) {
            rightArray[j] = arr[mid + 1 + j];
        }

        // Merge the temporary arrays back into arr[left..right]
        int i = 0, j = 0, k = left;

        while (i < n1 && j < n2) {
            if (leftArray[i] <= rightArray[j]) {
                arr[k] = leftArray[i];
                i++;
            } else {
                arr[k] = rightArray[j];
                j++;
            }
            k++;
        }

        // Copy remaining elements of leftArray[]
        while (i < n1) {
            arr[k] = leftArray[i];
            i++;
            k++;
        }

        // Copy remaining elements of rightArray[]
        while (j < n2) {
            arr[k] = rightArray[j];
            j++;
            k++;
        }
    }

    /**
     * @function mergeSortIterative
     * @description Iterative implementation of merge sort
     * @param arr int[] - Array to be sorted
     * @returns void
     */
    public static void mergeSortIterative(int[] arr) {
        if (arr == null || arr.length <= 1) {
            return;
        }

        int n = arr.length;

        // For current size of subarrays to be merged
        for (int currentSize = 1; currentSize < n; currentSize *= 2) {
            // For picking starting index of different subarrays
            for (int leftStart = 0; leftStart < n; leftStart += 2 * currentSize) {
                // Find ending point of left subarray
                int mid = Math.min(leftStart + currentSize - 1, n - 1);

                // Find starting point of right subarray
                int rightEnd = Math.min(leftStart + 2 * currentSize - 1, n - 1);

                // Merge subarrays arr[leftStart...mid] & arr[mid+1...rightEnd]
                merge(arr, leftStart, mid, rightEnd);
            }
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
     * @function testMergeSort
     * @description Test function to demonstrate merge sort
     * @returns void
     */
    public static void testMergeSort() {
        System.out.println("=== Merge Sort Test ===");

        // Test case 1: Random array
        int[] arr1 = { 64, 34, 25, 12, 22, 11, 90 };
        System.out.println("Original array: " + Arrays.toString(arr1));
        mergeSort(arr1);
        System.out.println("Sorted array: " + Arrays.toString(arr1));
        System.out.println();

        // Test case 2: Already sorted array
        int[] arr2 = { 1, 2, 3, 4, 5 };
        System.out.println("Already sorted array: " + Arrays.toString(arr2));
        mergeSort(arr2);
        System.out.println("After sorting: " + Arrays.toString(arr2));
        System.out.println();

        // Test case 3: Reverse sorted array
        int[] arr3 = { 5, 4, 3, 2, 1 };
        System.out.println("Reverse sorted array: " + Arrays.toString(arr3));
        mergeSort(arr3);
        System.out.println("After sorting: " + Arrays.toString(arr3));
        System.out.println();

        // Test case 4: Array with duplicates
        int[] arr4 = { 3, 1, 4, 1, 5, 9, 2, 6, 5 };
        System.out.println("Array with duplicates: " + Arrays.toString(arr4));
        mergeSort(arr4);
        System.out.println("After sorting: " + Arrays.toString(arr4));
        System.out.println();

        // Test case 5: Iterative Merge Sort
        int[] arr5 = { 7, 2, 1, 6, 8, 5, 3, 4 };
        System.out.println("Testing Iterative Merge Sort:");
        System.out.println("Original array: " + Arrays.toString(arr5));
        mergeSortIterative(arr5);
        System.out.println("Sorted array: " + Arrays.toString(arr5));
        System.out.println();
    }

    /**
     * @function performanceTest
     * @description Performance test for merge sort
     * @returns void
     */
    public static void performanceTest() {
        System.out.println("=== Performance Test ===");

        int[] sizes = { 100, 500, 1000, 2000, 5000 };

        for (int size : sizes) {
            int[] arr = new int[size];
            // Fill with random numbers
            for (int i = 0; i < size; i++) {
                arr[i] = (int) (Math.random() * 1000);
            }

            long startTime = System.nanoTime();
            mergeSort(arr);
            long endTime = System.nanoTime();

            double duration = (endTime - startTime) / 1_000_000.0; // Convert to milliseconds
            System.out.printf("Array size %d: %.2f ms%n", size, duration);
        }
    }

    /**
     * @function main
     * @description Main method to run the merge sort demonstration
     * @param args String[] - Command line arguments
     * @returns void
     */
    public static void main(String[] args) {
        System.out.println("Merge Sort Algorithm Implementation");
        System.out.println("===================================");

        // Run basic tests
        testMergeSort();

        // Run performance test
        performanceTest();

        System.out.println("\nMerge Sort completed successfully!");
    }
}
