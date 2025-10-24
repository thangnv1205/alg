
/**
 * @file interpolation_search.java
 * @description Implementation of Interpolation Search algorithm in Java
 * @author Algorithm Collection
 * @version 1.0
 */

import java.util.Arrays;

/**
 * @class InterpolationSearch
 * @description Class containing Interpolation Search algorithm implementation
 */
public class interpolation_search {

    /**
     * @function interpolationSearch
     * @description Searches for a target value in a sorted array using
     *              interpolation search
     * @param arr    int[] - Sorted array to search in
     * @param target int - Value to search for
     * @returns int - Index of target if found, -1 if not found
     */
    public static int interpolationSearch(int[] arr, int target) {
        if (arr == null || arr.length == 0) {
            return -1;
        }

        int left = 0;
        int right = arr.length - 1;

        while (left <= right && target >= arr[left] && target <= arr[right]) {
            // Calculate interpolation position
            int pos = left + ((target - arr[left]) * (right - left)) / (arr[right] - arr[left]);

            if (arr[pos] == target) {
                return pos;
            } else if (arr[pos] < target) {
                left = pos + 1;
            } else {
                right = pos - 1;
            }
        }

        return -1;
    }

    /**
     * @function interpolationSearchRecursive
     * @description Recursive implementation of interpolation search
     * @param arr    int[] - Sorted array to search in
     * @param target int - Value to search for
     * @returns int - Index of target if found, -1 if not found
     */
    public static int interpolationSearchRecursive(int[] arr, int target) {
        if (arr == null || arr.length == 0) {
            return -1;
        }
        return interpolationSearchRecursiveHelper(arr, target, 0, arr.length - 1);
    }

    /**
     * @function interpolationSearchRecursiveHelper
     * @description Recursive helper method for interpolation search
     * @param arr    int[] - Sorted array to search in
     * @param target int - Value to search for
     * @param left   int - Left boundary
     * @param right  int - Right boundary
     * @returns int - Index of target if found, -1 if not found
     */
    private static int interpolationSearchRecursiveHelper(int[] arr, int target, int left, int right) {
        if (left > right || target < arr[left] || target > arr[right]) {
            return -1;
        }

        // Calculate interpolation position
        int pos = left + ((target - arr[left]) * (right - left)) / (arr[right] - arr[left]);

        if (arr[pos] == target) {
            return pos;
        } else if (arr[pos] < target) {
            return interpolationSearchRecursiveHelper(arr, target, pos + 1, right);
        } else {
            return interpolationSearchRecursiveHelper(arr, target, left, pos - 1);
        }
    }

    /**
     * @function interpolationSearchWithCallback
     * @description Interpolation search with custom comparison function
     * @param arr       Object[] - Sorted array to search in
     * @param target    Object - Value to search for
     * @param compareFn Function - Comparison function
     * @param getValue  Function - Function to extract numeric value from object
     * @returns int - Index of target if found, -1 if not found
     */
    public static int interpolationSearchWithCallback(Object[] arr, Object target,
            java.util.function.BiFunction<Object, Object, Integer> compareFn,
            java.util.function.Function<Object, Integer> getValue) {
        if (arr == null || arr.length == 0) {
            return -1;
        }

        int left = 0;
        int right = arr.length - 1;
        int targetValue = getValue.apply(target);
        int leftValue = getValue.apply(arr[left]);
        int rightValue = getValue.apply(arr[right]);

        while (left <= right && targetValue >= leftValue && targetValue <= rightValue) {
            // Calculate interpolation position
            int pos = left + ((targetValue - leftValue) * (right - left)) / (rightValue - leftValue);

            int comparison = compareFn.apply(arr[pos], target);
            if (comparison == 0) {
                return pos;
            } else if (comparison < 0) {
                left = pos + 1;
                leftValue = getValue.apply(arr[left]);
            } else {
                right = pos - 1;
                rightValue = getValue.apply(arr[right]);
            }
        }

        return -1;
    }

    /**
     * @function interpolationSearchForDoubles
     * @description Interpolation search for double arrays
     * @param arr    double[] - Sorted array to search in
     * @param target double - Value to search for
     * @returns int - Index of target if found, -1 if not found
     */
    public static int interpolationSearchForDoubles(double[] arr, double target) {
        if (arr == null || arr.length == 0) {
            return -1;
        }

        int left = 0;
        int right = arr.length - 1;

        while (left <= right && target >= arr[left] && target <= arr[right]) {
            // Calculate interpolation position
            int pos = left + (int) (((target - arr[left]) * (right - left)) / (arr[right] - arr[left]));

            if (Math.abs(arr[pos] - target) < 1e-9) { // Use epsilon for double comparison
                return pos;
            } else if (arr[pos] < target) {
                left = pos + 1;
            } else {
                right = pos - 1;
            }
        }

        return -1;
    }

