function power(base, exp, mod = null) {
    let res = 1;
    if (mod !== null) {
        base %= mod;
    }

    while (exp > 0) {
        if (exp % 2 === 1) {
            if (mod !== null) {
                res = (res * base) % mod;
            } else {
                res = (res * base);
            }
        }
        if (mod !== null) {
            base = (base * base) % mod;
        } else {
            base = (base * base);
        }
        exp = Math.floor(exp / 2);
    }
    return res;
}

// Ví dụ sử dụng:
console.log(`2^10 = ${power(2, 10)}`);
console.log(`3^5 mod 7 = ${power(3, 5, 7)}`);
console.log(`5^13 = ${power(5, 13)}`);
