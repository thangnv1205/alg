
import random
import math

# Hàm mục tiêu (ví dụ: tìm giá trị x tối thiểu hóa x^2 - 4x + 4)
def objective_function(x):
    return x**2 - 4*x + 4

def simulated_annealing(objective_function, initial_solution, temperature, cooling_rate, min_temp):
    current_solution = initial_solution
    best_solution = current_solution
    best_cost = objective_function(best_solution)

    while temperature > min_temp:
        # Tạo một giải pháp lân cận
        # Đối với ví dụ đơn giản này, chúng ta sẽ thêm một nhiễu nhỏ
        neighbor_solution = current_solution + random.uniform(-1, 1)

        current_cost = objective_function(current_solution)
        neighbor_cost = objective_function(neighbor_solution)

        # Quyết định chấp nhận giải pháp lân cận
        if neighbor_cost < current_cost:
            current_solution = neighbor_solution
        else:
            # Chấp nhận giải pháp tồi hơn với một xác suất
            acceptance_probability = math.exp((current_cost - neighbor_cost) / temperature)
            if random.random() < acceptance_probability:
                current_solution = neighbor_solution

        # Cập nhật giải pháp tốt nhất
        if objective_function(current_solution) < best_cost:
            best_solution = current_solution
            best_cost = objective_function(best_solution)

        # Giảm nhiệt độ
        temperature *= cooling_rate

    return best_solution, best_cost
