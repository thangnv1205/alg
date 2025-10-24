public class euclidean_algorithm {

    public static int gcd(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    public static void main(String[] args) {
        int num1 = 48;
        int num2 = 18;
        System.out.println("Ước chung lớn nhất của " + num1 + " và " + num2 + " là: " + gcd(num1, num2));

        int num3 = 101;
        int num4 = 103;
        System.out.println("Ước chung lớn nhất của " + num3 + " và " + num4 + " là: " + gcd(num3, num4));
    }
}
