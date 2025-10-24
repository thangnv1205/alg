/**
 * @function setupEnvironment
 * @description Sets up the development environment for all supported programming languages
 * @param {object} options - Configuration options
 * @returns {object} - Setup results
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');

class EnvironmentSetup {
    constructor() {
        this.requiredTools = {
            'node': {
                command: 'node --version',
                install: 'https://nodejs.org/',
                description: 'Node.js'
            },
            'python3': {
                command: 'python3 --version',
                install: 'https://www.python.org/downloads/',
                description: 'Python 3'
            },
            'java': {
                command: 'java -version',
                install: 'https://www.oracle.com/java/technologies/downloads/',
                description: 'Java JDK'
            },
            'gcc': {
                command: 'gcc --version',
                install: 'https://gcc.gnu.org/install/',
                description: 'GCC Compiler'
            },
            'g++': {
                command: 'g++ --version',
                install: 'https://gcc.gnu.org/install/',
                description: 'G++ Compiler'
            },
            'nasm': {
                command: 'nasm --version',
                install: 'https://www.nasm.us/',
                description: 'NASM Assembler'
            },
            'csc': {
                command: 'csc -help',
                install: 'https://dotnet.microsoft.com/download',
                description: 'C# Compiler'
            },
            'dart': {
                command: 'dart --version',
                install: 'https://dart.dev/get-dart',
                description: 'Dart SDK'
            },
            'elixir': {
                command: 'elixir --version',
                install: 'https://elixir-lang.org/install.html',
                description: 'Elixir'
            },
            'erl': {
                command: 'erl -version',
                install: 'https://www.erlang.org/downloads',
                description: 'Erlang'
            },
            'go': {
                command: 'go version',
                install: 'https://golang.org/dl/',
                description: 'Go'
            },
            'kotlinc': {
                command: 'kotlinc -version',
                install: 'https://kotlinlang.org/docs/command-line.html',
                description: 'Kotlin Compiler'
            },
            'php': {
                command: 'php --version',
                install: 'https://www.php.net/downloads.php',
                description: 'PHP'
            },
            'racket': {
                command: 'racket --version',
                install: 'https://racket-lang.org/download/',
                description: 'Racket'
            },
            'ruby': {
                command: 'ruby --version',
                install: 'https://www.ruby-lang.org/en/downloads/',
                description: 'Ruby'
            },
            'rustc': {
                command: 'rustc --version',
                install: 'https://rustup.rs/',
                description: 'Rust Compiler'
            },
            'scalac': {
                command: 'scalac -version',
                install: 'https://www.scala-lang.org/download/',
                description: 'Scala Compiler'
            },
            'swift': {
                command: 'swift --version',
                install: 'https://swift.org/download/',
                description: 'Swift'
            },
            'tsc': {
                command: 'tsc --version',
                install: 'npm install -g typescript',
                description: 'TypeScript Compiler'
            }
        };
    }

    /**
     * @function checkAllTools
     * @description Checks if all required tools are installed
     * @returns {object} - Check results
     */
    async checkAllTools() {
        console.log(chalk.blue.bold('🔍 Checking Development Environment'));
        console.log(chalk.gray('─'.repeat(50)));

        const results = {
            total: Object.keys(this.requiredTools).length,
            installed: 0,
            missing: 0,
            tools: {}
        };

        for (const [tool, config] of Object.entries(this.requiredTools)) {
            const spinner = ora(`Checking ${config.description}...`).start();
            
            try {
                const output = execSync(config.command, { 
                    encoding: 'utf8',
                    stdio: 'pipe',
                    timeout: 5000
                });
                
                results.installed++;
                results.tools[tool] = {
                    installed: true,
                    version: output.trim().split('\n')[0],
                    description: config.description
                };
                
                spinner.succeed(chalk.green(`✓ ${config.description} - ${output.trim().split('\n')[0]}`));
                
            } catch (error) {
                results.missing++;
                results.tools[tool] = {
                    installed: false,
                    error: error.message,
                    installUrl: config.install,
                    description: config.description
                };
                
                spinner.fail(chalk.red(`✗ ${config.description} - Not installed`));
            }
        }

        this.printCheckSummary(results);
        return results;
    }

    /**
     * @function printCheckSummary
     * @description Prints the check summary
     * @param {object} results - Check results
     */
    printCheckSummary(results) {
        console.log('');
        console.log(chalk.blue.bold('📊 Environment Check Summary'));
        console.log(chalk.gray('─'.repeat(50)));
        console.log(chalk.green(`✓ Installed: ${results.installed}/${results.total}`));
        
        if (results.missing > 0) {
            console.log(chalk.red(`✗ Missing: ${results.missing}`));
            console.log('');
            console.log(chalk.yellow.bold('⚠️  Missing Tools:'));
            
            for (const [tool, info] of Object.entries(results.tools)) {
                if (!info.installed) {
                    console.log(chalk.red(`  • ${info.description}`));
                    console.log(chalk.gray(`    Install: ${info.installUrl}`));
                }
            }
        } else {
            console.log(chalk.green('🎉 All tools are installed!'));
        }
    }

    /**
     * @function installNodeDependencies
     * @description Installs Node.js dependencies
     * @returns {boolean} - Success status
     */
    async installNodeDependencies() {
        const spinner = ora('Installing Node.js dependencies...').start();
        
        try {
            execSync('npm install', { stdio: 'pipe' });
            spinner.succeed(chalk.green('✓ Node.js dependencies installed'));
            return true;
        } catch (error) {
            spinner.fail(chalk.red(`✗ Failed to install Node.js dependencies: ${error.message}`));
            return false;
        }
    }

    /**
     * @function createDirectories
     * @description Creates necessary directories
     * @returns {boolean} - Success status
     */
    createDirectories() {
        const spinner = ora('Creating directories...').start();
        
        try {
            const directories = [
                'build',
                'bin',
                'logs',
                'test-results'
            ];

            for (const dir of directories) {
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
            }

            spinner.succeed(chalk.green('✓ Directories created'));
            return true;
        } catch (error) {
            spinner.fail(chalk.red(`✗ Failed to create directories: ${error.message}`));
            return false;
        }
    }

    /**
     * @function generateConfigFile
     * @description Generates configuration file
     * @returns {boolean} - Success status
     */
    generateConfigFile() {
        const spinner = ora('Generating configuration file...').start();
        
        try {
            const config = {
                languages: Object.keys(this.requiredTools),
                buildDir: 'build',
                binDir: 'bin',
                logsDir: 'logs',
                testResultsDir: 'test-results',
                version: '1.0.0',
                lastUpdated: new Date().toISOString()
            };

            fs.writeFileSync('config.json', JSON.stringify(config, null, 2));
            spinner.succeed(chalk.green('✓ Configuration file generated'));
            return true;
        } catch (error) {
            spinner.fail(chalk.red(`✗ Failed to generate configuration: ${error.message}`));
            return false;
        }
    }

    /**
     * @function setupComplete
     * @description Performs complete environment setup
     * @param {object} options - Setup options
     * @returns {object} - Setup results
     */
    async setupComplete(options = {}) {
        const { skipChecks = false, installDeps = true } = options;
        
        console.log(chalk.blue.bold('🚀 Setting Up Development Environment'));
        console.log('');

        const results = {
            checks: null,
            dependencies: false,
            directories: false,
            config: false,
            success: false
        };

        // Check tools if not skipped
        if (!skipChecks) {
            results.checks = await this.checkAllTools();
        }

        // Install dependencies
        if (installDeps) {
            results.dependencies = await this.installNodeDependencies();
        }

        // Create directories
        results.directories = this.createDirectories();

        // Generate config
        results.config = this.generateConfigFile();

        // Overall success
        results.success = results.dependencies && results.directories && results.config;

        this.printSetupSummary(results);
        return results;
    }

    /**
     * @function printSetupSummary
     * @description Prints setup summary
     * @param {object} results - Setup results
     */
    printSetupSummary(results) {
        console.log('');
        console.log(chalk.blue.bold('📋 Setup Summary'));
        console.log(chalk.gray('─'.repeat(50)));
        
        if (results.checks) {
            console.log(chalk.green(`✓ Environment check: ${results.checks.installed}/${results.checks.total} tools installed`));
        }
        
        console.log(chalk.green(`✓ Dependencies: ${results.dependencies ? 'Installed' : 'Failed'}`));
        console.log(chalk.green(`✓ Directories: ${results.directories ? 'Created' : 'Failed'}`));
        console.log(chalk.green(`✓ Configuration: ${results.config ? 'Generated' : 'Failed'}`));
        
        if (results.success) {
            console.log('');
            console.log(chalk.green.bold('🎉 Environment setup completed successfully!'));
            console.log(chalk.gray('You can now run algorithms using:'));
            console.log(chalk.blue('  npm run run-all'));
            console.log(chalk.blue('  make run-all'));
        } else {
            console.log('');
            console.log(chalk.red.bold('❌ Setup completed with errors'));
            console.log(chalk.gray('Please check the errors above and try again'));
        }
    }
}

// CLI interface
if (require.main === module) {
    const setup = new EnvironmentSetup();
    const args = process.argv.slice(2);
    
    const options = {
        skipChecks: args.includes('--skip-checks'),
        installDeps: !args.includes('--no-deps')
    };

    setup.setupComplete(options).catch(console.error);
}

module.exports = EnvironmentSetup;
