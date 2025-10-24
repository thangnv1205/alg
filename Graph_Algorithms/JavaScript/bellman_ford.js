/**
 * @file bellman_ford.js
 * @description Implementation of Bellman-Ford algorithm in JavaScript
 * @author Algorithm Collection
 * @version 1.0
 */

/**
 * @class Edge
 * @description Represents an edge in the graph
 */
class Edge {
    constructor(from, to, weight) {
        this.from = from;
        this.to = to;
        this.weight = weight;
    }
}

/**
 * @function bellmanFord
 * @description Bellman-Ford algorithm to find shortest paths
 * @param {Array<Edge>} edges - List of edges
 * @param {number} vertices - Number of vertices
 * @param {number} source - Source vertex
 * @returns {Array<number>|null} - Array of shortest distances, null if negative cycle exists
 */
function bellmanFord(edges, vertices, source) {
    const distances = new Array(vertices).fill(Infinity);
    const predecessors = new Array(vertices).fill(-1);
    
    distances[source] = 0;
    
    // Relax edges V-1 times
    for (let i = 0; i < vertices - 1; i++) {
        for (const edge of edges) {
            if (distances[edge.from] !== Infinity && 
                distances[edge.from] + edge.weight < distances[edge.to]) {
                distances[edge.to] = distances[edge.from] + edge.weight;
                predecessors[edge.to] = edge.from;
            }
        }
    }
    
    // Check for negative cycles
    for (const edge of edges) {
        if (distances[edge.from] !== Infinity && 
            distances[edge.from] + edge.weight < distances[edge.to]) {
            return null; // Negative cycle detected
        }
    }
    
    return distances;
}

/**
 * @function bellmanFordWithPath
 * @description Bellman-Ford algorithm that also returns paths
 * @param {Array<Edge>} edges - List of edges
 * @param {number} vertices - Number of vertices
 * @param {number} source - Source vertex
 * @returns {Map<number, Array<number>>|null} - Map of vertex to path, null if negative cycle
 */
function bellmanFordWithPath(edges, vertices, source) {
    const distances = new Array(vertices).fill(Infinity);
    const predecessors = new Array(vertices).fill(-1);
    
    distances[source] = 0;
    
    // Relax edges V-1 times
    for (let i = 0; i < vertices - 1; i++) {
        for (const edge of edges) {
            if (distances[edge.from] !== Infinity && 
                distances[edge.from] + edge.weight < distances[edge.to]) {
                distances[edge.to] = distances[edge.from] + edge.weight;
                predecessors[edge.to] = edge.from;
            }
        }
    }
    
    // Check for negative cycles
    for (const edge of edges) {
        if (distances[edge.from] !== Infinity && 
            distances[edge.from] + edge.weight < distances[edge.to]) {
            return null; // Negative cycle detected
        }
    }
    
    // Reconstruct paths
    const paths = new Map();
    for (let i = 0; i < vertices; i++) {
        if (distances[i] !== Infinity) {
            paths.set(i, reconstructPath(predecessors, source, i));
        }
    }
    
    return paths;
}

/**
 * @function reconstructPath
 * @description Reconstructs path from predecessors array
 * @param {Array<number>} predecessors - Predecessors array
 * @param {number} source - Source vertex
 * @param {number} target - Target vertex
 * @returns {Array<number>} - Path from source to target
 */
function reconstructPath(predecessors, source, target) {
    const path = [];
    let current = target;
    
    while (current !== -1) {
        path.push(current);
        current = predecessors[current];
    }
    
    return path.reverse();
}

/**
 * @function detectNegativeCycle
 * @description Detects if graph has negative cycle
 * @param {Array<Edge>} edges - List of edges
 * @param {number} vertices - Number of vertices
 * @returns {boolean} - True if negative cycle exists
 */
function detectNegativeCycle(edges, vertices) {
    const distances = new Array(vertices).fill(0); // Start with all distances as 0
    
    // Relax edges V times
    for (let i = 0; i < vertices; i++) {
        for (const edge of edges) {
            if (distances[edge.from] + edge.weight < distances[edge.to]) {
                distances[edge.to] = distances[edge.from] + edge.weight;
                if (i === vertices - 1) {
                    return true; // Negative cycle detected
                }
            }
        }
    }
    
    return false;
}

/**
 * @function bellmanFordOptimized
 * @description Optimized Bellman-Ford with early termination
 * @param {Array<Edge>} edges - List of edges
 * @param {number} vertices - Number of vertices
 * @param {number} source - Source vertex
 * @returns {Array<number>|null} - Array of shortest distances, null if negative cycle
 */
function bellmanFordOptimized(edges, vertices, source) {
    const distances = new Array(vertices).fill(Infinity);
    distances[source] = 0;
    
    let relaxed = true;
    for (let i = 0; i < vertices - 1 && relaxed; i++) {
        relaxed = false;
        for (const edge of edges) {
            if (distances[edge.from] !== Infinity && 
                distances[edge.from] + edge.weight < distances[edge.to]) {
                distances[edge.to] = distances[edge.from] + edge.weight;
                relaxed = true;
            }
        }
    }
    
    // Check for negative cycles
    for (const edge of edges) {
        if (distances[edge.from] !== Infinity && 
            distances[edge.from] + edge.weight < distances[edge.to]) {
            return null; // Negative cycle detected
        }
    }
    
    return distances;
}

