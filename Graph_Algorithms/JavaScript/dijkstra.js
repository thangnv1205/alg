/**
 * @file dijkstra.js
 * @description Implementation of Dijkstra's algorithm in JavaScript
 * @author Algorithm Collection
 * @version 1.0
 */

/**
 * @class Edge
 * @description Represents an edge in the graph
 */
class Edge {
    constructor(destination, weight) {
        this.destination = destination;
        this.weight = weight;
    }
}

/**
 * @class Node
 * @description Represents a node with distance for priority queue
 */
class Node {
    constructor(vertex, distance) {
        this.vertex = vertex;
        this.distance = distance;
    }
}

/**
 * @function dijkstra
 * @description Finds shortest paths from source to all vertices using Dijkstra's algorithm
 * @param {Array<Array<Edge>>} graph - Adjacency list representation of graph
 * @param {number} source - Source vertex
 * @returns {number[]} - Array of shortest distances from source to each vertex
 */
const dijkstra = (graph, source) => {
    const n = graph.length;
    const distances = new Array(n).fill(Infinity);
    const visited = new Array(n).fill(false);
    
    distances[source] = 0;
    
    // Priority queue for vertices to visit
    const pq = [new Node(source, 0)];
    
    while (pq.length > 0) {
        // Extract minimum distance vertex
        pq.sort((a, b) => a.distance - b.distance);
        const current = pq.shift();
        const u = current.vertex;
        
        if (visited[u]) {
            continue;
        }
        
        visited[u] = true;
        
        // Check all neighbors of current vertex
        for (const edge of graph[u]) {
            const v = edge.destination;
            const weight = edge.weight;
            
            if (!visited[v] && distances[u] + weight < distances[v]) {
                distances[v] = distances[u] + weight;
                pq.push(new Node(v, distances[v]));
            }
        }
    }
    
    return distances;
};

/**
 * @function dijkstraWithPath
 * @description Finds shortest paths and returns path information
 * @param {Array<Array<Edge>>} graph - Adjacency list representation of graph
 * @param {number} source - Source vertex
 * @returns {Object} - Object containing distances and parent arrays
 */
const dijkstraWithPath = (graph, source) => {
    const n = graph.length;
    const distances = new Array(n).fill(Infinity);
    const parent = new Array(n).fill(-1);
    const visited = new Array(n).fill(false);
    
    distances[source] = 0;
    
    const pq = [new Node(source, 0)];
    
    while (pq.length > 0) {
        pq.sort((a, b) => a.distance - b.distance);
        const current = pq.shift();
        const u = current.vertex;
        
        if (visited[u]) {
            continue;
        }
        
        visited[u] = true;
        
        for (const edge of graph[u]) {
            const v = edge.destination;
            const weight = edge.weight;
            
            if (!visited[v] && distances[u] + weight < distances[v]) {
                distances[v] = distances[u] + weight;
                parent[v] = u;
                pq.push(new Node(v, distances[v]));
            }
        }
    }
    
    return { distances, parent };
};

/**
 * @function getPath
 * @description Reconstructs path from source to destination
 * @param {number[]} parent - Parent array from dijkstra
 * @param {number} source - Source vertex
 * @param {number} destination - Destination vertex
 * @returns {number[]} - Path from source to destination
 */
const getPath = (parent, source, destination) => {
    const path = [];
    
    if (parent[destination] === -1 && destination !== source) {
        return path; // No path exists
    }
    
    let current = destination;
    while (current !== -1) {
        path.push(current);
        current = parent[current];
    }
    
    return path.reverse();
};

/**
 * @function createGraph
 * @description Creates a sample graph for testing
 * @param {number} n - Number of vertices
 * @returns {Array<Array<Edge>>} - Adjacency list representation
 */
const createGraph = (n) => {
    const graph = [];
    for (let i = 0; i < n; i++) {
        graph.push([]);
    }
    return graph;
};

/**
 * @function addEdge
 * @description Adds an edge to the graph
 * @param {Array<Array<Edge>>} graph - Graph to add edge to
 * @param {number} from - Source vertex
 * @param {number} to - Destination vertex
 * @param {number} weight - Edge weight
 * @returns {void}
 */
const addEdge = (graph, from, to, weight) => {
    graph[from].push(new Edge(to, weight));
    graph[to].push(new Edge(from, weight)); // For undirected graph
};

/**
 * @function printDistances
 * @description Prints shortest distances from source
 * @param {number[]} distances - Array of distances
 * @param {number} source - Source vertex
 * @returns {void}
 */
