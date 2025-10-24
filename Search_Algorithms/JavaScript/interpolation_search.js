/**
 * @file interpolation_search.js
 * @description Implementation of Interpolation Search algorithm in JavaScript
 * @author Algorithm Collection
 * @version 1.0
 */

/**
 * @function interpolationSearch
 * @description Searches for a target value in a sorted array using interpolation search
 * @param {number[]} arr - Sorted array to search in
 * @param {number} target - Value to search for
 * @returns {number} - Index of target if found, -1 if not found
 */
const interpolationSearch = (arr, target) => {
    if (!arr || arr.length === 0) {
        return -1;
    }
    
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right && target >= arr[left] && target <= arr[right]) {
        // Calculate interpolation position
        const pos = left + Math.floor(((target - arr[left]) * (right - left)) / (arr[right] - arr[left]));
        
        if (arr[pos] === target) {
            return pos;
        } else if (arr[pos] < target) {
            left = pos + 1;
        } else {
            right = pos - 1;
        }
    }
    
    return -1;
};

/**
 * @function interpolationSearchRecursive
 * @description Recursive implementation of interpolation search
 * @param {number[]} arr - Sorted array to search in
 * @param {number} target - Value to search for
 * @returns {number} - Index of target if found, -1 if not found
 */
const interpolationSearchRecursive = (arr, target) => {
    if (!arr || arr.length === 0) {
        return -1;
    }
    return interpolationSearchRecursiveHelper(arr, target, 0, arr.length - 1);
};

/**
 * @function interpolationSearchRecursiveHelper
 * @description Recursive helper method for interpolation search
 * @param {number[]} arr - Sorted array to search in
 * @param {number} target - Value to search for
 * @param {number} left - Left boundary
 * @param {number} right - Right boundary
 * @returns {number} - Index of target if found, -1 if not found
 */
const interpolationSearchRecursiveHelper = (arr, target, left, right) => {
    if (left > right || target < arr[left] || target > arr[right]) {
        return -1;
    }
    
    // Calculate interpolation position
    const pos = left + Math.floor(((target - arr[left]) * (right - left)) / (arr[right] - arr[left]));
    
    if (arr[pos] === target) {
        return pos;
    } else if (arr[pos] < target) {
        return interpolationSearchRecursiveHelper(arr, target, pos + 1, right);
    } else {
        return interpolationSearchRecursiveHelper(arr, target, left, pos - 1);
    }
};

/**
 * @function interpolationSearchWithCallback
 * @description Interpolation search with custom comparison function
 * @param {any[]} arr - Sorted array to search in
 * @param {any} target - Value to search for
 * @param {Function} compareFn - Comparison function
 * @param {Function} getValue - Function to extract numeric value from object
 * @returns {number} - Index of target if found, -1 if not found
 */
const interpolationSearchWithCallback = (arr, target, compareFn = (a, b) => a - b, getValue = (x) => x) => {
    if (!arr || arr.length === 0) {
        return -1;
    }
    
    let left = 0;
    let right = arr.length - 1;
    const targetValue = getValue(target);
    let leftValue = getValue(arr[left]);
    let rightValue = getValue(arr[right]);
    
    while (left <= right && targetValue >= leftValue && targetValue <= rightValue) {
        // Calculate interpolation position
        const pos = left + Math.floor(((targetValue - leftValue) * (right - left)) / (rightValue - leftValue));
        
        const comparison = compareFn(arr[pos], target);
        if (comparison === 0) {
            return pos;
        } else if (comparison < 0) {
            left = pos + 1;
            leftValue = getValue(arr[left]);
        } else {
            right = pos - 1;
            rightValue = getValue(arr[right]);
        }
    }
    
    return -1;
};

/**
 * @function interpolationSearchForDoubles
 * @description Interpolation search for double arrays
 * @param {number[]} arr - Sorted array to search in
 * @param {number} target - Value to search for
 * @returns {number} - Index of target if found, -1 if not found
 */
