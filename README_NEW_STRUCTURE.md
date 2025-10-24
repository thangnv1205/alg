# Kho tàng thuật toán - Cấu trúc mới

Chào mừng bạn đến với kho tàng thuật toán! Dự án này đã được tổ chức lại để hỗ trợ nhiều ngôn ngữ lập trình (Python, Java, JavaScript) với cấu trúc thư mục gọn gàng và dễ quản lý.

## Cấu trúc thư mục mới

```
alg/
├── Sorting_Algorithms/
│   ├── Python/
│   │   ├── bubble_sort.py
│   │   ├── quick_sort.py
│   │   └── ...
│   ├── Java/
│   │   ├── bubble_sort.java
│   │   ├── quick_sort.java
│   │   └── ...
│   └── JavaScript/
│       ├── bubble_sort.js
│       ├── quick_sort.js
│       └── ...
├── Search_Algorithms/
│   ├── Python/
│   ├── Java/
│   └── JavaScript/
├── Graph_Algorithms/
│   ├── Python/
│   ├── Java/
│   └── JavaScript/
├── Dynamic_Programming/
│   ├── Python/
│   ├── Java/
│   └── JavaScript/
├── Greedy_Algorithms/
│   ├── Python/
│   ├── Java/
│   └── JavaScript/
├── Divide_and_Conquer/
│   ├── Python/
│   ├── Java/
│   └── JavaScript/
├── Randomized_Algorithms/
│   ├── Python/
│   ├── Java/
│   └── JavaScript/
├── Machine_Learning_Algorithms/
│   ├── Python/
│   ├── Java/
│   └── JavaScript/
├── Cryptographic_and_Compression_Algorithms/
│   ├── Python/
│   ├── Java/
│   └── JavaScript/
├── String_Algorithms/
│   ├── Python/
│   ├── Java/
│   └── JavaScript/
├── Mathematical_Algorithms/
│   ├── Python/
│   ├── Java/
│   └── JavaScript/
├── Other_Algorithms/
│   ├── Python/
│   ├── Java/
│   └── JavaScript/
├── scripts/
│   ├── run_java.bat/sh
│   ├── run_js.bat/sh
│   ├── run_all.bat/sh
│   ├── test_runner.js
│   └── benchmark_runner.js
├── package.json
├── Makefile
└── README.md
```

## Tính năng mới

### 1. Hỗ trợ đa ngôn ngữ
- **Python**: Triển khai gốc với cú pháp đơn giản
- **Java**: Triển khai hướng đối tượng với Javadoc
- **JavaScript**: Triển khai hiện đại với ES6+ và Node.js

### 2. Scripts tự động hóa
- **Compile và chạy Java**: Tự động compile và thực thi
- **Chạy JavaScript**: Sử dụng Node.js runtime
- **Test và Benchmark**: Kiểm tra hiệu suất và độ chính xác

### 3. Cấu trúc thư mục thông minh
- Mỗi thuật toán có thư mục riêng
- Trong mỗi thư mục có các thư mục ngôn ngữ
- Dễ dàng mở rộng và quản lý

## Hướng dẫn sử dụng

### Cài đặt

1. **Python**: Cài đặt Python 3.7+
2. **Java**: Cài đặt Java JDK 8+
3. **JavaScript**: Cài đặt Node.js 14+

```bash
# Cài đặt dependencies cho JavaScript
npm install
```

### Chạy thuật toán

#### Sử dụng Makefile (Khuyến nghị)

```bash
# Chạy tất cả implementations
make run-all

# Chạy theo ngôn ngữ
make run-python
make run-java
make run-js

# Chạy thuật toán cụ thể
make bubble-sort

# Chạy tests
make test

# Chạy benchmarks
make benchmark
```

#### Sử dụng Scripts trực tiếp

**Windows:**
```cmd
# Chạy Java
scripts\run_java.bat bubble_sort

# Chạy JavaScript
scripts\run_js.bat bubble_sort

# Chạy tất cả
scripts\run_all.bat all bubble_sort
```

