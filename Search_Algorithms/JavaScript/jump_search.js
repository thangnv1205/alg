/**
 * @file jump_search.js
 * @description Implementation of Jump Search algorithm in JavaScript
 * @author Algorithm Collection
 * @version 1.0
 */

/**
 * @function jumpSearch
 * @description Searches for a target value in a sorted array using jump search
 * @param {number[]} arr - Sorted array to search in
 * @param {number} target - Value to search for
 * @returns {number} - Index of target if found, -1 if not found
 */
const jumpSearch = (arr, target) => {
    if (!arr || arr.length === 0) {
        return -1;
    }
    
    const n = arr.length;
    const step = Math.floor(Math.sqrt(n));
    let prev = 0;
    
    // Find the block where target might be present
    while (arr[Math.min(step, n) - 1] < target) {
        prev = step;
        step += Math.floor(Math.sqrt(n));
        if (prev >= n) {
            return -1;
        }
    }
    
    // Perform linear search in the found block
    while (arr[prev] < target) {
        prev++;
        if (prev === Math.min(step, n)) {
            return -1;
        }
    }
    
    // If target is found
    if (arr[prev] === target) {
        return prev;
    }
    
    return -1;
};

/**
 * @function jumpSearchWithStep
 * @description Jump search with custom step size
 * @param {number[]} arr - Sorted array to search in
 * @param {number} target - Value to search for
 * @param {number} step - Step size for jumping
 * @returns {number} - Index of target if found, -1 if not found
 */
const jumpSearchWithStep = (arr, target, step) => {
    if (!arr || arr.length === 0) {
        return -1;
    }
    
    const n = arr.length;
    let prev = 0;
    
    // Find the block where target might be present
    while (arr[Math.min(step, n) - 1] < target) {
        prev = step;
        step += step;
        if (prev >= n) {
            return -1;
        }
    }
    
    // Perform linear search in the found block
    while (arr[prev] < target) {
        prev++;
        if (prev === Math.min(step, n)) {
            return -1;
        }
    }
    
    // If target is found
    if (arr[prev] === target) {
        return prev;
    }
    
    return -1;
};

/**
 * @function jumpSearchRecursive
 * @description Recursive implementation of jump search
 * @param {number[]} arr - Sorted array to search in
 * @param {number} target - Value to search for
 * @returns {number} - Index of target if found, -1 if not found
 */
const jumpSearchRecursive = (arr, target) => {
    if (!arr || arr.length === 0) {
        return -1;
    }
    
    const step = Math.floor(Math.sqrt(arr.length));
    return jumpSearchRecursiveHelper(arr, target, 0, step);
};

/**
 * @function jumpSearchRecursiveHelper
 * @description Recursive helper method for jump search
 * @param {number[]} arr - Sorted array to search in
 * @param {number} target - Value to search for
 * @param {number} prev - Previous position
 * @param {number} step - Current step size
 * @returns {number} - Index of target if found, -1 if not found
 */
