/**
 * @file bucket_sort.js
 * @description Implementation of Bucket Sort algorithm in JavaScript
 * @author Algorithm Collection
 * @version 1.0
 */

/**
 * @function bucketSort
 * @description Sorts an array using bucket sort algorithm
 * @param {number[]} arr - Array to be sorted
 * @returns {number[]} - Sorted array
 */
const bucketSort = (arr) => {
    if (arr.length === 0) {
        return arr;
    }
    
    // Find maximum and minimum values
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    
    // Create buckets
    const bucketCount = arr.length;
    const buckets = Array.from({ length: bucketCount }, () => []);
    
    // Distribute elements into buckets
    for (const value of arr) {
        const bucketIndex = Math.floor((value - min) * (bucketCount - 1) / (max - min));
        buckets[bucketIndex].push(value);
    }
    
    // Sort each bucket
    for (const bucket of buckets) {
        bucket.sort((a, b) => a - b);
    }
    
    // Concatenate buckets back into array
    const result = [];
    for (const bucket of buckets) {
        result.push(...bucket);
    }
    
    return result;
};

/**
 * @function bucketSortInteger
 * @description Bucket sort for integer arrays
 * @param {number[]} arr - Array to be sorted
 * @returns {number[]} - Sorted array
 */
const bucketSortInteger = (arr) => {
    if (arr.length === 0) {
        return arr;
    }
    
    // Find maximum and minimum values
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    
    // Create buckets
    const bucketCount = Math.max(1, Math.floor(arr.length / 10));
    const buckets = Array.from({ length: bucketCount }, () => []);
    
    // Distribute elements into buckets
    for (const value of arr) {
        const bucketIndex = Math.floor((value - min) * (bucketCount - 1) / (max - min));
        buckets[bucketIndex].push(value);
    }
    
    // Sort each bucket
    for (const bucket of buckets) {
        bucket.sort((a, b) => a - b);
    }
    
    // Concatenate buckets back into array
    const result = [];
    for (const bucket of buckets) {
        result.push(...bucket);
    }
    
    return result;
};

/**
 * @function bucketSortWithCustomBuckets
 * @description Bucket sort with custom number of buckets
 * @param {number[]} arr - Array to be sorted
 * @param {number} bucketCount - Number of buckets
 * @returns {number[]} - Sorted array
 */
const bucketSortWithCustomBuckets = (arr, bucketCount) => {
    if (arr.length === 0) {
        return arr;
    }
    
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    
    // Create buckets
    const buckets = Array.from({ length: bucketCount }, () => []);
    
    // Distribute elements into buckets
    for (const value of arr) {
        const bucketIndex = Math.floor((value - min) * (bucketCount - 1) / (max - min));
        buckets[bucketIndex].push(value);
    }
    
    // Sort each bucket
    for (const bucket of buckets) {
        bucket.sort((a, b) => a - b);
    }
    
    // Concatenate buckets back into array
    const result = [];
    for (const bucket of buckets) {
        result.push(...bucket);
    }
    
    return result;
};

/**
 * @function bucketSortForStrings
 * @description Bucket sort for string arrays
 * @param {string[]} arr - String array to be sorted
 * @returns {string[]} - Sorted array
 */
const bucketSortForStrings = (arr) => {
    if (arr.length === 0) {
        return arr;
    }
    
    // Find maximum length
    const maxLength = Math.max(...arr.map(str => str.length));
    
    // Create buckets for each character position
    const buckets = Array.from({ length: 26 }, () => []); // For lowercase letters
    
    // Sort by each character position from right to left
    for (let pos = maxLength - 1; pos >= 0; pos--) {
        // Clear buckets
        for (const bucket of buckets) {
            bucket.length = 0;
        }
        
        // Distribute strings into buckets
        for (const str of arr) {
            if (pos < str.length) {
                const c = str[pos].toLowerCase();
                if (c >= 'a' && c <= 'z') {
                    buckets[c.charCodeAt(0) - 'a'.charCodeAt(0)].push(str);
                } else {
                    buckets[0].push(str); // Put non-alphabetic characters in first bucket
                }
            } else {
                buckets[0].push(str); // Put shorter strings in first bucket
            }
        }
        
        // Concatenate buckets back into array
        const result = [];
        for (const bucket of buckets) {
            result.push(...bucket);
        }
        arr.length = 0;
        arr.push(...result);
    }
    
    return arr;
};

/**
 * @function bucketSortWithComparator
 * @description Bucket sort with custom comparator
 * @param {any[]} arr - Array to be sorted
 * @param {Function} comparator - Custom comparator
 * @returns {any[]} - Sorted array
 */
const bucketSortWithComparator = (arr, comparator = (a, b) => a - b) => {
    if (arr.length === 0) {
        return arr;
    }
    
    // Create buckets
    const bucketCount = Math.max(1, Math.floor(arr.length / 10));
    const buckets = Array.from({ length: bucketCount }, () => []);
    
    // Distribute elements into buckets (simple hash)
    for (const value of arr) {
        const bucketIndex = Math.abs(value.hashCode ? value.hashCode() : value.toString().hashCode()) % bucketCount;
        buckets[bucketIndex].push(value);
    }
    
    // Sort each bucket
    for (const bucket of buckets) {
        bucket.sort(comparator);
    }
    
    // Concatenate buckets back into array
    const result = [];
    for (const bucket of buckets) {
        result.push(...bucket);
    }
    
    return result;
};

/**
 * @function bucketSortForDoubles
 * @description Bucket sort for double arrays (0.0 to 1.0)
 * @param {number[]} arr - Array to be sorted
 * @returns {number[]} - Sorted array
 */
