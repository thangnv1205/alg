function fitnessFunction(chromosome) {
    let x = 0;
    for (let i = 0; i < chromosome.length; i++) {
        x += chromosome[i] * Math.pow(2, chromosome.length - 1 - i);
    }
    return -Math.pow(x, 2) + 5 * x + 10;
}

function createPopulation(popSize, chromosomeLength) {
    const population = [];
    for (let i = 0; i < popSize; i++) {
        const chromosome = [];
        for (let j = 0; j < chromosomeLength; j++) {
            chromosome.push(Math.floor(Math.random() * 2)); // 0 hoặc 1
        }
        population.push(chromosome);
    }
    return population;
}

function selection(population, fitnesses) {
    const selectedParents = [];
    const popSize = population.length;

    for (let i = 0; i < popSize; i++) {
        // Chọn 2 cá thể ngẫu nhiên
        const idx1 = Math.floor(Math.random() * popSize);
        const idx2 = Math.floor(Math.random() * popSize);
        const parent1 = population[idx1];
        const parent2 = population[idx2];

        // Chọn cá thể tốt hơn
        if (fitnesses[idx1] > fitnesses[idx2]) {
            selectedParents.push(parent1);
        } else {
            selectedParents.push(parent2);
        }
    }
    return selectedParents;
}

function crossover(parent1, parent2) {
    const crossoverPoint = Math.floor(Math.random() * (parent1.length - 1)) + 1; // Từ 1 đến length-1
    const child1 = parent1.slice(0, crossoverPoint).concat(parent2.slice(crossoverPoint));
    const child2 = parent2.slice(0, crossoverPoint).concat(parent1.slice(crossoverPoint));
    return [child1, child2];
}

function mutate(chromosome, mutationRate) {
    const mutatedChromosome = [...chromosome];
    for (let i = 0; i < mutatedChromosome.length; i++) {
        if (Math.random() < mutationRate) {
            mutatedChromosome[i] = 1 - mutatedChromosome[i]; // Lật bit
        }
    }
    return mutatedChromosome;
}

function geneticAlgorithm(popSize, chromosomeLength, generations, mutationRate) {
    let population = createPopulation(popSize, chromosomeLength);

    for (let generation = 0; generation < generations; generation++) {
        const fitnesses = population.map(c => fitnessFunction(c));

        // Chọn lọc
        const parents = selection(population, fitnesses);

        // Lai ghép và đột biến
        const nextPopulation = [];
        for (let i = 0; i < popSize; i += 2) {
            const parent1 = parents[i];
            const parent2 = parents[i + 1];
            const [child1, child2] = crossover(parent1, parent2);
            nextPopulation.push(mutate(child1, mutationRate));
            nextPopulation.push(mutate(child2, mutationRate));
        }
        population = nextPopulation;

        // Tìm cá thể tốt nhất trong thế hệ hiện tại
        // (Tùy chọn: có thể in ra để theo dõi tiến trình)
        // const maxFitness = Math.max(...fitnesses);
        // const bestChromosomeIdx = fitnesses.indexOf(maxFitness);
        // const bestChromosome = population[bestChromosomeIdx];
        // const bestX = parseInt(bestChromosome.join(''), 2);
        // console.log(`Thế hệ ${generation}: x = ${bestX}, fitness = ${maxFitness}`);
    }

    // Trả về cá thể tốt nhất cuối cùng
    const finalFitnesses = population.map(c => fitnessFunction(c));
    const maxFitness = Math.max(...finalFitnesses);
    const bestChromosomeIdx = finalFitnesses.indexOf(maxFitness);
    const bestChromosome = population[bestChromosomeIdx];

    return { bestChromosome, bestScore: maxFitness };
}

// Ví dụ sử dụng:
const popSize = 10;
const chromosomeLength = 4; // Để mã hóa số từ 0-15
const generations = 100;
const mutationRate = 0.1;

const { bestChromosome, bestScore } = geneticAlgorithm(popSize, chromosomeLength, generations, mutationRate);

const bestX = parseInt(bestChromosome.join(''), 2);

console.log("Giải pháp tốt nhất (chuỗi bit):", bestChromosome);
console.log("Giá trị x tương ứng:", bestX);
console.log("Điểm thích nghi tốt nhất:", bestScore);