const jumpSearchRecursiveHelper = (arr, target, prev, step) => {
    if (prev >= arr.length) {
        return -1;
    }
    
    const current = Math.min(step, arr.length) - 1;
    
    if (arr[current] < target) {
        return jumpSearchRecursiveHelper(arr, target, step, step + Math.floor(Math.sqrt(arr.length)));
    }
    
    // Perform linear search in the found block
    for (let i = prev; i <= current; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    
    return -1;
};

/**
 * @function jumpSearchWithCallback
 * @description Jump search with custom comparison function
 * @param {any[]} arr - Sorted array to search in
 * @param {any} target - Value to search for
 * @param {Function} compareFn - Comparison function
 * @returns {number} - Index of target if found, -1 if not found
 */
const jumpSearchWithCallback = (arr, target, compareFn = (a, b) => a - b) => {
    if (!arr || arr.length === 0) {
        return -1;
    }
    
    const n = arr.length;
    const step = Math.floor(Math.sqrt(n));
    let prev = 0;
    
    // Find the block where target might be present
    while (compareFn(arr[Math.min(step, n) - 1], target) < 0) {
        prev = step;
        step += Math.floor(Math.sqrt(n));
        if (prev >= n) {
            return -1;
        }
    }
    
    // Perform linear search in the found block
    while (compareFn(arr[prev], target) < 0) {
        prev++;
        if (prev === Math.min(step, n)) {
            return -1;
        }
    }
    
    // If target is found
    if (compareFn(arr[prev], target) === 0) {
        return prev;
    }
    
    return -1;
};

/**
 * @function jumpSearchOptimized
 * @description Optimized jump search with better step calculation
 * @param {number[]} arr - Sorted array to search in
 * @param {number} target - Value to search for
 * @returns {number} - Index of target if found, -1 if not found
 */
const jumpSearchOptimized = (arr, target) => {
    if (!arr || arr.length === 0) {
        return -1;
    }
    
    const n = arr.length;
    const step = Math.floor(Math.sqrt(n));
    let prev = 0;
    
    // Find the block where target might be present
    while (arr[Math.min(step, n) - 1] < target) {
        prev = step;
        step += Math.floor(Math.sqrt(n));
        if (prev >= n) {
            return -1;
        }
    }
    
    // Perform binary search in the found block
    return binarySearchInRange(arr, target, prev, Math.min(step, n) - 1);
};

/**
 * @function binarySearchInRange
 * @description Binary search within a specific range
 * @param {number[]} arr - Sorted array to search in
 * @param {number} target - Value to search for
 * @param {number} left - Left boundary
 * @param {number} right - Right boundary
 * @returns {number} - Index of target if found, -1 if not found
 */
const binarySearchInRange = (arr, target, left, right) => {
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
 * @function printArray
 * @description Prints the elements of an array
 * @param {number[]} arr - Array to be printed
 * @returns {void}
 */
const printArray = (arr) => {
    console.log(arr.join(' '));
};

/**
 * @function testJumpSearch
 * @description Test function to demonstrate jump search
 * @returns {void}
 */
const testJumpSearch = () => {
    console.log('=== Jump Search Test ===');
    
    // Test case 1: Basic search
    const arr1 = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610];
    const target1 = 55;
    console.log('Array:', arr1);
    console.log(`Searching for ${target1}`);
    const result1 = jumpSearch(arr1, target1);
    console.log(`Result: ${result1 !== -1 ? `Found at index ${result1}` : 'Not found'}`);
    console.log();
    
    // Test case 2: Search for non-existent element
    const target2 = 100;
    console.log(`Searching for ${target2}`);
    const result2 = jumpSearch(arr1, target2);
    console.log(`Result: ${result2 !== -1 ? `Found at index ${result2}` : 'Not found'}`);
    console.log();
    
    // Test case 3: With custom step
    const arr3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    const target3 = 7;
    console.log('Array:', arr3);
    console.log(`Searching for ${target3} with step 4`);
    const result3 = jumpSearchWithStep(arr3, target3, 4);
    console.log(`Result: ${result3 !== -1 ? `Found at index ${result3}` : 'Not found'}`);
    console.log();
    
    // Test case 4: Recursive search
    const arr4 = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const target4 = 70;
    console.log('Array:', arr4);
    console.log(`Recursive search for ${target4}`);
    const result4 = jumpSearchRecursive(arr4, target4);
    console.log(`Result: ${result4 !== -1 ? `Found at index ${result4}` : 'Not found'}`);
    console.log();
    
    // Test case 5: String array
    const arr5 = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape'];
    const target5 = 'cherry';
    console.log('String array:', arr5);
    console.log(`Searching for '${target5}'`);
    const result5 = jumpSearchWithCallback(arr5, target5, (a, b) => a.localeCompare(b));
    console.log(`Result: ${result5 !== -1 ? `Found at index ${result5}` : 'Not found'}`);
    console.log();
    
    // Test case 6: Optimized jump search
    const arr6 = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25];
    const target6 = 13;
    console.log('Array:', arr6);
    console.log(`Optimized jump search for ${target6}`);
    const result6 = jumpSearchOptimized(arr6, target6);
    console.log(`Result: ${result6 !== -1 ? `Found at index ${result6}` : 'Not found'}`);
    console.log();
};

/**
 * @function performanceTest
 * @description Performance test for jump search
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
            jumpSearch(arr, target);
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
    
    // Test jump search
    let jumpTime = 0;
    for (let i = 0; i < iterations; i++) {
        const start = performance.now();
        jumpSearch(testArray, target);
        const end = performance.now();
        jumpTime += (end - start);
    }
    
    // Test optimized jump search
    let optimizedTime = 0;
    for (let i = 0; i < iterations; i++) {
        const start = performance.now();
        jumpSearchOptimized(testArray, target);
        const end = performance.now();
        optimizedTime += (end - start);
    }
    
    // Test binary search for comparison
    let binaryTime = 0;
    for (let i = 0; i < iterations; i++) {
        const start = performance.now();
        binarySearchInRange(testArray, target, 0, testArray.length - 1);
        const end = performance.now();
        binaryTime += (end - start);
    }
    
    console.log(`Jump Search average: ${(jumpTime / iterations).toFixed(4)} ms`);
    console.log(`Optimized Jump Search average: ${(optimizedTime / iterations).toFixed(4)} ms`);
    console.log(`Binary Search average: ${(binaryTime / iterations).toFixed(4)} ms`);
    console.log(`Jump vs Binary ratio: ${(jumpTime / binaryTime).toFixed(2)}x`);
};

// Main execution
if (require.main === module) {
    console.log('Jump Search Algorithm Implementation');
    console.log('===================================');
    
    // Run basic tests
    testJumpSearch();
    
    // Run performance test
    performanceTest();
    
    // Run benchmark comparison
    benchmarkComparison();
    
    console.log('\nJump Search completed successfully!');
}

// Export functions for use in other modules
module.exports = {
    jumpSearch,
    jumpSearchWithStep,
    jumpSearchRecursive,
    jumpSearchWithCallback,
    jumpSearchOptimized,
    binarySearchInRange,
    printArray,
    testJumpSearch,
    performanceTest,
    generateSequentialArray,
    benchmarkComparison
};
