import java.util.Scanner;

public class A{
     public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int t = scanner.nextInt();

        for (int i = 0; i < t; i++) {
            long n = scanner.nextLong();
            long   
 result = bincatmod(n);
            System.out.println(result);
        }
    }

    public static long bincatmod(long n) {
        final int MOD = 998244353;
        long result = 0;
        long powerOf2 = 1;

        for (long i = 1; i <= n; i++) {
            long num = i;
            while (num > 0) {
                result = (result * 2 + num % 2) % MOD;
                num /= 2;
                powerOf2 = (powerOf2 * 2) % MOD;
            }
        }

        return result;
    }
}