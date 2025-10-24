/**
 * @file bubble_sort.js
 * @description Implementation of Bubble Sort algorithm in JavaScript
 * @author Algorithm Collection
 * @version 1.0
 */

/**
 * @function bubbleSort
 * @description Sorts an array using bubble sort algorithm
 * @param {number[]} arr - Array to be sorted
 * @returns {number[]} - Sorted array
 */
const bubbleSort = (arr) => {
    const n = arr.length;
    let swapped;
    
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        // If no swapping occurred, array is sorted
        if (!swapped) {
            break;
        }
    }
    return arr;
};

/**
 * @function bubbleSortOptimized
 * @description Optimized version of bubble sort with early termination
 * @param {number[]} arr - Array to be sorted
 * @returns {number[]} - Sorted array
 */
const bubbleSortOptimized = (arr) => {
    const n = arr.length;
    let swapped;
    let lastUnsorted = n - 1;
    
    do {
        swapped = false;
        for (let i = 0; i < lastUnsorted; i++) {
            if (arr[i] > arr[i + 1]) {
                // Swap elements
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
        }
        lastUnsorted--; // Reduce the range of comparison
    } while (swapped);
    
    return arr;
};

/**
 * @function bubbleSortWithCallback
 * @description Bubble sort with comparison callback for custom sorting
 * @param {any[]} arr - Array to be sorted
 * @param {Function} compareFn - Comparison function
 * @returns {any[]} - Sorted array
 */
const bubbleSortWithCallback = (arr, compareFn = (a, b) => a - b) => {
    const n = arr.length;
    let swapped;
    
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (compareFn(arr[j], arr[j + 1]) > 0) {
                // Swap elements
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        if (!swapped) {
            break;
        }
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
 * @function testBubbleSort
 * @description Test function to demonstrate bubble sort
 * @returns {void}
 */
const testBubbleSort = () => {
    console.log('=== Bubble Sort Test ===');
    
    // Test case 1: Random array
    let arr1 = [64, 34, 25, 12, 22, 11, 90];
    console.log('Original array:', arr1);
    bubbleSort(arr1);
    console.log('Sorted array:', arr1);
    console.log();
    
    // Test case 2: Already sorted array
    let arr2 = [1, 2, 3, 4, 5];
    console.log('Already sorted array:', arr2);
    bubbleSort(arr2);
    console.log('After sorting:', arr2);
    console.log();
    
    // Test case 3: Reverse sorted array
    let arr3 = [5, 4, 3, 2, 1];
    console.log('Reverse sorted array:', arr3);
    bubbleSort(arr3);
    console.log('After sorting:', arr3);
    console.log();
    
    // Test case 4: Array with duplicates
    let arr4 = [3, 1, 4, 1, 5, 9, 2, 6, 5];
    console.log('Array with duplicates:', arr4);
    bubbleSort(arr4);
    console.log('After sorting:', arr4);
    console.log();
    
    // Test case 5: String array
    let arr5 = ['banana', 'apple', 'cherry', 'date'];
    console.log('String array:', arr5);
    bubbleSortWithCallback(arr5, (a, b) => a.localeCompare(b));
    console.log('Sorted string array:', arr5);
    console.log();
};

/**
 * @function performanceTest
 * @description Performance test for bubble sort
 * @returns {void}
 */
const performanceTest = () => {
    console.log('=== Performance Test ===');
    
    const sizes = [100, 500, 1000, 2000];
    
    sizes.forEach(size => {
        const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
        
        const startTime = performance.now();
        bubbleSort([...arr]); // Use spread to avoid mutating original array
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
    
    // Test bubble sort
    let bubbleTime = 0;
    for (let i = 0; i < iterations; i++) {
        const arr = [...testArray];
        const start = performance.now();
        bubbleSort(arr);
        const end = performance.now();
        bubbleTime += (end - start);
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
    
    console.log(`Bubble Sort average: ${(bubbleTime / iterations).toFixed(2)} ms`);
    console.log(`Built-in Sort average: ${(builtinTime / iterations).toFixed(2)} ms`);
    console.log(`Performance ratio: ${(bubbleTime / builtinTime).toFixed(2)}x slower`);
};

// Main execution
if (require.main === module) {
    console.log('Bubble Sort Algorithm Implementation');
    console.log('===================================');
    
    // Run basic tests
    testBubbleSort();
    
    // Run performance test
    performanceTest();
    
    // Run benchmark comparison
    benchmarkComparison();
    
    console.log('\nBubble Sort completed successfully!');
}

// Export functions for use in other modules
module.exports = {
    bubbleSort,
    bubbleSortOptimized,
    bubbleSortWithCallback,
    printArray,
    testBubbleSort,
    performanceTest,
    generateRandomArray,
    isSorted,
    benchmarkComparison
};
