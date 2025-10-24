/**
 * @file quick_sort.js
 * @description Implementation of Quick Sort algorithm in JavaScript
 * @author Algorithm Collection
 * @version 1.0
 */

/**
 * @function quickSort
 * @description Sorts an array using quick sort algorithm
 * @param {number[]} arr - Array to be sorted
 * @returns {number[]} - Sorted array
 */
const quickSort = (arr) => {
    if (!arr || arr.length <= 1) {
        return arr;
    }
    
    const sortedArr = [...arr]; // Create a copy to avoid mutating original
    quickSortHelper(sortedArr, 0, sortedArr.length - 1);
    return sortedArr;
};

/**
 * @function quickSortHelper
 * @description Recursive quick sort implementation
 * @param {number[]} arr - Array to be sorted
 * @param {number} low - Starting index
 * @param {number} high - Ending index
 * @returns {void}
 */
const quickSortHelper = (arr, low, high) => {
    if (low < high) {
        // Partition the array and get pivot index
        const pivotIndex = partition(arr, low, high);
        
        // Recursively sort elements before and after partition
        quickSortHelper(arr, low, pivotIndex - 1);
        quickSortHelper(arr, pivotIndex + 1, high);
    }
};

/**
 * @function partition
 * @description Partitions the array around a pivot element
 * @param {number[]} arr - Array to be partitioned
 * @param {number} low - Starting index
 * @param {number} high - Ending index
 * @returns {number} - Final position of pivot element
 */
const partition = (arr, low, high) => {
    // Choose the rightmost element as pivot
    const pivot = arr[high];
    
    // Index of smaller element (indicates right position of pivot)
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        // If current element is smaller than or equal to pivot
        if (arr[j] <= pivot) {
            i++;
            swap(arr, i, j);
        }
    }
    
    // Place pivot in correct position
    swap(arr, i + 1, high);
    return i + 1;
};

/**
 * @function swap
 * @description Swaps two elements in an array
 * @param {number[]} arr - Array containing elements
 * @param {number} i - First index
 * @param {number} j - Second index
 * @returns {void}
 */
const swap = (arr, i, j) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
};

/**
 * @function randomizedQuickSort
 * @description Randomized version of quick sort for better average performance
 * @param {number[]} arr - Array to be sorted
 * @returns {number[]} - Sorted array
 */
const randomizedQuickSort = (arr) => {
    if (!arr || arr.length <= 1) {
        return arr;
    }
    
    const sortedArr = [...arr]; // Create a copy to avoid mutating original
    randomizedQuickSortHelper(sortedArr, 0, sortedArr.length - 1);
    return sortedArr;
};

/**
 * @function randomizedQuickSortHelper
 * @description Recursive randomized quick sort implementation
 * @param {number[]} arr - Array to be sorted
 * @param {number} low - Starting index
 * @param {number} high - Ending index
 * @returns {void}
 */
const randomizedQuickSortHelper = (arr, low, high) => {
    if (low < high) {
        // Randomly select pivot and swap with last element
        const randomIndex = low + Math.floor(Math.random() * (high - low + 1));
        swap(arr, randomIndex, high);
        
        // Partition the array
        const pivotIndex = partition(arr, low, high);
        
        // Recursively sort elements before and after partition
        randomizedQuickSortHelper(arr, low, pivotIndex - 1);
        randomizedQuickSortHelper(arr, pivotIndex + 1, high);
    }
};

/**
 * @function quickSortWithCallback
 * @description Quick sort with comparison callback for custom sorting
 * @param {any[]} arr - Array to be sorted
 * @param {Function} compareFn - Comparison function
 * @returns {any[]} - Sorted array
 */
const quickSortWithCallback = (arr, compareFn = (a, b) => a - b) => {
    if (!arr || arr.length <= 1) {
        return arr;
    }
    
    const sortedArr = [...arr];
    quickSortWithCallbackHelper(sortedArr, 0, sortedArr.length - 1, compareFn);
    return sortedArr;
};

/**
 * @function quickSortWithCallbackHelper
 * @description Helper function for quick sort with callback
 * @param {any[]} arr - Array to be sorted
 * @param {number} low - Starting index
 * @param {number} high - Ending index
 * @param {Function} compareFn - Comparison function
 * @returns {void}
 */
const quickSortWithCallbackHelper = (arr, low, high, compareFn) => {
    if (low < high) {
        const pivotIndex = partitionWithCallback(arr, low, high, compareFn);
        quickSortWithCallbackHelper(arr, low, pivotIndex - 1, compareFn);
        quickSortWithCallbackHelper(arr, pivotIndex + 1, high, compareFn);
    }
};

