
/**
 * @file edit_distance.java
 * @description Implementation of Edit Distance (Levenshtein) algorithm in Java
 * @author Algorithm Collection
 * @version 1.0
 */

import java.util.*;

/**
 * @class edit_distance
 * @description Class containing Edit Distance algorithm implementation
 */
public class edit_distance {

    /**
     * @function editDistanceRecursive
     * @description Recursive implementation of edit distance
     * @param str1 String - First string
     * @param str2 String - Second string
     * @returns int - Edit distance between strings
     */
    public static int editDistanceRecursive(String str1, String str2) {
        return editDistanceRecursiveHelper(str1, str2, str1.length(), str2.length());
    }

    /**
     * @function editDistanceRecursiveHelper
     * @description Helper function for recursive edit distance
     * @param str1 String - First string
     * @param str2 String - Second string
     * @param m    int - Length of first string
     * @param n    int - Length of second string
     * @returns int - Edit distance between strings
     */
    private static int editDistanceRecursiveHelper(String str1, String str2, int m, int n) {
        if (m == 0)
            return n;
        if (n == 0)
            return m;

        if (str1.charAt(m - 1) == str2.charAt(n - 1)) {
            return editDistanceRecursiveHelper(str1, str2, m - 1, n - 1);
        }

        return 1 + Math.min(
                Math.min(
                        editDistanceRecursiveHelper(str1, str2, m, n - 1), // Insert
                        editDistanceRecursiveHelper(str1, str2, m - 1, n) // Remove
                ),
                editDistanceRecursiveHelper(str1, str2, m - 1, n - 1) // Replace
        );
    }

