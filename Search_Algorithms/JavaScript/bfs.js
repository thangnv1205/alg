/**
 * @file bfs.js
 * @description Implementation of Breadth-First Search algorithm in JavaScript
 * @author Algorithm Collection
 * @version 1.0
 */

/**
 * @function bfsTraversal
 * @description Basic BFS traversal
 * @param {Array<Array<number>>} graph - Adjacency list representation of graph
 * @param {number} start - Starting vertex
 * @returns {void}
 */
function bfsTraversal(graph, start) {
    const visited = new Array(graph.length).fill(false);
    const queue = [start];
    
    visited[start] = true;
    
    while (queue.length > 0) {
        const current = queue.shift();
        console.log(current + " ");
        
        for (const neighbor of graph[current]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.push(neighbor);
            }
        }
    }
}

/**
 * @function bfsWithLevels
 * @description BFS with level information
 * @param {Array<Array<number>>} graph - Adjacency list representation of graph
 * @param {number} start - Starting vertex
 * @returns {void}
 */
function bfsWithLevels(graph, start) {
    const visited = new Array(graph.length).fill(false);
    const queue = [start];
    const level = new Array(graph.length).fill(0);
    
    visited[start] = true;
    level[start] = 0;
    
    while (queue.length > 0) {
        const current = queue.shift();
        console.log(`Vertex ${current} at level ${level[current]}`);
        
        for (const neighbor of graph[current]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                level[neighbor] = level[current] + 1;
                queue.push(neighbor);
            }
        }
    }
}

/**
 * @function bfsShortestPath
 * @description BFS to find shortest path in unweighted graph
 * @param {Array<Array<number>>} graph - Adjacency list representation of graph
 * @param {number} start - Starting vertex
 * @param {number} target - Target vertex
 * @returns {Array<number>} - Shortest path from start to target
 */
