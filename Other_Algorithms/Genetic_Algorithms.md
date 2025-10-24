
# Thuật toán di truyền (Genetic Algorithms)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Thuật toán di truyền (GA) là một kỹ thuật tối ưu hóa và tìm kiếm lấy cảm hứng từ quá trình chọn lọc tự nhiên và di truyền học. Nó là một loại thuật toán tiến hóa được sử dụng để tìm các giải pháp gần đúng cho các bài toán tối ưu hóa và tìm kiếm.

GA hoạt động trên một "quần thể" các giải pháp tiềm năng (được gọi là "cá thể" hoặc "nhiễm sắc thể"). Mỗi cá thể đại diện cho một giải pháp cho bài toán và được đánh giá bằng một "hàm thích nghi" (fitness function) để xác định mức độ tốt của giải pháp đó. Quần thể tiến hóa qua nhiều "thế hệ" bằng cách áp dụng các toán tử di truyền như chọn lọc, lai ghép và đột biến.

## Mã giả (Pseudocode)

```
function GeneticAlgorithm(pop_size, chromosome_length, generations, mutation_rate) is
    population := create_initial_population(pop_size, chromosome_length)

    for generation from 1 to generations do
        fitnesses := evaluate_fitness(population)

        // Chọn lọc: Chọn các cá thể tốt hơn để sinh sản
        parents := selection(population, fitnesses)

        // Lai ghép: Tạo ra các cá thể con từ các cặp cha mẹ
        next_population := empty list
        for i from 0 to pop_size step 2 do
            parent1 := parents[i]
            parent2 := parents[i+1]
            child1, child2 := crossover(parent1, parent2)
            add child1 to next_population
            add child2 to next_population

        // Đột biến: Giới thiệu sự đa dạng ngẫu nhiên
        for each chromosome in next_population do
            mutate(chromosome, mutation_rate)

        population := next_population

    return best_chromosome_in_final_population
```

## Hướng tiếp cận

Thuật toán di truyền thường tuân theo các bước sau:

1.  **Khởi tạo quần thể:** Tạo một quần thể ban đầu gồm các cá thể ngẫu nhiên. Mỗi cá thể là một giải pháp tiềm năng cho bài toán, thường được mã hóa dưới dạng chuỗi bit (nhiễm sắc thể).
2.  **Đánh giá thích nghi:** Đánh giá mức độ thích nghi của mỗi cá thể trong quần thể bằng cách sử dụng hàm thích nghi. Hàm này đo lường mức độ tốt của giải pháp mà cá thể đó đại diện.
3.  **Chọn lọc:** Chọn các cá thể có độ thích nghi cao hơn từ quần thể hiện tại để làm cha mẹ cho thế hệ tiếp theo. Các phương pháp chọn lọc phổ biến bao gồm chọn lọc bánh xe roulette, chọn lọc giải đấu.
4.  **Lai ghép (Crossover):** Tạo ra các cá thể con mới bằng cách kết hợp thông tin di truyền từ hai cá thể cha mẹ. Điều này thường liên quan đến việc trao đổi các phần của nhiễm sắc thể giữa hai cha mẹ.
5.  **Đột biến (Mutation):** Giới thiệu sự đa dạng ngẫu nhiên vào quần thể bằng cách thay đổi ngẫu nhiên một số bit (hoặc gen) trong nhiễm sắc thể của các cá thể con. Điều này giúp khám phá các phần mới của không gian tìm kiếm và tránh bị mắc kẹt trong các cực tiểu cục bộ.
6.  **Thay thế:** Thay thế quần thể cũ bằng quần thể mới được tạo ra từ các bước chọn lọc, lai ghép và đột biến.
7.  **Lặp lại:** Lặp lại các bước 2-6 cho một số thế hệ nhất định hoặc cho đến khi một tiêu chí dừng được đáp ứng (ví dụ: tìm thấy một giải pháp đủ tốt).

## Ứng dụng

*   **Tối ưu hóa:** Giải quyết các bài toán tối ưu hóa phức tạp như bài toán người bán hàng, bài toán cái túi.
*   **Học máy:** Tối ưu hóa các tham số của mô hình học máy, chọn đặc trưng.
*   **Thiết kế kỹ thuật:** Thiết kế các hệ thống tối ưu (ví dụ: thiết kế cánh máy bay, mạch điện).
*   **Tạo lịch trình:** Tạo lịch trình tối ưu cho các nhiệm vụ hoặc sự kiện.

## Bài toán thực hành (LeetCode)