    /**
     * @function editDistanceDP
     * @description Dynamic programming implementation of edit distance
     * @param str1 String - First string
     * @param str2 String - Second string
     * @returns int - Edit distance between strings
     */
    public static int editDistanceDP(String str1, String str2) {
        int m = str1.length();
        int n = str2.length();
        int[][] dp = new int[m + 1][n + 1];

        // Initialize base cases
        for (int i = 0; i <= m; i++) {
            dp[i][0] = i;
        }
        for (int j = 0; j <= n; j++) {
            dp[0][j] = j;
        }

        // Fill DP table
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (str1.charAt(i - 1) == str2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(
                            Math.min(dp[i][j - 1], // Insert
                                    dp[i - 1][j]), // Remove
                            dp[i - 1][j - 1] // Replace
                    );
                }
            }
        }

        return dp[m][n];
    }

    /**
     * @function editDistanceOptimized
     * @description Space-optimized implementation of edit distance
     * @param str1 String - First string
     * @param str2 String - Second string
     * @returns int - Edit distance between strings
     */
    public static int editDistanceOptimized(String str1, String str2) {
        int m = str1.length();
        int n = str2.length();

        // Ensure str1 is the shorter string
        if (m > n) {
            String temp = str1;
            str1 = str2;
            str2 = temp;
            int tempLen = m;
            m = n;
            n = tempLen;
        }

        int[] prev = new int[m + 1];
        int[] curr = new int[m + 1];

        // Initialize first row
        for (int i = 0; i <= m; i++) {
            prev[i] = i;
        }

        // Fill DP table
        for (int j = 1; j <= n; j++) {
            curr[0] = j;
            for (int i = 1; i <= m; i++) {
                if (str1.charAt(i - 1) == str2.charAt(j - 1)) {
                    curr[i] = prev[i - 1];
                } else {
                    curr[i] = 1 + Math.min(
                            Math.min(curr[i - 1], // Insert
                                    prev[i]), // Remove
                            prev[i - 1] // Replace
                    );
                }
            }

            // Swap arrays
            int[] temp = prev;
            prev = curr;
            curr = temp;
        }

        return prev[m];
    }

    /**
     * @function editDistanceWithOperations
     * @description Edit distance that returns the sequence of operations
     * @param str1 String - First string
     * @param str2 String - Second string
     * @returns List<String> - List of operations to transform str1 to str2
     */
    public static List<String> editDistanceWithOperations(String str1, String str2) {
        int m = str1.length();
        int n = str2.length();
        int[][] dp = new int[m + 1][n + 1];

        // Initialize base cases
        for (int i = 0; i <= m; i++) {
            dp[i][0] = i;
        }
        for (int j = 0; j <= n; j++) {
            dp[0][j] = j;
        }

        // Fill DP table
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (str1.charAt(i - 1) == str2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(
                            Math.min(dp[i][j - 1], // Insert
                                    dp[i - 1][j]), // Remove
                            dp[i - 1][j - 1] // Replace
                    );
                }
            }
        }

        // Backtrack to find operations
        List<String> operations = new ArrayList<>();
        int i = m, j = n;

        while (i > 0 && j > 0) {
            if (str1.charAt(i - 1) == str2.charAt(j - 1)) {
                i--;
                j--;
            } else if (dp[i][j] == dp[i - 1][j - 1] + 1) {
                operations.add("Replace '" + str1.charAt(i - 1) + "' with '" + str2.charAt(j - 1) + "'");
                i--;
                j--;
            } else if (dp[i][j] == dp[i - 1][j] + 1) {
                operations.add("Remove '" + str1.charAt(i - 1) + "'");
                i--;
            } else {
                operations.add("Insert '" + str2.charAt(j - 1) + "'");
                j--;
            }
        }

        while (i > 0) {
            operations.add("Remove '" + str1.charAt(i - 1) + "'");
            i--;
        }

        while (j > 0) {
            operations.add("Insert '" + str2.charAt(j - 1) + "'");
            j--;
        }

        Collections.reverse(operations);
        return operations;
    }

    /**
     * @function editDistanceWeighted
     * @description Weighted edit distance with custom costs
     * @param str1        String - First string
     * @param str2        String - Second string
     * @param insertCost  int - Cost of insertion
     * @param deleteCost  int - Cost of deletion
     * @param replaceCost int - Cost of replacement
     * @returns int - Weighted edit distance
     */
    public static int editDistanceWeighted(String str1, String str2, int insertCost, int deleteCost, int replaceCost) {
        int m = str1.length();
        int n = str2.length();
        int[][] dp = new int[m + 1][n + 1];

        // Initialize base cases
        for (int i = 0; i <= m; i++) {
            dp[i][0] = i * deleteCost;
        }
        for (int j = 0; j <= n; j++) {
            dp[0][j] = j * insertCost;
        }

        // Fill DP table
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (str1.charAt(i - 1) == str2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.min(
                            Math.min(
                                    dp[i][j - 1] + insertCost, // Insert
                                    dp[i - 1][j] + deleteCost // Delete
                            ),
                            dp[i - 1][j - 1] + replaceCost // Replace
                    );
                }
            }
        }

        return dp[m][n];
    }

    /**
     * @function longestCommonSubsequence
     * @description Longest Common Subsequence using edit distance approach
     * @param str1 String - First string
     * @param str2 String - Second string
     * @returns int - Length of longest common subsequence
     */
    public static int longestCommonSubsequence(String str1, String str2) {
        int m = str1.length();
        int n = str2.length();
        int[][] dp = new int[m + 1][n + 1];

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (str1.charAt(i - 1) == str2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        return dp[m][n];
    }

    /**
     * @function createSampleData
     * @description Creates sample data for testing
     * @returns Map<String, String> - Sample string pairs
     */
    public static Map<String, String> createSampleData() {
        Map<String, String> data = new HashMap<>();

        data.put("kitten", "sitting");
        data.put("sunday", "saturday");
        data.put("abc", "def");
        data.put("", "abc");
        data.put("abc", "");
        data.put("same", "same");

        return data;
    }

    /**
     * @function testEditDistance
     * @description Test function to demonstrate edit distance algorithms
     * @returns void
     */
    public static void testEditDistance() {
        System.out.println("=== Edit Distance Test ===");

        Map<String, String> data = createSampleData();

        for (Map.Entry<String, String> entry : data.entrySet()) {
            String str1 = entry.getKey();
            String str2 = entry.getValue();

            System.out.println("String 1: \"" + str1 + "\"");
            System.out.println("String 2: \"" + str2 + "\"");

            // Test recursive (only for small strings)
            if (str1.length() <= 10 && str2.length() <= 10) {
                long startTime = System.nanoTime();
                int recursiveResult = editDistanceRecursive(str1, str2);
                long endTime = System.nanoTime();
                System.out.printf("Recursive: %d (%.2f ms)%n", recursiveResult, (endTime - startTime) / 1_000_000.0);
            }

            // Test DP
            long startTime = System.nanoTime();
            int dpResult = editDistanceDP(str1, str2);
            long endTime = System.nanoTime();
            System.out.printf("DP: %d (%.2f ms)%n", dpResult, (endTime - startTime) / 1_000_000.0);

            // Test optimized
            startTime = System.nanoTime();
            int optimizedResult = editDistanceOptimized(str1, str2);
            endTime = System.nanoTime();
            System.out.printf("Optimized: %d (%.2f ms)%n", optimizedResult, (endTime - startTime) / 1_000_000.0);

            // Test with operations
            List<String> operations = editDistanceWithOperations(str1, str2);
            System.out.println("Operations: " + operations);

            // Test weighted
            int weightedResult = editDistanceWeighted(str1, str2, 1, 1, 2);
            System.out.println("Weighted (insert=1, delete=1, replace=2): " + weightedResult);

            // Test LCS
            int lcsResult = longestCommonSubsequence(str1, str2);
            System.out.println("Longest Common Subsequence: " + lcsResult);

            System.out.println();
        }
    }

    /**
     * @function performanceTest
     * @description Performance test for edit distance algorithms
     * @returns void
     */
    public static void performanceTest() {
        System.out.println("=== Performance Test ===");

        int[] sizes = { 100, 500, 1000, 2000, 5000 };

        for (int size : sizes) {
            String str1 = generateRandomString(size);
            String str2 = generateRandomString(size);

            System.out.println("String length: " + size);

            // Test DP
            long startTime = System.nanoTime();
            editDistanceDP(str1, str2);
            long endTime = System.nanoTime();
            System.out.printf("  DP: %.2f ms%n", (endTime - startTime) / 1_000_000.0);

            // Test Optimized
            startTime = System.nanoTime();
            editDistanceOptimized(str1, str2);
            endTime = System.nanoTime();
            System.out.printf("  Optimized: %.2f ms%n", (endTime - startTime) / 1_000_000.0);

            System.out.println();
        }
    }

    /**
     * @function generateRandomString
     * @description Generates a random string of given length
     * @param length int - Length of string to generate
     * @returns String - Random string
     */
    private static String generateRandomString(int length) {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < length; i++) {
            sb.append((char) ('a' + random.nextInt(26)));
        }

        return sb.toString();
    }

    /**
     * @function main
     * @description Main method to run the edit distance demonstration
     * @param args String[] - Command line arguments
     * @returns void
     */
    public static void main(String[] args) {
        System.out.println("Edit Distance Algorithm Implementation");
        System.out.println("====================================");

        // Run basic tests
        testEditDistance();

        // Run performance test
        performanceTest();

        System.out.println("\nEdit distance completed successfully!");
    }
}
