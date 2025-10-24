/**
 * @file floyd_warshall.js
 * @description Implementation of Floyd-Warshall algorithm in JavaScript
 * @author Algorithm Collection
 * @version 1.0
 */

/**
 * @function floydWarshall
 * @description Floyd-Warshall algorithm to find shortest paths between all pairs
 * @param {Array<Array<number>>} graph - Adjacency matrix representation of graph
 * @returns {Array<Array<number>>} - Matrix of shortest distances between all pairs
 */
function floydWarshall(graph) {
    const n = graph.length;
    const dist = Array(n).fill().map(() => Array(n).fill(0));
    
    // Initialize distance matrix
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (i === j) {
                dist[i][j] = 0;
            } else if (graph[i][j] !== 0) {
                dist[i][j] = graph[i][j];
            } else {
                dist[i][j] = Infinity;
            }
        }
    }
    
    // Floyd-Warshall algorithm
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (dist[i][k] !== Infinity && dist[k][j] !== Infinity) {
                    dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }
    }
    
    return dist;
}

/**
 * @function floydWarshallWithPath
 * @description Floyd-Warshall algorithm that also returns paths
 * @param {Array<Array<number>>} graph - Adjacency matrix representation of graph
 * @returns {Map<string, Array<number>>} - Map of paths between all pairs
 */
function floydWarshallWithPath(graph) {
    const n = graph.length;
    const dist = Array(n).fill().map(() => Array(n).fill(0));
    const next = Array(n).fill().map(() => Array(n).fill(0));
    
    // Initialize distance and next matrices
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (i === j) {
                dist[i][j] = 0;
                next[i][j] = j;
            } else if (graph[i][j] !== 0) {
                dist[i][j] = graph[i][j];
                next[i][j] = j;
            } else {
                dist[i][j] = Infinity;
                next[i][j] = -1;
            }
        }
    }
    
    // Floyd-Warshall algorithm
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (dist[i][k] !== Infinity && dist[k][j] !== Infinity) {
                    if (dist[i][j] > dist[i][k] + dist[k][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                        next[i][j] = next[i][k];
                    }
                }
            }
        }
    }
    
    // Reconstruct paths
    const paths = new Map();
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (i !== j && dist[i][j] !== Infinity) {
                const key = `${i}->${j}`;
                paths.set(key, reconstructPath(next, i, j));
            }
        }
    }
    
    return paths;
}

/**
 * @function reconstructPath
 * @description Reconstructs path from next matrix
 * @param {Array<Array<number>>} next - Next matrix
 * @param {number} start - Starting vertex
 * @param {number} end - Ending vertex
 * @returns {Array<number>} - Path from start to end
 */
function reconstructPath(next, start, end) {
    const path = [];
    
    if (next[start][end] === -1) {
        return path; // No path
    }
    
    let current = start;
    path.push(current);
    
    while (current !== end) {
        current = next[current][end];
        path.push(current);
    }
    
    return path;
}

/**
 * @function detectNegativeCycle
 * @description Detects negative cycles in the graph
 * @param {Array<Array<number>>} graph - Adjacency matrix representation of graph
 * @returns {boolean} - True if negative cycle exists
 */
function detectNegativeCycle(graph) {
    const dist = floydWarshall(graph);
    
    // Check for negative cycles (negative diagonal elements)
    for (let i = 0; i < dist.length; i++) {
        if (dist[i][i] < 0) {
            return true;
        }
    }
    
    return false;
}

/**
 * @function transitiveClosure
 * @description Computes transitive closure of the graph
 * @param {Array<Array<number>>} graph - Adjacency matrix representation of graph
 * @returns {Array<Array<boolean>>} - Transitive closure matrix
 */
function transitiveClosure(graph) {
    const n = graph.length;
    const reachable = Array(n).fill().map(() => Array(n).fill(false));
    
    // Initialize reachable matrix
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            reachable[i][j] = (i === j) || (graph[i][j] !== 0);
        }
    }
    
    // Floyd-Warshall for transitive closure
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                reachable[i][j] = reachable[i][j] || (reachable[i][k] && reachable[k][j]);
            }
        }
    }
    
    return reachable;
}

/**
 * @function floydWarshallOptimized
 * @description Optimized Floyd-Warshall with early termination
 * @param {Array<Array<number>>} graph - Adjacency matrix representation of graph
 * @returns {Array<Array<number>>} - Matrix of shortest distances
 */
