
import random

class Graph:
    def __init__(self, V):
        self.V = V
        self.graph = []

    def add_edge(self, u, v):
        self.graph.append([u, v])

class DSU:
    def __init__(self, n):
        self.parent = list(range(n))

    def find(self, i):
        if self.parent[i] == i:
            return i
        self.parent[i] = self.find(self.parent[i])
        return self.parent[i]

    def union(self, i, j):
        i_id = self.find(i)
        j_id = self.find(j)
        if i_id != j_id:
            self.parent[i_id] = j_id
            return True
        return False

def karger_min_cut(graph):
    V = graph.V
    edges = graph.graph

    dsu = DSU(V)

    # Số đỉnh còn lại
    vertices_left = V

    while vertices_left > 2:
        # Chọn ngẫu nhiên một cạnh
        random_edge_index = random.randint(0, len(edges) - 1)
        u, v = edges[random_edge_index]

        # Tìm tập hợp của u và v
        set_u = dsu.find(u)
        set_v = dsu.find(v)

        # Nếu chúng không cùng một tập hợp, hợp nhất chúng
        if set_u != set_v:
            dsu.union(set_u, set_v)
            vertices_left -= 1

    # Đếm số cạnh giữa hai siêu đỉnh còn lại
    cut_edges = 0
    for u, v in edges:
        if dsu.find(u) != dsu.find(v):
            cut_edges += 1

    return cut_edges
