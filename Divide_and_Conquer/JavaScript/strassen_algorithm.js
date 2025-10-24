/**
 * @file strassen_algorithm.js
 * @description Implementation of Strassen's Algorithm for matrix multiplication in JavaScript.
 * Strassen's algorithm is a divide-and-conquer algorithm that is asymptotically faster
 * than the standard matrix multiplication algorithm for large matrices.
 * @author Algorithm Collection
 * @version 1.0
 */

/**
 * Nhân hai ma trận vuông A và B bằng thuật toán Strassen.
 * Kích thước của ma trận phải là lũy thừa của 2.
 * @param {Array<Array<number>>} A - Ma trận thứ nhất.
 * @param {Array<Array<number>>} B - Ma trận thứ hai.
 * @returns {Array<Array<number>>} - Ma trận kết quả của phép nhân A * B.
 */
function multiply(A, B) {
    const n = A.length;
    let R = new Array(n).fill(0).map(() => new Array(n).fill(0));

    // Trường hợp cơ sở: nếu kích thước ma trận là 1x1, thực hiện phép nhân trực tiếp
    if (n === 1) {
        R[0][0] = A[0][0] * B[0][0];
        return R;
    }

    // Chia ma trận A và B thành 4 ma trận con có kích thước n/2 x n/2
    const A11 = new Array(n / 2).fill(0).map(() => new Array(n / 2).fill(0));
    const A12 = new Array(n / 2).fill(0).map(() => new Array(n / 2).fill(0));
    const A21 = new Array(n / 2).fill(0).map(() => new Array(n / 2).fill(0));
    const A22 = new Array(n / 2).fill(0).map(() => new Array(n / 2).fill(0));

    const B11 = new Array(n / 2).fill(0).map(() => new Array(n / 2).fill(0));
    const B12 = new Array(n / 2).fill(0).map(() => new Array(n / 2).fill(0));
    const B21 = new Array(n / 2).fill(0).map(() => new Array(n / 2).fill(0));
    const B22 = new Array(n / 2).fill(0).map(() => new Array(n / 2).fill(0));

    // Điền các ma trận con
    divide(A, A11, 0, 0);
    divide(A, A12, 0, n / 2);
    divide(A, A21, n / 2, 0);
    divide(A, A22, n / 2, n / 2);

    divide(B, B11, 0, 0);
    divide(B, B12, 0, n / 2);
    divide(B, B21, n / 2, 0);
    divide(B, B22, n / 2, n / 2);

    // Tính 7 ma trận con P theo công thức của Strassen
    // P1 = (A11 + A22)(B11 + B22)
    const P1 = multiply(add(A11, A22), add(B11, B22));
    // P2 = (A21 + A22)B11
    const P2 = multiply(add(A21, A22), B11);
    // P3 = A11(B12 - B22)
    const P3 = multiply(A11, subtract(B12, B22));
    // P4 = A22(B21 - B11)
    const P4 = multiply(A22, subtract(B21, B11));
    // P5 = (A11 + A12)B22
    const P5 = multiply(add(A11, A12), B22);
    // P6 = (A21 - A11)(B11 + B12)
    const P6 = multiply(subtract(A21, A11), add(B11, B12));
    // P7 = (A12 - A22)(B21 + B22)
    const P7 = multiply(subtract(A12, A22), add(B21, B22));

    // Tính các ma trận con C của ma trận kết quả R
    // C11 = P1 + P4 - P5 + P7
    const C11 = add(subtract(add(P1, P4), P5), P7);
    // C12 = P3 + P5
    const C12 = add(P3, P5);
    // C21 = P2 + P4
    const C21 = add(P2, P4);
    // C22 = P1 + P3 - P2 + P6
    const C22 = add(subtract(add(P1, P3), P2), P6);

    // Hợp nhất các ma trận con C vào ma trận kết quả R
    join(C11, R, 0, 0);
    join(C12, R, 0, n / 2);
    join(C21, R, n / 2, 0);
    join(C22, R, n / 2, n / 2);

    return R;
}

/**
 * Chia một ma trận lớn (parent) thành một ma trận con (child).
 * @param {Array<Array<number>>} parent - Ma trận gốc.
 * @param {Array<Array<number>>} child - Ma trận con để điền dữ liệu.
 * @param {number} iB - Chỉ số hàng bắt đầu trong ma trận gốc.
 * @param {number} jB - Chỉ số cột bắt đầu trong ma trận gốc.
 */
function divide(parent, child, iB, jB) {
    for (let i1 = 0, i2 = iB; i1 < child.length; i1++, i2++) {
        for (let j1 = 0, j2 = jB; j1 < child.length; j1++, j2++) {
            child[i1][j1] = parent[i2][j2];
        }
    }
}

/**
 * Hợp nhất một ma trận con (child) vào một ma trận lớn hơn (parent).
 * @param {Array<Array<number>>} child - Ma trận con để hợp nhất.
 * @param {Array<Array<number>>} parent - Ma trận gốc để nhận dữ liệu.
 * @param {number} iB - Chỉ số hàng bắt đầu trong ma trận gốc.
 * @param {number} jB - Chỉ số cột bắt đầu trong ma trận gốc.
 */
function join(child, parent, iB, jB) {
    for (let i1 = 0, i2 = iB; i1 < child.length; i1++, i2++) {
        for (let j1 = 0, j2 = jB; j1 < child.length; j1++, j2++) {
            parent[i2][j2] = child[i1][j1];
        }
    }
}

/**
 * Cộng hai ma trận A và B.
 * @param {Array<Array<number>>} A - Ma trận thứ nhất.
 * @param {Array<Array<number>>} B - Ma trận thứ hai.
 * @returns {Array<Array<number>>} - Ma trận kết quả của phép cộng.
 */
function add(A, B) {
    const n = A.length;
    const C = new Array(n).fill(0).map(() => new Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            C[i][j] = A[i][j] + B[i][j];
        }
    }
    return C;
}

/**
 * Trừ ma trận B khỏi ma trận A.
 * @param {Array<Array<number>>} A - Ma trận thứ nhất.
 * @param {Array<Array<number>>} B - Ma trận thứ hai.
 * @returns {Array<Array<number>>} - Ma trận kết quả của phép trừ.
 */
function subtract(A, B) {
    const n = A.length;
    const C = new Array(n).fill(0).map(() => new Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            C[i][j] = A[i][j] - B[i][j];
        }
    }
    return C;
}

/**
 * In một ma trận ra console.
 * @param {Array<Array<number>>} matrix - Ma trận cần in.
 */
function printMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        console.log(matrix[i].join(' '));
    }
}

// Ví dụ sử dụng:
// Định nghĩa hai ma trận 4x4
const A = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 1, 2, 3], [4, 5, 6, 7]];
const B = [[8, 7, 6, 5], [4, 3, 2, 1], [9, 8, 7, 6], [5, 4, 3, 2]];

console.log("Ma trận A:");
printMatrix(A);
console.log("Ma trận B:");
printMatrix(B);

// Thực hiện phép nhân ma trận bằng thuật toán Strassen
const C = multiply(A, B);

console.log("Kết quả nhân ma trận (Strassen):");
printMatrix(C);
