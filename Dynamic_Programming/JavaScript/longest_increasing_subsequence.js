/**
 * @file longest_increasing_subsequence.js
 * @description Implementation of Longest Increasing Subsequence algorithm in JavaScript
 * @author Algorithm Collection
 * @version 1.0
 */

/**
 * @function lisDP
 * @description Dynamic programming implementation of LIS
 * @param {Array<number>} arr - Input array
 * @returns {number} - Length of longest increasing subsequence
 */
function lisDP(arr) {
    if (arr.length === 0) return 0;
    
    const n = arr.length;
    const dp = new Array(n).fill(1);
    
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[j] < arr[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    
    return Math.max(...dp);
}

/**
 * @function lisWithSequence
 * @description LIS that returns the actual subsequence
 * @param {Array<number>} arr - Input array
 * @returns {Array<number>} - Longest increasing subsequence
 */
function lisWithSequence(arr) {
    if (arr.length === 0) return [];
    
    const n = arr.length;
    const dp = new Array(n).fill(1);
    const parent = new Array(n).fill(-1);
    
    let maxLength = 1;
    let maxIndex = 0;
    
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[j] < arr[i] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                parent[i] = j;
            }
        }
        if (dp[i] > maxLength) {
            maxLength = dp[i];
            maxIndex = i;
        }
    }
    
    // Reconstruct sequence
    const sequence = [];
    let current = maxIndex;
    while (current !== -1) {
        sequence.push(arr[current]);
        current = parent[current];
    }
    
    return sequence.reverse();
}

/**
 * @function lisBinarySearch
 * @description LIS using binary search optimization
 * @param {Array<number>} arr - Input array
 * @returns {number} - Length of longest increasing subsequence
 */
function lisBinarySearch(arr) {
    if (arr.length === 0) return 0;
    
    const tail = [arr[0]];
    
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > tail[tail.length - 1]) {
            tail.push(arr[i]);
        } else {
            const pos = binarySearch(tail, arr[i]);
            tail[pos] = arr[i];
        }
    }
    
    return tail.length;
}

/**
 * @function binarySearch
 * @description Binary search helper for LIS
 * @param {Array<number>} tail - Tail array
 * @param {number} key - Key to search for
 * @returns {number} - Position to insert/replace
 */
function binarySearch(tail, key) {
    let left = 0, right = tail.length - 1;
    
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        if (tail[mid] < key) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}

/**
 * @function lisWithSequenceBinarySearch
 * @description LIS with sequence using binary search
 * @param {Array<number>} arr - Input array
 * @returns {Array<number>} - Longest increasing subsequence
 */
function lisWithSequenceBinarySearch(arr) {
    if (arr.length === 0) return [];
    
    const tail = [arr[0]];
    const indices = [0];
    const parent = new Array(arr.length).fill(-1);
    
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > tail[tail.length - 1]) {
            tail.push(arr[i]);
            indices.push(i);
            if (indices.length > 1) {
                parent[i] = indices[indices.length - 2];
            }
        } else {
            const pos = binarySearch(tail, arr[i]);
            tail[pos] = arr[i];
            indices[pos] = i;
            if (pos > 0) {
                parent[i] = indices[pos - 1];
            }
        }
    }
    
    // Reconstruct sequence
    const sequence = [];
    let current = indices[indices.length - 1];
    while (current !== -1) {
        sequence.push(arr[current]);
        current = parent[current];
    }
    
    return sequence.reverse();
}

/**
 * @function lisStrictlyIncreasing
 * @description LIS for strictly increasing subsequence
 * @param {Array<number>} arr - Input array
 * @returns {number} - Length of longest strictly increasing subsequence
 */
function lisStrictlyIncreasing(arr) {
    if (arr.length === 0) return 0;
    
    const tail = [arr[0]];
    
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > tail[tail.length - 1]) {
            tail.push(arr[i]);
        } else {
            const pos = binarySearch(tail, arr[i]);
            if (tail[pos] !== arr[i]) {
                tail[pos] = arr[i];
            }
        }
    }
    
    return tail.length;
}

/**
 * @function lisNonDecreasing
 * @description LIS for non-decreasing subsequence
 * @param {Array<number>} arr - Input array
 * @returns {number} - Length of longest non-decreasing subsequence
 */
function lisNonDecreasing(arr) {
    if (arr.length === 0) return 0;
    
    const tail = [arr[0]];
    
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] >= tail[tail.length - 1]) {
            tail.push(arr[i]);
        } else {
            const pos = binarySearchNonDecreasing(tail, arr[i]);
            tail[pos] = arr[i];
        }
    }
    
    return tail.length;
}

/**
 * @function binarySearchNonDecreasing
 * @description Binary search for non-decreasing LIS
 * @param {Array<number>} tail - Tail array
 * @param {number} key - Key to search for
 * @returns {number} - Position to insert/replace
 */
function binarySearchNonDecreasing(tail, key) {
    let left = 0, right = tail.length - 1;
    
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        if (tail[mid] <= key) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}