const bucketSortForDoubles = (arr) => {
    if (arr.length === 0) {
        return arr;
    }
    
    // Create buckets
    const bucketCount = arr.length;
    const buckets = Array.from({ length: bucketCount }, () => []);
    
    // Distribute elements into buckets
    for (const value of arr) {
        const bucketIndex = Math.floor(value * bucketCount);
        buckets[bucketIndex].push(value);
    }
    
    // Sort each bucket
    for (const bucket of buckets) {
        bucket.sort((a, b) => a - b);
    }
    
    // Concatenate buckets back into array
    const result = [];
    for (const bucket of buckets) {
        result.push(...bucket);
    }
    
    return result;
};

/**
 * @function bucketSortWithRange
 * @description Bucket sort with specified range
 * @param {number[]} arr - Array to be sorted
 * @param {number} min - Minimum value in range
 * @param {number} max - Maximum value in range
 * @returns {number[]} - Sorted array
 */
const bucketSortWithRange = (arr, min, max) => {
    if (arr.length === 0) {
        return arr;
    }
    
    const bucketCount = Math.max(1, Math.floor(arr.length / 10));
    const buckets = Array.from({ length: bucketCount }, () => []);
    
    // Distribute elements into buckets
    for (const value of arr) {
        if (value < min || value > max) {
            throw new Error(`Value ${value} is outside range [${min}, ${max}]`);
        }
        const bucketIndex = Math.floor((value - min) * (bucketCount - 1) / (max - min));
        buckets[bucketIndex].push(value);
    }
    
    // Sort each bucket
    for (const bucket of buckets) {
        bucket.sort((a, b) => a - b);
    }
    
    // Concatenate buckets back into array
    const result = [];
    for (const bucket of buckets) {
        result.push(...bucket);
    }
    
    return result;
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
 * @function testBucketSort
 * @description Test function to demonstrate bucket sort
 * @returns {void}
 */
const testBucketSort = () => {
    console.log('=== Bucket Sort Test ===');
    
    // Test case 1: Double array
    let arr1 = [0.897, 0.565, 0.656, 0.1234, 0.665, 0.3434];
    console.log('Original array:', arr1);
    const sorted1 = bucketSort([...arr1]);
    console.log('Sorted array:', sorted1);
    console.log();
    
    // Test case 2: Integer array
    let arr2 = [64, 34, 25, 12, 22, 11, 90];
    console.log('Integer array:', arr2);
    const sorted2 = bucketSortInteger([...arr2]);
    console.log('Sorted array:', sorted2);
    console.log();
    
    // Test case 3: With custom buckets
    let arr3 = [0.42, 0.32, 0.33, 0.52, 0.37, 0.47, 0.51];
    console.log('Array with custom buckets:', arr3);
    const sorted3 = bucketSortWithCustomBuckets([...arr3], 5);
    console.log('Sorted array:', sorted3);
    console.log();
    
    // Test case 4: String array
    let arr4 = ['word', 'category', 'apple', 'banana', 'cherry'];
    console.log('String array:', arr4);
    const sorted4 = bucketSortForStrings([...arr4]);
    console.log('Sorted string array:', sorted4);
    console.log();
    
    // Test case 5: With comparator
    let arr5 = [64, 34, 25, 12, 22, 11, 90];
    console.log('Array with comparator:', arr5);
    const sorted5 = bucketSortWithComparator([...arr5], (a, b) => a - b);
    console.log('Sorted array:', sorted5);
    console.log();
    
    // Test case 6: Double array (0.0 to 1.0)
    let arr6 = [0.897, 0.565, 0.656, 0.1234, 0.665, 0.3434];
    console.log('Double array (0.0 to 1.0):', arr6);
    const sorted6 = bucketSortForDoubles([...arr6]);
    console.log('Sorted array:', sorted6);
    console.log();
    
    // Test case 7: With range
    let arr7 = [1, 4, 1, 2, 7, 5, 2];
    console.log('Array with range [1, 7]:', arr7);
    const sorted7 = bucketSortWithRange([...arr7], 1, 7);
    console.log('Sorted array:', sorted7);
    console.log();
};

/**
 * @function performanceTest
 * @description Performance test for bucket sort
 * @returns {void}
 */
const performanceTest = () => {
    console.log('=== Performance Test ===');
    
    const sizes = [1000, 5000, 10000, 50000, 100000];
    
    sizes.forEach(size => {
        const arr = Array.from({ length: size }, () => Math.random());
        
        const startTime = performance.now();
        bucketSort([...arr]);
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
    
    // Test bucket sort
    let bucketTime = 0;
    for (let i = 0; i < iterations; i++) {
        const arr = [...testArray];
        const start = performance.now();
        bucketSort(arr);
        const end = performance.now();
        bucketTime += (end - start);
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
    
    console.log(`Bucket Sort average: ${(bucketTime / iterations).toFixed(2)} ms`);
    console.log(`Built-in Sort average: ${(builtinTime / iterations).toFixed(2)} ms`);
    console.log(`Bucket vs Built-in ratio: ${(bucketTime / builtinTime).toFixed(2)}x`);
};

// Main execution
if (require.main === module) {
    console.log('Bucket Sort Algorithm Implementation');
    console.log('===================================');
    
    // Run basic tests
    testBucketSort();
    
    // Run performance test
    performanceTest();
    
    // Run benchmark comparison
    benchmarkComparison();
    
    console.log('\nBucket Sort completed successfully!');
}

// Export functions for use in other modules
module.exports = {
    bucketSort,
    bucketSortInteger,
    bucketSortWithCustomBuckets,
    bucketSortForStrings,
    bucketSortWithComparator,
    bucketSortForDoubles,
    bucketSortWithRange,
    printArray,
    testBucketSort,
    performanceTest,
    generateRandomArray,
    isSorted,
    benchmarkComparison
};
