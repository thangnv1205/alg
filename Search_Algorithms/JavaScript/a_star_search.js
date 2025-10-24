/**
 * @file a_star_search.js
 * @description Implementation of A* Search algorithm in JavaScript
 * @author Algorithm Collection
 * @version 1.0
 */

/**
 * @class Node
 * @description Represents a node in the search space
 */
class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.g = 0;
        this.h = 0;
        this.f = 0;
        this.parent = null;
    }
    
    equals(other) {
        return this.x === other.x && this.y === other.y;
    }
    
    hashCode() {
        return this.x * 1000 + this.y;
    }
}

/**
 * @function aStar
 * @description A* search algorithm implementation
 * @param {Array<Array<number>>} grid - Grid representation (0 = walkable, 1 = obstacle)
 * @param {Node} start - Starting node
 * @param {Node} goal - Goal node
 * @returns {Array<Node>} - Path from start to goal, empty if no path
 */
function aStar(grid, start, goal) {
    const openSet = [];
    const closedSet = new Set();
    const cameFrom = new Map();
    const gScore = new Map();
    const fScore = new Map();
    
    // Initialize
    gScore.set(start, 0);
    fScore.set(start, heuristic(start, goal));
    start.g = 0;
    start.h = heuristic(start, goal);
    start.f = start.g + start.h;
    openSet.push(start);
    
    while (openSet.length > 0) {
        // Find node with lowest f score
        let current = openSet[0];
        let currentIndex = 0;
        for (let i = 1; i < openSet.length; i++) {
            if (openSet[i].f < current.f) {
                current = openSet[i];
                currentIndex = i;
            }
        }
        
        openSet.splice(currentIndex, 1);
        
        if (current.equals(goal)) {
            return reconstructPath(cameFrom, current);
        }
        
        closedSet.add(current);
        
        for (const neighbor of getNeighbors(grid, current)) {
            if (closedSet.has(neighbor)) {
                continue;
            }
            
            const tentativeGScore = gScore.get(current) + distance(current, neighbor);
            
            if (!gScore.has(neighbor) || tentativeGScore < gScore.get(neighbor)) {
                cameFrom.set(neighbor, current);
                gScore.set(neighbor, tentativeGScore);
                fScore.set(neighbor, tentativeGScore + heuristic(neighbor, goal));
                
                neighbor.g = tentativeGScore;
                neighbor.h = heuristic(neighbor, goal);
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.parent = current;
                
                if (!openSet.includes(neighbor)) {
                    openSet.push(neighbor);
                }
            }
        }
    }
    
    return []; // No path found
}

/**
 * @function heuristic
 * @description Heuristic function (Euclidean distance)
 * @param {Node} a - First node
 * @param {Node} b - Second node
 * @returns {number} - Heuristic value
 */
