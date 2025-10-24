/**
 * @file kruskal.js
 * @description Implementation of Kruskal's algorithm in JavaScript
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
 * @class UnionFind
 * @description Union-Find data structure for Kruskal's algorithm
 */
class UnionFind {
    constructor(n) {
        this.parent = Array(n).fill().map((_, i) => i);
        this.rank = Array(n).fill(0);
    }
    
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }
    
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        
        if (rootX === rootY) {
            return false; // Already in same set
        }
        
        // Union by rank
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }
        
        return true;
    }
}

/**
 * @function kruskalMST
 * @description Kruskal's algorithm to find Minimum Spanning Tree
 * @param {Array<Edge>} edges - List of edges
 * @param {number} vertices - Number of vertices
 * @returns {Array<Edge>} - Edges in the MST
 */
function kruskalMST(edges, vertices) {
    const mst = [];
    const uf = new UnionFind(vertices);
    
    // Sort edges by weight
    edges.sort((a, b) => a.weight - b.weight);
    
    for (const edge of edges) {
        if (uf.union(edge.from, edge.to)) {
            mst.push(edge);
            if (mst.length === vertices - 1) {
                break; // MST is complete
            }
        }
    }
    
    return mst;
}

/**
 * @function kruskalMSTWithCost
 * @description Kruskal's algorithm that returns MST and total cost
 * @param {Array<Edge>} edges - List of edges
 * @param {number} vertices - Number of vertices
 * @returns {Array<number>} - [0] = total cost, [1] = number of edges in MST
 */
function kruskalMSTWithCost(edges, vertices) {
    const mst = kruskalMST(edges, vertices);
    const totalCost = mst.reduce((sum, edge) => sum + edge.weight, 0);
    return [totalCost, mst.length];
}

/**
 * @function kruskalMSTWithDetails
 * @description Kruskal's algorithm with detailed information
 * @param {Array<Edge>} edges - List of edges
 * @param {number} vertices - Number of vertices
 * @returns {Object} - Detailed results
 */
function kruskalMSTWithDetails(edges, vertices) {
    const mst = [];
    const uf = new UnionFind(vertices);
    const rejectedEdges = [];
    
    edges.sort((a, b) => a.weight - b.weight);
    
    for (const edge of edges) {
        if (uf.union(edge.from, edge.to)) {
            mst.push(edge);
            if (mst.length === vertices - 1) {
                break;
            }
        } else {
            rejectedEdges.push(edge);
        }
    }
    
    const totalCost = mst.reduce((sum, edge) => sum + edge.weight, 0);
    
    return {
        mst,
        totalCost,
        rejectedEdges,
        isConnected: mst.length === vertices - 1
    };
}

/**
 * @function kruskalMSTOptimized
 * @description Optimized Kruskal's algorithm with early termination
 * @param {Array<Edge>} edges - List of edges
 * @param {number} vertices - Number of vertices
 * @returns {Array<Edge>} - Edges in the MST
 */
function kruskalMSTOptimized(edges, vertices) {
    const mst = [];
    const uf = new UnionFind(vertices);
    
    // Use priority queue for better performance
    const pq = [...edges].sort((a, b) => a.weight - b.weight);
    
    while (pq.length > 0 && mst.length < vertices - 1) {
        const edge = pq.shift();
        if (uf.union(edge.from, edge.to)) {
            mst.push(edge);
        }
    }
    
    return mst;
}

/**
 * @function createSampleGraph
 * @description Creates a sample graph for testing
 * @returns {Array<Edge>} - List of edges
 */
function createSampleGraph() {
    const edges = [];
    
    // Sample graph with 6 vertices
    edges.push(new Edge(0, 1, 4));
    edges.push(new Edge(0, 2, 4));
    edges.push(new Edge(1, 2, 2));
    edges.push(new Edge(1, 3, 6));
    edges.push(new Edge(2, 3, 8));
    edges.push(new Edge(2, 4, 9));
    edges.push(new Edge(3, 4, 11));
    edges.push(new Edge(3, 5, 7));
    edges.push(new Edge(4, 5, 10));
    
    return edges;
}

/**
 * @function createRandomGraph
 * @description Creates a random graph for testing
 * @param {number} vertices - Number of vertices
 * @param {number} edges - Number of edges
 * @returns {Array<Edge>} - List of edges
 */
function createRandomGraph(vertices, edges) {
    const edgeList = [];
    const usedEdges = new Set();
    
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
        edgeList.push(new Edge(from, to, weight));
    }
    
    return edgeList;
}

/**
 * @function testKruskal
 * @description Test function to demonstrate Kruskal's algorithm
 * @returns {void}
 */
function testKruskal() {
    console.log("=== Kruskal's Algorithm Test ===");
    
    // Test 1: Basic Kruskal's algorithm
    console.log("Test 1: Basic Kruskal's algorithm");
    const edges = createSampleGraph();
    const vertices = 6;
    
    console.log("Original edges:");
    for (const edge of edges) {
        console.log(edge.toString());
    }
    console.log();
    
    const mst = kruskalMST(edges, vertices);
    console.log("MST edges:");
    for (const edge of mst) {
        console.log(edge.toString());
    }
    
    const totalCost = mst.reduce((sum, edge) => sum + edge.weight, 0);
    console.log("Total cost:", totalCost);
    console.log();
    
    // Test 2: Kruskal's with cost
    console.log("Test 2: Kruskal's with cost");
    const result = kruskalMSTWithCost(edges, vertices);
    console.log("Total cost:", result[0]);
    console.log("Number of edges:", result[1]);
    console.log();
    
    // Test 3: Detailed Kruskal's
    console.log("Test 3: Detailed Kruskal's");
    const details = kruskalMSTWithDetails(edges, vertices);
    console.log("MST edges:", details.mst);
    console.log("Total cost:", details.totalCost);
    console.log("Rejected edges:", details.rejectedEdges);
    console.log("Is connected:", details.isConnected);
    console.log();
    
    // Test 4: Random graph
    console.log("Test 4: Random graph");
    const randomEdges = createRandomGraph(10, 20);
    const randomMst = kruskalMST(randomEdges, 10);
    const randomCost = randomMst.reduce((sum, edge) => sum + edge.weight, 0);
    console.log("Random graph MST cost:", randomCost);
    console.log("Number of edges in MST:", randomMst.length);
    console.log();
}

/**
 * @function performanceTest
 * @description Performance test for Kruskal's algorithm
 * @returns {void}
 */
function performanceTest() {
    console.log("=== Performance Test ===");
    
    const vertices = [100, 500, 1000, 2000, 5000];
    
    for (const v of vertices) {
        const edges = createRandomGraph(v, v * 2);
        
        const startTime = performance.now();
        kruskalMST(edges, v);
        const endTime = performance.now();
        
        const duration = endTime - startTime;
        console.log(`Vertices ${v}, Edges ${edges.length}: ${duration.toFixed(2)} ms`);
    }
}

/**
 * @function main
 * @description Main function to run the Kruskal's algorithm demonstration
 * @returns {void}
 */
function main() {
    console.log("Kruskal's Algorithm Implementation");
    console.log("==================================");
    
    // Run basic tests
    testKruskal();
    
    // Run performance test
    performanceTest();
    
    console.log("\nKruskal's algorithm completed successfully!");
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Edge,
        UnionFind,
        kruskalMST,
        kruskalMSTWithCost,
        kruskalMSTWithDetails,
        kruskalMSTOptimized,
        createSampleGraph,
        createRandomGraph,
        testKruskal,
        performanceTest,
        main
    };
}

// Run the main function if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    main();
}
