/**
 * @file heap_sort.js
 * @description Implementation of Heap Sort algorithm in JavaScript
 * @author Algorithm Collection
 * @version 1.0
 */

/**
 * @function heapSort
 * @description Sorts an array using heap sort algorithm
 * @param {number[]} arr - Array to be sorted
 * @returns {number[]} - Sorted array
 */
const heapSort = (arr) => {
    if (!arr || arr.length <= 1) {
        return arr;
    }
    
    const sortedArr = [...arr]; // Create a copy to avoid mutating original
    const n = sortedArr.length;
    
    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(sortedArr, n, i);
    }
    
    // One by one extract an element from heap
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        swap(sortedArr, 0, i);
        
        // Call max heapify on the reduced heap
        heapify(sortedArr, i, 0);
    }
    
    return sortedArr;
};

/**
 * @function heapify
 * @description To heapify a subtree rooted with node i which is an index in arr[]
 * @param {number[]} arr - Array to heapify
 * @param {number} n - Size of heap
 * @param {number} i - Index of root node
 * @returns {void}
 */
const heapify = (arr, n, i) => {
    let largest = i; // Initialize largest as root
    const left = 2 * i + 1; // Left child
    const right = 2 * i + 2; // Right child
    
    // If left child is larger than root
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    // If right child is larger than largest so far
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    // If largest is not root
    if (largest !== i) {
        swap(arr, i, largest);
        
        // Recursively heapify the affected sub-tree
        heapify(arr, n, largest);
    }
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
 * @function heapSortMinHeap
 * @description Sorts an array using min heap (descending order)
 * @param {number[]} arr - Array to be sorted
 * @returns {number[]} - Sorted array
 */
const heapSortMinHeap = (arr) => {
    if (!arr || arr.length <= 1) {
        return arr;
    }
    
    const sortedArr = [...arr];
    const n = sortedArr.length;
    
    // Build min heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapifyMin(sortedArr, n, i);
    }
    
    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        swap(sortedArr, 0, i);
        heapifyMin(sortedArr, i, 0);
    }
    
    return sortedArr;
};

/**
 * @function heapifyMin
 * @description To heapify a subtree rooted with node i for min heap
 * @param {number[]} arr - Array to heapify
 * @param {number} n - Size of heap
 * @param {number} i - Index of root node
 * @returns {void}
 */
const heapifyMin = (arr, n, i) => {
    let smallest = i; // Initialize smallest as root
    const left = 2 * i + 1; // Left child
    const right = 2 * i + 2; // Right child
    
    // If left child is smaller than root
    if (left < n && arr[left] < arr[smallest]) {
        smallest = left;
    }
    
    // If right child is smaller than smallest so far
    if (right < n && arr[right] < arr[smallest]) {
        smallest = right;
    }
    
    // If smallest is not root
    if (smallest !== i) {
        swap(arr, i, smallest);
        heapifyMin(arr, n, smallest);
    }
};

/**
 * @function heapSortWithCallback
 * @description Heap sort with comparison callback for custom sorting
 * @param {any[]} arr - Array to be sorted
 * @param {Function} compareFn - Comparison function
 * @returns {any[]} - Sorted array
 */
const heapSortWithCallback = (arr, compareFn = (a, b) => a - b) => {
    if (!arr || arr.length <= 1) {
        return arr;
    }
    
    const sortedArr = [...arr];
    const n = sortedArr.length;
    
    // Build heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapifyWithCallback(sortedArr, n, i, compareFn);
    }
    
    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        swap(sortedArr, 0, i);
        heapifyWithCallback(sortedArr, i, 0, compareFn);
    }
    
    return sortedArr;
};

/**
 * @function heapifyWithCallback
 * @description Heapify with custom comparison function
 * @param {any[]} arr - Array to heapify
 * @param {number} n - Size of heap
 * @param {number} i - Index of root node
 * @param {Function} compareFn - Comparison function
 * @returns {void}
 */
