export function useMergeArrays(arrayA, arrayB) {
  const mergedMap = new Map();

  arrayA.forEach((item) => mergedMap.set(item.key, item));

  arrayB.forEach((item) => mergedMap.set(item.key, item));
  const mergedArray = Array.from(mergedMap.values());
  return mergedArray;
}
