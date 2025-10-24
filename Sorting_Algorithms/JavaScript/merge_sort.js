/**
 * @file merge_sort.js
 * @description Implementation of Merge Sort algorithm in JavaScript
 * @author Algorithm Collection
 * @version 1.0
 */

/**
 * @function mergeSort
 * @description Sorts an array using merge sort algorithm
 * @param {number[]} arr - Array to be sorted
 * @returns {number[]} - Sorted array
 */
const mergeSort = (arr) => {
    if (!arr || arr.length <= 1) {
        return arr;
    }
    
    const sortedArr = [...arr]; // Create a copy to avoid mutating original
    mergeSortHelper(sortedArr, 0, sortedArr.length - 1);
    return sortedArr;
};

/**
 * @function mergeSortHelper
 * @description Recursive merge sort implementation
 * @param {number[]} arr - Array to be sorted
 * @param {number} left - Starting index
 * @param {number} right - Ending index
 * @returns {void}
 */
const mergeSortHelper = (arr, left, right) => {
    if (left < right) {
        // Find the middle point
        const mid = Math.floor(left + (right - left) / 2);
        
        // Sort first and second halves
        mergeSortHelper(arr, left, mid);
        mergeSortHelper(arr, mid + 1, right);
        
        // Merge the sorted halves
        merge(arr, left, mid, right);
    }
};

/**
 * @function merge
 * @description Merges two sorted subarrays
 * @param {number[]} arr - Array containing subarrays
 * @param {number} left - Starting index of first subarray
 * @param {number} mid - Ending index of first subarray
 * @param {number} right - Ending index of second subarray
 * @returns {void}
 */
const merge = (arr, left, mid, right) => {
    // Find sizes of two subarrays to be merged
    const n1 = mid - left + 1;
    const n2 = right - mid;
    
    // Create temporary arrays
    const leftArray = new Array(n1);
    const rightArray = new Array(n2);
    
    // Copy data to temporary arrays
    for (let i = 0; i < n1; i++) {
        leftArray[i] = arr[left + i];
    }
    for (let j = 0; j < n2; j++) {
        rightArray[j] = arr[mid + 1 + j];
    }
    
    // Merge the temporary arrays back into arr[left..right]
    let i = 0, j = 0, k = left;
    
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
};

/**
 * @function mergeSortIterative
 * @description Iterative implementation of merge sort
 * @param {number[]} arr - Array to be sorted
 * @returns {number[]} - Sorted array
 */
const mergeSortIterative = (arr) => {
    if (!arr || arr.length <= 1) {
        return arr;
    }
    
    const sortedArr = [...arr];
    const n = sortedArr.length;
    
    // For current size of subarrays to be merged
    for (let currentSize = 1; currentSize < n; currentSize *= 2) {
        // For picking starting index of different subarrays
        for (let leftStart = 0; leftStart < n; leftStart += 2 * currentSize) {
            // Find ending point of left subarray
            const mid = Math.min(leftStart + currentSize - 1, n - 1);
            
            // Find starting point of right subarray
            const rightEnd = Math.min(leftStart + 2 * currentSize - 1, n - 1);
            
            // Merge subarrays arr[leftStart...mid] & arr[mid+1...rightEnd]
            merge(sortedArr, leftStart, mid, rightEnd);
        }
    }
    
    return sortedArr;
};

/**
 * @function mergeSortWithCallback
 * @description Merge sort with comparison callback for custom sorting
 * @param {any[]} arr - Array to be sorted
 * @param {Function} compareFn - Comparison function
 * @returns {any[]} - Sorted array
 */
const mergeSortWithCallback = (arr, compareFn = (a, b) => a - b) => {
    if (!arr || arr.length <= 1) {
        return arr;
    }
    
    const sortedArr = [...arr];
    mergeSortWithCallbackHelper(sortedArr, 0, sortedArr.length - 1, compareFn);
    return sortedArr;
};

/**
 * @function mergeSortWithCallbackHelper
 * @description Helper function for merge sort with callback
 * @param {any[]} arr - Array to be sorted
 * @param {number} left - Starting index
 * @param {number} right - Ending index
 * @param {Function} compareFn - Comparison function
 * @returns {void}
 */
const mergeSortWithCallbackHelper = (arr, left, right, compareFn) => {
    if (left < right) {
        const mid = Math.floor(left + (right - left) / 2);
        mergeSortWithCallbackHelper(arr, left, mid, compareFn);
        mergeSortWithCallbackHelper(arr, mid + 1, right, compareFn);
        mergeWithCallback(arr, left, mid, right, compareFn);
    }
};

/**
 * @function mergeWithCallback
 * @description Merge function with custom comparison
 * @param {any[]} arr - Array containing subarrays
 * @param {number} left - Starting index of first subarray
 * @param {number} mid - Ending index of first subarray
 * @param {number} right - Ending index of second subarray
 * @param {Function} compareFn - Comparison function
 * @returns {void}
 */
const mergeWithCallback = (arr, left, mid, right, compareFn) => {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    
    const leftArray = new Array(n1);
    const rightArray = new Array(n2);
    
    for (let i = 0; i < n1; i++) {
        leftArray[i] = arr[left + i];
    }
    for (let j = 0; j < n2; j++) {
        rightArray[j] = arr[mid + 1 + j];
    }
    
    let i = 0, j = 0, k = left;
    
    while (i < n1 && j < n2) {
        if (compareFn(leftArray[i], rightArray[j]) <= 0) {
            arr[k] = leftArray[i];
            i++;
        } else {
            arr[k] = rightArray[j];
            j++;
        }
        k++;
    }
    
    while (i < n1) {
        arr[k] = leftArray[i];
        i++;
        k++;
    }
    
    while (j < n2) {
        arr[k] = rightArray[j];
        j++;
        k++;
    }
};

