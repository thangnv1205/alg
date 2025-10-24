function objectiveFunction(x) {
    return Math.pow(x, 2) - 4 * x + 4;
}

function simulatedAnnealing(initialSolution, initialTemperature, coolingRate, minTemperature) {
    let currentSolution = initialSolution;
    let bestSolution = currentSolution;
    let bestCost = objectiveFunction(bestSolution);

    let temperature = initialTemperature;

    while (temperature > minTemperature) {
        // Tạo một giải pháp lân cận
        // Đối với ví dụ đơn giản này, chúng ta sẽ thêm một nhiễu nhỏ
        // Phạm vi nhiễu có thể phụ thuộc vào nhiệt độ
        const neighborSolution = currentSolution + (Math.random() * 2 - 1) * temperature * 0.1; // random() * 2 - 1 tạo số trong [-1, 1]

        const currentCost = objectiveFunction(currentSolution);
        const neighborCost = objectiveFunction(neighborSolution);

        // Quyết định chấp nhận giải pháp lân cận
        if (neighborCost < currentCost) {
            currentSolution = neighborSolution;
        } else {
            // Chấp nhận giải pháp tồi hơn với một xác suất
            const acceptanceProbability = Math.exp((currentCost - neighborCost) / temperature);
            if (Math.random() < acceptanceProbability) {
                currentSolution = neighborSolution;
            }
        }

        // Cập nhật giải pháp tốt nhất
        if (objectiveFunction(currentSolution) < bestCost) {
            bestSolution = currentSolution;
            bestCost = objectiveFunction(bestSolution);
        }

        // Giảm nhiệt độ
        temperature *= coolingRate;
    }

    return { bestSolution, bestCost };
}

// Ví dụ sử dụng:
const initialSolution = Math.random() * 20 - 10; // Bắt đầu từ một điểm ngẫu nhiên trong [-10, 10]
const initialTemperature = 100.0;
const coolingRate = 0.95;
const minTemperature = 0.01;

const { bestSolution, bestCost } = simulatedAnnealing(initialSolution, initialTemperature, coolingRate, minTemperature);

console.log("Giá trị x tốt nhất được tìm thấy:", bestSolution);
console.log("Giá trị hàm mục tiêu tối thiểu:", bestCost);
