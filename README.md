# Algorithms Collection

A comprehensive collection of algorithms implemented in multiple programming languages including JavaScript, Python, Java, C, C++, and Assembly.

## 🚀 Features

- **Multi-language Support**: JavaScript, Python, Java, C, C++, Assembly
- **Comprehensive Coverage**: Sorting, Searching, Graph, Dynamic Programming, Machine Learning, and more
- **Cross-platform**: Works on Windows, macOS, and Linux
- **Easy Compilation**: Automated build system with Makefile
- **Testing Framework**: Built-in testing and benchmarking tools

## 📁 Project Structure

```
algorithms-collection/
├── Sorting_Algorithms/          # Sorting algorithms
├── Search_Algorithms/           # Search algorithms
├── Graph_Algorithms/            # Graph algorithms
├── Dynamic_Programming/          # DP algorithms
├── Machine_Learning_Algorithms/ # ML algorithms
├── Mathematical_Algorithms/     # Math algorithms
├── String_Algorithms/           # String algorithms
├── Cryptographic_Algorithms/   # Crypto algorithms
├── Other_Algorithms/            # Other algorithms
├── scripts/                     # Build and test scripts
├── Makefile                     # Build configuration
├── package.json                 # Node.js dependencies
└── README.md                    # This file
```

## 🛠️ Setup

### Prerequisites

- **Node.js** (v14+)
- **Python** (v3.6+)
- **Java** (JDK 8+)
- **GCC/G++** (for C/C++)
- **NASM** (for Assembly)
- **Make** (optional, for Makefile)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd algorithms-collection
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment**
   ```bash
   npm run setup
   ```

## 🏃‍♂️ Running Algorithms

### Using npm scripts

```bash
# Run all algorithms
npm run run-all

# Run specific language
npm run run-js      # JavaScript
npm run run-python  # Python
npm run run-java    # Java
npm run run-c       # C
npm run run-cpp     # C++
npm run run-asm     # Assembly

# Test all algorithms
npm test

# Benchmark performance
npm run benchmark
```

### Using Makefile

```bash
# Compile all languages
make compile-all

# Compile specific language
make compile-c      # C
make compile-cpp    # C++
make compile-java   # Java
make compile-asm    # Assembly

# Run all algorithms
make run-all

# Run specific language
make run-js         # JavaScript
make run-python     # Python
make run-java       # Java
make run-c          # C
make run-cpp        # C++
make run-asm        # Assembly

# Clean build files
make clean

# Show help
make help
```

### Using Node.js scripts directly

```bash
# Run all algorithms
node scripts/run_all.js

# Run with specific options
node scripts/run_all.js --all --verbose --x86
```

## 🔧 Assembly Support

The project includes comprehensive Assembly support for multiple architectures:

### Supported Architectures

- **x86** (32-bit Intel/AMD)
- **x64** (64-bit Intel/AMD)
- **ARM** (32-bit ARM)
- **ARM64** (64-bit ARM)

### Assembly Compilation

```bash
# Compile for x64 (default)
make compile-asm

# Compile for x86
node scripts/assembly_compiler.js --arch x86

# Compile for ARM
node scripts/assembly_compiler.js --arch arm
```

### Assembly File Structure

Assembly files should follow this structure:

```assembly
; Algorithm: [Algorithm Name]
; Language: Assembly (x64)
; Description: [Brief description]

section .data
    ; Data section

section .text
    global _start

_start:
    ; Main algorithm implementation
    mov rax, 60    ; sys_exit
    mov rdi, 0     ; exit status
    syscall
```

## 📊 Algorithm Categories

### Sorting Algorithms

- [Bubble Sort](./Sorting_Algorithms/)
- [Selection Sort](./Sorting_Algorithms/)
- [Insertion Sort](./Sorting_Algorithms/)
- [Merge Sort](./Sorting_Algorithms/)
- [Quick Sort](./Sorting_Algorithms/)
- [Heap Sort](./Sorting_Algorithms/)
- [Counting Sort](./Sorting_Algorithms/)
- [Radix Sort](./Sorting_Algorithms/)
- [Bucket Sort](./Sorting_Algorithms/)

