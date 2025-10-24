
import random

def monte_carlo_pi_estimation(num_points):
    inside_circle = 0
    for _ in range(num_points):
        x = random.uniform(0, 1)
        y = random.uniform(0, 1)
        distance = x**2 + y**2
        if distance <= 1:
            inside_circle += 1

    pi_estimate = 4 * inside_circle / num_points
    return pi_estimate
