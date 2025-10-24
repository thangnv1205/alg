/**
 * @file knapsack_problem.js
 * @description Implementation of Knapsack Problem algorithm in JavaScript
 * @author Algorithm Collection
 * @version 1.0
 */

/**
 * @function knapsack01Recursive
 * @description Recursive implementation of 0/1 Knapsack
 * @param {Array<number>} weights - Array of item weights
 * @param {Array<number>} values - Array of item values
 * @param {number} capacity - Knapsack capacity
 * @returns {number} - Maximum value that can be obtained
 */
function knapsack01Recursive(weights, values, capacity) {
    return knapsack01RecursiveHelper(weights, values, capacity, weights.length);
}

/**
 * @function knapsack01RecursiveHelper
 * @description Helper function for recursive 0/1 Knapsack
 * @param {Array<number>} weights - Array of item weights
 * @param {Array<number>} values - Array of item values
 * @param {number} capacity - Remaining capacity
 * @param {number} n - Number of items to consider
 * @returns {number} - Maximum value that can be obtained
 */
function knapsack01RecursiveHelper(weights, values, capacity, n) {
    if (n === 0 || capacity === 0) {
        return 0;
    }
    
    if (weights[n - 1] > capacity) {
        return knapsack01RecursiveHelper(weights, values, capacity, n - 1);
    }
    
    return Math.max(
        values[n - 1] + knapsack01RecursiveHelper(weights, values, capacity - weights[n - 1], n - 1),
        knapsack01RecursiveHelper(weights, values, capacity, n - 1)
    );
}

/**
 * @function knapsack01DP
 * @description Dynamic programming implementation of 0/1 Knapsack
 * @param {Array<number>} weights - Array of item weights
 * @param {Array<number>} values - Array of item values
 * @param {number} capacity - Knapsack capacity
 * @returns {number} - Maximum value that can be obtained
 */
function knapsack01DP(weights, values, capacity) {
    const n = weights.length;
    const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(
                    values[i - 1] + dp[i - 1][w - weights[i - 1]],
                    dp[i - 1][w]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    
    return dp[n][capacity];
}

/**
 * @function knapsack01Optimized
 * @description Space-optimized implementation of 0/1 Knapsack
 * @param {Array<number>} weights - Array of item weights
 * @param {Array<number>} values - Array of item values
 * @param {number} capacity - Knapsack capacity
 * @returns {number} - Maximum value that can be obtained
 */
function knapsack01Optimized(weights, values, capacity) {
    const dp = new Array(capacity + 1).fill(0);
    
    for (let i = 0; i < weights.length; i++) {
        for (let w = capacity; w >= weights[i]; w--) {
            dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }
    
    return dp[capacity];
}

/**
 * @function knapsack01WithItems
 * @description 0/1 Knapsack that returns selected items
 * @param {Array<number>} weights - Array of item weights
 * @param {Array<number>} values - Array of item values
 * @param {number} capacity - Knapsack capacity
 * @returns {Array<number>} - List of selected item indices
 */
function knapsack01WithItems(weights, values, capacity) {
    const n = weights.length;
    const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));
    
    // Fill DP table
    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(
                    values[i - 1] + dp[i - 1][w - weights[i - 1]],
                    dp[i - 1][w]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    
    // Backtrack to find selected items
    const selectedItems = [];
    let i = n, w = capacity;
    
    while (i > 0 && w > 0) {
        if (dp[i][w] !== dp[i - 1][w]) {
            selectedItems.push(i - 1);
            w -= weights[i - 1];
        }
        i--;
    }
    
    return selectedItems.reverse();
}

/**
 * @function knapsackFractional
 * @description Fractional knapsack using greedy approach
 * @param {Array<number>} weights - Array of item weights
 * @param {Array<number>} values - Array of item values
 * @param {number} capacity - Knapsack capacity
 * @returns {number} - Maximum value that can be obtained
 */
function knapsackFractional(weights, values, capacity) {
    const n = weights.length;
    const items = [];
    
    for (let i = 0; i < n; i++) {
        items.push({
            index: i,
            weight: weights[i],
            value: values[i],
            valuePerWeight: values[i] / weights[i]
        });
    }
    
    // Sort by value per unit weight
    items.sort((a, b) => b.valuePerWeight - a.valuePerWeight);
    
    let totalValue = 0;
    let remainingCapacity = capacity;
    
    for (const item of items) {
        if (remainingCapacity >= item.weight) {
            totalValue += item.value;
            remainingCapacity -= item.weight;
        } else {
            totalValue += item.valuePerWeight * remainingCapacity;
            break;
        }
    }
    
    return totalValue;
}

/**
 * @function knapsackUnbounded
 * @description Unbounded knapsack problem
 * @param {Array<number>} weights - Array of item weights
 * @param {Array<number>} values - Array of item values
 * @param {number} capacity - Knapsack capacity
 * @returns {number} - Maximum value that can be obtained
 */
function knapsackUnbounded(weights, values, capacity) {
    const dp = new Array(capacity + 1).fill(0);
    
    for (let w = 1; w <= capacity; w++) {
        for (let i = 0; i < weights.length; i++) {
            if (weights[i] <= w) {
                dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
            }
        }
    }
    
    return dp[capacity];
}

/**
 * @function knapsackMultiple
 * @description Multiple knapsack problem
 * @param {Array<number>} weights - Array of item weights
 * @param {Array<number>} values - Array of item values
 * @param {Array<number>} capacities - Array of knapsack capacities
 * @returns {number} - Maximum value that can be obtained
 */
function knapsackMultiple(weights, values, capacities) {
    const n = weights.length;
    const k = capacities.length;
    const dp = Array(n + 1).fill().map(() => 
        Array(k + 1).fill().map(() => new Array(Math.max(...capacities) + 1).fill(0))
    );
    
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= k; j++) {
            for (let w = 1; w <= capacities[j - 1]; w++) {
                if (weights[i - 1] <= w) {
                    dp[i][j][w] = Math.max(
                        values[i - 1] + dp[i - 1][j][w - weights[i - 1]],
                        dp[i - 1][j][w]
                    );
                } else {
                    dp[i][j][w] = dp[i - 1][j][w];
                }
            }
        }
    }
    
    return dp[n][k][capacities[k - 1]];
}