### Search Algorithms

- [Linear Search](./Search_Algorithms/)
- [Binary Search](./Search_Algorithms/)
- [Jump Search](./Search_Algorithms/)
- [Interpolation Search](./Search_Algorithms/)
- [DFS (Depth-First Search)](./Graph_Algorithms/)
- [BFS (Breadth-First Search)](./Graph_Algorithms/)
- [A\* Search](./Graph_Algorithms/)

### Graph Algorithms

- [Dijkstra's Algorithm](./Graph_Algorithms/)
- [Bellman-Ford Algorithm](./Graph_Algorithms/)
- [Floyd-Warshall Algorithm](./Graph_Algorithms/)
- [Kruskal's Algorithm](./Graph_Algorithms/)
- [Prim's Algorithm](./Graph_Algorithms/)
- [Topological Sort](./Graph_Algorithms/)
- [Kosaraju's Algorithm](./Graph_Algorithms/)

### Dynamic Programming

- [Fibonacci Sequence](./Dynamic_Programming/)
- [Knapsack Problem](./Dynamic_Programming/)
- [Edit Distance](./Dynamic_Programming/)
- [Longest Increasing Subsequence](./Dynamic_Programming/)
- [Longest Path Problem](./Dynamic_Programming/)

### Machine Learning

- [Linear Regression](./Machine_Learning_Algorithms/)
- [Logistic Regression](./Machine_Learning_Algorithms/)
- [Decision Trees](./Machine_Learning_Algorithms/)
- [Random Forest](./Machine_Learning_Algorithms/)
- [Support Vector Machines](./Machine_Learning_Algorithms/)
- [K-Means Clustering](./Machine_Learning_Algorithms/)
- [Neural Networks](./Machine_Learning_Algorithms/)
- [Gradient Boosting](./Machine_Learning_Algorithms/)

### Mathematical Algorithms

- [Euclidean Algorithm](./Mathematical_Algorithms/)
- [Exponentiation by Squaring](./Mathematical_Algorithms/)
- [Miller-Rabin Test](./Mathematical_Algorithms/)
- [Sieve of Eratosthenes](./Mathematical_Algorithms/)

### String Algorithms

- [KMP Algorithm](./String_Algorithms/)
- [Boyer-Moore Algorithm](./String_Algorithms/)
- [Rabin-Karp Algorithm](./String_Algorithms/)
- [Z Algorithm](./String_Algorithms/)
- [Trie Algorithm](./String_Algorithms/)

### Cryptographic Algorithms

- [AES (Advanced Encryption Standard)](./Cryptographic_Algorithms/)
- [RSA (Rivest-Shamir-Adleman)](./Cryptographic_Algorithms/)
- [SHA (Secure Hash Algorithm)](./Cryptographic_Algorithms/)
- [LZW Compression](./Cryptographic_Algorithms/)

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific language tests
npm run test-js
npm run test-python
npm run test-java
```

## 📈 Benchmarking

```bash
# Run performance benchmarks
npm run benchmark

# Benchmark specific algorithm
npm run benchmark -- --algorithm="quick_sort"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Implement your algorithm
4. Add tests
5. Submit a pull request

### Adding New Algorithms

1. **Choose the appropriate category folder**
2. **Create files for each language you want to support**
3. **Follow the naming convention**: `algorithm_name.js`, `algorithm_name.py`, etc.
4. **Include proper documentation and comments**
5. **Add test cases**

### Code Style Guidelines

- Use meaningful variable names
- Add comprehensive comments
- Include time and space complexity
- Follow language-specific conventions
- Include usage examples

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Contributors who have implemented various algorithms
- Open source community for inspiration and resources
- Educational institutions for algorithm research

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/algorithms-collection/issues) page
2. Create a new issue with detailed description
3. Contact the maintainers

---

**Happy Coding! 🎉**
