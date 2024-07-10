export default class Queue {
  constructor() {
    this.items = {}
    this.backIndex = 0
    this.frontIndex = 0
  }
  enqueue(item) {
    this.items[this.backIndex] = item
    this.backIndex++
    return item
  }
  dequeue() {
    if (this.isEmpty()) {
      return null
    }
    const item = this.items[this.frontIndex]
    delete this.items[this.frontIndex]
    this.frontIndex++
    return item
  }
  peek() {
    if (this.isEmpty()) {
      return null
    }
    return this.items[this.frontIndex]
  }
  isEmpty() {
    return this.backIndex === this.frontIndex
  }
}
