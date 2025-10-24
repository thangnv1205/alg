
/**
 * @file bucket_sort.java
 * @description Implementation of Bucket Sort algorithm in Java
 * @author Algorithm Collection
 * @version 1.0
 */

import java.util.*;

/**
 * @class BucketSort
 * @description Class containing Bucket Sort algorithm implementation
 */
public class bucket_sort {

    /**
     * @function bucketSort
     * @description Sorts an array using bucket sort algorithm
     * @param arr double[] - Array to be sorted
     * @returns void - Sorts the array in place
     */
    public static void bucketSort(double[] arr) {
        if (arr.length == 0) {
            return;
        }

        // Find maximum and minimum values
        double max = Arrays.stream(arr).max().getAsDouble();
        double min = Arrays.stream(arr).min().getAsDouble();

        // Create buckets
        int bucketCount = arr.length;
        List<Double>[] buckets = new List[bucketCount];

        // Initialize buckets
        for (int i = 0; i < bucketCount; i++) {
            buckets[i] = new ArrayList<>();
        }

        // Distribute elements into buckets
        for (double value : arr) {
            int bucketIndex = (int) ((value - min) * (bucketCount - 1) / (max - min));
            buckets[bucketIndex].add(value);
        }

        // Sort each bucket
        for (List<Double> bucket : buckets) {
            Collections.sort(bucket);
        }

        // Concatenate buckets back into array
        int index = 0;
        for (List<Double> bucket : buckets) {
            for (double value : bucket) {
                arr[index++] = value;
            }
        }
    }

    /**
     * @function bucketSortInteger
     * @description Bucket sort for integer arrays
     * @param arr int[] - Array to be sorted
     * @returns void
     */
    public static void bucketSortInteger(int[] arr) {
        if (arr.length == 0) {
            return;
        }

        // Find maximum and minimum values
        int max = Arrays.stream(arr).max().getAsInt();
        int min = Arrays.stream(arr).min().getAsInt();

        // Create buckets
        int bucketCount = Math.max(1, arr.length / 10);
        List<Integer>[] buckets = new List[bucketCount];

        // Initialize buckets
        for (int i = 0; i < bucketCount; i++) {
            buckets[i] = new ArrayList<>();
        }

        // Distribute elements into buckets
        for (int value : arr) {
            int bucketIndex = (int) ((value - min) * (bucketCount - 1) / (max - min));
            buckets[bucketIndex].add(value);
        }

        // Sort each bucket
        for (List<Integer> bucket : buckets) {
            Collections.sort(bucket);
        }

        // Concatenate buckets back into array
        int index = 0;
        for (List<Integer> bucket : buckets) {
            for (int value : bucket) {
                arr[index++] = value;
            }
        }
    }

    /**
     * @function bucketSortWithCustomBuckets
     * @description Bucket sort with custom number of buckets
     * @param arr         double[] - Array to be sorted
     * @param bucketCount int - Number of buckets
     * @returns void
     */
    public static void bucketSortWithCustomBuckets(double[] arr, int bucketCount) {
        if (arr.length == 0) {
            return;
        }

        double max = Arrays.stream(arr).max().getAsDouble();
        double min = Arrays.stream(arr).min().getAsDouble();

        // Create buckets
        List<Double>[] buckets = new List[bucketCount];

        // Initialize buckets
        for (int i = 0; i < bucketCount; i++) {
            buckets[i] = new ArrayList<>();
        }

        // Distribute elements into buckets
        for (double value : arr) {
            int bucketIndex = (int) ((value - min) * (bucketCount - 1) / (max - min));
            buckets[bucketIndex].add(value);
        }

        // Sort each bucket
        for (List<Double> bucket : buckets) {
            Collections.sort(bucket);
        }

        // Concatenate buckets back into array
        int index = 0;
        for (List<Double> bucket : buckets) {
            for (double value : bucket) {
                arr[index++] = value;
            }
        }
    }

    /**
     * @function bucketSortForStrings
     * @description Bucket sort for string arrays
     * @param arr String[] - String array to be sorted
     * @returns void
     */
    public static void bucketSortForStrings(String[] arr) {
        if (arr.length == 0) {
            return;
        }

        // Find maximum length
        int maxLength = Arrays.stream(arr).mapToInt(String::length).max().getAsInt();

        // Create buckets for each character position
        List<String>[] buckets = new List[26]; // For lowercase letters

        // Initialize buckets
        for (int i = 0; i < 26; i++) {
            buckets[i] = new ArrayList<>();
        }

        // Sort by each character position from right to left
        for (int pos = maxLength - 1; pos >= 0; pos--) {
            // Clear buckets
            for (List<String> bucket : buckets) {
                bucket.clear();
            }

            // Distribute strings into buckets
            for (String s : arr) {
                if (pos < s.length()) {
                    char c = Character.toLowerCase(s.charAt(pos));
                    if (c >= 'a' && c <= 'z') {
                        buckets[c - 'a'].add(s);
                    } else {
                        buckets[0].add(s); // Put non-alphabetic characters in first bucket
                    }
                } else {
                    buckets[0].add(s); // Put shorter strings in first bucket
                }
            }

            // Concatenate buckets back into array
            int index = 0;
            for (List<String> bucket : buckets) {
                for (String s : bucket) {
                    arr[index++] = s;
                }
            }
        }
    }

