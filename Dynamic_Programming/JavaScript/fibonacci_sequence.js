/**
 * @file fibonacci_sequence.js
 * @description Implementation of Fibonacci Sequence algorithm in JavaScript
 * @author Algorithm Collection
 * @version 1.0
 */

/**
 * @function fibonacciRecursive
 * @description Recursive implementation of Fibonacci sequence
 * @param {number} n - Position in Fibonacci sequence
 * @returns {number} - Fibonacci number at position n
 */
function fibonacciRecursive(n) {
    if (n <= 1) {
        return n;
    }
    return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

/**
 * @function fibonacciMemoized
 * @description Memoized implementation of Fibonacci sequence
 * @param {number} n - Position in Fibonacci sequence
 * @returns {number} - Fibonacci number at position n
 */
function fibonacciMemoized(n) {
    const memo = new Array(n + 1).fill(-1);
    return fibonacciMemoizedHelper(n, memo);
}

/**
 * @function fibonacciMemoizedHelper
 * @description Helper function for memoized Fibonacci
 * @param {number} n - Position in Fibonacci sequence
 * @param {Array<number>} memo - Memoization array
 * @returns {number} - Fibonacci number at position n
 */
function fibonacciMemoizedHelper(n, memo) {
    if (n <= 1) {
        return n;
    }
    if (memo[n] !== -1) {
        return memo[n];
    }
    memo[n] = fibonacciMemoizedHelper(n - 1, memo) + fibonacciMemoizedHelper(n - 2, memo);
    return memo[n];
}

/**
 * @function fibonacciDP
 * @description Dynamic programming implementation of Fibonacci sequence
 * @param {number} n - Position in Fibonacci sequence
 * @returns {number} - Fibonacci number at position n
 */
function fibonacciDP(n) {
    if (n <= 1) {
        return n;
    }
    
    const dp = new Array(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}

/**
 * @function fibonacciOptimized
 * @description Space-optimized implementation of Fibonacci sequence
 * @param {number} n - Position in Fibonacci sequence
 * @returns {number} - Fibonacci number at position n
 */
function fibonacciOptimized(n) {
    if (n <= 1) {
        return n;
    }
    
    let prev2 = 0;
    let prev1 = 1;
    
    for (let i = 2; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

/**
 * @function fibonacciMatrix
 * @description Matrix exponentiation implementation of Fibonacci sequence
 * @param {number} n - Position in Fibonacci sequence
 * @returns {number} - Fibonacci number at position n
 */
function fibonacciMatrix(n) {
    if (n <= 1) {
        return n;
    }
    
    const matrix = [[1, 1], [1, 0]];
    const result = matrixPower(matrix, n - 1);
    return result[0][0];
}

/**
 * @function matrixPower
 * @description Matrix exponentiation helper
 * @param {Array<Array<number>>} matrix - Matrix to raise to power
 * @param {number} power - Power to raise matrix to
 * @returns {Array<Array<number>>} - Result matrix
 */
function matrixPower(matrix, power) {
    if (power === 1) {
        return matrix;
    }
    
    if (power % 2 === 0) {
        const half = matrixPower(matrix, power / 2);
        return matrixMultiply(half, half);
    } else {
        return matrixMultiply(matrix, matrixPower(matrix, power - 1));
    }
}

/**
 * @function matrixMultiply
 * @description Matrix multiplication helper
 * @param {Array<Array<number>>} a - First matrix
 * @param {Array<Array<number>>} b - Second matrix
 * @returns {Array<Array<number>>} - Result matrix
 */
function matrixMultiply(a, b) {
    const result = [[0, 0], [0, 0]];
    result[0][0] = a[0][0] * b[0][0] + a[0][1] * b[1][0];
    result[0][1] = a[0][0] * b[0][1] + a[0][1] * b[1][1];
    result[1][0] = a[1][0] * b[0][0] + a[1][1] * b[1][0];
    result[1][1] = a[1][0] * b[0][1] + a[1][1] * b[1][1];
    return result;
}

/**
 * @function fibonacciSequence
 * @description Generates Fibonacci sequence up to n terms
 * @param {number} n - Number of terms to generate
 * @returns {Array<number>} - List of Fibonacci numbers
 */
function fibonacciSequence(n) {
    const sequence = [];
    
    if (n <= 0) {
        return sequence;
    }
    
    let a = 0, b = 1;
    sequence.push(a);
    
    if (n > 1) {
        sequence.push(b);
    }
    
    for (let i = 2; i < n; i++) {
        const next = a + b;
        sequence.push(next);
        a = b;
        b = next;
    }
    
    return sequence;
}

/**
 * @function fibonacciWithMod
 * @description Fibonacci with modular arithmetic
 * @param {number} n - Position in Fibonacci sequence
 * @param {number} mod - Modulo value
 * @returns {number} - Fibonacci number at position n mod mod
 */
function fibonacciWithMod(n, mod) {
    if (n <= 1) {
        return n % mod;
    }
    
    let prev2 = 0;
    let prev1 = 1;
    
    for (let i = 2; i <= n; i++) {
        const current = (prev1 + prev2) % mod;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

/**
 * @function testFibonacci
 * @description Test function to demonstrate Fibonacci algorithms
 * @returns {void}
 */
function testFibonacci() {
    console.log("=== Fibonacci Sequence Test ===");
    
    const testValues = [0, 1, 5, 10, 20, 30, 40];
    
    for (const n of testValues) {
        console.log(`n = ${n}:`);
        
        // Test recursive (only for small values)
        if (n <= 30) {
            const startTime = performance.now();
            const recursive = fibonacciRecursive(n);
            const endTime = performance.now();
            console.log(`  Recursive: ${recursive} (${(endTime - startTime).toFixed(2)} ms)`);
        }
        
        // Test memoized
        const startTime = performance.now();
        const memoized = fibonacciMemoized(n);
        const endTime = performance.now();
        console.log(`  Memoized: ${memoized} (${(endTime - startTime).toFixed(2)} ms)`);
        
        // Test DP
        const startTime2 = performance.now();
        const dp = fibonacciDP(n);
        const endTime2 = performance.now();
        console.log(`  DP: ${dp} (${(endTime2 - startTime2).toFixed(2)} ms)`);
        
        // Test optimized
        const startTime3 = performance.now();
        const optimized = fibonacciOptimized(n);
        const endTime3 = performance.now();
        console.log(`  Optimized: ${optimized} (${(endTime3 - startTime3).toFixed(2)} ms)`);
        
        // Test matrix
        const startTime4 = performance.now();
        const matrix = fibonacciMatrix(n);
        const endTime4 = performance.now();
        console.log(`  Matrix: ${matrix} (${(endTime4 - startTime4).toFixed(2)} ms)`);
        
        console.log();
    }
    
    // Test sequence generation
    console.log("Fibonacci sequence (first 15 terms):");
    const sequence = fibonacciSequence(15);
    console.log(sequence);
    console.log();
    
    // Test with modulo
    console.log("Fibonacci with modulo 1000000007:");
    for (const n of [10, 20, 30, 40, 50]) {
        const result = fibonacciWithMod(n, 1000000007);
        console.log(`F(${n}) mod 1000000007 = ${result}`);
    }
    console.log();
}

/**
 * @function performanceTest
 * @description Performance test for Fibonacci algorithms
 * @returns {void}
 */
function performanceTest() {
    console.log("=== Performance Test ===");
    
    const sizes = [1000, 5000, 10000, 50000, 100000];
    
    for (const size of sizes) {
        console.log(`n = ${size}:`);
        
        // Test DP
        const startTime = performance.now();
        fibonacciDP(size);
        const endTime = performance.now();
        console.log(`  DP: ${(endTime - startTime).toFixed(2)} ms`);
        
        // Test optimized
        const startTime2 = performance.now();
        fibonacciOptimized(size);
        const endTime2 = performance.now();
        console.log(`  Optimized: ${(endTime2 - startTime2).toFixed(2)} ms`);
        
        // Test matrix
        const startTime3 = performance.now();
        fibonacciMatrix(size);
        const endTime3 = performance.now();
        console.log(`  Matrix: ${(endTime3 - startTime3).toFixed(2)} ms`);
        
        console.log();
    }
}

/**
 * @function main
 * @description Main function to run the Fibonacci demonstration
 * @returns {void}
 */
function main() {
    console.log("Fibonacci Sequence Algorithm Implementation");
    console.log("==========================================");
    
    // Run basic tests
    testFibonacci();
    
    // Run performance test
    performanceTest();
    
    console.log("\nFibonacci sequence completed successfully!");
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fibonacciRecursive,
        fibonacciMemoized,
        fibonacciDP,
        fibonacciOptimized,
        fibonacciMatrix,
        fibonacciSequence,
        fibonacciWithMod,
        testFibonacci,
        performanceTest,
        main
    };
}

// Run the main function if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    main();
}
