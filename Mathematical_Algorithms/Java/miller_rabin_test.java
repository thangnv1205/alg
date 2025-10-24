import java.math.BigInteger;
import java.util.Random;

public class miller_rabin_test {

    // Hàm tính (a^d) % n
    private static BigInteger power(BigInteger base, BigInteger exp, BigInteger mod) {
        BigInteger res = BigInteger.ONE;
        base = base.mod(mod);
        while (exp.compareTo(BigInteger.ZERO) > 0) {
            if (exp.testBit(0)) { // Nếu exp là lẻ
                res = res.multiply(base).mod(mod);
            }
            base = base.multiply(base).mod(mod);
            exp = exp.shiftRight(1); // exp = exp / 2
        }
        return res;
    }

    // Hàm trợ giúp cho Miller-Rabin, kiểm tra một cơ số a
    private static boolean millerRabinTest(BigInteger d, BigInteger n) {
        Random rand = new Random();
        // Chọn một số ngẫu nhiên trong [2, n-2]
        BigInteger a = new BigInteger(n.bitLength(), rand);
        while (a.compareTo(BigInteger.TWO) < 0 || a.compareTo(n.subtract(BigInteger.TWO)) > 0) {
            a = new BigInteger(n.bitLength(), rand);
        }

        BigInteger x = power(a, d, n);

        if (x.equals(BigInteger.ONE) || x.equals(n.subtract(BigInteger.ONE))) {
            return true;
        }

        // Bình phương x lặp đi lặp lại
        while (d.compareTo(n.subtract(BigInteger.ONE)) != 0) {
            x = x.multiply(x).mod(n);
            d = d.multiply(BigInteger.TWO);

            if (x.equals(BigInteger.ONE)) {
                return false;
            }
            if (x.equals(n.subtract(BigInteger.ONE))) {
                return true;
            }
        }
        return false;
    }

    // Kiểm tra tính nguyên tố của n bằng Miller-Rabin k lần
    public static boolean isPrimeMillerRabin(BigInteger n, int k) {
        // Trường hợp đặc biệt
        if (n.compareTo(BigInteger.ONE) <= 0 || n.equals(BigInteger.valueOf(4))) {
            return false;
        }
        if (n.compareTo(BigInteger.valueOf(3)) <= 0) {
            return true;
        }

        // Tìm d sao cho n-1 = 2^s * d
        BigInteger d = n.subtract(BigInteger.ONE);
        while (d.mod(BigInteger.TWO).equals(BigInteger.ZERO)) {
            d = d.divide(BigInteger.TWO);
        }

        // Lặp lại k lần
        for (int i = 0; i < k; i++) {
            if (!millerRabinTest(d, n)) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println("13 là số nguyên tố: " + isPrimeMillerRabin(BigInteger.valueOf(13), 4));
        System.out.println("15 là số nguyên tố: " + isPrimeMillerRabin(BigInteger.valueOf(15), 4));
        System.out.println("97 là số nguyên tố: " + isPrimeMillerRabin(BigInteger.valueOf(97), 4));
        System.out.println("561 là số nguyên tố: " + isPrimeMillerRabin(BigInteger.valueOf(561), 4)); // 561 là số Carmichael, Miller-Rabin sẽ phát hiện ra nó là hợp số

        // Kiểm tra một số lớn
        BigInteger largePrimeCandidate = new BigInteger("1000000007");
        System.out.println(largePrimeCandidate + " là số nguyên tố: " + isPrimeMillerRabin(largePrimeCandidate, 10));

        BigInteger largeCompositeCandidate = new BigInteger("1000000001"); // 1000000001 = 101 * 9900990.10
        System.out.println(largeCompositeCandidate + " là số nguyên tố: " + isPrimeMillerRabin(largeCompositeCandidate, 10));
    }
}
