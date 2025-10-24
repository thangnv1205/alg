/**
 * @file prim.js
 * @description Implementation of Prim's algorithm in JavaScript
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
    
    toString() {
        return `(${this.from}-${this.to}: ${this.weight.toFixed(2)})`;
    }
}

/**
 * @function primMST
 * @description Prim's algorithm to find Minimum Spanning Tree
 * @param {Array<Array<Edge>>} graph - Adjacency list representation of graph
 * @param {number} start - Starting vertex
 * @returns {Array<Edge>} - Edges in the MST
 */
function primMST(graph, start) {
    const n = graph.length;
    const inMST = new Array(n).fill(false);
    const mst = [];
    const pq = [];
    
    // Add all edges from start vertex to priority queue
    for (const edge of graph[start]) {
        pq.push(edge);
    }
    inMST[start] = true;
    
    // Sort priority queue by weight
    pq.sort((a, b) => a.weight - b.weight);
    
    while (pq.length > 0 && mst.length < n - 1) {
        const edge = pq.shift();
        
        if (inMST[edge.to]) {
            continue; // Skip if already in MST
        }
        
        // Add edge to MST
        mst.push(edge);
        inMST[edge.to] = true;
        
        // Add all edges from new vertex to priority queue
        for (const newEdge of graph[edge.to]) {
            if (!inMST[newEdge.to]) {
                pq.push(newEdge);
            }
        }
        
        // Re-sort priority queue
        pq.sort((a, b) => a.weight - b.weight);
    }
    
    return mst;
}

/**
 * @function primMSTWithCost
 * @description Prim's algorithm that returns MST and total cost
 * @param {Array<Array<Edge>>} graph - Adjacency list representation of graph
 * @param {number} start - Starting vertex
 * @returns {Array<number>} - [0] = total cost, [1] = number of edges in MST
 */
function primMSTWithCost(graph, start) {
    const mst = primMST(graph, start);
    const totalCost = mst.reduce((sum, edge) => sum + edge.weight, 0);
    return [totalCost, mst.length];
}

/**
 * @function primMSTWithDetails
 * @description Prim's algorithm with detailed information
 * @param {Array<Array<Edge>>} graph - Adjacency list representation of graph
 * @param {number} start - Starting vertex
 * @returns {Object} - Detailed results
 */
function primMSTWithDetails(graph, start) {
    const n = graph.length;
    const inMST = new Array(n).fill(false);
    const mst = [];
    const pq = [];
    const consideredEdges = [];
    
    // Add all edges from start vertex to priority queue
    for (const edge of graph[start]) {
        pq.push(edge);
    }
    inMST[start] = true;
    
    // Sort priority queue by weight
    pq.sort((a, b) => a.weight - b.weight);
    
    while (pq.length > 0 && mst.length < n - 1) {
        const edge = pq.shift();
        consideredEdges.push(edge);
        
        if (inMST[edge.to]) {
            continue; // Skip if already in MST
        }
        
        // Add edge to MST
        mst.push(edge);
        inMST[edge.to] = true;
        
        // Add all edges from new vertex to priority queue
        for (const newEdge of graph[edge.to]) {
            if (!inMST[newEdge.to]) {
                pq.push(newEdge);
            }
        }
        
        // Re-sort priority queue
        pq.sort((a, b) => a.weight - b.weight);
    }
    
    const totalCost = mst.reduce((sum, edge) => sum + edge.weight, 0);
    
    return {
        mst,
        totalCost,
        consideredEdges,
        isConnected: mst.length === n - 1
    };
}

/**
 * @function primMSTOptimized
 * @description Optimized Prim's algorithm using indexed priority queue
 * @param {Array<Array<Edge>>} graph - Adjacency list representation of graph
 * @param {number} start - Starting vertex
 * @returns {Array<Edge>} - Edges in the MST
 */
function primMSTOptimized(graph, start) {
    const n = graph.length;
    const inMST = new Array(n).fill(false);
    const key = new Array(n).fill(Infinity);
    const parent = new Array(n).fill(-1);
    const mst = [];
    
    key[start] = 0;
    
    for (let count = 0; count < n - 1; count++) {
        // Find vertex with minimum key value
        let u = -1;
        for (let v = 0; v < n; v++) {
            if (!inMST[v] && (u === -1 || key[v] < key[u])) {
                u = v;
            }
        }
        
        inMST[u] = true;
        
        if (parent[u] !== -1) {
            mst.push(new Edge(parent[u], u, key[u]));
        }
        
        for (const edge of graph[u]) {
            const v = edge.to;
            const weight = edge.weight;
            
            if (!inMST[v] && weight < key[v]) {
                key[v] = weight;
                parent[v] = u;
            }
        }
    }
    
    return mst;
}

/**
 * @function createSampleGraph
 * @description Creates a sample graph for testing
 * @returns {Array<Array<Edge>>} - Adjacency list representation
 */
