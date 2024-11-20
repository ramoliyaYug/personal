#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>

using namespace std;


vector<long long> minPay(int n, int k, const vector<int>& prices) {
    vector<int> sortedPrices = prices;
    sort(sortedPrices.begin(), sortedPrices.end());
    
    vector<long long> prefixSum(n + 1, 0);
    for (int i = 0; i < n; ++i) {
        prefixSum[i + 1] = prefixSum[i] + sortedPrices[i];
    }

    vector<long long> minAmt(n + 1, 0);
    for (int m = 1; m <= n; ++m) {
        minAmt[m] = prefixSum[m];
        if (m >= k + 1) {
            minAmt[m] = min(minAmt[m], minAmt[m - k - 1] + prefixSum[m] - prefixSum[m - k]);
        }
    }

    return minAmt;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;
    while (t--) {
        int n, k;
        cin >> n >> k;
        vector<int> prices(n);
        for (int i = 0; i < n; ++i) {
            cin >> prices[i];
        }

        vector<long long> result = minPay(n, k, prices);
        for (int m = 1; m <= n; ++m) {
            cout << result[m] << " ";
        }
        cout << endl;
    }

    return 0;
}
