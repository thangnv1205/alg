function sieveOfEratosthenes(n) {
    const isPrime = new Array(n + 1).fill(true);
    isPrime[0] = false;
    isPrime[1] = false;

    for (let p = 2; p * p <= n; p++) {
        // Nếu isPrime[p] vẫn là true, thì đó là một số nguyên tố
        if (isPrime[p]) {
            // Cập nhật tất cả các bội số của p thành false
            for (let i = p * p; i <= n; i += p) {
                isPrime[i] = false;
            }
        }
    }

    // Thu thập tất cả các số nguyên tố
    const primes = [];
    for (let i = 2; i <= n; i++) {
        if (isPrime[i]) {
            primes.push(i);
        }
    }
    return primes;
}

// Ví dụ sử dụng:
const limit = 30;
const primesUpToLimit = sieveOfEratosthenes(limit);
console.log(`Các số nguyên tố lên đến ${limit} là: ${primesUpToLimit}`);

const limit2 = 100;
const primesUpToLimit2 = sieveOfEratosthenes(limit2);
console.log(`Các số nguyên tố lên đến ${limit2} là: ${primesUpToLimit2}`);
