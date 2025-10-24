
from collections import defaultdict

class Graph:
    """
    Lớp Graph biểu diễn một đồ thị có hướng bằng danh sách kề.
    """
    def __init__(self, vertices):
        """
        Khởi tạo một đối tượng Graph mới.
        Args:
            vertices (int): Số lượng đỉnh trong đồ thị.
        """
        self.V = vertices # Số lượng đỉnh trong đồ thị
        self.graph = defaultdict(list) # Danh sách kề để lưu trữ các cạnh

    def add_edge(self, u, v):
        """
        Thêm một cạnh có hướng từ đỉnh u đến đỉnh v.
        Args:
            u (int): Đỉnh nguồn.
            v (int): Đỉnh đích.
        """
        self.graph[u].append(v)

    def dfs_fill_order(self, v, visited, stack):
        """
        DFS thứ nhất: Điền các đỉnh vào stack theo thứ tự hoàn thành.
        Args:
            v (int): Đỉnh hiện tại.
            visited (list): Mảng boolean theo dõi các đỉnh đã được thăm.
            stack (list): Stack để lưu trữ thứ tự hoàn thành.
        """
        visited[v] = True
        # Duyệt qua tất cả các đỉnh kề của v
        for i in self.graph[v]:
            if not visited[i]:
                self.dfs_fill_order(i, visited, stack)
        stack.append(v) # Đẩy đỉnh vào stack sau khi tất cả các đỉnh kề đã được thăm

    def dfs_scc(self, v, visited, scc_list):
        """
        DFS thứ hai: Tìm các SCCs trong đồ thị chuyển vị.
        Args:
            v (int): Đỉnh hiện tại.
            visited (list): Mảng boolean theo dõi các đỉnh đã được thăm.
            scc_list (list): Danh sách lưu trữ các đỉnh trong SCC hiện tại.
        """
        visited[v] = True
        scc_list.append(v)
        # Duyệt qua tất cả các đỉnh kề của v trong đồ thị chuyển vị
        for i in self.graph[v]:
            if not visited[i]:
                self.dfs_scc(i, visited, scc_list)

    def get_transpose(self):
        """
        Lấy đồ thị chuyển vị (transpose) bằng cách đảo ngược hướng của tất cả các cạnh.
        Returns:
            Graph: Đồ thị chuyển vị.
        """
        g = Graph(self.V)
        for i in self.graph:
            for j in self.graph[i]:
                g.add_edge(j, i) # Đảo ngược cạnh (i -> j) thành (j -> i)
        return g

    def find_sccs(self):
        """
        Phương thức chính để tìm tất cả các Thành phần liên thông mạnh (SCCs) trong đồ thị.
        Returns:
            list: Danh sách các SCCs, mỗi SCC là một danh sách các đỉnh.
        """
        stack = []
        visited = [False] * (self.V)

        # Bước 1: Điền các đỉnh vào stack theo thứ tự hoàn thành
        # Thực hiện DFS trên đồ thị gốc
        for i in range(self.V):
            if not visited[i]:
                self.dfs_fill_order(i, visited, stack)

        # Bước 2: Lấy đồ thị chuyển vị
        gr = self.get_transpose()

        # Bước 3: Thực hiện DFS trên đồ thị chuyển vị theo thứ tự từ stack
        # Đặt lại mảng visited
        visited = [False] * (self.V)
        sccs = []
        # Xử lý các đỉnh theo thứ tự được lấy ra từ stack
        while stack:
            i = stack.pop()
            # Nếu đỉnh chưa được thăm trong đồ thị chuyển vị, bắt đầu một DFS mới
            # để tìm một SCC mới
            if not visited[i]:
                scc = []
                gr.dfs_scc(i, visited, scc)
                sccs.append(scc)
        return sccs

# Ví dụ sử dụng:
# g = Graph(5)
# g.add_edge(1, 0)
# g.add_edge(0, 2)
# g.add_edge(2, 1)
# g.add_edge(0, 3)
# g.add_edge(3, 4)

# sccs = g.find_sccs()
# print("Các thành phần liên thông mạnh là:")
# for scc in sccs:
#     print(scc)
