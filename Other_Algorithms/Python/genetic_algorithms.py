
import random

# Hàm mục tiêu (ví dụ: tìm giá trị x tối đa hóa -x^2 + 5x + 10)
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
        best_chromosome = population[np.argmax(fitnesses)]
        best_fitness = fitness_function(best_chromosome)
        best_x = int("".join(str(i) for i in best_chromosome), 2)
        # print(f"Thế hệ {generation}: x = {best_x}, fitness = {best_fitness}")

    # Trả về cá thể tốt nhất cuối cùng
    final_fitnesses = [fitness_function(c) for c in population]
    best_chromosome = population[np.argmax(final_fitnesses)]
    return best_chromosome, fitness_function(best_chromosome)
