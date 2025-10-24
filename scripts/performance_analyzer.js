/**
 * @function performanceAnalyzer
 * @description Analyzes algorithm performance including compile time, runtime complexity, and Big O notation
 * @param {object} options - Analysis options
 * @returns {object} - Analysis results
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk').default;
const ora = require('ora');

class PerformanceAnalyzer {
    constructor() {
        this.complexityPatterns = {
            // Time complexity patterns
            'O(1)': {
                patterns: ['constant', 'direct access', 'hash table lookup'],
                description: 'Constant time'
            },
            'O(log n)': {
                patterns: ['binary search', 'tree traversal', 'divide and conquer'],
                description: 'Logarithmic time'
            },
            'O(n)': {
                patterns: ['linear search', 'single loop', 'array traversal'],
                description: 'Linear time'
            },
            'O(n log n)': {
                patterns: ['merge sort', 'heap sort', 'quick sort', 'divide and conquer'],
                description: 'Linearithmic time'
            },
            'O(n²)': {
                patterns: ['nested loops', 'bubble sort', 'selection sort', 'insertion sort'],
                description: 'Quadratic time'
            },
            'O(n³)': {
                patterns: ['three nested loops', 'matrix multiplication'],
                description: 'Cubic time'
            },
            'O(2^n)': {
                patterns: ['recursive fibonacci', 'exponential', 'brute force'],
                description: 'Exponential time'
            },
            'O(n!)': {
                patterns: ['permutations', 'factorial', 'traveling salesman'],
                description: 'Factorial time'
            }
        };

        this.spaceComplexityPatterns = {
            'O(1)': {
                patterns: ['constant space', 'in-place', 'no extra memory'],
                description: 'Constant space'
            },
            'O(log n)': {
                patterns: ['recursive call stack', 'tree height'],
                description: 'Logarithmic space'
            },
            'O(n)': {
                patterns: ['array storage', 'linear space', 'single data structure'],
                description: 'Linear space'
            },
            'O(n log n)': {
                patterns: ['merge sort space', 'recursive sorting'],
                description: 'Linearithmic space'
            },
            'O(n²)': {
                patterns: ['matrix storage', 'nested data structures'],
                description: 'Quadratic space'
            }
        };
    }

    /**
     * @function analyzeAlgorithm
     * @description Analyzes a single algorithm file
     * @param {string} filePath - Path to algorithm file
     * @param {object} options - Analysis options
     * @returns {object} - Analysis results
     */
    async analyzeAlgorithm(filePath, options = {}) {
        const {
            testCases = [10, 100, 1000, 10000],
            iterations = 5,
            includeCompileTime = true
        } = options;

        const results = {
            file: filePath,
            language: this.detectLanguage(filePath),
            compileTime: null,
            runtime: {},
            complexity: {
                time: null,
                space: null,
                bigO: null,
                bigTheta: null,
                bigOmega: null
            },
            performance: {
                averageTime: {},
                scalability: {},
                efficiency: null
            }
        };

        try {
            // Analyze compile time if needed
            if (includeCompileTime) {
                results.compileTime = await this.measureCompileTime(filePath);
            }

            // Analyze runtime for different test cases
            for (const testSize of testCases) {
                const runtimeResults = await this.measureRuntime(filePath, testSize, iterations);
                results.runtime[testSize] = runtimeResults;
            }

            // Analyze complexity
            results.complexity = await this.analyzeComplexity(filePath, results.runtime);

            // Calculate performance metrics
            results.performance = this.calculatePerformanceMetrics(results.runtime, results.complexity);

            return results;

        } catch (error) {
            return {
                file: filePath,
                error: error.message,
                success: false
            };
        }
    }

    /**
     * @function detectLanguage
     * @description Detects programming language from file extension
     * @param {string} filePath - Path to file
     * @returns {string} - Programming language
     */
    detectLanguage(filePath) {
        const ext = path.extname(filePath).toLowerCase();
        const languageMap = {
            '.js': 'javascript',
            '.py': 'python',
            '.java': 'java',
            '.c': 'c',
            '.cpp': 'cpp',
            '.cs': 'csharp',
            '.dart': 'dart',
            '.ex': 'elixir',
            '.erl': 'erlang',
            '.go': 'go',
            '.kt': 'kotlin',
            '.php': 'php',
            '.rkt': 'racket',
            '.rb': 'ruby',
            '.rs': 'rust',
            '.scala': 'scala',
            '.swift': 'swift',
            '.ts': 'typescript',
            '.asm': 'assembly'
        };
        return languageMap[ext] || 'unknown';
    }

    /**
     * @function measureCompileTime
     * @description Measures compilation time for compiled languages
     * @param {string} filePath - Path to file
     * @returns {object} - Compile time results
     */
    async measureCompileTime(filePath) {
        const language = this.detectLanguage(filePath);
        const compiledLanguages = ['java', 'c', 'cpp', 'csharp', 'go', 'kotlin', 'rust', 'scala', 'swift', 'typescript', 'assembly'];

        if (!compiledLanguages.includes(language)) {
            return { time: 0, message: 'No compilation needed' };
        }

        const startTime = process.hrtime.bigint();
        
        try {
            await this.compileFile(filePath, language);
            const endTime = process.hrtime.bigint();
            const compileTime = Number(endTime - startTime) / 1000000; // Convert to milliseconds

            return {
                time: compileTime,
                success: true,
                language
            };
        } catch (error) {
            return {
                time: 0,
                success: false,
                error: error.message,
                language
            };
        }
    }

    /**
     * @function compileFile
     * @description Compiles a file based on its language
     * @param {string} filePath - Path to file
     * @param {string} language - Programming language
     * @returns {Promise} - Compilation result
     */
    async compileFile(filePath, language) {
        const buildDir = path.join(process.cwd(), 'build');
        if (!fs.existsSync(buildDir)) {
            fs.mkdirSync(buildDir, { recursive: true });
        }

        const fileName = path.basename(filePath, path.extname(filePath));
        const outputPath = path.join(buildDir, fileName);

        let command;
        switch (language) {
            case 'java':
                command = `javac -d "${buildDir}" "${filePath}"`;
                break;
            case 'c':
                command = `gcc "${filePath}" -o "${outputPath}"`;
                break;
            case 'cpp':
                command = `g++ "${filePath}" -o "${outputPath}"`;
                break;
            case 'csharp':
                command = `csc "${filePath}" -out:"${outputPath}.exe"`;
                break;
            case 'go':
                command = `go build -o "${outputPath}" "${filePath}"`;
                break;
            case 'kotlin':
                command = `kotlinc "${filePath}" -include-runtime -d "${outputPath}.jar"`;
                break;
            case 'rust':
                command = `rustc "${filePath}" -o "${outputPath}"`;
                break;
            case 'scala':
                command = `scalac -d "${buildDir}" "${filePath}"`;
                break;
            case 'swift':
                command = `swift "${filePath}" -o "${outputPath}"`;
                break;
            case 'typescript':
                command = `tsc "${filePath}" --outFile "${outputPath}.js"`;
                break;
            case 'assembly':
                command = `nasm -f elf64 "${filePath}" -o "${outputPath}.o" && gcc "${outputPath}.o" -o "${outputPath}"`;
                break;
            default:
                throw new Error(`Unsupported language for compilation: ${language}`);
        }

        return new Promise((resolve, reject) => {
            execSync(command, { stdio: 'pipe' });
            resolve();
        });
    }

    /**
     * @function measureRuntime
     * @description Measures runtime performance for different input sizes
     * @param {string} filePath - Path to file
     * @param {number} testSize - Input size for testing
     * @param {number} iterations - Number of iterations
     * @returns {object} - Runtime results
     */
    async measureRuntime(filePath, testSize, iterations = 5) {
        const language = this.detectLanguage(filePath);
        const times = [];

        for (let i = 0; i < iterations; i++) {
            const startTime = process.hrtime.bigint();
            
            try {
                await this.runAlgorithm(filePath, testSize, language);
                const endTime = process.hrtime.bigint();
                const runtime = Number(endTime - startTime) / 1000000; // Convert to milliseconds
                times.push(runtime);
            } catch (error) {
                console.warn(`Runtime measurement failed for iteration ${i + 1}: ${error.message}`);
            }
        }

        return {
            testSize,
            times,
            average: times.reduce((a, b) => a + b, 0) / times.length,
            min: Math.min(...times),
            max: Math.max(...times),
            median: this.calculateMedian(times),
            standardDeviation: this.calculateStandardDeviation(times)
        };
    }

    /**
     * @function runAlgorithm
     * @description Runs an algorithm with specified input size
     * @param {string} filePath - Path to file
     * @param {number} testSize - Input size
     * @param {string} language - Programming language
     * @returns {Promise} - Execution result
     */
    async runAlgorithm(filePath, testSize, language) {
        const buildDir = path.join(process.cwd(), 'build');
        const fileName = path.basename(filePath, path.extname(filePath));

        let command;
        switch (language) {
            case 'javascript':
                command = `node "${filePath}" ${testSize}`;
                break;
            case 'python':
                command = `python3 "${filePath}" ${testSize}`;
                break;
            case 'java':
                command = `java -cp "${buildDir}" ${fileName} ${testSize}`;
                break;
            case 'c':
            case 'cpp':
            case 'rust':
            case 'go':
            case 'swift':
                command = `"${path.join(buildDir, fileName)}" ${testSize}`;
                break;
            case 'csharp':
                command = `"${path.join(buildDir, fileName)}.exe" ${testSize}`;
                break;
            case 'kotlin':
                command = `java -jar "${path.join(buildDir, fileName)}.jar" ${testSize}`;
                break;
            case 'scala':
                command = `scala -cp "${buildDir}" ${fileName} ${testSize}`;
                break;
            case 'dart':
                command = `dart "${filePath}" ${testSize}`;
                break;
            case 'elixir':
                command = `elixir "${filePath}" ${testSize}`;
                break;
            case 'erlang':
                command = `erl -noshell -eval "c:l({}), halt()." "${filePath}" ${testSize}`;
                break;
            case 'php':
                command = `php "${filePath}" ${testSize}`;
                break;
            case 'racket':
                command = `racket "${filePath}" ${testSize}`;
                break;
            case 'ruby':
                command = `ruby "${filePath}" ${testSize}`;
                break;
            case 'assembly':
                command = `"${path.join(buildDir, fileName)}" ${testSize}`;
                break;
            default:
                throw new Error(`Unsupported language for execution: ${language}`);
        }

        return new Promise((resolve, reject) => {
            try {
                execSync(command, { 
                    stdio: 'pipe',
                    timeout: 30000 // 30 second timeout
                });
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * @function analyzeComplexity
     * @description Analyzes algorithm complexity using runtime data
     * @param {string} filePath - Path to file
     * @param {object} runtimeData - Runtime measurement data
     * @returns {object} - Complexity analysis
     */
    async analyzeComplexity(filePath, runtimeData) {
        // Read file content to analyze code patterns
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        // Analyze code patterns for complexity hints
        const timeComplexity = this.analyzeTimeComplexity(fileContent, runtimeData);
        const spaceComplexity = this.analyzeSpaceComplexity(fileContent);
        
        // Calculate Big O, Big Theta, and Big Omega
        const bigO = this.calculateBigO(runtimeData);
        const bigTheta = this.calculateBigTheta(runtimeData);
        const bigOmega = this.calculateBigOmega(runtimeData);

        return {
            time: timeComplexity,
            space: spaceComplexity,
            bigO,
            bigTheta,
            bigOmega
        };
    }

    /**
     * @function analyzeTimeComplexity
     * @description Analyzes time complexity from code patterns
     * @param {string} code - Source code
     * @param {object} runtimeData - Runtime data
     * @returns {string} - Time complexity
     */
    analyzeTimeComplexity(code, runtimeData) {
        const codeLower = code.toLowerCase();
        
        // Check for nested loops
        const loopCount = (codeLower.match(/for\s*\(/g) || []).length + 
                        (codeLower.match(/while\s*\(/g) || []).length;
        
        if (loopCount >= 3) {
            return 'O(n³)';
        } else if (loopCount === 2) {
            return 'O(n²)';
        } else if (loopCount === 1) {
            // Check for binary search or divide and conquer
            if (codeLower.includes('binary') || codeLower.includes('divide') || 
                codeLower.includes('mid') || codeLower.includes('log')) {
                return 'O(log n)';
            }
            return 'O(n)';
        } else {
            // Check for recursive patterns
            if (codeLower.includes('recursive') || codeLower.includes('fibonacci')) {
                return 'O(2^n)';
            }
            return 'O(1)';
        }
    }

    /**
     * @function analyzeSpaceComplexity
     * @description Analyzes space complexity from code patterns
     * @param {string} code - Source code
     * @returns {string} - Space complexity
     */
    analyzeSpaceComplexity(code) {
        const codeLower = code.toLowerCase();
        
        // Check for array/vector usage
        const arrayUsage = (codeLower.match(/array|vector|list|\[\]/g) || []).length;
        
        if (arrayUsage > 1) {
            return 'O(n²)';
        } else if (arrayUsage === 1) {
            return 'O(n)';
        } else {
            return 'O(1)';
        }
    }

    /**
     * @function calculateBigO
     * @description Calculates Big O notation from runtime data
     * @param {object} runtimeData - Runtime measurement data
     * @returns {string} - Big O notation
     */
    calculateBigO(runtimeData) {
        const sizes = Object.keys(runtimeData).map(Number).sort((a, b) => a - b);
        const times = sizes.map(size => runtimeData[size].average);
        
        if (sizes.length < 2) return 'O(1)';
        
        // Calculate growth rate
        const growthRates = [];
        for (let i = 1; i < sizes.length; i++) {
            const sizeRatio = sizes[i] / sizes[i-1];
            const timeRatio = times[i] / times[i-1];
            growthRates.push(timeRatio / sizeRatio);
        }
        
        const avgGrowthRate = growthRates.reduce((a, b) => a + b, 0) / growthRates.length;
        
        if (avgGrowthRate < 1.5) return 'O(log n)';
        if (avgGrowthRate < 2.5) return 'O(n)';
        if (avgGrowthRate < 4) return 'O(n log n)';
        if (avgGrowthRate < 8) return 'O(n²)';
        if (avgGrowthRate < 16) return 'O(n³)';
        return 'O(2^n)';
    }

    /**
     * @function calculateBigTheta
     * @description Calculates Big Theta (tight bound) notation
     * @param {object} runtimeData - Runtime measurement data
     * @returns {string} - Big Theta notation
     */
    calculateBigTheta(runtimeData) {
        // Big Theta is the same as Big O for tight bounds
        return this.calculateBigO(runtimeData);
    }

    /**
     * @function calculateBigOmega
     * @description Calculates Big Omega (lower bound) notation
     * @param {object} runtimeData - Runtime measurement data
     * @returns {string} - Big Omega notation
     */
    calculateBigOmega(runtimeData) {
        const sizes = Object.keys(runtimeData).map(Number).sort((a, b) => a - b);
        const times = sizes.map(size => runtimeData[size].average);
        
        if (sizes.length < 2) return 'Ω(1)';
        
        // Calculate minimum growth rate
        const growthRates = [];
        for (let i = 1; i < sizes.length; i++) {
            const sizeRatio = sizes[i] / sizes[i-1];
            const timeRatio = times[i] / times[i-1];
            growthRates.push(timeRatio / sizeRatio);
        }
        
        const minGrowthRate = Math.min(...growthRates);
        
        if (minGrowthRate < 1.2) return 'Ω(log n)';
        if (minGrowthRate < 2) return 'Ω(n)';
        if (minGrowthRate < 3) return 'Ω(n log n)';
        if (minGrowthRate < 5) return 'Ω(n²)';
        return 'Ω(n³)';
    }

    /**
     * @function calculatePerformanceMetrics
     * @description Calculates performance metrics from runtime data
     * @param {object} runtimeData - Runtime measurement data
     * @param {object} complexity - Complexity analysis
     * @returns {object} - Performance metrics
     */
    calculatePerformanceMetrics(runtimeData, complexity) {
        const sizes = Object.keys(runtimeData).map(Number);
        const times = sizes.map(size => runtimeData[size].average);
        
        return {
            averageTime: this.calculateAverageTime(runtimeData),
            scalability: this.calculateScalability(runtimeData),
            efficiency: this.calculateEfficiency(runtimeData, complexity)
        };
    }

    /**
     * @function calculateAverageTime
     * @description Calculates average execution time
     * @param {object} runtimeData - Runtime measurement data
     * @returns {number} - Average time in milliseconds
     */
    calculateAverageTime(runtimeData) {
        const times = Object.values(runtimeData).map(data => data.average);
        return times.reduce((a, b) => a + b, 0) / times.length;
    }

    /**
     * @function calculateScalability
     * @description Calculates scalability metrics
     * @param {object} runtimeData - Runtime measurement data
     * @returns {object} - Scalability metrics
     */
    calculateScalability(runtimeData) {
        const sizes = Object.keys(runtimeData).map(Number).sort((a, b) => a - b);
        const times = sizes.map(size => runtimeData[size].average);
        
        const scalability = {
            linear: this.isLinear(sizes, times),
            quadratic: this.isQuadratic(sizes, times),
            logarithmic: this.isLogarithmic(sizes, times),
            exponential: this.isExponential(sizes, times)
        };
        
        return scalability;
    }

    /**
     * @function calculateEfficiency
     * @description Calculates algorithm efficiency
     * @param {object} runtimeData - Runtime measurement data
     * @param {object} complexity - Complexity analysis
     * @returns {string} - Efficiency rating
     */
    calculateEfficiency(runtimeData, complexity) {
        const avgTime = this.calculateAverageTime(runtimeData);
        const maxSize = Math.max(...Object.keys(runtimeData).map(Number));
        
        // Efficiency based on time complexity and actual performance
        if (complexity.bigO === 'O(1)') return 'Excellent';
        if (complexity.bigO === 'O(log n)') return 'Very Good';
        if (complexity.bigO === 'O(n)') return 'Good';
        if (complexity.bigO === 'O(n log n)') return 'Fair';
        if (complexity.bigO === 'O(n²)') return 'Poor';
        if (complexity.bigO === 'O(n³)') return 'Very Poor';
        return 'Extremely Poor';
    }

    // Helper methods for complexity analysis
    isLinear(sizes, times) {
        const ratios = [];
        for (let i = 1; i < sizes.length; i++) {
            ratios.push(times[i] / times[i-1] / (sizes[i] / sizes[i-1]));
        }
        return ratios.every(ratio => Math.abs(ratio - 1) < 0.5);
    }

    isQuadratic(sizes, times) {
        const ratios = [];
        for (let i = 1; i < sizes.length; i++) {
            const sizeRatio = sizes[i] / sizes[i-1];
            const timeRatio = times[i] / times[i-1];
            ratios.push(timeRatio / (sizeRatio * sizeRatio));
        }
        return ratios.every(ratio => Math.abs(ratio - 1) < 0.5);
    }

    isLogarithmic(sizes, times) {
        const ratios = [];
        for (let i = 1; i < sizes.length; i++) {
            const sizeRatio = Math.log(sizes[i]) / Math.log(sizes[i-1]);
            const timeRatio = times[i] / times[i-1];
            ratios.push(timeRatio / sizeRatio);
        }
        return ratios.every(ratio => Math.abs(ratio - 1) < 0.5);
    }

    isExponential(sizes, times) {
        const ratios = [];
        for (let i = 1; i < sizes.length; i++) {
            const timeRatio = times[i] / times[i-1];
            ratios.push(timeRatio);
        }
        return ratios.every(ratio => ratio > 2);
    }

    calculateMedian(numbers) {
        const sorted = numbers.sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
    }

    calculateStandardDeviation(numbers) {
        const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
        const variance = numbers.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / numbers.length;
        return Math.sqrt(variance);
    }

    /**
     * @function generateReport
     * @description Generates a comprehensive performance report
     * @param {array} results - Analysis results
     * @returns {string} - Formatted report
     */
    generateReport(results) {
        let report = chalk.blue.bold('\n📊 Algorithm Performance Analysis Report\n');
        report += chalk.gray('═'.repeat(60) + '\n\n');

        for (const result of results) {
            if (result.error) {
                report += chalk.red(`❌ ${path.basename(result.file)}: ${result.error}\n\n`);
                continue;
            }

            report += chalk.cyan.bold(`🔍 ${path.basename(result.file)} (${result.language})\n`);
            report += chalk.gray('─'.repeat(40) + '\n');

            // Compile time
            if (result.compileTime) {
                report += chalk.yellow(`⏱️  Compile Time: ${result.compileTime.time.toFixed(2)}ms\n`);
            }

            // Complexity analysis
            report += chalk.green(`📈 Time Complexity: ${result.complexity.bigO}\n`);
            report += chalk.green(`💾 Space Complexity: ${result.complexity.space}\n`);
            report += chalk.blue(`🎯 Big O: ${result.complexity.bigO}\n`);
            report += chalk.blue(`🎯 Big Theta: ${result.complexity.bigTheta}\n`);
            report += chalk.blue(`🎯 Big Omega: ${result.complexity.bigOmega}\n`);

            // Performance metrics
            report += chalk.magenta(`⚡ Efficiency: ${result.performance.efficiency}\n`);
            report += chalk.magenta(`📊 Average Time: ${result.performance.averageTime.toFixed(2)}ms\n`);

            // Runtime details
            report += chalk.white('\n📋 Runtime Analysis:\n');
            for (const [size, data] of Object.entries(result.runtime)) {
                report += chalk.gray(`  Size ${size}: ${data.average.toFixed(2)}ms (avg), ${data.min.toFixed(2)}ms (min), ${data.max.toFixed(2)}ms (max)\n`);
            }

            report += '\n';
        }

        return report;
    }
}

// CLI interface
if (require.main === module) {
    const analyzer = new PerformanceAnalyzer();
    const args = process.argv.slice(2);
    
    const options = {
        testCases: args.includes('--large') ? [100, 1000, 10000, 100000] : [10, 100, 1000],
        iterations: args.includes('--iterations') ? parseInt(args[args.indexOf('--iterations') + 1]) : 5,
        includeCompileTime: !args.includes('--no-compile')
    };

    // Analyze all algorithm files
    const glob = require('glob');
    const files = glob.sync('**/*.{js,py,java,c,cpp,cs,dart,ex,erl,go,kt,php,rkt,rb,rs,scala,swift,ts,asm}', {
        ignore: ['node_modules/**', 'build/**', 'scripts/**']
    });

    Promise.all(files.map(file => analyzer.analyzeAlgorithm(file, options)))
        .then(results => {
            console.log(analyzer.generateReport(results));
        })
        .catch(console.error);
}

module.exports = PerformanceAnalyzer;
