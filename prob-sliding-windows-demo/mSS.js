function maxSubarrSum(arr, k) {
  let maxSum = 0;

  // get the sum of the first three numbers to start
  for (let i = 0; i < k; i++) {
    maxSum += arr[i];
  }
  let currentSum = maxSum;

  // starting after the first sum, compute the rest
  for (let i = k; i < arr.length; i++) {
    // current window adds new element and chops off left
    currentSum += arr[i] - arr[i - k];
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}
