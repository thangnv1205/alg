function power(base, exp, mod) {
    let res = 1n; // Sử dụng BigInt
    base = base % mod;
    while (exp > 0n) {
        if (exp % 2n === 1n) {
            res = (res * base) % mod;
        }
        base = (base * base) % mod;
        exp = exp / 2n;
    }
    return res;
}

function millerRabinTest(d, n) {
    // Chọn một số ngẫu nhiên trong [2, n-2]
    const a = BigInt(Math.floor(Math.random() * (Number(n - 2n) - 2)) + 2);
    let x = power(a, d, n);

    if (x === 1n || x === n - 1n) {
        return true;
    }

    // Bình phương x lặp đi lặp lại
    while (d !== n - 1n) {
        x = (x * x) % n;
        d *= 2n;

        if (x === 1n) {
            return false;
        }
        if (x === n - 1n) {
            return true;
        }
    }
    return false;
}

function isPrimeMillerRabin(n, k = 4) {
    n = BigInt(n);

    // Trường hợp đặc biệt
    if (n <= 1n || n === 4n) {
        return false;
    }
    if (n <= 3n) {
        return true;
    }

    // Tìm d sao cho n-1 = 2^s * d
    let d = n - 1n;
    while (d % 2n === 0n) {
        d /= 2n;
    }

    // Lặp lại k lần
    for (let i = 0; i < k; i++) {
        if (!millerRabinTest(d, n)) {
            return false;
        }
    }
    return true;
}

// Ví dụ sử dụng:
console.log(`13 là số nguyên tố: ${isPrimeMillerRabin(13)}`);
console.log(`15 là số nguyên tố: ${isPrimeMillerRabin(15)}`);
console.log(`97 là số nguyên tố: ${isPrimeMillerRabin(97)}`);
console.log(`561 là số nguyên tố: ${isPrimeMillerRabin(561)}`); // 561 là số Carmichael, Miller-Rabin sẽ phát hiện ra nó là hợp số

// Kiểm tra một số lớn
const largePrimeCandidate = 1000000007n;
console.log(`${largePrimeCandidate} là số nguyên tố: ${isPrimeMillerRabin(largePrimeCandidate, 10)}`);

const largeCompositeCandidate = 1000000001n; // 1000000001 = 101 * 9900990.10
console.log(`${largeCompositeCandidate} là số nguyên tố: ${isPrimeMillerRabin(largeCompositeCandidate, 10)}`);
