/**
 * @function runAllAlgorithms
 * @description Runs all algorithms across different programming languages
 * @param {object} options - Configuration options
 * @returns {object} - Execution results
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');
const ora = require('ora');
const AssemblyCompiler = require('./assembly_compiler');

class AlgorithmRunner {
    constructor() {
        this.languages = {
            'javascript': {
                extension: '.js',
                command: 'node',
                description: 'JavaScript',
                needsCompile: false
            },
            'python': {
                extension: '.py',
                command: 'python3',
                description: 'Python',
                needsCompile: false
            },
            'java': {
                extension: '.java',
                command: 'javac',
                description: 'Java',
                needsCompile: true
            },
            'c': {
                extension: '.c',
                command: 'gcc',
                description: 'C',
                needsCompile: true
            },
            'cpp': {
                extension: '.cpp',
                command: 'g++',
                description: 'C++',
                needsCompile: true
            },
            'assembly': {
                extension: '.asm',
                command: 'nasm',
                description: 'Assembly',
                needsCompile: true
            },
            'csharp': {
                extension: '.cs',
                command: 'csc',
                description: 'C#',
                needsCompile: true
            },
            'dart': {
                extension: '.dart',
                command: 'dart',
                description: 'Dart',
                needsCompile: false
            },
            'elixir': {
                extension: '.ex',
                command: 'elixir',
                description: 'Elixir',
                needsCompile: false
            },
            'erlang': {
                extension: '.erl',
                command: 'erl',
                description: 'Erlang',
                needsCompile: false
            },
            'go': {
                extension: '.go',
                command: 'go',
                description: 'Go',
                needsCompile: true
            },
            'kotlin': {
                extension: '.kt',
                command: 'kotlinc',
                description: 'Kotlin',
                needsCompile: true
            },
            'php': {
                extension: '.php',
                command: 'php',
                description: 'PHP',
                needsCompile: false
            },
            'racket': {
                extension: '.rkt',
                command: 'racket',
                description: 'Racket',
                needsCompile: false
            },
            'ruby': {
                extension: '.rb',
                command: 'ruby',
                description: 'Ruby',
                needsCompile: false
            },
            'rust': {
                extension: '.rs',
                command: 'rustc',
                description: 'Rust',
                needsCompile: true
            },
            'scala': {
                extension: '.scala',
                command: 'scalac',
                description: 'Scala',
                needsCompile: true
            },
            'swift': {
                extension: '.swift',
                command: 'swift',
                description: 'Swift',
                needsCompile: true
            },
            'typescript': {
                extension: '.ts',
                command: 'tsc',
                description: 'TypeScript',
                needsCompile: true
            }
        };
        
        this.assemblyCompiler = new AssemblyCompiler();
    }

    /**
     * @function runAll
     * @description Runs all algorithms in all supported languages
     * @param {object} options - Configuration options
     * @returns {object} - Execution results
     */
    async runAll(options = {}) {
        const {
            languages = Object.keys(this.languages),
            algorithms = [],
            verbose = false,
            architecture = 'x64'
        } = options;

        console.log(chalk.blue.bold('🚀 Running All Algorithms'));
        console.log(chalk.gray(`Languages: ${languages.join(', ')}`));
        console.log(chalk.gray(`Architecture: ${architecture}`));
        console.log('');

        const results = {
            total: 0,
            successful: 0,
            failed: 0,
            languages: {}
        };

        for (const lang of languages) {
            if (!this.languages[lang]) {
                console.log(chalk.yellow(`⚠️  Unsupported language: ${lang}`));
                continue;
            }

            const spinner = ora(`Running ${this.languages[lang].description} algorithms...`).start();
            
            try {
                const langResults = await this.runLanguage(lang, { algorithms, verbose, architecture });
                results.languages[lang] = langResults;
                results.total += langResults.total;
                results.successful += langResults.successful;
                results.failed += langResults.failed;
                
                spinner.succeed(chalk.green(`✓ ${this.languages[lang].description}: ${langResults.successful}/${langResults.total} successful`));
                
            } catch (error) {
                spinner.fail(chalk.red(`✗ ${this.languages[lang].description}: ${error.message}`));
                results.languages[lang] = {
                    total: 0,
                    successful: 0,
                    failed: 0,
                    error: error.message
                };
            }
        }

        this.printSummary(results);
        return results;
    }

    /**
     * @function runLanguage
     * @description Runs algorithms for a specific language
     * @param {string} language - Programming language
     * @param {object} options - Configuration options
     * @returns {object} - Language execution results
     */
    async runLanguage(language, options = {}) {
        const { algorithms = [], verbose = false, architecture = 'x64' } = options;
        const langConfig = this.languages[language];
        
        if (!langConfig) {
            throw new Error(`Unsupported language: ${language}`);
        }

        const files = this.findLanguageFiles(language, algorithms);
        const results = {
            total: files.length,
            successful: 0,
            failed: 0,
            files: []
        };

        for (const file of files) {
            try {
                if (language === 'assembly') {
                    const result = await this.runAssemblyFile(file, architecture);
                    results.files.push(result);
                } else {
                    const result = await this.runFile(file, langConfig);
                    results.files.push(result);
                }
                
                if (results.files[results.files.length - 1].success) {
                    results.successful++;
                } else {
                    results.failed++;
                }

            } catch (error) {
                results.failed++;
                results.files.push({
                    file,
                    success: false,
                    error: error.message
                });
            }
        }

        return results;
    }

    /**
     * @function findLanguageFiles
     * @description Finds files for a specific language
     * @param {string} language - Programming language
     * @param {array} algorithms - Specific algorithms to run
     * @returns {array} - Array of file paths
     */
    findLanguageFiles(language, algorithms = []) {
        const langConfig = this.languages[language];
        const files = [];
        
        const findFiles = (dir) => {
            const items = fs.readdirSync(dir);
            
            for (const item of items) {
                const fullPath = path.join(dir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
                    findFiles(fullPath);
                } else if (item.endsWith(langConfig.extension)) {
                    if (algorithms.length === 0 || algorithms.some(alg => item.includes(alg))) {
                        files.push(fullPath);
                    }
                }
            }
        };

        findFiles('.');
        return files;
    }

    /**
     * @function runFile
     * @description Runs a single file
     * @param {string} filePath - Path to file
     * @param {object} langConfig - Language configuration
     * @returns {object} - Execution result
     */
    async runFile(filePath, langConfig) {
        try {
            let command;
            
            switch (langConfig.command) {
                case 'node':
                    command = `node "${filePath}"`;
                    break;
                case 'python3':
                    command = `python3 "${filePath}"`;
                    break;
                case 'javac':
                    // Compile first, then run
                    const className = path.basename(filePath, '.java');
                    const buildDir = path.join(process.cwd(), 'build');
                    execSync(`javac -d "${buildDir}" "${filePath}"`, { stdio: 'pipe' });
                    command = `java -cp "${buildDir}" ${className}`;
                    break;
                case 'gcc':
                    const cOutput = path.join(process.cwd(), 'build', path.basename(filePath, '.c'));
                    execSync(`gcc "${filePath}" -o "${cOutput}"`, { stdio: 'pipe' });
                    command = `"${cOutput}"`;
                    break;
                case 'g++':
                    const cppOutput = path.join(process.cwd(), 'build', path.basename(filePath, '.cpp'));
                    execSync(`g++ "${filePath}" -o "${cppOutput}"`, { stdio: 'pipe' });
                    command = `"${cppOutput}"`;
                    break;
                default:
                    throw new Error(`Unsupported command: ${langConfig.command}`);
            }

            const output = execSync(command, { 
                encoding: 'utf8',
                timeout: 10000,
                stdio: 'pipe'
            });

            return {
                file: filePath,
                success: true,
                output: output.trim(),
                command
            };

        } catch (error) {
            return {
                file: filePath,
                success: false,
                error: error.message,
                command: `${langConfig.command} "${filePath}"`
            };
        }
    }

    /**
     * @function runAssemblyFile
     * @description Runs Assembly file
     * @param {string} filePath - Path to Assembly file
     * @param {string} architecture - Target architecture
     * @returns {object} - Execution result
     */
    async runAssemblyFile(filePath, architecture) {
        try {
            // Compile Assembly file
            const compileResult = this.assemblyCompiler.compileAssembly(architecture, path.dirname(filePath));
            
            if (!compileResult.successful) {
                throw new Error('Assembly compilation failed');
            }

            // Find the compiled executable
            const buildDir = path.join(process.cwd(), 'build', architecture);
            const fileName = path.basename(filePath, path.extname(filePath));
            const executable = path.join(buildDir, fileName);

            if (!fs.existsSync(executable)) {
                throw new Error('Executable not found after compilation');
            }

            // Run the executable
            const output = execSync(`"${executable}"`, { 
                encoding: 'utf8',
                timeout: 10000,
                stdio: 'pipe'
            });

            return {
                file: filePath,
                success: true,
                output: output.trim(),
                executable
            };

        } catch (error) {
            return {
                file: filePath,
                success: false,
                error: error.message
            };
        }
    }

    /**
     * @function printSummary
     * @description Prints execution summary
     * @param {object} results - Execution results
     */
    printSummary(results) {
        console.log('');
        console.log(chalk.blue.bold('📊 Execution Summary'));
        console.log(chalk.gray('─'.repeat(50)));
        
        for (const [lang, langResults] of Object.entries(results.languages)) {
            const langConfig = this.languages[lang];
            const status = langResults.successful === langResults.total ? 
                chalk.green('✓') : 
                chalk.yellow('⚠');
            
            console.log(`${status} ${langConfig.description}: ${langResults.successful}/${langResults.total} successful`);
            
            if (langResults.failed > 0 && langResults.files) {
                const failedFiles = langResults.files.filter(f => !f.success);
                failedFiles.forEach(file => {
                    console.log(chalk.red(`  ✗ ${path.basename(file.file)}: ${file.error}`));
                });
            }
        }
        
        console.log(chalk.gray('─'.repeat(50)));
        console.log(chalk.bold(`Total: ${results.successful}/${results.total} successful`));
        
        if (results.failed > 0) {
            console.log(chalk.red(`Failed: ${results.failed}`));
        } else {
            console.log(chalk.green('🎉 All algorithms executed successfully!'));
        }
    }
}

// CLI interface
if (require.main === module) {
    const runner = new AlgorithmRunner();
    const args = process.argv.slice(2);
    
    const options = {
        languages: args.includes('--all') ? Object.keys(runner.languages) : ['javascript', 'python'],
        verbose: args.includes('--verbose'),
        architecture: args.includes('--x86') ? 'x86' : 'x64'
    };

    runner.runAll(options).catch(console.error);
}

module.exports = AlgorithmRunner;
