import java.util.*;

class PointsAndThreadsAlternative {
    // Class to represent a point with position and cost
    static class Point {
        int x; // Position of the point
        int a; // Cost per unit length at that point

        Point(int x, int a) {
            this.x = x;
            this.a = a;
        }
    }

    public static long calculateMinCost(int n, Point[] points) {
        // Priority queue to handle connections based on positions
        PriorityQueue<Point> pq = new PriorityQueue<>(Comparator.comparingInt(p -> p.x));

        // Add all points to the priority queue
        for (Point point : points) {
            pq.add(point);
        }

        long totalCost = 0;
        Point prev = pq.poll(); // Get the first point

        // Process the remaining points
        while (!pq.isEmpty()) {
            Point curr = pq.poll();

            // Calculate the distance and cost
            int dist = curr.x - prev.x;
            totalCost += (long) Math.min(curr.a, prev.a) * dist;

            // Move to the next point
            prev = curr;
        }

        return totalCost;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int t = scanner.nextInt(); // Number of test cases
        while (t-- > 0) {
            int n = scanner.nextInt(); // Number of points

            Point[] points = new Point[n];

            // Read positions
            for (int i = 0; i < n; i++) {
                int x = scanner.nextInt();
                points[i] = new Point(x, 0);
            }

            // Read costs
            for (int i = 0; i < n; i++) {
                points[i].a = scanner.nextInt();
            }

            // Calculate and print the minimum cost for the current test case
            System.out.println(calculateMinCost(n, points));
        }

        scanner.close();
    }
}
