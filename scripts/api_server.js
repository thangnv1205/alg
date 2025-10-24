/**
 * @function apiServer
 * @description REST API server for algorithm execution and performance analysis
 * @param {object} options - Server configuration options
 * @returns {object} - Server instance
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const PerformanceAnalyzer = require('./performance_analyzer');
const AlgorithmRunner = require('./run_all');

class AlgorithmAPIServer {
    constructor(options = {}) {
        this.app = express();
        this.port = options.port || process.env.PORT || 3000;
        this.analyzer = new PerformanceAnalyzer();
        this.runner = new AlgorithmRunner();
        
        this.setupMiddleware();
        this.setupRoutes();
    }

    /**
     * @function setupMiddleware
     * @description Sets up Express middleware
     */
    setupMiddleware() {
        // Security middleware
        this.app.use(helmet());
        
        // CORS middleware
        this.app.use(cors({
            origin: process.env.CORS_ORIGIN || '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));
        
        // Rate limiting
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // limit each IP to 100 requests per windowMs
            message: 'Too many requests from this IP, please try again later.'
        });
        this.app.use('/api/', limiter);
        
        // Body parsing middleware
        this.app.use(express.json({ limit: '10mb' }));
        this.app.use(express.urlencoded({ extended: true }));
        
        // Logging middleware
        this.app.use((req, res, next) => {
            console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
            next();
        });
    }

    /**
     * @function setupRoutes
     * @description Sets up API routes
     */
    setupRoutes() {
        // Health check
        this.app.get('/health', (req, res) => {
            res.json({
                status: 'healthy',
                timestamp: new Date().toISOString(),
                uptime: process.uptime(),
                memory: process.memoryUsage()
            });
        });

        // Get supported languages
        this.app.get('/api/languages', (req, res) => {
            res.json({
                languages: Object.keys(this.runner.languages).map(lang => ({
                    name: lang,
                    description: this.runner.languages[lang].description,
                    extension: this.runner.languages[lang].extension,
                    needsCompile: this.runner.languages[lang].needsCompile
                }))
            });
        });

        // Get available algorithms
        this.app.get('/api/algorithms', (req, res) => {
            const { language, category } = req.query;
            const algorithms = this.getAvailableAlgorithms(language, category);
            res.json({ algorithms });
        });

        // Execute single algorithm
        this.app.post('/api/execute', async (req, res) => {
            try {
                const { filePath, language, inputSize = 1000 } = req.body;
                
                if (!filePath || !language) {
                    return res.status(400).json({
                        error: 'Missing required parameters: filePath, language'
                    });
                }

                const result = await this.executeAlgorithm(filePath, language, inputSize);
                res.json(result);
            } catch (error) {
                res.status(500).json({
                    error: error.message,
                    timestamp: new Date().toISOString()
                });
            }
        });

        // Run all algorithms
        this.app.post('/api/run-all', async (req, res) => {
            try {
                const { languages = [], options = {} } = req.body;
                
                const result = await this.runner.runAll({
                    languages: languages.length > 0 ? languages : Object.keys(this.runner.languages),
                    ...options
                });
                
                res.json(result);
            } catch (error) {
                res.status(500).json({
                    error: error.message,
                    timestamp: new Date().toISOString()
                });
            }
        });

        // Performance analysis
        this.app.post('/api/analyze', async (req, res) => {
            try {
                const { filePath, options = {} } = req.body;
                
                if (!filePath) {
                    return res.status(400).json({
                        error: 'Missing required parameter: filePath'
                    });
                }

                const result = await this.analyzer.analyzeAlgorithm(filePath, options);
                res.json(result);
            } catch (error) {
                res.status(500).json({
                    error: error.message,
                    timestamp: new Date().toISOString()
                });
            }
        });

        // Batch performance analysis
        this.app.post('/api/analyze-batch', async (req, res) => {
            try {
                const { filePaths = [], options = {} } = req.body;
                
                if (filePaths.length === 0) {
                    return res.status(400).json({
                        error: 'Missing required parameter: filePaths'
                    });
                }

                const results = await Promise.all(
                    filePaths.map(filePath => this.analyzer.analyzeAlgorithm(filePath, options))
                );
                
                res.json({ results });
            } catch (error) {
                res.status(500).json({
                    error: error.message,
                    timestamp: new Date().toISOString()
                });
            }
        });

        // Get performance report
        this.app.get('/api/report/:language?', async (req, res) => {
            try {
                const { language } = req.params;
                const report = await this.generatePerformanceReport(language);
                res.json(report);
            } catch (error) {
                res.status(500).json({
                    error: error.message,
                    timestamp: new Date().toISOString()
                });
            }
        });

        // Compile algorithm
        this.app.post('/api/compile', async (req, res) => {
            try {
                const { filePath, language } = req.body;
                
                if (!filePath || !language) {
                    return res.status(400).json({
                        error: 'Missing required parameters: filePath, language'
                    });
                }

                const result = await this.compileAlgorithm(filePath, language);
                res.json(result);
            } catch (error) {
                res.status(500).json({
                    error: error.message,
                    timestamp: new Date().toISOString()
                });
            }
        });

        // Get algorithm complexity
        this.app.get('/api/complexity/:filePath', async (req, res) => {
            try {
                const { filePath } = req.params;
                const complexity = await this.analyzeComplexity(filePath);
                res.json(complexity);
            } catch (error) {
                res.status(500).json({
                    error: error.message,
                    timestamp: new Date().toISOString()
                });
            }
        });

        // Benchmark algorithms
        this.app.post('/api/benchmark', async (req, res) => {
            try {
                const { algorithms = [], testSizes = [100, 1000, 10000], iterations = 5 } = req.body;
                
                const results = await this.runBenchmark(algorithms, testSizes, iterations);
                res.json(results);
            } catch (error) {
                res.status(500).json({
                    error: error.message,
                    timestamp: new Date().toISOString()
                });
            }
        });

        // Error handling middleware
        this.app.use((error, req, res, next) => {
            console.error('API Error:', error);
            res.status(500).json({
                error: 'Internal server error',
                timestamp: new Date().toISOString()
            });
        });

        // 404 handler
        this.app.use('*', (req, res) => {
            res.status(404).json({
                error: 'Endpoint not found',
                path: req.originalUrl,
                timestamp: new Date().toISOString()
            });
        });
    }

    /**
     * @function getAvailableAlgorithms
     * @description Gets list of available algorithms
     * @param {string} language - Programming language filter
     * @param {string} category - Algorithm category filter
     * @returns {array} - List of algorithms
     */
    getAvailableAlgorithms(language, category) {
        const algorithms = [];
        const basePath = process.cwd();
        
        const findAlgorithms = (dir, currentPath = '') => {
            const items = fs.readdirSync(dir);
            
            for (const item of items) {
                const fullPath = path.join(dir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
                    findAlgorithms(fullPath, path.join(currentPath, item));
                } else if (stat.isFile()) {
                    const ext = path.extname(item);
                    const lang = this.runner.detectLanguage(fullPath);
                    
                    if ((!language || lang === language) && 
                        (!category || currentPath.includes(category))) {
                        algorithms.push({
                            name: item,
                            path: fullPath,
                            language: lang,
                            category: currentPath,
                            extension: ext
                        });
                    }
                }
            }
        };

        findAlgorithms(basePath);
        return algorithms;
    }

    /**
     * @function executeAlgorithm
     * @description Executes a single algorithm
     * @param {string} filePath - Path to algorithm file
     * @param {string} language - Programming language
     * @param {number} inputSize - Input size for testing
     * @returns {object} - Execution result
     */
    async executeAlgorithm(filePath, language, inputSize) {
        const startTime = process.hrtime.bigint();
        
        try {
            let command;
            const buildDir = path.join(process.cwd(), 'build');
            
            switch (language) {
                case 'javascript':
                    command = `node "${filePath}" ${inputSize}`;
                    break;
                case 'python':
                    command = `python3 "${filePath}" ${inputSize}`;
                    break;
                case 'java':
                    const className = path.basename(filePath, '.java');
                    command = `java -cp "${buildDir}" ${className} ${inputSize}`;
                    break;
                case 'c':
                case 'cpp':
                    const cOutput = path.join(buildDir, path.basename(filePath, path.extname(filePath)));
                    command = `"${cOutput}" ${inputSize}`;
                    break;
                default:
                    command = `node "${filePath}" ${inputSize}`;
            }

            const output = execSync(command, { 
                encoding: 'utf8',
                timeout: 30000,
                stdio: 'pipe'
            });

            const endTime = process.hrtime.bigint();
            const executionTime = Number(endTime - startTime) / 1000000;

            return {
                success: true,
                output: output.trim(),
                executionTime,
                language,
                inputSize,
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            return {
                success: false,
                error: error.message,
                language,
                inputSize,
                timestamp: new Date().toISOString()
            };
        }
    }

    /**
     * @function compileAlgorithm
     * @description Compiles an algorithm
     * @param {string} filePath - Path to algorithm file
     * @param {string} language - Programming language
     * @returns {object} - Compilation result
     */
    async compileAlgorithm(filePath, language) {
        const startTime = process.hrtime.bigint();
        
        try {
            const buildDir = path.join(process.cwd(), 'build');
            if (!fs.existsSync(buildDir)) {
                fs.mkdirSync(buildDir, { recursive: true });
            }

            let command;
            switch (language) {
                case 'java':
                    command = `javac -d "${buildDir}" "${filePath}"`;
                    break;
                case 'c':
                    const cOutput = path.join(buildDir, path.basename(filePath, '.c'));
                    command = `gcc "${filePath}" -o "${cOutput}"`;
                    break;
                case 'cpp':
                    const cppOutput = path.join(buildDir, path.basename(filePath, '.cpp'));
                    command = `g++ "${filePath}" -o "${cppOutput}"`;
                    break;
                case 'go':
                    const goOutput = path.join(buildDir, path.basename(filePath, '.go'));
                    command = `go build -o "${goOutput}" "${filePath}"`;
                    break;
                case 'rust':
                    const rustOutput = path.join(buildDir, path.basename(filePath, '.rs'));
                    command = `rustc "${filePath}" -o "${rustOutput}"`;
                    break;
                default:
                    throw new Error(`Compilation not supported for ${language}`);
            }

            execSync(command, { stdio: 'pipe' });

            const endTime = process.hrtime.bigint();
            const compileTime = Number(endTime - startTime) / 1000000;

            return {
                success: true,
                compileTime,
                language,
                outputPath: buildDir,
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            return {
                success: false,
                error: error.message,
                language,
                timestamp: new Date().toISOString()
            };
        }
    }

    /**
     * @function analyzeComplexity
     * @description Analyzes algorithm complexity
     * @param {string} filePath - Path to algorithm file
     * @returns {object} - Complexity analysis
     */
    async analyzeComplexity(filePath) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const language = this.runner.detectLanguage(filePath);
        
        return {
            filePath,
            language,
            timeComplexity: this.analyzer.analyzeTimeComplexity(fileContent),
            spaceComplexity: this.analyzer.analyzeSpaceComplexity(fileContent),
            patterns: this.analyzer.detectComplexityPatterns(fileContent),
            timestamp: new Date().toISOString()
        };
    }

    /**
     * @function runBenchmark
     * @description Runs benchmark tests
     * @param {array} algorithms - List of algorithms to benchmark
     * @param {array} testSizes - Test sizes
     * @param {number} iterations - Number of iterations
     * @returns {object} - Benchmark results
     */
    async runBenchmark(algorithms, testSizes, iterations) {
        const results = [];
        
        for (const algorithm of algorithms) {
            const algorithmResults = {
                algorithm,
                results: {}
            };
            
            for (const size of testSizes) {
                const times = [];
                
                for (let i = 0; i < iterations; i++) {
                    const result = await this.executeAlgorithm(algorithm.filePath, algorithm.language, size);
                    if (result.success) {
                        times.push(result.executionTime);
                    }
                }
                
                if (times.length > 0) {
                    algorithmResults.results[size] = {
                        average: times.reduce((a, b) => a + b, 0) / times.length,
                        min: Math.min(...times),
                        max: Math.max(...times),
                        iterations: times.length
                    };
                }
            }
            
            results.push(algorithmResults);
        }
        
        return {
            results,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * @function generatePerformanceReport
     * @description Generates performance report
     * @param {string} language - Language filter
     * @returns {object} - Performance report
     */
    async generatePerformanceReport(language) {
        const algorithms = this.getAvailableAlgorithms(language);
        const report = {
            language: language || 'all',
            totalAlgorithms: algorithms.length,
            algorithms: [],
            summary: {
                averageComplexity: {},
                performanceMetrics: {}
            },
            timestamp: new Date().toISOString()
        };
        
        for (const algorithm of algorithms) {
            try {
                const analysis = await this.analyzer.analyzeAlgorithm(algorithm.path);
                report.algorithms.push({
                    name: algorithm.name,
                    path: algorithm.path,
                    language: algorithm.language,
                    category: algorithm.category,
                    complexity: analysis.complexity,
                    performance: analysis.performance
                });
            } catch (error) {
                console.warn(`Failed to analyze ${algorithm.path}: ${error.message}`);
            }
        }
        
        return report;
    }

    /**
     * @function start
     * @description Starts the API server
     */
    start() {
        this.app.listen(this.port, () => {
            console.log(`🚀 Algorithm API Server running on port ${this.port}`);
            console.log(`📊 Health check: http://localhost:${this.port}/health`);
            console.log(`🔍 API docs: http://localhost:${this.port}/api/languages`);
        });
    }
}

// Start server if run directly
if (require.main === module) {
    const server = new AlgorithmAPIServer();
    server.start();
}

module.exports = AlgorithmAPIServer;