/**
 * @function createSampleData
 * @description Creates sample data for testing
 * @returns {Object} - Sample data
 */
function createSampleData() {
    return {
        weights: [10, 20, 30, 40, 50],
        values: [60, 100, 120, 160, 200],
        capacity: 100
    };
}

/**
 * @function testKnapsack
 * @description Test function to demonstrate knapsack algorithms
 * @returns {void}
 */
function testKnapsack() {
    console.log("=== Knapsack Problem Test ===");
    
    const data = createSampleData();
    const { weights, values, capacity } = data;
    
    console.log("Sample data:");
    console.log("Weights:", weights);
    console.log("Values:", values);
    console.log("Capacity:", capacity);
    console.log();
    
    // Test 0/1 Knapsack - Recursive
    console.log("0/1 Knapsack - Recursive:");
    const startTime = performance.now();
    const recursiveResult = knapsack01Recursive(weights, values, capacity);
    const endTime = performance.now();
    console.log(`Result: ${recursiveResult} (${(endTime - startTime).toFixed(2)} ms)`);
    console.log();
    
    // Test 0/1 Knapsack - DP
    console.log("0/1 Knapsack - DP:");
    const startTime2 = performance.now();
    const dpResult = knapsack01DP(weights, values, capacity);
    const endTime2 = performance.now();
    console.log(`Result: ${dpResult} (${(endTime2 - startTime2).toFixed(2)} ms)`);
    console.log();
    
    // Test 0/1 Knapsack - Optimized
    console.log("0/1 Knapsack - Optimized:");
    const startTime3 = performance.now();
    const optimizedResult = knapsack01Optimized(weights, values, capacity);
    const endTime3 = performance.now();
    console.log(`Result: ${optimizedResult} (${(endTime3 - startTime3).toFixed(2)} ms)`);
    console.log();
    
    // Test 0/1 Knapsack with items
    console.log("0/1 Knapsack - Selected items:");
    const selectedItems = knapsack01WithItems(weights, values, capacity);
    console.log("Selected items:", selectedItems);
    console.log();
    
    // Test Fractional Knapsack
    console.log("Fractional Knapsack:");
    const startTime4 = performance.now();
    const fractionalResult = knapsackFractional(weights, values, capacity);
    const endTime4 = performance.now();
    console.log(`Result: ${fractionalResult.toFixed(2)} (${(endTime4 - startTime4).toFixed(2)} ms)`);
    console.log();
    
    // Test Unbounded Knapsack
    console.log("Unbounded Knapsack:");
    const startTime5 = performance.now();
    const unboundedResult = knapsackUnbounded(weights, values, capacity);
    const endTime5 = performance.now();
    console.log(`Result: ${unboundedResult} (${(endTime5 - startTime5).toFixed(2)} ms)`);
    console.log();
}

/**
 * @function performanceTest
 * @description Performance test for knapsack algorithms
 * @returns {void}
 */
function performanceTest() {
    console.log("=== Performance Test ===");
    
    const sizes = [50, 100, 200, 500, 1000];
    
    for (const size of sizes) {
        const weights = new Array(size);
        const values = new Array(size);
        const capacity = size * 10;
        
        // Generate random data
        for (let i = 0; i < size; i++) {
            weights[i] = Math.floor(Math.random() * 50) + 1;
            values[i] = Math.floor(Math.random() * 100) + 1;
        }
        
        console.log(`Size: ${size}, Capacity: ${capacity}`);
        
        // Test DP
        const startTime = performance.now();
        knapsack01DP(weights, values, capacity);
        const endTime = performance.now();
        console.log(`  DP: ${(endTime - startTime).toFixed(2)} ms`);
        
        // Test Optimized
        const startTime2 = performance.now();
        knapsack01Optimized(weights, values, capacity);
        const endTime2 = performance.now();
        console.log(`  Optimized: ${(endTime2 - startTime2).toFixed(2)} ms`);
        
        console.log();
    }
}

/**
 * @function main
 * @description Main function to run the knapsack demonstration
 * @returns {void}
 */
function main() {
    console.log("Knapsack Problem Algorithm Implementation");
    console.log("========================================");
    
    // Run basic tests
    testKnapsack();
    
    // Run performance test
    performanceTest();
    
    console.log("\nKnapsack problem completed successfully!");
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        knapsack01Recursive,
        knapsack01DP,
        knapsack01Optimized,
        knapsack01WithItems,
        knapsackFractional,
        knapsackUnbounded,
        knapsackMultiple,
        createSampleData,
        testKnapsack,
        performanceTest,
        main
    };
}

// Run the main function if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    main();
}
