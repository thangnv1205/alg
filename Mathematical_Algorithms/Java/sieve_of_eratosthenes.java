import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class sieve_of_eratosthenes {

    public static List<Integer> sieveOfEratosthenes(int n) {
        boolean[] isPrime = new boolean[n + 1];
        Arrays.fill(isPrime, true);
        isPrime[0] = false;
        isPrime[1] = false;

        for (int p = 2; p * p <= n; p++) {
            // Nếu isPrime[p] vẫn là true, thì đó là một số nguyên tố
            if (isPrime[p]) {
                // Cập nhật tất cả các bội số của p thành false
                for (int i = p * p; i <= n; i += p) {
                    isPrime[i] = false;
                }
            }
        }

        // Thu thập tất cả các số nguyên tố
        List<Integer> primes = new ArrayList<>();
        for (int i = 2; i <= n; i++) {
            if (isPrime[i]) {
                primes.add(i);
            }
        }
        return primes;
    }

    public static void main(String[] args) {
        int limit = 30;
        List<Integer> primesUpToLimit = sieveOfEratosthenes(limit);
        System.out.println("Các số nguyên tố lên đến " + limit + " là: " + primesUpToLimit);

        int limit2 = 100;
        List<Integer> primesUpToLimit2 = sieveOfEratosthenes(limit2);
        System.out.println("Các số nguyên tố lên đến " + limit2 + " là: " + primesUpToLimit2);
    }
}
