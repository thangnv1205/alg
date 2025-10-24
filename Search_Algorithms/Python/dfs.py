
def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    result = []

    def _dfs_recursive(vertex):
        visited.add(vertex)
        result.append(vertex)
        for neighbor in graph.get(vertex, []):
            if neighbor not in visited:
                _dfs_recursive(neighbor)

    _dfs_recursive(start)
    return result
