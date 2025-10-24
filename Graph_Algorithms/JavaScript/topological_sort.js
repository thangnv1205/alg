/**
 * @file topological_sort.js
 * @description Implementation of Topological Sort algorithm in JavaScript
 * @author Algorithm Collection
 * @version 1.0
 */

/**
 * @function topologicalSortDFS
 * @description Topological sort using DFS
 * @param {Array<Array<number>>} graph - Adjacency list representation of graph
 * @returns {Array<number>} - Topological order, empty if cycle exists
 */
function topologicalSortDFS(graph) {
    const n = graph.length;
    const visited = new Array(n).fill(false);
    const recStack = new Array(n).fill(false);
    const result = [];
    
    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            if (dfsTopological(graph, i, visited, recStack, result)) {
                return []; // Cycle detected
            }
        }
    }
    
    return result.reverse();
}

/**
 * @function dfsTopological
 * @description DFS helper for topological sort
 * @param {Array<Array<number>>} graph - Adjacency list representation
 * @param {number} vertex - Current vertex
 * @param {Array<boolean>} visited - Visited array
 * @param {Array<boolean>} recStack - Recursion stack array
 * @param {Array<number>} result - Result list
 * @returns {boolean} - True if cycle detected
 */
function dfsTopological(graph, vertex, visited, recStack, result) {
    visited[vertex] = true;
    recStack[vertex] = true;
    
    for (const neighbor of graph[vertex]) {
        if (!visited[neighbor]) {
            if (dfsTopological(graph, neighbor, visited, recStack, result)) {
                return true; // Cycle detected
            }
        } else if (recStack[neighbor]) {
            return true; // Cycle detected
        }
    }
    
    recStack[vertex] = false;
    result.push(vertex);
    return false;
}

/**
 * @function topologicalSortKahn
 * @description Topological sort using Kahn's algorithm (BFS)
 * @param {Array<Array<number>>} graph - Adjacency list representation of graph
 * @returns {Array<number>} - Topological order, empty if cycle exists
 */