const heapifyWithCallback = (arr, n, i, compareFn) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < n && compareFn(arr[left], arr[largest]) > 0) {
        largest = left;
    }
    
    if (right < n && compareFn(arr[right], arr[largest]) > 0) {
        largest = right;
    }
    
    if (largest !== i) {
        swap(arr, i, largest);
        heapifyWithCallback(arr, n, largest, compareFn);
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
 * @function testHeapSort
 * @description Test function to demonstrate heap sort
 * @returns {void}
 */
const testHeapSort = () => {
    console.log('=== Heap Sort Test ===');
    
    // Test case 1: Random array
    let arr1 = [64, 34, 25, 12, 22, 11, 90];
    console.log('Original array:', arr1);
    const sorted1 = heapSort(arr1);
    console.log('Sorted array:', sorted1);
    console.log();
    
    // Test case 2: Already sorted array
    let arr2 = [1, 2, 3, 4, 5];
    console.log('Already sorted array:', arr2);
    const sorted2 = heapSort(arr2);
    console.log('After sorting:', sorted2);
    console.log();
    
    // Test case 3: Reverse sorted array
    let arr3 = [5, 4, 3, 2, 1];
    console.log('Reverse sorted array:', arr3);
    const sorted3 = heapSort(arr3);
    console.log('After sorting:', sorted3);
    console.log();
    
    // Test case 4: Array with duplicates
    let arr4 = [3, 1, 4, 1, 5, 9, 2, 6, 5];
    console.log('Array with duplicates:', arr4);
    const sorted4 = heapSort(arr4);
    console.log('After sorting:', sorted4);
    console.log();
    
    // Test case 5: Min heap sort (descending order)
    let arr5 = [7, 2, 1, 6, 8, 5, 3, 4];
    console.log('Testing Min Heap Sort (descending order):');
    console.log('Original array:', arr5);
    const sorted5 = heapSortMinHeap(arr5);
    console.log('Sorted array:', sorted5);
    console.log();
    
    // Test case 6: String array
    let arr6 = ['banana', 'apple', 'cherry', 'date'];
    console.log('String array:', arr6);
    const sorted6 = heapSortWithCallback(arr6, (a, b) => a.localeCompare(b));
    console.log('Sorted string array:', sorted6);
    console.log();
};

/**
 * @function performanceTest
 * @description Performance test for heap sort
 * @returns {void}
 */
const performanceTest = () => {
    console.log('=== Performance Test ===');
    
    const sizes = [100, 500, 1000, 2000, 5000];
    
    sizes.forEach(size => {
        const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
        
        const startTime = performance.now();
        heapSort(arr);
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
    
    // Test heap sort
    let heapTime = 0;
    for (let i = 0; i < iterations; i++) {
        const arr = [...testArray];
        const start = performance.now();
        heapSort(arr);
        const end = performance.now();
        heapTime += (end - start);
    }
    
    // Test min heap sort
    let minHeapTime = 0;
    for (let i = 0; i < iterations; i++) {
        const arr = [...testArray];
        const start = performance.now();
        heapSortMinHeap(arr);
        const end = performance.now();
        minHeapTime += (end - start);
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
    
    console.log(`Heap Sort average: ${(heapTime / iterations).toFixed(2)} ms`);
    console.log(`Min Heap Sort average: ${(minHeapTime / iterations).toFixed(2)} ms`);
    console.log(`Built-in Sort average: ${(builtinTime / iterations).toFixed(2)} ms`);
    console.log(`Heap Sort vs Built-in ratio: ${(heapTime / builtinTime).toFixed(2)}x`);
};

// Main execution
if (require.main === module) {
    console.log('Heap Sort Algorithm Implementation');
    console.log('==================================');
    
    // Run basic tests
    testHeapSort();
    
    // Run performance test
    performanceTest();
    
    // Run benchmark comparison
    benchmarkComparison();
    
    console.log('\nHeap Sort completed successfully!');
}

// Export functions for use in other modules
module.exports = {
    heapSort,
    heapSortMinHeap,
    heapSortWithCallback,
    printArray,
    testHeapSort,
    performanceTest,
    generateRandomArray,
    isSorted,
    benchmarkComparison
};
