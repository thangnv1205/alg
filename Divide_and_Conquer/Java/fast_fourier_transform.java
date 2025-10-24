import java.util.Arrays;

/**
 * Lớp fast_fourier_transform cung cấp các phương thức để thực hiện
 * Thuật toán Biến đổi Fourier nhanh (FFT) và Biến đổi Fourier ngược (IFFT).
 * FFT là một thuật toán chia để trị hiệu quả để tính toán DFT (Biến đổi Fourier
 * rời rạc).
 */
public class fast_fourier_transform {

    /**
     * Lớp Complex biểu diễn một số phức với phần thực và phần ảo.
     * Cung cấp các phép toán cơ bản trên số phức như cộng, trừ, nhân, chia.
     */
    static class Complex {
        double real; // Phần thực của số phức
        double imag; // Phần ảo của số phức

        public Complex(double real, double imag) {
            this.real = real;
            this.imag = imag;
        }

        /**
         * Cộng số phức hiện tại với một số phức khác.
         * 
         * @param b Complex - Số phức để cộng.
         * @return Complex - Kết quả của phép cộng.
         */
        public Complex plus(Complex b) {
            return new Complex(this.real + b.real, this.imag + b.imag);
        }

        /**
         * Trừ một số phức khác khỏi số phức hiện tại.
         * 
         * @param b Complex - Số phức để trừ.
         * @return Complex - Kết quả của phép trừ.
         */
        public Complex minus(Complex b) {
            return new Complex(this.real - b.real, this.imag - b.imag);
        }

        /**
         * Nhân số phức hiện tại với một số phức khác.
         * 
         * @param b Complex - Số phức để nhân.
         * @return Complex - Kết quả của phép nhân.
         */
        public Complex times(Complex b) {
            return new Complex(this.real * b.real - this.imag * b.imag,
                    this.real * b.imag + this.imag * b.real);
        }

        /**
         * Chia số phức hiện tại cho một giá trị thực.
         * 
         * @param val double - Giá trị thực để chia.
         * @return Complex - Kết quả của phép chia.
         */
        public Complex div(double val) {
            return new Complex(this.real / val, this.imag / val);
        }

        /**
         * Trả về biểu diễn chuỗi của số phức.
         * 
         * @return String - Biểu diễn chuỗi của số phức.
         */
        @Override
        public String toString() {
            if (imag == 0)
                return String.format("%.2f", real);
            if (real == 0)
                return String.format("%.2fi", imag);
            if (imag < 0)
                return String.format("%.2f - %.2fi", real, -imag);
            return String.format("%.2f + %.2fi", real, imag);
        }
    }

    /**
     * Thực hiện thuật toán Biến đổi Fourier nhanh (FFT) đệ quy.
     * Mảng đầu vào phải có kích thước là lũy thừa của 2.
     * 
     * @param x Complex[] - Mảng các số phức đầu vào.
     * @return Complex[] - Mảng các số phức đã biến đổi Fourier.
     * @throws IllegalArgumentException nếu kích thước mảng không phải là lũy thừa
     *                                  của 2.
     */
    public static Complex[] fft(Complex[] x) {
        int n = x.length;

        // Trường hợp cơ sở: nếu chỉ có một phần tử, trả về chính nó
        if (n == 1)
            return new Complex[] { x[0] };

        // Đảm bảo n là lũy thừa của 2
        if (n % 2 != 0) {
            throw new IllegalArgumentException("Kích thước mảng phải là lũy thừa của 2");
        }

        // Chia thành các phần chẵn và lẻ
        Complex[] even = new Complex[n / 2]; // Các phần tử ở vị trí chẵn
        Complex[] odd = new Complex[n / 2]; // Các phần tử ở vị trí lẻ
        for (int k = 0; k < n / 2; k++) {
            even[k] = x[2 * k];
            odd[k] = x[2 * k + 1];
        }

        // Gọi đệ quy FFT cho các phần chẵn và lẻ
        Complex[] q = fft(even); // FFT của phần chẵn
        Complex[] r = fft(odd); // FFT của phần lẻ

        // Kết hợp kết quả (Butterflies)
        Complex[] y = new Complex[n];
        for (int k = 0; k < n / 2; k++) {
            // Tính toán hệ số xoay (twiddle factor) e^(-2*pi*i*k/n)
            double kth = -2 * k * Math.PI / n;
            Complex wk = new Complex(Math.cos(kth), Math.sin(kth));
            // Công thức kết hợp
            y[k] = q[k].plus(wk.times(r[k]));
            y[k + n / 2] = q[k].minus(wk.times(r[k]));
        }
        return y;
    }

    /**
     * Thực hiện thuật toán Biến đổi Fourier ngược (IFFT) đệ quy.
     * IFFT là nghịch đảo của FFT, được tính bằng cách lấy liên hợp phức của đầu
     * vào,
     * thực hiện FFT, sau đó lấy liên hợp phức của kết quả và chia cho N.
     * 
     * @param x Complex[] - Mảng các số phức đầu vào (kết quả của FFT).
     * @return Complex[] - Mảng các số phức đã biến đổi Fourier ngược (dữ liệu gốc).
     */
    public static Complex[] ifft(Complex[] x) {
        int n = x.length;
        Complex[] y = new Complex[n];

        // 1. Lấy liên hợp phức của đầu vào
        for (int i = 0; i < n; i++) {
            y[i] = new Complex(x[i].real, -x[i].imag);
        }

        // 2. Tính FFT của liên hợp
        y = fft(y);

        // 3. Lấy liên hợp phức một lần nữa và chia cho n
        for (int i = 0; i < n; i++) {
            y[i] = new Complex(y[i].real / n, -y[i].imag / n);
        }
        return y;
    }

    /**
     * Phương thức chính để trình diễn việc sử dụng FFT và IFFT.
     * 
     * @param args String[] - Đối số dòng lệnh (không được sử dụng).
     */
    public static void main(String[] args) {
        // Ví dụ sử dụng FFT và IFFT
        // Đầu vào: [1, 2, 3, 4] (đại diện cho đa thức 1 + 2x + 3x^2 + 4x^3)
        Complex[] x = new Complex[4];
        x[0] = new Complex(1, 0);
        x[1] = new Complex(2, 0);
        x[2] = new Complex(3, 0);
        x[3] = new Complex(4, 0);

        System.out.println("Đầu vào: " + Arrays.toString(x));

        // Tính FFT
        Complex[] y = fft(x);
        System.out.println("FFT của đầu vào: " + Arrays.toString(y));

        // Tính IFFT
        Complex[] z = ifft(y);
        System.out.println("IFFT của FFT: " + Arrays.toString(z));

        // Kiểm tra kết quả (nên gần giống với đầu vào gốc)
        System.out.println("Kiểm tra kết quả (làm tròn): ");
        for (Complex c : z) {
            System.out.print(String.format("%.2f ", c.real));
        }
        System.out.println();
    }
}
