import hash from './hash.js'
import Node from './Node.js'

function HashMap() {
  let bucketArr = new Array(16).fill(null)
  let capacity = bucketArr.length
  const load_factor = 0.75

  const set = (key, value) => {
    const newNode = Node(key, value)
    const hashValue = hash(key) % capacity
    if (capacity * load_factor >= length()) {
      resize()
    }

    if (has(key)) {
      let currentBucket = bucketArr[hashValue]
      while (currentBucket.next != null) {
        currentBucket = currentBucket.next
      }
      currentBucket.next = newNode
    } else {
      bucketArr[hashValue] = newNode
    }
  }
  const has = (key) => {
    let hashKeyValue = hash(key) % capacity
    let currentValue = bucketArr[hashKeyValue]
    while (currentValue != null) {
      if (currentValue.key == key) {
        return true
      }
      currentValue = currentValue.next
    }
    return false
  }
  const resize = () => {
    const newBucketArr = new Array(capacity * 2).fill(null)
    capacity = newBucketArr.length
    for (let bucket of bucketArr) {
      let current = bucket
      while (current != null) {
        let hashValue = hash(current.key) % capacity
        if (newBucketArr[hashValue] === null) {
          newBucketArr[hashValue] = Node(current.key, current.value)
        } else {
          let newCurrent = newBucketArr[hashValue]
          while (newCurrent.next != null) {
            newCurrent = newCurrent.next
          }
          newCurrent.next = Node(current.key, current.value)
        }
        current = current.next
      }
    }
    bucketArr.splice(0, bucketArr.length, ...newBucketArr)
  }
  const length = () => {
    let count = 0
    for (let bucket of bucketArr) {
      let current = bucket
      while (current !== null) {
        count++
        current = current.next
      }
    }
    return count
  }
  const get = (key) => {
    const hashValue = hash(key) % capacity
    let currentBucket = bucketArr[hashValue]

    while (currentBucket != null) {
      if (currentBucket.key === key) {
        return currentBucket.value
      }
      currentBucket = currentBucket.next
    }
    return undefined
  }
  const entries = () => {
    let allBucketEntries = []
    for (let bucket of bucketArr) {
      let current = bucket
      while (current !== null) {
        allBucketEntries.push([current.key, current.value])
        current = current.next
      }
    }
    return allBucketEntries
  }
  const remove = (key) => {
    const hashValue = hash(key) % capacity
    let currentBucket = bucketArr[hashValue]
    let previous = null

    while (currentBucket != null) {
      if (currentBucket.key === key) {
        if (previous == null) {
          bucketArr[hashValue] = currentBucket.next
        } else {
          previous.next = currentBucket.next
        }
        return true
      }
      previous = currentBucket
      currentBucket = currentBucket.next
    }
    return false
  }
  const values = () => {
    let currentBucketsArr = bucketArr
    let allValues = []
    currentBucketsArr.forEach((bucket) => {
      let current = bucket
      while (current != null) {
        allValues.push(current.value)
        current = current.next
      }
    })
    return allValues
  }
  const clear = () => {
    bucketArr = new Array(16).fill(null)
    capacity = bucketArr.length
  }

  return { set, has, length, get, entries, remove, values, clear }
}

export default HashMap