/**
 * @function lisWithCount
 * @description LIS that returns count of all possible LIS
 * @param {Array<number>} arr - Input array
 * @returns {number} - Count of longest increasing subsequences
 */
function lisWithCount(arr) {
    if (arr.length === 0) return 0;
    
    const n = arr.length;
    const dp = new Array(n).fill(1);
    const count = new Array(n).fill(1);
    
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[j] < arr[i]) {
                if (dp[j] + 1 > dp[i]) {
                    dp[i] = dp[j] + 1;
                    count[i] = count[j];
                } else if (dp[j] + 1 === dp[i]) {
                    count[i] += count[j];
                }
            }
        }
    }
    
    const maxLength = Math.max(...dp);
    let totalCount = 0;
    
    for (let i = 0; i < n; i++) {
        if (dp[i] === maxLength) {
            totalCount += count[i];
        }
    }
    
    return totalCount;
}

/**
 * @function createSampleData
 * @description Creates sample data for testing
 * @returns {Array<Array<number>>} - Array of test cases
 */
function createSampleData() {
    return [
        [10, 9, 2, 5, 3, 7, 101, 18],
        [0, 1, 0, 3, 2, 3],
        [7, 7, 7, 7, 7, 7, 7],
        [1, 3, 6, 7, 9, 4, 10, 5, 6],
        [1, 2, 3, 4, 5],
        [5, 4, 3, 2, 1],
        [1],
        []
    ];
}

/**
 * @function testLIS
 * @description Test function to demonstrate LIS algorithms
 * @returns {void}
 */
function testLIS() {
    console.log("=== Longest Increasing Subsequence Test ===");
    
    const testCases = createSampleData();
    
    for (let i = 0; i < testCases.length; i++) {
        const arr = testCases[i];
        console.log(`Test case ${i + 1}: [${arr.join(', ')}]`);
        
        if (arr.length === 0) {
            console.log("Empty array - LIS length: 0");
            console.log();
            continue;
        }
        
        // Test DP
        const startTime = performance.now();
        const dpResult = lisDP(arr);
        const endTime = performance.now();
        console.log(`DP: ${dpResult} (${(endTime - startTime).toFixed(2)} ms)`);
        
        // Test Binary Search
        const startTime2 = performance.now();
        const binaryResult = lisBinarySearch(arr);
        const endTime2 = performance.now();
        console.log(`Binary Search: ${binaryResult} (${(endTime2 - startTime2).toFixed(2)} ms)`);
        
        // Test with sequence
        const sequence = lisWithSequence(arr);
        console.log(`LIS sequence: [${sequence.join(', ')}]`);
        
        // Test strictly increasing
        const strictResult = lisStrictlyIncreasing(arr);
        console.log(`Strictly increasing: ${strictResult}`);
        
        // Test non-decreasing
        const nonDecreasingResult = lisNonDecreasing(arr);
        console.log(`Non-decreasing: ${nonDecreasingResult}`);
        
        // Test count
        const countResult = lisWithCount(arr);
        console.log(`Count of LIS: ${countResult}`);
        
        console.log();
    }
}

/**
 * @function performanceTest
 * @description Performance test for LIS algorithms
 * @returns {void}
 */
function performanceTest() {
    console.log("=== Performance Test ===");
    
    const sizes = [1000, 5000, 10000, 20000, 50000];
    
    for (const size of sizes) {
        const arr = generateRandomArray(size);
        
        console.log(`Array size: ${size}`);
        
        // Test DP
        const startTime = performance.now();
        lisDP(arr);
        const endTime = performance.now();
        console.log(`  DP: ${(endTime - startTime).toFixed(2)} ms`);
        
        // Test Binary Search
        const startTime2 = performance.now();
        lisBinarySearch(arr);
        const endTime2 = performance.now();
        console.log(`  Binary Search: ${(endTime2 - startTime2).toFixed(2)} ms`);
        
        console.log();
    }
}

/**
 * @function generateRandomArray
 * @description Generates a random array of given size
 * @param {number} size - Size of array to generate
 * @returns {Array<number>} - Random array
 */
function generateRandomArray(size) {
    const arr = [];
    
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * 1000));
    }
    
    return arr;
}

/**
 * @function main
 * @description Main function to run the LIS demonstration
 * @returns {void}
 */
function main() {
    console.log("Longest Increasing Subsequence Algorithm Implementation");
    console.log("=====================================================");
    
    // Run basic tests
    testLIS();
    
    // Run performance test
    performanceTest();
    
    console.log("\nLongest Increasing Subsequence completed successfully!");
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        lisDP,
        lisWithSequence,
        lisBinarySearch,
        lisWithSequenceBinarySearch,
        lisStrictlyIncreasing,
        lisNonDecreasing,
        lisWithCount,
        createSampleData,
        testLIS,
        performanceTest,
        main
    };
}

// Run the main function if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    main();
}
