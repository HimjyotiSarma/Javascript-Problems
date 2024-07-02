import Node from './Node.js'

export default class LinkedList {
  constructor() {
    this.head = null
    this.size = 0
    this.tail = null
  }
  prepend(value) {
    this.head = new Node(value, this.head)
    this.size++
  }
  append(value) {
    const newNode = new Node(value, null)
    if (this.head == null) {
      this.head = newNode
      this.tail = newNode
    } else {
      let tempHeadData = this.head
      while (tempHeadData.next != null) {
        tempHeadData = tempHeadData.next
      }
      tempHeadData.next = newNode
      this.tail = newNode
    }
    this.size++
  }
  at(index) {
    let currentData = this.head

    for (let i = 0; i < index; i++) {
      if (currentData == null) {
        return null
      } else {
        currentData = currentData.next
      }
    }
    return currentData
  }
  pop() {
    if (this.head == null) {
      return null
    } else if (this.head.next == null) {
      this.head = null
      this.tail = null
      this.size--
    } else {
      let currentData = this.head
      while (currentData.next.next != null) {
        currentData = currentData.next
      }
      currentData.next = null
      this.tail = currentData
      this.size--
    }
  }
  contains(value) {
    let currentData = this.head
    while (currentData != null) {
      if (currentData.value == value) {
        return true
      }
      currentData = currentData.next
    }
    return false
  }
  find(value) {
    let currentData = this.head
    let currentIndex = 0
    while (currentData.value != value) {
      currentIndex++
      currentData = currentData.next
    }
    return currentIndex
  }
  toString() {
    let currentData = this.head
    let resultStr = ''
    while (currentData != null) {
      resultStr = resultStr + `( ${currentData.value} ) -> `
      currentData = currentData.next
    }
    resultStr = resultStr + `null`
    return resultStr
  }
  insertAt(value, index) {
    if (index < 0 || index > this.size) {
      throw new RangeError(`Index ${index} is out of bounds`)
    }
    if (index == 0) {
      this.prepend(value)
    } else {
      let currentData = this.head
      for (let i = 0; i < index - 1; i++) {
        currentData = currentData.next
      }

      currentData.next = new Node(value, currentData.next)
      if (index == this.size) {
        this.tail = currentData.next
      }
      this.size++
    }
  }
  removeAt(index) {
    let currentData = this.head
    if (index < 0 || index >= this.size) {
      throw new RangeError(`Index ${index} is out of bounds`)
    }
    if (index == 0) {
      this.head = currentData.next
      if (this.size == 1) {
        this.tail = null
      }
    } else {
      for (let i = 0; i < index - 1; i++) {
        currentData = currentData.next
      }
      currentData.next = currentData.next.next
      if (index == this.size - 1) {
        this.tail = currentData
      }
    }
    this.size--
  }
}
