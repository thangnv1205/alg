/**
 * @file radix_sort.js
 * @description Implementation of Radix Sort algorithm in JavaScript
 * @author Algorithm Collection
 * @version 1.0
 */

/**
 * @function radixSort
 * @description Sorts an array using radix sort algorithm
 * @param {number[]} arr - Array to be sorted
 * @returns {number[]} - Sorted array
 */
const radixSort = (arr) => {
    if (arr.length === 0) {
        return arr;
    }
    
    // Find the maximum number to know number of digits
    const max = Math.max(...arr);
    
    // Do counting sort for every digit
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSortByDigit(arr, exp);
    }
    
    return arr;
};

/**
 * @function countingSortByDigit
 * @description Counting sort for a specific digit
 * @param {number[]} arr - Array to be sorted
 * @param {number} exp - Current digit position (1, 10, 100, ...)
 * @returns {void}
 */
const countingSortByDigit = (arr, exp) => {
    const n = arr.length;
    const output = new Array(n);
    const count = new Array(10).fill(0);
    
    // Count occurrences of each digit
    for (let i = 0; i < n; i++) {
        count[Math.floor(arr[i] / exp) % 10]++;
    }
    
    // Change count[i] so that count[i] now contains actual position
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    // Build the output array
    for (let i = n - 1; i >= 0; i--) {
        output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
        count[Math.floor(arr[i] / exp) % 10]--;
    }
    
    // Copy the output array to arr
    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }
};

/**
 * @function radixSortLSD
 * @description Least Significant Digit (LSD) radix sort
 * @param {number[]} arr - Array to be sorted
 * @returns {number[]} - Sorted array
 */
const radixSortLSD = (arr) => {
    if (arr.length === 0) {
        return arr;
    }
    
    const max = Math.max(...arr);
    
    // Process each digit from LSD to MSD
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSortByDigit(arr, exp);
    }
    
    return arr;
};

/**
 * @function radixSortMSD
 * @description Most Significant Digit (MSD) radix sort
 * @param {number[]} arr - Array to be sorted
 * @returns {number[]} - Sorted array
 */
const radixSortMSD = (arr) => {
    if (arr.length === 0) {
        return arr;
    }
    
    const max = Math.max(...arr);
    const maxDigits = Math.floor(Math.log10(max)) + 1;
    
    radixSortMSDHelper(arr, 0, arr.length - 1, maxDigits);
    return arr;
};

/**
 * @function radixSortMSDHelper
 * @description Helper function for MSD radix sort
 * @param {number[]} arr - Array to be sorted
 * @param {number} low - Starting index
 * @param {number} high - Ending index
 * @param {number} digit - Current digit position
 * @returns {void}
 */
const radixSortMSDHelper = (arr, low, high, digit) => {
    if (low >= high || digit <= 0) {
        return;
    }
    
    // Partition array by current digit
    const partition = partitionByDigit(arr, low, high, digit);
    
    // Recursively sort each partition
    for (let i = 0; i < partition.length - 1; i++) {
        if (partition[i] < partition[i + 1]) {
            radixSortMSDHelper(arr, partition[i], partition[i + 1] - 1, digit - 1);
        }
    }
};

/**
 * @function partitionByDigit
 * @description Partitions array by current digit
 * @param {number[]} arr - Array to partition
 * @param {number} low - Starting index
 * @param {number} high - Ending index
 * @param {number} digit - Current digit position
 * @returns {number[]} - Partition boundaries
 */
const partitionByDigit = (arr, low, high, digit) => {
    const exp = Math.pow(10, digit - 1);
    const count = new Array(10).fill(0);
    
    // Count occurrences of each digit
    for (let i = low; i <= high; i++) {
        count[Math.floor(arr[i] / exp) % 10]++;
    }
    
    // Calculate partition boundaries
    const partition = new Array(11);
    partition[0] = low;
    for (let i = 1; i <= 10; i++) {
        partition[i] = partition[i - 1] + count[i - 1];
    }
    
    // Rearrange elements
    const temp = arr.slice(low, high + 1);
    const pos = [...partition];
    
    for (let i = 0; i < temp.length; i++) {
        const digitValue = Math.floor(temp[i] / exp) % 10;
        arr[pos[digitValue]] = temp[i];
        pos[digitValue]++;
    }
    
    return partition;
};

/**
 * @function radixSortForStrings
 * @description Radix sort for strings
 * @param {string[]} arr - String array to be sorted
 * @returns {string[]} - Sorted array
 */
const radixSortForStrings = (arr) => {
    if (arr.length === 0) {
        return arr;
    }
    
    // Find maximum length
    const maxLength = Math.max(...arr.map(str => str.length));
    
    // Pad strings with spaces to make them same length
    const paddedArr = arr.map(str => str.padEnd(maxLength, ' '));
    
    // Sort by each character position from right to left
    for (let pos = maxLength - 1; pos >= 0; pos--) {
        countingSortByCharacter(paddedArr, pos);
    }
    
    // Remove padding spaces
    return paddedArr.map(str => str.trim());
};

/**
 * @function countingSortByCharacter
 * @description Counting sort for a specific character position
 * @param {string[]} arr - String array to be sorted
 * @param {number} pos - Character position
 * @returns {void}
 */
