function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Ví dụ sử dụng:
const num1 = 48;
const num2 = 18;
console.log(`Ước chung lớn nhất của ${num1} và ${num2} là: ${gcd(num1, num2)}`);

const num3 = 101;
const num4 = 103;
console.log(`Ước chung lớn nhất của ${num3} và ${num4} là: ${gcd(num3, num4)}`);
