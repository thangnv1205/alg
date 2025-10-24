/**
 * @file binary_search.js
 * @description Implementation of Binary Search algorithm in JavaScript
 * @author Algorithm Collection
 * @version 1.0
 */

/**
 * @function binarySearch
 * @description Searches for a target value in a sorted array using binary search
 * @param {number[]} arr - Sorted array to search in
 * @param {number} target - Value to search for
 * @returns {number} - Index of target if found, -1 if not found
 */
const binarySearch = (arr, target) => {
    if (!arr || arr.length === 0) {
        return -1;
    }
    
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
};

/**
 * @function binarySearchRecursive
 * @description Recursive implementation of binary search
 * @param {number[]} arr - Sorted array to search in
 * @param {number} target - Value to search for
 * @returns {number} - Index of target if found, -1 if not found
 */
const binarySearchRecursive = (arr, target) => {
    if (!arr || arr.length === 0) {
        return -1;
    }
    return binarySearchRecursiveHelper(arr, target, 0, arr.length - 1);
};

/**
 * @function binarySearchRecursiveHelper
 * @description Recursive helper method for binary search
 * @param {number[]} arr - Sorted array to search in
 * @param {number} target - Value to search for
 * @param {number} left - Left boundary
 * @param {number} right - Right boundary
 * @returns {number} - Index of target if found, -1 if not found
 */
const binarySearchRecursiveHelper = (arr, target, left, right) => {
    if (left > right) {
        return -1;
    }
    
    const mid = Math.floor(left + (right - left) / 2);
    
    if (arr[mid] === target) {
        return mid;
    } else if (arr[mid] < target) {
        return binarySearchRecursiveHelper(arr, target, mid + 1, right);
    } else {
        return binarySearchRecursiveHelper(arr, target, left, mid - 1);
    }
};

/**
 * @function findFirstOccurrence
 * @description Finds the first occurrence of target in array with duplicates
 * @param {number[]} arr - Sorted array to search in
 * @param {number} target - Value to search for
 * @returns {number} - Index of first occurrence if found, -1 if not found
 */
