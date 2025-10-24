
class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, i):
        if self.parent[i] == i:
            return i
        self.parent[i] = self.find(self.parent[i])
        return self.parent[i]

    def union(self, i, j):
        i_id = self.find(i)
        j_id = self.find(j)
        if i_id != j_id:
            if self.rank[i_id] > self.rank[j_id]:
                self.parent[j_id] = i_id
            else:
                self.parent[i_id] = j_id
                if self.rank[i_id] == self.rank[j_id]:
                    self.rank[j_id] += 1
            return True
        return False

def kruskal(graph):
    # graph is a list of tuples (u, v, w)
    mst = []
    edges = sorted(graph, key=lambda item: item[2])
    dsu = DSU(len(edges))
    num_edges = 0
    i = 0
    while num_edges < len(edges) -1 and i < len(edges):
        u, v, weight = edges[i]
        i += 1
        if dsu.union(u,v):
            num_edges += 1
            mst.append((u,v,weight))
    return mst
