import java.io.*;
import java.util.*;

public class CollisionSolver {
    static class FastReader {
        BufferedReader br;
        StringTokenizer st;

        public FastReader() {
            br = new BufferedReader(new InputStreamReader(System.in));
        }

        String next() {
            while (st == null || !st.hasMoreElements()) {
                try {
                    st = new StringTokenizer(br.readLine());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            return st.nextToken();
        }

        int nextInt() {
            return Integer.parseInt(next());
        }

        long nextLong() {
            return Long.parseLong(next());
        }
    }

    static class Column {
        List<Long> positions;
        Set<Long> positionSet; // For quick lookup

        Column(List<Long> positions) {
            this.positions = positions;
            this.positionSet = new HashSet<>(positions);
        }

        boolean hasHeight(long height) {
            return positionSet.contains(height);
        }
    }

    static int N;
    static Column[] columns;
    static int[][] dp;
    static final int INF = 1000000000;

    public static void main(String[] args) {
        FastReader fr = new FastReader();
        
        try {
            // Read and validate N
            N = fr.nextInt();
            if (N < 2 || N > 10000) {
                throw new IllegalArgumentException("N must be between 2 and 10000");
            }

            // Initialize columns
            columns = new Column[N];
            
            // Read and validate counts
            int[] counts = new int[N];
            for (int i = 0; i < N; i++) {
                counts[i] = fr.nextInt();
                if (counts[i] < 1 || counts[i] > 1000000) {
                    throw new IllegalArgumentException("Count must be between 1 and 1000000");
                }
            }

            // Read positions with validation
            for (int i = 0; i < N; i++) {
                List<Long> positions = new ArrayList<>();
                Set<Long> heightSet = new HashSet<>();
                for (int j = 0; j < counts[i]; j++) {
                    long pos = fr.nextLong();
                    // Validate height bounds
                    if (pos < 1 || pos > 1000000000) {
                        throw new IllegalArgumentException("Height must be between 1 and 10^9");
                    }
                    // Check for duplicate heights in same column
                    if (!heightSet.add(pos)) {
                        throw new IllegalArgumentException("Duplicate height in column " + (i + 1));
                    }
                    positions.add(pos);
                }
                columns[i] = new Column(positions);
            }

            // Handle edge cases
            int result = handleSpecialCases();
            if (result == -1) {
                // No special case, solve normally
                result = solveCollisions();
            }
            
            System.out.println(result);
            
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            return;
        }
    }

    static int handleSpecialCases() {
        // Case 1: N = 2
        if (N == 2) {
            return 0; // Always 0 collisions as they move away from each other
        }

        // Case 2: Single object in each column
        boolean allSingleObjects = true;
        for (Column col : columns) {
            if (col.positions.size() != 1) {
                allSingleObjects = false;
                break;
            }
        }
        if (allSingleObjects) {
            return checkSingleObjectCollisions();
        }

        // Case 3: Check if all objects are at same height
        boolean allSameHeight = true;
        long firstHeight = columns[0].positions.get(0);
        for (Column col : columns) {
            for (long pos : col.positions) {
                if (pos != firstHeight) {
                    allSameHeight = false;
                    break;
                }
            }
            if (!allSameHeight) break;
        }
        if (allSameHeight) {
            return calculateSameHeightCollisions();
        }

        return -1; // No special case detected
    }

    static int checkSingleObjectCollisions() {
        // For single objects, check if any paths cross
        long[] heights = new long[N];
        for (int i = 0; i < N; i++) {
            heights[i] = columns[i].positions.get(0);
        }
        
        int collisions = 0;
        // Check adjacent columns only since objects move to adjacent columns
        for (int i = 0; i < N-1; i++) {
            if (heights[i] == heights[i+1]) {
                collisions++;
            }
        }
        return collisions;
    }

    static int calculateSameHeightCollisions() {
        // When all objects are at same height, calculate minimum possible collisions
        int totalObjects = 0;
        for (Column col : columns) {
            totalObjects += col.positions.size();
        }
        // Each column can only receive objects from one direction to minimize collisions
        return totalObjects - N;
    }

    // Original solving methods remain the same...
    static int solveCollisions() {
        if (N <= 2) return 0;
        
        dp = new int[N][1 << (N-2)];
        for (int i = 0; i < N; i++) {
            Arrays.fill(dp[i], -1);
        }
        
        return minCollisions(0, 0);
    }

    // Rest of the methods remain the same...
    // Include minCollisions(), calculateCollisions(), and countCollisionsForColumns() from previous code
}
