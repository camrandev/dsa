function maxSubarraySum(arr, k) {
  let maxSum = 0;

  for (let i = 0; i <= arr.length - k; i++) {
    // sum every k elements starting from current i
    let currentSum = 0;
    for (let j = i; j < i + k; j++) {
      currentSum += arr[j];
    }
    // is this the largest slice so far?
    maxSum = Math.max(currentSum, maxSum);
  }

  return maxSum;
}