/**
 * @function createSampleGraph
 * @description Creates a sample graph for testing
 * @returns {Array<Edge>} - List of edges
 */
function createSampleGraph() {
    const edges = [];
    
    // Sample graph with 5 vertices
    edges.push(new Edge(0, 1, 4));
    edges.push(new Edge(0, 2, 2));
    edges.push(new Edge(1, 2, 1));
    edges.push(new Edge(1, 3, 2));
    edges.push(new Edge(2, 3, 4));
    edges.push(new Edge(2, 4, 3));
    edges.push(new Edge(3, 4, 1));
    
    return edges;
}

/**
 * @function createGraphWithNegativeCycle
 * @description Creates a graph with negative cycle for testing
 * @returns {Array<Edge>} - List of edges
 */
function createGraphWithNegativeCycle() {
    const edges = [];
    
    // Graph with negative cycle: 0 -> 1 -> 2 -> 0
    edges.push(new Edge(0, 1, 1));
    edges.push(new Edge(1, 2, -3));
    edges.push(new Edge(2, 0, 1));
    
    return edges;
}

/**
 * @function testBellmanFord
 * @description Test function to demonstrate Bellman-Ford algorithm
 * @returns {void}
 */
function testBellmanFord() {
    console.log("=== Bellman-Ford Test ===");
    
    // Test 1: Normal graph
    console.log("Test 1: Normal graph");
    const edges1 = createSampleGraph();
    const vertices1 = 5;
    const source1 = 0;
    
    const distances1 = bellmanFord(edges1, vertices1, source1);
    if (distances1 !== null) {
        console.log(`Shortest distances from vertex ${source1}:`);
        for (let i = 0; i < distances1.length; i++) {
            if (distances1[i] === Infinity) {
                console.log(`Vertex ${i}: Infinity`);
            } else {
                console.log(`Vertex ${i}: ${distances1[i]}`);
            }
        }
    } else {
        console.log("Negative cycle detected!");
    }
    console.log();
    
    // Test 2: Graph with negative cycle
    console.log("Test 2: Graph with negative cycle");
    const edges2 = createGraphWithNegativeCycle();
    const vertices2 = 3;
    const source2 = 0;
    
    const distances2 = bellmanFord(edges2, vertices2, source2);
    if (distances2 !== null) {
        console.log(`Shortest distances from vertex ${source2}:`);
        for (let i = 0; i < distances2.length; i++) {
            if (distances2[i] === Infinity) {
                console.log(`Vertex ${i}: Infinity`);
            } else {
                console.log(`Vertex ${i}: ${distances2[i]}`);
            }
        }
    } else {
        console.log("Negative cycle detected!");
    }
    console.log();
    
    // Test 3: Path reconstruction
    console.log("Test 3: Path reconstruction");
    const paths = bellmanFordWithPath(edges1, vertices1, source1);
    if (paths !== null) {
        for (let i = 0; i < vertices1; i++) {
            if (paths.has(i)) {
                console.log(`Path to vertex ${i}:`, paths.get(i));
            }
        }
    }
    console.log();
    
    // Test 4: Negative cycle detection
    console.log("Test 4: Negative cycle detection");
    const hasNegativeCycle = detectNegativeCycle(edges2, vertices2);
    console.log("Graph has negative cycle:", hasNegativeCycle);
    console.log();
}

/**
 * @function performanceTest
 * @description Performance test for Bellman-Ford algorithm
 * @returns {void}
 */
function performanceTest() {
    console.log("=== Performance Test ===");
    
    const vertices = [10, 20, 50, 100, 200];
    
    for (const v of vertices) {
        const edges = [];
        
        // Create random edges
        for (let i = 0; i < v * 2; i++) {
            const from = Math.floor(Math.random() * v);
            const to = Math.floor(Math.random() * v);
            const weight = Math.random() * 10 - 5; // Random weight between -5 and 5
            edges.push(new Edge(from, to, weight));
        }
        
        const startTime = performance.now();
        bellmanFord(edges, v, 0);
        const endTime = performance.now();
        
        const duration = endTime - startTime;
        console.log(`Vertices ${v}, Edges ${edges.length}: ${duration.toFixed(2)} ms`);
    }
}

/**
 * @function main
 * @description Main function to run the Bellman-Ford demonstration
 * @returns {void}
 */
function main() {
    console.log("Bellman-Ford Algorithm Implementation");
    console.log("====================================");
    
    // Run basic tests
    testBellmanFord();
    
    // Run performance test
    performanceTest();
    
    console.log("\nBellman-Ford completed successfully!");
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Edge,
        bellmanFord,
        bellmanFordWithPath,
        detectNegativeCycle,
        bellmanFordOptimized,
        createSampleGraph,
        createGraphWithNegativeCycle,
        testBellmanFord,
        performanceTest,
        main
    };
}

// Run the main function if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    main();
}