const printDistances = (distances, source) => {
    console.log(`Shortest distances from vertex ${source}:`);
    for (let i = 0; i < distances.length; i++) {
        if (distances[i] === Infinity) {
            console.log(`Vertex ${i}: INF`);
        } else {
            console.log(`Vertex ${i}: ${distances[i]}`);
        }
    }
};

/**
 * @function testDijkstra
 * @description Test function to demonstrate Dijkstra's algorithm
 * @returns {void}
 */
const testDijkstra = () => {
    console.log('=== Dijkstra\'s Algorithm Test ===');
    
    // Create a sample graph
    const n = 6;
    const graph = createGraph(n);
    
    // Add edges
    addEdge(graph, 0, 1, 4);
    addEdge(graph, 0, 2, 2);
    addEdge(graph, 1, 2, 1);
    addEdge(graph, 1, 3, 5);
    addEdge(graph, 2, 3, 8);
    addEdge(graph, 2, 4, 10);
    addEdge(graph, 3, 4, 2);
    addEdge(graph, 3, 5, 6);
    addEdge(graph, 4, 5, 3);
    
    const source = 0;
    console.log(`Graph with ${n} vertices`);
    console.log(`Source vertex: ${source}`);
    console.log();
    
    // Find shortest distances
    const distances = dijkstra(graph, source);
    printDistances(distances, source);
    console.log();
    
    // Find shortest paths
    const result = dijkstraWithPath(graph, source);
    const parent = result.parent;
    
    console.log('Shortest paths:');
    for (let i = 1; i < n; i++) {
        const path = getPath(parent, source, i);
        if (path.length === 0) {
            console.log(`No path from ${source} to ${i}`);
        } else {
            console.log(`Path from ${source} to ${i}: [${path.join(', ')}] (distance: ${distances[i]})`);
        }
    }
    console.log();
};

/**
 * @function performanceTest
 * @description Performance test for Dijkstra's algorithm
 * @returns {void}
 */
const performanceTest = () => {
    console.log('=== Performance Test ===');
    
    const sizes = [100, 500, 1000, 2000];
    
    sizes.forEach(size => {
        const graph = createGraph(size);
        
        // Add random edges
        const edgeCount = Math.floor(size * (size - 1) / 4); // Sparse graph
        
        for (let i = 0; i < edgeCount; i++) {
            const from = Math.floor(Math.random() * size);
            const to = Math.floor(Math.random() * size);
            const weight = Math.floor(Math.random() * 100) + 1;
            
            if (from !== to) {
                addEdge(graph, from, to, weight);
            }
        }
        
        const startTime = performance.now();
        dijkstra(graph, 0);
        const endTime = performance.now();
        
        const duration = endTime - startTime;
        console.log(`Graph size ${size}: ${duration.toFixed(2)} ms`);
    });
};

/**
 * @function generateRandomGraph
 * @description Generates a random graph for testing
 * @param {number} n - Number of vertices
 * @param {number} edgeProbability - Probability of edge existence
 * @returns {Array<Array<Edge>>} - Random graph
 */
const generateRandomGraph = (n, edgeProbability = 0.3) => {
    const graph = createGraph(n);
    
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (Math.random() < edgeProbability) {
                const weight = Math.floor(Math.random() * 100) + 1;
                addEdge(graph, i, j, weight);
            }
        }
    }
    
    return graph;
};

/**
 * @function benchmarkComparison
 * @description Compares performance with different graph densities
 * @returns {void}
 */
const benchmarkComparison = () => {
    console.log('=== Benchmark Comparison ===');
    
    const n = 500;
    const densities = [0.1, 0.2, 0.3, 0.4, 0.5];
    
    densities.forEach(density => {
        const graph = generateRandomGraph(n, density);
        
        const startTime = performance.now();
        dijkstra(graph, 0);
        const endTime = performance.now();
        
        const duration = endTime - startTime;
        const edgeCount = graph.reduce((sum, edges) => sum + edges.length, 0) / 2;
        
        console.log(`Density ${density}: ${duration.toFixed(2)} ms (${edgeCount} edges)`);
    });
};

// Main execution
if (require.main === module) {
    console.log('Dijkstra\'s Algorithm Implementation');
    console.log('==================================');
    
    // Run basic tests
    testDijkstra();
    
    // Run performance test
    performanceTest();
    
    // Run benchmark comparison
    benchmarkComparison();
    
    console.log('\nDijkstra\'s algorithm completed successfully!');
}

// Export functions for use in other modules
module.exports = {
    Edge,
    Node,
    dijkstra,
    dijkstraWithPath,
    getPath,
    createGraph,
    addEdge,
    printDistances,
    testDijkstra,
    performanceTest,
    generateRandomGraph,
    benchmarkComparison
};