**Linux/Mac:**
```bash
# Chạy Java
./scripts/run_java.sh bubble_sort

# Chạy JavaScript
./scripts/run_js.sh bubble_sort

# Chạy tất cả
./scripts/run_all.sh all bubble_sort
```

#### Sử dụng Node.js trực tiếp

```bash
# Chạy JavaScript
node Sorting_Algorithms/JavaScript/bubble_sort.js

# Chạy tests
npm run test

# Chạy benchmarks
npm run benchmark
```

### Ví dụ sử dụng

#### Python
```python
# Chạy trực tiếp
python Sorting_Algorithms/Python/bubble_sort.py
```

#### Java
```bash
# Compile và chạy
cd Sorting_Algorithms/Java
javac bubble_sort.java
java BubbleSort
```

#### JavaScript
```bash
# Chạy với Node.js
node Sorting_Algorithms/JavaScript/bubble_sort.js
```

## Danh mục thuật toán

### 1. Thuật toán sắp xếp (Sorting Algorithms)
- **Bubble Sort**: Đã triển khai đầy đủ (Python, Java, JavaScript)
- **Quick Sort**: Đang phát triển
- **Merge Sort**: Đang phát triển
- **Heap Sort**: Đang phát triển

### 2. Thuật toán tìm kiếm (Search Algorithms)
- **Linear Search**: Đang phát triển
- **Binary Search**: Đang phát triển
- **DFS/BFS**: Đang phát triển

### 3. Thuật toán đồ thị (Graph Algorithms)
- **Dijkstra**: Đang phát triển
- **Bellman-Ford**: Đang phát triển
- **Kruskal**: Đang phát triển

### 4. Thuật toán quy hoạch động (Dynamic Programming)
- **Fibonacci**: Đang phát triển
- **Knapsack**: Đang phát triển
- **LCS**: Đang phát triển

### 5. Thuật toán tham lam (Greedy Algorithms)
- **Huffman Coding**: Đang phát triển
- **Activity Selection**: Đang phát triển

### 6. Thuật toán chia để trị (Divide and Conquer)
- **Strassen Algorithm**: Đang phát triển
- **FFT**: Đang phát triển

### 7. Thuật toán ngẫu nhiên (Randomized Algorithms)
- **Randomized Quick Sort**: Đang phát triển
- **Monte Carlo**: Đang phát triển

### 8. Thuật toán học máy (Machine Learning)
- **Linear Regression**: Đang phát triển
- **K-Means**: Đang phát triển
- **Neural Networks**: Đang phát triển

### 9. Thuật toán mã hóa và nén
- **RSA**: Đang phát triển
- **AES**: Đang phát triển
- **SHA**: Đang phát triển

### 10. Thuật toán xử lý chuỗi
- **KMP**: Đang phát triển
- **Boyer-Moore**: Đang phát triển
- **Rabin-Karp**: Đang phát triển

### 11. Thuật toán số học và toán học
- **Euclidean Algorithm**: Đang phát triển
- **Sieve of Eratosthenes**: Đang phát triển

### 12. Thuật toán khác
- **Backtracking**: Đang phát triển
- **Branch and Bound**: Đang phát triển

## Lợi ích của cấu trúc mới

1. **Tổ chức rõ ràng**: Mỗi thuật toán có thư mục riêng với các implementation đa ngôn ngữ
2. **Dễ mở rộng**: Thêm ngôn ngữ mới chỉ cần tạo thư mục mới
3. **Tự động hóa**: Scripts tự động compile, chạy và test
4. **Cross-platform**: Hỗ trợ Windows, Linux, macOS
5. **Performance testing**: Benchmark và so sánh hiệu suất
6. **Documentation**: Javadoc, JSDoc và Python docstrings

## Đóng góp

Để đóng góp vào dự án:

1. Fork repository
2. Tạo branch mới cho feature
3. Implement thuật toán trong các ngôn ngữ
4. Thêm tests và benchmarks
5. Cập nhật documentation
6. Tạo Pull Request

## License

MIT License - Xem file LICENSE để biết thêm chi tiết.

## Liên hệ

Nếu có câu hỏi hoặc đề xuất, vui lòng tạo issue trên GitHub repository.
