/**
 * @file fast_fourier_transform.js
 * @description Implementation of Fast Fourier Transform (FFT) and Inverse Fast Fourier Transform (IFFT) algorithms in JavaScript.
 * FFT is an efficient divide-and-conquer algorithm for computing the Discrete Fourier Transform (DFT).
 * @author Algorithm Collection
 * @version 1.0
 */

/**
 * Lớp Complex biểu diễn một số phức với phần thực và phần ảo.
 * Cung cấp các phép toán cơ bản trên số phức như cộng, trừ, nhân, chia.
 */
class Complex {
    /**
     * Khởi tạo một số phức mới.
     * @param {number} real - Phần thực của số phức.
     * @param {number} imag - Phần ảo của số phức.
     */
    constructor(real, imag) {
        this.real = real;
        this.imag = imag;
    }

    /**
     * Cộng số phức hiện tại với một số phức khác.
     * @param {Complex} b - Số phức để cộng.
     * @returns {Complex} - Kết quả của phép cộng.
     */
    plus(b) {
        return new Complex(this.real + b.real, this.imag + b.imag);
    }

    /**
     * Trừ một số phức khác khỏi số phức hiện tại.
     * @param {Complex} b - Số phức để trừ.
     * @returns {Complex} - Kết quả của phép trừ.
     */
    minus(b) {
        return new Complex(this.real - b.real, this.imag - b.imag);
    }

    /**
     * Nhân số phức hiện tại với một số phức khác.
     * @param {Complex} b - Số phức để nhân.
     * @returns {Complex} - Kết quả của phép nhân.
     */
    times(b) {
        return new Complex(this.real * b.real - this.imag * b.imag,
                           this.real * b.imag + this.imag * b.real);
    }

    /**
     * Chia số phức hiện tại cho một giá trị thực.
     * @param {number} val - Giá trị thực để chia.
     * @returns {Complex} - Kết quả của phép chia.
     */
    div(val) {
        return new Complex(this.real / val, this.imag / val);
    }

    /**
     * Trả về biểu diễn chuỗi của số phức.
     * @returns {string} - Biểu diễn chuỗi của số phức.
     */
    toString() {
        if (this.imag === 0) return this.real.toFixed(2);
        if (this.real === 0) return this.imag.toFixed(2) + 'i';
        if (this.imag < 0) return this.real.toFixed(2) + ' - ' + (-this.imag).toFixed(2) + 'i';
        return this.real.toFixed(2) + ' + ' + this.imag.toFixed(2) + 'i';
    }
}

/**
 * Thực hiện thuật toán Biến đổi Fourier nhanh (FFT) đệ quy.
 * Mảng đầu vào phải có kích thước là lũy thừa của 2.
 * @param {Complex[]} x - Mảng các số phức đầu vào.
 * @returns {Complex[]} - Mảng các số phức đã biến đổi Fourier.
 * @throws {Error} nếu kích thước mảng không phải là lũy thừa của 2.
 */
function fft(x) {
    const n = x.length;

    // Trường hợp cơ sở: nếu chỉ có một phần tử, trả về chính nó
    if (n === 1) return [x[0]];

    // Đảm bảo n là lũy thừa của 2
    if (n % 2 !== 0) {
        throw new Error("Kích thước mảng phải là lũy thừa của 2");
    }

    // Chia thành các phần chẵn và lẻ
    const even = []; // Các phần tử ở vị trí chẵn
    const odd = [];  // Các phần tử ở vị trí lẻ
    for (let k = 0; k < n / 2; k++) {
        even[k] = x[2 * k];
        odd[k] = x[2 * k + 1];
    }

    // Gọi đệ quy FFT cho các phần chẵn và lẻ
    const q = fft(even); // FFT của phần chẵn
    const r = fft(odd);  // FFT của phần lẻ

    // Kết hợp kết quả (Butterflies)
    const y = new Array(n);
    for (let k = 0; k < n / 2; k++) {
        // Tính toán hệ số xoay (twiddle factor) e^(-2*pi*i*k/n)
        const kth = -2 * k * Math.PI / n;
        const wk = new Complex(Math.cos(kth), Math.sin(kth));
        // Công thức kết hợp
        y[k] = q[k].plus(wk.times(r[k]));
        y[k + n / 2] = q[k].minus(wk.times(r[k]));
    }
    return y;
}

/**
 * Thực hiện thuật toán Biến đổi Fourier ngược (IFFT) đệ quy.
 * IFFT là nghịch đảo của FFT, được tính bằng cách lấy liên hợp phức của đầu vào,
 * thực hiện FFT, sau đó lấy liên hợp phức của kết quả và chia cho N.
 * @param {Complex[]} x - Mảng các số phức đầu vào (kết quả của FFT).
 * @returns {Complex[]} - Mảng các số phức đã biến đổi Fourier ngược (dữ liệu gốc).
 */
function ifft(x) {
    const n = x.length;
    const y = new Array(n);

    // 1. Lấy liên hợp phức của đầu vào
    for (let i = 0; i < n; i++) {
        y[i] = new Complex(x[i].real, -x[i].imag);
    }

    // 2. Tính FFT của liên hợp
    const fft_y = fft(y);

    // 3. Lấy liên hợp phức một lần nữa và chia cho n
    for (let i = 0; i < n; i++) {
        y[i] = new Complex(fft_y[i].real / n, -fft_y[i].imag / n);
    }
    return y;
}

// Ví dụ sử dụng:
// Đầu vào: [1, 2, 3, 4] (đại diện cho đa thức 1 + 2x + 3x^2 + 4x^3)
const x = [
    new Complex(1, 0),
    new Complex(2, 0),
    new Complex(3, 0),
    new Complex(4, 0)
];

console.log("Đầu vào: ", x.map(c => c.toString()));

// Tính FFT
const y = fft(x);
console.log("FFT của đầu vào: ", y.map(c => c.toString()));

// Tính IFFT
const z = ifft(y);
console.log("IFFT của FFT: ", z.map(c => c.toString()));

// Kiểm tra kết quả (nên gần giống với đầu vào gốc)
console.log("Kiểm tra kết quả (làm tròn): ");
console.log(z.map(c => c.real.toFixed(2)).join(' '));
