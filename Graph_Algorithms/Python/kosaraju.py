
from collections import defaultdict

class Graph:
    def __init__(self, vertices):
        self.V = vertices
        self.graph = defaultdict(list)

    def add_edge(self, u, v):
        self.graph[u].append(v)

    def dfs(self, v, visited, stack):
        visited[v] = True
        for i in self.graph[v]:
            if not visited[i]:
                self.dfs(i, visited, stack)
        stack = stack.append(v)

    def get_transpose(self):
        g = Graph(self.V)
        for i in self.graph:
            for j in self.graph[i]:
                g.add_edge(j, i)
        return g

    def print_sccs(self):
        stack = []
        visited = [False] * (self.V)

        for i in range(self.V):
            if not visited[i]:
                self.dfs(i, visited, stack)

        gr = self.get_transpose()

        visited = [False] * (self.V)
        sccs = []
        while stack:
            i = stack.pop()
            if not visited[i]:
                scc = []
                gr.dfs(i, visited, scc)
                sccs.append(scc)
        return sccs
