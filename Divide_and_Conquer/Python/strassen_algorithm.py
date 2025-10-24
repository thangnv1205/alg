
import numpy as np

def strassen_matrix_multiply(A, B):
    # Trường hợp cơ sở: nếu kích thước ma trận là 1x1
    if A.shape[0] == 1:
        return A * B

    # Chia ma trận thành các ma trận con
    n = A.shape[0]
    A11 = A[0:n//2, 0:n//2]
    A12 = A[0:n//2, n//2:n]
    A21 = A[n//2:n, 0:n//2]
    A22 = A[n//2:n, n//2:n]

    B11 = B[0:n//2, 0:n//2]
    B12 = B[0:n//2, n//2:n]
    B21 = B[n//2:n, 0:n//2]
    B22 = B[n//2:n, n//2:n]

    # Tính toán 7 tích P
    P1 = strassen_matrix_multiply(A11 + A22, B11 + B22)
    P2 = strassen_matrix_multiply(A21 + A22, B11)
    P3 = strassen_matrix_multiply(A11, B12 - B22)
    P4 = strassen_matrix_multiply(A22, B21 - B11)
    P5 = strassen_matrix_multiply(A11 + A12, B22)
    P6 = strassen_matrix_multiply(A21 - A11, B11 + B12)
    P7 = strassen_matrix_multiply(A12 - A22, B21 + B22)

    # Tính toán các ma trận con C
    C11 = P1 + P4 - P5 + P7
    C12 = P3 + P5
    C21 = P2 + P4
    C22 = P1 - P2 + P3 + P6

    # Ghép các ma trận con C lại
    C = np.zeros((n, n), dtype=A.dtype)
    C[0:n//2, 0:n//2] = C11
    C[0:n//2, n//2:n] = C12
    C[n//2:n, 0:n//2] = C21
    C[n//2:n, n//2:n] = C22

    return C