const interpolationSearchForDoubles = (arr, target) => {
    if (!arr || arr.length === 0) {
        return -1;
    }
    
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right && target >= arr[left] && target <= arr[right]) {
        // Calculate interpolation position
        const pos = left + Math.floor(((target - arr[left]) * (right - left)) / (arr[right] - arr[left]));
        
        if (Math.abs(arr[pos] - target) < 1e-9) { // Use epsilon for double comparison
            return pos;
        } else if (arr[pos] < target) {
            left = pos + 1;
        } else {
            right = pos - 1;
        }
    }
    
    return -1;
};

/**
 * @function interpolationSearchWithBounds
 * @description Interpolation search with bounds checking
 * @param {number[]} arr - Sorted array to search in
 * @param {number} target - Value to search for
 * @param {number} left - Left boundary
 * @param {number} right - Right boundary
 * @returns {number} - Index of target if found, -1 if not found
 */
const interpolationSearchWithBounds = (arr, target, left, right) => {
    if (!arr || arr.length === 0 || left < 0 || right >= arr.length || left > right) {
        return -1;
    }
    
    while (left <= right && target >= arr[left] && target <= arr[right]) {
        // Calculate interpolation position
        const pos = left + Math.floor(((target - arr[left]) * (right - left)) / (arr[right] - arr[left]));
        
        if (arr[pos] === target) {
            return pos;
        } else if (arr[pos] < target) {
            left = pos + 1;
        } else {
            right = pos - 1;
        }
    }
    
    return -1;
};

/**
 * @function interpolationSearchOptimized
 * @description Optimized interpolation search with early termination
 * @param {number[]} arr - Sorted array to search in
 * @param {number} target - Value to search for
 * @returns {number} - Index of target if found, -1 if not found
 */
const interpolationSearchOptimized = (arr, target) => {
    if (!arr || arr.length === 0) {
        return -1;
    }
    
    let left = 0;
    let right = arr.length - 1;
    let iterations = 0;
    const maxIterations = Math.log2(arr.length) + 1;
    
    while (left <= right && target >= arr[left] && target <= arr[right] && iterations < maxIterations) {
        // Calculate interpolation position
        const pos = left + Math.floor(((target - arr[left]) * (right - left)) / (arr[right] - arr[left]));
        
        if (arr[pos] === target) {
            return pos;
        } else if (arr[pos] < target) {
            left = pos + 1;
        } else {
            right = pos - 1;
        }
        
        iterations++;
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
 * @function testInterpolationSearch
 * @description Test function to demonstrate interpolation search
 * @returns {void}
 */
const testInterpolationSearch = () => {
    console.log('=== Interpolation Search Test ===');
    
    // Test case 1: Basic search
    const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const target1 = 5;
    console.log('Array:', arr1);
    console.log(`Searching for ${target1}`);
    const result1 = interpolationSearch(arr1, target1);
    console.log(`Result: ${result1 !== -1 ? `Found at index ${result1}` : 'Not found'}`);
    console.log();
    
    // Test case 2: Search for non-existent element
    const target2 = 11;
    console.log(`Searching for ${target2}`);
    const result2 = interpolationSearch(arr1, target2);
    console.log(`Result: ${result2 !== -1 ? `Found at index ${result2}` : 'Not found'}`);
    console.log();
    
    // Test case 3: Recursive search
    const arr3 = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const target3 = 70;
    console.log('Array:', arr3);
    console.log(`Recursive search for ${target3}`);
    const result3 = interpolationSearchRecursive(arr3, target3);
    console.log(`Result: ${result3 !== -1 ? `Found at index ${result3}` : 'Not found'}`);
    console.log();
    
    // Test case 4: Double array
    const arr4 = [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7, 8.8, 9.9, 10.0];
    const target4 = 5.5;
    console.log('Double array:', arr4);
    console.log(`Searching for ${target4}`);
    const result4 = interpolationSearchForDoubles(arr4, target4);
    console.log(`Result: ${result4 !== -1 ? `Found at index ${result4}` : 'Not found'}`);
    console.log();
    
    // Test case 5: With bounds
    const arr5 = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
    const target5 = 13;
    console.log('Array:', arr5);
    console.log(`Searching for ${target5} in range [2, 8]`);
    const result5 = interpolationSearchWithBounds(arr5, target5, 2, 8);
    console.log(`Result: ${result5 !== -1 ? `Found at index ${result5}` : 'Not found'}`);
    console.log();
    
    // Test case 6: Optimized search
    const arr6 = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25];
    const target6 = 13;
    console.log('Array:', arr6);
    console.log(`Optimized interpolation search for ${target6}`);
    const result6 = interpolationSearchOptimized(arr6, target6);
    console.log(`Result: ${result6 !== -1 ? `Found at index ${result6}` : 'Not found'}`);
    console.log();
    
    // Test case 7: Object array
    const arr7 = [
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 30 },
        { name: 'Charlie', age: 20 },
        { name: 'David', age: 25 }
    ];
    const target7 = { name: 'Bob', age: 30 };
    console.log('Object array:', arr7);
    console.log(`Searching for ${JSON.stringify(target7)}`);
    const result7 = interpolationSearchWithCallback(arr7, target7, (a, b) => a.age - b.age, (x) => x.age);
    console.log(`Result: ${result7 !== -1 ? `Found at index ${result7}` : 'Not found'}`);
    console.log();
};

