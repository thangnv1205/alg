public class exponentiation_by_squaring {

    public static long power(long base, long exp, Long mod) {
        long res = 1;
        if (mod != null) {
            base %= mod;
        }

        while (exp > 0) {
            if (exp % 2 == 1) {
                if (mod != null) {
                    res = (res * base) % mod;
                } else {
                    res = (res * base);
                }
            }
            if (mod != null) {
                base = (base * base) % mod;
            } else {
                base = (base * base);
            }
            exp /= 2;
        }
        return res;
    }

    public static void main(String[] args) {
        System.out.println("2^10 = " + power(2, 10, null));
        System.out.println("3^5 mod 7 = " + power(3, 5, 7L));
        System.out.println("5^13 = " + power(5, 13, null));
    }
}
