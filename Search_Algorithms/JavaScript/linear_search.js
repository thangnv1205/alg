/**
 * @file linear_search.js
 * @description Implementation of Linear Search algorithm in JavaScript
 * @author Algorithm Collection
 * @version 1.0
 */

/**
 * @function linearSearch
 * @description Searches for a target value in an array using linear search
 * @param {number[]} arr - Array to search in
 * @param {number} target - Value to search for
 * @returns {number} - Index of target if found, -1 if not found
 */
const linearSearch = (arr, target) => {
    if (!arr || arr.length === 0) {
        return -1;
    }
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    
    return -1;
};

/**
 * @function linearSearchRecursive
 * @description Recursive implementation of linear search
 * @param {number[]} arr - Array to search in
 * @param {number} target - Value to search for
 * @returns {number} - Index of target if found, -1 if not found
 */
const linearSearchRecursive = (arr, target) => {
    if (!arr || arr.length === 0) {
        return -1;
    }
    return linearSearchRecursiveHelper(arr, target, 0);
};

/**
 * @function linearSearchRecursiveHelper
 * @description Recursive helper method for linear search
 * @param {number[]} arr - Array to search in
 * @param {number} target - Value to search for
 * @param {number} index - Current index
 * @returns {number} - Index of target if found, -1 if not found
 */
const linearSearchRecursiveHelper = (arr, target, index) => {
    if (index >= arr.length) {
        return -1;
    }
    
    if (arr[index] === target) {
        return index;
    }
    
    return linearSearchRecursiveHelper(arr, target, index + 1);
};

/**
 * @function findAllOccurrences
 * @description Finds all occurrences of target in array
 * @param {number[]} arr - Array to search in
 * @param {number} target - Value to search for
 * @returns {number[]} - Array of indices where target is found
 */
const findAllOccurrences = (arr, target) => {
    if (!arr || arr.length === 0) {
        return [];
    }
    
    const indices = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            indices.push(i);
        }
    }
    
    return indices;
};

/**
 * @function linearSearchWithCallback
 * @description Linear search with custom comparison function
 * @param {any[]} arr - Array to search in
 * @param {any} target - Value to search for
 * @param {Function} compareFn - Comparison function
 * @returns {number} - Index of target if found, -1 if not found
 */
const linearSearchWithCallback = (arr, target, compareFn = (a, b) => a === b) => {
    if (!arr || arr.length === 0) {
        return -1;
    }
    
    for (let i = 0; i < arr.length; i++) {
        if (compareFn(arr[i], target)) {
            return i;
        }
    }
    
    return -1;
};

/**
 * @function linearSearchFromIndex
 * @description Linear search starting from a specific index
 * @param {number[]} arr - Array to search in
 * @param {number} target - Value to search for
 * @param {number} startIndex - Index to start searching from
 * @returns {number} - Index of target if found, -1 if not found
 */
const linearSearchFromIndex = (arr, target, startIndex = 0) => {
    if (!arr || arr.length === 0 || startIndex >= arr.length) {
        return -1;
    }
    
    for (let i = startIndex; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    
    return -1;
};

/**
 * @function linearSearchLastOccurrence
 * @description Finds the last occurrence of target in array
 * @param {number[]} arr - Array to search in
 * @param {number} target - Value to search for
 * @returns {number} - Index of last occurrence if found, -1 if not found
 */
const linearSearchLastOccurrence = (arr, target) => {
    if (!arr || arr.length === 0) {
        return -1;
    }
    
    let lastIndex = -1;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            lastIndex = i;
        }
    }
    
    return lastIndex;
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
 * @function testLinearSearch
 * @description Test function to demonstrate linear search
 * @returns {void}
 */
