import java.util.*;

public class Game2048 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        final int MOD = 998244353;
        final int MAX_SCORE = 4000000; // Maximum value of Y in the problem
        long[] dp = new long[MAX_SCORE + 1];
        
        // Initialize dp[0] = 1, because there is 1 way to achieve score 0 (doing nothing)
        dp[0] = 1;
        
        // Fill the DP table
        for (long value = 2; value <= MAX_SCORE; value *= 2) {
            for (long score = MAX_SCORE; score >= value; score--) {
                dp[(int)score] = (dp[(int)score] + dp[(int)(score - value)]) % MOD;
            }
        }
        
        // Read number of test cases
        int t = scanner.nextInt();
        
        // For each test case, read the score Y and output the result
        for (int i = 0; i < t; i++) {
            int y = scanner.nextInt();
            System.out.println(dp[y]);
        }
        
        scanner.close();
    }
}
