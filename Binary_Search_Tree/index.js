import Tree from './Tree.js'

const BinaryTree = new Tree([3, 5, 14, 9, 20, 1, 4, 10, 20])
console.log(BinaryTree.prettyPrint())
// console.log(BinaryTree.levelOrder())
// console.log(BinaryTree.inOrder())
// console.log(BinaryTree.preOrder())
// console.log(BinaryTree.postOrder())
// console.log(BinaryTree.root)
// console.log(BinaryTree.depth(1))
// console.log(BinaryTree.height(9))
console.log(BinaryTree.isBalanced())
