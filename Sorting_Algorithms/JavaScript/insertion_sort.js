/**
 * @file insertion_sort.js
 * @description Implementation of Insertion Sort algorithm in JavaScript
 * @author Algorithm Collection
 * @version 1.0
 */

/**
 * @function insertionSort
 * @description Sorts an array using insertion sort algorithm
 * @param {number[]} arr - Array to be sorted
 * @returns {number[]} - Sorted array
 */
const insertionSort = (arr) => {
    const n = arr.length;
    
    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;
        
        // Move elements of arr[0..i-1] that are greater than key
        // to one position ahead of their current position
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
    return arr;
};

/**
 * @function insertionSortRecursive
 * @description Recursive implementation of insertion sort
 * @param {number[]} arr - Array to be sorted
 * @param {number} n - Number of elements to sort
 * @returns {number[]} - Sorted array
 */
const insertionSortRecursive = (arr, n = arr.length) => {
    // Base case
    if (n <= 1) {
        return arr;
    }
    
    // Sort first n-1 elements
    insertionSortRecursive(arr, n - 1);
    
    // Insert last element at its correct position
    const last = arr[n - 1];
    let j = n - 2;
    
    while (j >= 0 && arr[j] > last) {
        arr[j + 1] = arr[j];
        j--;
    }
    arr[j + 1] = last;
    
    return arr;
};

/**
 * @function insertionSortWithCallback
 * @description Insertion sort with custom comparison function
 * @param {any[]} arr - Array to be sorted
 * @param {Function} compareFn - Comparison function
 * @returns {any[]} - Sorted array
 */
const insertionSortWithCallback = (arr, compareFn = (a, b) => a - b) => {
    const n = arr.length;
    
    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;
        
        while (j >= 0 && compareFn(arr[j], key) > 0) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
    return arr;
};

/**
 * @function binaryInsertionSort
 * @description Binary insertion sort using binary search to find insertion position
 * @param {number[]} arr - Array to be sorted
 * @returns {number[]} - Sorted array
 */
const binaryInsertionSort = (arr) => {
    const n = arr.length;
    
    for (let i = 1; i < n; i++) {
        const key = arr[i];
        const pos = binarySearchPosition(arr, key, 0, i - 1);
        
        // Shift elements to make space
        for (let j = i - 1; j >= pos; j--) {
            arr[j + 1] = arr[j];
        }
        arr[pos] = key;
    }
    return arr;
};

/**
 * @function binarySearchPosition
 * @description Binary search to find insertion position
 * @param {number[]} arr - Array to search in
 * @param {number} key - Key to insert
 * @param {number} left - Left boundary
 * @param {number} right - Right boundary
 * @returns {number} - Insertion position
 */
const binarySearchPosition = (arr, key, left, right) => {
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        
        if (arr[mid] <= key) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return left;
};

/**
 * @function insertionSortOptimized
 * @description Optimized insertion sort with early termination
 * @param {number[]} arr - Array to be sorted
 * @returns {number[]} - Sorted array
 */
const insertionSortOptimized = (arr) => {
    const n = arr.length;
    
    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;
        
        // Use binary search to find insertion point
        const insertPos = binarySearchPosition(arr, key, 0, j);
        
        // Shift elements
        for (let k = i; k > insertPos; k--) {
            arr[k] = arr[k - 1];
        }
        arr[insertPos] = key;
    }
    return arr;
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
 * @function testInsertionSort
 * @description Test function to demonstrate insertion sort
 * @returns {void}
 */
const testInsertionSort = () => {
    console.log('=== Insertion Sort Test ===');
    
    // Test case 1: Random array
    let arr1 = [64, 34, 25, 12, 22, 11, 90];
    console.log('Original array:', arr1);
    insertionSort([...arr1]);
    console.log('Sorted array:', arr1);
    console.log();
    
    // Test case 2: Already sorted array
    let arr2 = [1, 2, 3, 4, 5];
    console.log('Already sorted array:', arr2);
    insertionSort([...arr2]);
    console.log('After sorting:', arr2);
    console.log();
    
    // Test case 3: Reverse sorted array
    let arr3 = [5, 4, 3, 2, 1];
    console.log('Reverse sorted array:', arr3);
    insertionSort([...arr3]);
    console.log('After sorting:', arr3);
    console.log();
    
    // Test case 4: Array with duplicates
    let arr4 = [3, 1, 4, 1, 5, 9, 2, 6, 5];
    console.log('Array with duplicates:', arr4);
    insertionSort([...arr4]);
    console.log('After sorting:', arr4);
    console.log();
    
    // Test case 5: Recursive insertion sort
    let arr5 = [7, 2, 1, 6, 8, 5, 3, 4];
    console.log('Testing Recursive Insertion Sort:');
    console.log('Original array:', arr5);
    insertionSortRecursive([...arr5]);
    console.log('Sorted array:', arr5);
    console.log();
    
    // Test case 6: Binary insertion sort
    let arr6 = [9, 3, 7, 1, 5, 8, 2, 6, 4];
    console.log('Testing Binary Insertion Sort:');
    console.log('Original array:', arr6);
    binaryInsertionSort([...arr6]);
    console.log('Sorted array:', arr6);
    console.log();
    
    // Test case 7: String array
    let arr7 = ['banana', 'apple', 'cherry', 'date'];
    console.log('String array:', arr7);
    insertionSortWithCallback([...arr7], (a, b) => a.localeCompare(b));
    console.log('Sorted string array:', arr7);
    console.log();
};

/**
 * @function performanceTest
 * @description Performance test for insertion sort
 * @returns {void}
 */
const performanceTest = () => {
    console.log('=== Performance Test ===');
    
    const sizes = [100, 500, 1000, 2000];
    
    sizes.forEach(size => {
        const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
        
        const startTime = performance.now();
        insertionSort([...arr]);
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
    
    // Test insertion sort
    let insertionTime = 0;
    for (let i = 0; i < iterations; i++) {
        const arr = [...testArray];
        const start = performance.now();
        insertionSort(arr);
        const end = performance.now();
        insertionTime += (end - start);
    }
    
    // Test binary insertion sort
    let binaryTime = 0;
    for (let i = 0; i < iterations; i++) {
        const arr = [...testArray];
        const start = performance.now();
        binaryInsertionSort(arr);
        const end = performance.now();
        binaryTime += (end - start);
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
    
    console.log(`Insertion Sort average: ${(insertionTime / iterations).toFixed(2)} ms`);
    console.log(`Binary Insertion Sort average: ${(binaryTime / iterations).toFixed(2)} ms`);
    console.log(`Built-in Sort average: ${(builtinTime / iterations).toFixed(2)} ms`);
    console.log(`Insertion vs Built-in ratio: ${(insertionTime / builtinTime).toFixed(2)}x slower`);
};

// Main execution
if (require.main === module) {
    console.log('Insertion Sort Algorithm Implementation');
    console.log('======================================');
    
    // Run basic tests
    testInsertionSort();
    
    // Run performance test
    performanceTest();
    
    // Run benchmark comparison
    benchmarkComparison();
    
    console.log('\nInsertion Sort completed successfully!');
}

// Export functions for use in other modules
module.exports = {
    insertionSort,
    insertionSortRecursive,
    insertionSortWithCallback,
    binaryInsertionSort,
    insertionSortOptimized,
    printArray,
    testInsertionSort,
    performanceTest,
    generateRandomArray,
    isSorted,
    benchmarkComparison
};