function bfsShortestPath(graph, start, target) {
    const visited = new Array(graph.length).fill(false);
    const parent = new Array(graph.length).fill(-1);
    const queue = [start];
    
    visited[start] = true;
    
    while (queue.length > 0) {
        const current = queue.shift();
        
        if (current === target) {
            return reconstructPath(parent, start, target);
        }
        
        for (const neighbor of graph[current]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                parent[neighbor] = current;
                queue.push(neighbor);
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
 * @function bfsDistance
 * @description BFS to find shortest distances from start vertex
 * @param {Array<Array<number>>} graph - Adjacency list representation of graph
 * @param {number} start - Starting vertex
 * @returns {Array<number>} - Array of distances from start vertex
 */
function bfsDistance(graph, start) {
    const visited = new Array(graph.length).fill(false);
    const distance = new Array(graph.length).fill(-1);
    const queue = [start];
    
    visited[start] = true;
    distance[start] = 0;
    
    while (queue.length > 0) {
        const current = queue.shift();
        
        for (const neighbor of graph[current]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                distance[neighbor] = distance[current] + 1;
                queue.push(neighbor);
            }
        }
    }
    
    return distance;
}

/**
 * @function bfsConnectedComponents
 * @description Finds all connected components using BFS
 * @param {Array<Array<number>>} graph - Adjacency list representation of graph
 * @returns {Array<Array<number>>} - List of connected components
 */
function bfsConnectedComponents(graph) {
    const visited = new Array(graph.length).fill(false);
    const components = [];
    
    for (let i = 0; i < graph.length; i++) {
        if (!visited[i]) {
            const component = [];
            bfsComponent(graph, i, visited, component);
            components.push(component);
        }
    }
    
    return components;
}

/**
 * @function bfsComponent
 * @description BFS helper to find connected component
 * @param {Array<Array<number>>} graph - Adjacency list representation of graph
 * @param {number} start - Starting vertex
 * @param {Array<boolean>} visited - Array to track visited vertices
 * @param {Array<number>} component - Current component being built
 * @returns {void}
 */
function bfsComponent(graph, start, visited, component) {
    const queue = [start];
    
    visited[start] = true;
    
    while (queue.length > 0) {
        const current = queue.shift();
        component.push(current);
        
        for (const neighbor of graph[current]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.push(neighbor);
            }
        }
    }
}

/**
 * @function bfsBipartiteCheck
 * @description Checks if graph is bipartite using BFS
 * @param {Array<Array<number>>} graph - Adjacency list representation of graph
 * @returns {boolean} - True if graph is bipartite, false otherwise
 */
function bfsBipartiteCheck(graph) {
    const color = new Array(graph.length).fill(-1);
    
    for (let i = 0; i < graph.length; i++) {
        if (color[i] === -1) {
            if (!isBipartiteComponent(graph, i, color)) {
                return false;
            }
        }
    }
    
    return true;
}

/**
 * @function isBipartiteComponent
 * @description Helper function to check if component is bipartite
 * @param {Array<Array<number>>} graph - Adjacency list representation of graph
 * @param {number} start - Starting vertex
 * @param {Array<number>} color - Color array (0 or 1)
 * @returns {boolean} - True if component is bipartite, false otherwise
 */
function isBipartiteComponent(graph, start, color) {
    const queue = [start];
    
    color[start] = 0;
    
    while (queue.length > 0) {
        const current = queue.shift();
        
        for (const neighbor of graph[current]) {
            if (color[neighbor] === -1) {
                color[neighbor] = 1 - color[current];
                queue.push(neighbor);
            } else if (color[neighbor] === color[current]) {
                return false;
            }
        }
    }
    
    return true;
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
 * @function testBFS
 * @description Test function to demonstrate BFS
 * @returns {void}
 */
function testBFS() {
    console.log("=== BFS Test ===");
    
    // Create a sample graph
    const graph = createGraph(6);
    addEdge(graph, 0, 1);
    addEdge(graph, 0, 2);
    addEdge(graph, 1, 3);
    addEdge(graph, 2, 4);
    addEdge(graph, 3, 5);
    
    console.log("Graph: 0-1-3-5, 0-2-4");
    console.log();
    
    // Test basic BFS
    console.log("BFS traversal from vertex 0:");
    bfsTraversal(graph, 0);
    console.log();
    
    // Test BFS with levels
    console.log("BFS with levels from vertex 0:");
    bfsWithLevels(graph, 0);
    console.log();
    
    // Test shortest path
    console.log("Shortest path from 0 to 5:");
    const path = bfsShortestPath(graph, 0, 5);
    console.log("Path:", path);
    console.log();
    
    // Test distance calculation
    console.log("Distances from vertex 0:");
    const distances = bfsDistance(graph, 0);
    for (let i = 0; i < distances.length; i++) {
        console.log(`Distance to ${i}: ${distances[i]}`);
    }
    console.log();
    
    // Test connected components
    console.log("Connected components:");
    const components = bfsConnectedComponents(graph);
    for (let i = 0; i < components.length; i++) {
        console.log(`Component ${i}:`, components[i]);
    }
    console.log();
    
    // Test bipartite check
    console.log("Bipartite check:");
    const isBipartite = bfsBipartiteCheck(graph);
    console.log("Graph is bipartite:", isBipartite);
    console.log();
}

/**
 * @function performanceTest
 * @description Performance test for BFS
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
        bfsTraversal(graph, 0);
        const endTime = performance.now();
        
        const duration = endTime - startTime;
        console.log(`Graph size ${size}: ${duration.toFixed(2)} ms`);
    }
}

/**
 * @function main
 * @description Main function to run the BFS demonstration
 * @returns {void}
 */
function main() {
    console.log("Breadth-First Search Algorithm Implementation");
    console.log("============================================");
    
    // Run basic tests
    testBFS();
    
    // Run performance test
    performanceTest();
    
    console.log("\nBFS completed successfully!");
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        bfsTraversal,
        bfsWithLevels,
        bfsShortestPath,
        bfsDistance,
        bfsConnectedComponents,
        bfsBipartiteCheck,
        createGraph,
        addEdge,
        testBFS,
        performanceTest,
        main
    };
}

// Run the main function if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    main();
}
