/**
 * @file dfs.js
 * @description Implementation of Depth-First Search algorithm in JavaScript
 * @author Algorithm Collection
 * @version 1.0
 */

/**
 * @function dfsRecursive
 * @description Recursive implementation of DFS
 * @param {Array<Array<number>>} graph - Adjacency list representation of graph
 * @param {number} start - Starting vertex
 * @param {Array<boolean>} visited - Array to track visited vertices
 * @returns {void}
 */
function dfsRecursive(graph, start, visited) {
    visited[start] = true;
    console.log(start + " ");
    
    for (const neighbor of graph[start]) {
        if (!visited[neighbor]) {
            dfsRecursive(graph, neighbor, visited);
        }
    }
}

/**
 * @function dfsIterative
 * @description Iterative implementation of DFS using stack
 * @param {Array<Array<number>>} graph - Adjacency list representation of graph
 * @param {number} start - Starting vertex
 * @returns {void}
 */
function dfsIterative(graph, start) {
    const visited = new Array(graph.length).fill(false);
    const stack = [start];
    
    while (stack.length > 0) {
        const current = stack.pop();
        
        if (!visited[current]) {
            visited[current] = true;
            console.log(current + " ");
            
            for (const neighbor of graph[current]) {
                if (!visited[neighbor]) {
                    stack.push(neighbor);
                }
            }
        }
    }
}

/**
 * @function dfsWithPath
 * @description DFS that finds path from start to target
 * @param {Array<Array<number>>} graph - Adjacency list representation of graph
 * @param {number} start - Starting vertex
 * @param {number} target - Target vertex
 * @returns {Array<number>} - Path from start to target, empty if no path
 */
function dfsWithPath(graph, start, target) {
    const visited = new Array(graph.length).fill(false);
    const parent = new Array(graph.length).fill(-1);
    const stack = [start];
    
    while (stack.length > 0) {
        const current = stack.pop();
        
        if (current === target) {
            return reconstructPath(parent, start, target);
        }
        
        if (!visited[current]) {
            visited[current] = true;
            
            for (const neighbor of graph[current]) {
                if (!visited[neighbor]) {
                    parent[neighbor] = current;
                    stack.push(neighbor);
                }
            }
        }
    }
    
    return []; // No path found
}

/**
 * @function reconstructPath
 * @description Reconstructs path from parent array
 * @param {Array<number>} parent - Parent array
 * @param {number} start - Starting vertex
 * @param {number} target - Target vertex
 * @returns {Array<number>} - Path from start to target
 */
function reconstructPath(parent, start, target) {
    const path = [];
    let current = target;
    
    while (current !== -1) {
        path.push(current);
        current = parent[current];
    }
    
    return path.reverse();
}

/**
 * @function dfsConnectedComponents
 * @description Finds all connected components using DFS
 * @param {Array<Array<number>>} graph - Adjacency list representation of graph
 * @returns {Array<Array<number>>} - List of connected components
 */
function dfsConnectedComponents(graph) {
    const visited = new Array(graph.length).fill(false);
    const components = [];
    
    for (let i = 0; i < graph.length; i++) {
        if (!visited[i]) {
            const component = [];
            dfsComponent(graph, i, visited, component);
            components.push(component);
        }
    }
    
    return components;
}

/**
 * @function dfsComponent
 * @description DFS helper to find connected component
 * @param {Array<Array<number>>} graph - Adjacency list representation of graph
 * @param {number} start - Starting vertex
 * @param {Array<boolean>} visited - Array to track visited vertices
 * @param {Array<number>} component - Current component being built
 * @returns {void}
 */
function dfsComponent(graph, start, visited, component) {
    visited[start] = true;
    component.push(start);
    
    for (const neighbor of graph[start]) {
        if (!visited[neighbor]) {
            dfsComponent(graph, neighbor, visited, component);
        }
    }
}

/**
 * @function dfsCycleDetection
 * @description Detects cycle in undirected graph using DFS
 * @param {Array<Array<number>>} graph - Adjacency list representation of graph
 * @returns {boolean} - True if cycle exists, false otherwise
 */
function dfsCycleDetection(graph) {
    const visited = new Array(graph.length).fill(false);
    
    for (let i = 0; i < graph.length; i++) {
        if (!visited[i]) {
            if (hasCycle(graph, i, -1, visited)) {
                return true;
            }
        }
    }
    
    return false;
}