function heuristic(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

/**
 * @function distance
 * @description Distance between two nodes
 * @param {Node} a - First node
 * @param {Node} b - Second node
 * @returns {number} - Distance
 */
function distance(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

/**
 * @function getNeighbors
 * @description Gets valid neighbors of a node
 * @param {Array<Array<number>>} grid - Grid representation
 * @param {Node} node - Current node
 * @returns {Array<Node>} - List of valid neighbors
 */
function getNeighbors(grid, node) {
    const neighbors = [];
    const dx = [-1, -1, -1, 0, 0, 1, 1, 1];
    const dy = [-1, 0, 1, -1, 1, -1, 0, 1];
    
    for (let i = 0; i < 8; i++) {
        const newX = node.x + dx[i];
        const newY = node.y + dy[i];
        
        if (isValid(grid, newX, newY)) {
            neighbors.push(new Node(newX, newY));
        }
    }
    
    return neighbors;
}

/**
 * @function isValid
 * @description Checks if coordinates are valid and walkable
 * @param {Array<Array<number>>} grid - Grid representation
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @returns {boolean} - True if valid and walkable
 */
function isValid(grid, x, y) {
    return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length && grid[x][y] === 0;
}

/**
 * @function reconstructPath
 * @description Reconstructs path from cameFrom map
 * @param {Map} cameFrom - Parent map
 * @param {Node} current - Current node
 * @returns {Array<Node>} - Path from start to goal
 */
function reconstructPath(cameFrom, current) {
    const path = [];
    
    while (current !== null) {
        path.push(current);
        current = cameFrom.get(current);
    }
    
    return path.reverse();
}

/**
 * @function aStarWithCustomHeuristic
 * @description A* with custom heuristic function
 * @param {Array<Array<number>>} grid - Grid representation
 * @param {Node} start - Starting node
 * @param {Node} goal - Goal node
 * @param {Function} heuristicFn - Custom heuristic function
 * @returns {Array<Node>} - Path from start to goal
 */
function aStarWithCustomHeuristic(grid, start, goal, heuristicFn) {
    const openSet = [];
    const closedSet = new Set();
    const cameFrom = new Map();
    const gScore = new Map();
    
    gScore.set(start, 0);
    start.g = 0;
    start.h = heuristicFn(start, goal);
    start.f = start.g + start.h;
    openSet.push(start);
    
    while (openSet.length > 0) {
        let current = openSet[0];
        let currentIndex = 0;
        for (let i = 1; i < openSet.length; i++) {
            if (openSet[i].f < current.f) {
                current = openSet[i];
                currentIndex = i;
            }
        }
        
        openSet.splice(currentIndex, 1);
        
        if (current.equals(goal)) {
            return reconstructPath(cameFrom, current);
        }
        
        closedSet.add(current);
        
        for (const neighbor of getNeighbors(grid, current)) {
            if (closedSet.has(neighbor)) {
                continue;
            }
            
            const tentativeGScore = gScore.get(current) + distance(current, neighbor);
            
            if (!gScore.has(neighbor) || tentativeGScore < gScore.get(neighbor)) {
                cameFrom.set(neighbor, current);
                gScore.set(neighbor, tentativeGScore);
                
                neighbor.g = tentativeGScore;
                neighbor.h = heuristicFn(neighbor, goal);
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.parent = current;
                
                if (!openSet.includes(neighbor)) {
                    openSet.push(neighbor);
                }
            }
        }
    }
    
    return [];
}

/**
 * @function manhattanHeuristic
 * @description Manhattan distance heuristic
 * @param {Node} a - First node
 * @param {Node} b - Second node
 * @returns {number} - Manhattan distance
 */
function manhattanHeuristic(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

/**
 * @function chebyshevHeuristic
 * @description Chebyshev distance heuristic
 * @param {Node} a - First node
 * @param {Node} b - Second node
 * @returns {number} - Chebyshev distance
 */
function chebyshevHeuristic(a, b) {
    return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
}

/**
 * @function createGrid
 * @description Creates a sample grid for testing
 * @param {number} rows - Number of rows
 * @param {number} cols - Number of columns
 * @returns {Array<Array<number>>} - Grid with some obstacles
 */
function createGrid(rows, cols) {
    const grid = Array(rows).fill().map(() => Array(cols).fill(0));
    
    // Add some obstacles
    if (rows >= 3 && cols >= 3) {
        grid[1][1] = 1;
        grid[1][2] = 1;
        grid[2][1] = 1;
    }
    
    return grid;
}

/**
 * @function printGrid
 * @description Prints the grid with path
 * @param {Array<Array<number>>} grid - Grid representation
 * @param {Array<Node>} path - Path to highlight
 * @returns {void}
 */
function printGrid(grid, path) {
    const pathSet = new Set(path.map(node => `${node.x},${node.y}`));
    
    for (let i = 0; i < grid.length; i++) {
        let row = "";
        for (let j = 0; j < grid[i].length; j++) {
            if (pathSet.has(`${i},${j}`)) {
                row += "* ";
            } else if (grid[i][j] === 1) {
                row += "# ";
            } else {
                row += ". ";
            }
        }
        console.log(row);
    }
}

/**
 * @function testAStar
 * @description Test function to demonstrate A* search
 * @returns {void}
 */
function testAStar() {
    console.log("=== A* Search Test ===");
    
    // Create a sample grid
    const grid = createGrid(5, 5);
    const start = new Node(0, 0);
    const goal = new Node(4, 4);
    
    console.log("Grid (0,0 to 4,4):");
    printGrid(grid, []);
    console.log();
    
    // Test basic A* search
    console.log("A* search with Euclidean heuristic:");
    const path = aStar(grid, start, goal);
    if (path.length > 0) {
        console.log(`Path found with ${path.length} steps:`);
        printGrid(grid, path);
        console.log("Path:", path.map(n => `(${n.x},${n.y})`).join(" -> "));
    } else {
        console.log("No path found!");
    }
    console.log();
    
    // Test with Manhattan heuristic
    console.log("A* search with Manhattan heuristic:");
    const path2 = aStarWithCustomHeuristic(grid, start, goal, manhattanHeuristic);
    if (path2.length > 0) {
        console.log(`Path found with ${path2.length} steps`);
    } else {
        console.log("No path found!");
    }
    console.log();
    
    // Test with Chebyshev heuristic
    console.log("A* search with Chebyshev heuristic:");
    const path3 = aStarWithCustomHeuristic(grid, start, goal, chebyshevHeuristic);
    if (path3.length > 0) {
        console.log(`Path found with ${path3.length} steps`);
    } else {
        console.log("No path found!");
    }
    console.log();
}

/**
 * @function performanceTest
 * @description Performance test for A* search
 * @returns {void}
 */
function performanceTest() {
    console.log("=== Performance Test ===");
    
    const sizes = [10, 20, 30, 40, 50];
    
    for (const size of sizes) {
        const grid = createGrid(size, size);
        const start = new Node(0, 0);
        const goal = new Node(size - 1, size - 1);
        
        const startTime = performance.now();
        aStar(grid, start, goal);
        const endTime = performance.now();
        
        const duration = endTime - startTime;
        console.log(`Grid size ${size}x${size}: ${duration.toFixed(2)} ms`);
    }
}

/**
 * @function main
 * @description Main function to run the A* search demonstration
 * @returns {void}
 */
function main() {
    console.log("A* Search Algorithm Implementation");
    console.log("==================================");
    
    // Run basic tests
    testAStar();
    
    // Run performance test
    performanceTest();
    
    console.log("\nA* Search completed successfully!");
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Node,
        aStar,
        aStarWithCustomHeuristic,
        manhattanHeuristic,
        chebyshevHeuristic,
        createGrid,
        printGrid,
        testAStar,
        performanceTest,
        main
    };
}

// Run the main function if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    main();
}
