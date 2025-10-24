
/**
 * @file heap_sort.java
 * @description Implementation of Heap Sort algorithm in Java
 * @author Algorithm Collection
 * @version 1.0
 */

import java.util.Arrays;

/**
 * @class HeapSort
 * @description Class containing Heap Sort algorithm implementation
 */
public class heap_sort {

    /**
     * @function heapSort
     * @description Sorts an array using heap sort algorithm
     * @param arr int[] - Array to be sorted
     * @returns void - Sorts the array in place
     */
    public static void heapSort(int[] arr) {
        int n = arr.length;

        // Build heap (rearrange array)
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }

        // One by one extract an element from heap
        for (int i = n - 1; i > 0; i--) {
            // Move current root to end
            swap(arr, 0, i);

            // Call max heapify on the reduced heap
            heapify(arr, i, 0);
        }
    }

    /**
     * @function heapify
     * @description To heapify a subtree rooted with node i which is an index in
     *              arr[]
     * @param arr int[] - Array to heapify
     * @param n   int - Size of heap
     * @param i   int - Index of root node
     * @returns void
     */
    private static void heapify(int[] arr, int n, int i) {
        int largest = i; // Initialize largest as root
        int left = 2 * i + 1; // Left child
        int right = 2 * i + 2; // Right child

        // If left child is larger than root
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }

        // If right child is larger than largest so far
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }

        // If largest is not root
        if (largest != i) {
            swap(arr, i, largest);

            // Recursively heapify the affected sub-tree
            heapify(arr, n, largest);
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
     * @function heapSortMinHeap
     * @description Sorts an array using min heap (descending order)
     * @param arr int[] - Array to be sorted
     * @returns void - Sorts the array in place
     */
    public static void heapSortMinHeap(int[] arr) {
        int n = arr.length;

        // Build min heap
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapifyMin(arr, n, i);
        }

        // Extract elements from heap one by one
        for (int i = n - 1; i > 0; i--) {
            swap(arr, 0, i);
            heapifyMin(arr, i, 0);
        }
    }

    /**
     * @function heapifyMin
     * @description To heapify a subtree rooted with node i for min heap
     * @param arr int[] - Array to heapify
     * @param n   int - Size of heap
     * @param i   int - Index of root node
     * @returns void
     */
    private static void heapifyMin(int[] arr, int n, int i) {
        int smallest = i; // Initialize smallest as root
        int left = 2 * i + 1; // Left child
        int right = 2 * i + 2; // Right child

        // If left child is smaller than root
        if (left < n && arr[left] < arr[smallest]) {
            smallest = left;
        }

        // If right child is smaller than smallest so far
        if (right < n && arr[right] < arr[smallest]) {
            smallest = right;
        }

        // If smallest is not root
        if (smallest != i) {
            swap(arr, i, smallest);
            heapifyMin(arr, n, smallest);
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
     * @function testHeapSort
     * @description Test function to demonstrate heap sort
     * @returns void
     */
    public static void testHeapSort() {
        System.out.println("=== Heap Sort Test ===");

        // Test case 1: Random array
        int[] arr1 = { 64, 34, 25, 12, 22, 11, 90 };
        System.out.println("Original array: " + Arrays.toString(arr1));
        heapSort(arr1);
        System.out.println("Sorted array: " + Arrays.toString(arr1));
        System.out.println();

        // Test case 2: Already sorted array
        int[] arr2 = { 1, 2, 3, 4, 5 };
        System.out.println("Already sorted array: " + Arrays.toString(arr2));
        heapSort(arr2);
        System.out.println("After sorting: " + Arrays.toString(arr2));
        System.out.println();

        // Test case 3: Reverse sorted array
        int[] arr3 = { 5, 4, 3, 2, 1 };
        System.out.println("Reverse sorted array: " + Arrays.toString(arr3));
        heapSort(arr3);
        System.out.println("After sorting: " + Arrays.toString(arr3));
        System.out.println();

        // Test case 4: Array with duplicates
        int[] arr4 = { 3, 1, 4, 1, 5, 9, 2, 6, 5 };
        System.out.println("Array with duplicates: " + Arrays.toString(arr4));
        heapSort(arr4);
        System.out.println("After sorting: " + Arrays.toString(arr4));
        System.out.println();

        // Test case 5: Min heap sort (descending order)
        int[] arr5 = { 7, 2, 1, 6, 8, 5, 3, 4 };
        System.out.println("Testing Min Heap Sort (descending order):");
        System.out.println("Original array: " + Arrays.toString(arr5));
        heapSortMinHeap(arr5);
        System.out.println("Sorted array: " + Arrays.toString(arr5));
        System.out.println();
    }

    /**
     * @function performanceTest
     * @description Performance test for heap sort
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
            heapSort(arr);
            long endTime = System.nanoTime();

            double duration = (endTime - startTime) / 1_000_000.0; // Convert to milliseconds
            System.out.printf("Array size %d: %.2f ms%n", size, duration);
        }
    }

    /**
     * @function main
     * @description Main method to run the heap sort demonstration
     * @param args String[] - Command line arguments
     * @returns void
     */
    public static void main(String[] args) {
        System.out.println("Heap Sort Algorithm Implementation");
        System.out.println("==================================");

        // Run basic tests
        testHeapSort();

        // Run performance test
        performanceTest();

        System.out.println("\nHeap Sort completed successfully!");
    }
}