Thuật toán di truyền là một kỹ thuật tối ưu hóa metaheuristic lấy cảm hứng từ sinh học. Mặc dù không có bài toán LeetCode trực tiếp yêu cầu triển khai Genetic Algorithms, các bài toán tối ưu hóa phức tạp hoặc tìm kiếm có thể được giải bằng cách áp dụng tư duy tiến hóa.

*   [473. Matchsticks to Square](https://leetcode.com/problems/matchsticks-to-square/) (Có thể giải bằng các kỹ thuật tìm kiếm và tối ưu hóa)
*   [698. Partition to K Equal Sum Subsets](https://leetcode.com/problems/partition-to-k-equal-sum-subsets/) (Có thể giải bằng các kỹ thuật tìm kiếm và tối ưu hóa)

## Triển khai (Python) - Ví dụ đơn giản

```python
import random

# Hàm mục tiêu (ví dụ: tìm giá trị x tối đa hóa -x^2 + 5x + 10)
# Giả sử x được mã hóa bằng một chuỗi bit có độ dài 4 (0-15)
def fitness_function(chromosome):
    x = int("".join(str(i) for i in chromosome), 2) # Chuyển đổi chuỗi bit thành số nguyên
    return -x**2 + 5*x + 10

# Khởi tạo quần thể
def create_population(pop_size, chromosome_length):
    population = []
    for _ in range(pop_size):
        chromosome = [random.randint(0, 1) for _ in range(chromosome_length)]
        population.append(chromosome)
    return population

# Chọn lọc (Tournament Selection)
def selection(population, fitnesses):
    selected_parents = []
    for _ in range(len(population)):
        # Chọn 2 cá thể ngẫu nhiên
        idx1, idx2 = random.sample(range(len(population)), 2)
        parent1 = population[idx1]
        parent2 = population[idx2]

        # Chọn cá thể tốt hơn
        if fitnesses[idx1] > fitnesses[idx2]:
            selected_parents.append(parent1)
        else:
            selected_parents.append(parent2)
    return selected_parents

# Lai ghép (One-point Crossover)
def crossover(parent1, parent2):
    crossover_point = random.randint(1, len(parent1) - 1)
    child1 = parent1[:crossover_point] + parent2[crossover_point:]
    child2 = parent2[:crossover_point] + parent1[crossover_point:]
    return child1, child2

# Đột biến (Bit-flip Mutation)
def mutate(chromosome, mutation_rate):
    for i in range(len(chromosome)):
        if random.random() < mutation_rate:
            chromosome[i] = 1 - chromosome[i] # Lật bit
    return chromosome

def genetic_algorithm(pop_size, chromosome_length, generations, mutation_rate):
    population = create_population(pop_size, chromosome_length)

    for generation in range(generations):
        fitnesses = [fitness_function(c) for c in population]

        # Chọn lọc
        parents = selection(population, fitnesses)

        # Lai ghép và đột biến
        next_population = []
        for i in range(0, pop_size, 2):
            parent1 = parents[i]
            parent2 = parents[i+1]
            child1, child2 = crossover(parent1, parent2)
            next_population.append(mutate(child1, mutation_rate))
            next_population.append(mutate(child2, mutation_rate))
        population = next_population

        # Tìm cá thể tốt nhất trong thế hệ hiện tại
        best_chromosome_idx = fitnesses.index(max(fitnesses))
        best_chromosome = population[best_chromosome_idx]
        best_fitness = fitness_function(best_chromosome)
        best_x = int("".join(str(i) for i in best_chromosome), 2)
        # print(f"Thế hệ {generation}: x = {best_x}, fitness = {best_fitness}")

    # Trả về cá thể tốt nhất cuối cùng
    final_fitnesses = [fitness_function(c) for c in population]
    best_chromosome_idx = final_fitnesses.index(max(final_fitnesses))
    best_chromosome = population[best_chromosome_idx]
    return best_chromosome, fitness_function(best_chromosome)

# Ví dụ sử dụng:
pop_size = 10
chromosome_length = 4 # Để mã hóa số từ 0-15
generations = 100
mutation_rate = 0.1

best_solution, best_score = genetic_algorithm(pop_size, chromosome_length, generations, mutation_rate)

print(f"Giải pháp tốt nhất (chuỗi bit): {best_solution}")
print(f"Giá trị x tương ứng: {int("".join(str(i) for i in best_solution), 2)}")
print(f"Điểm thích nghi tốt nhất: {best_score}")
```