    /**
     * @function bucketSortWithComparator
     * @description Bucket sort with custom comparator
     * @param arr        T[] - Array to be sorted
     * @param comparator Comparator - Custom comparator
     * @returns void
     */
    public static <T> void bucketSortWithComparator(T[] arr, Comparator<T> comparator) {
        if (arr.length == 0) {
            return;
        }

        // Create buckets
        int bucketCount = Math.max(1, arr.length / 10);
        List<T>[] buckets = new List[bucketCount];

        // Initialize buckets
        for (int i = 0; i < bucketCount; i++) {
            buckets[i] = new ArrayList<>();
        }

        // Distribute elements into buckets (simple hash)
        for (T value : arr) {
            int bucketIndex = Math.abs(value.hashCode()) % bucketCount;
            buckets[bucketIndex].add(value);
        }

        // Sort each bucket
        for (List<T> bucket : buckets) {
            bucket.sort(comparator);
        }

        // Concatenate buckets back into array
        int index = 0;
        for (List<T> bucket : buckets) {
            for (T value : bucket) {
                arr[index++] = value;
            }
        }
    }

    /**
     * @function printArray
     * @description Prints the elements of an array
     * @param arr double[] - Array to be printed
     * @returns void
     */
    public static void printArray(double[] arr) {
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }

    /**
     * @function testBucketSort
     * @description Test function to demonstrate bucket sort
     * @returns void
     */
    public static void testBucketSort() {
        System.out.println("=== Bucket Sort Test ===");

        // Test case 1: Double array
        double[] arr1 = { 0.897, 0.565, 0.656, 0.1234, 0.665, 0.3434 };
        System.out.println("Original array: " + Arrays.toString(arr1));
        bucketSort(arr1);
        System.out.println("Sorted array: " + Arrays.toString(arr1));
        System.out.println();

        // Test case 2: Integer array
        int[] arr2 = { 64, 34, 25, 12, 22, 11, 90 };
        System.out.println("Integer array: " + Arrays.toString(arr2));
        bucketSortInteger(arr2);
        System.out.println("Sorted array: " + Arrays.toString(arr2));
        System.out.println();

        // Test case 3: With custom buckets
        double[] arr3 = { 0.42, 0.32, 0.33, 0.52, 0.37, 0.47, 0.51 };
        System.out.println("Array with custom buckets: " + Arrays.toString(arr3));
        bucketSortWithCustomBuckets(arr3, 5);
        System.out.println("Sorted array: " + Arrays.toString(arr3));
        System.out.println();

        // Test case 4: String array
        String[] arr4 = { "word", "category", "apple", "banana", "cherry" };
        System.out.println("String array: " + Arrays.toString(arr4));
        bucketSortForStrings(arr4);
        System.out.println("Sorted string array: " + Arrays.toString(arr4));
        System.out.println();

        // Test case 5: With comparator
        Integer[] arr5 = { 64, 34, 25, 12, 22, 11, 90 };
        System.out.println("Array with comparator: " + Arrays.toString(arr5));
        bucketSortWithComparator(arr5, Integer::compareTo);
        System.out.println("Sorted array: " + Arrays.toString(arr5));
        System.out.println();
    }

    /**
     * @function performanceTest
     * @description Performance test for bucket sort
     * @returns void
     */
    public static void performanceTest() {
        System.out.println("=== Performance Test ===");

        int[] sizes = { 1000, 5000, 10000, 50000, 100000 };

        for (int size : sizes) {
            double[] arr = new double[size];
            // Fill with random numbers between 0 and 1
            for (int i = 0; i < size; i++) {
                arr[i] = Math.random();
            }

            long startTime = System.nanoTime();
            bucketSort(arr);
            long endTime = System.nanoTime();

            double duration = (endTime - startTime) / 1_000_000.0; // Convert to milliseconds
            System.out.printf("Array size %d: %.2f ms%n", size, duration);
        }
    }

    /**
     * @function main
     * @description Main method to run the bucket sort demonstration
     * @param args String[] - Command line arguments
     * @returns void
     */
    public static void main(String[] args) {
        System.out.println("Bucket Sort Algorithm Implementation");
        System.out.println("===================================");

        // Run basic tests
        testBucketSort();

        // Run performance test
        performanceTest();

        System.out.println("\nBucket Sort completed successfully!");
    }
}