function topologicalSortKahn(graph) {
    const n = graph.length;
    const inDegree = new Array(n).fill(0);
    const result = [];
    const queue = [];
    
    // Calculate in-degrees
    for (let i = 0; i < n; i++) {
        for (const neighbor of graph[i]) {
            inDegree[neighbor]++;
        }
    }
    
    // Add vertices with in-degree 0 to queue
    for (let i = 0; i < n; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }
    
    // Process vertices
    while (queue.length > 0) {
        const vertex = queue.shift();
        result.push(vertex);
        
        for (const neighbor of graph[vertex]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }
    
    // Check if all vertices were processed
    if (result.length !== n) {
        return []; // Cycle detected
    }
    
    return result;
}

/**
 * @function topologicalSortWithCycleDetection
 * @description Topological sort with cycle detection
 * @param {Array<Array<number>>} graph - Adjacency list representation of graph
 * @returns {Object} - Results including cycle information
 */
function topologicalSortWithCycleDetection(graph) {
    const topologicalOrder = topologicalSortKahn(graph);
    
    return {
        topologicalOrder,
        hasCycle: topologicalOrder.length === 0,
        isValid: topologicalOrder.length > 0
    };
}

/**
 * @function topologicalSortMultiple
 * @description Finds all possible topological orderings
 * @param {Array<Array<number>>} graph - Adjacency list representation of graph
 * @returns {Array<Array<number>>} - List of all possible topological orderings
 */
function topologicalSortMultiple(graph) {
    const n = graph.length;
    const inDegree = new Array(n).fill(0);
    const allOrderings = [];
    
    // Calculate in-degrees
    for (let i = 0; i < n; i++) {
        for (const neighbor of graph[i]) {
            inDegree[neighbor]++;
        }
    }
    
    findAllTopologicalOrderings(graph, inDegree, [], allOrderings);
    return allOrderings;
}

/**
 * @function findAllTopologicalOrderings
 * @description Recursive function to find all topological orderings
 * @param {Array<Array<number>>} graph - Adjacency list representation
 * @param {Array<number>} inDegree - In-degree array
 * @param {Array<number>} current - Current ordering
 * @param {Array<Array<number>>} allOrderings - All orderings found
 * @returns {void}
 */
function findAllTopologicalOrderings(graph, inDegree, current, allOrderings) {
    let found = false;
    
    for (let i = 0; i < graph.length; i++) {
        if (inDegree[i] === 0 && !current.includes(i)) {
            // Add vertex to current ordering
            current.push(i);
            
            // Update in-degrees
            for (const neighbor of graph[i]) {
                inDegree[neighbor]--;
            }
            
            // Recursive call
            findAllTopologicalOrderings(graph, inDegree, current, allOrderings);
            
            // Backtrack
            current.pop();
            for (const neighbor of graph[i]) {
                inDegree[neighbor]++;
            }
            
            found = true;
        }
    }
    
    if (!found) {
        allOrderings.push([...current]);
    }
}

/**
 * @function longestPathInDAG
 * @description Finds longest path in Directed Acyclic Graph
 * @param {Array<Array<number>>} graph - Adjacency list representation of graph
 * @param {Array<Array<number>>} weights - Weight matrix
 * @returns {number} - Length of longest path
 */
function longestPathInDAG(graph, weights) {
    const topologicalOrder = topologicalSortKahn(graph);
    if (topologicalOrder.length === 0) {
        return -Infinity; // Cycle exists
    }
    
    const n = graph.length;
    const dist = new Array(n).fill(-Infinity);
    dist[topologicalOrder[0]] = 0;
    
    for (const u of topologicalOrder) {
        for (const v of graph[u]) {
            if (dist[u] !== -Infinity) {
                dist[v] = Math.max(dist[v], dist[u] + weights[u][v]);
            }
        }
    }
    
    return Math.max(...dist);
}

/**
 * @function createSampleGraph
 * @description Creates a sample DAG for testing
 * @returns {Array<Array<number>>} - Adjacency list representation
 */
function createSampleGraph() {
    const graph = [];
    
    // Create graph with 6 vertices
    for (let i = 0; i < 6; i++) {
        graph.push([]);
    }
    
    // Add directed edges to create DAG
    graph[0].push(1);
    graph[0].push(2);
    graph[1].push(3);
    graph[2].push(3);
    graph[2].push(4);
    graph[3].push(5);
    graph[4].push(5);
    
    return graph;
}

/**
 * @function createGraphWithCycle
 * @description Creates a graph with cycle for testing
 * @returns {Array<Array<number>>} - Adjacency list representation
 */
function createGraphWithCycle() {
    const graph = [];
    
    // Create graph with 4 vertices
    for (let i = 0; i < 4; i++) {
        graph.push([]);
    }
    
    // Add edges to create cycle: 0 -> 1 -> 2 -> 0
    graph[0].push(1);
    graph[1].push(2);
    graph[2].push(0);
    graph[2].push(3);
    
    return graph;
}

/**
 * @function testTopologicalSort
 * @description Test function to demonstrate topological sort
 * @returns {void}
 */
function testTopologicalSort() {
    console.log("=== Topological Sort Test ===");
    
    // Test 1: Basic topological sort (DFS)
    console.log("Test 1: Basic topological sort (DFS)");
    const graph = createSampleGraph();
    console.log("Graph: 0->1,3; 0->2,4; 1->3; 2->3,4; 3->5; 4->5");
    
    const result1 = topologicalSortDFS(graph);
    console.log("Topological order (DFS):", result1);
    console.log();
    
    // Test 2: Topological sort (Kahn's algorithm)
    console.log("Test 2: Topological sort (Kahn's algorithm)");
    const result2 = topologicalSortKahn(graph);
    console.log("Topological order (Kahn):", result2);
    console.log();
    
    // Test 3: Graph with cycle
    console.log("Test 3: Graph with cycle");
    const cycleGraph = createGraphWithCycle();
    console.log("Graph with cycle: 0->1->2->0, 2->3");
    
    const result3 = topologicalSortKahn(cycleGraph);
    console.log("Topological order:", result3);
    console.log();
    
    // Test 4: Cycle detection
    console.log("Test 4: Cycle detection");
    const cycleResult = topologicalSortWithCycleDetection(cycleGraph);
    console.log("Has cycle:", cycleResult.hasCycle);
    console.log("Is valid:", cycleResult.isValid);
    console.log();
    
    // Test 5: Multiple topological orderings
    console.log("Test 5: Multiple topological orderings");
    const allOrderings = topologicalSortMultiple(graph);
    console.log("All possible orderings:");
    for (let i = 0; i < allOrderings.length; i++) {
        console.log(`Ordering ${i + 1}:`, allOrderings[i]);
    }
    console.log();
    
    // Test 6: Longest path in DAG
    console.log("Test 6: Longest path in DAG");
    const weights = [
        [0, 1, 2, 0, 0, 0],
        [0, 0, 0, 3, 0, 0],
        [0, 0, 0, 1, 4, 0],
        [0, 0, 0, 0, 0, 2],
        [0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0]
    ];
    const longestPath = longestPathInDAG(graph, weights);
    console.log("Longest path length:", longestPath);
    console.log();
}

/**
 * @function performanceTest
 * @description Performance test for topological sort
 * @returns {void}
 */
function performanceTest() {
    console.log("=== Performance Test ===");
    
    const sizes = [100, 500, 1000, 2000, 5000];
    
    for (const size of sizes) {
        const graph = [];
        
        for (let i = 0; i < size; i++) {
            graph.push([]);
        }
        
        // Add random edges
        for (let i = 0; i < size * 2; i++) {
            const from = Math.floor(Math.random() * size);
            const to = Math.floor(Math.random() * size);
            if (from !== to) {
                graph[from].push(to);
            }
        }
        
        const startTime = performance.now();
        topologicalSortKahn(graph);
        const endTime = performance.now();
        
        const duration = endTime - startTime;
        console.log(`Graph size ${size}: ${duration.toFixed(2)} ms`);
    }
}

/**
 * @function main
 * @description Main function to run the topological sort demonstration
 * @returns {void}
 */
function main() {
    console.log("Topological Sort Algorithm Implementation");
    console.log("=========================================");
    
    // Run basic tests
    testTopologicalSort();
    
    // Run performance test
    performanceTest();
    
    console.log("\nTopological Sort completed successfully!");
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        topologicalSortDFS,
        topologicalSortKahn,
        topologicalSortWithCycleDetection,
        topologicalSortMultiple,
        longestPathInDAG,
        createSampleGraph,
        createGraphWithCycle,
        testTopologicalSort,
        performanceTest,
        main
    };
}

// Run the main function if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    main();
}
