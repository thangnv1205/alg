
import heapq

def dijkstra(graph, start):
    # Initialize distances to all nodes as infinity, except for the start node which is 0.
    distances = {node: float('inf') for node in graph}
    distances[start] = 0

    # Priority queue to store (distance, node) tuples.
    pq = [(0, start)]

    while pq:
        # Get the node with the smallest distance.
        current_distance, current_node = heapq.heappop(pq)

        # If we have already found a shorter path, skip.
        if current_distance > distances[current_node]:
            continue

        # Explore neighbors.
        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight

            # If we found a shorter path to the neighbor, update it.
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))

    return distances