const countingSortByCharacter = (arr, pos) => {
    const n = arr.length;
    const output = new Array(n);
    const count = new Array(256).fill(0); // ASCII range
    
    // Count occurrences of each character
    for (let i = 0; i < n; i++) {
        count[arr[i].charCodeAt(pos)]++;
    }
    
    // Calculate cumulative count
    for (let i = 1; i < 256; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array
    for (let i = n - 1; i >= 0; i--) {
        output[count[arr[i].charCodeAt(pos)] - 1] = arr[i];
        count[arr[i].charCodeAt(pos)]--;
    }
    
    // Copy output back to original array
    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }
};

/**
 * @function radixSortWithBase
 * @description Radix sort with custom base
 * @param {number[]} arr - Array to be sorted
 * @param {number} base - Base for radix sort
 * @returns {number[]} - Sorted array
 */
const radixSortWithBase = (arr, base = 10) => {
    if (arr.length === 0) {
        return arr;
    }
    
    const max = Math.max(...arr);
    
    // Do counting sort for every digit
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= base) {
        countingSortByDigitBase(arr, exp, base);
    }
    
    return arr;
};

/**
 * @function countingSortByDigitBase
 * @description Counting sort for a specific digit with custom base
 * @param {number[]} arr - Array to be sorted
 * @param {number} exp - Current digit position
 * @param {number} base - Base for radix sort
 * @returns {void}
 */
const countingSortByDigitBase = (arr, exp, base) => {
    const n = arr.length;
    const output = new Array(n);
    const count = new Array(base).fill(0);
    
    // Count occurrences of each digit
    for (let i = 0; i < n; i++) {
        count[Math.floor(arr[i] / exp) % base]++;
    }
    
    // Change count[i] so that count[i] now contains actual position
    for (let i = 1; i < base; i++) {
        count[i] += count[i - 1];
    }
    
    // Build the output array
    for (let i = n - 1; i >= 0; i--) {
        output[count[Math.floor(arr[i] / exp) % base] - 1] = arr[i];
        count[Math.floor(arr[i] / exp) % base]--;
    }
    
    // Copy the output array to arr
    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
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
 * @function testRadixSort
 * @description Test function to demonstrate radix sort
 * @returns {void}
 */
const testRadixSort = () => {
    console.log('=== Radix Sort Test ===');
    
    // Test case 1: Random array
    let arr1 = [170, 45, 75, 90, 2, 802, 24, 66];
    console.log('Original array:', arr1);
    const sorted1 = radixSort([...arr1]);
    console.log('Sorted array:', sorted1);
    console.log();
    
    // Test case 2: Array with different number of digits
    let arr2 = [1, 10, 100, 1000, 10000, 100000];
    console.log('Array with different digits:', arr2);
    const sorted2 = radixSortLSD([...arr2]);
    console.log('LSD sorted array:', sorted2);
    console.log();
    
    // Test case 3: MSD radix sort
    let arr3 = [329, 457, 657, 839, 436, 720, 355];
    console.log('Array for MSD sort:', arr3);
    const sorted3 = radixSortMSD([...arr3]);
    console.log('MSD sorted array:', sorted3);
    console.log();
    
    // Test case 4: String array
    let arr4 = ['word', 'category', 'apple', 'banana', 'cherry'];
    console.log('String array:', arr4);
    const sorted4 = radixSortForStrings([...arr4]);
    console.log('Sorted string array:', sorted4);
    console.log();
    
    // Test case 5: With custom base
    let arr5 = [170, 45, 75, 90, 2, 802, 24, 66];
    console.log('Array with base 8:', arr5);
    const sorted5 = radixSortWithBase([...arr5], 8);
    console.log('Sorted array:', sorted5);
    console.log();
};

/**
 * @function performanceTest
 * @description Performance test for radix sort
 * @returns {void}
 */
const performanceTest = () => {
    console.log('=== Performance Test ===');
    
    const sizes = [1000, 5000, 10000, 50000, 100000];
    
    sizes.forEach(size => {
        const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 1000000));
        
        const startTime = performance.now();
        radixSort([...arr]);
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
const generateRandomArray = (size, max = 1000000) => {
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
    
    // Test radix sort
    let radixTime = 0;
    for (let i = 0; i < iterations; i++) {
        const arr = [...testArray];
        const start = performance.now();
        radixSort(arr);
        const end = performance.now();
        radixTime += (end - start);
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
    
    console.log(`Radix Sort average: ${(radixTime / iterations).toFixed(2)} ms`);
    console.log(`Built-in Sort average: ${(builtinTime / iterations).toFixed(2)} ms`);
    console.log(`Radix vs Built-in ratio: ${(radixTime / builtinTime).toFixed(2)}x`);
};

// Main execution
if (require.main === module) {
    console.log('Radix Sort Algorithm Implementation');
    console.log('===================================');
    
    // Run basic tests
    testRadixSort();
    
    // Run performance test
    performanceTest();
    
    // Run benchmark comparison
    benchmarkComparison();
    
    console.log('\nRadix Sort completed successfully!');
}

// Export functions for use in other modules
module.exports = {
    radixSort,
    radixSortLSD,
    radixSortMSD,
    radixSortForStrings,
    radixSortWithBase,
    printArray,
    testRadixSort,
    performanceTest,
    generateRandomArray,
    isSorted,
    benchmarkComparison
};
