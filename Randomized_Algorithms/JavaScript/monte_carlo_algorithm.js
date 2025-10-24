function monteCarloPiEstimation(numPoints) {
    let insideCircle = 0;

    for (let i = 0; i < numPoints; i++) {
        const x = Math.random(); // Số ngẫu nhiên từ 0.0 đến 1.0
        const y = Math.random(); // Số ngẫu nhiên từ 0.0 đến 1.0

        const distance = x * x + y * y;
        if (distance <= 1) {
            insideCircle++;
        }
    }

    return 4.0 * insideCircle / numPoints;
}

// Ví dụ sử dụng:
const numPoints = 100000;
const piApprox = monteCarloPiEstimation(numPoints);
console.log(`Ước tính Pi bằng phương pháp Monte Carlo với ${numPoints} điểm: ${piApprox}`);

const numPointsLarge = 10000000;
const piApproxLarge = monteCarloPiEstimation(numPointsLarge);
console.log(`Ước tính Pi bằng phương pháp Monte Carlo với ${numPointsLarge} điểm: ${piApproxLarge}`);
