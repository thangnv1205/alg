/**
 * @file edit_distance.js
 * @description Implementation of Edit Distance (Levenshtein) algorithm in JavaScript
 * @author Algorithm Collection
 * @version 1.0
 */

/**
 * @function editDistanceRecursive
 * @description Recursive implementation of edit distance
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {number} - Edit distance between strings
 */
function editDistanceRecursive(str1, str2) {
    return editDistanceRecursiveHelper(str1, str2, str1.length, str2.length);
}

/**
 * @function editDistanceRecursiveHelper
 * @description Helper function for recursive edit distance
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @param {number} m - Length of first string
 * @param {number} n - Length of second string
 * @returns {number} - Edit distance between strings
 */
function editDistanceRecursiveHelper(str1, str2, m, n) {
    if (m === 0) return n;
    if (n === 0) return m;
    
    if (str1.charAt(m - 1) === str2.charAt(n - 1)) {
        return editDistanceRecursiveHelper(str1, str2, m - 1, n - 1);
    }
    
    return 1 + Math.min(
        Math.min(
            editDistanceRecursiveHelper(str1, str2, m, n - 1),     // Insert
            editDistanceRecursiveHelper(str1, str2, m - 1, n)       // Remove
        ),
        editDistanceRecursiveHelper(str1, str2, m - 1, n - 1)       // Replace
    );
}

/**
 * @function editDistanceDP
 * @description Dynamic programming implementation of edit distance
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {number} - Edit distance between strings
 */
function editDistanceDP(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    // Initialize base cases
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i;
    }
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
    }
    
    // Fill DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1.charAt(i - 1) === str2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(
                    Math.min(dp[i][j - 1],     // Insert
                            dp[i - 1][j]),     // Remove
                    dp[i - 1][j - 1]           // Replace
                );
            }
        }
    }
    
    return dp[m][n];
}

/**
 * @function editDistanceOptimized
 * @description Space-optimized implementation of edit distance
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {number} - Edit distance between strings
 */
function editDistanceOptimized(str1, str2) {
    let m = str1.length;
    let n = str2.length;
    
    // Ensure str1 is the shorter string
    if (m > n) {
        const temp = str1;
        str1 = str2;
        str2 = temp;
        const tempLen = m;
        m = n;
        n = tempLen;
    }
    
    const prev = new Array(m + 1);
    const curr = new Array(m + 1);
    
    // Initialize first row
    for (let i = 0; i <= m; i++) {
        prev[i] = i;
    }
    
    // Fill DP table
    for (let j = 1; j <= n; j++) {
        curr[0] = j;
        for (let i = 1; i <= m; i++) {
            if (str1.charAt(i - 1) === str2.charAt(j - 1)) {
                curr[i] = prev[i - 1];
            } else {
                curr[i] = 1 + Math.min(
                    Math.min(curr[i - 1],      // Insert
                            prev[i]),          // Remove
                    prev[i - 1]                // Replace
                );
            }
        }
        
        // Swap arrays
        const temp = prev;
        prev = curr;
        curr = temp;
    }
    
    return prev[m];
}

/**
 * @function editDistanceWithOperations
 * @description Edit distance that returns the sequence of operations
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {Array<string>} - List of operations to transform str1 to str2
 */
function editDistanceWithOperations(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    // Initialize base cases
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i;
    }
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
    }
    
    // Fill DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1.charAt(i - 1) === str2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(
                    Math.min(dp[i][j - 1],     // Insert
                            dp[i - 1][j]),     // Remove
                    dp[i - 1][j - 1]           // Replace
                );
            }
        }
    }
    
    // Backtrack to find operations
    const operations = [];
    let i = m, j = n;
    
    while (i > 0 && j > 0) {
        if (str1.charAt(i - 1) === str2.charAt(j - 1)) {
            i--;
            j--;
        } else if (dp[i][j] === dp[i - 1][j - 1] + 1) {
            operations.push(`Replace '${str1.charAt(i - 1)}' with '${str2.charAt(j - 1)}'`);
            i--;
            j--;
        } else if (dp[i][j] === dp[i - 1][j] + 1) {
            operations.push(`Remove '${str1.charAt(i - 1)}'`);
            i--;
        } else {
            operations.push(`Insert '${str2.charAt(j - 1)}'`);
            j--;
        }
    }
    
    while (i > 0) {
        operations.push(`Remove '${str1.charAt(i - 1)}'`);
        i--;
    }
    
    while (j > 0) {
        operations.push(`Insert '${str2.charAt(j - 1)}'`);
        j--;
    }
    
    return operations.reverse();
}