/**
 * @function printArray
 * @description Prints the elements of an array
 * @param {number[]} arr - Array to be printed
 * @returns {void}
 */
const printArray = (arr) => {
    console.log(arr.join(' '));
};

/**
 * @function testMergeSort
 * @description Test function to demonstrate merge sort
 * @returns {void}
 */
const testMergeSort = () => {
    console.log('=== Merge Sort Test ===');
    
    // Test case 1: Random array
    let arr1 = [64, 34, 25, 12, 22, 11, 90];
    console.log('Original array:', arr1);
    const sorted1 = mergeSort(arr1);
    console.log('Sorted array:', sorted1);
    console.log();
    
    // Test case 2: Already sorted array
    let arr2 = [1, 2, 3, 4, 5];
    console.log('Already sorted array:', arr2);
    const sorted2 = mergeSort(arr2);
    console.log('After sorting:', sorted2);
    console.log();
    
    // Test case 3: Reverse sorted array
    let arr3 = [5, 4, 3, 2, 1];
    console.log('Reverse sorted array:', arr3);
    const sorted3 = mergeSort(arr3);
    console.log('After sorting:', sorted3);
    console.log();
    
    // Test case 4: Array with duplicates
    let arr4 = [3, 1, 4, 1, 5, 9, 2, 6, 5];
    console.log('Array with duplicates:', arr4);
    const sorted4 = mergeSort(arr4);
    console.log('After sorting:', sorted4);
    console.log();
    
    // Test case 5: Iterative Merge Sort
    let arr5 = [7, 2, 1, 6, 8, 5, 3, 4];
    console.log('Testing Iterative Merge Sort:');
    console.log('Original array:', arr5);
    const sorted5 = mergeSortIterative(arr5);
    console.log('Sorted array:', sorted5);
    console.log();
    
    // Test case 6: String array
    let arr6 = ['banana', 'apple', 'cherry', 'date'];
    console.log('String array:', arr6);
    const sorted6 = mergeSortWithCallback(arr6, (a, b) => a.localeCompare(b));
    console.log('Sorted string array:', sorted6);
    console.log();
};

/**
 * @function performanceTest
 * @description Performance test for merge sort
 * @returns {void}
 */
const performanceTest = () => {
    console.log('=== Performance Test ===');
    
    const sizes = [100, 500, 1000, 2000, 5000];
    
    sizes.forEach(size => {
        const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
        
        const startTime = performance.now();
        mergeSort(arr);
        const endTime = performance.now();
        
        const duration = endTime - startTime;
        console.log(`Array size ${size}: ${duration.toFixed(2)} ms`);
    });
};

/**
 * @function generateRandomArray
 * @description Generates a random array of specified size
 * @param {number} size - Size of the array
 * @param {number} max - Maximum value for random numbers
 * @returns {number[]} - Random array
 */
const generateRandomArray = (size, max = 1000) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * max));
};

/**
 * @function isSorted
 * @description Checks if an array is sorted
 * @param {number[]} arr - Array to check
 * @returns {boolean} - True if sorted, false otherwise
 */
const isSorted = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false;
        }
    }
    return true;
};

/**
 * @function benchmarkComparison
 * @description Compares performance of different sorting algorithms
 * @returns {void}
 */
const benchmarkComparison = () => {
    console.log('=== Benchmark Comparison ===');
    
    const testArray = generateRandomArray(1000);
    const iterations = 10;
    
    // Test merge sort
    let mergeTime = 0;
    for (let i = 0; i < iterations; i++) {
        const arr = [...testArray];
        const start = performance.now();
        mergeSort(arr);
        const end = performance.now();
        mergeTime += (end - start);
    }
    
    // Test iterative merge sort
    let iterativeTime = 0;
    for (let i = 0; i < iterations; i++) {
        const arr = [...testArray];
        const start = performance.now();
        mergeSortIterative(arr);
        const end = performance.now();
        iterativeTime += (end - start);
    }
    
    // Test JavaScript built-in sort
    let builtinTime = 0;
    for (let i = 0; i < iterations; i++) {
        const arr = [...testArray];
        const start = performance.now();
        arr.sort((a, b) => a - b);
        const end = performance.now();
        builtinTime += (end - start);
    }
    
    console.log(`Merge Sort average: ${(mergeTime / iterations).toFixed(2)} ms`);
    console.log(`Iterative Merge Sort average: ${(iterativeTime / iterations).toFixed(2)} ms`);
    console.log(`Built-in Sort average: ${(builtinTime / iterations).toFixed(2)} ms`);
    console.log(`Merge Sort vs Built-in ratio: ${(mergeTime / builtinTime).toFixed(2)}x`);
};

// Main execution
if (require.main === module) {
    console.log('Merge Sort Algorithm Implementation');
    console.log('===================================');
    
    // Run basic tests
    testMergeSort();
    
    // Run performance test
    performanceTest();
    
    // Run benchmark comparison
    benchmarkComparison();
    
    console.log('\nMerge Sort completed successfully!');
}

// Export functions for use in other modules
module.exports = {
    mergeSort,
    mergeSortIterative,
    mergeSortWithCallback,
    printArray,
    testMergeSort,
    performanceTest,
    generateRandomArray,
    isSorted,
    benchmarkComparison
};
