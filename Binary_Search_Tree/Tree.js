import Node from './Node.js'
import mergeSort from './sortArray.js'
import Queue from './Queue.js'

class Tree {
  constructor(array) {
    this.root = this.buildTree(array)
  }
  buildTree(array) {
    let sortedArray = this.#sortArray(array)
    if (sortedArray.length == 0) {
      return null
    }
    let mid = parseInt(sortedArray.length / 2)
    let node = new Node(
      sortedArray[mid],
      this.buildTree(sortedArray.slice(0, mid)),
      this.buildTree(sortedArray.slice(mid + 1))
    )
    return node
  }
  #sortArray(array) {
    const sortedArray = mergeSort(array)
    let resultArr = []

    for (let i = 0; i < sortedArray.length; i++) {
      if (i == 0 || sortedArray[i] != sortedArray[i - 1]) {
        resultArr.push(sortedArray[i])
      }
    }
    return resultArr
  }
  insert(key) {
    this.root = this.#insertRecursive(this.root, key)
  }
  #insertRecursive(root, key) {
    if (root == null) {
      return new Node(key)
    }
    if (key < root.data) {
      root.left = this.#insertRecursive(root.left, key)
    } else if (key > root.data) {
      root.right = this.#insertRecursive(root.right, key)
    }
    return root
  }
  delete(key) {
    this.root = this.#deleteNode(this.root, key)
  }
  #deleteNode(root, key) {
    if (root === null) {
      return root
    }
    if (key < root.data) {
      root.left = this.#deleteNode(root.left, key)
    } else if (key > root.data) {
      root.right = this.#deleteNode(root.right, key)
    } else {
      // Case 1 : No Child Leaves
      if (!root.right && !root.left) {
        return null
      }
      // Case 2: Only one child node
      else if (root.right === null) {
        return root.left
      } else if (root.left === null) {
        return root.right
      }
      // Case 3: Both the Node is filled
      else {
        root.data = this.minValue(root.right)
        root.right = this.#deleteNode(root.right, root.data)
      }
    }
    return root
  }
  minValue(node) {
    let minValueNode = node.data
    while (node.left != null) {
      minValueNode = node.left.data
      node = node.left
    }
    return minValueNode
  }
  find(value) {
    return this.#findValue(this.root, value)
  }
  #findValue(root, value) {
    if (root == null) {
      return root
    }
    if (value < root.data) {
      return this.#findValue(root.left, value)
    } else if (value > root.data) {
      return this.#findValue(root.right, value)
    } else {
      return root.data
    }
  }
  levelOrder() {
    let queue = new Queue()
    queue.enqueue(this.root)
    while (!queue.isEmpty()) {
      const tempNode = queue.dequeue()
      console.log(tempNode.data + ' ')
      if (tempNode.left != null) {
        queue.enqueue(tempNode.left)
      }
      if (tempNode.right != null) {
        queue.enqueue(tempNode.right)
      }
    }
  }
  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node === null) {
      return
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      )
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`)
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
    }
  }
}

export default Tree
