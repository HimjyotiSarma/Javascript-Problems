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

  #findNode(root, value) {
    if (root == null) {
      return root
    }
    if (value < root.data) {
      return this.#findNode(root.left, value)
    } else if (value > root.data) {
      return this.#findNode(root.right, value)
    } else {
      return root
    }
  }
  levelOrder(callback) {
    let queue = new Queue()
    let result = []
    queue.enqueue(this.root)
    while (!queue.isEmpty()) {
      const tempNode = queue.dequeue()
      if (callback) {
        callback(tempNode)
      } else {
        result.push(tempNode.data)
      }
      if (tempNode.left != null) {
        queue.enqueue(tempNode.left)
      }
      if (tempNode.right != null) {
        queue.enqueue(tempNode.right)
      }
    }
    if (!callback) {
      return result
    }
  }
  levelOrderRecursive(callback) {
    let queue = new Queue()
    let result = []
    queue.enqueue(this.root)
    const traverse = () => {
      if (queue.length === 0) {
        return
      }
      let tempNode = queue.dequeue()
      if (callback) {
        callback(tempNode)
      } else {
        result.push(tempNode)
      }
      if (tempNode.left !== null) {
        queue.enqueue(tempNode.left)
      }
      if (tempNode.right != null) {
        queue.enqueue(tempNode.right)
      }
      traverse()
      if (!callback) {
        return result
      }
    }
    traverse()
  }
  inOrder(callback) {
    return this.#inOrderTraversal(this.root, callback)
  }
  #inOrderTraversal(node, callback = null) {
    let result = []
    if (node == null) {
      return result
    }
    result = result.concat(this.#inOrderTraversal(node.left, callback))
    if (callback) {
      callback(node.data)
    } else {
      result.push(node.data)
    }

    result = result.concat(this.#inOrderTraversal(node.right, callback))
    return result
  }
  preOrder(callback) {
    return this.#preOrderTraversal(this.root, callback)
  }
  #preOrderTraversal(node, callback = null) {
    let result = []
    if (node == null) {
      return result
    }
    if (callback) {
      callback(node)
    } else {
      result.push(node.data)
    }

    result = result.concat(this.#preOrderTraversal(node.left, callback))
    result = result.concat(this.#preOrderTraversal(node.right, callback))

    return result
  }
  postOrder(callback) {
    return this.#postOrderTraversal(this.root, callback)
  }
  #postOrderTraversal(node, callback = null) {
    let result = []
    if (node == null) {
      return result
    }
    result = result.concat(this.#postOrderTraversal(node.left, callback))
    result = result.concat(this.#postOrderTraversal(node.right, callback))
    if (callback) {
      callback(node)
    } else {
      result.push(node.data)
    }

    return result
  }
  depth(value) {
    return this.#findDepth(this.root, value, 0)
  }
  #findDepth(root, value, dist) {
    if (root === null) {
      return -1
    }
    if (value < root.data) {
      return this.#findDepth(root.left, value, dist + 1)
    }
    if (value > root.data) {
      return this.#findDepth(root.right, value, dist + 1)
    } else {
      return dist
    }
  }
  height(value) {
    let node = this.#findNode(this.root, value)
    return node ? this.#findHeight(node, value) : -1
  }
  #findHeight(root, value) {
    if (root == null) {
      return -1
    }

    let leftHeight = this.#findHeight(root.left, value)
    let rightHeight = this.#findHeight(root.right, value)

    return Math.max(leftHeight, rightHeight) + 1
  }
  isBalanced() {
    return this.#checkIsBalanced(this.root) !== -1
  }
  #checkIsBalanced(root) {
    if (root == null) {
      return 0
    }
    let leftHeight = this.#checkIsBalanced(root.left)
    if (leftHeight == -1) return -1
    let rightHeight = this.#checkIsBalanced(root.right)
    if (rightHeight == -1) return -1

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return -1
    }
    return Math.max(leftHeight, rightHeight) + 1
  }
  reBalance() {
    let nodes = this.inOrder()
    this.root = this.buildTree(nodes)
    return this.root
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