/**
 * @function hasCycle
 * @description Helper function to detect cycle
 * @param {Array<Array<number>>} graph - Adjacency list representation of graph
 * @param {number} vertex - Current vertex
 * @param {number} parent - Parent vertex
 * @param {Array<boolean>} visited - Array to track visited vertices
 * @returns {boolean} - True if cycle exists, false otherwise
 */
function hasCycle(graph, vertex, parent, visited) {
    visited[vertex] = true;
    
    for (const neighbor of graph[vertex]) {
        if (!visited[neighbor]) {
            if (hasCycle(graph, neighbor, vertex, visited)) {
                return true;
            }
        } else if (neighbor !== parent) {
            return true;
        }
    }
    
    return false;
}

/**
 * @function createGraph
 * @description Creates a sample graph for testing
 * @param {number} vertices - Number of vertices
 * @returns {Array<Array<number>>} - Adjacency list representation of graph
 */
function createGraph(vertices) {
    const graph = [];
    for (let i = 0; i < vertices; i++) {
        graph.push([]);
    }
    return graph;
}

/**
 * @function addEdge
 * @description Adds an undirected edge to the graph
 * @param {Array<Array<number>>} graph - Adjacency list representation of graph
 * @param {number} u - First vertex
 * @param {number} v - Second vertex
 * @returns {void}
 */
function addEdge(graph, u, v) {
    graph[u].push(v);
    graph[v].push(u);
}

/**
 * @function testDFS
 * @description Test function to demonstrate DFS
 * @returns {void}
 */
function testDFS() {
    console.log("=== DFS Test ===");
    
    // Create a sample graph
    const graph = createGraph(6);
    addEdge(graph, 0, 1);
    addEdge(graph, 0, 2);
    addEdge(graph, 1, 3);
    addEdge(graph, 2, 4);
    addEdge(graph, 3, 5);
    
    console.log("Graph: 0-1-3-5, 0-2-4");
    console.log();
    
    // Test recursive DFS
    console.log("Recursive DFS from vertex 0:");
    const visited = new Array(graph.length).fill(false);
    dfsRecursive(graph, 0, visited);
    console.log();
    
    // Test iterative DFS
    console.log("Iterative DFS from vertex 0:");
    dfsIterative(graph, 0);
    console.log();
    
    // Test DFS with path finding
    console.log("Path from 0 to 5:");
    const path = dfsWithPath(graph, 0, 5);
    console.log("Path:", path);
    console.log();
    
    // Test connected components
    console.log("Connected components:");
    const components = dfsConnectedComponents(graph);
    for (let i = 0; i < components.length; i++) {
        console.log("Component " + i + ":", components[i]);
    }
    console.log();
    
    // Test cycle detection
    console.log("Cycle detection:");
    const hasCycle = dfsCycleDetection(graph);
    console.log("Graph has cycle:", hasCycle);
    console.log();
}

/**
 * @function performanceTest
 * @description Performance test for DFS
 * @returns {void}
 */
function performanceTest() {
    console.log("=== Performance Test ===");
    
    const sizes = [100, 500, 1000, 2000, 5000];
    
    for (const size of sizes) {
        const graph = createGraph(size);
        
        // Add random edges
        for (let i = 0; i < size * 2; i++) {
            const u = Math.floor(Math.random() * size);
            const v = Math.floor(Math.random() * size);
            if (u !== v) {
                addEdge(graph, u, v);
            }
        }
        
        const startTime = performance.now();
        const visited = new Array(size).fill(false);
        dfsRecursive(graph, 0, visited);
        const endTime = performance.now();
        
        const duration = endTime - startTime;
        console.log(`Graph size ${size}: ${duration.toFixed(2)} ms`);
    }
}

/**
 * @function main
 * @description Main function to run the DFS demonstration
 * @returns {void}
 */
function main() {
    console.log("Depth-First Search Algorithm Implementation");
    console.log("=========================================");
    
    // Run basic tests
    testDFS();
    
    // Run performance test
    performanceTest();
    
    console.log("\nDFS completed successfully!");
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        dfsRecursive,
        dfsIterative,
        dfsWithPath,
        dfsConnectedComponents,
        dfsCycleDetection,
        createGraph,
        addEdge,
        testDFS,
        performanceTest,
        main
    };
}

// Run the main function if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    main();
}
