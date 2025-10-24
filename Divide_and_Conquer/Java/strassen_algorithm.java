/**
 * Lớp strassen_algorithm cung cấp một triển khai của thuật toán Strassen
 * để nhân hai ma trận vuông. Thuật toán Strassen là một thuật toán chia để trị
 * hiệu quả hơn so với phép nhân ma trận tiêu chuẩn cho các ma trận lớn.
 */
public class strassen_algorithm {

    /**
     * Nhân hai ma trận vuông A và B bằng thuật toán Strassen.
     * Kích thước của ma trận phải là lũy thừa của 2.
     * @param A int[][] - Ma trận thứ nhất.
     * @param B int[][] - Ma trận thứ hai.
     * @return int[][] - Ma trận kết quả của phép nhân A * B.
     */
    public static int[][] multiply(int[][] A, int[][] B) {
        int n = A.length;
        int[][] R = new int[n][n];

        // Trường hợp cơ sở: nếu kích thước ma trận là 1x1, thực hiện phép nhân trực tiếp
        if (n == 1) {
            R[0][0] = A[0][0] * B[0][0];
            return R;
        }

        // Chia ma trận A và B thành 4 ma trận con có kích thước n/2 x n/2
        int[][] A11 = new int[n / 2][n / 2];
        int[][] A12 = new int[n / 2][n / 2];
        int[][] A21 = new int[n / 2][n / 2];
        int[][] A22 = new int[n / 2][n / 2];

        int[][] B11 = new int[n / 2][n / 2];
        int[][] B12 = new int[n / 2][n / 2];
        int[][] B21 = new int[n / 2][n / 2];
        int[][] B22 = new int[n / 2][n / 2];

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
        int[][] P1 = multiply(add(A11, A22), add(B11, B22));
        // P2 = (A21 + A22)B11
        int[][] P2 = multiply(add(A21, A22), B11);
        // P3 = A11(B12 - B22)
        int[][] P3 = multiply(A11, sub(B12, B22));
        // P4 = A22(B21 - B11)
        int[][] P4 = multiply(A22, sub(B21, B11));
        // P5 = (A11 + A12)B22
        int[][] P5 = multiply(add(A11, A12), B22);
        // P6 = (A21 - A11)(B11 + B12)
        int[][] P6 = multiply(sub(A21, A11), add(B11, B12));
        // P7 = (A12 - A22)(B21 + B22)
        int[][] P7 = multiply(sub(A12, A22), add(B21, B22));

        // Tính các ma trận con C của ma trận kết quả R
        // C11 = P1 + P4 - P5 + P7
        int[][] C11 = add(sub(add(P1, P4), P5), P7);
        // C12 = P3 + P5
        int[][] C12 = add(P3, P5);
        // C21 = P2 + P4
        int[][] C21 = add(P2, P4);
        // C22 = P1 + P3 - P2 + P6
        int[][] C22 = add(sub(add(P1, P3), P2), P6);

        // Hợp nhất các ma trận con C vào ma trận kết quả R
        join(C11, R, 0, 0);
        join(C12, R, 0, n / 2);
        join(C21, R, n / 2, 0);
        join(C22, R, n / 2, n / 2);

        return R;
    }

    /**
     * Chia một ma trận lớn (parent) thành một ma trận con (child).
     * @param parent int[][] - Ma trận gốc.
     * @param child int[][] - Ma trận con để điền dữ liệu.
     * @param iB int - Chỉ số hàng bắt đầu trong ma trận gốc.
     * @param jB int - Chỉ số cột bắt đầu trong ma trận gốc.
     */
    public static void divide(int[][] parent, int[][] child, int iB, int jB) {
        for (int i1 = 0, i2 = iB; i1 < child.length; i1++, i2++) {
            for (int j1 = 0, j2 = jB; j1 < child.length; j1++, j2++) {
                child[i1][j1] = parent[i2][j2];
            }
        }
    }

    /**
     * Hợp nhất một ma trận con (child) vào một ma trận lớn hơn (parent).
     * @param child int[][] - Ma trận con để hợp nhất.
     * @param parent int[][] - Ma trận gốc để nhận dữ liệu.
     * @param iB int - Chỉ số hàng bắt đầu trong ma trận gốc.
     * @param jB int - Chỉ số cột bắt đầu trong ma trận gốc.
     */
    public static void join(int[][] child, int[][] parent, int iB, int jB) {
        for (int i1 = 0, i2 = iB; i1 < child.length; i1++, i2++) {
            for (int j1 = 0, j2 = jB; j1 < child.length; j1++, j2++) {
                parent[i2][j2] = child[i1][j1];
            }
        }
    }

    /**
     * Cộng hai ma trận A và B.
     * @param A int[][] - Ma trận thứ nhất.
     * @param B int[][] - Ma trận thứ hai.
     * @return int[][] - Ma trận kết quả của phép cộng.
     */
    public static int[][] add(int[][] A, int[][] B) {
        int n = A.length;
        int[][] C = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                C[i][j] = A[i][j] + B[i][j];
            }
        }
        return C;
    }

    /**
     * Trừ ma trận B khỏi ma trận A.
     * @param A int[][] - Ma trận thứ nhất.
     * @param B int[][] - Ma trận thứ hai.
     * @return int[][] - Ma trận kết quả của phép trừ.
     */
    public static int[][] sub(int[][] A, int[][] B) {
        int n = A.length;
        int[][] C = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                C[i][j] = A[i][j] - B[i][j];
            }
        }
        return C;
    }

    /**
     * In một ma trận ra console.
     * @param matrix int[][] - Ma trận cần in.
     */
    public static void printMatrix(int[][] matrix) {
        for (int[] row : matrix) {
            for (int col : row) {
                System.out.print(col + " ");
            }
            System.out.println();
        }
    }

    /**
     * Phương thức chính để trình diễn việc sử dụng thuật toán Strassen.
     * @param args String[] - Đối số dòng lệnh (không được sử dụng).
     */
    public static void main(String[] args) {
        // Ví dụ sử dụng:
        // Định nghĩa hai ma trận 4x4
        int[][] A = {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 1, 2, 3}, {4, 5, 6, 7}};
        int[][] B = {{8, 7, 6, 5}, {4, 3, 2, 1}, {9, 8, 7, 6}, {5, 4, 3, 2}};

        System.out.println("Ma trận A:");
        printMatrix(A);
        System.out.println("Ma trận B:");
        printMatrix(B);

        // Thực hiện phép nhân ma trận bằng thuật toán Strassen
        int[][] C = multiply(A, B);

        System.out.println("Kết quả nhân ma trận (Strassen):");
        printMatrix(C);
    }
}
