/**
 * @function languageChecker
 * @description Checks support for all programming languages in the environment
 * @param {object} options - Check options
 * @returns {object} - Check results
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');

class LanguageChecker {
    constructor() {
        this.languages = {
            'javascript': {
                command: 'node --version',
                description: 'JavaScript (Node.js)',
                dockerfile: 'docker/Dockerfile.javascript',
                needsCompile: false
            },
            'python': {
                command: 'python3 --version',
                description: 'Python 3',
                dockerfile: 'docker/Dockerfile.python',
                needsCompile: false
            },
            'java': {
                command: 'java -version',
                description: 'Java JDK',
                dockerfile: 'docker/Dockerfile.java',
                needsCompile: true
            },
            'c': {
                command: 'gcc --version',
                description: 'C (GCC)',
                dockerfile: 'docker/Dockerfile.c',
                needsCompile: true
            },
            'cpp': {
                command: 'g++ --version',
                description: 'C++ (G++)',
                dockerfile: 'docker/Dockerfile.cpp',
                needsCompile: true
            },
            'csharp': {
                command: 'dotnet --version',
                description: 'C# (.NET)',
                dockerfile: 'docker/Dockerfile.csharp',
                needsCompile: true
            },
            'dart': {
                command: 'dart --version',
                description: 'Dart',
                dockerfile: 'docker/Dockerfile.dart',
                needsCompile: false
            },
            'elixir': {
                command: 'elixir --version',
                description: 'Elixir',
                dockerfile: 'docker/Dockerfile.elixir',
                needsCompile: false
            },
            'erlang': {
                command: 'erl -version',
                description: 'Erlang',
                dockerfile: 'docker/Dockerfile.erlang',
                needsCompile: false
            },
            'go': {
                command: 'go version',
                description: 'Go',
                dockerfile: 'docker/Dockerfile.go',
                needsCompile: true
            },
            'kotlin': {
                command: 'kotlinc -version',
                description: 'Kotlin',
                dockerfile: 'docker/Dockerfile.kotlin',
                needsCompile: true
            },
            'php': {
                command: 'php --version',
                description: 'PHP',
                dockerfile: 'docker/Dockerfile.php',
                needsCompile: false
            },
            'racket': {
                command: 'racket --version',
                description: 'Racket',
                dockerfile: 'docker/Dockerfile.racket',
                needsCompile: false
            },
            'ruby': {
                command: 'ruby --version',
                description: 'Ruby',
                dockerfile: 'docker/Dockerfile.ruby',
                needsCompile: false
            },
            'rust': {
                command: 'rustc --version',
                description: 'Rust',
                dockerfile: 'docker/Dockerfile.rust',
                needsCompile: true
            },
            'scala': {
                command: 'scala -version',
                description: 'Scala',
                dockerfile: 'docker/Dockerfile.scala',
                needsCompile: true
            },
            'swift': {
                command: 'swift --version',
                description: 'Swift',
                dockerfile: 'docker/Dockerfile.swift',
                needsCompile: true
            },
            'typescript': {
                command: 'tsc --version',
                description: 'TypeScript',
                dockerfile: 'docker/Dockerfile.typescript',
                needsCompile: true
            },
            'assembly': {
                command: 'nasm --version',
                description: 'Assembly (NASM)',
                dockerfile: 'docker/Dockerfile.assembly',
                needsCompile: true
            }
        };
    }

    /**
     * @function checkAllLanguages
     * @description Checks all supported programming languages
     * @param {object} options - Check options
     * @returns {object} - Check results
     */
    async checkAllLanguages(options = {}) {
        const {
            includeDocker = true,
            includeLocal = true,
            verbose = false
        } = options;

        console.log(chalk.blue.bold('🔍 Language Support Checker'));
        console.log(chalk.gray(`Checking ${Object.keys(this.languages).length} programming languages`));
        console.log('');

        const results = {
            total: Object.keys(this.languages).length,
            local: { supported: 0, unsupported: 0, results: {} },
            docker: { supported: 0, unsupported: 0, results: {} },
            summary: {
                fullySupported: 0,
                partiallySupported: 0,
                notSupported: 0
            }
        };

        for (const [lang, config] of Object.entries(this.languages)) {
            const spinner = ora(`Checking ${config.description}...`).start();
            
            const langResult = {
                language: lang,
                description: config.description,
                local: null,
                docker: null,
                overall: 'not-supported'
            };

            // Check local installation
            if (includeLocal) {
                langResult.local = await this.checkLocalInstallation(lang, config);
                if (langResult.local.supported) {
                    results.local.supported++;
                } else {
                    results.local.unsupported++;
                }
            }

            // Check Docker support
            if (includeDocker) {
                langResult.docker = await this.checkDockerSupport(lang, config);
                if (langResult.docker.supported) {
                    results.docker.supported++;
                } else {
                    results.docker.unsupported++;
                }
            }

            // Determine overall support
            if (langResult.local?.supported && langResult.docker?.supported) {
                langResult.overall = 'fully-supported';
                results.summary.fullySupported++;
                spinner.succeed(chalk.green(`✓ ${config.description} - Fully supported`));
            } else if (langResult.local?.supported || langResult.docker?.supported) {
                langResult.overall = 'partially-supported';
                results.summary.partiallySupported++;
                spinner.warn(chalk.yellow(`⚠ ${config.description} - Partially supported`));
            } else {
                langResult.overall = 'not-supported';
                results.summary.notSupported++;
                spinner.fail(chalk.red(`✗ ${config.description} - Not supported`));
            }

            if (verbose) {
                if (langResult.local) {
                    console.log(chalk.gray(`  Local: ${langResult.local.supported ? '✓' : '✗'} ${langResult.local.version || 'Not found'}`));
                }
                if (langResult.docker) {
                    console.log(chalk.gray(`  Docker: ${langResult.docker.supported ? '✓' : '✗'} ${langResult.docker.dockerfile || 'No Dockerfile'}`));
                }
            }

            results.local.results[lang] = langResult;
        }

        this.printCheckSummary(results);
        return results;
    }

    /**
     * @function checkLocalInstallation
     * @description Checks local installation of a language
     * @param {string} language - Programming language
     * @param {object} config - Language configuration
     * @returns {object} - Check result
     */
    async checkLocalInstallation(language, config) {
        try {
            const output = execSync(config.command, { 
                encoding: 'utf8',
                stdio: 'pipe',
                timeout: 5000
            });
            
            return {
                supported: true,
                version: output.trim().split('\n')[0],
                command: config.command
            };
        } catch (error) {
            return {
                supported: false,
                error: error.message,
                command: config.command
            };
        }
    }

    /**
     * @function checkDockerSupport
     * @description Checks Docker support for a language
     * @param {string} language - Programming language
     * @param {object} config - Language configuration
     * @returns {object} - Check result
     */
    async checkDockerSupport(language, config) {
        const dockerfile = config.dockerfile;
        
        if (!fs.existsSync(dockerfile)) {
            return {
                supported: false,
                error: 'Dockerfile not found',
                dockerfile
            };
        }

        try {
            // Check if Dockerfile is valid
            const dockerfileContent = fs.readFileSync(dockerfile, 'utf8');
            
            return {
                supported: true,
                dockerfile,
                size: dockerfileContent.length,
                lines: dockerfileContent.split('\n').length
            };
        } catch (error) {
            return {
                supported: false,
                error: error.message,
                dockerfile
            };
        }
    }

    /**
     * @function generateSupportReport
     * @description Generates a comprehensive support report
     * @param {object} results - Check results
     * @returns {string} - Support report
     */
    generateSupportReport(results) {
        let report = '# 🚀 Programming Language Support Report\n\n';
        report += `Generated on: ${new Date().toISOString()}\n\n`;
        
        report += '## 📊 Summary\n\n';
        report += `- **Total Languages**: ${results.total}\n`;
        report += `- **Fully Supported**: ${results.summary.fullySupported}\n`;
        report += `- **Partially Supported**: ${results.summary.partiallySupported}\n`;
        report += `- **Not Supported**: ${results.summary.notSupported}\n\n`;
        
        report += '## 🔧 Local Installation\n\n';
        report += `- **Supported**: ${results.local.supported}\n`;
        report += `- **Not Supported**: ${results.local.unsupported}\n\n`;
        
        report += '## 🐳 Docker Support\n\n';
        report += `- **Supported**: ${results.docker.supported}\n`;
        report += `- **Not Supported**: ${results.docker.unsupported}\n\n`;
        
        report += '## 📋 Detailed Results\n\n';
        
        for (const [lang, result] of Object.entries(results.local.results)) {
            const config = this.languages[lang];
            report += `### ${config.description}\n\n`;
            report += `- **Overall Support**: ${result.overall}\n`;
            
            if (result.local) {
                report += `- **Local**: ${result.local.supported ? '✓' : '✗'} ${result.local.version || result.local.error}\n`;
            }
            
            if (result.docker) {
                report += `- **Docker**: ${result.docker.supported ? '✓' : '✗'} ${result.docker.dockerfile || result.docker.error}\n`;
            }
            
            report += `- **Needs Compilation**: ${config.needsCompile ? 'Yes' : 'No'}\n\n`;
        }
        
        return report;
    }

    /**
     * @function printCheckSummary
     * @description Prints check summary
     * @param {object} results - Check results
     */
    printCheckSummary(results) {
        console.log('');
        console.log(chalk.blue.bold('📊 Language Support Summary'));
        console.log(chalk.gray('─'.repeat(60)));
        
        console.log(chalk.green(`✓ Fully Supported: ${results.summary.fullySupported}/${results.total}`));
        console.log(chalk.yellow(`⚠ Partially Supported: ${results.summary.partiallySupported}/${results.total}`));
        console.log(chalk.red(`✗ Not Supported: ${results.summary.notSupported}/${results.total}`));
        
        console.log('');
        console.log(chalk.blue('🔧 Local Installation:'));
        console.log(chalk.green(`  ✓ Supported: ${results.local.supported}`));
        console.log(chalk.red(`  ✗ Not Supported: ${results.local.unsupported}`));
        
        console.log('');
        console.log(chalk.blue('🐳 Docker Support:'));
        console.log(chalk.green(`  ✓ Supported: ${results.docker.supported}`));
        console.log(chalk.red(`  ✗ Not Supported: ${results.docker.unsupported}`));
        
        if (results.summary.notSupported > 0) {
            console.log('');
            console.log(chalk.yellow.bold('⚠️  Not Supported Languages:'));
            
            Object.entries(results.local.results)
                .filter(([lang, result]) => result.overall === 'not-supported')
                .forEach(([lang, result]) => {
                    console.log(chalk.red(`  • ${this.languages[lang].description}`));
                });
        }
        
        if (results.summary.fullySupported === results.total) {
            console.log('');
            console.log(chalk.green.bold('🎉 All languages are fully supported!'));
        }
    }

    /**
     * @function getInstallationInstructions
     * @description Gets installation instructions for unsupported languages
     * @param {object} results - Check results
     * @returns {string} - Installation instructions
     */
    getInstallationInstructions(results) {
        let instructions = '# 📥 Installation Instructions\n\n';
        
        const unsupported = Object.entries(results.local.results)
            .filter(([lang, result]) => !result.local?.supported);
        
        if (unsupported.length === 0) {
            instructions += 'All languages are already installed! 🎉\n';
            return instructions;
        }
        
        instructions += '## Missing Languages\n\n';
        
        for (const [lang, result] of unsupported) {
            const config = this.languages[lang];
            instructions += `### ${config.description}\n\n`;
            
            switch (lang) {
                case 'javascript':
                    instructions += '```bash\nnpm install -g node\n```\n\n';
                    break;
                case 'python':
                    instructions += '```bash\n# Ubuntu/Debian\nsudo apt-get install python3\n\n# macOS\nbrew install python3\n```\n\n';
                    break;
                case 'java':
                    instructions += '```bash\n# Ubuntu/Debian\nsudo apt-get install openjdk-17-jdk\n\n# macOS\nbrew install openjdk@17\n```\n\n';
                    break;
                case 'c':
                case 'cpp':
                    instructions += '```bash\n# Ubuntu/Debian\nsudo apt-get install build-essential\n\n# macOS\nxcode-select --install\n```\n\n';
                    break;
                case 'csharp':
                    instructions += '```bash\n# Install .NET SDK\nwget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb\nsudo dpkg -i packages-microsoft-prod.deb\nsudo apt-get update\nsudo apt-get install dotnet-sdk-6.0\n```\n\n';
                    break;
                case 'go':
                    instructions += '```bash\n# Download and install Go\nwget https://go.dev/dl/go1.21.0.linux-amd64.tar.gz\nsudo tar -C /usr/local -xzf go1.21.0.linux-amd64.tar.gz\nexport PATH=$PATH:/usr/local/go/bin\n```\n\n';
                    break;
                case 'rust':
                    instructions += '```bash\n# Install Rust\ncurl --proto "=https" --tlsv1.2 -sSf https://sh.rustup.rs | sh\nsource ~/.cargo/env\n```\n\n';
                    break;
                default:
                    instructions += `Check the official documentation for ${config.description} installation.\n\n`;
            }
        }
        
        return instructions;
    }
}

// CLI interface
if (require.main === module) {
    const checker = new LanguageChecker();
    const args = process.argv.slice(2);
    
    const options = {
        includeDocker: !args.includes('--no-docker'),
        includeLocal: !args.includes('--no-local'),
        verbose: args.includes('--verbose')
    };

    checker.checkAllLanguages(options)
        .then(results => {
            if (args.includes('--report')) {
                const report = checker.generateSupportReport(results);
                fs.writeFileSync('language-support-report.md', report);
                console.log(chalk.green('📄 Report saved to language-support-report.md'));
            }
            
            if (args.includes('--instructions')) {
                const instructions = checker.getInstallationInstructions(results);
                fs.writeFileSync('installation-instructions.md', instructions);
                console.log(chalk.green('📄 Instructions saved to installation-instructions.md'));
            }
        })
        .catch(console.error);
}

module.exports = LanguageChecker;