/**
 * @function editDistanceWeighted
 * @description Weighted edit distance with custom costs
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @param {number} insertCost - Cost of insertion
 * @param {number} deleteCost - Cost of deletion
 * @param {number} replaceCost - Cost of replacement
 * @returns {number} - Weighted edit distance
 */
function editDistanceWeighted(str1, str2, insertCost, deleteCost, replaceCost) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    // Initialize base cases
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i * deleteCost;
    }
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j * insertCost;
    }
    
    // Fill DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1.charAt(i - 1) === str2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(
                    Math.min(
                        dp[i][j - 1] + insertCost,     // Insert
                        dp[i - 1][j] + deleteCost      // Delete
                    ),
                    dp[i - 1][j - 1] + replaceCost    // Replace
                );
            }
        }
    }
    
    return dp[m][n];
}

/**
 * @function longestCommonSubsequence
 * @description Longest Common Subsequence using edit distance approach
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {number} - Length of longest common subsequence
 */
function longestCommonSubsequence(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1.charAt(i - 1) === str2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}

/**
 * @function createSampleData
 * @description Creates sample data for testing
 * @returns {Object} - Sample string pairs
 */
function createSampleData() {
    return {
        "kitten": "sitting",
    "sunday": "saturday",
    "abc": "def",
    "": "abc",
    "abc": "",
    "same": "same"
    };
}

/**
 * @function testEditDistance
 * @description Test function to demonstrate edit distance algorithms
 * @returns {void}
 */
function testEditDistance() {
    console.log("=== Edit Distance Test ===");
    
    const data = createSampleData();
    
    for (const [str1, str2] of Object.entries(data)) {
        console.log(`String 1: "${str1}"`);
        console.log(`String 2: "${str2}"`);
        
        // Test recursive (only for small strings)
        if (str1.length <= 10 && str2.length <= 10) {
            const startTime = performance.now();
            const recursiveResult = editDistanceRecursive(str1, str2);
            const endTime = performance.now();
            console.log(`Recursive: ${recursiveResult} (${(endTime - startTime).toFixed(2)} ms)`);
        }
        
        // Test DP
        const startTime = performance.now();
        const dpResult = editDistanceDP(str1, str2);
        const endTime = performance.now();
        console.log(`DP: ${dpResult} (${(endTime - startTime).toFixed(2)} ms)`);
        
        // Test optimized
        const startTime2 = performance.now();
        const optimizedResult = editDistanceOptimized(str1, str2);
        const endTime2 = performance.now();
        console.log(`Optimized: ${optimizedResult} (${(endTime2 - startTime2).toFixed(2)} ms)`);
        
        // Test with operations
        const operations = editDistanceWithOperations(str1, str2);
        console.log("Operations:", operations);
        
        // Test weighted
        const weightedResult = editDistanceWeighted(str1, str2, 1, 1, 2);
        console.log("Weighted (insert=1, delete=1, replace=2):", weightedResult);
        
        // Test LCS
        const lcsResult = longestCommonSubsequence(str1, str2);
        console.log("Longest Common Subsequence:", lcsResult);
        
        console.log();
    }
}

/**
 * @function performanceTest
 * @description Performance test for edit distance algorithms
 * @returns {void}
 */
function performanceTest() {
    console.log("=== Performance Test ===");
    
    const sizes = [100, 500, 1000, 2000, 5000];
    
    for (const size of sizes) {
        const str1 = generateRandomString(size);
        const str2 = generateRandomString(size);
        
        console.log(`String length: ${size}`);
        
        // Test DP
        const startTime = performance.now();
        editDistanceDP(str1, str2);
        const endTime = performance.now();
        console.log(`  DP: ${(endTime - startTime).toFixed(2)} ms`);
        
        // Test Optimized
        const startTime2 = performance.now();
        editDistanceOptimized(str1, str2);
        const endTime2 = performance.now();
        console.log(`  Optimized: ${(endTime2 - startTime2).toFixed(2)} ms`);
        
        console.log();
    }
}

/**
 * @function generateRandomString
 * @description Generates a random string of given length
 * @param {number} length - Length of string to generate
 * @returns {string} - Random string
 */
function generateRandomString(length) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    return result;
}

/**
 * @function main
 * @description Main function to run the edit distance demonstration
 * @returns {void}
 */
function main() {
    console.log("Edit Distance Algorithm Implementation");
    console.log("====================================");
    
    // Run basic tests
    testEditDistance();
    
    // Run performance test
    performanceTest();
    
    console.log("\nEdit distance completed successfully!");
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        editDistanceRecursive,
        editDistanceDP,
        editDistanceOptimized,
        editDistanceWithOperations,
        editDistanceWeighted,
        longestCommonSubsequence,
        createSampleData,
        testEditDistance,
        performanceTest,
        main
    };
}

// Run the main function if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    main();
}
