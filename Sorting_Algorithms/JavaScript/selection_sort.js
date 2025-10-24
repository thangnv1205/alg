/**
 * @file selection_sort.js
 * @description Implementation of Selection Sort algorithm in JavaScript
 * @author Algorithm Collection
 * @version 1.0
 */

/**
 * @function selectionSort
 * @description Sorts an array using selection sort algorithm
 * @param {number[]} arr - Array to be sorted
 * @returns {number[]} - Sorted array
 */
const selectionSort = (arr) => {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        // Find the minimum element in unsorted array
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap the found minimum element with the first element
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    return arr;
};

/**
 * @function selectionSortWithCallback
 * @description Selection sort with custom comparison function
 * @param {any[]} arr - Array to be sorted
 * @param {Function} compareFn - Comparison function
 * @returns {any[]} - Sorted array
 */
const selectionSortWithCallback = (arr, compareFn = (a, b) => a - b) => {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (compareFn(arr[j], arr[minIndex]) < 0) {
                minIndex = j;
            }
        }
        
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    return arr;
};

/**
 * @function selectionSortStable
 * @description Stable version of selection sort
 * @param {number[]} arr - Array to be sorted
 * @returns {number[]} - Sorted array
 */
const selectionSortStable = (arr) => {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        // Move elements to maintain stability
        if (minIndex !== i) {
            const minValue = arr[minIndex];
            for (let k = minIndex; k > i; k--) {
                arr[k] = arr[k - 1];
            }
            arr[i] = minValue;
        }
    }
    return arr;
};

/**
 * @function selectionSortRecursive
 * @description Recursive implementation of selection sort
 * @param {number[]} arr - Array to be sorted
 * @param {number} start - Starting index
 * @returns {number[]} - Sorted array
 */
const selectionSortRecursive = (arr, start = 0) => {
    if (start >= arr.length - 1) {
        return arr;
    }
    
    let minIndex = start;
    for (let j = start + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) {
            minIndex = j;
        }
    }
    
    if (minIndex !== start) {
        [arr[start], arr[minIndex]] = [arr[minIndex], arr[start]];
    }
    
    return selectionSortRecursive(arr, start + 1);
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
 * @function testSelectionSort
 * @description Test function to demonstrate selection sort
 * @returns {void}
 */
const testSelectionSort = () => {
    console.log('=== Selection Sort Test ===');
    
    // Test case 1: Random array
    let arr1 = [64, 34, 25, 12, 22, 11, 90];
    console.log('Original array:', arr1);
    selectionSort([...arr1]);
    console.log('Sorted array:', arr1);
    console.log();
    
    // Test case 2: Already sorted array
    let arr2 = [1, 2, 3, 4, 5];
    console.log('Already sorted array:', arr2);
    selectionSort([...arr2]);
    console.log('After sorting:', arr2);
    console.log();
    
    // Test case 3: Reverse sorted array
    let arr3 = [5, 4, 3, 2, 1];
    console.log('Reverse sorted array:', arr3);
    selectionSort([...arr3]);
    console.log('After sorting:', arr3);
    console.log();
    
    // Test case 4: Array with duplicates
    let arr4 = [3, 1, 4, 1, 5, 9, 2, 6, 5];
    console.log('Array with duplicates:', arr4);
    selectionSort([...arr4]);
    console.log('After sorting:', arr4);
    console.log();
    
    // Test case 5: String array
    let arr5 = ['banana', 'apple', 'cherry', 'date'];
    console.log('String array:', arr5);
    selectionSortWithCallback([...arr5], (a, b) => a.localeCompare(b));
    console.log('Sorted string array:', arr5);
    console.log();
    
    // Test case 6: Recursive selection sort
    let arr6 = [7, 2, 1, 6, 8, 5, 3, 4];
    console.log('Testing Recursive Selection Sort:');
    console.log('Original array:', arr6);
    selectionSortRecursive([...arr6]);
    console.log('Sorted array:', arr6);
    console.log();
};

/**
 * @function performanceTest
 * @description Performance test for selection sort
 * @returns {void}
 */
const performanceTest = () => {
    console.log('=== Performance Test ===');
    
    const sizes = [100, 500, 1000, 2000];
    
    sizes.forEach(size => {
        const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
        
        const startTime = performance.now();
        selectionSort([...arr]);
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
    
    // Test selection sort
    let selectionTime = 0;
    for (let i = 0; i < iterations; i++) {
        const arr = [...testArray];
        const start = performance.now();
        selectionSort(arr);
        const end = performance.now();
        selectionTime += (end - start);
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
    
    console.log(`Selection Sort average: ${(selectionTime / iterations).toFixed(2)} ms`);
    console.log(`Built-in Sort average: ${(builtinTime / iterations).toFixed(2)} ms`);
    console.log(`Performance ratio: ${(selectionTime / builtinTime).toFixed(2)}x slower`);
};

// Main execution
if (require.main === module) {
    console.log('Selection Sort Algorithm Implementation');
    console.log('=======================================');
    
    // Run basic tests
    testSelectionSort();
    
    // Run performance test
    performanceTest();
    
    // Run benchmark comparison
    benchmarkComparison();
    
    console.log('\nSelection Sort completed successfully!');
}

// Export functions for use in other modules
module.exports = {
    selectionSort,
    selectionSortWithCallback,
    selectionSortStable,
    selectionSortRecursive,
    printArray,
    testSelectionSort,
    performanceTest,
    generateRandomArray,
    isSorted,
    benchmarkComparison
};