function createSampleGraph() {
    const graph = [];
    
    // Create graph with 6 vertices
    for (let i = 0; i < 6; i++) {
        graph.push([]);
    }
    
    // Add edges
    addEdge(graph, 0, 1, 4);
    addEdge(graph, 0, 2, 4);
    addEdge(graph, 1, 2, 2);
    addEdge(graph, 1, 3, 6);
    addEdge(graph, 2, 3, 8);
    addEdge(graph, 2, 4, 9);
    addEdge(graph, 3, 4, 11);
    addEdge(graph, 3, 5, 7);
    addEdge(graph, 4, 5, 10);
    
    return graph;
}

/**
 * @function addEdge
 * @description Adds an undirected edge to the graph
 * @param {Array<Array<Edge>>} graph - Adjacency list representation
 * @param {number} from - First vertex
 * @param {number} to - Second vertex
 * @param {number} weight - Edge weight
 * @returns {void}
 */
function addEdge(graph, from, to, weight) {
    graph[from].push(new Edge(from, to, weight));
    graph[to].push(new Edge(to, from, weight));
}

/**
 * @function createRandomGraph
 * @description Creates a random graph for testing
 * @param {number} vertices - Number of vertices
 * @param {number} edges - Number of edges
 * @returns {Array<Array<Edge>>} - Adjacency list representation
 */
function createRandomGraph(vertices, edges) {
    const graph = [];
    const usedEdges = new Set();
    
    for (let i = 0; i < vertices; i++) {
        graph.push([]);
    }
    
    for (let i = 0; i < edges; i++) {
        let from, to;
        let edgeKey;
        
        do {
            from = Math.floor(Math.random() * vertices);
            to = Math.floor(Math.random() * vertices);
            edgeKey = `${Math.min(from, to)}-${Math.max(from, to)}`;
        } while (from === to || usedEdges.has(edgeKey));
        
        usedEdges.add(edgeKey);
        const weight = Math.random() * 10;
        addEdge(graph, from, to, weight);
    }
    
    return graph;
}

/**
 * @function testPrim
 * @description Test function to demonstrate Prim's algorithm
 * @returns {void}
 */
function testPrim() {
    console.log("=== Prim's Algorithm Test ===");
    
    // Test 1: Basic Prim's algorithm
    console.log("Test 1: Basic Prim's algorithm");
    const graph = createSampleGraph();
    const start = 0;
    
    console.log("Graph adjacency list:");
    for (let i = 0; i < graph.length; i++) {
        let row = `Vertex ${i}: `;
        for (const edge of graph[i]) {
            row += edge.toString() + " ";
        }
        console.log(row);
    }
    console.log();
    
    const mst = primMST(graph, start);
    console.log("MST edges:");
    for (const edge of mst) {
        console.log(edge.toString());
    }
    
    const totalCost = mst.reduce((sum, edge) => sum + edge.weight, 0);
    console.log("Total cost:", totalCost);
    console.log();
    
    // Test 2: Prim's with cost
    console.log("Test 2: Prim's with cost");
    const result = primMSTWithCost(graph, start);
    console.log("Total cost:", result[0]);
    console.log("Number of edges:", result[1]);
    console.log();
    
    // Test 3: Detailed Prim's
    console.log("Test 3: Detailed Prim's");
    const details = primMSTWithDetails(graph, start);
    console.log("MST edges:", details.mst);
    console.log("Total cost:", details.totalCost);
    console.log("Considered edges:", details.consideredEdges);
    console.log("Is connected:", details.isConnected);
    console.log();
    
    // Test 4: Optimized Prim's
    console.log("Test 4: Optimized Prim's");
    const optimizedMst = primMSTOptimized(graph, start);
    const optimizedCost = optimizedMst.reduce((sum, edge) => sum + edge.weight, 0);
    console.log("Optimized MST cost:", optimizedCost);
    console.log("Number of edges:", optimizedMst.length);
    console.log();
    
    // Test 5: Random graph
    console.log("Test 5: Random graph");
    const randomGraph = createRandomGraph(10, 20);
    const randomMst = primMST(randomGraph, 0);
    const randomCost = randomMst.reduce((sum, edge) => sum + edge.weight, 0);
    console.log("Random graph MST cost:", randomCost);
    console.log("Number of edges in MST:", randomMst.length);
    console.log();
}

/**
 * @function performanceTest
 * @description Performance test for Prim's algorithm
 * @returns {void}
 */
function performanceTest() {
    console.log("=== Performance Test ===");
    
    const vertices = [100, 500, 1000, 2000, 5000];
    
    for (const v of vertices) {
        const graph = createRandomGraph(v, v * 2);
        
        const startTime = performance.now();
        primMST(graph, 0);
        const endTime = performance.now();
        
        const duration = endTime - startTime;
        console.log(`Vertices ${v}, Edges ${v * 2}: ${duration.toFixed(2)} ms`);
    }
}

/**
 * @function main
 * @description Main function to run the Prim's algorithm demonstration
 * @returns {void}
 */
function main() {
    console.log("Prim's Algorithm Implementation");
    console.log("===============================");
    
    // Run basic tests
    testPrim();
    
    // Run performance test
    performanceTest();
    
    console.log("\nPrim's algorithm completed successfully!");
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Edge,
        primMST,
        primMSTWithCost,
        primMSTWithDetails,
        primMSTOptimized,
        createSampleGraph,
        addEdge,
        createRandomGraph,
        testPrim,
        performanceTest,
        main
    };
}

// Run the main function if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    main();
}