function floydWarshallOptimized(graph) {
    const n = graph.length;
    const dist = Array(n).fill().map(() => Array(n).fill(0));
    
    // Initialize distance matrix
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (i === j) {
                dist[i][j] = 0;
            } else if (graph[i][j] !== 0) {
                dist[i][j] = graph[i][j];
            } else {
                dist[i][j] = Infinity;
            }
        }
    }
    
    // Floyd-Warshall algorithm with optimization
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            if (dist[i][k] !== Infinity) {
                for (let j = 0; j < n; j++) {
                    if (dist[k][j] !== Infinity) {
                        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
                    }
                }
            }
        }
    }
    
    return dist;
}

/**
 * @function createSampleGraph
 * @description Creates a sample graph for testing
 * @returns {Array<Array<number>>} - Adjacency matrix
 */
function createSampleGraph() {
    const graph = [
        [0, 4, 0, 0, 0, 0, 0, 8, 0],
        [4, 0, 8, 0, 0, 0, 0, 11, 0],
        [0, 8, 0, 7, 0, 4, 0, 0, 2],
        [0, 0, 7, 0, 9, 14, 0, 0, 0],
        [0, 0, 0, 9, 0, 10, 0, 0, 0],
        [0, 0, 4, 14, 10, 0, 2, 0, 0],
        [0, 0, 0, 0, 0, 2, 0, 1, 6],
        [8, 11, 0, 0, 0, 0, 1, 0, 7],
        [0, 0, 2, 0, 0, 0, 6, 7, 0]
    ];
    return graph;
}

/**
 * @function printMatrix
 * @description Prints a matrix in a formatted way
 * @param {Array<Array<number>>} matrix - Matrix to print
 * @returns {void}
 */
function printMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        let row = "";
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === Infinity) {
                row += "     INF";
            } else {
                row += `     ${matrix[i][j].toFixed(1)}`;
            }
        }
        console.log(row);
    }
}

/**
 * @function testFloydWarshall
 * @description Test function to demonstrate Floyd-Warshall algorithm
 * @returns {void}
 */
function testFloydWarshall() {
    console.log("=== Floyd-Warshall Test ===");
    
    // Test 1: Basic Floyd-Warshall
    console.log("Test 1: Basic Floyd-Warshall");
    const graph = createSampleGraph();
    console.log("Original graph:");
    printMatrix(graph);
    console.log();
    
    const shortestPaths = floydWarshall(graph);
    console.log("Shortest paths between all pairs:");
    printMatrix(shortestPaths);
    console.log();
    
    // Test 2: Path reconstruction
    console.log("Test 2: Path reconstruction");
    const paths = floydWarshallWithPath(graph);
    console.log("Sample paths:");
    for (const [key, path] of paths) {
        if (key.startsWith("0->")) {
            console.log(`Path ${key}:`, path);
        }
    }
    console.log();
    
    // Test 3: Negative cycle detection
    console.log("Test 3: Negative cycle detection");
    const hasNegativeCycle = detectNegativeCycle(graph);
    console.log("Graph has negative cycle:", hasNegativeCycle);
    console.log();
    
    // Test 4: Transitive closure
    console.log("Test 4: Transitive closure");
    const transitive = transitiveClosure(graph);
    console.log("Transitive closure:");
    for (let i = 0; i < transitive.length; i++) {
        let row = "";
        for (let j = 0; j < transitive[i].length; j++) {
            row += `    ${transitive[i][j] ? "T" : "F"}`;
        }
        console.log(row);
    }
    console.log();
}

/**
 * @function performanceTest
 * @description Performance test for Floyd-Warshall algorithm
 * @returns {void}
 */
function performanceTest() {
    console.log("=== Performance Test ===");
    
    const sizes = [10, 20, 50, 100, 200];
    
    for (const size of sizes) {
        const graph = Array(size).fill().map(() => Array(size).fill(0));
        
        // Create random graph
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (i === j) {
                    graph[i][j] = 0;
                } else if (Math.random() < 0.3) { // 30% chance of edge
                    graph[i][j] = Math.random() * 10;
                }
            }
        }
        
        const startTime = performance.now();
        floydWarshall(graph);
        const endTime = performance.now();
        
        const duration = endTime - startTime;
        console.log(`Graph size ${size}x${size}: ${duration.toFixed(2)} ms`);
    }
}

/**
 * @function main
 * @description Main function to run the Floyd-Warshall demonstration
 * @returns {void}
 */
function main() {
    console.log("Floyd-Warshall Algorithm Implementation");
    console.log("======================================");
    
    // Run basic tests
    testFloydWarshall();
    
    // Run performance test
    performanceTest();
    
    console.log("\nFloyd-Warshall completed successfully!");
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        floydWarshall,
        floydWarshallWithPath,
        detectNegativeCycle,
        transitiveClosure,
        floydWarshallOptimized,
        createSampleGraph,
        printMatrix,
        testFloydWarshall,
        performanceTest,
        main
    };
}

// Run the main function if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    main();
}
