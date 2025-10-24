/**
 * @file benchmark_runner.js
 * @description Benchmark runner for JavaScript algorithms
 * @author Algorithm Collection
 * @version 1.0
 */

const chalk = require('chalk');
const ora = require('ora');
const Table = require('cli-table3');

/**
 * @function runBenchmarks
 * @description Runs performance benchmarks for all algorithms
 * @returns {Promise<void>}
 */
const runBenchmarks = async () => {
    const spinner = ora('Running algorithm benchmarks...').start();
    
    try {
        console.log(chalk.blue.bold('\n=== Algorithm Benchmark Suite ===\n'));
        
        // Benchmark Bubble Sort
        await benchmarkBubbleSort();
        
        // Add more benchmarks as algorithms are implemented
        // await benchmarkQuickSort();
        // await benchmarkMergeSort();
        // await benchmarkHeapSort();
        
        spinner.succeed(chalk.green('All benchmarks completed!'));
        
    } catch (error) {
        spinner.fail(chalk.red('Benchmarks failed!'));
        console.error(chalk.red('Error:'), error.message);
        process.exit(1);
    }
};

/**
 * @function benchmarkBubbleSort
 * @description Benchmarks Bubble Sort algorithm
 * @returns {Promise<void>}
 */
const benchmarkBubbleSort = async () => {
    console.log(chalk.yellow('Benchmarking Bubble Sort...'));
    
    const { bubbleSort, bubbleSortOptimized, generateRandomArray } = require('../Sorting_Algorithms/JavaScript/bubble_sort.js');
    
    const sizes = [100, 500, 1000, 2000, 5000];
    const iterations = 5;
    
    // Create table for results
    const table = new Table({
        head: ['Array Size', 'Bubble Sort (ms)', 'Optimized (ms)', 'Built-in Sort (ms)', 'Ratio'],
        colWidths: [12, 18, 18, 18, 12]
    });
    
    for (const size of sizes) {
        let bubbleTime = 0;
        let optimizedTime = 0;
        let builtinTime = 0;
        
        for (let i = 0; i < iterations; i++) {
            const testArray = generateRandomArray(size);
            
            // Test standard bubble sort
            const bubbleStart = performance.now();
            bubbleSort([...testArray]);
            const bubbleEnd = performance.now();
            bubbleTime += (bubbleEnd - bubbleStart);
            
            // Test optimized bubble sort
            const optimizedStart = performance.now();
            bubbleSortOptimized([...testArray]);
            const optimizedEnd = performance.now();
            optimizedTime += (optimizedEnd - optimizedStart);
            
            // Test built-in sort
            const builtinStart = performance.now();
            [...testArray].sort((a, b) => a - b);
            const builtinEnd = performance.now();
            builtinTime += (builtinEnd - builtinStart);
        }
        
        // Calculate averages
        const avgBubble = (bubbleTime / iterations).toFixed(2);
        const avgOptimized = (optimizedTime / iterations).toFixed(2);
        const avgBuiltin = (builtinTime / iterations).toFixed(2);
        const ratio = (bubbleTime / builtinTime).toFixed(1);
        
        table.push([
            size.toString(),
            avgBubble,
            avgOptimized,
            avgBuiltin,
            `${ratio}x`
        ]);
    }
    
    console.log(table.toString());
    console.log();
};

/**
 * @function benchmarkMemoryUsage
 * @description Benchmarks memory usage of algorithms
 * @returns {Promise<void>}
 */
const benchmarkMemoryUsage = async () => {
    console.log(chalk.yellow('Benchmarking Memory Usage...'));
    
    const { bubbleSort, generateRandomArray } = require('../Sorting_Algorithms/JavaScript/bubble_sort.js');
    
    const sizes = [1000, 5000, 10000];
    
    for (const size of sizes) {
        const testArray = generateRandomArray(size);
        
        // Measure memory before
        const memBefore = process.memoryUsage();
        
        // Run algorithm
        bubbleSort([...testArray]);
        
        // Measure memory after
        const memAfter = process.memoryUsage();
        
        const heapUsed = (memAfter.heapUsed - memBefore.heapUsed) / 1024 / 1024; // MB
        
        console.log(chalk.cyan(`  Array size ${size}: ${heapUsed.toFixed(2)} MB heap used`));
    }
};

/**
 * @function benchmarkStability
 * @description Tests algorithm stability
 * @returns {Promise<void>}
 */
const benchmarkStability = async () => {
    console.log(chalk.yellow('Testing Algorithm Stability...'));
    
    const { bubbleSort } = require('../Sorting_Algorithms/JavaScript/bubble_sort.js');
    
    // Test with array of objects to check stability
    const testArray = [
        { value: 3, originalIndex: 0 },
        { value: 1, originalIndex: 1 },
        { value: 3, originalIndex: 2 },
        { value: 2, originalIndex: 3 },
        { value: 1, originalIndex: 4 }
    ];
    
    console.log(chalk.cyan('Original array:'));
    testArray.forEach((item, index) => {
        console.log(`  [${index}]: value=${item.value}, originalIndex=${item.originalIndex}`);
    });
    
    // Sort by value
    bubbleSort(testArray, (a, b) => a.value - b.value);
    
    console.log(chalk.cyan('\nAfter sorting by value:'));
    testArray.forEach((item, index) => {
        console.log(`  [${index}]: value=${item.value}, originalIndex=${item.originalIndex}`);
    });
    
    // Check if stable (elements with same value maintain relative order)
    let isStable = true;
    for (let i = 0; i < testArray.length - 1; i++) {
        if (testArray[i].value === testArray[i + 1].value) {
            if (testArray[i].originalIndex > testArray[i + 1].originalIndex) {
                isStable = false;
                break;
            }
        }
    }
    
    console.log(chalk.cyan(`\nStability test: ${isStable ? chalk.green('PASSED') : chalk.red('FAILED')}`));
};

/**
 * @function generateReport
 * @description Generates a comprehensive benchmark report
 * @returns {Promise<void>}
 */
const generateReport = async () => {
    console.log(chalk.blue.bold('\n=== Benchmark Report ===\n'));
    
    const report = {
        timestamp: new Date().toISOString(),
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
        memory: process.memoryUsage()
    };
    
    console.log(chalk.cyan('System Information:'));
    console.log(`  Node.js Version: ${report.nodeVersion}`);
    console.log(`  Platform: ${report.platform}`);
    console.log(`  Architecture: ${report.arch}`);
    console.log(`  Memory Usage: ${(report.memory.heapUsed / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Timestamp: ${report.timestamp}`);
    console.log();
    
    // Performance recommendations
    console.log(chalk.yellow('Performance Recommendations:'));
    console.log('  • Bubble Sort is O(n²) - use for small datasets only');
    console.log('  • For large datasets, consider Quick Sort or Merge Sort');
    console.log('  • Built-in sort is highly optimized - prefer it for production');
    console.log('  • Consider memory constraints for very large datasets');
};

// Main execution
if (require.main === module) {
    const args = process.argv.slice(2);
    
    const runAll = async () => {
        await runBenchmarks();
        await benchmarkMemoryUsage();
        await benchmarkStability();
        await generateReport();
    };
    
    if (args.includes('--memory')) {
        benchmarkMemoryUsage();
    } else if (args.includes('--stability')) {
        benchmarkStability();
    } else if (args.includes('--report')) {
        generateReport();
    } else {
        runAll();
    }
}

module.exports = {
    runBenchmarks,
    benchmarkBubbleSort,
    benchmarkMemoryUsage,
    benchmarkStability,
    generateReport
};