/**
 * @function partitionWithCallback
 * @description Partition function with custom comparison
 * @param {any[]} arr - Array to be partitioned
 * @param {number} low - Starting index
 * @param {number} high - Ending index
 * @param {Function} compareFn - Comparison function
 * @returns {number} - Final position of pivot element
 */
const partitionWithCallback = (arr, low, high, compareFn) => {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (compareFn(arr[j], pivot) <= 0) {
            i++;
            swap(arr, i, j);
        }
    }
    
    swap(arr, i + 1, high);
    return i + 1;
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
 * @function testQuickSort
 * @description Test function to demonstrate quick sort
 * @returns {void}
 */
const testQuickSort = () => {
    console.log('=== Quick Sort Test ===');
    
    // Test case 1: Random array
    let arr1 = [64, 34, 25, 12, 22, 11, 90];
    console.log('Original array:', arr1);
    const sorted1 = quickSort(arr1);
    console.log('Sorted array:', sorted1);
    console.log();
    
    // Test case 2: Already sorted array
    let arr2 = [1, 2, 3, 4, 5];
    console.log('Already sorted array:', arr2);
    const sorted2 = quickSort(arr2);
    console.log('After sorting:', sorted2);
    console.log();
    
    // Test case 3: Reverse sorted array
    let arr3 = [5, 4, 3, 2, 1];
    console.log('Reverse sorted array:', arr3);
    const sorted3 = quickSort(arr3);
    console.log('After sorting:', sorted3);
    console.log();
    
    // Test case 4: Array with duplicates
    let arr4 = [3, 1, 4, 1, 5, 9, 2, 6, 5];
    console.log('Array with duplicates:', arr4);
    const sorted4 = quickSort(arr4);
    console.log('After sorting:', sorted4);
    console.log();
    
    // Test case 5: Randomized Quick Sort
    let arr5 = [7, 2, 1, 6, 8, 5, 3, 4];
    console.log('Testing Randomized Quick Sort:');
    console.log('Original array:', arr5);
    const sorted5 = randomizedQuickSort(arr5);
    console.log('Sorted array:', sorted5);
    console.log();
    
    // Test case 6: String array
    let arr6 = ['banana', 'apple', 'cherry', 'date'];
    console.log('String array:', arr6);
    const sorted6 = quickSortWithCallback(arr6, (a, b) => a.localeCompare(b));
    console.log('Sorted string array:', sorted6);
    console.log();
};

/**
 * @function performanceTest
 * @description Performance test for quick sort
 * @returns {void}
 */
const performanceTest = () => {
    console.log('=== Performance Test ===');
    
    const sizes = [100, 500, 1000, 2000, 5000];
    
    sizes.forEach(size => {
        const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
        
        const startTime = performance.now();
        quickSort(arr);
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
    
    // Test quick sort
    let quickTime = 0;
    for (let i = 0; i < iterations; i++) {
        const arr = [...testArray];
        const start = performance.now();
        quickSort(arr);
        const end = performance.now();
        quickTime += (end - start);
    }
    
    // Test randomized quick sort
    let randomizedTime = 0;
    for (let i = 0; i < iterations; i++) {
        const arr = [...testArray];
        const start = performance.now();
        randomizedQuickSort(arr);
        const end = performance.now();
        randomizedTime += (end - start);
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
    
    console.log(`Quick Sort average: ${(quickTime / iterations).toFixed(2)} ms`);
    console.log(`Randomized Quick Sort average: ${(randomizedTime / iterations).toFixed(2)} ms`);
    console.log(`Built-in Sort average: ${(builtinTime / iterations).toFixed(2)} ms`);
    console.log(`Quick Sort vs Built-in ratio: ${(quickTime / builtinTime).toFixed(2)}x`);
};

// Main execution
if (require.main === module) {
    console.log('Quick Sort Algorithm Implementation');
    console.log('===================================');
    
    // Run basic tests
    testQuickSort();
    
    // Run performance test
    performanceTest();
    
    // Run benchmark comparison
    benchmarkComparison();
    
    console.log('\nQuick Sort completed successfully!');
}

// Export functions for use in other modules
module.exports = {
    quickSort,
    randomizedQuickSort,
    quickSortWithCallback,
    printArray,
    testQuickSort,
    performanceTest,
    generateRandomArray,
    isSorted,
    benchmarkComparison
};
