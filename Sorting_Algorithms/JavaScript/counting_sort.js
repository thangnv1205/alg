/**
 * @file counting_sort.js
 * @description Implementation of Counting Sort algorithm in JavaScript
 * @author Algorithm Collection
 * @version 1.0
 */

/**
 * @function countingSort
 * @description Sorts an array using counting sort algorithm
 * @param {number[]} arr - Array to be sorted
 * @returns {number[]} - Sorted array
 */
const countingSort = (arr) => {
    if (arr.length === 0) {
        return arr;
    }
    
    // Find the maximum and minimum elements
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    
    // Create count array
    const range = max - min + 1;
    const count = new Array(range).fill(0);
    const output = new Array(arr.length);
    
    // Count occurrences of each element
    for (let i = 0; i < arr.length; i++) {
        count[arr[i] - min]++;
    }
    
    // Modify count array to store actual position
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array
    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }
    
    return output;
};

/**
 * @function countingSortStable
 * @description Stable version of counting sort
 * @param {number[]} arr - Array to be sorted
 * @returns {number[]} - Sorted array
 */
const countingSortStable = (arr) => {
    if (arr.length === 0) {
        return arr;
    }
    
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;
    
    const count = new Array(range).fill(0);
    const output = new Array(arr.length);
    
    // Count occurrences
    for (const value of arr) {
        count[value - min]++;
    }
    
    // Calculate cumulative count
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array in reverse order to maintain stability
    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }
    
    return output;
};

/**
 * @function countingSortWithRange
 * @description Counting sort with specified range
 * @param {number[]} arr - Array to be sorted
 * @param {number} min - Minimum value in range
 * @param {number} max - Maximum value in range
 * @returns {number[]} - Sorted array
 */
const countingSortWithRange = (arr, min, max) => {
    if (arr.length === 0) {
        return arr;
    }
    
    const range = max - min + 1;
    const count = new Array(range).fill(0);
    const output = new Array(arr.length);
    
    // Count occurrences
    for (const value of arr) {
        if (value < min || value > max) {
            throw new Error(`Value ${value} is outside range [${min}, ${max}]`);
        }
        count[value - min]++;
    }
    
    // Calculate cumulative count
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array
    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }
    
    return output;
};

/**
 * @function countingSortForCharacters
 * @description Counting sort for character arrays
 * @param {string} str - String to be sorted
 * @returns {string} - Sorted string
 */
const countingSortForCharacters = (str) => {
    if (str.length === 0) {
        return str;
    }
    
    // ASCII range for characters
    const count = new Array(256).fill(0);
    const output = new Array(str.length);
    
    // Count occurrences
    for (let i = 0; i < str.length; i++) {
        count[str.charCodeAt(i)]++;
    }
    
    // Calculate cumulative count
    for (let i = 1; i < 256; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array
    for (let i = str.length - 1; i >= 0; i--) {
        output[count[str.charCodeAt(i)] - 1] = str[i];
        count[str.charCodeAt(i)]--;
    }
    
    return output.join('');
};

/**
 * @function countingSortForObjects
 * @description Counting sort for objects with numeric keys
 * @param {Object[]} arr - Array of objects to be sorted
 * @param {string} key - Key to sort by
 * @returns {Object[]} - Sorted array
 */
const countingSortForObjects = (arr, key) => {
    if (arr.length === 0) {
        return arr;
    }
    
    // Extract values and find range
    const values = arr.map(obj => obj[key]);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min + 1;
    
    const count = new Array(range).fill(0);
    const output = new Array(arr.length);
    
    // Count occurrences
    for (const value of values) {
        count[value - min]++;
    }
    
    // Calculate cumulative count
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array
    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[values[i] - min] - 1] = arr[i];
        count[values[i] - min]--;
    }
    
    return output;
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
 * @function testCountingSort
 * @description Test function to demonstrate counting sort
 * @returns {void}
 */
const testCountingSort = () => {
    console.log('=== Counting Sort Test ===');
    
    // Test case 1: Random array
    let arr1 = [4, 2, 2, 8, 3, 3, 1];
    console.log('Original array:', arr1);
    const sorted1 = countingSort([...arr1]);
    console.log('Sorted array:', sorted1);
    console.log();
    
    // Test case 2: Array with duplicates
    let arr2 = [1, 4, 1, 2, 7, 5, 2];
    console.log('Array with duplicates:', arr2);
    const sorted2 = countingSortStable([...arr2]);
    console.log('Stable sorted array:', sorted2);
    console.log();
    
    // Test case 3: Negative numbers
    let arr3 = [-5, -10, 0, -3, 8, 5, -1, 10];
    console.log('Array with negative numbers:', arr3);
    const sorted3 = countingSort([...arr3]);
    console.log('Sorted array:', sorted3);
    console.log();
    
    // Test case 4: Character array
    const str4 = 'geeksforgeeks';
    console.log('Character string:', str4);
    const sorted4 = countingSortForCharacters(str4);
    console.log('Sorted character string:', sorted4);
    console.log();
    
    // Test case 5: With specified range
    let arr5 = [1, 4, 1, 2, 7, 5, 2];
    console.log('Array with range [1, 7]:', arr5);
    const sorted5 = countingSortWithRange([...arr5], 1, 7);
    console.log('Sorted array:', sorted5);
    console.log();
    
    // Test case 6: Object array
    const arr6 = [
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 30 },
        { name: 'Charlie', age: 20 },
        { name: 'David', age: 25 }
    ];
    console.log('Object array:', arr6);
    const sorted6 = countingSortForObjects([...arr6], 'age');
    console.log('Sorted by age:', sorted6);
    console.log();
};

/**
 * @function performanceTest
 * @description Performance test for counting sort
 * @returns {void}
 */
const performanceTest = () => {
    console.log('=== Performance Test ===');
    
    const sizes = [1000, 5000, 10000, 50000, 100000];
    
    sizes.forEach(size => {
        const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
        
        const startTime = performance.now();
        countingSort([...arr]);
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
    
    // Test counting sort
    let countingTime = 0;
    for (let i = 0; i < iterations; i++) {
        const arr = [...testArray];
        const start = performance.now();
        countingSort(arr);
        const end = performance.now();
        countingTime += (end - start);
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
    
    console.log(`Counting Sort average: ${(countingTime / iterations).toFixed(2)} ms`);
    console.log(`Built-in Sort average: ${(builtinTime / iterations).toFixed(2)} ms`);
    console.log(`Counting vs Built-in ratio: ${(countingTime / builtinTime).toFixed(2)}x`);
};

// Main execution
if (require.main === module) {
    console.log('Counting Sort Algorithm Implementation');
    console.log('=====================================');
    
    // Run basic tests
    testCountingSort();
    
    // Run performance test
    performanceTest();
    
    // Run benchmark comparison
    benchmarkComparison();
    
    console.log('\nCounting Sort completed successfully!');
}

// Export functions for use in other modules
module.exports = {
    countingSort,
    countingSortStable,
    countingSortWithRange,
    countingSortForCharacters,
    countingSortForObjects,
    printArray,
    testCountingSort,
    performanceTest,
    generateRandomArray,
    isSorted,
    benchmarkComparison
};