/**
 * @function performanceTest
 * @description Performance test for interpolation search
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
            interpolationSearch(arr, target);
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
 * @description Compares performance of different search methods
 * @returns {void}
 */
const benchmarkComparison = () => {
    console.log('=== Benchmark Comparison ===');
    
    const testArray = generateSequentialArray(10000);
    const target = 5000;
    const iterations = 1000;
    
    // Test interpolation search
    let interpolationTime = 0;
    for (let i = 0; i < iterations; i++) {
        const start = performance.now();
        interpolationSearch(testArray, target);
        const end = performance.now();
        interpolationTime += (end - start);
    }
    
    // Test optimized interpolation search
    let optimizedTime = 0;
    for (let i = 0; i < iterations; i++) {
        const start = performance.now();
        interpolationSearchOptimized(testArray, target);
        const end = performance.now();
        optimizedTime += (end - start);
    }
    
    // Test binary search for comparison
    let binaryTime = 0;
    for (let i = 0; i < iterations; i++) {
        const start = performance.now();
        binarySearch(testArray, target);
        const end = performance.now();
        binaryTime += (end - start);
    }
    
    console.log(`Interpolation Search average: ${(interpolationTime / iterations).toFixed(4)} ms`);
    console.log(`Optimized Interpolation Search average: ${(optimizedTime / iterations).toFixed(4)} ms`);
    console.log(`Binary Search average: ${(binaryTime / iterations).toFixed(4)} ms`);
    console.log(`Interpolation vs Binary ratio: ${(interpolationTime / binaryTime).toFixed(2)}x`);
};

/**
 * @function binarySearch
 * @description Binary search for comparison
 * @param {number[]} arr - Sorted array to search in
 * @param {number} target - Value to search for
 * @returns {number} - Index of target if found, -1 if not found
 */
const binarySearch = (arr, target) => {
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

// Main execution
if (require.main === module) {
    console.log('Interpolation Search Algorithm Implementation');
    console.log('============================================');
    
    // Run basic tests
    testInterpolationSearch();
    
    // Run performance test
    performanceTest();
    
    // Run benchmark comparison
    benchmarkComparison();
    
    console.log('\nInterpolation Search completed successfully!');
}

// Export functions for use in other modules
module.exports = {
    interpolationSearch,
    interpolationSearchRecursive,
    interpolationSearchWithCallback,
    interpolationSearchForDoubles,
    interpolationSearchWithBounds,
    interpolationSearchOptimized,
    printArray,
    testInterpolationSearch,
    performanceTest,
    generateSequentialArray,
    benchmarkComparison
};
