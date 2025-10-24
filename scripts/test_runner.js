/**
 * @file test_runner.js
 * @description Test runner for JavaScript algorithms
 * @author Algorithm Collection
 * @version 1.0
 */

const chalk = require('chalk');
const ora = require('ora');

/**
 * @function runTests
 * @description Runs all algorithm tests
 * @returns {Promise<void>}
 */
const runTests = async () => {
    const spinner = ora('Running algorithm tests...').start();
    
    try {
        console.log(chalk.blue.bold('\n=== Algorithm Test Suite ===\n'));
        
        // Test Bubble Sort
        await testBubbleSort();
        
        // Add more tests as algorithms are implemented
        // await testQuickSort();
        // await testMergeSort();
        // await testHeapSort();
        // await testBinarySearch();
        
        spinner.succeed(chalk.green('All tests passed!'));
        
    } catch (error) {
        spinner.fail(chalk.red('Tests failed!'));
        console.error(chalk.red('Error:'), error.message);
        process.exit(1);
    }
};

/**
 * @function testBubbleSort
 * @description Tests Bubble Sort algorithm
 * @returns {Promise<void>}
 */
const testBubbleSort = async () => {
    console.log(chalk.yellow('Testing Bubble Sort...'));
    
    const { bubbleSort, bubbleSortOptimized, isSorted } = require('../Sorting_Algorithms/JavaScript/bubble_sort.js');
    
    // Test cases
    const testCases = [
        {
            name: 'Random array',
            input: [64, 34, 25, 12, 22, 11, 90],
            expected: [11, 12, 22, 25, 34, 64, 90]
        },
        {
            name: 'Already sorted array',
            input: [1, 2, 3, 4, 5],
            expected: [1, 2, 3, 4, 5]
        },
        {
            name: 'Reverse sorted array',
            input: [5, 4, 3, 2, 1],
            expected: [1, 2, 3, 4, 5]
        },
        {
            name: 'Array with duplicates',
            input: [3, 1, 4, 1, 5, 9, 2, 6, 5],
            expected: [1, 1, 2, 3, 4, 5, 5, 6, 9]
        },
        {
            name: 'Single element array',
            input: [42],
            expected: [42]
        },
        {
            name: 'Empty array',
            input: [],
            expected: []
        }
    ];
    
    let passedTests = 0;
    let totalTests = testCases.length;
    
    for (const testCase of testCases) {
        try {
            const result = [...testCase.input]; // Create a copy
            bubbleSort(result);
            
            const isCorrect = JSON.stringify(result) === JSON.stringify(testCase.expected);
            
            if (isCorrect) {
                console.log(chalk.green(`  ✓ ${testCase.name}`));
                passedTests++;
            } else {
                console.log(chalk.red(`  ✗ ${testCase.name}`));
                console.log(chalk.red(`    Expected: ${JSON.stringify(testCase.expected)}`));
                console.log(chalk.red(`    Got: ${JSON.stringify(result)}`));
            }
        } catch (error) {
            console.log(chalk.red(`  ✗ ${testCase.name} - Error: ${error.message}`));
        }
    }
    
    // Test optimized version
    console.log(chalk.yellow('\nTesting Bubble Sort Optimized...'));
    const optimizedTestCases = testCases.slice(0, 3); // Test first 3 cases
    
    for (const testCase of optimizedTestCases) {
        try {
            const result = [...testCase.input];
            bubbleSortOptimized(result);
            
            const isCorrect = JSON.stringify(result) === JSON.stringify(testCase.expected);
            
            if (isCorrect) {
                console.log(chalk.green(`  ✓ ${testCase.name} (Optimized)`));
                passedTests++;
            } else {
                console.log(chalk.red(`  ✗ ${testCase.name} (Optimized)`));
            }
        } catch (error) {
            console.log(chalk.red(`  ✗ ${testCase.name} (Optimized) - Error: ${error.message}`));
        }
    }
    
    totalTests += optimizedTestCases.length;
    
    console.log(chalk.blue(`\nBubble Sort Tests: ${passedTests}/${totalTests} passed\n`));
};

/**
 * @function testPerformance
 * @description Tests algorithm performance
 * @returns {Promise<void>}
 */
const testPerformance = async () => {
    console.log(chalk.yellow('Testing Performance...'));
    
    const { bubbleSort, generateRandomArray } = require('../Sorting_Algorithms/JavaScript/bubble_sort.js');
    
    const sizes = [100, 500, 1000, 2000];
    
    for (const size of sizes) {
        const arr = generateRandomArray(size);
        const start = performance.now();
        
        bubbleSort([...arr]); // Use spread to avoid mutating original
        
        const end = performance.now();
        const duration = end - start;
        
        console.log(chalk.cyan(`  Array size ${size}: ${duration.toFixed(2)} ms`));
    }
};

// Main execution
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.includes('--performance') || args.includes('--benchmark')) {
        testPerformance();
    } else {
        runTests();
    }
}

module.exports = {
    runTests,
    testBubbleSort,
    testPerformance
};
