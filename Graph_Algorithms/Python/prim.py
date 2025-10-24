
import heapq

def prim(graph):
    mst = []
    visited = set()
    # (trọng số, đỉnh nguồn, đỉnh đích)
    min_heap = [(0, -1, 0)]  # Bắt đầu từ đỉnh 0

    total_weight = 0

    while min_heap:
        weight, src, dest = heapq.heappop(min_heap)

        if dest in visited:
            continue

        visited.add(dest)
        total_weight += weight
        if src != -1: # Bỏ qua cạnh đầu tiên không có nguồn
            mst.append((src, dest, weight))

        for neighbor, edge_weight in graph[dest].items():
            if neighbor not in visited:
                heapq.heappush(min_heap, (edge_weight, dest, neighbor))

    return mst, total_weight