    /**
     * @function interpolationSearchWithBounds
     * @description Interpolation search with bounds checking
     * @param arr    int[] - Sorted array to search in
     * @param target int - Value to search for
     * @param left   int - Left boundary
     * @param right  int - Right boundary
     * @returns int - Index of target if found, -1 if not found
     */
    public static int interpolationSearchWithBounds(int[] arr, int target, int left, int right) {
        if (arr == null || arr.length == 0 || left < 0 || right >= arr.length || left > right) {
            return -1;
        }

        while (left <= right && target >= arr[left] && target <= arr[right]) {
            // Calculate interpolation position
            int pos = left + ((target - arr[left]) * (right - left)) / (arr[right] - arr[left]);

            if (arr[pos] == target) {
                return pos;
            } else if (arr[pos] < target) {
                left = pos + 1;
            } else {
                right = pos - 1;
            }
        }

        return -1;
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
     * @function testInterpolationSearch
     * @description Test function to demonstrate interpolation search
     * @returns void
     */
    public static void testInterpolationSearch() {
        System.out.println("=== Interpolation Search Test ===");

        // Test case 1: Basic search
        int[] arr1 = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
        int target1 = 5;
        System.out.println("Array: " + Arrays.toString(arr1));
        System.out.println("Searching for " + target1);
        int result1 = interpolationSearch(arr1, target1);
        System.out.println("Result: " + (result1 != -1 ? "Found at index " + result1 : "Not found"));
        System.out.println();

        // Test case 2: Search for non-existent element
        int target2 = 11;
        System.out.println("Searching for " + target2);
        int result2 = interpolationSearch(arr1, target2);
        System.out.println("Result: " + (result2 != -1 ? "Found at index " + result2 : "Not found"));
        System.out.println();

        // Test case 3: Recursive search
        int[] arr3 = { 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 };
        int target3 = 70;
        System.out.println("Array: " + Arrays.toString(arr3));
        System.out.println("Recursive search for " + target3);
        int result3 = interpolationSearchRecursive(arr3, target3);
        System.out.println("Result: " + (result3 != -1 ? "Found at index " + result3 : "Not found"));
        System.out.println();

        // Test case 4: Double array
        double[] arr4 = { 1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7, 8.8, 9.9, 10.0 };
        double target4 = 5.5;
        System.out.println("Double array: " + Arrays.toString(arr4));
        System.out.println("Searching for " + target4);
        int result4 = interpolationSearchForDoubles(arr4, target4);
        System.out.println("Result: " + (result4 != -1 ? "Found at index " + result4 : "Not found"));
        System.out.println();

        // Test case 5: With bounds
        int[] arr5 = { 1, 3, 5, 7, 9, 11, 13, 15, 17, 19 };
        int target5 = 13;
        System.out.println("Array: " + Arrays.toString(arr5));
        System.out.println("Searching for " + target5 + " in range [2, 8]");
        int result5 = interpolationSearchWithBounds(arr5, target5, 2, 8);
        System.out.println("Result: " + (result5 != -1 ? "Found at index " + result5 : "Not found"));
        System.out.println();
    }

    /**
     * @function performanceTest
     * @description Performance test for interpolation search
     * @returns void
     */
    public static void performanceTest() {
        System.out.println("=== Performance Test ===");

        int[] sizes = { 1000, 5000, 10000, 50000, 100000 };

        for (int size : sizes) {
            int[] arr = new int[size];
            // Fill with sequential numbers
            for (int i = 0; i < size; i++) {
                arr[i] = i;
            }

            // Test with target at different positions
            int[] targets = { 0, size / 4, size / 2, 3 * size / 4, size - 1 };

            for (int target : targets) {
                long startTime = System.nanoTime();
                interpolationSearch(arr, target);
                long endTime = System.nanoTime();

                double duration = (endTime - startTime) / 1_000_000.0; // Convert to milliseconds
                System.out.printf("Array size %d, target %d: %.4f ms%n", size, target, duration);
            }
        }
    }

    /**
     * @function main
     * @description Main method to run the interpolation search demonstration
     * @param args String[] - Command line arguments
     * @returns void
     */
    public static void main(String[] args) {
        System.out.println("Interpolation Search Algorithm Implementation");
        System.out.println("===========================================");

        // Run basic tests
        testInterpolationSearch();

        // Run performance test
        performanceTest();

        System.out.println("\nInterpolation Search completed successfully!");
    }
}