const testLinearSearch = () => {
    console.log('=== Linear Search Test ===');
    
    // Test case 1: Basic search
    const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const target1 = 5;
    console.log('Array:', arr1);
    console.log(`Searching for ${target1}`);
    const result1 = linearSearch(arr1, target1);
    console.log(`Result: ${result1 !== -1 ? `Found at index ${result1}` : 'Not found'}`);
    console.log();
    
    // Test case 2: Search for non-existent element
    const target2 = 11;
    console.log(`Searching for ${target2}`);
    const result2 = linearSearch(arr1, target2);
    console.log(`Result: ${result2 !== -1 ? `Found at index ${result2}` : 'Not found'}`);
    console.log();
    
    // Test case 3: Array with duplicates
    const arr3 = [1, 2, 2, 2, 3, 4, 5, 6, 7, 8];
    const target3 = 2;
    console.log('Array with duplicates:', arr3);
    console.log(`Searching for ${target3}`);
    const result3 = linearSearch(arr3, target3);
    console.log(`First occurrence at index: ${result3}`);
    
    // Find all occurrences
    const allOccurrences = findAllOccurrences(arr3, target3);
    console.log(`All occurrences at indices: [${allOccurrences.join(', ')}]`);
    console.log();
    
    // Test case 4: Recursive search
    const arr4 = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const target4 = 70;
    console.log('Array:', arr4);
    console.log(`Recursive search for ${target4}`);
    const result4 = linearSearchRecursive(arr4, target4);
    console.log(`Result: ${result4 !== -1 ? `Found at index ${result4}` : 'Not found'}`);
    console.log();
    
    // Test case 5: String array
    const arr5 = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
    const target5 = 'cherry';
    console.log('String array:', arr5);
    console.log(`Searching for '${target5}'`);
    const result5 = linearSearchWithCallback(arr5, target5, (a, b) => a === b);
    console.log(`Result: ${result5 !== -1 ? `Found at index ${result5}` : 'Not found'}`);
    console.log();
    
    // Test case 6: Search from specific index
    const arr6 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const target6 = 5;
    const startIndex = 3;
    console.log('Array:', arr6);
    console.log(`Searching for ${target6} starting from index ${startIndex}`);
    const result6 = linearSearchFromIndex(arr6, target6, startIndex);
    console.log(`Result: ${result6 !== -1 ? `Found at index ${result6}` : 'Not found'}`);
    console.log();
    
    // Test case 7: Last occurrence
    const arr7 = [1, 2, 3, 2, 4, 2, 5];
    const target7 = 2;
    console.log('Array:', arr7);
    console.log(`Searching for last occurrence of ${target7}`);
    const result7 = linearSearchLastOccurrence(arr7, target7);
    console.log(`Result: ${result7 !== -1 ? `Found at index ${result7}` : 'Not found'}`);
    console.log();
};

/**
 * @function performanceTest
 * @description Performance test for linear search
 * @returns {void}
 */
const performanceTest = () => {
    console.log('=== Performance Test ===');
    
    const sizes = [1000, 5000, 10000, 50000, 100000];
    
    sizes.forEach(size => {
        const arr = Array.from({ length: size }, (_, i) => i);
        
        // Test with target at different positions
        const targets = [0, Math.floor(size / 4), Math.floor(size / 2), Math.floor(3 * size / 4), size - 1];
        
        targets.forEach(target => {
            const startTime = performance.now();
            linearSearch(arr, target);
            const endTime = performance.now();
            
            const duration = endTime - startTime;
            console.log(`Array size ${size}, target ${target}: ${duration.toFixed(4)} ms`);
        });
    });
};

/**
 * @function generateSequentialArray
 * @description Generates a sequential array of specified size
 * @param {number} size - Size of the array
 * @returns {number[]} - Sequential array
 */
const generateSequentialArray = (size) => {
    return Array.from({ length: size }, (_, i) => i);
};

/**
 * @function benchmarkComparison
 * @description Compares performance with different search methods
 * @returns {void}
 */
const benchmarkComparison = () => {
    console.log('=== Benchmark Comparison ===');
    
    const testArray = generateSequentialArray(10000);
    const target = 5000;
    const iterations = 1000;
    
    // Test linear search
    let linearTime = 0;
    for (let i = 0; i < iterations; i++) {
        const start = performance.now();
        linearSearch(testArray, target);
        const end = performance.now();
        linearTime += (end - start);
    }
    
    // Test recursive linear search
    let recursiveTime = 0;
    for (let i = 0; i < iterations; i++) {
        const start = performance.now();
        linearSearchRecursive(testArray, target);
        const end = performance.now();
        recursiveTime += (end - start);
    }
    
    // Test built-in indexOf for comparison
    let indexOfTime = 0;
    for (let i = 0; i < iterations; i++) {
        const start = performance.now();
        testArray.indexOf(target);
        const end = performance.now();
        indexOfTime += (end - start);
    }
    
    console.log(`Linear Search average: ${(linearTime / iterations).toFixed(4)} ms`);
    console.log(`Recursive Linear Search average: ${(recursiveTime / iterations).toFixed(4)} ms`);
    console.log(`Built-in indexOf average: ${(indexOfTime / iterations).toFixed(4)} ms`);
    console.log(`Linear vs indexOf ratio: ${(linearTime / indexOfTime).toFixed(2)}x`);
};

// Main execution
if (require.main === module) {
    console.log('Linear Search Algorithm Implementation');
    console.log('=====================================');
    
    // Run basic tests
    testLinearSearch();
    
    // Run performance test
    performanceTest();
    
    // Run benchmark comparison
    benchmarkComparison();
    
    console.log('\nLinear Search completed successfully!');
}

// Export functions for use in other modules
module.exports = {
    linearSearch,
    linearSearchRecursive,
    findAllOccurrences,
    linearSearchWithCallback,
    linearSearchFromIndex,
    linearSearchLastOccurrence,
    printArray,
    testLinearSearch,
    performanceTest,
    generateSequentialArray,
    benchmarkComparison
};
