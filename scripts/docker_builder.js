/**
 * @function dockerBuilder
 * @description Builds Docker images for all supported programming languages
 * @param {object} options - Build options
 * @returns {object} - Build results
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');

class DockerBuilder {
    constructor() {
        this.languages = [
            'javascript',
            'python', 
            'java',
            'c',
            'cpp',
            'csharp',
            'dart',
            'elixir',
            'erlang',
            'go',
            'kotlin',
            'php',
            'racket',
            'ruby',
            'rust',
            'scala',
            'swift',
            'typescript',
            'assembly',
            'all'
        ];
        
        this.dockerRegistry = process.env.DOCKER_REGISTRY || 'localhost:5000';
        this.username = process.env.DOCKER_USERNAME || 'algorithms';
    }

    /**
     * @function buildAllImages
     * @description Builds Docker images for all languages
     * @param {object} options - Build options
     * @returns {object} - Build results
     */
    async buildAllImages(options = {}) {
        const {
            push = false,
            tag = 'latest',
            parallel = false,
            languages = this.languages
        } = options;

        console.log(chalk.blue.bold('🐳 Building Docker Images'));
        console.log(chalk.gray(`Languages: ${languages.join(', ')}`));
        console.log(chalk.gray(`Tag: ${tag}`));
        console.log(chalk.gray(`Push: ${push}`));
        console.log('');

        const results = {
            total: languages.length,
            successful: 0,
            failed: 0,
            images: []
        };

        if (parallel) {
            // Build images in parallel
            const buildPromises = languages.map(lang => this.buildImage(lang, { tag, push }));
            const buildResults = await Promise.allSettled(buildPromises);
            
            buildResults.forEach((result, index) => {
                const lang = languages[index];
                if (result.status === 'fulfilled') {
                    results.successful++;
                    results.images.push({
                        language: lang,
                        success: true,
                        image: result.value.image,
                        buildTime: result.value.buildTime
                    });
                } else {
                    results.failed++;
                    results.images.push({
                        language: lang,
                        success: false,
                        error: result.reason.message
                    });
                }
            });
        } else {
            // Build images sequentially
            for (const lang of languages) {
                const spinner = ora(`Building ${lang} image...`).start();
                
                try {
                    const result = await this.buildImage(lang, { tag, push });
                    results.successful++;
                    results.images.push({
                        language: lang,
                        success: true,
                        image: result.image,
                        buildTime: result.buildTime
                    });
                    
                    spinner.succeed(chalk.green(`✓ ${lang} image built successfully`));
                } catch (error) {
                    results.failed++;
                    results.images.push({
                        language: lang,
                        success: false,
                        error: error.message
                    });
                    
                    spinner.fail(chalk.red(`✗ ${lang} image build failed: ${error.message}`));
                }
            }
        }

        this.printBuildSummary(results);
        return results;
    }

    /**
     * @function buildImage
     * @description Builds a single Docker image
     * @param {string} language - Programming language
     * @param {object} options - Build options
     * @returns {object} - Build result
     */
    async buildImage(language, options = {}) {
        const { tag = 'latest', push = false } = options;
        const startTime = process.hrtime.bigint();
        
        const dockerfile = `docker/Dockerfile.${language}`;
        const imageName = `${this.username}/algorithms-${language}`;
        const fullTag = `${imageName}:${tag}`;
        
        if (!fs.existsSync(dockerfile)) {
            throw new Error(`Dockerfile not found: ${dockerfile}`);
        }

        try {
            // Build the image
            const buildCommand = `docker build -f ${dockerfile} -t ${fullTag} .`;
            execSync(buildCommand, { 
                stdio: 'pipe',
                timeout: 600000 // 10 minutes timeout
            });

            // Push if requested
            if (push) {
                const pushCommand = `docker push ${fullTag}`;
                execSync(pushCommand, { 
                    stdio: 'pipe',
                    timeout: 300000 // 5 minutes timeout
                });
            }

            const endTime = process.hrtime.bigint();
            const buildTime = Number(endTime - startTime) / 1000000; // Convert to milliseconds

            return {
                image: fullTag,
                buildTime,
                pushed: push
            };

        } catch (error) {
            throw new Error(`Docker build failed: ${error.message}`);
        }
    }

    /**
     * @function testImages
     * @description Tests built Docker images
     * @param {array} images - List of images to test
     * @returns {object} - Test results
     */
    async testImages(images = []) {
        console.log(chalk.blue.bold('🧪 Testing Docker Images'));
        console.log('');

        const results = {
            total: images.length,
            successful: 0,
            failed: 0,
            tests: []
        };

        for (const image of images) {
            const spinner = ora(`Testing ${image}...`).start();
            
            try {
                const testResult = await this.testImage(image);
                results.successful++;
                results.tests.push({
                    image,
                    success: true,
                    output: testResult.output,
                    exitCode: testResult.exitCode
                });
                
                spinner.succeed(chalk.green(`✓ ${image} test passed`));
            } catch (error) {
                results.failed++;
                results.tests.push({
                    image,
                    success: false,
                    error: error.message
                });
                
                spinner.fail(chalk.red(`✗ ${image} test failed: ${error.message}`));
            }
        }

        this.printTestSummary(results);
        return results;
    }

    /**
     * @function testImage
     * @description Tests a single Docker image
     * @param {string} image - Docker image name
     * @returns {object} - Test result
     */
    async testImage(image) {
        try {
            const testCommand = `docker run --rm ${image} --version`;
            const output = execSync(testCommand, { 
                encoding: 'utf8',
                stdio: 'pipe',
                timeout: 30000 // 30 seconds timeout
            });

            return {
                output: output.trim(),
                exitCode: 0
            };

        } catch (error) {
            throw new Error(`Image test failed: ${error.message}`);
        }
    }

    /**
     * @function cleanImages
     * @description Cleans up Docker images
     * @param {array} images - Images to clean
     * @returns {boolean} - Success status
     */
    async cleanImages(images = []) {
        console.log(chalk.blue.bold('🧹 Cleaning Docker Images'));
        console.log('');

        const results = {
            total: images.length,
            successful: 0,
            failed: 0
        };

        for (const image of images) {
            const spinner = ora(`Removing ${image}...`).start();
            
            try {
                execSync(`docker rmi ${image}`, { 
                    stdio: 'pipe',
                    timeout: 60000 // 1 minute timeout
                });
                
                results.successful++;
                spinner.succeed(chalk.green(`✓ ${image} removed`));
            } catch (error) {
                results.failed++;
                spinner.fail(chalk.red(`✗ Failed to remove ${image}: ${error.message}`));
            }
        }

        console.log('');
        console.log(chalk.blue.bold('📊 Cleanup Summary'));
        console.log(chalk.green(`✓ Removed: ${results.successful}`));
        console.log(chalk.red(`✗ Failed: ${results.failed}`));
        
        return results.successful === results.total;
    }

    /**
     * @function generateDockerCompose
     * @description Generates docker-compose.yml for all languages
     * @param {object} options - Generation options
     * @returns {string} - Docker Compose content
     */
    generateDockerCompose(options = {}) {
        const {
            registry = this.dockerRegistry,
            username = this.username,
            tag = 'latest'
        } = options;

        let compose = `version: '3.8'

services:
`;

        for (const lang of this.languages) {
            if (lang === 'all') continue;
            
            const imageName = `${username}/algorithms-${lang}:${tag}`;
            
            compose += `  algorithms-${lang}:
    image: ${imageName}
    container_name: algorithms-${lang}
    volumes:
      - ./algorithms:/app/algorithms
      - ./results:/app/results
      - ./build:/app/build
    environment:
      - NODE_ENV=production
    command: ["node", "scripts/run_all.js", "--languages", "${lang}"]
    depends_on:
      - redis
      - postgres

`;
        }

        compose += `  redis:
    image: redis:7-alpine
    container_name: algorithms-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  postgres:
    image: postgres:15-alpine
    container_name: algorithms-postgres
    environment:
      - POSTGRES_DB=algorithms
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  redis_data:
  postgres_data:
`;

        return compose;
    }

    /**
     * @function printBuildSummary
     * @description Prints build summary
     * @param {object} results - Build results
     */
    printBuildSummary(results) {
        console.log('');
        console.log(chalk.blue.bold('📊 Build Summary'));
        console.log(chalk.gray('─'.repeat(50)));
        console.log(chalk.green(`✓ Successful: ${results.successful}/${results.total}`));
        
        if (results.failed > 0) {
            console.log(chalk.red(`✗ Failed: ${results.failed}`));
            console.log('');
            console.log(chalk.yellow.bold('⚠️  Failed Builds:'));
            
            results.images
                .filter(img => !img.success)
                .forEach(img => {
                    console.log(chalk.red(`  • ${img.language}: ${img.error}`));
                });
        } else {
            console.log(chalk.green('🎉 All images built successfully!'));
        }
    }

    /**
     * @function printTestSummary
     * @description Prints test summary
     * @param {object} results - Test results
     */
    printTestSummary(results) {
        console.log('');
        console.log(chalk.blue.bold('📊 Test Summary'));
        console.log(chalk.gray('─'.repeat(50)));
        console.log(chalk.green(`✓ Passed: ${results.successful}/${results.total}`));
        
        if (results.failed > 0) {
            console.log(chalk.red(`✗ Failed: ${results.failed}`));
        } else {
            console.log(chalk.green('🎉 All tests passed!'));
        }
    }
}

// CLI interface
if (require.main === module) {
    const builder = new DockerBuilder();
    const args = process.argv.slice(2);
    
    const options = {
        push: args.includes('--push'),
        tag: args.includes('--tag') ? args[args.indexOf('--tag') + 1] : 'latest',
        parallel: args.includes('--parallel'),
        languages: args.includes('--languages') ? 
            args[args.indexOf('--languages') + 1].split(',') : 
            builder.languages
    };

    builder.buildAllImages(options).catch(console.error);
}

module.exports = DockerBuilder;
