const mergeSort = (array) => {
  if (array.length < 2) {
    return array
  }
  let median = Math.floor(array.length / 2)
  let leftSort = mergeSort(array.slice(0, median))
  let rightSort = mergeSort(array.slice(median))

  return merge(leftSort, rightSort)
}
const merge = (leftArr, rightArr) => {
  let resultArr = []
  while (leftArr.length > 0 && rightArr.length > 0) {
    if (leftArr[0] < rightArr[0]) {
      resultArr.push(leftArr.shift())
    } else {
      resultArr.push(rightArr.shift())
    }
  }
  return [...resultArr, ...leftArr, ...rightArr]
}

export default mergeSort