const findFirstOccurrence = (arr, target) => {
    if (!arr || arr.length === 0) {
        return -1;
    }
    
    let left = 0;
    let right = arr.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        
        if (arr[mid] === target) {
            result = mid;
            right = mid - 1; // Continue searching in left half
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
};

/**
 * @function findLastOccurrence
 * @description Finds the last occurrence of target in array with duplicates
 * @param {number[]} arr - Sorted array to search in
 * @param {number} target - Value to search for
 * @returns {number} - Index of last occurrence if found, -1 if not found
 */
const findLastOccurrence = (arr, target) => {
    if (!arr || arr.length === 0) {
        return -1;
    }
    
    let left = 0;
    let right = arr.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        
        if (arr[mid] === target) {
            result = mid;
            left = mid + 1; // Continue searching in right half
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
};

/**
 * @function findInsertPosition
 * @description Finds the position where target should be inserted to maintain sorted order
 * @param {number[]} arr - Sorted array
 * @param {number} target - Value to insert
 * @returns {number} - Index where target should be inserted
 */
const findInsertPosition = (arr, target) => {
    if (!arr || arr.length === 0) {
        return 0;
    }
    
    let left = 0;
    let right = arr.length;
    
    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);
        
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
};

/**
 * @function binarySearchWithCallback
 * @description Binary search with custom comparison function
 * @param {any[]} arr - Sorted array to search in
 * @param {any} target - Value to search for
 * @param {Function} compareFn - Comparison function
 * @returns {number} - Index of target if found, -1 if not found
 */
const binarySearchWithCallback = (arr, target, compareFn = (a, b) => a - b) => {
    if (!arr || arr.length === 0) {
        return -1;
    }
    
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        const comparison = compareFn(arr[mid], target);
        
        if (comparison === 0) {
            return mid;
        } else if (comparison < 0) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
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
 * @function testBinarySearch
 * @description Test function to demonstrate binary search
 * @returns {void}
 */
const testBinarySearch = () => {
    console.log('=== Binary Search Test ===');
    
    // Test case 1: Basic search
    const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const target1 = 5;
    console.log('Array:', arr1);
    console.log(`Searching for ${target1}`);
    const result1 = binarySearch(arr1, target1);
    console.log(`Result: ${result1 !== -1 ? `Found at index ${result1}` : 'Not found'}`);
    console.log();
    
    // Test case 2: Search for non-existent element
    const target2 = 11;
    console.log(`Searching for ${target2}`);
    const result2 = binarySearch(arr1, target2);
    console.log(`Result: ${result2 !== -1 ? `Found at index ${result2}` : 'Not found'}`);
    console.log();
    
    // Test case 3: Array with duplicates
    const arr3 = [1, 2, 2, 2, 3, 4, 5, 6, 7, 8];
    const target3 = 2;
    console.log('Array with duplicates:', arr3);
    console.log(`Searching for ${target3}`);
    const firstOccurrence = findFirstOccurrence(arr3, target3);
    const lastOccurrence = findLastOccurrence(arr3, target3);
    console.log(`First occurrence at index: ${firstOccurrence}`);
    console.log(`Last occurrence at index: ${lastOccurrence}`);
    console.log();
    
    // Test case 4: Insert position
    const arr4 = [1, 3, 5, 7, 9];
    const target4 = 6;
    console.log('Array:', arr4);
    console.log(`Insert position for ${target4}: ${findInsertPosition(arr4, target4)}`);
    console.log();
    
    // Test case 5: Recursive search
    const arr5 = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const target5 = 70;
    console.log('Array:', arr5);
    console.log(`Recursive search for ${target5}`);
    const result5 = binarySearchRecursive(arr5, target5);
    console.log(`Result: ${result5 !== -1 ? `Found at index ${result5}` : 'Not found'}`);
    console.log();
    
    // Test case 6: String array
    const arr6 = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
    const target6 = 'cherry';
    console.log('String array:', arr6);
    console.log(`Searching for '${target6}'`);
    const result6 = binarySearchWithCallback(arr6, target6, (a, b) => a.localeCompare(b));
    console.log(`Result: ${result6 !== -1 ? `Found at index ${result6}` : 'Not found'}`);
    console.log();
};

/**
 * @function performanceTest
 * @description Performance test for binary search
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
            binarySearch(arr, target);
            const endTime = performance.now();
            
            const duration = endTime - startTime;
            console.log(`Array size ${size}, target ${target}: ${duration.toFixed(4)} ms`);
        });
    });
};

/**
 * @function generateSortedArray
 * @description Generates a sorted array of specified size
 * @param {number} size - Size of the array
 * @returns {number[]} - Sorted array
 */
const generateSortedArray = (size) => {
    return Array.from({ length: size }, (_, i) => i);
};

/**
 * @function benchmarkComparison
 * @description Compares performance of different search methods
 * @returns {void}
 */
const benchmarkComparison = () => {
    console.log('=== Benchmark Comparison ===');
    
    const testArray = generateSortedArray(10000);
    const target = 5000;
    const iterations = 1000;
    
    // Test iterative binary search
    let iterativeTime = 0;
    for (let i = 0; i < iterations; i++) {
        const start = performance.now();
        binarySearch(testArray, target);
        const end = performance.now();
        iterativeTime += (end - start);
    }
    
    // Test recursive binary search
    let recursiveTime = 0;
    for (let i = 0; i < iterations; i++) {
        const start = performance.now();
        binarySearchRecursive(testArray, target);
        const end = performance.now();
        recursiveTime += (end - start);
    }
    
    // Test linear search for comparison
    let linearTime = 0;
    for (let i = 0; i < iterations; i++) {
        const start = performance.now();
        testArray.indexOf(target);
        const end = performance.now();
        linearTime += (end - start);
    }
    
    console.log(`Iterative Binary Search average: ${(iterativeTime / iterations).toFixed(4)} ms`);
    console.log(`Recursive Binary Search average: ${(recursiveTime / iterations).toFixed(4)} ms`);
    console.log(`Linear Search average: ${(linearTime / iterations).toFixed(4)} ms`);
    console.log(`Binary vs Linear ratio: ${(linearTime / iterativeTime).toFixed(2)}x faster`);
};

// Main execution
if (require.main === module) {
    console.log('Binary Search Algorithm Implementation');
    console.log('=====================================');
    
    // Run basic tests
    testBinarySearch();
    
    // Run performance test
    performanceTest();
    
    // Run benchmark comparison
    benchmarkComparison();
    
    console.log('\nBinary Search completed successfully!');
}

// Export functions for use in other modules
module.exports = {
    binarySearch,
    binarySearchRecursive,
    findFirstOccurrence,
    findLastOccurrence,
    findInsertPosition,
    binarySearchWithCallback,
    printArray,
    testBinarySearch,
    performanceTest,
    generateSortedArray,
    benchmarkComparison
};
