
import heapq

def a_star_search(graph, start, goal, heuristic):
    # hàng đợi ưu tiên để lưu trữ các nút cần khám phá, với f_score là độ ưu tiên
    open_list = []
    heapq.heappush(open_list, (0, start))

    # came_from để xây dựng lại đường đi
    came_from = {}

    # g_score lưu trữ chi phí từ nút bắt đầu đến nút hiện tại
    g_score = {node: float('inf') for node in graph}
    g_score[start] = 0

    # f_score đại diện cho tổng chi phí ước tính từ nút bắt đầu đến nút mục tiêu
    f_score = {node: float('inf') for node in graph}
    f_score[start] = heuristic(start, goal)

    while open_list:
        # lấy nút trong open_list có f_score thấp nhất
        _, current = heapq.heappop(open_list)

        if current == goal:
            # xây dựng lại đường đi
            path = []
            while current in came_from:
                path.append(current)
                current = came_from[current]
            path.append(start)
            return path[::-1]

        for neighbor, weight in graph[current].items():
            # khoảng cách từ nút bắt đầu đến nút lân cận
            tentative_g_score = g_score[current] + weight

            if tentative_g_score < g_score[neighbor]:
                # tìm thấy đường đi tốt hơn
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g_score
                f_score[neighbor] = g_score[neighbor] + heuristic(neighbor, goal)
                if neighbor not in [i[1] for i in open_list]:
                    heapq.heappush(open_list, (f_score[neighbor], neighbor))

    return None # không tìm thấy đường đi
