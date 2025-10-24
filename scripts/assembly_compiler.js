/**
 * @function assemblyCompiler
 * @description Compiles Assembly code for different architectures
 * @param {string} architecture - Target architecture (x86, x64, arm, etc.)
 * @returns {object} - Compilation result
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

class AssemblyCompiler {
    constructor() {
        this.architectures = {
            'x86': {
                nasm: '-f elf32',
                gcc: '-m32',
                description: '32-bit x86'
            },
            'x64': {
                nasm: '-f elf64',
                gcc: '-m64',
                description: '64-bit x86-64'
            },
            'arm': {
                nasm: '-f elf32',
                gcc: '-marm',
                description: 'ARM 32-bit'
            },
            'arm64': {
                nasm: '-f elf64',
                gcc: '-march=armv8-a',
                description: 'ARM 64-bit'
            }
        };
    }

    /**
     * @function compileAssembly
     * @description Compiles Assembly files for specified architecture
     * @param {string} architecture - Target architecture
     * @param {string} sourceDir - Source directory
     * @returns {object} - Compilation result
     */
    compileAssembly(architecture = 'x64', sourceDir = '.') {
        try {
            const arch = this.architectures[architecture];
            if (!arch) {
                throw new Error(`Unsupported architecture: ${architecture}`);
            }

            console.log(chalk.blue(`Compiling Assembly for ${arch.description}...`));

            const asmFiles = this.findAssemblyFiles(sourceDir);
            const results = [];

            for (const file of asmFiles) {
                try {
                    const result = this.compileFile(file, arch, architecture);
                    results.push(result);
                    console.log(chalk.green(`✓ Compiled: ${file}`));
                } catch (error) {
                    console.log(chalk.red(`✗ Failed: ${file} - ${error.message}`));
                    results.push({
                        file,
                        success: false,
                        error: error.message
                    });
                }
            }

            return {
                architecture,
                totalFiles: asmFiles.length,
                successful: results.filter(r => r.success).length,
                failed: results.filter(r => !r.success).length,
                results
            };

        } catch (error) {
            console.error(chalk.red(`Assembly compilation failed: ${error.message}`));
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * @function findAssemblyFiles
     * @description Finds all Assembly files in directory
     * @param {string} dir - Directory to search
     * @returns {array} - Array of Assembly file paths
     */
    findAssemblyFiles(dir) {
        const files = [];
        
        const findFiles = (currentDir) => {
            const items = fs.readdirSync(currentDir);
            
            for (const item of items) {
                const fullPath = path.join(currentDir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
                    findFiles(fullPath);
                } else if (item.endsWith('.asm') || item.endsWith('.s')) {
                    files.push(fullPath);
                }
            }
        };

        findFiles(dir);
        return files;
    }

    /**
     * @function compileFile
     * @description Compiles a single Assembly file
     * @param {string} filePath - Path to Assembly file
     * @param {object} arch - Architecture configuration
     * @param {string} architecture - Architecture name
     * @returns {object} - Compilation result
     */
    compileFile(filePath, arch, architecture) {
        const buildDir = path.join(process.cwd(), 'build');
        const outputDir = path.join(buildDir, architecture);
        
        // Create output directory
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const fileName = path.basename(filePath, path.extname(filePath));
        const objectFile = path.join(outputDir, `${fileName}.o`);
        const executableFile = path.join(outputDir, fileName);

        try {
            // Compile with NASM
            const nasmCmd = `nasm ${arch.nasm} "${filePath}" -o "${objectFile}"`;
            execSync(nasmCmd, { stdio: 'pipe' });

            // Link with GCC
            const gccCmd = `gcc ${arch.gcc} "${objectFile}" -o "${executableFile}"`;
            execSync(gccCmd, { stdio: 'pipe' });

            return {
                file: filePath,
                success: true,
                objectFile,
                executableFile
            };

        } catch (error) {
            throw new Error(`Compilation failed: ${error.message}`);
        }
    }

    /**
     * @function runAssembly
     * @description Runs compiled Assembly programs
     * @param {string} architecture - Target architecture
     * @returns {object} - Execution results
     */
    runAssembly(architecture = 'x64') {
        try {
            const buildDir = path.join(process.cwd(), 'build');
            const outputDir = path.join(buildDir, architecture);
            
            if (!fs.existsSync(outputDir)) {
                throw new Error(`No compiled programs found for ${architecture}`);
            }

            const executables = fs.readdirSync(outputDir)
                .filter(file => !file.endsWith('.o'))
                .map(file => path.join(outputDir, file));

            const results = [];

            for (const executable of executables) {
                try {
                    console.log(chalk.blue(`Running: ${path.basename(executable)}`));
                    const output = execSync(`"${executable}"`, { 
                        encoding: 'utf8',
                        timeout: 5000 
                    });
                    
                    results.push({
                        executable,
                        success: true,
                        output: output.trim()
                    });
                    
                    console.log(chalk.green(`✓ Executed successfully`));
                    if (output.trim()) {
                        console.log(chalk.gray(`Output: ${output.trim()}`));
                    }

                } catch (error) {
                    results.push({
                        executable,
                        success: false,
                        error: error.message
                    });
                    console.log(chalk.red(`✗ Execution failed: ${error.message}`));
                }
            }

            return {
                architecture,
                totalPrograms: executables.length,
                successful: results.filter(r => r.success).length,
                failed: results.filter(r => !r.success).length,
                results
            };

        } catch (error) {
            console.error(chalk.red(`Assembly execution failed: ${error.message}`));
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * @function cleanAssembly
     * @description Cleans compiled Assembly files
     * @param {string} architecture - Target architecture
     * @returns {boolean} - Success status
     */
    cleanAssembly(architecture = 'x64') {
        try {
            const buildDir = path.join(process.cwd(), 'build');
            const outputDir = path.join(buildDir, architecture);
            
            if (fs.existsSync(outputDir)) {
                fs.rmSync(outputDir, { recursive: true, force: true });
                console.log(chalk.green(`✓ Cleaned Assembly files for ${architecture}`));
            }
            
            return true;
        } catch (error) {
            console.error(chalk.red(`Failed to clean Assembly files: ${error.message}`));
            return false;
        }
    }
}

module.exports = AssemblyCompiler;
